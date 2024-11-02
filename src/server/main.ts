// @ts-expect-error: TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showSidebar() {
  const html =
    HtmlService.createHtmlOutputFromFile("index").setTitle("Reference Check");
  SpreadsheetApp.getUi().showSidebar(html);
}

// @ts-expect-error: TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Show sidebar", "showSidebar")
    .addToUi();
}

export interface Cell extends Ref {
  value: string;
  formula: string;
}

function getSelectedCell(): Cell | undefined {
  const range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  if (!range) {
    return;
  }

  const value = range.getDisplayValue();
  const formula =
    value === "#ERROR!" || value === "#REF!" ? "" : range.getFormula();

  return {
    value,
    formula,
    a1Notation: range.getA1Notation(),
    sheet: range.getSheet().getName(),
  };
}

export interface Ref {
  a1Notation: string;
  sheet: string;
}

function gotoRef(ref: Ref) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ref.sheet);
  const range = sheet?.getRange(ref.a1Notation);
  range?.activate();
}

export { getSelectedCell, gotoRef };

const refRegex =
  /(?:'[^']+'|[A-Za-z0-9_]+)?!?(\$?[A-Za-z]+\$?\d+)(?::(\$?[A-Za-z]+\$?\d+))?/g;

export function extractRefs(cell: Cell): Ref[] {
  if (cell.formula === "") {
    return [];
  }

  const matches = cell.formula.match(refRegex);
  if (!matches) {
    return [];
  }

  const refs: Ref[] = [];

  for (const match of matches) {
    if (match.includes("!")) {
      const parts = match.split("!");
      const sheet = parts[0].replace(/^'|'$/g, ""); // Remove leading and trailing quotes if present
      refs.push({ a1Notation: parts[1], sheet });
    } else {
      refs.push({ a1Notation: match, sheet: cell.sheet });
    }
  }

  return refs;
}
