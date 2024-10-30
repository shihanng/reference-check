function showSidebar() {
  let html =
    HtmlService.createHtmlOutputFromFile("index").setTitle("Reference Check");
  SpreadsheetApp.getUi().showSidebar(html);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Show sidebar", "showSidebar")
    .addToUi();
}
