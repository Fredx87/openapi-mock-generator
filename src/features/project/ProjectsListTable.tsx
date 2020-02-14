import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Empty from "antd/es/empty";
import Input from "antd/es/input";
import PopConfirm from "antd/es/popconfirm";
import Table, { ColumnProps } from "antd/es/table";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DbProject } from "./database";
import {
  CREATE_PROJECT_MSG,
  NEW_PROJECT_NAME_PLACEHOLDER
} from "./project-constants";

export const EMPTY_MSG = "No project found. Please create a new project.";

const HeaderContainer = styled.div`
  margin: 20px 0;
`;

const StyledButton = styled(Button)`
  padding: 0;
`;

export interface EditableProject extends DbProject {
  isEditing: boolean;
  key: number;
}

interface ProjectsListTableProps {
  editingDisabled: boolean;
  projects: EditableProject[];
  onProjectCreate: () => void;
  onProjectNameChanged: (index: number, name: string) => void;
  onStartEdit: (index: number) => void;
  onDeleteProject: (index: number) => void;
}

function renderDate(date: Date): string {
  return Intl.DateTimeFormat().format(date);
}

export const ProjectsListTable: React.FC<ProjectsListTableProps> = props => {
  const columns: ColumnProps<EditableProject>[] = [
    {
      title: "Project name",
      dataIndex: "name",
      key: "name",
      width: "50%",
      render: (_, record, index) => {
        if (record.isEditing) {
          return (
            <Input
              autoFocus
              placeholder={NEW_PROJECT_NAME_PLACEHOLDER}
              defaultValue={record.name}
              onPressEnter={e => {
                props.onProjectNameChanged(index, e.currentTarget.value);
              }}
              onBlur={e => {
                props.onProjectNameChanged(index, e.currentTarget.value);
              }}
            />
          );
        } else {
          return <Link to={`/${record.id}`}>{record.name}</Link>;
        }
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: renderDate
    },
    {
      title: "Modified At",
      dataIndex: "modifiedAt",
      key: "modifiedAt",
      render: renderDate
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, __, index) => {
        return (
          <>
            <StyledButton
              type="link"
              disabled={props.editingDisabled}
              onClick={() => {
                props.onStartEdit(index);
              }}
            >
              Edit
            </StyledButton>
            <Divider type="vertical" />
            <PopConfirm
              title="Are you sure?"
              onConfirm={() => {
                props.onDeleteProject(index);
              }}
            >
              <StyledButton type="link" disabled={props.editingDisabled}>
                Delete
              </StyledButton>
            </PopConfirm>
          </>
        );
      }
    }
  ];

  return (
    <>
      <HeaderContainer>
        <Button
          type="primary"
          onClick={props.onProjectCreate}
          disabled={props.editingDisabled}
        >
          {CREATE_PROJECT_MSG}
        </Button>
      </HeaderContainer>
      <Table<EditableProject>
        dataSource={props.projects}
        columns={columns}
        locale={{ emptyText: <Empty description={EMPTY_MSG} /> }}
        pagination={false}
      ></Table>
    </>
  );
};
