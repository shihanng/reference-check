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
  referredBy: Ref[];
}

function getSelectedCell(): Cell | undefined {
  const range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  if (!range) {
    return;
  }

  const value = range.getDisplayValue();
  const formula =
    value === "#ERROR!" || value === "#REF!" ? "" : range.getFormula();
  const a1Notation = range.getA1Notation();
  const sheet = range.getSheet().getName();

  return {
    value,
    formula,
    a1Notation,
    sheet,
    referredBy: findCell(a1Notation, sheet),
  };
}

function findCell(a1Notation: string, sheet: string): Ref[] {
  const ranges = SpreadsheetApp.getActiveSpreadsheet()
    .createTextFinder(`\\$?${a1Notation.replace(/([A-Z]+)(\d+)/, "$1\\$?$2")}`)
    .matchFormulaText(true)
    .useRegularExpression(true)
    .findAll();

  const founds = ranges.reduce((acc, range) => {
    const value = range.getDisplayValue();
    if (value === "#ERROR!" || value === "#REF!") {
      return acc;
    }

    const formula = range.getFormula();
    const refs = extractRefs(formula, range.getSheet().getName());

    const found = refs.some(
      (ref) => ref.sheet === sheet && ref.a1Notation === a1Notation,
    );

    if (found) {
      acc.push({
        a1Notation: range.getA1Notation(),
        sheet: range.getSheet().getName(),
      });
    }

    return acc;
  }, [] as Ref[]);

  return founds;
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

export function extractRefs(formula: string, originalSheet: string): Ref[] {
  if (formula === "") {
    return [];
  }

  const matches = formula.match(refRegex);
  if (!matches) {
    return [];
  }

  const refs: Ref[] = [];

  for (const match of matches) {
    if (match.includes("!")) {
      const parts = match.split("!");
      const sheet = parts[0].replace(/^'|'$/g, ""); // Remove leading and trailing quotes if present
      refs.push({ a1Notation: normalA1Notation(parts[1]), sheet });
    } else {
      refs.push({ a1Notation: normalA1Notation(match), sheet: originalSheet });
    }
  }

  return refs;
}

export function normalA1Notation(notation: string): string {
  return notation.replace(/\$/g, "").toUpperCase();
}
