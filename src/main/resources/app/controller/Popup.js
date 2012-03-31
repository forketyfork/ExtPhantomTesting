/**
 * Popup window controller
 */
Ext.define('test.controller.Popup', {

    extend : 'Ext.app.Controller',

    views   : [
        'Popup'
    ],

    init : function() {
        this.application.on({
            showPopup: this.onShowPopupEvent,
            scope: this
        });
    },

    /** showPopup event handler */
    onShowPopupEvent: function() {
        Ext.widget('popupwindow').show();
    }

});