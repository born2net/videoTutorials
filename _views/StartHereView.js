/**
 @class StartHereView
 @constructor
 @return {object} instantiated StartHereView
 **/
define(['jquery', 'backbone', 'StackView'], function ($, Backbone, StackView) {

    var StartHereView = Backbone.View.extend({

        /**
         Constructor
         @method initialize
         **/
        initialize: function () {
            var self = this;
            $('#videoPlayBegin').on('click',function(){
                BB.comBroker.getService('APP').playIntroVideo();
            })
        }
    });

    return StartHereView;
});