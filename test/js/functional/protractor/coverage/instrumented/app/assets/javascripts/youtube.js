(function($, window, document, undefined){

    var $window = Intuit.$window;
    $.extend(Intuit.Library.Video, {

        YouTubePlayer: (function() {

            var videos = {},
                defaults = {
                    // following are straight from the google API @ https://developers.google.com/youtube/player_parameters#showinfo
                    wmode: 'transparent',
                    showinfo: 0,
                    enablejsapi: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    origin: getOrigin(),
                    rel: false,
                    controls:2
                },
                getPlayer,
                initializeApiPlayer,
                processVideoQueue,
                processOptions,
                autoInsert;

            function getOrigin () {
                return window.location.host;
            }

            function onPlayerStateChange(event) {
                if (event.data) {
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:
                            setTimeout(function(){
                                var targetId = $(event.target.a).attr('id'), parentId, player;
                                for (parentId in videos) {
                                    if (parentId !== targetId) {
                                        player = videos[parentId];
                                        player.pauseVideo();
                                        player.cueVideoById(player.b.b.videoId, player.getCurrentTime());
                                    }
                                }
                            }, 0);
                            break;
                    }
                }
            }

            function injectVideo (containerId, options) {
                var ytPlayer, $containerId = $('#'+containerId),
                    $elems = $($containerId.parents().filter(':hidden').get().reverse()),
                    settings = {
                        opacity: 0,
                        display: 'block'
                    },
                    _settings = {
                        position: 'absolute',
                        top: -20000
                    },
                    existing = [],
                    width;

                $elems.length === 0 && (width = $containerId.width());

                $elems.each(function(index){
                    var tmp = {},
                        i;
                    for (i in settings) {
                        tmp[i] = this.style[i];
                        this.style[i] = settings[i];
                    }
                    width = $containerId.width();
                    if (index === 0) {
                        for (i in _settings) {
                            tmp[i] = this.style[i];
                            this.style[i] = _settings[i];
                        }
                    }
                    existing.push(tmp);
                    if (width) {
                        return false;
                    }
                });

                function resetStyles() {
                    $elems.each(function(index){
                        var i, comboSettings = index === 0 ? $.extend({},settings,_settings) : settings;
                        for (i in comboSettings) {
                            if (typeof existing[index] === 'undefined') {
                                return false;
                            }
                            typeof existing[index][i] !== 'undefined' && (this.style[i] = existing[index][i]);
                        }
                    });
                }

                ytPlayer = new YT.Player(containerId, $.extend(options, {
                    width:width,
                    height:parseInt(width / (16 / 9)),
                    events: {
                        'onReady': function() {
                            resetStyles();
                        },
                        'onStateChange' : onPlayerStateChange
                    }
                }));
                if (document.all && !document.querySelector) {
                    resetStyles();
                }
                return ytPlayer;
            }

            window.onYouTubePlayerAPIReady = function() {
                processVideoQueue();
            };

            processVideoQueue = function() {
                var parentContainer, options;
                for (parentContainer in videos) {
                    $('#'+parentContainer).length && (
                        options = $.extend(true, {}, defaults, videos[parentContainer]),
                            videos[parentContainer] = injectVideo(parentContainer, processOptions(options))
                        );
                }
            };

            getPlayer = function(id) {
                return videos[id];
            }

            processOptions = function(options) {
                var name, value, output = {};
                output.playerVars = {};
                for (name in options) {
                    value = options[name];
                    name = name.toLowerCase();
                    value =
                        (value === true || value === 'true') ? 1 :
                            (value === false || value === 'false') ? 0 : value;

                    switch (name) {
                        case 'videoid':
                            output['videoId'] = value;
                            break;
                        default:
                            output.playerVars[name] = value;
                    }
                }
                return output;
            };

            initializeApiPlayer = function() {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/player_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            };

            autoInsert = function() {
                var youTube = Intuit.Library.Video.YouTubePlayer,
                    firstAutoPlay = true;

                $('.cvideo').each(function(index){

                    var $this = $(this),
                        videoId = $this.attr('data-youtube-id'),
                        containerId = ['video', index, videoId].join('_'),
                        hasAutoPlay = $this.attr('data-autoplay') === 'on' ? true : false;

                    $this.append($('<div></div>').attr('id', containerId));

                    youTube.insert(containerId, videoId, {
                        autoPlay: firstAutoPlay && hasAutoPlay
                    });

                    hasAutoPlay && (firstAutoPlay = false);

                });
            };

            // based on custom load event, avoids race conditions
            $.wload(function(){
                autoInsert();
                initializeApiPlayer();
            });

            return {
                insert: function(parentContainerEl, videoId, options) {
                    videos[parentContainerEl] = $.extend({
                        videoId:videoId
                    }, options || {});
                    return this;
                },
                play: function(parentContainerEl) {
                    var player = getPlayer(parentContainerEl);
                    player && player.playVideo();
                    return this;
                },
                pause: function(parentContainerEl) {
                    var player = getPlayer(parentContainerEl);
                    player && player.pauseVideo();
                    return this;
                },
                // in spec/dummy/app/assets/javascripts/ dir
//                getPlayer: function(parentContainerEl){
//                    var player = getPlayer(parentContainerEl);
//                    return player;
//                },
                //return the player's state by using google api's player.getPlayerState();
                getState: function(parentContainerEl){
                    console.log(">>>>>>>>>>>>>>> IN GET STATE<<<<<<<<<<<<<<<<");
                    console.log("parentContainerEl = " + parentContainerEl);
                    var player = getPlayer(parentContainerEl);
                    console.log("+++++++++ player = " + player);
                    player.getPlayerState();
                }

            }
        }())
    });

}(jQuery, window, document));