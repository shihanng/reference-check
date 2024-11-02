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
  return {
    value: range.getDisplayValue(),
    formula: range.getFormula(),
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
