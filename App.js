/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/

define(['underscore', 'backbone', 'backbone.controller', 'Lib', 'easing', 'jstree'], function (_, Backbone, backbonecontroller, Lib, easing, jstree) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            window.BB = Backbone;
            BB.globs = {};
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.lib.addBackboneCollectionSave();
            window.log = BB.lib.log;
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'no_pass'}
            });

            self.initTree();

        },

        initTree: function () {
            var self = this;
            $("#demo1").jstree({
                "xml_data" : {
                    "ajax" : {
                        "url" : "/videoTutorials/_data/mediaCloud.xml",
                        "success" : function(data, textStatus, XMLHttpRequest){
                            setTimeout(function(){
                                $('a').on('click',function(e){
                                    log($(this).attr('videoURL'));
                                })
                            },250)

                        }
                    },
                    "xsl" : "nest"
                },
                "plugins": ["themes", "xml_data", "ui", "crrm"],
                // each plugin you have included can have its own config object
                "core": {
                    "animation": 100,
                    "initially_open": ["phtml_1"]
                },
                // set a theme
                "themes": {
                    "theme": "photonui"
                }
            })
        }
    });
    return App;
});
