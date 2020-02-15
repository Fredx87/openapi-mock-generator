import * as E from "fp-ts/es6/Either";
import * as TE from "fp-ts/es6/TaskEither";

export function readAsText(file: File): TE.TaskEither<Error, string> {
  const reader = new Promise<string>(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
      reject(
        new Error(`Error reading ${file.name}: read content is not a string`)
      );
    };
    reader.onerror = e => {
      reject(new Error(`Error reading ${file.name}: ${e.type}`));
    };
    reader.readAsText(file);
  });
  return TE.tryCatch(() => reader, E.toError);
}
