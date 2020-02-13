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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDatabase } from "src/shared/use-database";
import { SetStoreAction } from "src/store";
import styled from "styled-components";
import {
  createProject,
  DbProject,
  deleteProject,
  getAllProjects,
  getProjectState,
  putProject
} from "./database";
import { saveLastProjectId } from "./persist";
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

export const ProjectsList: React.FC = () => {
  const [editingDisabled, setEditingDisabled] = useState(false);
  const [data, setData] = useState<RemoteData<string, EditableProject[]>>(
    initial
  );
  const db = useDatabase();
  const dispatch = useDispatch();
  const history = useHistory();

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
            setData(failure(e));
          },
          projects => {
            setData(success(projects.map(toEditableProject)));
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
        ? success(data.value.concat(newProject))
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

  const onProjectOpen = (index: number) => {
    if (isSuccess(data) && data.value[index]) {
      const { id } = data.value[index];

      if (id === undefined) {
        message.error("Cannot open a project without an id");
        return;
      }

      getProjectState(id, db)().then(res => {
        pipe(
          res,
          E.fold(
            e => {
              message.error(e);
            },
            state => {
              saveLastProjectId(id);
              const setStoreAction: SetStoreAction = {
                type: "db/set store",
                payload: state
              };
              dispatch(setStoreAction);
              history.push(`/${id}`);
            }
          )
        );
      });
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
                onProjectOpen={onProjectOpen}
              ></ProjectsListTable>
            )
          )
        )}
      </StyledContainer>
    </StyledContent>
  );
};
