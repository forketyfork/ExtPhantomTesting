new TestPage("app.js", function() {

    // programmatically mocking button click
    this.evaluate(function() {
        Ext.ComponentQuery.query('mainform > button[action=popup]')[0].btnEl.dom.click();
    });

    // checking that the popupwindow opened
    this.evaluateAndAssertTrue(function() {
        return typeof Ext.ComponentQuery.query('popupwindow')[0] !== 'undefined';
    }, "Popup window not opened");

}, true);
