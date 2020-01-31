import { Chance } from "chance";
import { writeMethodsFile } from "./utils";

const skippedMethods = [
  "constructor",
  "VERSION",
  "cc_types",
  "mersenne_twister",
  "mersenne_twister",
  "months",
  "name_prefixes",
  "provinces",
  "states",
  "street_suffix",
  "street_suffixes"
];

const allMethods = Object.getOwnPropertyNames(Chance.prototype).filter(
  m => !skippedMethods.includes(m)
);

writeMethodsFile(allMethods, "chance-methods")();

console.log("Chance methods generated successfully");
