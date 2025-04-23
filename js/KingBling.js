var KingBlingModuleTypeMap = {
    VIDEO_AD_ADTECH_1: "VIDEO_AD_ADTECH_1",
    IFRAME_1: "IFRAME_1",
    CROSSPROMO_BANNER_TOP: "CROSSPROMO_BANNER_TOP",
    CROSSPROMO_BANNER_BOTTOM: "CROSSPROMO_BANNER_BOTTOM"
};


/**
 * KingBlingUtils class
 */
var KingBlingUtils = new function()
{
    // Regexp to check if string only holds a number.
    // The regexp says following:
    // 1. Must start with at least one digit.
    // 2. If decimal section is provided.
    //    a. decimal section must start with a . dot
    //    b. decimal section must hold at least one digit.
    var numberPattern = /^\d+(\.\d+){0,1}$/;


    var log = function(message, obj)
    {
        if (window.console) {
            console.log(message, obj);
        } else {
            alert(message + "\n" + message);
        }
    };

    var logConsole = function(message, obj)
    {
        if (window.console) {
            console.log(message, obj);
        }
    };

    var isTrue = function(obj) {
        return (obj === true) || (obj == "true") || (obj == "1");
    };

    var isFalse = function(obj) {
        return (obj === false) || (obj == "false") || (obj == "0");
    };

    var isBoolean = function(obj) {
        return (obj === true) || (obj == "true") || (obj == "1") || (obj === false) || (obj == "false") || (obj == "0");
    };

    // validates number format of provided string
    // for details of valid formats see comment where numberPattern id declared
    var containsNumbersOnly = function(obj)
    {
        return numberPattern.test(obj);
    };

    var isString = function(obj) {
        return (typeof obj == "string") && ((obj.length > 0));
    };

    var isFunction = function(obj) {
        return obj && (typeof obj == "function");
    };

    var isParameter = function(obj)
    {
        if ((typeof obj == "string") || (typeof obj == "number") || (typeof obj == "boolean"))
        {
            obj += '';

            if (obj.length > 0) {
                return true;
            }
        }

        return false;
    };

    var isNullUndefined = function(obj)
    {
        return (obj === null) || (obj === undefined) ||
               (obj === "null") || (obj === "undefined") ||
               (obj == "");
    };

    var isNullUndefinedEmpty = function(obj)
    {
        if ((obj === null) || (obj === "null")) {
            return true;
        }

        if ((obj === undefined) || (obj === "undefined")) {
            return true;
        }

        if ((typeof obj === "object")) {
            return false;
        }

        if ((typeof obj === "number") && !isNaN(obj)) {
            return false;
        }

        // object has a length in type (str, array, object/associative-array) but its length is 0
        if ((obj && obj.length && (obj.length === 0))) {
            return true;
        }

        // object has a size in type (str, array, object/associative-array) but its length is 0
        if (sizeOfObject(obj) === 0) {
            return true;
        }

        return false;
    };

    var sizeOfObject = function(obj)
    {
        var counter = 0;

        for (var k in obj) {
            counter++;
        }

        return counter;
    };

    /**
     * Needed for iframe communication.
     * • Video ad module.
     * • Iframe module for adtech.jsp and openx.jsp.
     */
    var syncDomains = function()
    {
        if (document.domain.indexOf("midasplayer.com") >= 0) {
            document.domain = "midasplayer.com";
        }
        else if (document.domain.indexOf("king.com") >= 0) {
            document.domain = "king.com";
        }
    };

    return {
        log: log,
        logConsole: logConsole,

        isTrue: isTrue,
        isFalse: isFalse,
        isBoolean: isBoolean,

        containsNumbersOnly: containsNumbersOnly,
        isString: isString,

        isFunction: isFunction,
        isParameter: isParameter,

        isNullUndefined: isNullUndefined,
        isNullUndefinedEmpty: isNullUndefinedEmpty,

        sizeOfObject: sizeOfObject,

        syncDomains: syncDomains
    }
};


/**
 * CrossPromoBannerAd class.
 */
