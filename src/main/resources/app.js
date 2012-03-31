// Enabling ExtJS to automatically load application components
Ext.onReady(function() {
    Ext.Loader.setConfig({enabled:true});
});

// a simple application cofiguration consisting of a viewport, main form with a button and a popup window
Ext.application({

    name : 'test',

    controllers : [
        'Main',
        'Popup'
    ],

    launch : function() {
        Ext.create('Ext.container.Viewport', {
            layout  : 'fit',
            items   : [
                {
                    xtype   : 'mainform'
                }
            ]
        });
    }

});




