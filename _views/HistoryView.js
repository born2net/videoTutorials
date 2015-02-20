/**
 @class HistoryView
 @constructor
 @return {object} instantiated HistoryView
 **/
define(['jquery', 'backbone', 'simplestorage'], function ($, Backbone, simplestorage) {

    var HistoryView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            BB.comBroker.setService('HISTORY_VIEW',self);
            self._listenSelectHistory();
        },

        _listenSelectHistory: function(){
            var self = this;
            $('#videoPlayHistory').on('click', function () {
                BB.comBroker.getService('PanelStack').selectView(self);
                self.refreshList();
            });
        },

        _listenVideoSelected: function(){
            var self = this;
            $('.historyLinks').off('click').on('click',function(e){
                var url = $(this).data('url');
                BB.comBroker.getService('APP').playUrl(url);
            });
        },

        refreshList: function () {
            var self = this;
            var recentVideo = simplestorage.get('recentVideos');
            if (_.isUndefined(recentVideo))
                return;
            $('#recentViews').empty();
            var videoLinks = BB.comBroker.getService('APP').getVideoLinks();
            _.forEach(_.sortBy(recentVideo).reverse(), function (v) {
                if (videoLinks[v]){
                    $('#recentViews').append('<li class="historyLinks" data-url="' + v + '">'+ videoLinks[v].label + '</li>')
                }
            });
            self._listenVideoSelected();
        }
    });

    return HistoryView;
});