import * as A from "fp-ts/es6/Array";
import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import {
  createProject,
  DbProject,
  openDatabase,
  putProjectState
} from "src/database/database";

Cypress.Commands.add("createProjects", (projects: DbProject[]) => {
  Cypress.log({
    name: "Create Projects",
    consoleProps: () => ({
      projects
    })
  });

  const operation = pipe(
    TE.tryCatch(
      () => openDatabase(),
      e => String(e)
    ),
    TE.chain(db =>
      A.array.traverse(TE.taskEitherSeq)(projects, p => createProject(p, db))
    )
  );

  return cy.wrap(operation());
});

Cypress.Commands.add("setProjectState", (projectId: number, state: any) => {
  Cypress.log({
    name: "Set Project State",
    consoleProps: () => ({
      projectId,
      state
    })
  });

  const operation = pipe(
    TE.tryCatch(
      () => openDatabase(),
      e => String(e)
    ),
    TE.chain(db => putProjectState(state, projectId, db))
  );

  return cy.wrap(operation());
});
