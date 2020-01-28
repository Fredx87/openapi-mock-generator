import faker from "faker";
import { flatten } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { writeFileSync } from "fs";
import * as prettier from "prettier";

function getFakerNamespaces(): string[] {
  return Object.keys(faker).filter(
    k =>
      !["locales", "definitions", "locale", "localeFallback", "fake"].includes(
        k
      )
  );
}

function getMethodFromNamespace(ns: string): string[] {
  const obj = (faker as any)[ns];
  return Object.keys(obj).map(method => `${ns}.${method}`);
}

function getAllMethodsFromNamespaces(namespaces: string[]): string[] {
  return flatten(namespaces.map(getMethodFromNamespace));
}

flow(
  getFakerNamespaces,
  getAllMethodsFromNamespaces,
  methods => methods.map(m => `"${m}"`).join(","),
  methodsArray => `export const fakerMethods = [ ${methodsArray} ]`,
  content => prettier.format(content, { parser: "typescript" }),
  formatted => {
    writeFileSync(
      `${__dirname}/../src/features/editor/faker-methods.ts`,
      formatted
    );
  }
)();

console.log("Faker methods generated successfully");
