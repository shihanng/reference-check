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

export interface Cell {
  value: string;
  a1Notation: string;
  sheet: string;
}

function getSelectedCell(): Cell | undefined {
  const range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  if (!range) {
    return;
  }
  return {
    value: range.getDisplayValue(),
    a1Notation: range.getA1Notation(),
    sheet: range.getSheet().getName(),
  };
}

export { getSelectedCell };
