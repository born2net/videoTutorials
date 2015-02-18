/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/

define(['underscore', 'backbone', 'backbone.controller', 'Lib', 'easing', 'jstree', 'video', 'videospeed'], function (_, Backbone, backbonecontroller, Lib, easing, jstree, videojs, videospeed) {
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
            videojs(BB.lib.unhash('videoIntro'),{
                controls: true,
                autoplay: false,
                preload: 'auto',
                plugins: {
                    speed: [
                        {text: '2', rate: 2, selected: true},
                        {text: '1', rate: 1},
                        {text: '4', rate: 4},
                        {text: '8', rate: 8}
                    ]
                }
            }).ready(function () {
                self.m_videoPlayer = this;
                $('#videoIntro').width(1000).height(600);
                self.m_videoPlayer.load();
                self.m_videoPlayer.on('ended', function () {
                    self.endVideo();
                });
            });

            $('#exitVideo').on('click', function () {
                self.endVideo();
            })
        },

        endVideo: function () {
            var self = this;
            $('#exitVideo').hide();
            $('#videoPlayerContainer').fadeOut('fast', function () {
                self.m_videoPlayer.pause();
                $('#demo1').fadeIn();
            });
        },

        initTree: function () {
            var self = this;
            $('#demo1').jstree({
                'core': {
                    "themes": {
                        "name": "default-dark",
                        "dots": true,
                        "icons": true
                    },
                    'data': {
                        "url": "/videoTutorials/_data/videos.json",
                        "dataType": "json"
                    }
                }
            }).on('changed.jstree', function (e, data) {
                var url = data.node.original.url;
                if (_.isUndefined(url))
                    return;
                $('#demo1').fadeOut('fast', function () {
                    $('#videoPlayerContainer').fadeIn();
                    $('#videoIntro').find('video:nth-child(1)').attr("src", url);
                    $('#videoIntro').width(960).height(576);
                    self.m_videoPlayer.play();
                    $('#exitVideo').fadeIn();
                });
                // var i, j, r = [];
                // for (i = 0, j = data.selected.length; i < j; i++) {
                //     r.push(data.instance.get_node(data.selected[i]).text);
                // }
                // $('#event_result').html('Selected: ' + r.join(', '));
            });

        }
    });
    return App;
});
