/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/

define(['underscore', 'backbone', 'backbone.controller', 'Lib', 'easing', 'jstree', 'video'], function (_, Backbone, backbonecontroller, Lib, easing, jstree, videojs) {
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
            self._initVideo();


        },

        _initVideo: function () {
            var self = this;
            videojs(BB.lib.unhash('videoIntro')).ready(function () {
                self.m_videoPlayer = this;
                $('#videoIntro').width(1000).height(600);
                self.m_videoPlayer.load();
                //self.m_videoPlayer.play();
            });

            $('#exitVideo').on('click', function () {
                $('#videoPlayerContainer').fadeOut('fast', function () {
                    self.m_videoPlayer.pause();
                    $('#demo1').fadeIn();
                });
            })
        },

        initTree: function () {
            var self = this;

            /*
            $.ajax({
                type: "GET",
                "url": "/videoTutorials/_data/mediaCloud.xml",
                dataType: "xml",
                "xsl": "nest",
                success: function (xmlData) {
                    var xmlstr = xmlData ? xmlData : ( new XMLSerializer()).serializeToString(xmlData)
                    xmlstr = xmlstr.replace(/\r/ig,'');
                    xmlstr = xmlstr.replace(/\n/ig,'');
                    xmlstr = xmlstr.replace(/\t/ig,'');

                    var x = ''
                    x += '<root>'
                    x += '<item id="xml_1">'
                    x += '<content><name><![CDATA[Root node 1]]></name></content>'
                    x += '<item id="xml_2">'
                    x += '<content><name><![CDATA[Child node 1]]></name></content>'
                    x += '</item>'
                    x += '</item>'
                    x += '</root>'

                    $("#demo1").jstree({
                        "xml_data": {
                            "data": x
                        },
                        "plugins": ["themes", "xml_data", "ui", "crrm"],
                        "core": {
                            "animation": 100,
                            "initially_open": ["phtml_1"]
                        },
                        "themes": {
                            "theme": "photonui"
                        }
                    });
                }
            });
            */

            $("#demo1").jstree({
                "xml_data": {
                    "ajax": {
                        "url": "/videoTutorials/_data/mediaCloud.xml",
                        dataType: "text",
                        "error": function (data, textStatus, XMLHttpRequest) {
                            alert('problem loading xml')
                        },
                        "success": function (data, textStatus, XMLHttpRequest) {
                            setTimeout(function () {
                                $('a').on('click', function (e) {
                                    var url = $(this).attr('url');
                                    if (_.isUndefined(url))
                                        return;
                                    $('#demo1').fadeOut('fast', function () {
                                        $('#videoPlayerContainer').fadeIn();
                                        $('#videoIntro').find('video:nth-child(1)').attr("src", url);
                                        $('#videoIntro').width(960).height(576);
                                        self.m_videoPlayer.play();
                                    });
                                })
                            }, 250)

                        }
                    },
                    "xsl": "nest"
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
