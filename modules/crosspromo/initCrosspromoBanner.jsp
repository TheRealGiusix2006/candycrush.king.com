    var banners = [
        {
            id: "22011",
            name: 'blossomblastsaga',
            img: "http://localhost/images/cross-promo-banner/games/ef313bb0-83d2-4893-9cf8-cbbd02f9d071.png",
            hover: "http://localhost/images/cross-promo-banner/games/fa96b2ee-7eab-4ed6-b59b-d393b91b6646.png",
            link: "https://apps.facebook.com/blossom_blast_saga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "e9e0b6f2192103e5"
        },
        {
            id: "564",
            name: 'bubblewitchthree',
            img: "http://localhost/images/cross-promo-banner/games/06dadb8b-5dd0-4269-9f8c-a65e150557c7.png",
            hover: "http://localhost/images/cross-promo-banner/games/c7062e75-ec13-48c3-8cc2-9942b58e368d.png",
            link: "https://apps.facebook.com/bubblewitch-three/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: null
        },
        {
            id: "387",
            name: 'bubblewitchtwo',
            img: "http://localhost/images/cross-promo-banner/games/0756cd72-13d8-43d4-ba6f-cbd47070b0db.png",
            hover: "http://localhost/images/cross-promo-banner/games/dd669de1-79ca-48df-bb8e-0469a749d75b.png",
            link: "https://apps.facebook.com/bubblewitch-two/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: null
        },
        {
            id: "234",
            name: 'papapearsaga',
            img: "http://localhost/images/cross-promo-banner/games/56c16bf4-0754-40fe-80df-d67abb1f8090.png",
            hover: "http://localhost/images/cross-promo-banner/games/79e6dadf-f8e5-410a-9e62-1f161d2088ad.png",
            link: "https://apps.facebook.com/papapearsaga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: null
        },
        {
            id: "8",
            name: 'alphabettysaga',
            img: "http://localhost/images/cross-promo-banner/games/00fca23f-7fdd-4b58-be1f-d30d0135e4d5.png",
            hover: "http://localhost/images/cross-promo-banner/games/d008aa7c-3ff2-4c2d-9266-4a7334c661eb.png",
            link: "https://apps.facebook.com/alphabettysaga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: null
        },
        {
            id: "16012",
            name: 'rakdos',
            img: "http://localhost/images/cross-promo-banner/games/e7361607-0966-4e74-9e3a-de33eecec394.png",
            hover: "http://localhost/images/cross-promo-banner/games/70b81100-0557-4ba9-b920-1108fd5dcd52.png",
            link: "https://apps.facebook.com/candycrushjelly/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "b27457aa3b9ad97a"
        },
        {
            id: "744",
            name: 'stritz',
            img: "http://localhost/images/cross-promo-banner/games/nohover_soda.png",
            hover: "http://localhost/images/cross-promo-banner/games/hover_soda.png",
            link: "https://apps.facebook.com/candycrushsoda/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "003145f97d605101"
        },
        {
            id: "226",
            name: 'farmking',
            img: "http://localhost/images/cross-promo-banner/games/dd61fa8c-8492-45d6-b346-0a11671a8e5c.png",
            hover: "http://localhost/images/cross-promo-banner/games/9d5161ae-e43b-47ab-a1a1-47f780fa2886.png",
            link: "https://apps.facebook.com/farmheroes/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "f90ae47d91b02ac0"
        },
        {
            id: "10226",
            name: 'superfarmking',
            img: "http://localhost/images/cross-promo-banner/games/da426ba8-f517-4907-aa3e-171addf880a3.png",
            hover: "http://localhost/images/cross-promo-banner/games/f29a7a91-0727-475b-a431-25cb6b3e65ad.png",
            link: "https://apps.facebook.com/farmheroessupersaga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "f90ae47d91b02ac0"
        },
        {
            id: "162",
            name: 'petrescue',
            img: "http://localhost/images/cross-promo-banner/games/2e0658bb-544e-4941-b66a-40968abcdf42.png",
            hover: "http://localhost/images/cross-promo-banner/games/2e0658bb-544e-4941-b66a-40968abcdf42.png",
            link: "https://apps.facebook.com/petrescuesaga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: "784988a9776b087e"
        },
        {
            id: "110",
            name: 'diamonddiggersaga',
            img: "http://localhost/images/cross-promo-banner/games/f0830333-4599-4298-8442-671aafce3545.png",
            hover: "http://localhost/images/cross-promo-banner/games/f0830333-4599-4298-8442-671aafce3545.png",
            link: "https://apps.facebook.com/diamonddiggersaga/?type=partner&st1=kinghubs&st2={kingappid}&st3=topbanner",
            trackId: null
        }
    ];
    var GLOBAL_BANNER_UD = 'xpbud';

    function KingBlingCrosspromoTopBanner(banners, options, bannerUD) {
        var MIN_JQUERY_REQUIRED = '1.4.3';

        var settings = {
            rotationTime: options.rotationTime || 7,
            bannerWidth: options.bannerWidth || 124,
            bannerMargin: options.bannerMargin || 2
        };
        var ud = bannerUD || {};
        var bannerOuterWidth = settings.bannerWidth + settings.bannerMargin;
        var bannerRotationDelay = settings.rotationTime * 1000;
        var bannerTweeningDuration = 500;
        var bannerTimer;
        var isCurrentlyRotating = false;
        var displayBanners = [];
        var $carouselContent = $('#kbCrosspromoTopBannerCnt .carouselCnt');
        var _this = this;

        var init = function() {
            displayBanners = filterBannersByName(banners, ud.kingAppShortName);

            addBlingUserMetrics();
            createBanners();

            if ($().jquery < MIN_JQUERY_REQUIRED) {
                throw Error('You\'re using an incompatible jQuery version. Please upgrade it to minimum ' + MIN_JQUERY_REQUIRED);
                return;
            }

            if (shouldDisplayScroll()) {
                setRotationTimer(true);

                $('#kbCrosspromoTopBannerCnt').hover(function() {
                    setRotationTimer(false);
                }, function() {
                    setRotationTimer(true);
                });

                $('#kbCrosspromoTopBannerCnt .navigationButton.left').click(function() {
                    _this.rotateBanner('right');
                });
                $('#kbCrosspromoTopBannerCnt .navigationButton.right').click(function() {
                    _this.rotateBanner('left');
                });
            }
            else {
                $('#kbCrosspromoTopBannerCnt .carouselCnt').addClass('bannersCentered');
                $('#kbCrosspromoTopBannerCnt .navigationButton').hide();
            }

            tearDown();
        };

        var tearDown = function() {
            if (window[GLOBAL_BANNER_UD]) {
                delete window[GLOBAL_BANNER_UD];
            }
        };

        var addBlingUserMetrics = function() {
            $('#kbCrosspromoTopBannerCnt').attr('blingUserMetrics', ud.blingUserMetrics ? JSON.stringify(ud.blingUserMetrics) : 'null');
        };

        var parseLink = function(link) {
            return link.replace(/\{kingappid\}/, ud.kingAppShortName);
        };

        var filterBannersByName = function(collectionBanners, name) {
            var result = [];

            for(var i = 0; i < collectionBanners.length; i++) {
                if(collectionBanners[i].name !== name) {
                    result.push(collectionBanners[i]);
                }
            }

            return result;
        }

        var createBanners = function() {
            for (var idx = 0, xPosCounter = 0; idx < displayBanners.length; idx++) {
                (function()  {
                    var bannerObj = displayBanners[idx];

                    var tmpCss = {
                        'left': (xPosCounter * bannerOuterWidth) + 'px',
                        'background-image' : "url('" + bannerObj.img + "')"
                    };

                    var $tmpBanner = $('<div/>')
                        .attr({'class': 'bannerItemCnt'})
                        .attr({'bannerId': bannerObj.id})
                        .css(tmpCss)
                        .hover(function() {
                            $(this).css('background-image', "url('" + bannerObj.hover + "')");
                        }, function() {
                            $(this).css('background-image', "url('" + bannerObj.img + "')");
                        });

                    var $tmpHyperlink = $('<a/>')
                        .attr({
                            'href': parseLink(bannerObj.link),
                            'target': '_blank'
                        })
                        .css({
                            'position': 'absolute',
                            'left': '0',
                            'top': '0',
                            'width': '100%',
                            'height': '100%'
                        });

                    $tmpBanner.append($tmpHyperlink);
                    $carouselContent.append($tmpBanner);

                    xPosCounter++;
                })();
            }
        };

        var setRotationTimer = function(onOffMode) {
            clearInterval(bannerTimer);

            if (onOffMode) {
                bannerTimer = setInterval(function() {
                    _this.rotateBanner('left');
                }, bannerRotationDelay + bannerTweeningDuration);
            }
        };

        var computeAvailableWidth = function() {
            return displayBanners.length * settings.bannerWidth;
        };

        var shouldDisplayScroll = function() {
            var contentWidth = $('#kbCrosspromoTopBannerCnt .carouselCnt').width();

            return contentWidth < computeAvailableWidth();
        };

        this.rotateBanner = function(direction) {
            if (isCurrentlyRotating) {
                return;
            }

            isCurrentlyRotating = true;

            var $bannerItemsArray = $carouselContent.find('.bannerItemCnt');

            if(direction === 'right') {
                var $firstBannerItem = $bannerItemsArray.first();
                var $lastBannerItem = $bannerItemsArray.last();
                var newPosition = -bannerOuterWidth;

                $lastBannerItem.css('left', newPosition + 'px').insertBefore($firstBannerItem);
                $bannerItemsArray.animate({
                    left:'+=' + bannerOuterWidth + 'px'
                }, bannerTweeningDuration, 'swing', function rotateRightEnd() {
                    isCurrentlyRotating = false;
                });
            }
            else if(direction === 'left') {
                $bannerItemsArray.animate({
                    left:'-=' + bannerOuterWidth + 'px'
                }, bannerTweeningDuration, 'swing', function rotateLeftEnd()  {
                    var $firstBannerItem = $bannerItemsArray.first();
                    var $lastBannerItem = $bannerItemsArray.last();
                    var newPosition = (displayBanners.length * bannerOuterWidth) - bannerOuterWidth;

                    $firstBannerItem.css('left', newPosition + 'px').insertAfter($lastBannerItem);

                    isCurrentlyRotating = false;
                });
            }
        }

        init();
    };

    $(document).ready(function () {
		$("#topBanner").append('<style type="text/css">#kbCrosspromoTopBannerCnt{position:relative;margin-bottom:10px;top:9px;left:-2px;width:768px;height:71px;z-index:1}.kbCrosspromoTopBannerCntLeft{background:url(\'http://localhost/images/cross-promo-banner/5-banners-bg-sprite.png?_v=ly1ku2\') no-repeat;width:124px;height:71px;float:left}.kbCrosspromoTopBannerCntCenter{background:url(\'http://localhost/images/cross-promo-banner/5-banners-bg-px.png?_v=2sx8eg\') repeat-x;position:absolute;height:71px;width:598px;left:124px;float:left}.kbCrosspromoTopBannerCntRight{background:url(\'http://localhost/images/cross-promo-banner/5-banners-bg-sprite.png?_v=ly1ku2\') no-repeat -125px 0;position:absolute;width:46px;height:71px;right:0}#kbCrosspromoTopBannerCnt .navigationButton{position:absolute;top:2px;width:32px;height:65px;cursor:pointer;z-index:1}#kbCrosspromoTopBannerCnt .navigationButton.left{left:81px;background:url(\'http://localhost/images/cross-promo-banner/buttons.png\') no-repeat;background-position:0 0}#kbCrosspromoTopBannerCnt .navigationButton.left:hover{background-position:0 -65px}#kbCrosspromoTopBannerCnt .navigationButton.left:active{background-position:0 -130px}#kbCrosspromoTopBannerCnt .navigationButton.right{right:3px;background:url(\'http://localhost/images/cross-promo-banner/buttons.png?_v=1snfsbr\') no-repeat;background-position:-32px 0}#kbCrosspromoTopBannerCnt .navigationButton.right:hover{background-position:-32px -65px}#kbCrosspromoTopBannerCnt .navigationButton.right:active{background-position:-32px -130px}#kbCrosspromoTopBannerCnt .carouselCnt.bannersCentered{text-align:center;width:630px}#kbCrosspromoTopBannerCnt .carouselCnt.bannersCentered .bannerItemCnt{display:inline-block;position:static !important;margin:0 1px}#kbCrosspromoTopBannerCnt .carouselCnt.bannersCentered .bannerItemCnt > a{position:static !important;display:inline-block}#kbCrosspromoTopBannerCnt .carouselCnt{position:absolute;top:-7px;left:110px;width:628px;height:69px;overflow:hidden}#kbCrosspromoTopBannerCnt .carouselCnt .bannerItemCnt{position:absolute;top:0;left:0;width:124px;height:69px;cursor:pointer;background-repeat:no-repeat}</style><div id="kbCrosspromoTopBannerCnt"><div class="kbCrosspromoTopBannerCntLeft"><div class="navigationButton left"></div></div><div class="kbCrosspromoTopBannerCntCenter"></div><div class="kbCrosspromoTopBannerCntRight"><div class="navigationButton right"></div></div><div class="carouselCnt"></div></div>');
        var crosspromoBanner = new KingBlingCrosspromoTopBanner(banners, {}, window[GLOBAL_BANNER_UD]);
    });
