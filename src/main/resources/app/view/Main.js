Ext.define('test.view.Main', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.mainform',
    layout  : 'anchor',
    items   : [
        {
            xtype   : 'button',
            action  : 'popup',
            text    : 'Show Popup'
        }
    ]
});
