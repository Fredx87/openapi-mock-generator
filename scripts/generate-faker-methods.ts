import faker from "faker";
import { flatten } from "fp-ts/lib/Array";
import { writeMethodsFile } from "./utils";

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

const allMethods = getAllMethodsFromNamespaces(getFakerNamespaces());

writeMethodsFile(allMethods, "faker-methods")();

console.log("Faker methods generated successfully");