var CrossPromoBannerAd = function(plataformaUserData)
{
    var REQUIRED_OPTION_NOT_DEFINED = "Required option is not defined/valid: ";
    var REQUIRED_OPTION_NOT_CORRECT = "Required option is not correct: ";

    // members
    var mPlataformaUserData = plataformaUserData;
    var mIsLoggingEnabled = false;
    var mBottomBannerCallback;


    var log = function(message)
    {
        if (!mIsLoggingEnabled) {
            return;
        }

        KingBlingUtils.log("[KingBling-CrossPromoBannerAd]", message);
    };


    var open = function(kingBlingModuleType, targetDiv, options)
    {
        var optionsExist = KingBlingUtils.sizeOfObject(options);
        var placement;

        // URL debug parameter
        if (KingBlingUtils.isTrue(optionsExist && options.debug)) {
            mIsLoggingEnabled = true;
        }


        // CHECK: required settings
        if (!KingBlingUtils.isParameter(kingBlingModuleType)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "kingBlingModuleType");
            return;
        }
        if ($("#" + targetDiv).length === 0) {
            log("Div element is missing: " + targetDiv);
            return;
        }

        if (kingBlingModuleType == KingBlingModuleTypeMap.CROSSPROMO_BANNER_TOP) {
            placement = "top";
        } else if (kingBlingModuleType == KingBlingModuleTypeMap.CROSSPROMO_BANNER_BOTTOM) {
            placement = "bottom";
        }


        // bind event handler
        $("#" + targetDiv).unbind("triggerHandler").bind("triggerHandler", function(event, extraParameters) {
            triggerHandler(extraParameters);
        });


        // copy data to members
        mBottomBannerCallback = optionsExist && options.bottomBannerCallback;


        // installed King apps
        var installedKingAppsIdLastVisitMap = JSON.stringify(mPlataformaUserData.installedKingAppsIdLastVisitMap);
        if (KingBlingUtils.isNullUndefinedEmpty(installedKingAppsIdLastVisitMap)) {
            installedKingAppsIdLastVisitMap = null;
        }


        // Bling user metrics
        var blingUserMetrics = JSON.stringify(mPlataformaUserData.blingUserMetrics);
        if (KingBlingUtils.isNullUndefinedEmpty(blingUserMetrics)) {
            blingUserMetrics = null;
        }


        // default URL
        var url = mPlataformaUserData.protocol + mPlataformaUserData.kingBlingHostname + "/modules/crosspromo/initCrosspromoBanner.jsp" +
                  "?kingAppShortName=" + mPlataformaUserData.kingAppShortName +
                  "&placement=" + placement +
                  "&kingAppId=" + mPlataformaUserData.kingAppId +
                  "&coreUserId=" + mPlataformaUserData.coreUserId +
                  "&countryCode=" + mPlataformaUserData.countryCode +
                  "&language=" + mPlataformaUserData.language +
                  "&signInSourceId=" + mPlataformaUserData.signInSourceId +
                  "&targetDiv=" + targetDiv +
                  "&installedKingAppsIdLastVisitMap=" + installedKingAppsIdLastVisitMap +
                  "&blingUserMetrics=" + blingUserMetrics;

        url += "&method=getCrosspromoBanner";    // using "method 1", also update bottomBanner.html & bottomBannerAdtech.html & bottomBannerOpenX.html

        if (options && options.width) {
            url += "&w=" + options.width;
        }

        // debug
        if (mIsLoggingEnabled)
        {
            var logObj = {
                userData: mPlataformaUserData,
                kingBlingModuleType: kingBlingModuleType,
                targetDiv: targetDiv,
                options: options,

                placement: placement,
                installedKingAppsIdLastVisitMap: installedKingAppsIdLastVisitMap,
                url: url,

                bottomBannerCallback: mBottomBannerCallback,

                debug: (optionsExist && options.debug)
            };

            log(logObj);
        }


        // begin the experience
        $.ajax({
            url: url,
            dataType: "script",
            cache: false
        });
    };


    // banner module
    var triggerHandler = function(parameters)
    {
        //log("KingBling.triggerHandler():", parameters);

        var REQUIRED_PARAMETER_NOT_DEFINED = "Required parameter is not defined/valid: ";

        // check parameters itself
        if (KingBlingUtils.sizeOfObject(parameters) === 0) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "triggerHandler(parameters)");
            return;
        }


        // check: method
        if (!KingBlingUtils.isString(parameters.method)) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "parameters.method");
            return;
        }

        // check: options
        if (KingBlingUtils.isNullUndefined(parameters.options)) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "parameters.options");
            return;
        }


        // call event handler method
        var eventHandlers = {
            "bottomBannerLoaded": bottomBannerHandler
        };

        //log("Will trigger:", parameters.method, parameters.options);

        if (eventHandlers[parameters.method]) {
            eventHandlers[parameters.method](parameters.options);
        }
        else {
            //log("Trigger event handler function not found:", parameters.method, parameters.options);
        }
    };


    /**
     * Triggered event.
     */
    var bottomBannerHandler = function(options)
    {
        if (mBottomBannerCallback) {
            mBottomBannerCallback(options);
        }
    };


    return {
        open: open
    }
};


