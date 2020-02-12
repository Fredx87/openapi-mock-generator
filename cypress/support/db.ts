import { pipe } from "fp-ts/es6/pipeable";
import * as TE from "fp-ts/es6/TaskEither";
import {
  createProject,
  DbProject,
  openDatabase
} from "src/features/project/database";

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
      pipe(
        createProject(projects[0], db),
        TE.chain(() => createProject(projects[1], db))
      )
    )
  );

  return cy.wrap(operation());
});
