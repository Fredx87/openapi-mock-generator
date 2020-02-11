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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DbProject, getAllProjects, upsertProject } from "./database";
import { EditableProject, ProjectsListTable } from "./ProjectsListTable";

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 50px 20px;
  max-width: 1200px;
  text-align: center;
`;

export const CREATE_PROJECT_MSG = "Create New Project";
export const NEW_PROJECT_NAME_PLACEHOLDER = "New Project Name";

function toEditableProject(project: DbProject): EditableProject {
  return { ...project, isEditing: false, key: project.id || -1 };
}

export const ProjectsList: React.FC = () => {
  const [editingDisabled, setEditingDisabled] = useState(false);
  const [data, setData] = useState<RemoteData<string, EditableProject[]>>(
    initial
  );

  useEffect(() => {
    getProjectsFromDb();
  }, []);

  const getProjectsFromDb = () => {
    getAllProjects()().then(res =>
      pipe(
        res,
        E.fold(
          e => {
            setData(failure(e));
          },
          projects => setData(success(projects.map(toEditableProject)))
        )
      )
    );
  };

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

  const onProjectNameChanged = (index: number, value: string) => {
    if (value && isSuccess(data) && data.value[index]) {
      const project = data.value[index];
      project.name = value;
      upsertProject(project)().then(res =>
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
            ></ProjectsListTable>
          )
        )
      )}
    </StyledContent>
  );
};
