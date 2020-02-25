import { flow } from "fp-ts/lib/function";
import { writeFileSync } from "fs";
import * as prettier from "prettier";

export function writeMethodsFile(methods: string[], fileName: string) {
  return flow(
    () => methods.map(m => `"${m}"`).join(","),
    methodsArray => `export default [ ${methodsArray} ]`,
    content => prettier.format(content, { parser: "typescript" }),
    formatted => {
      writeFileSync(
        `${__dirname}/../src/features/editor/${fileName}.ts`,
        formatted
      );
    }
  );
}
