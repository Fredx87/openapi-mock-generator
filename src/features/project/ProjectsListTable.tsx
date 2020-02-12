import Button from "antd/es/button";
import Empty from "antd/es/empty";
import Input from "antd/es/input";
import Table, { ColumnProps } from "antd/es/table";
import React from "react";
import { DbProject } from "./database";
import { NEW_PROJECT_NAME_PLACEHOLDER } from "./db-constants";

export const EMPTY_MSG = "No project found. Please create a new project.";

export interface EditableProject extends DbProject {
  isEditing: boolean;
  key: number;
}

interface ProjectsListTableProps {
  editingDisabled: boolean;
  projects: EditableProject[];
  onProjectNameChanged: (index: number, name: string) => void;
  onStartEdit: (index: number) => void;
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
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, __, index) => {
        return (
          <Button
            type="link"
            disabled={props.editingDisabled}
            onClick={() => {
              props.onStartEdit(index);
            }}
          >
            Edit
          </Button>
        );
      }
    }
  ];

  return (
    <Table<EditableProject>
      dataSource={props.projects}
      columns={columns}
      locale={{ emptyText: <Empty description={EMPTY_MSG} /> }}
    ></Table>
  );
};