/**
 * ModalFrame class.
 */
var ModalFrame = function(plataformaUserData)
{
    var REQUIRED_OPTION_NOT_DEFINED = "Required option is not defined/valid: ";
    var REQUIRED_OPTION_NOT_CORRECT = "Required option is not correct: ";

    // members
    var mPlataformaUserData = plataformaUserData;
    var mIsLoggingEnabled = false;
    var mIsModuleOpen = false;
    var mGiveRewardCallback, mClickCallback, mCloseCallback, mCancelCallback;


    var log = function(message)
    {
        if (!mIsLoggingEnabled) {
            return;
        }

        KingBlingUtils.log("[KingBling-ModalFrame]", message);
    };


    var open = function(kingBlingModuleType, targetDiv, options)
    {
        if (mIsModuleOpen) {
            return;
        }

        // check options itself
        if (!KingBlingUtils.sizeOfObject(options)) {
            return;
        }

        // URL debug parameter
        if (KingBlingUtils.isTrue(options.debug)) {
            mIsLoggingEnabled = true;
        }


        // COMMON: check not required options / set to default
        if (!KingBlingUtils.isParameter(options.curtainColor)) {
            options.curtainColor = "000000";
        }
        if (!KingBlingUtils.containsNumbersOnly(options.curtainOpacity)) {
            options.curtainOpacity = 0.75;
        }
        if (!KingBlingUtils.isParameter(options.adMessageKey)) {
            options.adMessageKey = "";
        }
        if (!KingBlingUtils.isParameter(options.useCloseButtonTooltip)) {
            options.useCloseButtonTooltip = true;
        }


        // VIDEO_AD_ADTECH_1: check not required options / set to default
        if (kingBlingModuleType == KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1)
        {
            if (!KingBlingUtils.isParameter(options.textColor)) {
                options.textColor = "ffffff";
            }
        }


        // COMMON: check required options
        if (!KingBlingUtils.isParameter(kingBlingModuleType)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "kingBlingModuleType");
            return;
        }
        if (!KingBlingUtils.isParameter(targetDiv)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "targetDiv");
            return;
        }
        if (!KingBlingUtils.containsNumbersOnly(options.width)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.width");
            return;
        }
        if (!KingBlingUtils.containsNumbersOnly(options.height)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.height");
            return;
        }
        if (!KingBlingUtils.isFunction(options.openCallback)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.openCallback");
            return;
        }
        if (!KingBlingUtils.isFunction(options.openSuccessCallback)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.openSuccessCallback");
            return;
        }
        if (!KingBlingUtils.isFunction(options.errorCallback)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.errorCallback");
            return;
        }
        if (!KingBlingUtils.isFunction(options.closeCallback)) {
            log(REQUIRED_OPTION_NOT_DEFINED + "options.closeCallback");
            return;
        }


        // KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1: check required option
        if (kingBlingModuleType == KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1)
        {
            if (!KingBlingUtils.containsNumbersOnly(options.placementId)) {
                log(REQUIRED_OPTION_NOT_DEFINED + "options.placementId");
                return;
            }
            if (!KingBlingUtils.isFunction(options.clickCallback)) {
                log(REQUIRED_OPTION_NOT_DEFINED + "options.clickCallback");
                return;
            }
        }


        // KingBlingModuleTypeMap.IFRAME_1: check required options
        if (kingBlingModuleType == KingBlingModuleTypeMap.IFRAME_1)
        {
            if (!KingBlingUtils.isParameter(options.contentUrl)) {
                log(REQUIRED_OPTION_NOT_DEFINED + "options.contentUrl");
                return;
            }

            if (!KingBlingUtils.containsNumbersOnly(options.contentWidth)) {
                log(REQUIRED_OPTION_NOT_DEFINED + "options.contentWidth");
                return;
            }

            if (!KingBlingUtils.containsNumbersOnly(options.contentHeight)) {
                log(REQUIRED_OPTION_NOT_DEFINED + "options.contentHeight");
                return;
            }
        }


        // check if div element exists
        if ($("#" + targetDiv).length === 0) {
            log("Div element is missing: " + targetDiv);
            return;
        }

        // bind event handler
        $("#" + targetDiv).unbind("triggerHandler").bind("triggerHandler", function(event, extraParameters) {
            triggerHandler(extraParameters);
        });


        // COMMON: copy data to members
        mCloseCallback = options.closeCallback;

        // OPTIONAL: VIDEO_AD_ADTECH_1, copy data to member
        if (kingBlingModuleType == KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1)
        {
            mGiveRewardCallback = options.giveRewardCallback;
            mClickCallback = options.clickCallback;
            mCancelCallback = options.cancelCallback;
        }


        // check if module exists
        var moduleNameToURLMap = {
            VIDEO_AD_ADTECH_1: "/modules/ad/init.jsp",
            IFRAME_1: "/modules/iframe/init.jsp"
        };

        if (!moduleNameToURLMap[kingBlingModuleType]) {
            log(REQUIRED_OPTION_NOT_CORRECT + "kingBlingModuleType");
            return;
        }


        // COMMON: build src URL
        var isSecure = (mPlataformaUserData.protocol == "https://") ? true : false;
        var initUrl = mPlataformaUserData.protocol + mPlataformaUserData.kingBlingHostname + moduleNameToURLMap[kingBlingModuleType];
        var srcURL = initUrl +
                     "?divId=" + targetDiv +
                     "&width=" + options.width +
                     "&height=" + options.height +
                     // optional
                     "&curtainColor=" + options.curtainColor +
                     "&curtainOpacity=" + options.curtainOpacity +
                     "&adMessageKey=" + options.adMessageKey +
                     "&useCloseButtonTooltip=" + options.useCloseButtonTooltip;


        // KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1: options
        if (kingBlingModuleType == KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1)
        {
            /**
             * These fallbacks are to be removed once all hubs have updated to King Bling 3/Plataforma using the video admin.
             */
            // ADTECH placement ID's (Placement 1 = Default)
            var kingAppIdToAdtechPlacementIdMap = {
                "-3": 3316823,  /* test 3 */
                "-2": 3316822,  /* test 2 */
                "-1": 3552338,  /* test 1 (old 3223157) */
                   8: 3457179,  /* "bling", "Bling crosspromo" */

                   1: 3197503,  /* "miner", "Minerspeed" */
                   5: 3197498,  /* "loveme", "Bubble Saga" */
                   6: 3197500,  /* "prince", "king_com @ Facebook" */
                   9: 3197504,  /* "puzzlesaga", "Puzzle saga" */
                  12: 3490038,  /* "bubblewitch", "Bubble witch saga" */
                  13: 3406320,  /* "mahjong", "Mahjong saga" */
                  14: 3552014,  /* "hoop", "Hoop de loop saga" */
                  15: 3823604,  /* "kingsgate", "King.com gateway" */
                  16: 3644142,  /* "pyramid", "Pyramid saga" */
                  17: 3589757   /* "candycrush", "Candy crush" */
            };

            // ADTECH placement ID's (Placement 2 = Postroll)
            var postrollPlacementIdMap = {
                 5: 3805695,  /* "loveme", "Bubble Saga" */
                 8: 3457179,  /* "bling", "Bling crosspromo" */
                12: 3805696,  /* "bubblewitch", "Bubble witch saga" */
                15: 3823145,  /* "kingsgate", "King.com gateway" */
                17: 3807641,  /* "candycrush", "Candy crush" */
                14: 3799150   /* "hoop", "Hoop de loop saga" */
            };

            var adServer;
            var adId;

            // check if game has updated to King Bling 3/Plataforma using the video admin
            if (mPlataformaUserData.videoAdPlacements)
            {
                var placementToUse = mPlataformaUserData.videoAdPlacements.placements[options.placementId];

                if (!placementToUse)
                {
                    log(REQUIRED_OPTION_NOT_DEFINED + "videoAdPlacements.placements -> " + options.placementId);
                    options.errorCallback();
                    return;
                }

                //console.log("placementToUse:", placementToUse);

                adServer = (placementToUse["adtech"]) ? "adtech" : "openx";
                adId = placementToUse[adServer];
            }
            else
            {
                log("Plataforma videoAdPlacements not defined, using fallback!");

                adServer = "adtech";
                adId = kingAppIdToAdtechPlacementIdMap[mPlataformaUserData.kingAppId];

                // override ad id (Postroll mode)
                if (options.placementId == 2) {
                    adId = postrollPlacementIdMap[mPlataformaUserData.kingAppId];
                }
            }


            // override ad id (debug mode)
            if (KingBlingUtils.containsNumbersOnly(options.testAdId))
            {
                log("Ad id overridden! " +  options.testAdId);
                adId = options.testAdId;
            }

            // override ad server (debug mode)
            if (KingBlingUtils.isString(options.testAdServer))
            {
                log("Ad server overridden! " + options.testAdServer);
                adServer = options.testAdServer;
            }

            srcURL += "&adServer=" + adServer;
            srcURL += "&adId=" + adId;
            srcURL += "&kingAppId=" + mPlataformaUserData.kingAppId;
            srcURL += "&kingAppName=" + mPlataformaUserData.kingAppShortName;
            srcURL += "&coreUserId=" + mPlataformaUserData.coreUserId;
            srcURL += "&age=" + mPlataformaUserData.age;
            srcURL += "&ageRange=" + ((mPlataformaUserData.ageRange) ? mPlataformaUserData.ageRange.from + "-" + mPlataformaUserData.ageRange.to : -1);
            srcURL += "&sex=" + mPlataformaUserData.sex;
            srcURL += "&localeId=" + mPlataformaUserData.language + '_' + mPlataformaUserData.countryCode;
            srcURL += "&signInSourceId=" + mPlataformaUserData.signInSourceId;
            srcURL += "&placementId=" + options.placementId;
            srcURL += "&secure=" + isSecure;
            // optional
            srcURL += "&textColor=" + options.textColor;
        }

        // KingBlingModuleTypeMap.IFRAME_1: options
        else if (kingBlingModuleType == KingBlingModuleTypeMap.IFRAME_1)
        {
            srcURL += "&contentUrl=" + options.contentUrl;
            srcURL += "&contentWidth=" + options.contentWidth;
            srcURL += "&contentHeight=" + options.contentHeight;
        }


        // debug
        if (mIsLoggingEnabled)
        {
            var logObj = {
                plataformaUserData: mPlataformaUserData,
                kingBlingModuleType: kingBlingModuleType,
                targetDiv: targetDiv,
                openOptions: options,

                url: srcURL,

                videoAdModule: {adId:adId, adServer:adServer, testAdId:options.testAdId, testAdServer:options.testAdServer},

                iframeModule: {iframeContentUrl:options.contentUrl, iframeContentWidth:options.contentWidth, iframeContentHeight:options.contentHeight},

                debug: options.debug
            };

            log(logObj);
        }


        // begin the experience
        options.openCallback();

        $.ajax(
        {
            url: srcURL,
            dataType: "script",
            cache: true,
            success: function(data, textStatus, jqXHR)
            {
                mIsModuleOpen = true;
                options.openSuccessCallback();
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                options.errorCallback();
            }
        });
    };


    // iframe module (video ad, iframe)
    var triggerHandler = function(triggerHandlerParameters)
    {
        KingBlingUtils.logConsole("KingBling triggerHandler (triggerHandlerParameters):", triggerHandlerParameters);

        var REQUIRED_PARAMETER_NOT_DEFINED = "Required parameter is not defined/valid: ";

        // check triggerHandlerParameters itself
        if (KingBlingUtils.sizeOfObject(triggerHandlerParameters) === 0) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "triggerHandler(triggerHandlerParameters)");
            return;
        }

        // check: method
        if (!KingBlingUtils.isString(triggerHandlerParameters.method)) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "triggerHandlerParameters.method");
            return;
        }

        // check: options
        if (KingBlingUtils.isNullUndefined(triggerHandlerParameters.options)) {
            log(REQUIRED_PARAMETER_NOT_DEFINED + "triggerHandlerParameters.options");
            return;
        }


        // event handler methods
        var eventHandlers = {
            "giveReward": giveRewardHandler,
            "clickModule": clickModuleHandler,
            "closeModule": closeModuleHandler,
            "cancelModule": cancelModuleHandler
        };


        var optionsForEventHandlerFunction = checkVideoAdPlacement(triggerHandlerParameters);

        if (optionsForEventHandlerFunction === null)
        {
            KingBlingUtils.logConsole("KingBling triggerHandler was aborted!");
            return;
        }


        KingBlingUtils.logConsole("KingBling triggerHandler (optionsForEventHandlerFunction):", optionsForEventHandlerFunction);

        // call the event
        if (eventHandlers[triggerHandlerParameters.method]) {
            eventHandlers[triggerHandlerParameters.method](optionsForEventHandlerFunction);
        }
        else
        {
            KingBlingUtils.logConsole("Event handler function not found:",
            {
                triggerHandlerParameters: triggerHandlerParameters,
                optionsForEventHandlerFunction: optionsForEventHandlerFunction
            });
        }
    };


    var checkVideoAdPlacement = function(triggerHandlerParameters)
    {
        var optionsForEventHandlerFunction = $.extend({}, triggerHandlerParameters.options);


        // video ad module
        if (triggerHandlerParameters.isVideoAdModule)
        {
            // set ads4Life
            var isAds4Life = (optionsForEventHandlerFunction.placementId == 1) ? true : false;
            optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {isAds4Life: isAds4Life});

            // set postroll
            var isPostroll = (optionsForEventHandlerFunction.placementId == 2) ? true : false;
            optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {isPostroll: isPostroll});


            // close state
            if (triggerHandlerParameters.method === "closeModule") {
                optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {giveReward: true});    // default give reward
            }
            // cancel state
            else if (triggerHandlerParameters.method === "cancelModule") {
                optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {giveReward: false});   // no reward
            }
            // give reward state
            else if (triggerHandlerParameters.method === "giveReward")
            {
                if (isPostroll)
                {
                    KingBlingUtils.logConsole("KingBling, can't give reward in postroll!");
                    return null;
                }

                optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {giveReward:true, forceGiveReward:true});
            }


            // postroll state
            if (isPostroll)
            {
                optionsForEventHandlerFunction = $.extend({}, optionsForEventHandlerFunction, {giveReward:false, giveRewardFalseBecausePostroll:"yes"});    // no reward
            }
        }
        // iframe module
        /*else if (triggerHandlerParameters.isIframeModule)
        {
            // continue, no logic yet for the iframe module
        }*/


        return optionsForEventHandlerFunction;
    };


    /**
     * Triggered event.
     */
    var giveRewardHandler = function(options)
    {
        if (mIsModuleOpen && mGiveRewardCallback)
        {
            mIsModuleOpen = false;
            mGiveRewardCallback(options);
        }
        else
        {
            KingBlingUtils.logConsole("giveRewardHandler error:", {mIsModuleOpen:mIsModuleOpen, mGiveRewardCallback:mGiveRewardCallback, options:options});
        }
    };


    /**
     * Triggered event.
     */
    var clickModuleHandler = function(options)
    {
        if (mIsModuleOpen && mClickCallback)
        {
            mIsModuleOpen = false;
            mClickCallback(options);
        }
        else
        {
            KingBlingUtils.logConsole("clickModuleHandler error:", {mIsModuleOpen:mIsModuleOpen, mClickCallback:mClickCallback, options:options});
        }
    };


    /**
     * Triggered event.
     */
    var closeModuleHandler = function(options)
    {
        if (mIsModuleOpen && mCloseCallback)
        {
            mIsModuleOpen = false;
            mCloseCallback(options);
        }
        else
        {
            KingBlingUtils.logConsole("closeModuleHandler error:", {mIsModuleOpen:mIsModuleOpen, mCloseCallback:mCloseCallback, options:options});
        }
    };


    /**
     * Triggered event.
     */
    var cancelModuleHandler = function(options)
    {
        if (mIsModuleOpen && mCancelCallback)
        {
            mIsModuleOpen = false;
            mCancelCallback(options);
        }
        else
        {
            KingBlingUtils.logConsole("cancelModuleHandler error:", {mIsModuleOpen:mIsModuleOpen, mCancelCallback:mCancelCallback, options:options});
        }
    };


    return {
        open: open
    }
};


