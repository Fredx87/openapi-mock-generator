import { DbProject } from "src/database/database";

export const emptyProjects: DbProject[] = [
  {
    name: "First Project",
    createdAt: new Date("2020-02-11T00:40:50.018Z"),
    modifiedAt: new Date("2020-02-11T00:40:50.018Z")
  },
  {
    name: "Second Project",
    createdAt: new Date("2020-02-12T00:40:50.018Z"),
    modifiedAt: new Date("2020-02-12T00:40:50.018Z")
  }
];
