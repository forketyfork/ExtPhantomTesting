Ext.define('test.view.Popup', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.popupwindow',
    layout  : 'fit',
    width   : 640,
    height  : 480,
    items   : [
        {
            xtype   : 'panel',
            html    : 'Hello!'
        }
    ]
});
