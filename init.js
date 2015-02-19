/**
 Require js initialization module definition file for StudioLite
 @class Require init js
 **/

require.config({
    waitSeconds: 25,
    baseUrl: '/videoTutorials',
    paths: {
        'jquery': '_common/_jquery/std/jq1.9.1/jquery-1.9.1',
        'easing': '_common/_jquery/easing/easing',
        'jstree': '_common/_js/jstree/dist/jstree',
        'jstreesearch': '_common/_js/jstree/src/jstree.search',
        'backbone': '_common/_js/backbone/backbone',
        'text': '_common/_js/requirejs/text',
        'backbone.controller': '_common/_js/backbone-controller/backbone.controller',
        'video': '_common/_js/video/video.dev',
        'videospeed': '_common/_js/video/video-speed',
        'RC4': '_common/_js/rc4/RC4',
        'Lib': '_libs/Lib',
        'bootbox': '_common/_js/bootbox/bootbox',
        'nouislider': '_common/_js/nouislider/jquery.nouislider',
        'platform': '_common/_js/platform/platform',
        'jsencrypt': '_common/_js/encrypts/jsencrypt',
        'gibberish-aes': '_common/_js/encrypts/gibberish-aes',
        'md5': '_common/_js/encrypts/md5',
        'moment': '_common/_js/moment/moment',
        'Cookie': '_common/_js/cookie/cookie',
        'ComBroker': '_controllers/ComBroker',
        'XDate': '_common/_js/xdate/xdate',
        'simplestorage': '_common/_js/simplestorage/simpleStorage',
        'underscore': '_common/_js/underscore/underscore',
        'bootstrap': '_common/_js/bootstrap/js/bootstrap',
        'socketio': '_common/_js/socketio/socketio',
        'Elements': 'Elements',
        'localizer': '_common/_js/localizer/dist/jquery.localize',
        'LayoutRouter': '_controllers/LayoutRouter',
        'MailWasp': '_controllers/MailWasp',
        'EverNodes': '_controllers/EverNodes',
        'StackView': '_libs/StackView',
        'HistoryView': '_views/HistoryView',
        'VideoDetailsView': '_views/VideoDetailsView',
        'StartHereView': '_views/StartHereView'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.controller': {
            deps: ['underscore', 'jquery']
        },
        'LayoutRouter': {
            deps: ['Elements', 'backbone.controller']
        },
        'easing': {
            deps: ['jquery'],
            exports: 'jQuery.easing'
        },
        'videospeed': {
            deps: ['video']
        },
        'jstree': {
            deps: ['jquery'],
            exports: 'jstree'
        },
        'jstreesearch': {
            deps: ['jstree'],
            exports: 'jstree'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'Cookie': {
            deps: ['jquery'],
            exports: 'cookie'
        },
        'socketio': {
            exports: 'socketio'
        },
        'nouislider': {
            exports: 'nouislider'
        },
        'ComBroker': {
            deps: ['backbone', 'jquery']
        },
        'Elements': {
            exports: 'Elements'
        },
        'bootbox': {
            deps: ['jquery'],
            exports: 'bootbox'
        },
        'RC4': {
            exports: 'RC4'
        },
        'jsencrypt': {
            exports: 'jsencrypt'
        }
    }
});

require(['App'], function (App) {
    new App();
});