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

// @ts-expect-error: TS6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSelectedCellValue() {
  const range = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  return range ? range.getValue() : "No cell selected";
}
