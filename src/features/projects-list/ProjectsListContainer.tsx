import {
  failure,
  fold,
  initial,
  isSuccess,
  RemoteData,
  success
} from "@devexperts/remote-data-ts";
import Alert from "antd/es/alert";
import Layout from "antd/es/layout";
import message from "antd/es/message";
import Skeleton from "antd/es/skeleton";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import { produce } from "immer";
import React, { useEffect, useState } from "react";
import {
  createProject,
  DbProject,
  deleteProject,
  getAllProjects,
  putProject
} from "src/database/database";
import { useDatabase } from "src/database/useDatabase";
import styled from "styled-components";
import { EditableProject, ProjectsListTable } from "./ProjectsListTable";

const { Content } = Layout;

const StyledContent = styled(Content)`
  background: #fff;
`;

const StyledContainer = styled.div`
  padding: 20px 50px;
  max-width: 1200px;
  margin: auto;
`;

function toEditableProject(project: DbProject): EditableProject {
  return { ...project, isEditing: false, key: project.id || -1 };
}

function toDbProject(project: EditableProject): DbProject {
  return {
    id: project.id,
    name: project.name,
    createdAt: project.createdAt,
    modifiedAt: project.modifiedAt
  };
}

export const ProjectsListContainer: React.FC = () => {
  const [editingDisabled, setEditingDisabled] = useState(false);
  const [data, setData] = useState<RemoteData<string, EditableProject[]>>(
    initial
  );
  const db = useDatabase();

  useEffect(() => {
    getProjectsFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getProjectsFromDb() {
    getAllProjects(db)().then(res =>
      pipe(
        res,
        E.fold(
          e => {
            setData(failure(String(e)));
          },
          projects => {
            const sorted = projects.sort(
              (a, b) => b.modifiedAt.valueOf() - a.modifiedAt.valueOf()
            );
            setData(success(sorted.map(toEditableProject)));
            setEditingDisabled(false);
          }
        )
      )
    );
  }

  const onProjectCreate = () => {
    const newProject: EditableProject = {
      key: -1,
      name: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      isEditing: true
    };
    setEditingDisabled(true);
    setData(data =>
      isSuccess(data)
        ? success([newProject].concat(data.value))
        : success([newProject])
    );
  };

  const onStartEdit = (index: number) => {
    if (isSuccess(data) && data.value[index]) {
      const newData = produce(data.value, draft => {
        draft[index].isEditing = true;
      });
      setEditingDisabled(true);
      setData(success(newData));
    }
  };

  const onProjectNameChanged = (index: number, value: string) => {
    if (value && isSuccess(data) && data.value[index]) {
      const project = toDbProject(data.value[index]);
      project.name = value;

      const operation =
        project.id === undefined
          ? createProject(project, db)
          : putProject(project, db);

      operation().then(res =>
        pipe(
          res,
          E.fold(
            e => {
              message.error(e);
            },
            () => {
              getProjectsFromDb();
            }
          )
        )
      );
    } else {
      getProjectsFromDb();
    }
  };

  const onDeleteProject = (index: number) => {
    if (isSuccess(data) && data.value[index]) {
      const project = data.value[index];
      deleteProject(project, db)().then(res =>
        pipe(
          res,
          E.fold(
            e => {
              message.error(e);
            },
            () => {
              getProjectsFromDb();
            }
          )
        )
      );
    }
  };

  return (
    <StyledContent>
      <StyledContainer>
        {pipe(
          data,
          fold(
            () => <Skeleton />,
            () => <Skeleton />,
            error => (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            ),
            projects => (
              <ProjectsListTable
                editingDisabled={editingDisabled}
                projects={projects}
                onProjectCreate={onProjectCreate}
                onProjectNameChanged={onProjectNameChanged}
                onStartEdit={onStartEdit}
                onDeleteProject={onDeleteProject}
              ></ProjectsListTable>
            )
          )
        )}
      </StyledContainer>
    </StyledContent>
  );
};
