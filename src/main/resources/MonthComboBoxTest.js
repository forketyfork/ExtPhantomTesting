new TestPage("MonthComboBox.js", function() {

    // creating the MonthComboBox component and rendering to the page body
    this.evaluate(function() {
        Ext.widget('monthcombo', {
            months  : [1, 2, 5],
            renderTo: Ext.getBody()
        });
    });

    // checking that the component's store has exactly three items in it
    this.evaluateAndAssertEquals(3, function() {
        return Ext.ComponentQuery.query('monthcombo')[0].store.getCount();
    }, "Wrong element count");

});