/**
 * The main King Bling class.
 */
var KingBling = function()
{
    var mPlataformaUserData = {};


    var test = function()
    {
        KingBlingUtils.log("[KingBling-Test]", "King Bling is loaded!");
    };


    var init = function(jsonObj)
    {
        if (KingBlingUtils.isNullUndefinedEmpty(jsonObj)) {
            return false;
        }

        mPlataformaUserData.protocol = jsonObj.protocol;
        mPlataformaUserData.kingBlingHostname = jsonObj.kingBlingHostname;

        mPlataformaUserData.kingAppId = jsonObj.kingAppId;
        mPlataformaUserData.kingAppShortName = jsonObj.kingAppShortName;
        mPlataformaUserData.coreUserId = jsonObj.coreUserId;

        mPlataformaUserData.language = jsonObj.language;
        mPlataformaUserData.countryCode = jsonObj.countryCode;

        mPlataformaUserData.age = jsonObj.age;
        mPlataformaUserData.ageRange = jsonObj.ageRange;
        mPlataformaUserData.sex = jsonObj.sex;

        mPlataformaUserData.signInSourceId = jsonObj.signInSourceId;

        mPlataformaUserData.installedKingAppsIdLastVisitMap = jsonObj.installedKingAppsIdLastVisitMap;

        mPlataformaUserData.videoAdPlacements = jsonObj.videoAdPlacements;
        mPlataformaUserData.missionPlacements = jsonObj.missionPlacements;

        mPlataformaUserData.blingUserMetrics = jsonObj.userMetrics;    // since we add custom fields to the Plataforma user metrics, we convert the object to our own class

        // debug
        KingBlingUtils.logConsole("King Bling User Data", mPlataformaUserData);

        KingBlingUtils.syncDomains();
    };


    var open = function(kingBlingModuleType, targetDiv, options)
    {
        // check in-params
        if (!KingBlingUtils.isString(kingBlingModuleType) || !KingBlingUtils.isString(targetDiv)) {
            return;
        }

        switch (kingBlingModuleType)
        {
            case KingBlingModuleTypeMap.VIDEO_AD_ADTECH_1:
            case KingBlingModuleTypeMap.IFRAME_1:
                var modalFrame = new ModalFrame(mPlataformaUserData);
                modalFrame.open(kingBlingModuleType, targetDiv, options);
            break;

            case KingBlingModuleTypeMap.CROSSPROMO_BANNER_TOP:
            case KingBlingModuleTypeMap.CROSSPROMO_BANNER_BOTTOM:
                var crossPromoBannerAd = new CrossPromoBannerAd(mPlataformaUserData);
                crossPromoBannerAd.open(kingBlingModuleType, targetDiv, options);
            break;

            default:
            break;
        }
    };


    return {
        test: test,

        init: init,
        open: open
    }
};

