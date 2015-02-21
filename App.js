/**
 App MediaSignage Inc (c) open source digital signage project.
 Visit Github for license and docs: http://git.digitalsignage.com
 @class App
 @constructor
 @return {Object} instantiated App
 **/

// removed
// {"text": "Update remote Players", "url": "http://videos.signage.me/updatePlayers.mp4", "videoid": "updatePlayers","icon" : "/videoTutorials/_assets/tree_icon.png"},

define(['underscore', 'backbone', 'backbone.controller', 'Lib', 'ComBroker', 'easing', 'jstreesearch', 'video', 'videospeed', 'simplestorage'], function (_, Backbone, backbonecontroller, Lib, ComBroker, easing, jstreesearch, videojs, videospeed, simplestorage) {
    var App = Backbone.Controller.extend({

        // app init
        initialize: function () {
            var self = this;
            window.BB = Backbone;
            BB.EVENTS = {};
            BB.CONSTS = {};
            BB.globs = {};
            BB.lib = new Lib();
            BB.lib.addBackboneViewOptions();
            BB.lib.addBackboneCollectionSave();
            BB.comBroker = new ComBroker();
            BB.comBroker.name = 'AppBroker';
            window.log = BB.lib.log;
            self.m_videoLinks = {};
            $.ajaxSetup({cache: false});
            $.ajaxSetup({
                headers: {'Authorization': 'no_pass'}
            });

            self._initTree();
            self._initVideo();
            self._initViews();
            self._listenSearch();
            self._listenTreeState();
            self._listenCloseVideo();
            self._listenOpenDirectLink();

            BB.comBroker.setService('APP', self);
        },

        _listenOpenDirectLink: function(){
            var self = this;
            document.onkeypress = function (e) {
                e = e || window.event;
                if (e.keyCode!=96)
                    return;
                var recentVideos = simplestorage.get('recentVideos');
                if (_.isUndefined(recentVideos))
                    return;
                var url = recentVideos[recentVideos.length-1];
                var videoID = self.m_videoLinks[url].videoid;
                window.open('http://www.digitalsignage.com/_html/video_tutorials.html?videoNumber=' + videoID,'_blank')
            };
        },

        _initViews: function () {
            var self = this;
            require(['StackView', 'HistoryView', 'StartHereView', 'VideoDetailsView'], function (StackView, HistoryView, StartHereView, VideoDetailsView) {
                self.m_stackView = new StackView.Fader({duration: 333});

                self.m_historyView = new HistoryView({el: '#historyView'});
                self.m_startHereView = new StartHereView({el: '#startHereView'});
                self.m_videoDetailsView = new VideoDetailsView({el: '#videoDetailsView'});

                self.m_stackView.addView(self.m_historyView);
                self.m_stackView.addView(self.m_startHereView);
                self.m_stackView.addView(self.m_videoDetailsView);

                self.m_stackView.selectView(self.m_startHereView);
                BB.comBroker.setService('PanelStack', self.m_stackView);

            });


        },

        _disableContextMenu: function () {
            $('#videoIntro').bind('contextmenu', function () {
                return false;
            });
        },

        _listenTreeState: function () {
            var self = this;
            $('#expandAll').on('click', function () {
                $("#videoTree").jstree('open_all');
            });
            $('#collapseAll').on('click', function () {
                $("#videoTree").jstree('close_all');
            });
        },

        _listenSearch: function () {
            var self = this;
            var f = _.debounce(function () {
                var v = $(this).val();
                $('#videoTree').jstree(true).search(v);
            }, 500);
            $('#searchTree').on('keyup', f);
            $('#searchTree').on('focus', function(){
                $(this).val('').css({color: 'white'});
            });
        },

        _initVideo: function () {
            var self = this;
            videojs(BB.lib.unhash('videoIntro'), {
                controls: true,
                autoplay: false,
                preload: 'auto',
                plugins: {
                    speed: [
                        {text: '1', rate: 1, selected: true},
                        {text: '2', rate: 2},
                        {text: '4', rate: 4},
                        {text: '8', rate: 8}
                    ]
                }
            }).ready(function () {
                self.m_videoPlayer = this;
                $('#videoIntro').width(1000).height(600);
                self.m_videoPlayer.load();
                self.m_videoPlayer.on('ended', function () {
                    self._endVideo();
                });
            });
        },

        _listenCloseVideo: function () {
            var self = this;
            $('#exitVideo').on('click', function () {
                self._endVideo();
            })
        },

        _endVideo: function () {
            var self = this;
            $('#exitVideo').hide();
            $('#videoPlayerContainer').fadeOut('fast', function () {
                self.m_videoPlayer.pause();
                $('.hideOnPlay').fadeIn();
            });
        },

        _buildVideoLinks: function (i_data) {
            var self = this;
            if (i_data['children'])
                return self._buildVideoLinks(i_data['children']);
            _.forEach(i_data, function (i, k) {
                if (i['children']) {
                    self._buildVideoLinks(i['children']);
                } else {
                    self.m_videoLinks[i.url] = {
                        label: i['text'],
                        videoid: i['videoid']
                    };
                }
            });
        },

        _initTree: function () {
            var self = this;
            $('#videoTree').jstree({
                "plugins": ["search"],
                search: {
                    search_callback: function (str, node) {
                        if (str.length < 3)
                            return false;
                        var re = new RegExp(str, 'i');
                        return node.text.search(re) == -1 ? false : true;
                    }
                },
                'core': {
                    "themes": {
                        "name": "default-dark",
                        "dots": true,
                        "icons": true
                    },
                    'data': {
                        "url": "/videoTutorials/_data/videos.json",
                        "success": function (e) {
                            self._buildVideoLinks(e);
                        },
                        "dataType": "json"
                    }
                }
            }).on('changed.jstree', function (e, data) {
                var url = data.node.original.url;
                if (_.isUndefined(url))
                    return;
                $('.hideOnPlay').fadeOut('fast').promise().done(function () {
                    self.playUrl(url);
                });
                // var i, j, r = [];
                // for (i = 0, j = data.selected.length; i < j; i++) {
                //     r.push(data.instance.get_node(data.selected[i]).text);
                // }
                // $('#event_result').html('Selected: ' + r.join(', '));
            }).on('ready.jstree', function (e, data) {
                data.instance.search("search");
                var link = window.location.href;
                var res = link.match(/(videoNumber=)([^\@]*)/);
                if (res){
                    self._autoPlay(res[2]);
                }
            });
        },

        _autoPlay: function(i_videoid) {
            var self = this;
            var done = 0;
            _.forEach(self.m_videoLinks,function(i,url){
                if (done) return;
                if (i.videoid == i_videoid){
                    done = 1;
                    self.playUrl(url);
                }
            });
        },

        playUrl: function (i_url) {
            var self = this;
            var recentVideos = simplestorage.get('recentVideos');
            if (_.isUndefined(recentVideos))
                recentVideos = [];
            if (recentVideos.length > 20)
                recentVideos.shift();
            recentVideos.push(i_url);
            simplestorage.set('recentVideos', recentVideos);
            $('.hideOnPlay').fadeOut('fast', function () {
                $('#videoPlayerContainer').fadeIn();
                $('#videoIntro').find('video:nth-child(1)').attr("src", i_url);
                $('#videoIntro').width(960).height(576);
                self.m_videoPlayer.play();
                $('#exitVideo').fadeIn();
                var historyView = BB.comBroker.getService('HISTORY_VIEW');
                if (historyView)
                    historyView.refreshList();
            });
        },

        playIntroVideo: function () {
            var self = this;
            self.playUrl('http://videos.signage.me/DSIntro.mp4');
        },

        getVideoLinks: function(){
            var self = this;
            return self.m_videoLinks;
        }
    });

    return App;
});
