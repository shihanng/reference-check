import { expect, test } from "vitest";
import { extractRefs, Ref } from "./main.ts";

test.each([
  ["", []],
  ["=1+1", []],
  ["=1+A1", [{ a1Notation: "A1", sheet: "Original Sheet" }]],
  [
    "=1+A1+Q1234",
    [
      { a1Notation: "A1", sheet: "Original Sheet" },
      { a1Notation: "Q1234", sheet: "Original Sheet" },
    ],
  ],
  [
    "=1+$A1+Q$1234",
    [
      { a1Notation: "A1", sheet: "Original Sheet" },
      { a1Notation: "Q1234", sheet: "Original Sheet" },
    ],
  ],
  [
    "=1+$$A$1+$Q$12$34$",
    [
      { a1Notation: "A1", sheet: "Original Sheet" },
      { a1Notation: "Q12", sheet: "Original Sheet" },
    ],
  ],
  [
    "=1+1!A1+'*'!Q1234",
    [
      { a1Notation: "A1", sheet: "1" },
      { a1Notation: "Q1234", sheet: "*" },
    ],
  ],
])("extracting references from cell", (formula: string, ref: Ref[]) => {
  const cell = {
    value: "??????",
    formula,
    a1Notation: "!!!!!!",
    sheet: "Original Sheet",
  };
  expect(extractRefs(cell)).toStrictEqual(ref);
});
