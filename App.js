/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/

define(['underscore', 'backbone', 'backbone.controller', 'ComBroker', 'Lib', 'easing'], function (_, Backbone, backbonecontroller, ComBroker, Lib, easing) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            window.BB = Backbone;
            BB.globs = {};
            BB.SERVICES = {};
            BB.EVENTS = {};
            BB.LOADING = {};
            BB.CONSTS = {};
            BB.globs['UNIQUE_COUNTER'] = 0;
            BB.globs['RC4KEY'] = '226a3a42f34ddd778ed2c3ba56644315';
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.lib.addBackboneCollectionSave();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'no_pass'}
            });
            $('#inner_wrapepr5').on('click',function(){
                alert('clicked');
            })
        }
    });
    return App;
});
