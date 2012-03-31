/**
 * The main form controller
 */
Ext.define('test.controller.Main', {

    extend : 'Ext.app.Controller',

    views   : [
        'Main'
    ],

    init : function() {
        this.control({
            // main form button
            'mainform > button[action=popup]': {
                click: this.onPopupButtonClick
            }
        });
    },

    /** Main form button click handler */
    onPopupButtonClick: function() {
        this.application.fireEvent('showPopup');
    }

});