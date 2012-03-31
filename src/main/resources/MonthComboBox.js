/**
 * A simple component under test: a combo box to display a filtered list of months.
 *
 * The months to display are specified as a {@link MonthComboBox#months} array
 * of zero-based month indexes.
 */
Ext.define('MonthComboBox', {

    extend  : 'Ext.form.ComboBox',
    alias   : 'widget.monthcombo',

    store   : Ext.create('Ext.data.Store', {
        fields 	: [ 'num', 'name' ]
    }),

    queryMode   : 'local',
    displayField: 'name',
    valueField  : 'num',

    allMonths  : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],

    months: [],

    initComponent: function() {

        /**
         * populating the store only with months
         * from the {@link MonthComboBox#months} array
         */
        for (var i = 0; i < this.months.length; i++) {
            this.store.add({
                num : this.months[i],
                name: this.allMonths[this.months[i]]
            });
        }

        this.callParent(arguments);
    }

});