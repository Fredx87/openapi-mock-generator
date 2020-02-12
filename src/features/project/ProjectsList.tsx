import {
  failure,
  fold,
  initial,
  isSuccess,
  RemoteData,
  success
} from "@devexperts/remote-data-ts";
import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Layout from "antd/es/layout";
import Skeleton from "antd/es/skeleton";
import * as E from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import { produce } from "immer";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  createProject,
  DbContext,
  DbProject,
  getAllProjects,
  putProject
} from "./database";
import { CREATE_PROJECT_MSG } from "./db-constants";
import { EditableProject, ProjectsListTable } from "./ProjectsListTable";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 50px 20px;
  max-width: 1200px;
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
  const db = useContext(DbContext);

  useEffect(() => {
    getProjectsFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getProjectsFromDb() {
    getAllProjects(db!)().then(res =>
      pipe(
        res,
        E.fold(
          e => {
            setData(failure(e));
          },
          projects => {
            setData(success(projects.map(toEditableProject)));
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
          ? createProject(project, db!)
          : putProject(project, db!);

      operation().then(res =>
        pipe(
          res,
          E.fold(
            e => {
              setData(failure(e));
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
    setEditingDisabled(false);
  };

  return (
    <StyledContent>
      <Button
        type="primary"
        size="large"
        onClick={onProjectCreate}
        disabled={editingDisabled}
      >
        {CREATE_PROJECT_MSG}
      </Button>
      {pipe(
        data,
        fold(
          () => <Skeleton />,
          () => <Skeleton />,
          error => (
            <Alert message="Error" description={error} type="error" showIcon />
          ),
          projects => (
            <ProjectsListTable
              projects={projects}
              onProjectNameChanged={onProjectNameChanged}
              onStartEdit={onStartEdit}
            ></ProjectsListTable>
          )
        )
      )}
    </StyledContent>
  );
};
