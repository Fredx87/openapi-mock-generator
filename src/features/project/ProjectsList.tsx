import Button from "antd/es/button";
import Empty from "antd/es/empty";
import Input from "antd/es/input";
import Layout from "antd/es/layout";
import Table, { ColumnProps } from "antd/es/table";
import React from "react";
import styled from "styled-components";
import { useImmer } from "use-immer";

interface Project {
  key: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

interface EditableProject extends Project {
  isEditing: boolean;
}

const { Content } = Layout;

const StyledContent = styled(Content)`
  padding: 50px 20px;
  max-width: 1200px;
  text-align: center;
`;

export const EMPTY_MSG = "No project found. Please create a new project.";
export const CREATE_PROJECT_MSG = "Create New Project";
export const NEW_PROJECT_NAME_PLACEHOLDER = "New Project Name";

function renderDate(date: Date): string {
  return Intl.DateTimeFormat().format(date);
}

export const ProjectsList: React.FC = () => {
  const [dataSource, updateDataSource] = useImmer<EditableProject[]>([]);

  const columns: ColumnProps<EditableProject>[] = [
    {
      title: "Project name",
      dataIndex: "name",
      key: "name",
      render: (_, record, index) => {
        if (record.isEditing) {
          return (
            <Input
              autoFocus
              placeholder={NEW_PROJECT_NAME_PLACEHOLDER}
              onPressEnter={e => {
                onProjectNameChanged(e.currentTarget.value, index);
              }}
              onBlur={e => {
                onProjectNameChanged(e.currentTarget.value, index);
              }}
            />
          );
        } else {
          return record.name;
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
    }
  ];

  const onCreateProject = () => {
    const newProject: EditableProject = {
      key: -1,
      name: "",
      createdAt: new Date(),
      modifiedAt: new Date(),
      isEditing: true
    };
    updateDataSource(draft => {
      draft.push(newProject);
    });
  };

  const onProjectNameChanged = (value: string, index: number) => {
    if (value) {
      updateDataSource(draft => {
        draft[index].name = value;
        draft[index].isEditing = false;
      });
    } else {
      updateDataSource(draft => {
        draft.splice(index, 1);
      });
    }
  };

  return (
    <StyledContent>
      <Button type="primary" size="large" onClick={onCreateProject}>
        {CREATE_PROJECT_MSG}
      </Button>
      <Table<EditableProject>
        dataSource={dataSource}
        columns={columns}
        locale={{ emptyText: <Empty description={EMPTY_MSG} /> }}
      ></Table>
    </StyledContent>
  );
};
