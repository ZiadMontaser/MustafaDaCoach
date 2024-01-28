function getFirstRealElement(n) {
    "use strict";
    return ko.utils.arrayFirst(ko.virtualElements.childNodes(n) || [], function(n) {
        return n.nodeType === 1
    })
}
function getDateNumberDisplayFormattingCultureCode() {
    var n = appViewModel.sessionSettings.cultureCode;
    return n === "ar-SA" || n === "fa-IR" ? "en-US" : n
}
function initLayout() {
    var n;
    return (typeof initLoggedInLayout == "function" ? n = initLoggedInLayout() : typeof initNotLoggedInLayout == "function" ? n = initNotLoggedInLayout() : typeof initCleanLayout == "function" ? n = initCleanLayout() : typeof initEmptyLayout == "function" && (n = initEmptyLayout()),
    !n) ? (layoutInitialisedDeferred.resolve(),
    layoutInitialisedDeferred.promise) : (n.then(function() {
        layoutInitialisedDeferred.resolve()
    }),
    layoutInitialisedDeferred.promise)
}
function hashSantize(n) {
    return n ? n.replace(/[:.[\],]/g, "\\$1") : ""
}
function resizeBackground() {
    $("#background").height($(window).height() + 60)
}
var Helper = function() {
    function n() {}
    return n.addMinutesToDate = function(n, t) {
        return t === void 0 && (t = new Date),
        t.setTime(t.getTime() + n * 6e4),
        t
    }
    ,
    n.addDaysToTimeStamp = function(n, t) {
        var i = new Date(n * 1e3);
        return i.setDate(i.getDate() + t),
        i.getTime() / 1e3
    }
    ,
    n.unixTimeStamp = function() {
        return moment(moment.utc().valueOf()).unix()
    }
    ,
    n.calculateDaysSinceTimestamp = function(n, t) {
        t === void 0 && (t = !1);
        var r = 864e5
          , i = new Date
          , u = new Date(n * 1e3);
        return t ? (i.setHours(0, 0, 0, 0),
        Math.ceil((i.getTime() - u.getTime()) / r)) : Math.floor((i.getTime() - u.getTime()) / r)
    }
    ,
    n.getEnumKeyByEnumValue = function(n, t) {
        var i, r = Object.keys(n).filter(function(i) {
            return n[i] == t
        });
        return (i = r === null || r === void 0 ? void 0 : r[0]) !== null && i !== void 0 ? i : null
    }
    ,
    n.enumToDictionary = function(n) {
        var i = []
          , r = {}
          , u = 0;
        for (var t in n)
            n.hasOwnProperty(t) && !isNaN(Number(t)) ? i.push(Number(t)) : (r[i[u]] = t,
            u++);
        return r
    }
    ,
    n.scrollToAnchorName = function(n) {
        var t = $(n)[0];
        t.scrollIntoView()
    }
    ,
    n.replaceText = function(n, t) {
        for (var i = 0; i < t.length; i++)
            n = n.replace(new RegExp("{" + t[i].key + "}","gi"), t[i].value);
        return n
    }
    ,
    n.getAvatarUrl = function(n, t) {
        if (n !== "" && n !== null)
            return n;
        switch (t) {
        case AvatarType.Cpu:
            return "/Images/Icons/avatar_computer.jpg?v=" + buildReleaseVersion;
        case AvatarType.Player:
        default:
            return appViewModel.christmasThemeEnabled() ? "/Images/Icons/avatar_empty_xmas.jpg?v=" + buildReleaseVersion : "/Images/Icons/avatar_empty.jpg?v=" + buildReleaseVersion
        }
    }
    ,
    n.getAchievementUrl = function(t) {
        return n.replaceText(achievementsAssetUrl, [{
            key: "achievementId",
            value: t.toString()
        }])
    }
    ,
    n.getImageOrFallback = function(n, t) {
        var i = Q.defer()
          , r = new Image;
        return r.onload = function() {
            return i.resolve(n)
        }
        ,
        r.onerror = function() {
            return i.resolve(t)
        }
        ,
        r.src = n,
        i.promise
    }
    ,
    n.getPlatformImage = function(n) {
        return n ? Enumerable.from([Platform.LegacyIpad, Platform.LegacyIphone, Platform.iOS, Platform.iPhone, Platform.iPad]).contains(n) ? "icon-platform-ios" : Enumerable.from([Platform.LegacyAndroid, Platform.Android, Platform.AndroidPhone, Platform.AndroidTablet]).contains(n) ? "icon-platform-android" : Enumerable.from([Platform.LegacyFacebook, Platform.FacebookCanvas]).contains(n) ? "icon-platform-facebook" : "icon-platform-web" : "icon-platform-web"
    }
    ,
    n.getCookie = function(n) {
        n += "=";
        for (var i = document.cookie.split(/;\s*/), t = i.length - 1; t >= 0; t--)
            if (!i[t].indexOf(n))
                return i[t].replace(n, "");
        return null
    }
    ,
    n.removeCookie = function(n) {
        document.cookie = n + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
    ,
    n.interpolate = function(n, t, i, r) {
        var u = n
          , f = t
          , e = u + (f - u) / i * r;
        return Math.floor(e)
    }
    ,
    n.isSafari = function() {
        return navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1
    }
    ,
    n.isChrome = function() {
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    }
    ,
    n.isIE = function() {
        return navigator.userAgent.indexOf("MSIE") != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)
    }
    ,
    n.isFireFox = function() {
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }
    ,
    n.isWindowsPhone = function() {
        return Boolean(navigator.userAgent.match(/Windows Phone/i)) || Boolean(navigator.userAgent.match(/iemobile/i)) || Boolean(navigator.userAgent.match(/WPDesktop/i))
    }
    ,
    n.clamp = function(n, t, i) {
        return n <= t ? t : n >= i ? i : n
    }
    ,
    n.removeEmptyValuesFromArray = function(n) {
        return n.filter(function(n) {
            return /^\s*$/.test(n) === !1
        })
    }
    ,
    n.getMaxValueFromArray = function(n, t) {
        t === void 0 && (t = null);
        return Array.isArray(n) ? t != null ? Math.max.apply(Math, n.map(t)) : Math.max.apply(Math, n) : 0
    }
    ,
    n.getMinValueFromArray = function(n) {
        return Array.isArray(n) ? Math.min.apply(Math, n) : 0
    }
    ,
    n.createGuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
            var t = Math.random() * 16 | 0
              , i = n === "x" ? t : t & 3 | 8;
            return i.toString(16)
        })
    }
    ,
    n.spriteAnimation = function(n) {
        var r = Q.defer(), u, t = 0, i = $(n.className);
        return i.css("width", n.width + "px"),
        i.css("height", n.height + "px"),
        u = window.setInterval(function() {
            i.css("background-position", "0px -" + t * n.height + "px");
            t++;
            t >= n.frames && (t = 0,
            clearInterval(u),
            r.resolve())
        }, 300),
        r.promise
    }
    ,
    n.copyProperties = function(n, t) {
        !n;
        for (var i in t)
            n.hasOwnProperty(i) && !ko.isObservable(n[i]) && (t[i] = n[i])
    }
    ,
    n.createComputerManager = function(n, t) {
        var i = new Manager;
        return i.login = "Computer",
        i.name = "Computer",
        i.picture = "/Images/icons/avatar_computer.jpg",
        i.leagueId = n,
        i.teamId = t,
        i
    }
    ,
    n.getInternetExplorerVersion = function() {
        var n = -1, t;
        return navigator.appName == "Microsoft Internet Explorer" && (t = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"),
        t.exec(navigator.userAgent) != null && (n = parseFloat(RegExp.$1))),
        n
    }
    ,
    n.getEnumValues = function(n) {
        var i = [];
        for (var t in n)
            n.hasOwnProperty(t) && (isNaN(Number(t)) || i.push(parseInt(t, 10)));
        return i
    }
    ,
    n.getEnumKeys = function() {
        return Object.keys(CacheKey).filter(function(n) {
            return isNaN(parseInt(n))
        })
    }
    ,
    n.getWorldNr = function() {
        return WebApiConfig.getInstance().cultureCode === "nl-NL" ? 0 : WebApiConfig.getInstance().cultureCode === "nl-BE" ? 0 : 1
    }
    ,
    n.stripTagsAndDecodeHtmlEntities = function(n) {
        if (n && typeof n == "string") {
            var t = document.createElement("div");
            n = n.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");
            n = n.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, "");
            t.innerHTML = n;
            n = t.textContent;
            t.textContent = ""
        }
        return n
    }
    ,
    n.isEmailValid = function(n) {
        return /\S+@\S+/i.test(n)
    }
    ,
    n.getLocalizedDate = function(n, t, i) {
        var r = new Date(n * 1e3);
        return "toLocaleString"in Date.prototype ? r.toLocaleString(t, i) : "toLocaleDateString"in Date.prototype ? r.toLocaleDateString(t, i) : ""
    }
    ,
    n.getHoursSinceTimestamp = function(n) {
        var t = moment.unix(n)
          , i = moment();
        return moment.duration(i.diff(t)).asHours()
    }
    ,
    n.getDaysSinceTimestamp = function(n) {
        var t = moment.unix(n)
          , i = moment();
        return moment.duration(i.diff(t)).asDays()
    }
    ,
    n.getMinutesUntilTimestamp = function(n) {
        var t = moment.unix(n)
          , i = moment();
        return moment.duration(t.diff(i)).asMinutes()
    }
    ,
    n.dateFromTimeStampHelper = function(t, i, r) {
        var u, e, f;
        return (r === void 0 && (r = !1),
        u = +(ko.utils.unwrapObservable(t()) || 0),
        e = getDateNumberDisplayFormattingCultureCode(),
        n.calculateDaysSinceTimestamp(u, !0) === 0) ? n.getLocalizedDate(u, e, n.shortDatePreset) || new Date(u * 1e3).toString() : (f = {
            hour12: !1,
            month: i.get("monthFormat") || "long",
            day: i.get("dayFormat") || "numeric",
            year: i.get("yearFormat") || undefined
        },
        r && (f.hour = i.get("hourFormat") || undefined,
        f.minute = i.get("minuteFormat") || undefined,
        f.second = i.get("secondFormat") || undefined),
        n.getLocalizedDate(u, e, f) || new Date(u * 1e3).toString())
    }
    ,
    n.isValidUrl = function(n) {
        var t = n.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return t != null
    }
    ,
    n.removeSpaces = function(n) {
        return n ? n.replace(/\s+/g, "") : ""
    }
    ,
    n.getDefaultCultureCode = function(n) {
        var t = $.cookie(Cookies[Cookies.DefaultCultureCode]);
        switch (n) {
        case WorldNr.OSM:
            return "nl-NL";
        case WorldNr.OFM:
        default:
            return t ? t : "en-GB"
        }
    }
    ,
    n.transformWorldUrlToUrlWithLanguageCode = function(t) {
        var i = (appViewModel.getHost() ? appViewModel.getHost() + "-" : "") + t;
        return n.replaceText(worldHostname, [new KeyValuePair("prefix",i)])
    }
    ,
    n.convertBytesToHumanReadableFileSize = function(n) {
        for (var i = 0, t = parseInt(String(n), 10) || 0; t >= 1024; )
            t /= 1024,
            i++;
        return t.toFixed(t >= 10 || i < 1 ? 0 : 1) + " " + ["bytes", "KB", "MB", "GB"][i]
    }
    ,
    n.shortenText = function(n, t, i) {
        if (!n || n.length <= t)
            return n;
        var r = n.substr(0, t - (i ? i.length : 0))
          , u = r.lastIndexOf(" ");
        return u < 0 ? r.concat(i || "") : r.substr(0, Math.min(r.length, u)).concat(i || "")
    }
    ,
    n.getRangeAtCursorPositionContentEditable = function(n) {
        var i = n.getRangeAt(0)
          , t = i.commonAncestorContainer.childNodes;
        return t && t.length === 0 && n.anchorOffset === 0 && n.anchorNode.nodeName === "#text" && (t = n.anchorNode.parentElement.childNodes),
        t && t.length !== 0 && !$(t[0]).is("br") && (n.anchorOffset !== 0 ? i.setStartAfter(t.item(n.anchorOffset - 1)) : i.setStartAfter(t.item(t.length - 1))),
        i
    }
    ,
    n.goBackInBrowserHistory = function() {
        window.history.back()
    }
    ,
    n.isFunction = function(n) {
        return !!(n && n.constructor && n.call && n.apply)
    }
    ,
    n.openNewWindow = function(n, t) {
        t === void 0 && (t = !0);
        var i = window.open(n, "_blank");
        t && i.focus()
    }
    ,
    n.padTwoDigits = function(n) {
        return (n < 10 ? "0" : "") + n
    }
    ,
    n.addNumberUpToMaxAmount = function(n, t, i) {
        var r = n + t;
        return r > i && (r = i),
        r
    }
    ,
    n.reduceNumberUpToMinAmount = function(n, t, i) {
        var r = n - t;
        return r < i && (r = i),
        r
    }
    ,
    n.differenceBetweenNumbers = function(n, t) {
        return n > t ? n - t : t - n
    }
    ,
    n.cleanObject = function(n) {
        var t = {};
        return Enumerable.from(n).forEach(function(n) {
            n.value !== undefined && n.value !== null && (t[n.key] = n.value)
        }),
        t
    }
    ,
    n.toPlainObject = function(n) {
        var t = {};
        return Enumerable.from(n).forEach(function(n) {
            n.value instanceof Function || n.value === null || (t[n.key] = n.value)
        }),
        t
    }
    ,
    n.shortDatePreset = {
        hour12: !1,
        hour: "numeric",
        minute: "numeric"
    },
    n.longDatePreset = {
        hour12: !1,
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "numeric",
        day: "numeric"
    },
    n
}(), Urls = function() {
    function n() {}
    return n.getForumUrl = function(n) {
        switch (n) {
        case WorldNr.OSM:
            return "https://forum.onlinesoccermanager.nl";
        case WorldNr.OFM:
        default:
            return "https://forum.onlinesoccermanager.com"
        }
    }
    ,
    n.isForumUrl = function(n) {
        try {
            n = decodeURIComponent(n);
            var t = [this.getForumUrl(WorldNr.OFM), this.getForumUrl(WorldNr.OSM), this.getForumUrl(WorldNr.Dev)];
            return Enumerable.from(t).any(function(t) {
                return n.lastIndexOf(t, 0) === 0
            })
        } catch (i) {
            return !1
        }
    }
    ,
    n.tryGetNextUrlFromUrl = function(n) {
        return n.indexOf("?nextUrl=") <= -1 ? n : (n = n.substring(n.lastIndexOf("?nextUrl="), n.length),
        n.replace("?nextUrl=", ""))
    }
    ,
    n.root = "/",
    n.error = "/Error",
    n.notFound = "/Error/404",
    n.login = "/Login",
    n.register = "/Register",
    n.logout = "/Logout",
    n.resetPassword = "/ResetPassword",
    n.locked = "/Locked/{userId}",
    n.career = "/Career",
    n.dashboard = "/Dashboard",
    n.moderatorTools = n.dashboard + "/ModeratorTools",
    n.chooseTeamForLeague = "/League/{leagueId}/ChooseTeam",
    n.chooseTeamForVipLeague = "/League/{leagueId}/{userRewardId}/{leagueMode}/ChooseTeam",
    n.chooseTeamForLeagueType = "/ChooseTeam",
    n.createLeagueChooseLeague = "/CreateLeague",
    n.createLeagueChooseTeam = "/CreateLeague/{leagueTypeId}/Teams",
    n.chooseLeague = "/ChooseLeague",
    n.fantasyLeague = "/FantasyLeague",
    n.chooseLeagueTicketsTab = "/ChooseLeague#other-tickets",
    n.matchExperience = "/MatchExperience",
    n.facebookHomeExternal = "https://www.facebook.com/",
    n.facebookCanvasLandingPage = "/Facebook",
    n.facebookConnectAccount = "/Facebook/Connect",
    n.facebookChooseLeague = "/Facebook/ChooseLeague",
    n.facebookShareLink = "https://www.onlinesoccermanager.com/",
    n.squad = "/Squad",
    n.lineup = "/Lineup",
    n.tactics = "/Tactics",
    n.specialists = "/Specialists",
    n.transferlist = "/Transferlist",
    n.transferlistHistory = n.transferlist + "#transfer-history",
    n.offers = "/Offers",
    n.playergrades = n.squad + "#team-playergrades",
    n.training = "/Training",
    n.friendlies = "/League/Friendlies",
    n.trainingCamp = "/Camp",
    n.secretTraining = "/Secret",
    n.fixtures = "/League/Fixtures",
    n.results = "/League/Results",
    n.leagueTable = "/League/Standings",
    n.leagueTableManagerList = n.leagueTable + "#managers-list",
    n.matchCalendar = "/League/Calendar",
    n.matches = "/League/Weeks/{weekNr}/Matches/{matchId}",
    n.matchesForWeek = "/League/Weeks/{weekNr}/Matches",
    n.statistics = "/League/Statistics",
    n.topscorers = n.statistics + "#top-players",
    n.stadium = "/Stadium",
    n.sponsors = "/Sponsors",
    n.scout = "/Scout",
    n.spy = "/DataAnalist",
    n.doctor = "/Doctor",
    n.lawyer = "/Lawyer",
    n.cup = "/League/Cup",
    n.paymentThankYou = "/Payment/ThankYou",
    n.paymentFailed = "/Payment/Failed",
    n.paymentProcessing = "/Payment/Processing",
    n.adyenPaymentReturn = "/Adyen/Return",
    n.centiliFailedReturn = "/Centili/FailedReturn",
    n.centiliSuccessReturn = "Centili/SuccessReturn",
    n.facebookPaymentPage = "/Payments/Facebook/Product",
    n.achievements = "/Users/{userId}/Achievements",
    n.sessionUserAchievements = "/User/Achievements",
    n.profile = "/Users/{userId}/Profile",
    n.userProfile = "/User/Profile",
    n.profileSlots = "/Users/{userId}/Profile#profile-slots",
    n.trophycabinet = "/Users/{userId}/TrophyCabinet",
    n.userTrophycabinet = "/User/TrophyCabinet",
    n.worldmap = "/Users/{userId}/Worldmap",
    n.userWorldmap = "User/Worldmap",
    n.conversion = "/Welcome",
    n.activeLeagues = "/ActiveLeagues",
    n.activeLeaguesLeague = "/ActiveLeagues/League",
    n.leagueTypes = "/LeagueTypes",
    n.leagueTypesLeague = "/LeagueTypes/League",
    n.leagueTypesTeam = "/LeagueTypes/Team",
    n.simulationStatus = "/SimulationStatus",
    n.crewLandingPage = "/Crews/LandingPage",
    n.crewRanking = "/Crew/{crewId}/#ranking",
    n.crewInvites = "/Crew/{crewId}/#invitation",
    n.crewMembers = "/Crew/#members",
    n.crewBiography = "/Crew/{crewId}/#biography",
    n.crewProfile = "/Crew/{crewId}",
    n.crewChat = "/Crew/#chat",
    n.crewBattle = "/Crew/#battle",
    n.newsPaper = "/Newsfeed",
    n.playerRatings = "/PlayerRatings",
    n.store = "/Store",
    n.board = "/Board",
    n.finances = "/Finances",
    n.friends = "/Friends",
    n.invites = n.friends + "#invites",
    n.requests = n.friends + "#requests",
    n.userEntryRequests = n.friends + "#user-requests",
    n.ranking = "/Rankings",
    n.businessClub = "/BusinessClub",
    n.tierOverview = "/Divisions",
    n.activateAccount = "/Account/Activate",
    n.editProfile = "/User/Profile/Edit",
    n.privacyPolicy = "/PivacyPolicy",
    n
}(), __assign = this && this.__assign || function() {
    return __assign = Object.assign || function(n) {
        for (var t, r, i = 1, u = arguments.length; i < u; i++) {
            t = arguments[i];
            for (r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
        }
        return n
    }
    ,
    __assign.apply(this, arguments)
}
, currencyJson, LeanplumHelper, HttpStatus, LocalStorageCacheProvider, NoCacheProvider, UsersService, BaseToast, ModalSize, ScreenMode, ModalContainer, ModalTemplate, FantasyLeagueInQueueModal, pushStateSupported, initialScrollTop, CrewBattleRequestPartial, CrewMemberPartial, __extends, WebApiV1Dot1;
ko.virtualElements.allowedBindings.stopBinding = !0;
ko.virtualElements.allowedBindings.toggleFirstRealElement = !0;
ko.bindContentViewModel = function(n) {
    ko.applyBindings(n, $("#body-content")[0]);
    $("#body-content").show()
}
;
ko.bindingHandlers.stopBinding = {
    init: function() {
        return {
            controlsDescendantBindings: !0
        }
    }
};
ko.bindingHandlers.fadeVisible = {
    init: function(n, t) {
        var i = t();
        $(n).toggle(ko.unwrap(i))
    },
    update: function(n, t) {
        var i = t();
        ko.unwrap(i) ? $(n).fadeIn() : $(n).fadeOut()
    }
};
ko.bindingHandlers.scrollDownOnObservableUpdate = {
    init: function(n) {
        $(n).animate({
            scrollTop: $(n)[0].scrollHeight
        }, "slow")
    },
    update: function(n, t) {
        (ko.unwrap(t()),
        $(n)[0].scrollHeight - $(n)[0].scrollTop <= $(n).height()) || $(n).is(":animated") || $(n).animate({
            scrollTop: $(n)[0].scrollHeight
        }, "slow")
    }
};
ko.bindingHandlers.htmlWithBinding = {
    init: function() {
        return {
            controlsDescendantBindings: !0
        }
    },
    update: function(n, t, i, r, u) {
        n.innerHTML = t();
        ko.applyBindingsToDescendants(u, n)
    }
};
ko.bindingHandlers.slideVisible = {
    init: function(n, t) {
        var i = t();
        $(n).toggle(ko.unwrap(i))
    },
    update: function(n, t) {
        var i = t();
        ko.unwrap(i) ? $(n).slideDown("fast") : $(n).slideUp("fast")
    }
};
ko.bindingHandlers.removeSpaces = {
    init: function(n, t) {
        $(n).on("blur", function() {
            t()($(n).val())
        });
        var i = ko.unwrap(t());
        $(n).val(i)
    },
    update: function(n, t) {
        var i = ko.unwrap(t());
        i = Helper.removeSpaces(i);
        t() != null && (t()(i),
        $(n).val(i))
    }
};
ko.bindingHandlers.worldDominationCircle = {
    init: function(n, t) {
        var r = ko.unwrap(t())
          , u = ko.unwrap(r.percentage)
          , f = r.continent
          , e = r.continentTranslation
          , i = "";
        switch (f) {
        case Continent.Africa:
            i = "africa";
            break;
        case Continent.America:
            i = "america";
            break;
        case Continent.Europe:
            i = "europe";
            break;
        case Continent.Asia:
            i = "asia";
            break;
        case Continent.World:
            i = "world"
        }
        $(n).addClass(i);
        $(n).data("continent", f);
        $(n).append('<div class="continent-bg center" data-bind="css: {\'continent-bg-completed\': ' + u + ' >= 100}"><span>' + u + '<\/span><span>%<\/span><\/div><div class="horizontal-center"><div class="continent-name"><div class="continent-name-background"><\/div><h4>' + e + '<\/h4><\/div><\/div><canvas class="progress-arc" width="120" height="120"><\/canvas>')
    },
    update: function(n, t) {
        var nt = ko.unwrap(t()), k = ko.unwrap(nt.percentage), u = $(n).find("canvas")[0], i = u.getContext("2d"), a = 6, v = 3, y = 5, o = 6, f = u.width / 2, e = u.height / 2, s = {
            x: f * 2,
            y: e * 2
        }, h = 1.5 * Math.PI, p = Math.PI / 50 * k + h, d = (u.width - o - (a + 3) - (v + y)) / 2, g = d - (v + y) / 2, c = g - a / 2, w, b, r, l;
        if (i.clearRect(0, 0, u.width, u.height),
        i.save(),
        i.beginPath(),
        i.globalAlpha = .3,
        i.shadowColor = "#000",
        i.strokeStyle = "#000",
        i.lineWidth = v,
        i.shadowBlur = y,
        i.setTransform(1, 0, 0, 1, 0, 0),
        i.translate(-s.x, -s.y),
        i.shadowOffsetX = s.x,
        i.shadowOffsetY = s.y,
        i.arc(f, e, d, 0, 2 * Math.PI, !1),
        i.stroke(),
        i.closePath(),
        i.save(),
        i.restore(),
        i.setTransform(1, 0, 0, 1, 0, 0),
        i.beginPath(),
        i.globalAlpha = 1,
        i.strokeStyle = "#001953",
        i.lineWidth = a,
        i.arc(f, e, g, 0, 2 * Math.PI, !1),
        i.stroke(),
        i.closePath(),
        i.save(),
        i.restore(),
        i.restore(),
        i.beginPath(),
        i.strokeStyle = "#004a8f",
        i.lineWidth = o,
        i.arc(f, e, c, 0, 2 * Math.PI, !1),
        i.stroke(),
        i.closePath(),
        i.save(),
        i.restore(),
        i.beginPath(),
        i.lineWidth = o,
        k < 100)
            i.strokeStyle = "#10e300",
            i.arc(f, e, c, h, p, !1),
            i.stroke(),
            i.closePath();
        else {
            for (w = i.createLinearGradient(0, 0, u.width, u.height),
            r = 0; r < 5; ++r)
                w.addColorStop(r / 4, r % 2 == 1 ? "#edcd38" : "#fffef3");
            for (i.strokeStyle = w,
            i.arc(f, e, c, h, p, !1),
            i.stroke(),
            i.closePath(),
            b = i.createLinearGradient(0, 0, u.width, u.height),
            r = 0; r < 9; ++r)
                r % 4 == 0 && (l = "#fffef3"),
                (r % 4 == 1 || r % 4 == 3) && (l = "#d9ae0d"),
                r % 4 == 2 && (l = "#edcd38"),
                b.addColorStop(r / 8, l);
            i.lineWidth = o / 2;
            i.strokeStyle = b;
            i.arc(f, e, c, h, p, !1);
            i.stroke();
            i.closePath()
        }
        i.save();
        i.restore()
    }
};
currencyJson = JSON.parse('{ "USD": { "symbol": "$", "name": "US Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "USD", "name_plural": "US dollars" }, "CAD": { "symbol": "CA$", "name": "Canadian Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "CAD", "name_plural": "Canadian dollars" }, "EUR": { "symbol": "€", "name": "Euro", "symbol_native": "€", "decimal_digits": 2, "rounding": 0, "code": "EUR", "name_plural": "euros" }, "AED": { "symbol": "AED", "name": "United Arab Emirates Dirham", "symbol_native": "د.إ.‏", "decimal_digits": 2, "rounding": 0, "code": "AED", "name_plural": "UAE dirhams" }, "AFN": { "symbol": "Af", "name": "Afghan Afghani", "symbol_native": "؋", "decimal_digits": 0, "rounding": 0, "code": "AFN", "name_plural": "Afghan Afghanis" }, "ALL": { "symbol": "ALL", "name": "Albanian Lek", "symbol_native": "Lek", "decimal_digits": 0, "rounding": 0, "code": "ALL", "name_plural": "Albanian lekë" }, "AMD": { "symbol": "AMD", "name": "Armenian Dram", "symbol_native": "դր.", "decimal_digits": 0, "rounding": 0, "code": "AMD", "name_plural": "Armenian drams" }, "ARS": { "symbol": "AR$", "name": "Argentine Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "ARS", "name_plural": "Argentine pesos" }, "AUD": { "symbol": "AU$", "name": "Australian Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "AUD", "name_plural": "Australian dollars" }, "AZN": { "symbol": "man.", "name": "Azerbaijani Manat", "symbol_native": "ман.", "decimal_digits": 2, "rounding": 0, "code": "AZN", "name_plural": "Azerbaijani manats" }, "BAM": { "symbol": "KM", "name": "Bosnia-Herzegovina Convertible Mark", "symbol_native": "KM", "decimal_digits": 2, "rounding": 0, "code": "BAM", "name_plural": "Bosnia-Herzegovina convertible marks" }, "BDT": { "symbol": "Tk", "name": "Bangladeshi Taka", "symbol_native": "৳", "decimal_digits": 2, "rounding": 0, "code": "BDT", "name_plural": "Bangladeshi takas" }, "BGN": { "symbol": "BGN", "name": "Bulgarian Lev", "symbol_native": "лв.", "decimal_digits": 2, "rounding": 0, "code": "BGN", "name_plural": "Bulgarian leva" }, "BHD": { "symbol": "BD", "name": "Bahraini Dinar", "symbol_native": "د.ب.‏", "decimal_digits": 3, "rounding": 0, "code": "BHD", "name_plural": "Bahraini dinars" }, "BIF": { "symbol": "FBu", "name": "Burundian Franc", "symbol_native": "FBu", "decimal_digits": 0, "rounding": 0, "code": "BIF", "name_plural": "Burundian francs" }, "BND": { "symbol": "BN$", "name": "Brunei Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "BND", "name_plural": "Brunei dollars" }, "BOB": { "symbol": "Bs", "name": "Bolivian Boliviano", "symbol_native": "Bs", "decimal_digits": 2, "rounding": 0, "code": "BOB", "name_plural": "Bolivian bolivianos" }, "BRL": { "symbol": "R$", "name": "Brazilian Real", "symbol_native": "R$", "decimal_digits": 2, "rounding": 0, "code": "BRL", "name_plural": "Brazilian reals" }, "BWP": { "symbol": "BWP", "name": "Botswanan Pula", "symbol_native": "P", "decimal_digits": 2, "rounding": 0, "code": "BWP", "name_plural": "Botswanan pulas" }, "BYR": { "symbol": "BYR", "name": "Belarusian Ruble", "symbol_native": "BYR", "decimal_digits": 0, "rounding": 0, "code": "BYR", "name_plural": "Belarusian rubles" }, "BZD": { "symbol": "BZ$", "name": "Belize Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "BZD", "name_plural": "Belize dollars" }, "CDF": { "symbol": "CDF", "name": "Congolese Franc", "symbol_native": "FrCD", "decimal_digits": 2, "rounding": 0, "code": "CDF", "name_plural": "Congolese francs" }, "CHF": { "symbol": "CHF", "name": "Swiss Franc", "symbol_native": "CHF", "decimal_digits": 2, "rounding": 0.05, "code": "CHF", "name_plural": "Swiss francs" }, "CLP": { "symbol": "CL$", "name": "Chilean Peso", "symbol_native": "$", "decimal_digits": 0, "rounding": 0, "code": "CLP", "name_plural": "Chilean pesos" }, "CNY": { "symbol": "CN¥", "name": "Chinese Yuan", "symbol_native": "CN¥", "decimal_digits": 2, "rounding": 0, "code": "CNY", "name_plural": "Chinese yuan" }, "COP": { "symbol": "CO$", "name": "Colombian Peso", "symbol_native": "$", "decimal_digits": 0, "rounding": 0, "code": "COP", "name_plural": "Colombian pesos" }, "CRC": { "symbol": "₡", "name": "Costa Rican Colón", "symbol_native": "₡", "decimal_digits": 0, "rounding": 0, "code": "CRC", "name_plural": "Costa Rican colóns" }, "CVE": { "symbol": "CV$", "name": "Cape Verdean Escudo", "symbol_native": "CV$", "decimal_digits": 2, "rounding": 0, "code": "CVE", "name_plural": "Cape Verdean escudos" }, "CZK": { "symbol": "Kč", "name": "Czech Republic Koruna", "symbol_native": "Kč", "decimal_digits": 2, "rounding": 0, "code": "CZK", "name_plural": "Czech Republic korunas" }, "DJF": { "symbol": "Fdj", "name": "Djiboutian Franc", "symbol_native": "Fdj", "decimal_digits": 0, "rounding": 0, "code": "DJF", "name_plural": "Djiboutian francs" }, "DKK": { "symbol": "Dkr", "name": "Danish Krone", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "DKK", "name_plural": "Danish kroner" }, "DOP": { "symbol": "RD$", "name": "Dominican Peso", "symbol_native": "RD$", "decimal_digits": 2, "rounding": 0, "code": "DOP", "name_plural": "Dominican pesos" }, "DZD": { "symbol": "DA", "name": "Algerian Dinar", "symbol_native": "د.ج.‏", "decimal_digits": 2, "rounding": 0, "code": "DZD", "name_plural": "Algerian dinars" }, "EEK": { "symbol": "Ekr", "name": "Estonian Kroon", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "EEK", "name_plural": "Estonian kroons" }, "EGP": { "symbol": "EGP", "name": "Egyptian Pound", "symbol_native": "ج.م.‏", "decimal_digits": 2, "rounding": 0, "code": "EGP", "name_plural": "Egyptian pounds" }, "ERN": { "symbol": "Nfk", "name": "Eritrean Nakfa", "symbol_native": "Nfk", "decimal_digits": 2, "rounding": 0, "code": "ERN", "name_plural": "Eritrean nakfas" }, "ETB": { "symbol": "Br", "name": "Ethiopian Birr", "symbol_native": "Br", "decimal_digits": 2, "rounding": 0, "code": "ETB", "name_plural": "Ethiopian birrs" }, "GBP": { "symbol": "£", "name": "British Pound Sterling", "symbol_native": "£", "decimal_digits": 2, "rounding": 0, "code": "GBP", "name_plural": "British pounds sterling" }, "GEL": { "symbol": "GEL", "name": "Georgian Lari", "symbol_native": "GEL", "decimal_digits": 2, "rounding": 0, "code": "GEL", "name_plural": "Georgian laris" }, "GHS": { "symbol": "GH₵", "name": "Ghanaian Cedi", "symbol_native": "GH₵", "decimal_digits": 2, "rounding": 0, "code": "GHS", "name_plural": "Ghanaian cedis" }, "GNF": { "symbol": "FG", "name": "Guinean Franc", "symbol_native": "FG", "decimal_digits": 0, "rounding": 0, "code": "GNF", "name_plural": "Guinean francs" }, "GTQ": { "symbol": "GTQ", "name": "Guatemalan Quetzal", "symbol_native": "Q", "decimal_digits": 2, "rounding": 0, "code": "GTQ", "name_plural": "Guatemalan quetzals" }, "HKD": { "symbol": "HK$", "name": "Hong Kong Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "HKD", "name_plural": "Hong Kong dollars" }, "HNL": { "symbol": "HNL", "name": "Honduran Lempira", "symbol_native": "L", "decimal_digits": 2, "rounding": 0, "code": "HNL", "name_plural": "Honduran lempiras" }, "HRK": { "symbol": "kn", "name": "Croatian Kuna", "symbol_native": "kn", "decimal_digits": 2, "rounding": 0, "code": "HRK", "name_plural": "Croatian kunas" }, "HUF": { "symbol": "Ft", "name": "Hungarian Forint", "symbol_native": "Ft", "decimal_digits": 0, "rounding": 0, "code": "HUF", "name_plural": "Hungarian forints" }, "IDR": { "symbol": "Rp", "name": "Indonesian Rupiah", "symbol_native": "Rp", "decimal_digits": 0, "rounding": 0, "code": "IDR", "name_plural": "Indonesian rupiahs" }, "ILS": { "symbol": "₪", "name": "Israeli New Sheqel", "symbol_native": "₪", "decimal_digits": 2, "rounding": 0, "code": "ILS", "name_plural": "Israeli new sheqels" }, "INR": { "symbol": "Rs", "name": "Indian Rupee", "symbol_native": "টকা", "decimal_digits": 2, "rounding": 0, "code": "INR", "name_plural": "Indian rupees" }, "IQD": { "symbol": "IQD", "name": "Iraqi Dinar", "symbol_native": "د.ع.‏", "decimal_digits": 0, "rounding": 0, "code": "IQD", "name_plural": "Iraqi dinars" }, "IRR": { "symbol": "IRR", "name": "Iranian Rial", "symbol_native": "﷼", "decimal_digits": 0, "rounding": 0, "code": "IRR", "name_plural": "Iranian rials" }, "ISK": { "symbol": "Ikr", "name": "Icelandic Króna", "symbol_native": "kr", "decimal_digits": 0, "rounding": 0, "code": "ISK", "name_plural": "Icelandic krónur" }, "JMD": { "symbol": "J$", "name": "Jamaican Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "JMD", "name_plural": "Jamaican dollars" }, "JOD": { "symbol": "JD", "name": "Jordanian Dinar", "symbol_native": "د.أ.‏", "decimal_digits": 3, "rounding": 0, "code": "JOD", "name_plural": "Jordanian dinars" }, "JPY": { "symbol": "¥", "name": "Japanese Yen", "symbol_native": "￥", "decimal_digits": 0, "rounding": 0, "code": "JPY", "name_plural": "Japanese yen" }, "KES": { "symbol": "Ksh", "name": "Kenyan Shilling", "symbol_native": "Ksh", "decimal_digits": 2, "rounding": 0, "code": "KES", "name_plural": "Kenyan shillings" }, "KHR": { "symbol": "KHR", "name": "Cambodian Riel", "symbol_native": "៛", "decimal_digits": 2, "rounding": 0, "code": "KHR", "name_plural": "Cambodian riels" }, "KMF": { "symbol": "CF", "name": "Comorian Franc", "symbol_native": "FC", "decimal_digits": 0, "rounding": 0, "code": "KMF", "name_plural": "Comorian francs" }, "KRW": { "symbol": "₩", "name": "South Korean Won", "symbol_native": "₩", "decimal_digits": 0, "rounding": 0, "code": "KRW", "name_plural": "South Korean won" }, "KWD": { "symbol": "KD", "name": "Kuwaiti Dinar", "symbol_native": "د.ك.‏", "decimal_digits": 3, "rounding": 0, "code": "KWD", "name_plural": "Kuwaiti dinars" }, "KZT": { "symbol": "KZT", "name": "Kazakhstani Tenge", "symbol_native": "тңг.", "decimal_digits": 2, "rounding": 0, "code": "KZT", "name_plural": "Kazakhstani tenges" }, "LBP": { "symbol": "LB£", "name": "Lebanese Pound", "symbol_native": "ل.ل.‏", "decimal_digits": 0, "rounding": 0, "code": "LBP", "name_plural": "Lebanese pounds" }, "LKR": { "symbol": "SLRs", "name": "Sri Lankan Rupee", "symbol_native": "SL Re", "decimal_digits": 2, "rounding": 0, "code": "LKR", "name_plural": "Sri Lankan rupees" }, "LTL": { "symbol": "Lt", "name": "Lithuanian Litas", "symbol_native": "Lt", "decimal_digits": 2, "rounding": 0, "code": "LTL", "name_plural": "Lithuanian litai" }, "LVL": { "symbol": "Ls", "name": "Latvian Lats", "symbol_native": "Ls", "decimal_digits": 2, "rounding": 0, "code": "LVL", "name_plural": "Latvian lati" }, "LYD": { "symbol": "LD", "name": "Libyan Dinar", "symbol_native": "د.ل.‏", "decimal_digits": 3, "rounding": 0, "code": "LYD", "name_plural": "Libyan dinars" }, "MAD": { "symbol": "MAD", "name": "Moroccan Dirham", "symbol_native": "د.م.‏", "decimal_digits": 2, "rounding": 0, "code": "MAD", "name_plural": "Moroccan dirhams" }, "MDL": { "symbol": "MDL", "name": "Moldovan Leu", "symbol_native": "MDL", "decimal_digits": 2, "rounding": 0, "code": "MDL", "name_plural": "Moldovan lei" }, "MGA": { "symbol": "MGA", "name": "Malagasy Ariary", "symbol_native": "MGA", "decimal_digits": 0, "rounding": 0, "code": "MGA", "name_plural": "Malagasy Ariaries" }, "MKD": { "symbol": "MKD", "name": "Macedonian Denar", "symbol_native": "MKD", "decimal_digits": 2, "rounding": 0, "code": "MKD", "name_plural": "Macedonian denari" }, "MMK": { "symbol": "MMK", "name": "Myanma Kyat", "symbol_native": "K", "decimal_digits": 0, "rounding": 0, "code": "MMK", "name_plural": "Myanma kyats" }, "MOP": { "symbol": "MOP$", "name": "Macanese Pataca", "symbol_native": "MOP$", "decimal_digits": 2, "rounding": 0, "code": "MOP", "name_plural": "Macanese patacas" }, "MUR": { "symbol": "MURs", "name": "Mauritian Rupee", "symbol_native": "MURs", "decimal_digits": 0, "rounding": 0, "code": "MUR", "name_plural": "Mauritian rupees" }, "MXN": { "symbol": "MX$", "name": "Mexican Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "MXN", "name_plural": "Mexican pesos" }, "MYR": { "symbol": "RM", "name": "Malaysian Ringgit", "symbol_native": "RM", "decimal_digits": 2, "rounding": 0, "code": "MYR", "name_plural": "Malaysian ringgits" }, "MZN": { "symbol": "MTn", "name": "Mozambican Metical", "symbol_native": "MTn", "decimal_digits": 2, "rounding": 0, "code": "MZN", "name_plural": "Mozambican meticals" }, "NAD": { "symbol": "N$", "name": "Namibian Dollar", "symbol_native": "N$", "decimal_digits": 2, "rounding": 0, "code": "NAD", "name_plural": "Namibian dollars" }, "NGN": { "symbol": "₦", "name": "Nigerian Naira", "symbol_native": "₦", "decimal_digits": 2, "rounding": 0, "code": "NGN", "name_plural": "Nigerian nairas" }, "NIO": { "symbol": "C$", "name": "Nicaraguan Córdoba", "symbol_native": "C$", "decimal_digits": 2, "rounding": 0, "code": "NIO", "name_plural": "Nicaraguan córdobas" }, "NOK": { "symbol": "Nkr", "name": "Norwegian Krone", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "NOK", "name_plural": "Norwegian kroner" }, "NPR": { "symbol": "NPRs", "name": "Nepalese Rupee", "symbol_native": "नेरू", "decimal_digits": 2, "rounding": 0, "code": "NPR", "name_plural": "Nepalese rupees" }, "NZD": { "symbol": "NZ$", "name": "New Zealand Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "NZD", "name_plural": "New Zealand dollars" }, "OMR": { "symbol": "OMR", "name": "Omani Rial", "symbol_native": "ر.ع.‏", "decimal_digits": 3, "rounding": 0, "code": "OMR", "name_plural": "Omani rials" }, "PAB": { "symbol": "B/.", "name": "Panamanian Balboa", "symbol_native": "B/.", "decimal_digits": 2, "rounding": 0, "code": "PAB", "name_plural": "Panamanian balboas" }, "PEN": { "symbol": "S/.", "name": "Peruvian Nuevo Sol", "symbol_native": "S/.", "decimal_digits": 2, "rounding": 0, "code": "PEN", "name_plural": "Peruvian nuevos soles" }, "PHP": { "symbol": "₱", "name": "Philippine Peso", "symbol_native": "₱", "decimal_digits": 2, "rounding": 0, "code": "PHP", "name_plural": "Philippine pesos" }, "PKR": { "symbol": "PKRs", "name": "Pakistani Rupee", "symbol_native": "₨", "decimal_digits": 0, "rounding": 0, "code": "PKR", "name_plural": "Pakistani rupees" }, "PLN": { "symbol": "zł", "name": "Polish Zloty", "symbol_native": "zł", "decimal_digits": 2, "rounding": 0, "code": "PLN", "name_plural": "Polish zlotys" }, "PYG": { "symbol": "₲", "name": "Paraguayan Guarani", "symbol_native": "₲", "decimal_digits": 0, "rounding": 0, "code": "PYG", "name_plural": "Paraguayan guaranis" }, "QAR": { "symbol": "QR", "name": "Qatari Rial", "symbol_native": "ر.ق.‏", "decimal_digits": 2, "rounding": 0, "code": "QAR", "name_plural": "Qatari rials" }, "RON": { "symbol": "RON", "name": "Romanian Leu", "symbol_native": "RON", "decimal_digits": 2, "rounding": 0, "code": "RON", "name_plural": "Romanian lei" }, "RSD": { "symbol": "din.", "name": "Serbian Dinar", "symbol_native": "дин.", "decimal_digits": 0, "rounding": 0, "code": "RSD", "name_plural": "Serbian dinars" }, "RUB": { "symbol": "RUB", "name": "Russian Ruble", "symbol_native": "руб.", "decimal_digits": 2, "rounding": 0, "code": "RUB", "name_plural": "Russian rubles" }, "RWF": { "symbol": "RWF", "name": "Rwandan Franc", "symbol_native": "FR", "decimal_digits": 0, "rounding": 0, "code": "RWF", "name_plural": "Rwandan francs" }, "SAR": { "symbol": "SR", "name": "Saudi Riyal", "symbol_native": "ر.س.‏", "decimal_digits": 2, "rounding": 0, "code": "SAR", "name_plural": "Saudi riyals" }, "SDG": { "symbol": "SDG", "name": "Sudanese Pound", "symbol_native": "SDG", "decimal_digits": 2, "rounding": 0, "code": "SDG", "name_plural": "Sudanese pounds" }, "SEK": { "symbol": "Skr", "name": "Swedish Krona", "symbol_native": "kr", "decimal_digits": 2, "rounding": 0, "code": "SEK", "name_plural": "Swedish kronor" }, "SGD": { "symbol": "S$", "name": "Singapore Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "SGD", "name_plural": "Singapore dollars" }, "SOS": { "symbol": "Ssh", "name": "Somali Shilling", "symbol_native": "Ssh", "decimal_digits": 0, "rounding": 0, "code": "SOS", "name_plural": "Somali shillings" }, "SYP": { "symbol": "SY£", "name": "Syrian Pound", "symbol_native": "ل.س.‏", "decimal_digits": 0, "rounding": 0, "code": "SYP", "name_plural": "Syrian pounds" }, "THB": { "symbol": "฿", "name": "Thai Baht", "symbol_native": "฿", "decimal_digits": 2, "rounding": 0, "code": "THB", "name_plural": "Thai baht" }, "TND": { "symbol": "DT", "name": "Tunisian Dinar", "symbol_native": "د.ت.‏", "decimal_digits": 3, "rounding": 0, "code": "TND", "name_plural": "Tunisian dinars" }, "TOP": { "symbol": "T$", "name": "Tongan Paʻanga", "symbol_native": "T$", "decimal_digits": 2, "rounding": 0, "code": "TOP", "name_plural": "Tongan paʻanga" }, "TRY": { "symbol": "TL", "name": "Turkish Lira", "symbol_native": "TL", "decimal_digits": 2, "rounding": 0, "code": "TRY", "name_plural": "Turkish Lira" }, "TTD": { "symbol": "TT$", "name": "Trinidad and Tobago Dollar", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "TTD", "name_plural": "Trinidad and Tobago dollars" }, "TWD": { "symbol": "NT$", "name": "New Taiwan Dollar", "symbol_native": "NT$", "decimal_digits": 2, "rounding": 0, "code": "TWD", "name_plural": "New Taiwan dollars" }, "TZS": { "symbol": "TSh", "name": "Tanzanian Shilling", "symbol_native": "TSh", "decimal_digits": 0, "rounding": 0, "code": "TZS", "name_plural": "Tanzanian shillings" }, "UAH": { "symbol": "₴", "name": "Ukrainian Hryvnia", "symbol_native": "₴", "decimal_digits": 2, "rounding": 0, "code": "UAH", "name_plural": "Ukrainian hryvnias" }, "UGX": { "symbol": "USh", "name": "Ugandan Shilling", "symbol_native": "USh", "decimal_digits": 0, "rounding": 0, "code": "UGX", "name_plural": "Ugandan shillings" }, "UYU": { "symbol": "$U", "name": "Uruguayan Peso", "symbol_native": "$", "decimal_digits": 2, "rounding": 0, "code": "UYU", "name_plural": "Uruguayan pesos" }, "UZS": { "symbol": "UZS", "name": "Uzbekistan Som", "symbol_native": "UZS", "decimal_digits": 0, "rounding": 0, "code": "UZS", "name_plural": "Uzbekistan som" }, "VEF": { "symbol": "Bs.F.", "name": "Venezuelan Bolívar", "symbol_native": "Bs.F.", "decimal_digits": 2, "rounding": 0, "code": "VEF", "name_plural": "Venezuelan bolívars" }, "VND": { "symbol": "₫", "name": "Vietnamese Dong", "symbol_native": "₫", "decimal_digits": 0, "rounding": 0, "code": "VND", "name_plural": "Vietnamese dong" }, "XAF": { "symbol": "FCFA", "name": "CFA Franc BEAC", "symbol_native": "FCFA", "decimal_digits": 0, "rounding": 0, "code": "XAF", "name_plural": "CFA francs BEAC" }, "XOF": { "symbol": "CFA", "name": "CFA Franc BCEAO", "symbol_native": "CFA", "decimal_digits": 0, "rounding": 0, "code": "XOF", "name_plural": "CFA francs BCEAO" }, "YER": { "symbol": "YR", "name": "Yemeni Rial", "symbol_native": "ر.ي.‏", "decimal_digits": 0, "rounding": 0, "code": "YER", "name_plural": "Yemeni rials" }, "ZAR": { "symbol": "R", "name": "South African Rand", "symbol_native": "R", "decimal_digits": 2, "rounding": 0, "code": "ZAR", "name_plural": "South African rand" }, "ZMK": { "symbol": "ZK", "name": "Zambian Kwacha", "symbol_native": "ZK", "decimal_digits": 0, "rounding": 0, "code": "ZMK", "name_plural": "Zambian kwachas" } }');
ko.bindingHandlers.money = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = t()
              , i = currencyJson[n.currencyCode];
            return i ? isNaN(parseFloat(n.amount)) ? i.symbol_native + " " + n.amount : i.symbol_native + " " + (n.amount / 100).toFixed(i.decimal_digits) : n.currencyCode + " " + n.amount
        }, i, r, u)
    }
};
ko.bindingHandlers.currency = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = ko.utils.unwrapObservable(t()) || 0, e = n < 0, r, o, u, s, f, h;
            return (n = Math.abs(n),
            n >= 1e6) ? (n = n / 1e6,
            r = i.get("fractionDigits") !== undefined ? i.get("fractionDigits") : n === 1 ? 0 : 2,
            n >= 100 && (r = 0),
            o = i.get("roundCurrency"),
            u = Math.pow(10, r),
            o === RoundCurrency.Upwards && (n = Math.ceil(n * u) / u),
            o === RoundCurrency.Downwards && (n = Math.floor(n * u) / u),
            e && (n = Math.abs(n) * -1),
            s = n.toLocaleString(getDateNumberDisplayFormattingCultureCode(), {
                style: "decimal",
                useGrouping: !0,
                minimumFractionDigits: r,
                maximumFractionDigits: r
            }),
            Helper.isSafari() && (s = n.toFixed(r)),
            s + $("body").data("currencym")) : i.get("skipK") === !0 ? n.toString() : n > 1e4 ? (n = n / 1e3,
            f = i.get("fractionDigitsK") !== undefined ? i.get("fractionDigitsK") : 0,
            e && (n = Math.abs(n) * -1),
            h = n.toLocaleString(getDateNumberDisplayFormattingCultureCode(), {
                style: "decimal",
                useGrouping: !0,
                minimumFractionDigits: f,
                maximumFractionDigits: f
            }),
            Helper.isSafari() && (h = n.toFixed(f)),
            h + $("body").data("currencyk")) : (e && (n = Math.abs(n) * -1),
            n.toString())
        }, i, r, u)
    }
};
ko.bindingHandlers.number = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = +(ko.utils.unwrapObservable(t()) || 0)
              , i = n.toLocaleString(getDateNumberDisplayFormattingCultureCode(), {
                style: "decimal",
                useGrouping: !0,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return Helper.isSafari() && (i = n.toFixed(0)),
            i
        }, i, r, u)
    }
};
ko.bindingHandlers.percent = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = +(ko.utils.unwrapObservable(t()) || 0), i;
            return n = n / 100,
            i = n.toLocaleString(getDateNumberDisplayFormattingCultureCode(), {
                style: "percent",
                useGrouping: !1,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }),
            Helper.isSafari() && (i = (n * 100).toFixed(0) + "%"),
            i
        }, i, r, u)
    }
};
ko.bindingHandlers.time = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var r = ko.bindingHandlers.time, n = !0, o = !0, u;
            i.get("padTwoDigits") !== undefined && (n = i.get("padTwoDigits"));
            i.get("showSeconds") !== undefined && (o = i.get("showSeconds"));
            u = !1;
            i.get("isAnimatedDate") !== undefined && (u = i.get("isAnimatedDate"));
            var f = moment.duration(parseInt(ko.utils.unwrapObservable(t()) || 0), "seconds")
              , e = $("body").data()
              , s = r.formatDatePart(Math.floor(f.asDays()), e.dayabb, n)
              , h = r.formatDatePart(f.hours(), e.hourabb, n)
              , c = r.formatDatePart(f.minutes(), e.minuteabb, n, u)
              , l = r.formatDatePart(f.seconds(), e.secondabb, n, u);
            return s + h + c + (o ? l : "")
        }, i, r, u)
    },
    formatDatePart: function(n, t, i, r) {
        r === void 0 && (r = !1);
        var u = n.toString();
        return (i && (u = Helper.padTwoDigits(n)),
        !r && n === 0) ? "" : ((n > 0 || r && n === 0) && (u = u + t),
        u + " ")
    }
};
ko.bindingHandlers.dateFromUnixTimestamp = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            return Helper.dateFromTimeStampHelper(t, i, !0)
        }, i, r, u)
    }
};
ko.bindingHandlers.shortDateFromUnixTimestamp = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            return Helper.dateFromTimeStampHelper(t, i)
        }, i, r, u)
    }
};
ko.bindingHandlers.timeFromUnixTimestamp = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var u = +(ko.utils.unwrapObservable(t()) || 0)
              , r = new Date(u * 1e3)
              , n = r.getHours()
              , i = r.getMinutes();
            return (n < 10 ? "0" + n.toString() : n.toString()) + ":" + (i < 10 ? "0" + i.toString() : i.toString())
        }, i, r, u)
    }
};
ko.bindingHandlers.braces = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = +(ko.utils.unwrapObservable(t()) || 0);
            return "(" + n + ")"
        }, i, r, u)
    }
};
ko.bindingHandlers.plus = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.text.update(n, function() {
            var n = +(ko.utils.unwrapObservable(t()) || 0);
            return "+" + n
        }, i, r, u)
    }
};
ko.bindingHandlers.toggleFirstRealElement = {
    init: function(n, t) {
        var i = t();
        $(n).toggle(ko.utils.unwrapObservable(i))
    },
    update: function(n, t) {
        var r = t()
          , i = getFirstRealElement(n);
        ko.utils.unwrapObservable(r) ? $(i).clearQueue().show() : $(i).clearQueue().hide()
    }
};
ko.bindingHandlers.animate = {
    init: function(n, t) {
        var i = t();
        $(n).toggle(ko.utils.unwrapObservable(i))
    },
    update: function(n, t) {
        var i = $(n), r = ko.utils.unwrapObservable(t()), u, f;
        if (typeof r != "undefined" && i.data("animating") !== !0 && (i.is(":visible") || r)) {
            i.data("animating", !0);
            u = appViewModel.isArabic() ? i.data("animateinarabic") : i.data("animatein");
            f = i.data("animateout");
            r ? (i.show(),
            u && i.addClass(u)) : f && i.addClass(f);
            i.one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(n) {
                n.stopPropagation();
                i.data("animating", !1);
                r ? (i.show(),
                i.removeClass(u)) : (i.hide(),
                i.removeClass(f))
            })
        }
    }
};
ko.bindingHandlers.widthPercent = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t());
        $(n).css("width", i + "%")
    }
};
ko.bindingHandlers.positionLeft = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t());
        appViewModel.isArabic() ? $(n).css("right", i + "%") : $(n).css("left", i + "%")
    }
};
ko.bindingHandlers.positionTop = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t());
        $(n).css("top", i + "%")
    }
};
ko.bindingHandlers.image = {
    update: function(n, t, i) {
        var f = ko.utils.unwrapObservable(t()), r, u, e;
        if (f && (r = (f.indexOf("http") !== 0 && appViewModel.sessionSettings.useCdn ? osmCdnUrl : "") + f,
        r.indexOf("?v=") == -1 && (r += "?v=" + buildReleaseVersion),
        $(n).addClass("image"),
        $(n).css("background-image") !== r)) {
            if (u = i.get("fallbackImage"),
            !u) {
                $(n).css("background-image", "url(" + r + ")");
                return
            }
            (e = u ? (u.indexOf("http") !== 0 && appViewModel.sessionSettings.useCdn ? osmCdnUrl : "") + u : "",
            $(n).css("background-image") !== e) && $(n).css("background-image", "url(" + r + "), url(" + e + ")")
        }
    }
};
ko.bindingHandlers.inlineImage = {
    update: function(n, t) {
        var r = ko.utils.unwrapObservable(t()), u = !0, i;
        if ((r.match(/^http/) || !appViewModel.sessionSettings.useCdn) && (u = !1),
        i = (u ? osmCdnUrl : "") + r,
        !i)
            return null;
        i.indexOf("?v=") == -1 && (i += "?v=" + buildReleaseVersion);
        $(n).attr("src", i)
    }
};
ko.bindingHandlers.responsiveImage = {
    update: function(n, t, i) {
        var r = ko.utils.unwrapObservable(t()).toString(), o = i.has("imageSwitchAtSm") && i.get("imageSwitchAtSm") === !0, u = !0, f, e;
        (r.match(/^http/) || !appViewModel.sessionSettings.useCdn) && (u = !1);
        r = (u ? osmCdnUrl : "") + r;
        appViewModel.sessionSettings.screenSize() === ScreenSize.Md || appViewModel.sessionSettings.screenSize() === ScreenSize.Lg || o && appViewModel.sessionSettings.screenSize() == ScreenSize.Sm ? (f = r.substr(0, r.lastIndexOf(".")),
        e = r.substr(r.lastIndexOf(".")),
        r = f + "_hd" + e,
        $(n).addClass("hd")) : $(n).removeClass("hd");
        $(n).addClass("image-responsive");
        r.indexOf("?v=") == -1 && (r += "?v=" + buildReleaseVersion);
        $(n).css("background-image").indexOf(r) === -1 && $(n).css("background-image", "url(" + r + ")")
    }
};
ko.bindingHandlers.stringFormat = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.html.update(n, function() {
            var r = t(), i;
            return i = $(n).data("translation") && $(n).data("translation").length > 0 ? $(n).data("translation") : n.innerHTML,
            Helper.replaceText(i, r)
        }, i, r, u)
    }
};
ko.bindingHandlers.toggleClick = {
    init: function(n, t) {
        var i = t();
        ko.utils.registerEventHandler(n, "click", function() {
            i(!i())
        })
    }
};
ko.bindingHandlers.getMaxValueFromArray = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t())
          , r = Helper.getMaxValueFromArray(i);
        $(n).html(r.toString())
    }
};
ko.bindingHandlers.getMinValueFromArray = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t())
          , r = Helper.getMinValueFromArray(i);
        $(n).html(r.toString())
    }
};
ko.bindingHandlers.buttonState = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t().isLoading), f = t().isDisabled != null && ko.utils.unwrapObservable(t().isDisabled), r, u;
        i || f ? $(n).prop("disabled", !0) : $(n).prop("disabled", !1);
        r = $(n).has(".btn-loader").length;
        i && !r && (u = $("<i>").addClass("btn-loader fa fa-spinner fa-spin"),
        $(n).append(u));
        i ? ($(n).children(":not(.icon-facebook)").hide(),
        $(n).find(".btn-loader").show()) : ($(n).children(":not(.icon-facebook)").show(),
        $(n).find(".btn-loader").hide())
    }
};
ko.bindingHandlers.sliderValue = {
    init: function(n, t, i, r, u) {
        var f = t(), o, e;
        if (!("value"in f) || !ko.isObservable(f.value))
            throw "You need to define an observable value in the params for the sliderValue.";
        o = f.value;
        f.value = ko.utils.unwrapObservable(f.value);
        $(n).slider(f);
        e = $(n).siblings(".slider").find(".slider-tick-label-container");
        e[0] && (ko.cleanNode(e[0]),
        ko.applyBindings(u, e[0]));
        $(n).on("change", function(n) {
            var t = n.value.newValue;
            Array.isArray(t) ? o(t) : (t = parseInt(t),
            t = isNaN(t) ? f.min : t,
            t = t > f.max ? f.max : t,
            t = t < f.min ? f.min : t,
            o(Math.floor(t)))
        })
    },
    update: function(n, t) {
        var u = t(), e = u.value, i = ko.utils.unwrapObservable(e), f, r;
        if (Array.isArray(i))
            for (f = 0; f < i.length; f++)
                r = i[f],
                typeof r != "number" && (r = parseInt(r),
                r = isNaN(r) ? u.min : r,
                r = r > u.max ? u.max : r,
                r = r < u.min ? u.min : r,
                i[f] = r);
        else
            i = parseInt(i),
            i = isNaN(i) ? u.min : i,
            i = i > u.max ? u.max : i,
            i = i < u.min ? u.min : i;
        e(i);
        $(n).slider("setValue", i)
    }
};
ko.bindingHandlers.backgroundInterpolate = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t()), r;
        r = i < 50 ? {
            r: 153,
            g: 6,
            b: 8
        } : i < 60 ? {
            r: 226,
            g: 3,
            b: 6
        } : i < 70 ? {
            r: 235,
            g: 151,
            b: 0
        } : i < 80 ? {
            r: 251,
            g: 214,
            b: 10
        } : i < 90 ? {
            r: 36,
            g: 192,
            b: 4
        } : {
            r: 101,
            g: 238,
            b: 0
        };
        $(n).css("background-color", "rgb(" + r.r + "," + r.g + "," + r.b + ")")
    }
};
ko.bindingHandlers.tooltipText = {
    update: function(n, t) {
        var i = ko.utils.unwrapObservable(t()).toString();
        $(n).attr("title", i)
    }
};
ko.bindingHandlers.formatNumberAsScore = {
    update: function(n, t, i, r, u) {
        var f = ko.utils.unwrapObservable(parseInt(t()));
        return ko.bindingHandlers.text.update(n, function() {
            return f > 0 ? "+" + f : f < 0 ? "-" + Math.abs(f) : f.toString()
        }, i, r, u)
    }
};
ko.bindingHandlers.sly = {
    init: function(n, t) {
        var i = t(), r = i.value, f = i.minimumValueToShowPrevButton != null ? i.minimumValueToShowPrevButton : 0, e = i.subtractFromMaximumValueToShowNextButton != null ? i.subtractFromMaximumValueToShowNextButton : 0, u;
        i.value = ko.utils.unwrapObservable(i.value);
        u = i.value != null ? i.value : 0;
        setTimeout(function() {
            $(n).sly({
                horizontal: 1,
                itemNav: i.itemNav,
                smart: 1,
                activateMiddle: 1,
                activateOn: "click",
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: u,
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: "swing",
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
                pagesBar: $(".pages"),
                activatePageOn: "click",
                prev: $(".slider-prev-container"),
                next: $(".slider-next-container"),
                pageBuilder: function(n) {
                    return "<li>" + (n + 1) + "<\/li>"
                }
            });
            u === 0 ? $(".slider-prev-container").fadeOut("medium") : u === $(n).find("ul li").length && $(".slider-next-container").fadeOut("medium");
            $(n).sly("on", "active", function(t, i) {
                if (r != null) {
                    r(i);
                    var u = $(n).find("ul li").length;
                    r() <= 0 + f ? ($(".slider-prev-container").fadeOut("medium"),
                    $(".slider-next-container").fadeIn("medium")) : r() >= u - e - 1 ? ($(".slider-next-container").fadeOut("medium"),
                    $(".slider-prev-container").fadeIn("medium")) : ($(".slider-prev-container").is(":visible") || $(".slider-prev-container").fadeIn("medium"),
                    $(".slider-next-container").is(":visible") || $(".slider-next-container").fadeIn("medium"))
                }
            })
        }, 500)
    }
};
ko.bindingHandlers.carouselSwipeArea = {
    init: function(n, t) {
        var i = t();
        $(n).swipe({
            swipeLeft: function() {
                $(i).trigger("next", !0)
            },
            swipeRight: function() {
                $(i).trigger("prev", !0)
            }
        })
    }
};
ko.bindingHandlers.drag = {
    update: function(n, t) {
        n.addEventListener("dragstart", t().dragStart, !1);
        n.addEventListener("dragend", t().dragEnd, !1);
        n.addEventListener("dragenter", t().dragEnter, !1);
        n.addEventListener("dragover", t().dragOver, !1);
        n.addEventListener("dragleave", t().dragLeave, !1);
        n.addEventListener("drop", t().dragDrop, !1)
    }
};
ko.bindingHandlers.horizontalProgressBarAnimation = {
    update: function(n, t) {
        var i = t()
          , r = i.percentage || 0
          , u = i.duration || 0
          , f = i.startDelay || 0;
        window.setTimeout(function() {
            $(n).animate({
                width: r + "%"
            }, u)
        }, f)
    }
};
ko.bindingHandlers.carousel = {
    update: function(n, t) {
        var i = t()
          , r = i.value
          , s = i.startIndex
          , h = i.responsive != undefined ? i.responsive : !0
          , c = i.visible != undefined ? i.visible : 1
          , f = i.prevButton
          , e = i.nextButton;
        $(n).data("initialised") || $(n).carouFredSel({
            responsive: h,
            circular: !0,
            infinite: !0,
            align: "center",
            debug: !1,
            width: "100%",
            items: {
                visible: c,
                start: s
            },
            onCreate: function() {
                $(n).data("initialised", !0);
                var t = $(n).triggerHandler("currentVisible")
                  , i = $(t).length - 1
                  , u = Math.ceil(i / 2)
                  , f = $(t).eq(u)
                  , e = ko.contextFor($(f)[0])
                  , o = e.$data;
                r.sliderValue(o)
            },
            scroll: {
                duration: 1,
                onAfter: function() {
                    var t = $(n).triggerHandler("currentVisible")
                      , i = $(t).length - 1
                      , u = Math.ceil(i / 2)
                      , f = $(t).eq(u)
                      , e = ko.contextFor($(f)[0])
                      , o = e.$data;
                    r.sliderValue(o)
                }
            },
            auto: {
                play: !1
            },
            mousewheel: {
                items: 1
            },
            swipe: {
                items: 1
            },
            prev: {
                button: f ? $(f) : $(n).parent().parent().find(".carousel-prev"),
                items: 1
            },
            next: {
                button: e ? $(e) : $(n).parent().parent().find(".carousel-next"),
                items: 1
            }
        });
        var l = ko.utils.unwrapObservable(r.sliderValue), u, o = $(n).triggerHandler("currentVisible"), a = $(o).length - 1, v = Math.ceil(a / 2), y = $(o).eq(v);
        $(n).children(".carousel-item").each(function(n, t) {
            var i = ko.contextFor($(t)[0])
              , r = i.$data;
            r === l && t !== $(y)[0] && (u = $(t))
        });
        u && $(n).trigger("slideTo", u)
    }
};
ko.bindingHandlers.autoCarousel = {
    update: function(n) {
        $(n).data("initialised") || $(n).carouFredSel({
            circular: !0,
            infinite: !0,
            align: "center",
            debug: !1,
            width: null,
            responsive: !0,
            items: {
                start: Math.floor(Math.random() * $(n).children().length + 1)
            },
            onCreate: function() {
                $(n).data("initialised", !0)
            },
            scroll: {
                items: 1,
                easing: "swing",
                duration: 300
            }
        })
    }
};
ko.bindingHandlers.horizontalScrollAndDrag = {
    init: function(n, t) {
        var i = new DragWheelScrollHelper($(n)), r = t(), u, f, e;
        if (!r || !r.disabledScreenSizes || r.disabledScreenSizes.length === 0 || !appViewModel || !appViewModel.sessionSettings) {
            i.enable();
            return
        }
        u = r.disabledScreenSizes;
        f = appViewModel.sessionSettings.screenSize();
        Enumerable.from(u).any(function(n) {
            return n === f
        }) || i.enable();
        e = appViewModel.sessionSettings.screenSize.subscribe(function(n) {
            if (i) {
                if (Enumerable.from(u).any(function(t) {
                    return t === n
                })) {
                    i.disable();
                    return
                }
                i.enable()
            }
        });
        ko.utils.domNodeDisposal.addDisposeCallback(n, function() {
            e.dispose()
        })
    }
};
ko.bindingHandlers.score = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.html.update(n, function() {
            var n = t();
            return appViewModel.isArabic() ? n.awayGoals + "-" + n.homeGoals : n.homeGoals + "-" + n.awayGoals
        }, i, r, u)
    }
};
ko.bindingHandlers.rank = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.html.update(n, function() {
            var n = t();
            return n.isFirstTie ? n.rank.toString() : ""
        }, i, r, u)
    }
};
ko.bindingHandlers.tutorialTooltip = {
    init: function(n) {
        var t = $(n);
        ko.utils.domNodeDisposal.addDisposeCallback(n, function() {
            t.data("bs.tooltip") && t.tooltip("destroy")
        })
    },
    update: function(n, t) {
        var r = $(n)
          , f = ko.unwrap(t())
          , i = ko.toJS(f)
          , u = r.data("bs.tooltip");
        i.variables && (i.title = Helper.replaceText(i.title, i.variables));
        i.template = i.buttontitle ? "<div class='tooltip tutorial-tooltip theme-elastico-1' role='tooltip'><div class='tooltip-inner theme-elastico-1'><\/div><button class='btn-new' onclick='if(appViewModel.tutorialPartial()){ appViewModel.tutorialPartial().decideNextStepInTutorial(); }'><span>" + i.buttontitle + "<\/span><\/button><\/div>" : "<div class='tooltip tutorial-tooltip theme-elastico-1' role='tooltip'><div class='tooltip-inner theme-elastico-1'><\/div><\/div>";
        i.trigger = "manual";
        i.viewport = "body";
        i.html = !0;
        u ? ko.utils.extend(u.options, i) : r.tooltip(i).tooltip("show")
    }
};
ko.bindingHandlers.secondCss = ko.bindingHandlers.css;
ko.bindingHandlers.parseText = {
    update: function(n, t) {
        var i = t();
        if (i.length === 0 || $(n).data("isParsed") === !0)
            return i;
        $.post("/Text/Parse", {
            text: i
        }, function(t) {
            n.innerHTML = t
        }).fail(function() {
            n.innerHTML = i
        }).always(function() {
            $(n).data("isParsed", !0)
        })
    }
};
ko.bindingHandlers.translation = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.html.update(n, function() {
            var n = ko.utils.unwrapObservable(t())
              , i = u.$root;
            if (!i)
                return "";
            var f = n.category ? n.category : i.primaryTranslationsCategory
              , r = i.translationCategories().getTranslation(f, n.name)
              , e = r ? r.value : "";
            return TextHelper.parseTranslation(e)
        }, i, r, u)
    }
};
ko.bindingHandlers.parseTranslation = {
    update: function(n, t, i, r, u) {
        return ko.bindingHandlers.html.update(n, function() {
            var n = ko.utils.unwrapObservable(t());
            return TextHelper.parseTranslation(n)
        }, i, r, u)
    }
};
ko.bindingHandlers.parseEmojiText = {
    update: function(n, t) {
        var r = ko.unwrap(t()), i = r.text, u, f;
        if (!i || !i.length)
            return i;
        i = Helper.stripTagsAndDecodeHtmlEntities(i);
        u = r.className ? r.className + " twemoji" : "twemoji";
        f = r.imageSize ? r.imageSize : "72x72";
        n.innerHTML = twemoji.parse(i, {
            className: u,
            size: f
        })
    }
};
ko.bindingHandlers.removeSpacesPunctuationsUpperCaseInput = {
    init: function(n, t, i, r) {
        ko.bindingHandlers.textInput.init(n, t, i, null, r)
    },
    update: function(n, t) {
        var i = ko.unwrap(t());
        i && (i = Helper.removeSpaces(TextHelper.removePunctuationsFromString(i.toUpperCase())),
        t() != null && (t()(i),
        $(n).val(i)))
    }
};
ko.bindingHandlers.fitText = {
    init: function(n, t) {
        var i = ko.unwrap(t())
          , r = fitty(n, __assign(__assign({}, {
            minSize: 1,
            maxSize: 40
        }), i));
        ko.utils.domNodeDisposal.addDisposeCallback(n, function() {
            r.unsubscribe()
        })
    }
};
ko.bindingHandlers.scrollToOnInit = {
    update: function(n, t) {
        var r = ko.unwrap(t()), i;
        r && (i = $(r),
        (i === null || i === void 0 ? void 0 : i.length) !== 0) && i[0].scrollIntoView({
            block: "center",
            behavior: "smooth"
        })
    }
};
var KeyValuePair = function() {
    function n(n, t) {
        this.key = n;
        this.value = t
    }
    return n
}()
  , FirebaseService = function() {
    function n() {}
    return n.prototype.registerToken = function(n) {
        var t = {
            DeviceToken: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("/firebase/device", HttpMethod.Post, t)
    }
    ,
    n
}()
  , FirebaseHelper = function() {
    function n(n) {
        this._isInitialized = !1;
        this._messagingVapidKeyInitialized = !1;
        this.isInitializing = ko.observable();
        this.isTerminating = ko.observable();
        this._firebaseService = n;
        firebase.initializeApp(firebaseConfig);
        firebase.messaging.isSupported() && (this._messaging = firebase.messaging())
    }
    return n.prototype.isFirebaseMessagingSupported = function() {
        return firebase.messaging.isSupported()
    }
    ,
    n.prototype.initialize = function() {
        var n = this;
        this._isInitialized || firebase.messaging.isSupported() && (this.isInitializing(!0),
        this._messagingVapidKeyInitialized || (this._messaging.usePublicVapidKey(firebaseWebPushKey),
        this._messagingVapidKeyInitialized = !0),
        this.getPushnotificationsEnabled().then(function(t) {
            if (t !== "granted") {
                n.isInitializing(!1);
                return
            }
            n.retrieveDeviceToken().then(function() {
                n.initializeForegroundCallbacks();
                n.initializeOnTokenRefresh();
                n._isInitialized = !0;
                n.isInitializing(!1)
            })
        }))
    }
    ,
    n.prototype.getPushnotificationsEnabled = function() {
        var n = Q.defer();
        if (Notification.permission === "granted")
            localforage.getItem(CacheKey[CacheKey.PushnotificationsEnabled]).then(function(t) {
                n.resolve(t)
            });
        else
            return Q.resolve("denied");
        return n.promise
    }
    ,
    n.prototype.registerDeviceToken = function(n) {
        var t = this
          , i = this._firebaseService.registerToken(n);
        return WebApi.getInstance().execute(i).then(function() {
            var i = t.createMessagingOptions(n);
            localforage.setItem(CacheKey[CacheKey.FirebaseMessagingOptions], i)
        }).fail(function() {
            localforage.removeItem(CacheKey[CacheKey.FirebaseMessagingOptions])
        })
    }
    ,
    n.prototype.createMessagingOptions = function(n) {
        return {
            token: n,
            hostname: window.location.host
        }
    }
    ,
    n.prototype.terminate = function() {
        var n = this;
        this.isTerminating(!0);
        localforage.getItem(CacheKey[CacheKey.FirebaseMessagingOptions]).then(function(t) {
            n._onMessageCallback && n._onMessageCallback();
            t && n._messaging.deleteToken(t.token);
            localforage.removeItem(CacheKey[CacheKey.FirebaseMessagingOptions]);
            n._isInitialized = !1;
            n.isTerminating(!1)
        })
    }
    ,
    n.prototype.requestPermission = function() {
        var n = Q.defer();
        return this._messaging.requestPermission().then(function() {
            n.resolve()
        }).catch(function() {
            n.reject("Permission not granted")
        }),
        n.promise
    }
    ,
    n.prototype.retrieveDeviceToken = function() {
        var t = this
          , n = Q.defer();
        return localforage.getItem(CacheKey[CacheKey.FirebaseMessagingOptions]).then(function(t) {
            if (!t || !t.token)
                return Promise.reject("Token is null");
            n.resolve(t.token)
        }).catch(function() {
            t.getNewDeviceTokenFromFirebase().then(function(i) {
                t.registerDeviceToken(i).then(function() {
                    n.resolve(i)
                }).fail(function() {
                    n.reject("An error occurred while registering the device token.")
                }).done()
            })
        }),
        n.promise
    }
    ,
    n.prototype.getNewDeviceTokenFromFirebase = function() {
        var n = Q.defer();
        return this._messaging.getToken().then(function(t) {
            n.resolve(t)
        }).catch(function() {
            n.reject("An error occurred while retrieving token.")
        }),
        n.promise
    }
    ,
    n.prototype.initializeOnTokenRefresh = function() {
        var n = this;
        this._messaging.onTokenRefresh(function() {
            localforage.removeItem(CacheKey[CacheKey.FirebaseMessagingOptions]);
            n.retrieveDeviceToken()
        })
    }
    ,
    n.prototype.initializeForegroundCallbacks = function() {
        this._onMessageCallback = this._messaging.onMessage(function(n) {
            localforage.getItem(CacheKey[CacheKey.PushnotificationsEnabled]).then(function(t) {
                t === "granted" && appViewModel.toastsPartial().addItem(new FeedbackToast(FeedbackToast.Type.Pushnotification,"/Images/Shared/pushnotifications/notification_message.png",[{
                    key: "text",
                    value: n.data.message
                }]))
            })
        })
    }
    ,
    n.prototype.toggleNotificationPermissions = function(n) {
        var r = this, t = Q.defer(), i;
        return Notification.permission === "granted" ? (i = n ? "granted" : "denied",
        this.setPushnotificationEnabledValue(i, t)) : Notification.permission === "denied" ? (i = "denied",
        this.setPushnotificationEnabledValue(i, t)) : Notification.permission === "default" && this.requestPermission().then(function() {
            r.setPushnotificationEnabledValue("granted", t)
        }).fail(function() {
            r.setPushnotificationEnabledValue("denied", t)
        }).done(),
        t.promise
    }
    ,
    n.prototype.setPushnotificationEnabledValue = function(n, t) {
        localforage.setItem(CacheKey[CacheKey.PushnotificationsEnabled], n).then(function() {
            t.resolve(n)
        })
    }
    ,
    n
}()
  , FacebookHelper = function() {
    function n() {}
    return n.convertFacebookCultureCode = function(n, t) {
        switch (n) {
        case "ar_AR":
            return "ar-SA";
        case "da_DK":
            return "da-DK";
        case "de_DE":
        case "yi_DE":
        case "rm_CH":
            return "de-DE";
        case "en_GB":
        case "en_IN":
        case "en_PI":
        case "en_UD":
        case "ga_IE":
            return "en-GB";
        case "ck_US":
        case "en_US":
            return "en-US";
        case "ay_BO":
        case "ca_ES":
        case "es_CL":
        case "es_CO":
        case "es_ES":
        case "es_LA":
        case "es_MX":
        case "es_VE":
        case "eu_ES":
        case "gl_ES":
        case "gn_PY":
        case "qc_GT":
        case "qu_PE":
            return "es-ES";
        case "br_FR":
        case "fr_CA":
        case "fr_FR":
        case "ht_HT":
            return "fr-FR";
        case "hu_HU":
            return "hu-HU";
        case "id_ID":
        case "jv_ID":
        case "ms_MY":
            return "id-ID";
        case "it_IT":
        case "sc_IT":
        case "co_FR":
            return "it-IT";
        case "fy_NL":
        case "li_NL":
        case "nl_BE":
        case "nl_NL":
            return "nl-NL";
        case "pl_PL":
        case "sz_PL":
            return "pl-PL";
        case "pt_BR":
        case "pt_PT":
            return "pt-PT";
        case "ro_RO":
            return "ro-RO";
        case "be_BY":
        case "ru_RU":
        case "tt_RU":
        case "uk_UA":
            return "ru-RU";
        case "sv_SE":
            return "sv-SE";
        case "th_TH":
            return "th-TH";
        case "az_AZ":
        case "tr_TR":
            return "tr-TR";
        case "el_GR":
        case "gx_GR":
            return "el-GR";
        case "nb_NO":
        case "nn_NO":
            return "nb-NO";
        case "fi_FI":
            return "fi-FI";
        case "hi_IN":
            return "hi-IN";
        default:
            return t
        }
    }
    ,
    n
}()
  , ConsoleLogger = function() {
    function n() {}
    return n.log = function(n) {
        window.location.hostname.indexOf("localhost") > -1 && console && console.log(n)
    }
    ,
    n
}()
  , CookieHelper = function() {
    function n(n) {
        this._cookieService = n
    }
    return n.prototype.ensureCookiesEnabled = function() {
        return this._cookieService.ensureCookiesEnabled()
    }
    ,
    n.getJsonCookie = function(n) {
        try {
            return JSON.parse($.cookie(n))
        } catch (t) {
            return null
        }
    }
    ,
    n.setJsonCookie = function(n, t, i, r) {
        r === void 0 && (r = "/");
        try {
            $.cookie(n, JSON.stringify(t), {
                expires: i,
                path: r
            })
        } catch (u) {
            return null
        }
    }
    ,
    n.setTicketRewardSeen = function(t) {
        var i = t.expiresAt ? moment.unix(t.expiresAt).add(1, "day") : moment().add(1, "month");
        $.cookie(n.ticketCookieName(t.id), !0, {
            expires: i.toDate(),
            path: "/",
            domain: appViewModel.getDomain()
        })
    }
    ,
    n.setHasResignedCookie = function(n) {
        var t = this.hasResignedCookieName(n.userId, n.slotIndex)
          , i = moment().add(1, "days").toDate();
        this.setJsonCookie(t, n, i)
    }
    ,
    n.setVipTicketRewardSeen = function(t) {
        var i = moment.unix(t.expiredTimestamp).add(1, "day");
        $.cookie(n.vipTicketCookieName(t.id), !0, {
            expires: i.toDate(),
            path: "/",
            domain: appViewModel.getDomain()
        })
    }
    ,
    n.setForumToken = function(t) {
        $.cookie(n.CookieKeys.forumToken, t.accessToken, {
            path: "/",
            domain: appViewModel.getDomain()
        })
    }
    ,
    n.setShownSkillRatingUpdate = function(t) {
        var i = moment().add(1, "days").toDate();
        this.setJsonCookie(n.shownSkillRatingUpdateCookieName(t.userId, t.slotIndex, t.leagueId, t.weekNr), t, i)
    }
    ,
    n.isTicketRewardSeen = function(t) {
        return $.cookie(n.ticketCookieName(t)) === "true"
    }
    ,
    n.isVipTicketRewardSeen = function(t) {
        return $.cookie(n.vipTicketCookieName(t)) === "true"
    }
    ,
    n.ticketCookieName = function(t) {
        return n.CookieKeys.ticketRewardShownForId + "_ticketId" + t
    }
    ,
    n.hasResignedCookieName = function(t, i) {
        return n.CookieKeys.hasResignedCookieName + "_" + t + "_" + i
    }
    ,
    n.vipTicketCookieName = function(t) {
        return n.CookieKeys.vipTicketRewardShownForId + "_ticketId" + t
    }
    ,
    n.shownSkillRatingUpdateCookieName = function(t, i, r, u) {
        return n.CookieKeys.shownSkillRatingUpdateForLeagueAndWeek + "_" + t + "_" + i + "_" + r + "_" + u
    }
    ,
    n
}();
(function(n) {
    var t = function() {
        function n() {}
        return n.forumToken = "forum_token",
        n.createLeagueMode = "createLeagueMode",
        n.personalizedAdsEnabled = "personalizedAdsEnabled",
        n.isPrivacyNoticeAccepted = "isPrivacyNoticeAccepted",
        n.personalizedAdsAskAmount = "personalizedAdsAskAmount",
        n.isFromGdprOptInCountry = "isFromGdprOptInCountry",
        n.shouldUpdateGdprDataStorageSetting = "shouldUpdateGdprDataStorageSetting",
        n.shouldUpdatePersonalizedAdsSetting = "shouldUpdatePersonalizedAdsSetting",
        n.personalizedAdsSettingLastAskedTimestamp = "personalizedAdsSettingLastAskedTimestamp",
        n.isSoftLaunchCountry = "IsSoftLaunchCountry",
        n.battleResultsShownForCrewAndMostAdvancedBattle = "battleResultsShownForCrewAndMostAdvancedBattle",
        n.battleIntroShown = "battleIntroShown",
        n.amountOfVideosWatched = "amountOfVideosWatched",
        n.hasLoggedInBefore = "HasLoggedInBefore",
        n.isVideoRewardsApiDown = "IsVideoRewardsApiDown",
        n.matchExperienceShownForLeagueAndWeekNrAndMatchId = "matchExperienceShownForLeagueAndWeekNrAndMatchId",
        n.knockoutProgressionShownForLeagueIdAndTeamIdAndWeekNr = "knockoutProgressionShownForLeagueIdAndTeamIdAndWeekNr",
        n.unconfirmedActivationEmail = "unconfirmedActivationEmail",
        n.ignoredEventNotifications = "ignoredEventNotifications",
        n.christmasTheme = "christmasTheme",
        n.ticketRewardShownForId = "ticketRewardShownForId",
        n.hasResignedCookieName = "hasResigned",
        n.vipTicketRewardShownForId = "vipTicketRewardShownForId",
        n.shownSkillRatingUpdateForLeagueAndWeek = "shownSkillRatingUpdateForLeagueAndWeek",
        n.hasShownFantasyLeagueIntro = "hasShownFantasyLeagueIntro",
        n.lastReadAppInboxMessageTimestamp = "lastReadAppInboxMessageTimestamp",
        n.hasSeenPrizePoolRewardsInfo = "hasSeenPrizePoolRewardsInfo",
        n.hasSeenTodoHighlightModal = "hasSeenTodoHighlightModal",
        n
    }();
    n.CookieKeys = t
}
)(CookieHelper || (CookieHelper = {}));
var ProgressHelper = function() {
    function n(n, t) {
        this.isAnimating = ko.observable(!1);
        this.animatedProgress = ko.observable(0);
        this.actualProgress = ko.observable(0);
        this._defaultOptions = {
            animationDuration: 1e3,
            increaseInterval: 80
        };
        this.options = ko.observable($.extend(!0, this._defaultOptions, t));
        this.actualProgress(n);
        this.animatedProgress(n)
    }
    return n.prototype.updateProgress = function(n) {
        return this.stopAnimating(),
        this.actualProgress(n),
        this.animateToAmount(n)
    }
    ,
    n.prototype.animateToAmount = function(n) {
        var t = this, u, r, e;
        if (this.isAnimating())
            return u = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Already animating"),
            Q.reject(u);
        r = Q.defer();
        this.isAnimating(!0);
        var f = 50
          , o = Helper.differenceBetweenNumbers(this.animatedProgress(), n)
          , s = 1e3 / f
          , i = Math.ceil(o / s)
          , h = this.animatedProgress() > n ? -1 : 1;
        return i = Math.abs(i),
        e = setInterval(function() {
            if (t.animatedProgress() == n) {
                clearInterval(e);
                t.isAnimating(!1);
                r.resolve();
                return
            }
            h == -1 ? t.animatedProgress(Helper.reduceNumberUpToMinAmount(t.animatedProgress(), i, n)) : t.animatedProgress(Helper.addNumberUpToMaxAmount(t.animatedProgress(), i, n))
        }, f),
        r.promise
    }
    ,
    n.prototype.stopAnimating = function() {
        this.animatedProgress(this.actualProgress());
        this.isAnimating(!1);
        clearInterval(this._interval)
    }
    ,
    n
}()
  , TextHelper = function() {
    function n() {}
    return n.parsePm = function(t, i) {
        return t = n.escapeHtml(t),
        t = n.convertUrlsToLinks(t),
        t = n.convertUnicodeSmileysToImages(t, i),
        n.convertNewLines(t)
    }
    ,
    n.escapeHtml = function(n) {
        return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;")
    }
    ,
    n.convertUrlsToLinks = function(n, t, i) {
        i === void 0 && (i = "_blank");
        var r = new RegExp("((www.|(http|https)+://)[&#95;.a-z0-9-]+.[a-z0-9/&#95;:@=.+?,##%&~-]*[^.|'|# |!|(|?|,| |>|<|;|)])","gi");
        return n.replace(r, '<a class=\'text-secondary semi-bold\' href="$1" title="' + (t !== "" ? t : "$1") + '" target="' + i + '">$1<\/a>').replace('href="www', 'href="http://www')
    }
    ,
    n.convertUnicodeSmileysToImages = function(n, t) {
        for (var i = 0; i < t.getItems().length; i++)
            n = n.replace(new RegExp(t.getItems()[i].uniCode.replace(")", "\\)"),"g"), "<img src='/Images/Icons/Smileys/" + t.getItems()[i].imageUrl + "' alt='" + t.getItems()[i].code + "'/>");
        return n
    }
    ,
    n.replaceSmileyText = function(t, i) {
        for (var r = 0; r < i.getItems().length; r++)
            t = n.replaceAll(t, i.getItems()[r].code, i.getItems()[r].uniCode);
        return t
    }
    ,
    n.convertNewLines = function(t) {
        return n.replaceAll(t, "\n", "<br />")
    }
    ,
    n.replaceAll = function(n, t, i) {
        while (n.indexOf(t) >= 0)
            n = n.replace(t, i);
        return n
    }
    ,
    n.uncapitalizeFirstLetter = function(n) {
        return n != null && n.length > 0 ? n.substring(0, 1).toLowerCase() + n.substring(1) : n
    }
    ,
    n.replaceBossCoinIcon = function(t) {
        return n.replaceAll(t, "[bc]", "<span class='icon-bosscoin inline-block'><\/span>")
    }
    ,
    n.replaceClubFundsIcon = function(t) {
        return n.replaceAll(t, "[cf]", "<span class='icon-clubfunds inline-block'><\/span>")
    }
    ,
    n.removeUBBCodes = function(n) {
        if (!n)
            return n;
        var t = n.replace(/(?:\[\/?(?:i(?:mg)?|b|u(?:rl)?|s|quote|youtube)\]|\[url\=[^=\]\[]+\]|\[hr\])/gi, "");
        return t ? t : n
    }
    ,
    n.checkIfTypeIsImage = function(n) {
        return /^image\/([a-z0-9]+)$/.test(n)
    }
    ,
    n.parseTranslation = function(t) {
        return t = n.replaceBossCoinIcon(t),
        t = n.replaceClubFundsIcon(t),
        n.convertNewLines(t)
    }
    ,
    n.removePunctuationsFromString = function(n) {
        return n ? n.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"\[\]\?\<\>\+]/g, "") : ""
    }
    ,
    n.isOnlyWhitespace = function(n) {
        return /^\s+$/.test(n)
    }
    ,
    n
}()
  , DataLayerHandler = function() {
    function n() {}
    return n.trackLocalStorageSupport = function(n) {
        dataLayer.push({
            isLocalStorageSupported: n
        })
    }
    ,
    n.trackModalOpened = function(n) {
        this.trackVirtualPageView(location.pathname + "/virtual/modal/" + ModalTemplate[n])
    }
    ,
    n.trackTabOpened = function(n) {
        this.trackVirtualPageView(location.pathname + "/virtual/tabName/" + n)
    }
    ,
    n.trackTutorialStepUpdated = function(n) {
        this.trackVirtualPageView(location.pathname + "/virtual/tutorialstep/" + n + TutorialStep[n])
    }
    ,
    n.trackVirtualPageView = function(n) {
        dataLayer.push({
            event: "VirtualPageview",
            virtualPageUrl: n
        })
    }
    ,
    n.trackSuccessfulSignup = function() {
        dataLayer.push({
            event: "signup-successful"
        })
    }
    ,
    n
}()
  , LeaguePriceHelper = function() {
    function n() {}
    return n.prototype.getBossCoinProductKey = function(n, t, i, r, u) {
        u === void 0 && (u = 0);
        switch (i) {
        case LeagueMode.PrizePool:
            return "PrizePoolFee" + u
        }
        switch (n) {
        case LeagueScheduleType.Knockout:
        case LeagueScheduleType.Poules:
        case LeagueScheduleType.Tournament:
            return this.getBossCoinProductKeyPerWeek(t);
        default:
            return this.getBossCoinProductKeyPerTeam(t, i, r)
        }
    }
    ,
    n.prototype.calculateLeaguePriceCost = function(n, t) {
        switch (t === null || t === void 0 ? void 0 : t.leagueScheduleType) {
        case LeagueScheduleType.Knockout:
        case LeagueScheduleType.Poules:
        case LeagueScheduleType.Tournament:
            return (n === null || n === void 0 ? void 0 : n.value) * (t === null || t === void 0 ? void 0 : t.weeks) + (n === null || n === void 0 ? void 0 : n.additionalFee);
        default:
            return (n === null || n === void 0 ? void 0 : n.value) * (t === null || t === void 0 ? void 0 : t.teamCount)
        }
    }
    ,
    n.prototype.getBossCoinProductKeyPerTeam = function(t, i, r) {
        if (i === LeagueMode.Crew)
            switch (t) {
            case n.LeagueCreationType.CreateLeague:
                return "CreateCrewLeagueFeePerTeam";
            case n.LeagueCreationType.ContinueLeague:
                return "ContinueCrewLeagueFeePerTeam";
            default:
                return ""
            }
        if (r === LeagueGroupType.Fantasy)
            switch (t) {
            case n.LeagueCreationType.CreateFantasyLeagueWithoutSettings:
                return "PickUnavailableTeamFeePerTeam";
            case n.LeagueCreationType.CreateFantasyLeagueWithSettings:
                return "CreateLeagueFeePerTeam";
            default:
                return ""
            }
        switch (t) {
        case n.LeagueCreationType.PickUnavailableTeam:
            return "PickUnavailableTeamFeePerTeam";
        case n.LeagueCreationType.CreateLeague:
            return "CreateLeagueFeePerTeam";
        case n.LeagueCreationType.ContinueLeague:
            return "ContinueLeagueFeePerTeam";
        default:
            return ""
        }
    }
    ,
    n.prototype.getBossCoinProductKeyPerWeek = function(t) {
        switch (t) {
        case n.LeagueCreationType.PickUnavailableTeam:
            return "PickUnavailableTeamFeePerWeek";
        case n.LeagueCreationType.CreateLeague:
            return "CreateLeagueFeePerWeek";
        case n.LeagueCreationType.ContinueLeague:
            return "ContinueLeagueFeePerWeek";
        default:
            return ""
        }
    }
    ,
    n
}();
(function(n) {
    var t;
    (function(n) {
        n[n.PickUnavailableTeam = 0] = "PickUnavailableTeam";
        n[n.CreateLeague = 1] = "CreateLeague";
        n[n.ContinueLeague = 2] = "ContinueLeague";
        n[n.CreateFantasyLeagueWithoutSettings = 3] = "CreateFantasyLeagueWithoutSettings";
        n[n.CreateFantasyLeagueWithSettings = 4] = "CreateFantasyLeagueWithSettings"
    }
    )(t = n.LeagueCreationType || (n.LeagueCreationType = {}))
}
)(LeaguePriceHelper || (LeaguePriceHelper = {}));
LeanplumHelper = function() {
    function n() {
        var t = this;
        if (this._isInitializing = !1,
        this.filterGameSettingsWithVariables = function(n) {
            var i = Q.defer();
            return t._leanplumSessionService.ensureSession().fail(function() {}).fin(function() {
                i.resolve(t._leanplumVariablesService.filterGameSettingsWithVariables(n))
            }).done(),
            i.promise
        }
        ,
        n._instance)
            throw new Error("Error: Instantiation failed: Use LeanplumHelper.getInstance() instead of new.");
        n._instance = this;
        this._leanplumAppId = leanplumAppId;
        this._buildReleaseVersion = buildReleaseVersion;
        this._leanplumIsDevelopmentMode = !!isLeanplumDevelopmentMode;
        this._leanplumKey = this._leanplumIsDevelopmentMode ? leanplumDevelopmentKey : leanplumProductionkey;
        this._leanplumSessionService = new LeanplumSessionService;
        this._leanplumVariablesService = new LeanplumVariablesService;
        this._leanplumTrackingService = new LeanplumTrackingService;
        this._leanplumInboxService = new LeanplumInboxService;
        this._leanplumInAppMessageService = new LeanplumInAppMessageService
    }
    return n.getInstance = function() {
        return n._instance === null && (n._instance = isLeanplumEnabled && LocalStorageCacheProvider.isSupported() ? new n : new LeanplumHelperDummy),
        n._instance
    }
    ,
    n.prototype.isInitialized = function() {
        return this._leanplumSessionService.isInitialized()
    }
    ,
    n.prototype.initialize = function() {
        return this._isInitializing || !this.isInitialized().isPending() ? this.isInitialized() : (this._isInitializing = !0,
        this._leanplumIsDevelopmentMode ? Leanplum.setAppIdForDevelopmentMode(this._leanplumAppId, this._leanplumKey) : Leanplum.setAppIdForProductionMode(this._leanplumAppId, this._leanplumKey),
        Leanplum.setAppVersion(this._buildReleaseVersion),
        SessionManager.getInstance().session !== null && (this._leanplumInboxService.initialize(),
        this._leanplumInAppMessageService.initialize()),
        this._leanplumSessionService.initialize(),
        this.isInitialized())
    }
    ,
    n.prototype.didSessionExistOnInitialize = function() {
        return this._leanplumSessionService.didSessionExistOnInitialize
    }
    ,
    n.prototype.isSessionExpired = function() {
        return this._leanplumSessionService.isSessionExpired()
    }
    ,
    n.prototype.setUserAttributes = function(n) {
        var t = this;
        this._leanplumSessionService.ensureSession().then(function() {
            t._leanplumTrackingService.setUserAttributes(n)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.getVariables = function(n, t, i) {
        return n === void 0 && (n = ""),
        t === void 0 && (t = ""),
        i === void 0 && (i = null),
        this._leanplumVariablesService.getVariables(n, t, i)
    }
    ,
    n.prototype.getAppInboxMessages = function() {
        return this._leanplumInboxService.appInboxMessagesPartial ? this._leanplumInboxService.appInboxMessagesPartial.getNoneExpiredItems() : []
    }
    ,
    n.prototype.hasUnreadAppInboxMessages = function() {
        var n, t;
        return ((t = (n = this._leanplumInboxService) === null || n === void 0 ? void 0 : n.appInboxMessagesPartial) === null || t === void 0 ? void 0 : t.hasUnreadMessages()) === !0
    }
    ,
    n.prototype.triggerAppInboxObservableUpdate = function() {
        var n;
        (n = this._leanplumInboxService) === null || n === void 0 ? void 0 : n.triggerAppInboxObservableUpdate()
    }
    ,
    n.prototype.pageOpened = function(n, t) {
        var i = this;
        t === void 0 && (t = undefined);
        this._leanplumSessionService.ensureSession().then(function() {
            i._leanplumTrackingService.pageOpened(n, t)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.modalOpened = function(n, t) {
        var i = this;
        t === void 0 && (t = undefined);
        this._leanplumSessionService.ensureSession().then(function() {
            i._leanplumTrackingService.modalOpened(n, t)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.modalClosed = function() {
        var n = this;
        this._leanplumSessionService.ensureSession().then(function() {
            n._leanplumTrackingService.modalClosed()
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackEventWithValue = function(n, t, i) {
        var r = this;
        i === void 0 && (i = {});
        this._leanplumSessionService.ensureSession().then(function() {
            r._leanplumTrackingService.trackEventWithValue(n, t, i)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackEvent = function(n, t) {
        var i = this;
        t === void 0 && (t = {});
        this._leanplumSessionService.ensureSession().then(function() {
            i._leanplumTrackingService.trackEvent(n, t)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackBossCoinSpendIntentEvent = function(n, t, i) {
        var r = this;
        i === void 0 && (i = {});
        this._leanplumSessionService.ensureSession().then(function() {
            r._leanplumTrackingService.trackBossCoinSpendIntentEvent(n, t, i)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackBossCoinSpentEvent = function(n, t, i) {
        var r = this;
        i === void 0 && (i = {});
        this._leanplumSessionService.ensureSession().then(function() {
            r._leanplumTrackingService.trackBossCoinSpentEvent(n, t, i)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackClubFundsSpentEvent = function(n, t, i, r) {
        var u = this;
        r === void 0 && (r = {});
        this._leanplumSessionService.ensureSession().then(function() {
            u._leanplumTrackingService.trackClubFundsSpentEvent(n, t, i, r)
        }).fail(function() {}).done()
    }
    ,
    n.prototype.trackLogin = function(n, t, i, r, u) {
        var f = t.id.toString(), e, o;
        return (n.world === WorldNr.OSM ? f = "NL_" + f : n.world === WorldNr.Dev && (f = "DEV_" + f),
        this._leanplumTrackingService.trackLogin(f, n, t, i, r, u),
        e = this._leanplumSessionService.getPreviousSessionIdentifier(),
        !e || e === f) ? Q.resolve(!0) : (o = Q.defer(),
        this._leanplumVariablesService.forceContentUpdate(f, this._leanplumAppId, this._leanplumKey).fail(function() {}).fin(function() {
            o.resolve(!0)
        }).done(),
        o.promise)
    }
    ,
    n.prototype.reloadSession = function() {
        if (!Leanplum)
            return Q.resolve(!0);
        var n = Q.defer();
        return Leanplum.forceContentUpdate(function() {
            n.resolve(!0)
        }),
        n.promise
    }
    ,
    n._instance = null,
    n
}(),
function(n) {
    var t, i;
    (function(n) {
        n[n.Training = 0] = "Training";
        n[n.TransferPlayer = 1] = "TransferPlayer";
        n[n.SpecialOfferPlayer = 2] = "SpecialOfferPlayer";
        n[n.OfferPlayer = 3] = "OfferPlayer";
        n[n.ScoutPlayer = 4] = "ScoutPlayer";
        n[n.Capacity = 5] = "Capacity";
        n[n.Pitch = 6] = "Pitch";
        n[n.TrainingFacility = 7] = "TrainingFacility";
        n[n.Doctor = 8] = "Doctor";
        n[n.Spy = 9] = "Spy";
        n[n.Scout = 10] = "Scout";
        n[n.Lawyer = 11] = "Lawyer"
    }
    )(t = n.ClubFundsProductType || (n.ClubFundsProductType = {})),
    function(n) {
        n[n.Default = 0] = "Default";
        n[n.Doctor = 1] = "Doctor";
        n[n.Lawyer = 2] = "Lawyer";
        n[n.Scout = 3] = "Scout";
        n[n.Career = 4] = "Career";
        n[n.Spy = 5] = "Spy";
        n[n.BusinessClub = 6] = "BusinessClub";
        n[n.Forums = 7] = "Forums";
        n[n.TrainingCampFirst = 8] = "TrainingCampFirst";
        n[n.TrainingCampFirstThirdOfSeason = 9] = "TrainingCampFirstThirdOfSeason";
        n[n.TrainingCampSecondThirdOfSeason = 10] = "TrainingCampSecondThirdOfSeason";
        n[n.TrainingCampCupSemiFinal = 11] = "TrainingCampCupSemiFinal";
        n[n.TrainingCampCupFinal = 12] = "TrainingCampCupFinal";
        n[n.SquadSellPlayer = 13] = "SquadSellPlayer";
        n[n.Apps = 14] = "Apps";
        n[n.ChooseTeamOnLastDay = 15] = "ChooseTeamOnLastDay";
        n[n.Teamslot2 = 16] = "Teamslot2";
        n[n.Teamslot3 = 17] = "Teamslot3";
        n[n.Teamslot4 = 18] = "Teamslot4";
        n[n.Negotiations = 19] = "Negotiations";
        n[n.Transferlist = 20] = "Transferlist";
        n[n.Facebook = 21] = "Facebook";
        n[n.Crews = 22] = "Crews";
        n[n.NextSeason = 23] = "NextSeason"
    }(i = n.SurfacingViewType || (n.SurfacingViewType = {}))
}(LeanplumHelper || (LeanplumHelper = {}));
var LeanplumHelperDummy = function() {
    function n() {
        this.filterGameSettingsWithVariables = function(n) {
            return Q.resolve(Enumerable.from(n).where(function(n) {
                return n.variation === 0
            }).toArray())
        }
    }
    return n.prototype.isInitialized = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.initialize = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.didSessionExistOnInitialize = function() {
        return !0
    }
    ,
    n.prototype.isSessionExpired = function() {
        return !1
    }
    ,
    n.prototype.setUserAttributes = function() {}
    ,
    n.prototype.getVariables = function(n, t, i) {
        return n === void 0 && (n = null),
        t === void 0 && (t = null),
        i === void 0 && (i = null),
        i
    }
    ,
    n.prototype.pageOpened = function(n, t) {
        t === void 0 && (t = null)
    }
    ,
    n.prototype.modalOpened = function(n, t) {
        t === void 0 && (t = null)
    }
    ,
    n.prototype.modalClosed = function() {}
    ,
    n.prototype.trackEventWithValue = function(n, t, i) {
        i === void 0 && (i = null)
    }
    ,
    n.prototype.trackEvent = function(n, t) {
        t === void 0 && (t = null)
    }
    ,
    n.prototype.trackBossCoinSpendIntentEvent = function(n, t, i) {
        i === void 0 && (i = null)
    }
    ,
    n.prototype.trackBossCoinSpentEvent = function(n, t, i) {
        i === void 0 && (i = null)
    }
    ,
    n.prototype.trackClubFundsSpentEvent = function(n, t, i, r) {
        r === void 0 && (r = null)
    }
    ,
    n.prototype.clearLeanplumCache = function() {}
    ,
    n.prototype.reloadSession = function() {
        return Q.resolve(null)
    }
    ,
    n.prototype.trackLogin = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.getAppInboxMessages = function() {
        return []
    }
    ,
    n.prototype.hasUnreadAppInboxMessages = function() {
        return !1
    }
    ,
    n.prototype.triggerAppInboxObservableUpdate = function() {}
    ,
    n
}()
  , LeanplumSessionService = function() {
    function n() {
        var n = this;
        this.isInitializedDeferred = Q.defer();
        this._isRestartingDeferred = Q.defer();
        this._isRestarting = !1;
        this._sessionDurationMinutes = 30;
        this._session = {
            name: "__leanplum_session",
            expireTimestamp: (new Date).getTime() + this._sessionDurationMinutes * 6e4
        };
        this._timerDurationMinutes = 120;
        this._timer = null;
        this.leanplumStartedFunction = function(t) {
            if (n.getSession() ? n.updateSession() : n.setSession(),
            n.startExpireTimer(),
            t)
                n.isInitializedDeferred.resolve(!0);
            else {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Leanplum started promise failed.");
                n.isInitializedDeferred.reject(i)
            }
        }
        ;
        this.leanplumRestartedFunction = function(t) {
            if (t)
                n._isRestartingDeferred.resolve(!0);
            else {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Leanplum restart failed");
                n._isRestartingDeferred.reject(i)
            }
            n._isRestarting = !1
        }
    }
    return n.prototype.isInitialized = function() {
        return this.isInitializedDeferred.promise
    }
    ,
    n.prototype.initialize = function() {
        return !this.getSession() || this.isSessionExpired() ? (this.didSessionExistOnInitialize = !1,
        Leanplum.start(this.leanplumStartedFunction)) : (this.didSessionExistOnInitialize = !0,
        Leanplum.startFromCache(this.leanplumStartedFunction)),
        this.isInitialized()
    }
    ,
    n.prototype.ensureSession = function() {
        var n = this
          , t = Q.defer();
        return this.isInitialized().then(function() {
            if (n.getSession && !n.isSessionExpired()) {
                t.resolve(!0);
                return
            }
            if (n._isRestarting) {
                n._isRestartingDeferred.promise.then(function() {
                    t.resolve(!0)
                }).fail(function() {
                    var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Leanplum restart of another request in EnsureSession failed.");
                    t.reject(n)
                }).done();
                return
            }
            n._isRestarting = !0;
            n._isRestartingDeferred = Q.defer();
            n._isRestartingDeferred.promise.then(function() {
                t.resolve(!0)
            }).fail(function() {
                var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Leanplum restart in EnsureSession failed.");
                t.reject(n)
            }).done();
            Leanplum.removeStartResponseHandler(n.leanplumRestartedFunction);
            Leanplum.start(n.leanplumRestartedFunction)
        }).fail(function() {}).done(),
        t.promise
    }
    ,
    n.prototype.setSession = function() {
        return localStorage.setItem(this._session.name, JSON.stringify(this._session)),
        JSON.parse(localStorage.getItem(this._session.name))
    }
    ,
    n.prototype.updateSession = function() {
        return this._session.expireTimestamp = (new Date).getTime() + this._sessionDurationMinutes * 6e4,
        localStorage.setItem(this._session.name, JSON.stringify(this._session)),
        JSON.parse(localStorage.getItem(this._session.name))
    }
    ,
    n.prototype.getSession = function() {
        return JSON.parse(localStorage.getItem(this._session.name))
    }
    ,
    n.prototype.deleteSession = function() {
        localStorage.removeItem(this._session.name)
    }
    ,
    n.prototype.isSessionExpired = function() {
        return !this.getSession() || (new Date).getTime() > this.getSession().expireTimestamp
    }
    ,
    n.prototype.startExpireTimer = function() {
        var n = this;
        this.clearTimer();
        this._timer = window.setTimeout(function() {
            !!n.getSession() && n.isSessionExpired() && (Leanplum.stop(),
            n.deleteSession(),
            n.didSessionExistOnInitialize = !1)
        }, this._timerDurationMinutes * 6e4)
    }
    ,
    n.prototype.clearTimer = function() {
        this._timer && (window.clearTimeout(this._timer),
        this._timer = null)
    }
    ,
    n.prototype.getPreviousSessionIdentifier = function() {
        var n = this.getSession();
        if (!n)
            return "";
        try {
            return localStorage.getItem("__leanplum_user_id")
        } catch (t) {}
        return ""
    }
    ,
    n
}()
  , LeanplumVariablesService = function() {
    function n() {}
    return n.prototype.getVariables = function(n, t, i) {
        n === void 0 && (n = "");
        t === void 0 && (t = "");
        i === void 0 && (i = null);
        var r = Leanplum.getVariables();
        return r ? n ? r.hasOwnProperty(n) ? t ? r[n].hasOwnProperty(t) ? r[n][t] : i : r[n] : i : r : i
    }
    ,
    n.setLatestVariables = function(n) {
        return localStorage.setItem("__leanplum_variables", JSON.stringify(n)),
        JSON.parse(localStorage.getItem("__leanplum_variables"))
    }
    ,
    n.prototype.forceContentUpdate = function(t, i, r) {
        var u = Q.defer()
          , f = "https://api.leanplum.com/api?userId=" + t + "&appId=" + i + "&clientKey=" + r + "&action=getVars";
        return $.ajax({
            url: f,
            success: function(t) {
                var r, i;
                try {
                    r = t.response[0].vars;
                    r ? u.resolve(n.setLatestVariables(r)) : (i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("No variables found for user on leanplum forceContentUpdate."),
                    u.reject(i))
                } catch (f) {
                    i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Could not parse response on leanplum forceContentUpdate.");
                    u.reject(i)
                }
            },
            error: function() {
                var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Something went wrong on leanplum forceContentUpdate.");
                u.reject(n)
            }
        }),
        u.promise
    }
    ,
    n.prototype.filterGameSettingsWithVariables = function(n) {
        var i = this, t;
        return !this.getVariables() || this.getVariables().length === 0 ? Enumerable.from(n).where(function(n) {
            return n.variation === 0
        }).toArray() : (t = [],
        Enumerable.from(n).groupBy(function(n) {
            return n.category
        }, function(n) {
            return n
        }, function(n, r) {
            Enumerable.from(r).groupBy(function(n) {
                return n.name
            }, function(n) {
                return n
            }, function(r, u) {
                Enumerable.from(u).groupBy(function(n) {
                    return n.increment
                }, function(n) {
                    return n
                }, function(u, f) {
                    t.push(i.selectVariation(n, r, u, f))
                }).toArray()
            }).toArray()
        }).toArray(),
        t)
    }
    ,
    n.prototype.selectVariation = function(n, t, i, r) {
        var f = Enumerable.from(r).firstOrDefault(function(n) {
            return n.variation === 0 && n.increment === i
        }), u, e;
        if (!f)
            throw new Error("GameSetting " + t + " with increment " + i + " does not have a variation 0 instance in the database.");
        return (u = this.getChosenVariation(n, t, i),
        !u || typeof u != "number") ? f : (e = Enumerable.from(r).firstOrDefault(function(n) {
            return n.variation === u
        }),
        !e) ? f : e
    }
    ,
    n.prototype.getChosenVariation = function(n, t, i) {
        var r = this.getVariables(n ? GameVarCategory[n] : GameVarCategory[GameVarCategory.BossCoinPrice]), u;
        return t == "RewardMax" && SessionManager && SessionManager.getInstance() && SessionManager.getInstance().session ? SessionManager.getInstance().session.userId % 10 : !r || !r.hasOwnProperty(t) ? 0 : i === 0 ? r[t] : t == "Camp" || t == "Secret" ? (u = r[t],
        !u || typeof u != "object" && !u.hasOwnProperty(i)) ? 0 : u[i] : r[t]
    }
    ,
    n
}()
  , LeanplumInboxService = function() {
    function n() {
        this._appInboxMessagesPartial = ko.observable()
    }
    return Object.defineProperty(n.prototype, "appInboxMessagesPartial", {
        get: function() {
            return this._appInboxMessagesPartial()
        },
        enumerable: !0,
        configurable: !0
    }),
    n.prototype.triggerAppInboxObservableUpdate = function() {
        var n;
        (n = this._appInboxMessagesPartial) === null || n === void 0 ? void 0 : n.valueHasMutated()
    }
    ,
    n.prototype.initialize = function() {
        var n = this;
        Leanplum.inbox().onChanged(function() {
            n.retrieveAllMessages()
        });
        CacheHandler.getInstance().getItem(CacheKey[CacheKey.LeanplumAppInboxMessages]).then(function(t) {
            var i = new AppInboxMessagesPartial(new PromoCodeService);
            i.setItemsFromModels(t);
            n._appInboxMessagesPartial(i)
        }).fail(function() {
            n.retrieveAllMessages()
        }).done()
    }
    ,
    n.prototype.retrieveAllMessages = function() {
        var n = Leanplum.inbox().allMessages(), t;
        n && n.length && (t = new AppInboxMessagesPartial(new PromoCodeService),
        t.setItemsFromLeanplumModels(n),
        this._appInboxMessagesPartial(t),
        CacheHandler.getInstance().setItem(this._appInboxMessagesPartial().getItems(), CacheKey[CacheKey.LeanplumAppInboxMessages]))
    }
    ,
    n
}()
  , LeanplumInAppMessageService = function() {
    function n() {}
    return n.prototype.initialize = function() {
        Leanplum.enableRichInAppMessages(!0);
        Leanplum.on("showMessage", function(n) {
            var u = n.message, t = n.context, i, r;
            (t === null || t === void 0 ? void 0 : t.track(),
            u.__name__ === "Center Popup") && (t.track(),
            i = new CenterPopupMessagePartial(n.message,t,new PromoCodeService),
            r = new CenterPopupModal(i),
            r.show())
        })
    }
    ,
    n
}()
  , __assign = this && this.__assign || function() {
    return __assign = Object.assign || function(n) {
        for (var t, r, i = 1, u = arguments.length; i < u; i++) {
            t = arguments[i];
            for (r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
        }
        return n
    }
    ,
    __assign.apply(this, arguments)
}
  , LeanplumTrackingService = function() {
    function n() {
        this._lastPageState = n.State.None
    }
    return n.prototype.setUserAttributes = function(n) {
        Leanplum.setUserAttributes(n)
    }
    ,
    n.prototype.setUserAttributesWithId = function(n, t) {
        Leanplum.setUserAttributes(n, t)
    }
    ,
    n.prototype.pageOpened = function(n, t) {
        t === void 0 && (t = undefined);
        this.advanceTo(n, t);
        this._lastPageState = n;
        this._lastPageParameters = t
    }
    ,
    n.prototype.modalOpened = function(n, t) {
        t === void 0 && (t = undefined);
        this.advanceTo(n, t)
    }
    ,
    n.prototype.modalClosed = function() {
        this._lastPageState && this.advanceTo(this._lastPageState, this._lastPageParameters)
    }
    ,
    n.prototype.advanceTo = function(n, t) {
        (t === void 0 && (t = undefined),
        n) && (t === undefined ? Leanplum.advanceTo(n) : Leanplum.advanceTo(n, t))
    }
    ,
    n.prototype.trackEventWithValue = function(t, i, r) {
        r === void 0 && (r = {});
        var u = {
            ManagerTeam: SessionManager.getInstance().session ? SessionManager.getInstance().session.teamName : "",
            ManagerLeague: SessionManager.getInstance().session ? SessionManager.getInstance().session.leagueTypeName : "",
            ManagerLeagueTypeId: SessionManager.getInstance().session ? SessionManager.getInstance().session.leagueTypeId : ""
        }
          , f = __assign(__assign({}, u), r);
        Leanplum.track(n.Event[t], i, f)
    }
    ,
    n.prototype.trackEvent = function(t, i) {
        i === void 0 && (i = {});
        var r = {
            ManagerTeam: SessionManager.getInstance().session ? SessionManager.getInstance().session.teamName : "",
            ManagerLeague: SessionManager.getInstance().session ? SessionManager.getInstance().session.leagueTypeName : "",
            ManagerLeagueTypeId: SessionManager.getInstance().session ? SessionManager.getInstance().session.leagueTypeId : ""
        }
          , u = __assign(__assign({}, r), i);
        Leanplum.track(n.Event[t], u)
    }
    ,
    n.prototype.trackBossCoinSpendIntentEvent = function(t, i, r) {
        r === void 0 && (r = {});
        this.trackBossCoinEvent(n.Event.BCSpendIntent, t, i, r)
    }
    ,
    n.prototype.trackBossCoinSpentEvent = function(t, i, r) {
        r === void 0 && (r = {});
        this.trackBossCoinEvent(n.Event.BCSpent, t, i, r)
    }
    ,
    n.prototype.trackBossCoinEvent = function(n, t, i, r) {
        r === void 0 && (r = {});
        var u = {
            BCProduct: t
        }
          , f = __assign(__assign({}, u), r);
        this.trackEventWithValue(n, i, f)
    }
    ,
    n.prototype.trackClubFundsSpentEvent = function(t, i, r, u) {
        u === void 0 && (u = {});
        var f = {
            ClubFundsProduct: LeanplumHelper.ClubFundsProductType[t],
            Teamslot: SessionManager.getInstance().session ? "S" + SessionManager.getInstance().session.slotIndex : "",
            OriginalCFPrice: r,
            BCCompensated: r > i ? 1 : 0
        }
          , e = __assign(__assign({}, f), u);
        this.trackEventWithValue(n.Event.CFSpent, i, e)
    }
    ,
    n.prototype.trackLogin = function(n, t, i, r, u, f) {
        var h = "", a = 0, v = 0, y = 0, c, l, e;
        i.connectionsPartial() && i.connectionsPartial().getItems() && (i.connectionsPartial().getItems().forEach(function(n) {
            if (n.isVerified)
                switch (n.type) {
                case UserConnectionType.Facebook:
                    a = 1;
                    break;
                case UserConnectionType.GooglePlus:
                    v = 1;
                    break;
                case UserConnectionType.GameCenter:
                    y = 1
                }
        }),
        c = i.connectionsPartial().getEmailConnectionFromConnections(),
        c && (h = c.value));
        l = 0;
        u && (l = new AchievementProgressesPartial(u,null).completedAchievements().length);
        var p = f.getLastExpired()
          , s = {
            ManagerName: i.name,
            Email: h ? h : null,
            SignupTimestamp: i.signUpTimestamp,
            SignupPlatformId: i.signupPlatformId,
            CountryCode: i.countryCode,
            CrewId: i.crewId ? i.crewId : null,
            FacebookConnected: a,
            GoogleConnected: v,
            GameCenterConnected: y,
            BCAmount: r ? r.amount : 0,
            AchievementsCompleted: l,
            WorldNr: t.world,
            AdblockerDetected: appViewModel.adBlockerDetectedObservable() ? 1 : 0,
            BackendABGroup: i.id.toString().split("").pop(),
            LastTicketExpirationDate: p ? p.expiresAt : 0
        }
          , o = i.teamSlotsPartial().getItems();
        for (e = 0; e < 4; e++)
            s["TeamNameS" + e] = o[e] ? o[e].teamPartial() ? o[e].teamPartial().name : null : null,
            s["LeagueTypeNameS" + e] = o[e] ? o[e].leaguePartial() ? o[e].leaguePartial().leagueTypePartial() ? o[e].leaguePartial().leagueTypePartial().name : null : null : null,
            s["LeagueTypeIdS" + e] = o[e] ? o[e].leaguePartial() ? o[e].leaguePartial().leagueTypePartial() ? o[e].leaguePartial().leagueTypePartial().id : null : null : null;
        this.setUserAttributesWithId(n, s)
    }
    ,
    n
}();
(function(n) {
    var t, i, r;
    (function(n) {
        n.None = "";
        n.AchievementsAdvanced = "Achievements.Advanced";
        n.AchievementsBeginner = "Achievements.Beginner";
        n.AchievementsExpert = "Achievements.Expert";
        n.ActivateAccount = "ActivateAccount";
        n.ActiveLeagues = "ActiveLeagues";
        n.ActiveLeaguesLeagueView = "ActiveLeagues.LeagueView";
        n.Board = "Board";
        n.Businessclub = "Businessclub";
        n.BusinessclubPromoCode = "Businessclub.PromoCode";
        n.CareerCentre = "CareerCentre";
        n.CheatReport = "CheatReport";
        n.ClaimClubFunds = "ClaimClubFunds";
        n.CompareManager = "CompareManager";
        n.CrewBattleHistory = "Crew.BattleHistory";
        n.CrewBattles = "Crew.Battles";
        n.CrewTiers = "Crew.Tiers";
        n.CrewChat = "Crew.Chat";
        n.CrewCreate = "Crew.Create";
        n.CrewEditAvatar = "Crew.EditAvatar";
        n.CrewEditBackground = "Crew.EditBackground";
        n.CrewEditProfile = "Crew.EditProfile";
        n.CrewInvitation = "Crew.Invitation";
        n.CrewJoin = "Crew.Join";
        n.CrewJoinSearch = "Crew.JoinSearch";
        n.CrewLeague = "Crew.League";
        n.LegacyCrewRanking = "Crew.LegacyRanking";
        n.CrewLeave = "Crew.Leave";
        n.CrewMembers = "Crew.Members";
        n.CrewProfile = "Crew.Profile";
        n.CrewRanking = "Crew.Ranking";
        n.CrewSetting = "Crew.Setting";
        n.CrewStart = "Crew.Start";
        n.CrewBattleQueueLeave = "Crew.BattleQueueLeave";
        n.Dashboard = "Dashboard";
        n.Doctor = "Doctor";
        n.DoctorActive = "Doctor.Active";
        n.Email = "Email";
        n.Error = "Error";
        n.ExitConfimation = "ExitConfimation";
        n.Finance = "Finance";
        n.Fixtures = "Fixtures";
        n.FixturesCup = "Fixtures.Cup";
        n.FixturesMatchCalendar = "Fixtures.MatchCalendar";
        n.Friendlies = "Friendlies";
        n.Friends = "Friends";
        n.FriendsAddFriends = "Friends.AddFriends";
        n.FriendsAddFriendsBranchlink = "Friends.AddFriendsBranchlink";
        n.FriendsAddFriendsOSM = "Friends.AddFriendsOSM";
        n.Help = "Help";
        n.InterstitialAd = "InterstitialAd";
        n.Lawyer = "Lawyer";
        n.LawyerActive = "Lawyer.Active";
        n.LeagueOverview = "LeagueOverview";
        n.LeagueOverviewLeagueView = "LeagueOverview.LeagueView";
        n.LeagueOverviewTeamView = "LeagueOverview.TeamView";
        n.LeagueStandings = "LeagueStandings";
        n.LeagueStandingsAssists = "LeagueStandings.Assists";
        n.LeagueStandingsGoals = "LeagueStandings.Goals";
        n.LeagueStandingsManagerlist = "LeagueStandings.Managerlist";
        n.LeagueStandingsSquadValue = "LeagueStandings.SquadValue";
        n.LeagueStandingsStatistics = "LeagueStandings.Statistics";
        n.LeagueStandingsStreaks = "LeagueStandings.Streaks";
        n.LeagueStandingsTopContributors = "LeagueStandings.TopContributors";
        n.LeagueStandingsTopRated = "LeagueStandings.TopRated";
        n.LeagueStandingsTopScorers = "LeagueStandings.TopScorers";
        n.Licenses = "Licenses";
        n.LineUpFitness = "LineUp.Fitness";
        n.LineUpFormation = "LineUp.Formation";
        n.LineUpMatches = "LineUp.Matches";
        n.LineUpProfile = "LineUp.Profile";
        n.LineUpRating = "LineUp.Rating";
        n.LineUpSelectPlayer = "LineUp.SelectPlayer";
        n.LineUpSubstitutes = "LineUp.Substitutes";
        n.Login = "Login";
        n.Logout = "Logout";
        n.MatchDayAllResults = "MatchDayAllResults";
        n.MatchDetails = "MatchDetails";
        n.MatchExperienceIntroLineup = "MatchExperience.IntroLineup";
        n.MatchExperienceIntroVersus = "MatchExperience.IntroVersus";
        n.MatchExperienceStudio = "MatchExperience.Studio";
        n.MatchExperienceTimeline = "MatchExperience.Timeline";
        n.ModeratorTools = "ModeratorTools";
        n.ModeratorToolsAdvancedOptions = "ModeratorTools.AdvancedOptions";
        n.ModeratorToolsLeague = "ModeratorTools.League";
        n.ModeratorToolsRequests = "ModeratorTools.Requests";
        n.NewLeagueAgent = "NewLeague.Agent";
        n.NewLeagueChooseLeague = "NewLeague.ChooseLeague";
        n.NewLeagueChooseTeam = "NewLeague.ChooseTeam";
        n.NewLeagueContract = "NewLeague.Contract";
        n.NewLeagueCreateLeague = "NewLeague.CreateLeague";
        n.NewLeagueInvites = "NewLeague.Invites";
        n.NewLeagueSearch = "NewLeague.Search";
        n.NewLeagueSuggested = "NewLeague.Suggested";
        n.NewLeagueTeamNotAvailable = "NewLeague.TeamNotAvailable";
        n.NewLeagueTickets = "NewLeague.Tickets";
        n.Newsfeed = "Newsfeed";
        n.NewsUpdates = "NewsUpdates";
        n.NotEnoughBosscoins = "NotEnoughBosscoins";
        n.PersonalMessenger = "PersonalMessenger";
        n.PlayercardPopUp = "PlayercardPopUp";
        n.Profile = "Profile";
        n.ProfileEdit = "Profile.Edit";
        n.ProfileMenu = "ProfileMenu";
        n.Ranking = "Ranking";
        n.RankingCountry = "Ranking.Country";
        n.RankingWorld = "Ranking.World";
        n.Register = "Register";
        n.Scout = "Scout";
        n.ScoutResults = "Scout.Results";
        n.ScoutReturn = "Scout.Return";
        n.ScoutSearching = "Scout.Searching";
        n.SecretTraining = "SecretTraining";
        n.SecretTrainingActive = "SecretTraining.Active";
        n.SecretTrainingHistory = "SecretTraining.History";
        n.Settings = "Settings";
        n.Shop = "Shop";
        n.SideMenu = "SideMenu";
        n.SimulationStatus = "SimulationStatus";
        n.SpecialistSelectPlayer = "Specialist.SelectPlayer";
        n.Specialists = "Specialists";
        n.Sponsors = "Sponsors";
        n.SponsorsChooseNew = "Sponsors.ChooseNew";
        n.Spy = "Spy";
        n.SpyActive = "Spy.Active";
        n.SpyReportLineUp = "Spy.ReportLineUp";
        n.SpyReportTactics = "Spy.ReportTactics";
        n.Squad = "Squad";
        n.SquadTeamPlayerGrades = "Squad.TeamPlayerGrades";
        n.SquadTeamTransfers = "Squad.TeamTransfers";
        n.Stadium = "Stadium";
        n.StadiumActive = "Stadium.Active";
        n.Tactics = "Tactics";
        n.TimersList = "TimersList";
        n.TodoList = "TodoList";
        n.Training = "Training";
        n.TrainingSelectPlayer = "Training.SelectPlayer";
        n.TrainingCamp = "TrainingCamp";
        n.TrainingCampActive = "TrainingCamp.Active";
        n.TrainingCampHistory = "TrainingCamp.History";
        n.TransferlistNegotiations = "Transferlist.Negotiations";
        n.TransferlistTransferHistory = "Transferlist.TransferHistory";
        n.TransferlistTransferlist = "Transferlist.Transferlist";
        n.TrophyCabinet = "TrophyCabinet";
        n.Worldmap = "Worldmap";
        n.WorldmapCountry = "Worldmap.Country";
        n.WorldmapList = "Worldmap.List";
        n.PersonalAdsSetting = "PersonalizedAdsSetting";
        n.SquadNumbers = "SquadNumbers"
    }
    )(t = n.State || (n.State = {})),
    function(n) {
        n[n.None = 0] = "None";
        n[n.BCSpendIntent = 1] = "BCSpendIntent";
        n[n.BCSpent = 2] = "BCSpent";
        n[n.NotEnoughBC = 3] = "NotEnoughBC";
        n[n.CFSpent = 4] = "CFSpent";
        n[n.CompleteTimer = 5] = "CompleteTimer";
        n[n.BCClaim = 6] = "BCClaim";
        n[n.CFClaim = 7] = "CFClaim";
        n[n.PurchaseIntent = 8] = "PurchaseIntent";
        n[n.Purchase = 9] = "Purchase";
        n[n.PurchaseProcessing = 10] = "PurchaseProcessing";
        n[n.Register = 11] = "Register";
        n[n.Login = 12] = "Login";
        n[n.ChangeTeamSlot = 13] = "ChangeTeamSlot";
        n[n.SponsorSign = 14] = "SponsorSign";
        n[n.SignContract = 15] = "SignContract";
        n[n.Resign = 16] = "Resign";
        n[n.MatchExperienceSkip = 17] = "MatchExperienceSkip";
        n[n.MatchExperiencePause = 18] = "MatchExperiencePause";
        n[n.MatchExperiencePlay = 19] = "MatchExperiencePlay";
        n[n.MatchExperienceSpeed = 20] = "MatchExperienceSpeed";
        n[n.MatchExperienceCompleted = 21] = "MatchExperienceCompleted";
        n[n.SquadRemoveFromTransferList = 22] = "SquadRemoveFromTransferList";
        n[n.SquadAddToTransferList = 23] = "SquadAddToTransferList";
        n[n.LineupAddToLineup = 24] = "LineupAddToLineup";
        n[n.LineupAddSubstitute = 25] = "LineupAddSubstitute";
        n[n.MatchExperienceRerun = 26] = "MatchExperienceRerun";
        n[n.PlayerCardMakeOffer = 27] = "PlayerCardMakeOffer";
        n[n.ClickOut = 28] = "ClickOut";
        n[n.SurfacingView = 29] = "SurfacingView";
        n[n.SurfacingComplete = 30] = "SurfacingComplete";
        n[n.UpdateEmail = 31] = "UpdateEmail";
        n[n.VerifyEmail = 32] = "VerifyEmail";
        n[n.UpdateAvatar = 33] = "UpdateAvatar";
        n[n.MatchExperienceStart = 34] = "MatchExperienceStart";
        n[n.AssignSquadNumber = 35] = "AssignSquadNumber";
        n[n.AcceptedSuggestedLogin = 36] = "AcceptedSuggestedLogin";
        n[n.PlayFriendlyEvent = 37] = "PlayFriendlyEvent"
    }(i = n.Event || (n.Event = {})),
    function(n) {
        n.ShopMenuButton = "ShopMenuButton";
        n.BossCoinsWalletButton = "BossCoinsWalletButton";
        n.NotEnoughBossCoins = "NotEnoughBossCoins";
        n.ClaimBonusBossCoins = "ClaimBonusBossCoins";
        n.EventNotification = "EventNotification";
        n.DeepLink = "DeepLink"
    }(r = n.ShopEntryPoint || (n.ShopEntryPoint = {}))
}
)(LeanplumTrackingService || (LeanplumTrackingService = {}));
var PlayersService = function() {
    function n() {}
    return n.prototype.getByTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("/leagues/" + n + "/teams/" + t + "/players");
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.getSuspendedPlayers = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/teams/" + t + "/players/suspended");
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.getInjuredPlayers = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/teams/" + t + "/players/injured");
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.getBasePlayers = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagueTypes/" + n + "/teams/" + t + "/players");
        return RequestItemFactory.getInstance().createRequestItem(i)
    }
    ,
    n.prototype.getTopscorersByLeagueId = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/players/topscorers/" + t);
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.getAssistsByLeagueId = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/players/assists/" + t);
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.sell = function(n, t, i, r) {
        var u = {
            playerId: i,
            price: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/players/sell", HttpMethod.Put, u)
    }
    ,
    n.prototype.lineup = function(n, t, i, r) {
        var u = {
            lineup: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/players/" + i + "/lineup", HttpMethod.Put, u)
    }
    ,
    n.prototype.clearlineup = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItem("leagues/" + n + "/teams/" + t + "/players/clearlineup", HttpMethod.Put)
    }
    ,
    n.prototype.getPlayersForMatch = function(n, t, i) {
        var r = (new breeze.EntityQuery).from("leagues/" + n + "/matches/" + t + "/" + i + "/players");
        return RequestItemFactory.getInstance().createRequestItem(r)
    }
    ,
    n.prototype.assignSquadNumber = function(n, t, i, r) {
        var u = {
            squadNumber: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/players/" + i + "/assignsquadnumber", HttpMethod.Put, u)
    }
    ,
    n.prototype.getBestPerformingPlayers = function(n) {
        var t = (new breeze.EntityQuery).from("leagues/" + n + "/players/bestperformingplayers");
        return RequestItemFactory.getInstance().createRequestItem(t)
    }
    ,
    n
}(), RequestItem = function() {
    function n(n, t, i) {
        var r = this;
        this.isRetriedAfterRefreshingAccessToken = !1;
        this.cacheDurationInMinutes = 0;
        this.defaultValue = function() {
            return r.requestQuery.useFirstOrDefault ? null : []
        }
        ;
        this.deferred = n;
        this.requestQuery = t;
        this.cacheKey = i
    }
    return Object.defineProperty(n.prototype, "predicate", {
        set: function(n) {
            this._predicate = n
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "predicateAll", {
        set: function(n) {
            this._predicateAllFunction = n
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "orderBy", {
        set: function(n) {
            this._orderBy = n
        },
        enumerable: !0,
        configurable: !0
    }),
    n.prototype.resolve = function(n) {
        var t = this;
        if (this.requestQuery.useFirstOrDefault && n instanceof Array) {
            this.processResults(n).then(function(n) {
                t.deferred.resolve(n.firstOrDefault())
            }).done();
            return
        }
        if (this.requestQuery.isEmptyResultValid && !this.requestQuery.useFirstOrDefault && Object.keys(n).length === 0) {
            this.deferred.resolve([]);
            return
        }
        n instanceof Array ? this.processResults(n).then(function(n) {
            t.deferred.resolve(n.toArray())
        }).done() : this.deferred.resolve(n)
    }
    ,
    n.prototype.processResults = function(n) {
        var r = this, t = Enumerable.from(n), i;
        return t.any() ? (this._predicate && (t = t.where(this._predicate)),
        !this._predicateAllFunction) ? (this._orderBy && (t = t.orderBy(this._orderBy)),
        Q.resolve(t)) : (i = Q.defer(),
        this._predicateAllFunction(t).then(function(n) {
            var t = Enumerable.from(n);
            r._orderBy && (t = t.orderBy(r._orderBy));
            i.resolve(t)
        }).done(),
        i.promise) : Q.resolve(t)
    }
    ,
    n
}(), WebApiError = function() {
    function n(n, t, i, r) {
        this.requestQuery = n;
        this.modelState = t;
        this.httpStatus = i;
        this.extraInfo = r
    }
    return n.prototype.getFirstError = function(t) {
        return (t === void 0 && (t = !0),
        !t) ? Enumerable.from(this.modelState).firstOrDefault(function(t) {
            return t.key !== n.defaultErrorKey
        }) : Enumerable.from(this.modelState).firstOrDefault()
    }
    ,
    n.prototype.containsKey = function(n) {
        return Enumerable.from(this.modelState).any(function(t) {
            return t.key === n
        })
    }
    ,
    n.prototype.toString = function() {
        if (!this.requestQuery)
            return "WebApiError";
        var n = this.requestQuery.url.split("?")[0];
        return n = n.replace(/\/\d+/g, "/{number}"),
        "WebApiError: " + n + ", status: " + HttpStatus[this.httpStatus]
    }
    ,
    n.defaultErrorKey = "default_error",
    n
}(), WebApiBatch = function() {
    function n() {
        this._requestItems = [];
        this._isExecuted = !1
    }
    return n.prototype.add = function(n) {
        if (this._isExecuted)
            throw "Error: cannot add requestItem, batch was already executed.";
        return this._requestItems.push(n),
        n.deferred.promise
    }
    ,
    n.prototype.execute = function() {
        if (this._isExecuted)
            throw "Error: batch was already executed, cannot execute twice.";
        return this._isExecuted = !0,
        WebApi.getInstance().executeBatch(this._requestItems)
    }
    ,
    n
}(), HttpMethod;
(function(n) {
    n[n.Get = 0] = "Get";
    n[n.Put = 1] = "Put";
    n[n.Post = 2] = "Post";
    n[n.Delete = 3] = "Delete";
    n[n.Head = 4] = "Head"
}
)(HttpMethod || (HttpMethod = {})),
function(n) {
    n[n.NotSet = 0] = "NotSet";
    n[n.UnsentOrOpened = 1] = "UnsentOrOpened";
    n[n.Ok = 2] = "Ok";
    n[n.BadRequest = 3] = "BadRequest";
    n[n.NotAuthorized = 4] = "NotAuthorized";
    n[n.NotFound = 5] = "NotFound";
    n[n.Forbidden = 6] = "Forbidden";
    n[n.InternalError = 7] = "InternalError";
    n[n.NotImplemented = 8] = "NotImplemented";
    n[n.ServiceOverloaded = 9] = "ServiceOverloaded";
    n[n.MethodNotAllowed = 10] = "MethodNotAllowed";
    n[n.Other = 11] = "Other"
}(HttpStatus || (HttpStatus = {}));
var WebapiHelper = function() {
    function n() {}
    return n.mapHttpStatusCodeToHttpResponse = function(n) {
        switch (n) {
        case 0:
            return HttpStatus.UnsentOrOpened;
        case 200:
            return HttpStatus.Ok;
        case 400:
            return HttpStatus.BadRequest;
        case 401:
            return HttpStatus.NotAuthorized;
        case 403:
            return HttpStatus.Forbidden;
        case 404:
            return HttpStatus.NotFound;
        case 405:
            return HttpStatus.MethodNotAllowed;
        case 500:
            return HttpStatus.InternalError;
        case 501:
            return HttpStatus.NotImplemented;
        case 503:
            return HttpStatus.ServiceOverloaded;
        default:
            return HttpStatus.Other
        }
    }
    ,
    n.handleAndAlertError = function(n) {
        var i, r, t;
        (ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n),
        n != null) && (i = $("#default-error-alert-title").length > 0 && $("#default-error-alert-title").text().length > 0 ? $("#default-error-alert-title").text() : "Error",
        n instanceof WebApiError ? (r = n,
        t = r.getFirstError(),
        t != null && t.value.length > 0 && t.key !== TextHelper.uncapitalizeFirstLetter(CustomWebApiException[CustomWebApiException.BossCoinResultNotEnoughCoins]) && t.key !== TextHelper.uncapitalizeFirstLetter(CustomWebApiException[CustomWebApiException.AccountNotActivated]) && new AlertModal(i,t.value).show().done()) : n.hasOwnProperty("message") && new AlertModal(i,n.message).show().done())
    }
    ,
    n
}()
  , WebApiConfig = function() {
    function n() {
        if (n._instance)
            throw new Error("Error: Instantiation failed: Use WebApiConfig.getInstance() instead of new.");
        n._instance = this
    }
    return n.getInstance = function() {
        return n._instance === null && (n._instance = new n),
        n._instance
    }
    ,
    n.prototype.setTokens = function(n, t, i) {
        this.setAccessToken(n);
        this.setRefreshToken(t, i)
    }
    ,
    n.prototype.removeAccessToken = function() {
        $.removeCookie("access_token", {
            path: "/"
        })
    }
    ,
    n.prototype.removeTokens = function() {
        $.removeCookie("access_token", {
            path: "/"
        });
        $.removeCookie("refresh_token", {
            path: "/"
        });
        $.removeCookie("stayLoggedIn", {
            path: "/"
        });
        $.removeCookie("forum_token", {
            path: "/",
            domain: appViewModel.getDomain()
        })
    }
    ,
    n.prototype.getAccessToken = function() {
        return $.cookie("access_token")
    }
    ,
    n.prototype.getRefreshToken = function() {
        return $.cookie("refresh_token")
    }
    ,
    n.prototype.getStayLoggedIn = function() {
        return $.cookie("stayLoggedIn")
    }
    ,
    n.prototype.hasForumToken = function() {
        return Boolean($.cookie("forum_token"))
    }
    ,
    n.prototype.setAccessToken = function(n) {
        var t = new Date;
        t.setFullYear(t.getFullYear() + 1);
        $.cookie("access_token", n, {
            path: "/",
            expires: t
        })
    }
    ,
    n.prototype.setRefreshToken = function(n, t) {
        if (t) {
            var i = new Date;
            i.setFullYear(i.getFullYear() + 1);
            $.cookie("refresh_token", n, {
                path: "/",
                expires: i
            });
            $.cookie("stayLoggedIn", !0, {
                path: "/",
                expires: i
            })
        } else
            $.cookie("refresh_token", n, {
                path: "/"
            })
    }
    ,
    Object.defineProperty(n.prototype, "defaultCultureCode", {
        get: function() {
            return $.cookie("DefaultCultureCode")
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "cultureCode", {
        get: function() {
            return $.cookie("CultureCode")
        },
        set: function(n) {
            var t = new Date;
            t.setFullYear(t.getFullYear() + 1);
            typeof n == "undefined" || n == null || n.length == 0 ? $.removeCookie("CultureCode") : $.cookie("CultureCode", n, {
                path: "/",
                expires: t,
                domain: appViewModel.getDomain()
            })
        },
        enumerable: !0,
        configurable: !0
    }),
    n._instance = null,
    n
}()
  , WebApi = function() {
    function n() {
        if (this._tokenValidateEndPoint = "/token/validate",
        n._instance)
            throw new Error("Error: Instantiation failed: Use WebApi.getInstance() instead of new.");
        n._instance = this;
        this._baseUrl = appViewModel.getWebApiBaseUrl();
        this._clientId = appViewModel.sessionSettings.webapiClientId;
        this._clientSecret = appViewModel.sessionSettings.webapiClientSecret;
        this._lockService = new LocksService;
        this._forumTokenService = new ForumTokenService
    }
    return n.getInstance = function() {
        return n._instance === null && (n._instance = new n),
        n._instance
    }
    ,
    n.prototype.initialize = function() {
        var n = WebApiConfig.getInstance().getAccessToken(), t = null, i;
        n != null && n.length && (t = "Bearer " + n);
        i = breeze.config.getAdapterInstance("ajax");
        i.defaultSettings = {
            headers: {
                Authorization: t,
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8",
                "Accept-Language": (WebApiConfig.getInstance().cultureCode ? WebApiConfig.getInstance().cultureCode + ", " : "") + WebApiConfig.getInstance().defaultCultureCode,
                PlatformId: appViewModel.sessionSettings.platform,
                AppVersion: appViewModel.sessionSettings.buildVersion.getFormatted()
            }
        }
    }
    ,
    n.prototype.requestToken = function(n, t, i) {
        var r = Q.defer()
          , u = {
            userName: n,
            grant_type: "password",
            client_id: this._clientId,
            client_secret: this._clientSecret,
            password: t
        };
        return this.executeTokenRequest("/token", u, i).then(function() {
            r.resolve(!0)
        }).fail(function(n) {
            r.reject(n)
        }).done(),
        r.promise
    }
    ,
    n.prototype.requestExternalToken = function(n, t) {
        var i = Q.defer()
          , r = {
            provider: n.toLowerCase(),
            externalAccessToken: t,
            clientId: this._clientId,
            clientSecret: this._clientSecret
        };
        return this.executeTokenRequest("/" + appViewModel.sessionSettings.webapiVersion + "/login/" + n.toLowerCase(), r, !1).then(function() {
            i.resolve(!0)
        }).fail(function(n) {
            i.reject(n)
        }).done(),
        i.promise
    }
    ,
    n.prototype.refreshToken = function() {
        var n = Q.defer(), i = WebApiConfig.getInstance().getRefreshToken(), r, u, t;
        return i ? (u = {
            grant_type: "refresh_token",
            client_id: this._clientId,
            client_secret: this._clientSecret,
            refresh_token: i
        },
        t = !1,
        WebApiConfig.getInstance().getStayLoggedIn() && (t = !0),
        this.executeTokenRequest("/token", u, t).then(function() {
            n.resolve(!0)
        }).fail(function(t) {
            n.reject(t)
        }).done(),
        n.promise) : (r = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Refresh token is null"),
        Q.reject(r))
    }
    ,
    n.prototype.ensureValidToken = function() {
        var n = Q.defer()
          , t = (new breeze.EntityQuery).from(this._tokenValidateEndPoint)
          , i = RequestItemFactory.getInstance().createRequestItemSingle(t);
        return this.execute(i).then(function() {
            n.resolve(null)
        }).fail(function(t) {
            n.reject(t)
        }).done(),
        n.promise
    }
    ,
    n.prototype.executeTokenRequest = function(t, i, r) {
        this.changeAjaxAdapterForToken();
        var f = {
            data: i,
            method: HttpMethod.Post,
            url: t,
            isEmptyResultValid: !1,
            useFirstOrDefault: !1
        }
          , u = Q.defer()
          , e = new RequestItem(u,f,null);
        return this.performAjaxRequest(e, !1, n.RequestContentType.Json),
        this.handleTokenResponse(u, r)
    }
    ,
    n.prototype.handleTokenResponse = function(t, i) {
        var u = this
          , r = Q.defer();
        return t.promise.then(function(t) {
            WebApiConfig.getInstance().setTokens(t.access_token, t.refresh_token, i);
            n.getInstance().initialize();
            u.fetchForumToken(r)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            WebApiConfig.getInstance().removeTokens();
            n.getInstance().initialize();
            r.reject(t)
        }).done(),
        r.promise
    }
    ,
    n.prototype.fetchForumToken = function(n) {
        this.execute(this._forumTokenService.getForumToken()).then(function(n) {
            n && n.accessToken && CookieHelper.setForumToken(n)
        }).fail(function() {}).finally(function() {
            n.resolve(!0)
        }).done()
    }
    ,
    n.prototype.changeAjaxAdapterForToken = function() {
        var n = breeze.config.getAdapterInstance("ajax");
        n.requestInterceptor = function(n) {
            n.config.headers = {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                "Accept-Language": (WebApiConfig.getInstance().cultureCode ? WebApiConfig.getInstance().cultureCode + ", " : "") + WebApiConfig.getInstance().defaultCultureCode,
                PlatformId: appViewModel.sessionSettings.platform,
                AppVersion: appViewModel.sessionSettings.buildVersion.getFormatted()
            };
            n.config.xhrFields = {
                withCredentials: !0
            }
        }
        ;
        n.requestInterceptor.oneTime = !0
    }
    ,
    n.prototype.changeAjaxAdapterForMultipartFormData = function(n) {
        var t = WebApiConfig.getInstance().getAccessToken()
          , i = null;
        t != null && t.length && (i = "Bearer " + t);
        n.requestInterceptor = function(n) {
            n.config.headers = {
                Authorization: i,
                Accept: "application/json; charset=utf-8",
                "Accept-Language": (WebApiConfig.getInstance().cultureCode ? WebApiConfig.getInstance().cultureCode + ", " : "") + WebApiConfig.getInstance().defaultCultureCode,
                PlatformId: appViewModel.sessionSettings.platform,
                AppVersion: appViewModel.sessionSettings.buildVersion.getFormatted()
            };
            n.config.processData = !1;
            n.config.contentType = !1
        }
        ;
        n.requestInterceptor.oneTime = !0
    }
    ,
    n.prototype.changeAjaxAdapterForFormUrlEncoded = function(n, t) {
        var i;
        n.requestInterceptor = function(n) {
            n.config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
            n.config.processData = !0
        }
        ;
        n.requestInterceptor.oneTime = !0;
        ((i = t.requestQuery) === null || i === void 0 ? void 0 : i.data) && (t.requestQuery.data = Helper.cleanObject(t.requestQuery.data))
    }
    ,
    n.prototype.hasAnyToken = function() {
        return WebApiConfig.getInstance().getAccessToken() || WebApiConfig.getInstance().getRefreshToken() ? !0 : !1
    }
    ,
    n.prototype.removeTokens = function() {
        WebApiConfig.getInstance().removeTokens();
        this.initialize()
    }
    ,
    n.prototype.executeExternalAjaxRequest = function(n, t, i) {
        t === void 0 && (t = 1e3);
        i === void 0 && (i = null);
        var r = Q.defer();
        return $.ajax({
            url: n,
            timeout: t,
            data: i,
            success: function(n) {
                r.resolve(n)
            },
            error: function() {
                r.reject(null)
            }
        }),
        r.promise
    }
    ,
    n.prototype.execute = function(n) {
        var t = this;
        return CacheHandler.getInstance().getItem(n.cacheKey).then(function(t) {
            ConsoleLogger.log("Cached item: " + n.requestQuery.url);
            n.resolve(t)
        }).fail(function() {
            ConsoleLogger.log("Item: " + n.requestQuery.url);
            t.performAjaxRequest(n, Boolean(n.requestQuery.data), t.getRequestType(n))
        }).done(),
        n.deferred.promise
    }
    ,
    n.prototype.executeBatch = function(n) {
        var i = this
          , t = Q.defer();
        return this.resolveCachedBatchItems(n).done(function(n) {
            n.forEach(function(n) {
                return ConsoleLogger.log("BatchItem: " + n.requestQuery.url)
            });
            i.performBatchRequest(n, t)
        }),
        t.promise
    }
    ,
    n.prototype.resolveCachedBatchItems = function(n) {
        var t = Q.defer()
          , i = n.filter(function(n) {
            return !n.cacheKey
        })
          , r = [];
        return n.filter(function(n) {
            return Boolean(n.cacheKey)
        }).forEach(function(n) {
            var t = CacheHandler.getInstance().getItem(n.cacheKey);
            r.push(t);
            t.then(function(t) {
                ConsoleLogger.log("Cached BatchItem: " + n.requestQuery.url);
                n.resolve(t)
            }).fail(function() {
                ConsoleLogger.log("No cached item found: " + n.requestQuery.url);
                i.push(n)
            }).done()
        }),
        Q.allSettled(r).done(function() {
            t.resolve(i)
        }),
        t.promise
    }
    ,
    n.prototype.performAjaxRequest = function(t, i, r) {
        var u = this
          , f = breeze.config.getAdapterInstance("ajax");
        switch (r) {
        case n.RequestContentType.FormData:
            this.changeAjaxAdapterForMultipartFormData(f);
            i = !1;
            break;
        case n.RequestContentType.FormUrlencoded:
            this.changeAjaxAdapterForFormUrlEncoded(f, t);
            i = !1
        }
        f.ajax({
            url: this._baseUrl + (t.requestQuery.url.charAt(0) !== "/" ? "/" : "") + t.requestQuery.url,
            type: HttpMethod[t.requestQuery.method],
            data: i ? JSON.stringify(t.requestQuery.data) : t.requestQuery.data,
            success: function(n) {
                var i = n.data
                  , r = n.getHeaders("ServerTime");
                r && appViewModel.syncServerTime(Number(r) * 1e3);
                t.resolve(i);
                u.setCacheItem(i, t.cacheKey, t.cacheDurationInMinutes)
            },
            error: function(n) {
                var e = WebapiHelper.mapHttpStatusCodeToHttpResponse(n.status)
                  , f = {};
                n.data && (f = JSON.parse(n.data));
                u.handleFailedHttpResponse(t, e, f, n, function() {
                    return u.performAjaxRequest(t, i, r)
                })
            }
        })
    }
    ,
    n.prototype.performBatchRequest = function(t, i) {
        var u = this;
        if (t.length === 0) {
            i.resolve(!0);
            return
        }
        var f = "batch_" + Helper.createGuid()
          , e = breeze.config.getAdapterInstance("ajax")
          , o = {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "multipart/mixed; boundary=" + f,
            "Accept-Language": (WebApiConfig.getInstance().cultureCode ? WebApiConfig.getInstance().cultureCode + ", " : "") + WebApiConfig.getInstance().defaultCultureCode,
            PlatformId: appViewModel.sessionSettings.platform,
            AppVersion: appViewModel.sessionSettings.buildVersion.getFormatted()
        }
          , r = WebApiConfig.getInstance().getAccessToken();
        r != null && r.length && (o.Authorization = "Bearer " + r);
        e.requestInterceptor = function(n) {
            n.config.headers = o
        }
        ;
        e.requestInterceptor.oneTime = !0;
        var s = Q.defer()
          , c = Enumerable.from(t).where(function(n) {
            return n.deferred.promise.isPending()
        }).select(function(n) {
            return n.requestQuery
        }).toArray()
          , l = this.generateBatchBody(c, f)
          , a = {
            data: l,
            method: HttpMethod.Post,
            url: "/batch",
            isEmptyResultValid: !1,
            useFirstOrDefault: !1
        }
          , h = new RequestItem(s,a,null);
        this.performAjaxRequest(h, !1, n.RequestContentType.MultipartMixed);
        s.promise.then(function(n) {
            var r = n.split("\r\n")[0]
              , f = u.parseBatchResults(n, r);
            u.handleBatchResults(h, f, t, i)
        }).fail(function(n) {
            i.reject(n);
            for (var r = 0; r < t.length; r++)
                t[r].deferred.reject(n)
        }).done()
    }
    ,
    n.prototype.generateBatchBody = function(n, t) {
        var i = [];
        return n.forEach(function(n) {
            var r = HttpMethod[n.method].toUpperCase();
            i.push("--" + t);
            i.push("Content-Type: application/http; msgtype=request", "");
            i.push(r + " " + (n.url.charAt(0) !== "/" ? "/" : "") + n.url + " HTTP/1.1");
            i.push("Host: " + appViewModel.sessionSettings.webapiUrl);
            (n.method === HttpMethod.Post || n.method === HttpMethod.Put) && n.data ? (i.push("Content-Type: application/json; charset=utf-8"),
            i.push("", n.data ? JSON.stringify(n.data) : "")) : i.push("", "")
        }),
        i.push("--" + t + "--", ""),
        i.join("\r\n")
    }
    ,
    n.prototype.parseBatchResults = function(n, t) {
        var r = n.split(new RegExp(t + "(?:--)?")), u, f, e, o;
        r = Helper.removeEmptyValuesFromArray(r);
        var s = [];
        for (u = 0; u < r.length; u++) {
            var h = HttpStatus.NotSet
              , c = {}
              , i = r[u].split("\r\n");
            for (i = Helper.removeEmptyValuesFromArray(i),
            f = 0; f < i.length; f++)
                if (e = i[f],
                !/^([^()<>@,;:\\"\/[\]?={} \t]+)\s?:\s?(.*)/.test(e))
                    if (o = /^HTTP\/(?:1\.\d|2)\s+(\d{3})/i.exec(e),
                    o)
                        h = WebapiHelper.mapHttpStatusCodeToHttpResponse(parseInt(o[1]));
                    else
                        try {
                            c = JSON.parse(e)
                        } catch (l) {
                            throw "The batch body could not be parsed. " + l;
                        }
            s.push({
                httpStatus: h,
                parsedResult: c,
                rawResult: i
            })
        }
        return s
    }
    ,
    n.prototype.handleBatchResults = function(n, t, i, r) {
        var f = this, u;
        if (Enumerable.from(t).any(function(n) {
            return n.httpStatus === HttpStatus.NotAuthorized
        })) {
            UnauthorizedResponseHandler.getInstance().queueForAuthorization(n, function() {
                return f.performBatchRequest(i, r)
            }, r, this.createDefaultWebApiError(n.requestQuery, HttpStatus.NotAuthorized));
            return
        }
        for (u = 0; u < t.length; u++) {
            if (t[u].httpStatus === HttpStatus.Ok) {
                this.setCacheItem(t[u].parsedResult, i[u].cacheKey, i[u].cacheDurationInMinutes);
                i[u].resolve(t[u].parsedResult);
                continue
            }
            this.handleFailedHttpResponse(i[u], t[u].httpStatus, t[u].parsedResult, t[u].rawResult, null)
        }
        r.resolve(!0)
    }
    ,
    n.prototype.handleFailedHttpResponse = function(n, t, i, r, u) {
        var s, e, f, h, o;
        switch (t) {
        case HttpStatus.ServiceOverloaded:
            if (n.requestQuery.is503Valid === !0) {
                n.deferred.resolve(n.defaultValue());
                return
            }
            if (n.requestQuery.is503Valid === !1) {
                n.deferred.reject(this.createDefaultWebApiError(n.requestQuery, t, r));
                return
            }
            appViewModel.redirect(RedirectionFlow.ServerDown);
            break;
        case HttpStatus.Forbidden:
            appViewModel.redirect(RedirectionFlow.Reset);
            break;
        case HttpStatus.UnsentOrOpened:
            n.deferred.reject(this.createDefaultWebApiError(n.requestQuery, t, r));
            break;
        case HttpStatus.NotAuthorized:
            n.requestQuery.url.indexOf(this._tokenValidateEndPoint) >= 0 ? (s = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("The call was a 401"),
            n.deferred.reject(s)) : UnauthorizedResponseHandler.getInstance().queueForAuthorization(n, u, n.deferred, this.createDefaultWebApiError(n.requestQuery, t, r));
            break;
        case HttpStatus.NotFound:
            n.requestQuery.method === HttpMethod.Get && n.requestQuery.isEmptyResultValid && Object.keys(i).length === 0 ? (e = n.defaultValue(),
            n.deferred.resolve(e),
            this.setCacheItem(e, n.cacheKey, n.cacheDurationInMinutes)) : n.deferred.reject(this.createDefaultWebApiError(n.requestQuery, t, r));
            break;
        case HttpStatus.BadRequest:
            if (f = this.createDefaultWebApiError(n.requestQuery, t, r),
            i === null && i == undefined) {
                n.deferred.reject(f);
                return
            }
            i.hasOwnProperty("error") && i.error === "invalid_grant" && i.hasOwnProperty("error_description") ? this.handleInvalidGrant(n.requestQuery, f, i, t, r).then(function(t) {
                n.deferred.reject(t)
            }).fail(function() {}).done() : i.hasOwnProperty("modelState") ? (f = new WebApiError(n.requestQuery,i.modelState,t,r),
            f.containsKey(TextHelper.uncapitalizeFirstLetter(CustomWebApiException[CustomWebApiException.BossCoinResultNotEnoughCoins])) ? (n.requestQuery.data && n.requestQuery.data.hasOwnProperty("productId") && (o = appViewModel.bossCoinProductsPartial().getBossCoinProductById(n.requestQuery.data.productId),
            o && (h = o.name)),
            new NotEnoughBossCoinsModal(null,!1,h).show().then(function() {
                appViewModel.bossCoinWalletPartial().openBosscoinShopModal(LeanplumTrackingService.ShopEntryPoint.NotEnoughBossCoins)
            }).fail(function() {}).done()) : f.containsKey(TextHelper.uncapitalizeFirstLetter(CustomWebApiException[CustomWebApiException.AccountNotActivated])) && appViewModel.showActivateAccountModal(),
            n.deferred.reject(f)) : i.hasOwnProperty("detail") ? (f = new WebApiError(n.requestQuery,{
                detail: i.detail
            },t,r),
            n.deferred.reject(f)) : i.hasOwnProperty("messageDetail") ? (f = new WebApiError(n.requestQuery,{
                messageDetail: i.messageDetail
            },t,r),
            n.deferred.reject(f)) : n.deferred.reject(f);
            break;
        default:
            n.deferred.reject(this.createDefaultWebApiError(n.requestQuery, t, r))
        }
    }
    ,
    n.prototype.handleInvalidGrant = function(n, t, i, r, u) {
        var f = Q.defer()
          , e = null;
        try {
            e = JSON.parse(i.error_description)
        } catch (o) {
            return f.resolve(t),
            f.promise
        }
        return !e || !e.hasOwnProperty("invalidGrantType") ? (f.resolve(t),
        f.promise) : e.invalidGrantType !== InvalidGrantType[InvalidGrantType.Locked] && !e.hasOwnProperty("userId") || !e.userId ? e.hasOwnProperty("errorMessage") ? (f.resolve(new WebApiError(n,{
            error_description: e.errorMessage
        },r,u)),
        f.promise) : (f.resolve(t),
        f.promise) : (this.execute(this._lockService.getByUser(e.userId, !0)).then(function(n) {
            if (!n || n.reason != LockReason.AccountDeleted) {
                window.location.href = Helper.replaceText(Urls.locked, [{
                    key: "userId",
                    value: e.userId.toString()
                }]);
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("redirecting to locked page");
                f.reject(i);
                return
            }
            f.resolve(t)
        }).done(),
        f.promise)
    }
    ,
    n.prototype.setCacheItem = function(n, t, i) {
        i === void 0 && (i = 0);
        t && CacheHandler.getInstance().setItem(n, t, i)
    }
    ,
    n.prototype.createDefaultWebApiError = function(n, t, i) {
        var r = {};
        return r[WebApiError.defaultErrorKey] = appViewModel.defaultErrorMessage,
        new WebApiError(n,r,t,i)
    }
    ,
    n.prototype.getRequestType = function(t) {
        var r, i, u;
        return t.requestQuery.method !== HttpMethod.Post && t.requestQuery.method !== HttpMethod.Put ? n.RequestContentType.Json : (i = (r = t.requestQuery) === null || r === void 0 ? void 0 : r.data,
        u = i === null || i === void 0 ? void 0 : i.constructor,
        i instanceof FormData) ? n.RequestContentType.FormData : i instanceof Object && u === Object ? n.RequestContentType.FormUrlencoded : n.RequestContentType.Json
    }
    ,
    n._instance = null,
    n
}();
(function(n) {
    var t;
    (function(n) {
        n[n.Json = 0] = "Json";
        n[n.MultipartMixed = 1] = "MultipartMixed";
        n[n.FormData = 2] = "FormData";
        n[n.FormUrlencoded = 3] = "FormUrlencoded"
    }
    )(t = n.RequestContentType || (n.RequestContentType = {}))
}
)(WebApi || (WebApi = {}));
var LocksService = function() {
    function n() {}
    return n.prototype.getByUser = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/users/" + n + "/locks/active");
        return RequestItemFactory.getInstance().createRequestItemSingle(i, t)
    }
    ,
    n.prototype.appeal = function(n, t, i, r) {
        var u = {
            userId: n,
            lockId: t,
            email: i,
            appeal: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("users/" + n + "/locks/" + t + "/appeal", HttpMethod.Post, u)
    }
    ,
    n.prototype.confirmAppeal = function(n, t, i) {
        var r = {
            userId: n,
            lockId: t,
            activationCode: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("users/" + n + "/locks/" + t + "/appeal", HttpMethod.Put, r)
    }
    ,
    n
}(), ForumTokenService = function() {
    function n() {}
    return n.prototype.getForumToken = function() {
        var n = (new breeze.EntityQuery).from("user/forumtoken");
        return RequestItemFactory.getInstance().createRequestItemSingle(n)
    }
    ,
    n
}(), UnauthorizedResponseHandler = function() {
    function n() {
        if (this._isRelogging = !1,
        n._instance)
            throw new Error("Error: Instantiation failed: Use UnauthorizedResponseHandler.getInstance() instead of new.");
        n._instance = this;
        this.resetHandler()
    }
    return n.getInstance = function() {
        return n._instance === null && (n._instance = new n),
        n._instance
    }
    ,
    n.prototype.queueForAuthorization = function(n, t, i, r) {
        var u = this, f;
        if (WebApiConfig.getInstance().getRefreshToken() == null) {
            WebApiConfig.getInstance().removeAccessToken();
            appViewModel.redirect(RedirectionFlow.NotLoggedIn);
            return
        }
        if (n.isRetriedAfterRefreshingAccessToken) {
            i.reject(r);
            return
        }
        if (this._isAccessTokenRefreshed && !WebApiConfig.getInstance().getAccessToken() && this.resetHandler(),
        this._isAccessTokenRefreshed) {
            n.isRetriedAfterRefreshingAccessToken = !0;
            t();
            return
        }
        if (this._isAccessTokenRejected) {
            i.reject(r);
            return
        }
        (f = {
            requestItem: n,
            functionToRetry: t
        },
        this._queue.push(f),
        this._isRefreshingAccessToken) || (this._isRefreshingAccessToken = !0,
        WebApi.getInstance().refreshToken().then(function() {
            var t, n;
            for (u._isRefreshingAccessToken = !1,
            u._isAccessTokenRefreshed = !0,
            u._queue.length > 0 && (t = Enumerable.from(u._queue).select(function(n) {
                return n.requestItem.deferred.promise
            }).toArray(),
            Q.any(t).then(function() {
                u._isAccessTokenRefreshed = !1
            }).fail(function() {}).done()),
            LeanplumHelper.getInstance().isInitialized().then(function() {
                if (!LeanplumHelper.getInstance().didSessionExistOnInitialize() && !u._isRelogging) {
                    u._isRelogging = !0;
                    var n = Enumerable.from(u._queue).select(function(n) {
                        return n.requestItem.deferred.promise
                    }).toArray();
                    layoutInitialisedDeferred.promise.then(function() {
                        var t = new PreLoaderModal;
                        t.show();
                        n.push(t.loadLoginData());
                        Q.allSettled(n).fin(function() {
                            u._isRelogging = !1;
                            t.hide()
                        }).done()
                    })
                }
            }).fail(function() {}).done(); u._queue.length > 0; )
                n = u._queue.shift(),
                n.requestItem.isRetriedAfterRefreshingAccessToken = !0,
                n.functionToRetry()
        }).fail(function() {
            u._isRefreshingAccessToken = !1;
            u._isAccessTokenRejected = !0;
            appViewModel.redirect(RedirectionFlow.NotLoggedIn);
            return
        }).done())
    }
    ,
    n.prototype.resetHandler = function() {
        this._isAccessTokenRefreshed = !1;
        this._isAccessTokenRejected = !1;
        this._isRefreshingAccessToken = !1;
        this._queue = []
    }
    ,
    n._instance = null,
    n
}(), CacheHandler = function() {
    function n(t) {
        if (this._defaultCacheDurationInMinutes = 15,
        n._instance)
            throw new Error("Error: Instantiation failed: Use CacheHandler.getInstance() instead of new.");
        this._cacheProvider = t;
        n._instance = this
    }
    return n.getInstance = function() {
        if (n._instance === null) {
            var t;
            t = LocalStorageCacheProvider.isSupported() ? new LocalStorageCacheProvider : new NoCacheProvider;
            n._instance = new n(t)
        }
        return n._instance
    }
    ,
    n.prototype.getKeys = function() {
        return this._cacheProvider.getKeys()
    }
    ,
    n.prototype.removeKeys = function(n) {
        this._cacheProvider.removeKeys(n)
    }
    ,
    n.prototype.setItem = function(n, t, i) {
        i === void 0 && (i = 0);
        this._cacheProvider.storeItem(t, n, i === 0 ? this._defaultCacheDurationInMinutes : i)
    }
    ,
    n.prototype.removeKeysStartingWith = function(n) {
        this._cacheProvider.removeKeysForPrefix(CacheKey[n])
    }
    ,
    n.prototype.removeKey = function(n) {
        this._cacheProvider.removeKey(n)
    }
    ,
    n.prototype.getItem = function(n) {
        return this._cacheProvider.getItem(n)
    }
    ,
    n.prototype.clear = function() {
        this._cacheProvider.removeAll()
    }
    ,
    n.prototype.clearExpiredItems = function() {
        this._cacheProvider.clearExpiredItems()
    }
    ,
    n._instance = null,
    n
}(), CacheKey;
(function(n) {
    n[n.AchievementCount = 0] = "AchievementCount";
    n[n.Achievements = 1] = "Achievements";
    n[n.BossCoinProducts = 2] = "BossCoinProducts";
    n[n.CountdownTimers = 3] = "CountdownTimers";
    n[n.Countries = 4] = "Countries";
    n[n.CupRounds = 5] = "CupRounds";
    n[n.Formations = 6] = "Formations";
    n[n.Fouls = 7] = "Fouls";
    n[n.GameSettings = 8] = "GameSettings";
    n[n.GameVariables = 9] = "GameVariables";
    n[n.HistoryCollection = 10] = "HistoryCollection";
    n[n.HistoryData = 11] = "HistoryData";
    n[n.Injuries = 12] = "Injuries";
    n[n.Languages = 13] = "Languages";
    n[n.League = 14] = "League";
    n[n.LeagueStandings = 15] = "LeagueStandings";
    n[n.LeagueTypes = 16] = "LeagueTypes";
    n[n.Managers = 17] = "Managers";
    n[n.MatchData = 18] = "MatchData";
    n[n.MatchDataPerLeague = 19] = "MatchDataPerLeague";
    n[n.Matches = 20] = "Matches";
    n[n.MatchesByWeek = 21] = "MatchesByWeek";
    n[n.NewsPaperArticles = 22] = "NewsPaperArticles";
    n[n.Referees = 23] = "Referees";
    n[n.Teams = 24] = "Teams";
    n[n.User = 25] = "User";
    n[n.UserManagers = 26] = "UserManagers";
    n[n.UserWithTeamSlots = 27] = "UserWithTeamSlots";
    n[n.Texts = 28] = "Texts";
    n[n.TeamTactic = 29] = "TeamTactic";
    n[n.BossCoinWallet = 30] = "BossCoinWallet";
    n[n.LeagueSettings = 31] = "LeagueSettings";
    n[n.Rewards = 32] = "Rewards";
    n[n.Profile = 33] = "Profile";
    n[n.Crews = 34] = "Crews";
    n[n.StaffMembers = 35] = "StaffMembers";
    n[n.BossCoinOrigin = 36] = "BossCoinOrigin";
    n[n.Ads = 37] = "Ads";
    n[n.FacebookUser = 38] = "FacebookUser";
    n[n.FacebookStatus = 39] = "FacebookStatus";
    n[n.Crew = 40] = "Crew";
    n[n.CrewMembers = 41] = "CrewMembers";
    n[n.CrewBattle = 42] = "CrewBattle";
    n[n.CrewRankingDivisions = 43] = "CrewRankingDivisions";
    n[n.Language = 44] = "Language";
    n[n.SurfacingStates = 45] = "SurfacingStates";
    n[n.TeamTrainings = 46] = "TeamTrainings";
    n[n.Friendlies = 47] = "Friendlies";
    n[n.UserSubAccounts = 48] = "UserSubAccounts";
    n[n.ManagersFetchedWithoutPoints = 49] = "ManagersFetchedWithoutPoints";
    n[n.BaseTeams = 50] = "BaseTeams";
    n[n.CupMatches = 51] = "CupMatches";
    n[n.Euro2016 = 52] = "Euro2016";
    n[n.TeamTrainingsCampHistory = 53] = "TeamTrainingsCampHistory";
    n[n.Invites = 54] = "Invites";
    n[n.EntryRequests = 55] = "EntryRequests";
    n[n.Newsfeed = 56] = "Newsfeed";
    n[n.Stadium = 57] = "Stadium";
    n[n.Products = 58] = "Products";
    n[n.Friends = 59] = "Friends";
    n[n.CrewInvitesForUser = 60] = "CrewInvitesForUser";
    n[n.CrewRequestsForCrew = 61] = "CrewRequestsForCrew";
    n[n.Release = 62] = "Release";
    n[n.FirebasePushToken = 63] = "FirebasePushToken";
    n[n.CrewBattleHistory = 64] = "CrewBattleHistory";
    n[n.Nationalities = 65] = "Nationalities";
    n[n.LockedSquadNumbers = 66] = "LockedSquadNumbers";
    n[n.TrainingSessionsOngoing = 67] = "TrainingSessionsOngoing";
    n[n.EventNotifications = 68] = "EventNotifications";
    n[n.ChatProviders = 69] = "ChatProviders";
    n[n.ActionRewards = 70] = "ActionRewards";
    n[n.Tickets = 71] = "Tickets";
    n[n.UserRewards = 72] = "UserRewards";
    n[n.WinnersLeagueQualifications = 73] = "WinnersLeagueQualifications";
    n[n.VideoCaps = 74] = "VideoCaps";
    n[n.FirebaseMessagingOptions = 75] = "FirebaseMessagingOptions";
    n[n.PushnotificationsEnabled = 76] = "PushnotificationsEnabled";
    n[n.SkillRatingTiers = 77] = "SkillRatingTiers";
    n[n.SkillRatingBonuses = 78] = "SkillRatingBonuses";
    n[n.LeanplumAppInboxMessages = 79] = "LeanplumAppInboxMessages";
    n[n.HistoryCollectionV1Dot1 = 80] = "HistoryCollectionV1Dot1"
}
)(CacheKey || (CacheKey = {}));
LocalStorageCacheProvider = function() {
    function n() {}
    return n.prototype.getItem = function(n) {
        var t = Q.defer(), r, i;
        return n ? (r = this.getLocalStorageItem(n),
        !r) ? (i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Fetch from local storage failed"),
        t.reject(i),
        t.promise) : r.expires < Date.now() ? (this.removeKey(n),
        i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Value from localstorage expired"),
        t.reject(i),
        t.promise) : (t.resolve(r.data),
        t.promise) : (i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("No local storage cache key provided"),
        t.reject(i),
        t.promise)
    }
    ,
    n.prototype.storeItem = function(t, i, r) {
        try {
            this.removeKey(t);
            var u = new n.LocalStorageItem(i,r)
              , f = JSON.stringify(u);
            localStorage.setItem(t, f)
        } catch (e) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(e)
        }
    }
    ,
    n.prototype.clearExpiredItems = function() {
        for (var i, t = this.getAllCurrentActiveInternalKeys(), n = 0; n < t.length; n++)
            i = this.getLocalStorageItem(t[n]),
            i && i.expires < Date.now() && this.removeKey(t[n])
    }
    ,
    n.prototype.getLocalStorageItem = function(n) {
        var t;
        try {
            return (t = localStorage.getItem(n),
            t === null) ? null : JSON.parse(t)
        } catch (i) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(i)
        }
        return null
    }
    ,
    n.prototype.getKeys = function() {
        return this.getAllCurrentActiveInternalKeys()
    }
    ,
    n.prototype.getAllCurrentActiveInternalKeys = function() {
        var i = [], r = Helper.getEnumKeys(CacheKey), n, t;
        try {
            for (n = 0; n < localStorage.length; n++)
                t = localStorage.key(n),
                this.keyBelongsToArrayOfEnumKeys(t, r) && i.push(t)
        } catch (u) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(u)
        }
        return i
    }
    ,
    n.prototype.keyBelongsToArrayOfEnumKeys = function(n, t) {
        if (!n)
            return !1;
        var i = this.getCleanKey(n);
        return t.indexOf(i) > -1
    }
    ,
    n.prototype.getCleanKey = function(n) {
        if (!n)
            return n;
        var t = n.split("_");
        return t[0]
    }
    ,
    n.prototype.removeKey = function(n) {
        try {
            localStorage.removeItem(n)
        } catch (t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t)
        }
    }
    ,
    n.prototype.removeKeysForPrefix = function(n) {
        for (var t, r = this.getAllCurrentActiveInternalKeys(), i = 0; i < r.length; i++)
            t = r[i],
            (t.indexOf(n + "_") === 0 || t === n) && this.removeKey(t)
    }
    ,
    n.prototype.removeKeys = function(n) {
        for (var t = 0; t < n.length; t++)
            this.removeKey(n[t])
    }
    ,
    n.prototype.removeAll = function() {
        this.removeKeys(this.getAllCurrentActiveInternalKeys())
    }
    ,
    n.isSupported = function() {
        try {
            var n = "modernizr";
            return localStorage.setItem(n, n),
            localStorage.removeItem(n),
            !0
        } catch (t) {
            return !1
        }
    }
    ,
    n
}(),
function(n) {
    var t = function() {
        function n(n, t) {
            t === void 0 && (t = 30);
            var i = Date.now();
            i += t * 6e4;
            this.expires = i;
            this.data = n
        }
        return n
    }();
    n.LocalStorageItem = t
}(LocalStorageCacheProvider || (LocalStorageCacheProvider = {}));
NoCacheProvider = function() {
    function n() {}
    return n.prototype.getItem = function() {
        var n = Q.defer()
          , t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("No cache available.");
        return n.reject(t),
        n.promise
    }
    ,
    n.prototype.storeItem = function() {}
    ,
    n.prototype.clearExpiredItems = function() {}
    ,
    n.prototype.getKeys = function() {
        return []
    }
    ,
    n.prototype.removeKey = function() {}
    ,
    n.prototype.removeKeysForPrefix = function() {}
    ,
    n.prototype.removeKeys = function() {}
    ,
    n.prototype.removeAll = function() {}
    ,
    n
}();
UsersService = function() {
    function n() {}
    return n.prototype.getAccountByIdentity = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("/user/accounts")
          , i = n ? CacheKey[CacheKey.UserWithTeamSlots] : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(t, i)
    }
    ,
    n.prototype.getUserById = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/users/" + n + "/accounts")
          , r = t ? CacheKey[CacheKey.User] + "_" + n.toString() : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(i, r)
    }
    ,
    n.prototype.getUserByName = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/users/accounts?name=" + encodeURIComponent(n))
          , r = t ? CacheKey[CacheKey.User] + "_" + n.toString() : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(i, r, !0)
    }
    ,
    n.prototype.getSubAccounts = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/users/" + n + "/subaccounts")
          , r = t ? CacheKey[CacheKey.UserSubAccounts] + "_" + n.toString() : null;
        return RequestItemFactory.getInstance().createRequestItem(i, r)
    }
    ,
    n.prototype.addFriendByLogin = function(n) {
        var t = {
            friendName: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/friends", HttpMethod.Post, t)
    }
    ,
    n.prototype.getAllFriendsByIdentity = function() {
        var n = (new breeze.EntityQuery).from("user/friends");
        return RequestItemFactory.getInstance().createRequestItem(n, !0)
    }
    ,
    n.prototype.importFriends = function(n) {
        var t = {
            facebookAccessToken: n
        };
        return RequestItemFactory.getInstance().createRequestItem("user/friends/facebook", HttpMethod.Post, t)
    }
    ,
    n.prototype.filterFriends = function(n) {
        var t = (new breeze.EntityQuery).from("user/friends/filter?query=" + encodeURIComponent(n));
        return RequestItemFactory.getInstance().createRequestItem(t, !0)
    }
    ,
    n.prototype.addFriendBranch = function(n) {
        var t = {
            friendUserId: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/friends/branch", HttpMethod.Post, t)
    }
    ,
    n.prototype.inviteBranch = function(n, t) {
        var i = {
            email: n,
            branchLink: t
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/friends/invite", HttpMethod.Post, i)
    }
    ,
    n.prototype.deleteFriend = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/friends/" + n, HttpMethod.Delete)
    }
    ,
    n.prototype.getSkillRatingBonusesByIdentity = function(n) {
        var t = (new breeze.EntityQuery).from("user/skillratingbonuses");
        return RequestItemFactory.getInstance().createRequestItem(t, n ? CacheKey[CacheKey.SkillRatingBonuses] : null, !0)
    }
    ,
    n
}(),
function(n) {
    var t = function() {
        function n() {}
        return n.prototype.getByIdentity = function(n, t) {
            var i, r, u;
            return n === void 0 && (n = !1),
            t === void 0 && (t = ""),
            i = "/user",
            t && t.length > 0 && (i = i + ("?fields=" + encodeURIComponent(t))),
            r = (new breeze.EntityQuery).from(i),
            u = n ? CacheKey[CacheKey.User] + "_" + t : null,
            RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", r, u)
        }
        ,
        n.prototype.addFriendByLogin = function(n) {
            var t = {
                name: n
            };
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "user/friends", HttpMethod.Post, t)
        }
        ,
        n.prototype.getUserById = function(n, t, i) {
            var r, u, f;
            return t === void 0 && (t = !1),
            i === void 0 && (i = ""),
            r = "/users/" + n,
            i && i.length > 0 && (r = r + ("?fields=" + encodeURIComponent(i))),
            u = (new breeze.EntityQuery).from(r),
            f = t ? CacheKey[CacheKey.User] + "_" + n.toString() + "_" + i : null,
            RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", u, f)
        }
        ,
        n.prototype.importFriends = function(n) {
            var t = {
                facebookAccessToken: n
            };
            return RequestItemFactory.getInstance().createRequestItemForVersion("v1.1", "user/friends/facebook", HttpMethod.Post, t)
        }
        ,
        n.prototype.updateInterests = function(n, t, i) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user/interests", HttpMethod.Put, {
                motto: n,
                favouriteTeam: t,
                favouritePlayer: i
            })
        }
        ,
        n.prototype.updateCustomContent = function(n) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user/customcontent", HttpMethod.Put, {
                content: n
            })
        }
        ,
        n.prototype.updateUser = function(n) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user", HttpMethod.Put, {
                countryCode: n
            })
        }
        ,
        n.prototype.changePassword = function(n, t, i) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1", "/user/password", HttpMethod.Put, {
                currentPassword: n,
                newPassword: t,
                confirmNewPassword: i
            })
        }
        ,
        n.prototype.addConnection = function(n, t) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user/connections", HttpMethod.Post, {
                type: n,
                value: t
            })
        }
        ,
        n.prototype.deactivateUser = function() {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user/deactivate", HttpMethod.Post)
        }
        ,
        n.prototype.addUserImage = function(n, t) {
            var i = new FormData;
            return i.append("type", t),
            i.append("image", n, "userimage"),
            RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "/user/image", HttpMethod.Post, i)
        }
        ,
        n.prototype.verifyUserConnection = function(n, t, i) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "user/connections/" + n + "/verify", HttpMethod.Put, {
                verificationCode: i,
                value: t
            })
        }
        ,
        n.prototype.trackGdpr = function(n, t, i) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "user/gdpr", HttpMethod.Post, {
                segment: n,
                platform: t,
                accepted: i
            })
        }
        ,
        n.prototype.updateGdprSetting = function(n, t) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "user/gdpr/update", HttpMethod.Put, {
                type: n,
                permission: t
            })
        }
        ,
        n.prototype.getFriends = function(t, i, r) {
            var u, f, e;
            return t === void 0 && (t = !0),
            i === void 0 && (i = ""),
            r === void 0 && (r = 50),
            u = "/user/friends?limit=" + r,
            i && i.length > 0 && (u = u + ("&fields=" + encodeURIComponent(i))),
            f = (new breeze.EntityQuery).from(u),
            e = t ? n.friendCacheKey + i : null,
            RequestItemFactory.getInstance().createRequestItemForVersion("v1.1", f, e, !0)
        }
        ,
        n.friendCacheKey = CacheKey[CacheKey.Friends] + "_",
        n
    }();
    n.UsersService = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
var BossCoinsService = function() {
    function n() {}
    return n.prototype.claim = function() {
        return CacheHandler.getInstance().removeKey(CacheKey[CacheKey.BossCoinWallet]),
        RequestItemFactory.getInstance().createRequestItemSingle("user/bosscoinwallet/claim", HttpMethod.Put)
    }
    ,
    n.prototype.getByIdentity = function(n) {
        n === void 0 && (n = !0);
        var i = (new breeze.EntityQuery).from("user/bosscoinwallet")
          , t = RequestItemFactory.getInstance().createRequestItemSingle(i, CacheKey[CacheKey.BossCoinWallet], !0);
        return t.deferred.promise.then(function(t) {
            n && SessionManager.getInstance().modifySession(function(n) {
                return n.hasBossCoinWallet = t !== undefined && t !== null
            })
        }).done(),
        t.cacheDurationInMinutes = appViewModel.sessionSettings.refeshbosscoincachetime,
        t
    }
    ,
    n.prototype.convert = function() {
        return CacheHandler.getInstance().removeKey(CacheKey[CacheKey.BossCoinWallet]),
        RequestItemFactory.getInstance().createRequestItemSingle("user/bosscoinwallet/convert", HttpMethod.Post)
    }
    ,
    n.prototype.consumeReward = function(n) {
        CacheHandler.getInstance().removeKey(CacheKey[CacheKey.BossCoinWallet]);
        var i = {
            rewardId: n
        }
          , t = RequestItemFactory.getInstance().createRequestItemSingle("user/bosscoinwallet/consumereward", HttpMethod.Post, i);
        return t.requestQuery.is503Valid = !1,
        t
    }
    ,
    n
}(), AchievementsService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t) {
        t === void 0 && (t = null);
        var i = t ? "_" + t : "";
        return n ? CacheKey[CacheKey.Achievements] + i : null
    }
    ,
    n.prototype.getByIdentity = function(n) {
        n === void 0 && (n = !1);
        var i = (new breeze.EntityQuery).from("/user/achievementprogresses")
          , t = RequestItemFactory.getInstance().createRequestItem(i, this.getCacheKey(n), !0);
        return t.requestQuery.is503Valid = !0,
        t
    }
    ,
    n.prototype.getByUserId = function(n, t) {
        t === void 0 && (t = !1);
        var r = (new breeze.EntityQuery).from("/users/" + n + "/achievementprogresses")
          , i = RequestItemFactory.getInstance().createRequestItem(r, this.getCacheKey(t, n), !0);
        return i.requestQuery.is503Valid = !0,
        i
    }
    ,
    n.prototype.claim = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/achievementprogresses/" + n, HttpMethod.Put)
    }
    ,
    n
}(), ReleaseService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n) {
        return n ? CacheKey[CacheKey.Release] : null
    }
    ,
    n.prototype.getWebApiInfo = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("/release/info");
        return RequestItemFactory.getInstance().createRequestItemSingleForVersion("", t, this.getCacheKey(n))
    }
    ,
    n
}(), AuthService = function() {
    function n(n) {
        this._inviteHandlerService = n
    }
    return n.prototype.login = function(n, t, i, r) {
        var f = this
          , u = Q.defer();
        return WebApi.getInstance().requestToken(n, t, i).then(function() {
            CacheHandler.getInstance().clear();
            f.handleLogin(u, r)
        }).fail(function(n) {
            u.reject(n)
        }).done(),
        u.promise
    }
    ,
    n.prototype.loginExternal = function(n, t, i) {
        var u = this
          , r = Q.defer();
        return WebApi.getInstance().requestExternalToken(n, t).then(function() {
            u.handleLogin(r, i)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            r.reject(n)
        }).done(),
        r.promise
    }
    ,
    n.prototype.handleLogin = function(n, t) {
        var r = this
          , i = []
          , u = t.loadLoginData();
        u.then(function(t) {
            var e;
            t.teamSlotsPartial().getItems().forEach(function(n) {
                var t = n.manager;
                t && i.push(t)
            });
            var u = t.teamSlotsPartial().getItems()[0]
              , f = i.length === 1 && u && !u.isOccupiedForCrewBattle() && !u.isOccupiedForWinnersLeague() && !u.isOccupiedForFantasyQueue() && !u.isUnavailable
              , o = u.teamPartial() && u.teamPartial().leaguePartial() && u.teamPartial().leaguePartial().leagueTypePartial() ? u.leaguePartial().getLeagueTheme() : LeagueTheme.None
              , s = appViewModel.appTheme()
              , h = u.teamPartial() && u.teamPartial().leaguePartial() ? u.teamPartial().leaguePartial().mode : LeagueMode.Normal;
            SessionManager.modifyOrCreateSession(t.id, t.login, f && u.leaguePartial() ? u.leaguePartial().id : 0, f && u.teamPartial() ? u.teamPartial().id : 0, 0, i.length > 1, f && u.leaguePartial() && u.leaguePartial().leagueTypePartial() ? u.leaguePartial().leagueTypePartial().id : 0, f && u.leaguePartial() && u.leaguePartial().leagueTypePartial() ? u.leaguePartial().leagueTypePartial().name : "", f && u.teamPartial() ? u.teamPartial().name : "", o, s, h, f && u.isOccupiedForFantasyLeague());
            $.cookie(CookieHelper.CookieKeys.hasLoggedInBefore, !0, {
                expires: 365,
                path: "/",
                domain: appViewModel.getDomain()
            });
            e = BranchHelper.loadLinkData();
            e ? r._inviteHandlerService.handleBranchInvite(e).fin(function() {
                n.resolve(i)
            }) : n.resolve(i)
        }).done()
    }
    ,
    n.prototype.logout = function() {
        this.removeSessionData()
    }
    ,
    n.prototype.removeSessionData = function() {
        WebApi.getInstance().removeTokens();
        Helper.removeCookie("session");
        Helper.removeCookie("tutorialStep");
        Helper.removeCookie(CookieHelper.CookieKeys.unconfirmedActivationEmail);
        $.removeCookie(CookieHelper.CookieKeys.hasSeenTodoHighlightModal, {
            path: "/",
            domain: appViewModel.getDomain()
        });
        CacheHandler.getInstance().clear()
    }
    ,
    n.prototype.removePrivacyNoticeCookieData = function() {
        $.removeCookie(CookieHelper.CookieKeys.isPrivacyNoticeAccepted, {
            path: "/",
            domain: appViewModel.getDomain()
        });
        $.removeCookie(CookieHelper.CookieKeys.shouldUpdateGdprDataStorageSetting, {
            path: "/",
            domain: appViewModel.getDomain()
        });
        $.removeCookie(CookieHelper.CookieKeys.isFromGdprOptInCountry, {
            path: "/",
            domain: appViewModel.getDomain()
        });
        $.removeCookie(CookieHelper.CookieKeys.personalizedAdsSettingLastAskedTimestamp, {
            path: "/",
            domain: appViewModel.getDomain()
        });
        $.removeCookie(CookieHelper.CookieKeys.personalizedAdsAskAmount, {
            path: "/",
            domain: appViewModel.getDomain()
        })
    }
    ,
    n
}(), CookieService = function() {
    function n() {}
    return n.prototype.ensureCookiesEnabled = function() {
        var n = Q.defer(), t = !1, i, r;
        try {
            document.cookie = "cookietest=1; secure; samesite=none";
            t = document.cookie.indexOf("cookietest=") !== -1;
            document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT; secure; samesite=none"
        } catch (u) {
            t = !1
        }
        return t ? n.resolve(null) : (i = $("#viewdata").data("nocookiestitle"),
        r = $("#viewdata").data("nocookiestext"),
        new AlertModal(i,r).show().then(function() {
            var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Cookies are disabled");
            n.reject(t)
        }).done()),
        n.promise
    }
    ,
    n
}(), FacebookService = function() {
    function n() {
        this._facebookPermissionsScope = "email";
        this._facebookUserFields = "name,first_name,locale,email,third_party_id"
    }
    return n.prototype.loadScript = function(n, t, i) {
        var u = n.getElementsByTagName(t)[0], r;
        n.getElementById(i) || (r = n.createElement(t),
        r.id = i,
        r.src = "//connect.facebook.net/en_US/sdk.js",
        u.parentNode.insertBefore(r, u))
    }
    ,
    n.prototype.init = function(n) {
        FB.Event.subscribe("auth.statusChange", function(n) {
            n && n.status !== "unknown" && appViewModel.facebookPartial().handleStatusChange(n)
        });
        FB.init(n)
    }
    ,
    n.prototype.share = function(n, t, i, r) {
        var u = Q.defer();
        return FB.ui({
            method: "feed",
            link: Urls.facebookShareLink,
            picture: n,
            name: t,
            caption: i,
            description: r
        }, function(n) {
            if (n && !n.error)
                u.resolve(!0);
            else {
                var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError(n && n.error ? n.error : "FB share cancelled");
                u.reject(t)
            }
        }),
        u.promise
    }
    ,
    n.prototype.login = function(n) {
        n === void 0 && (n = "");
        var i = n ? {
            scope: n,
            auth_type: "rerequest"
        } : {
            scope: this._facebookPermissionsScope
        }
          , t = Q.defer();
        return FB.login(function(n) {
            if (n.status === "connected")
                t.resolve(n);
            else {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("login with facebook sdk failed");
                t.reject(i)
            }
        }, i),
        t.promise
    }
    ,
    n.prototype.loginOrRedirectToFacebook = function() {
        this.login().fail(function(n) {
            appViewModel.isFacebookCanvas() && n.status !== "unknown" && (window.top.location.href = Urls.facebookHomeExternal)
        }).done()
    }
    ,
    n.prototype.logout = function() {
        var n = Q.defer();
        return FB.logout(function(t) {
            n.resolve(t)
        }),
        n.promise
    }
    ,
    n.prototype.ensurePermission = function(n) {
        var t = Q.defer();
        return this.login(n).then(function() {
            FB.api("/me/permissions/" + n, function(n) {
                if (n && n.data && n.data.length > 0 && n.data[0].status === "granted")
                    t.resolve(null);
                else {
                    var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("No permissions");
                    t.reject(i)
                }
            })
        }).fail(function(n) {
            var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError(n);
            t.reject(i)
        }).done(),
        t.promise
    }
    ,
    n.prototype.getFacebookUserInfo = function() {
        var n = Q.defer();
        return FB.api("/me?fields=" + this._facebookUserFields, function(t) {
            t.error ? n.reject(t.error) : n.resolve(t)
        }),
        n.promise
    }
    ,
    n.prototype.getAccessToken = function() {
        var n = Q.defer();
        return this.getLoginStatus().then(function(t) {
            if (t && t.authResponse && t.authResponse.accessToken)
                n.resolve(t.authResponse.accessToken);
            else {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("No access token");
                n.reject(i)
            }
        }).fail(function(t) {
            n.reject(t)
        }),
        n.promise
    }
    ,
    n.prototype.getLoginStatus = function() {
        var n = Q.defer();
        return FB.getLoginStatus(function(t) {
            t.authResponse ? n.resolve(t) : n.reject(t)
        }),
        n.promise
    }
    ,
    n.prototype.showFacebookPaymentModal = function(n) {
        var t = Q.defer();
        return FB.ui(n, function(n) {
            var i, r;
            if (!n.request_id) {
                i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("invalid facebook payment data");
                t.reject(i);
                return
            }
            if (n.status === "completed") {
                t.resolve();
                return
            }
            r = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Facebook payment failed.");
            t.reject(r)
        }),
        t.promise
    }
    ,
    n
}(), RedirectionService = function() {
    function n(n, t, i, r) {
        this._careerCentreSurfaceCookieHelper = new CareerCentreSurfaceCookieHelper;
        this._usersService = t;
        this._invitesService = n;
        this._bossCoinsService = i;
        this._surfacingStatesService = r
    }
    return n.prototype.redirect = function(n) {
        var o = this, t, i, u, f, e, r, s;
        if (!appViewModel || !appViewModel.isRedirecting()) {
            SessionManager.getInstance().session || (n = RedirectionFlow.NotLoggedIn);
            t = new WebApiBatch;
            i = this._invitesService.getByIdentity(!0);
            t.add(i).done();
            switch (n) {
            case RedirectionFlow.NotLoggedIn:
                this.doNotLoggedInRedirection();
                return;
            case RedirectionFlow.ServerDown:
                CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserWithTeamSlots]);
                SessionManager.getInstance().resetLeagueAndTeam(!0);
                window.location.href.indexOf(Urls.career) === -1 && (appViewModel.isRedirecting(!0),
                window.location.href = Urls.career);
                return;
            case RedirectionFlow.AccountState:
                u = this._usersService.getAccountByIdentity(!0);
                t.add(u).done();
                f = this._bossCoinsService.getByIdentity();
                t.add(f).done();
                e = this._surfacingStatesService.getByIdentity();
                t.add(e).done();
                Q.all([u.deferred.promise, i.deferred.promise, f.deferred.promise, e.deferred.promise]).spread(function(n, t, i, r) {
                    o.doLoginRedirection(new UserPartial(n), new InvitesPartial(t), SessionManager.getInstance().session.leagueId, SessionManager.getInstance().session.teamId, i, r)
                }).fail(function(n) {
                    ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
                }).done();
                break;
            case RedirectionFlow.AccountSelect:
                Q.all([i.deferred.promise]).spread(function(n) {
                    o.doAccountSelectRedirection(SessionManager.getInstance().session.leagueId, SessionManager.getInstance().session.teamId, new InvitesPartial(n))
                }).fail(function(n) {
                    ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
                }).done();
                break;
            case RedirectionFlow.FantasyLeagueTeamSelect:
                this.doAccountSelectRedirection(SessionManager.getInstance().session.leagueId, SessionManager.getInstance().session.teamId, null, !0);
                break;
            case RedirectionFlow.FantasyLeagueTeamSubmit:
            case RedirectionFlow.PrizePoolTeamSubmit:
                CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserWithTeamSlots]);
                WebApiConfig.getInstance().removeAccessToken();
                SessionManager.getInstance().resetLeagueAndTeam();
                window.location.href = Urls.career;
                break;
            case RedirectionFlow.CreateCrewLeague:
                window.location.href = Urls.createLeagueChooseLeague;
                break;
            case RedirectionFlow.Reset:
                if (!appViewModel)
                    return;
                CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserWithTeamSlots]);
                WebApiConfig.getInstance().removeAccessToken();
                r = Urls.dashboard;
                (SessionManager.hasMultipleSlots() || !appViewModel.userPartial().teamSlotsPartial().isManagingAnyTeam()) && (SessionManager.getInstance().resetLeagueAndTeam(),
                r = Urls.career);
                window.location.href.indexOf(r) === -1 ? window.location.href = r : (appViewModel.isRedirecting(!0),
                s = new AlertErrorRefreshModal,
                s.show())
            }
            t.execute()
        }
    }
    ,
    n.prototype.doNotLoggedInRedirection = function() {
        window.location.href = appViewModel.isFacebookCanvas() ? Urls.facebookCanvasLandingPage : Urls.root
    }
    ,
    n.prototype.doAccountSelectRedirection = function(n, t, i, r) {
        if (r === void 0 && (r = !1),
        r) {
            window.location.href = Urls.fantasyLeague;
            return
        }
        if (n > 0 && t > 0) {
            if (appViewModel.lastMatchPartial() && this.shouldOpenMatchExperience(n, appViewModel.lastMatchPartial().matchId, appViewModel.lastMatchPartial().weekNr)) {
                window.location.href = Urls.matchExperience;
                return
            }
            window.location.href = Urls.dashboard;
            return
        }
        var u = this.getRedirectionUrlByInvites(BranchHelper.loadLinkData(), i);
        if (u) {
            window.location.href = u;
            return
        }
        window.location.href = Urls.chooseLeague
    }
    ,
    n.prototype.shouldOpenMatchExperience = function(t, i, r) {
        return appViewModel.lastMatchPartial() ? !$.cookie(n.getMatchExperienceCookieName(t, i, r)) : !1
    }
    ,
    n.getMatchExperienceCookieName = function(n, t, i) {
        return CookieHelper.CookieKeys.matchExperienceShownForLeagueAndWeekNrAndMatchId + "_leagueId" + n + "_matchId" + t + "_weekNr" + i
    }
    ,
    n.getKnockoutProgressionCookieName = function(n, t, i) {
        return CookieHelper.CookieKeys.knockoutProgressionShownForLeagueIdAndTeamIdAndWeekNr + "_leagueId" + n + "_teamId" + t + "_weekNr" + i
    }
    ,
    n.prototype.doLoginRedirection = function(n, t, i, r, u, f) {
        if (!n || !SessionManager.getInstance().session || !SessionManager.getInstance().session.login || SessionManager.getInstance().session.userId === 0) {
            this.doNotLoggedInRedirection();
            return
        }
        if (!u) {
            SessionManager.getInstance().modifySession(function(n) {
                return n.hasBossCoinWallet = !1
            });
            window.location.replace(Urls.conversion);
            return
        }
        if (Enumerable.from(f).any(function(n) {
            return n.type === SurfacingType.Career && n.surfacedTimestamp > 0
        }) || Enumerable.from(n.teamSlotsPartial().getItems()).count(function(n) {
            return n.teamPartial() && n.teamPartial().id > 0
        }) > 1 || n.isLegacyUser()) {
            window.location.replace(Urls.career);
            return
        }
        if (i > 0 && r > 0) {
            window.location.replace(Urls.dashboard);
            return
        }
        var e = this.getRedirectionUrlByInvites(BranchHelper.loadLinkData(), t);
        if (e) {
            window.location.replace(e);
            return
        }
        window.location.replace(Urls.chooseLeague)
    }
    ,
    n.prototype.getRedirectionUrlByInvites = function(n, t) {
        var i = n ? !0 : !1
          , r = t && t.getItems().length > 0;
        return !r && !i ? null : !r && i ? n.leagueId > 0 ? Helper.replaceText(Urls.chooseTeamForLeague, [{
            key: "leagueId",
            value: n.leagueId.toString()
        }]) : Urls.chooseLeague : Urls.chooseLeague
    }
    ,
    n
}(), LanguageService = function() {
    function n() {}
    return n.prototype.getCurrent = function() {
        var n = (new breeze.EntityQuery).from("/language");
        return RequestItemFactory.getInstance().createRequestItemSingle(n, CacheKey[CacheKey.Language])
    }
    ,
    n.prototype.getAll = function() {
        var n = (new breeze.EntityQuery).from("/languages");
        return RequestItemFactory.getInstance().createRequestItem(n, CacheKey[CacheKey.Languages])
    }
    ,
    n
}(), InviteHandlerService = function() {
    function n(n, t, i) {
        this._usersService = n;
        this._rewardsService = t;
        this._leaguesService = i
    }
    return n.prototype.handleBranchInvite = function(n) {
        var i = this
          , t = new WebApiBatch;
        return n.worldNr !== appViewModel.sessionSettings.worldNr ? (BranchHelper.removeLinkData(),
        Q.resolve(!0)) : (n.userId > 0 && WebApi.getInstance().execute(this._usersService.addFriendBranch(n.userId)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        t.add(this._usersService.getAccountByIdentity(!0)).then(function(t) {
            var r = new UserPartial(t);
            n.userId > 0 && r.isNewUser && WebApi.getInstance().execute(i._rewardsService.postBranch(n.userId)).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done();
            n.leagueId > 0 && r.teamSlotsPartial() && r.teamSlotsPartial().hasTeamInLeague(n.leagueId) && BranchHelper.removeLinkData()
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        t.add(this._leaguesService.getByLeagueId(n.leagueId, !1)).fail(function() {
            BranchHelper.removeLinkData()
        }).done(),
        t.execute())
    }
    ,
    n
}(), InvitesService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n) {
        return n ? CacheKey[CacheKey.Invites] : null
    }
    ,
    n.prototype.getByIdentity = function(n) {
        n === void 0 && (n = !1);
        var i = (new breeze.EntityQuery).from("user/invites")
          , t = RequestItemFactory.getInstance().createRequestItem(i, this.getCacheKey(n), !0);
        return t.deferred.promise.then(function(n) {
            SessionManager.getInstance().modifySession(function(t) {
                t.hasInvites = n && n.length > 0
            })
        }),
        t.cacheDurationInMinutes = 5,
        t
    }
    ,
    n.prototype.getSentByIdentity = function() {
        var n = (new breeze.EntityQuery).from("user/sentinvites");
        return RequestItemFactory.getInstance().createRequestItem(n, !0)
    }
    ,
    n.prototype.invite = function(n, t, i) {
        var r = {
            inviteeUserName: n,
            leagueId: t,
            inviteType: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("/user/invites", HttpMethod.Post, r)
    }
    ,
    n.prototype.delete = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/invites/" + n, HttpMethod.Delete)
    }
    ,
    n
}(), RewardsService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n) {
        return n ? CacheKey[CacheKey.Rewards] : null
    }
    ,
    n.prototype.getByIdentity = function(n, t, i) {
        n === void 0 && (n = !0);
        t === void 0 && (t = !1);
        i === void 0 && (i = !0);
        var u = (new breeze.EntityQuery).from("user/rewards")
          , r = RequestItemFactory.getInstance().createRequestItem(u, this.getCacheKey(t), n);
        return i || (r.predicate = function(n) {
            return n.status !== RewardStatus.Claimed
        }
        ),
        r
    }
    ,
    n.prototype.getByIdentityFilteredByType = function(n, t, i, r) {
        t === void 0 && (t = !0);
        i === void 0 && (i = !1);
        r === void 0 && (r = !0);
        var u = this.getByIdentity(t, i, r);
        return u.predicate = function(t) {
            return t.type === n
        }
        ,
        u
    }
    ,
    n.prototype.getSingleByIdentity = function(n, t, i) {
        n === void 0 && (n = !0);
        t === void 0 && (t = !1);
        i === void 0 && (i = !0);
        var u = (new breeze.EntityQuery).from("user/rewards")
          , r = RequestItemFactory.getInstance().createRequestItemSingle(u, this.getCacheKey(t), n);
        return i || (r.predicate = function(n) {
            return n.status !== RewardStatus.Claimed
        }
        ),
        r
    }
    ,
    n.prototype.getSingleByIdentityFilteredByType = function(n, t, i, r) {
        t === void 0 && (t = !0);
        i === void 0 && (i = !1);
        r === void 0 && (r = !0);
        var u = this.getSingleByIdentity(t, i, r);
        return u.predicate = function(t) {
            return !r && t.status !== RewardStatus.Claimed && t.type === n
        }
        ,
        u
    }
    ,
    n.prototype.postBranch = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("reward/branch", HttpMethod.Post, {
            inviterUserId: n
        })
    }
    ,
    n.prototype.postTutorial = function(n) {
        var t = {
            type: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("reward/tutorial", HttpMethod.Post, t)
    }
    ,
    n.prototype.claim = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/rewards/" + n + "/claim", HttpMethod.Put)
    }
    ,
    n
}(), AdsService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t, i) {
        t === void 0 && (t = "en-GB");
        i === void 0 && (i = null);
        var r = i ? "_" + i : "";
        return n ? CacheKey[CacheKey.Ads] + "_" + t + r : null
    }
    ,
    n.prototype.getByIdentity = function(n, t, i) {
        t === void 0 && (t = "en-GB");
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/user/ads");
        return RequestItemFactory.getInstance().createRequestItem(r, this.getCacheKey(i, t, n), !0)
    }
    ,
    n.prototype.getAnonymous = function(n, t) {
        n === void 0 && (n = "en-GB");
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/ads");
        return RequestItemFactory.getInstance().createRequestItem(i, this.getCacheKey(t, n), !0)
    }
    ,
    n
}(), AccountService = function() {
    function n() {}
    return n.prototype.register = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("Register", HttpMethod.Post, {
            userName: n,
            password: t
        })
    }
    ,
    n.prototype.registerMobile = function(n, t, i) {
        var r = {
            clientId: t,
            clientSecret: i,
            userName: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("registermobile", HttpMethod.Post, r)
    }
    ,
    n.prototype.validateLogin = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("validatelogin", HttpMethod.Post, {
            login: n
        })
    }
    ,
    n.prototype.addExternal = function(n, t, i, r) {
        var u = {
            provider: ExternalType[r].toLowerCase(),
            externalAccessToken: n,
            clientId: t,
            clientSecret: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("AddExternal/" + ExternalType[r], HttpMethod.Post, u)
    }
    ,
    n.prototype.forgotPassword = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("forgotpassword", HttpMethod.Post, {
            identifier: n
        })
    }
    ,
    n.prototype.resetPassword = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("resetpassword", HttpMethod.Post, {
            login: n,
            hash: t
        })
    }
    ,
    n.prototype.sendActivationMail = function(n) {
        var t = {
            email: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("SendActivationMail", HttpMethod.Post, t)
    }
    ,
    n.prototype.activateAccount = function(n, t) {
        var i = {
            email: n,
            activationCode: t
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("ActivateAccount", HttpMethod.Post, i)
    }
    ,
    n.prototype.fetchUserByAccessToken = function(n) {
        var t = (new breeze.EntityQuery).from("/users/external?accessToken=" + encodeURIComponent(n));
        return RequestItemFactory.getInstance().createRequestItemSingle(t, !0)
    }
    ,
    n.prototype.unsubscribe = function(n) {
        var t = {
            email: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/unsubscribe", HttpMethod.Put, t)
    }
    ,
    n
}(), TextsService = function() {
    function n() {}
    return n.prototype.getByCategory = function(n) {
        var t = (new breeze.EntityQuery).from("/texts/web/" + n);
        return RequestItemFactory.getInstance().createRequestItem(t, CacheKey[CacheKey.Texts] + "_" + n)
    }
    ,
    n
}(), LeagueTypesService = function() {
    function n() {}
    return n.prototype.getById = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagueTypes/" + n)
          , r = t ? CacheKey[CacheKey.LeagueTypes] + "_" + n : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(i, r)
    }
    ,
    n.prototype.getByName = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagueTypes/name/" + n)
          , r = t ? CacheKey[CacheKey.LeagueTypes] + "_" + n : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(i, r)
    }
    ,
    n.prototype.getByIdWithStats = function(n, t, i) {
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/leagueTypes/stats/" + n + "/" + t)
          , u = i ? CacheKey[CacheKey.LeagueTypes] + "_" + n + "_" + t : null;
        return RequestItemFactory.getInstance().createRequestItemSingle(r, u)
    }
    ,
    n.prototype.getAll = function(n) {
        var t = (new breeze.EntityQuery).from("/leagueTypes/stats")
          , i = n ? CacheKey[CacheKey.LeagueTypes] : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i)
    }
    ,
    n.prototype.getAllFromServer = function(n) {
        var t = (new breeze.EntityQuery).from("/leagueTypes/stats/" + n);
        return RequestItemFactory.getInstance().createRequestItem(t)
    }
    ,
    n.prototype.getActive = function(n) {
        var t = (new breeze.EntityQuery).from("/leagueTypes")
          , i = n ? CacheKey[CacheKey.LeagueTypes] + "_active" : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i)
    }
    ,
    n.prototype.getFavourites = function(n) {
        var t = (new breeze.EntityQuery).from("/leagueTypes/favourites/" + n);
        return RequestItemFactory.getInstance().createRequestItem(t)
    }
    ,
    n.prototype.filter = function(n) {
        var t = (new breeze.EntityQuery).from("/leagueTypes/filter?query=" + encodeURIComponent(n));
        return RequestItemFactory.getInstance().createRequestItem(t, !0)
    }
    ,
    n
}(), FoulsService = function() {
    function n() {}
    return n.prototype.getAll = function() {
        var n = (new breeze.EntityQuery).from("/fouls");
        return RequestItemFactory.getInstance().createRequestItem(n, CacheKey[CacheKey.Fouls])
    }
    ,
    n
}(), InjuriesService = function() {
    function n() {}
    return n.prototype.getAll = function() {
        var n = (new breeze.EntityQuery).from("/injuries");
        return RequestItemFactory.getInstance().createRequestItem(n, CacheKey[CacheKey.Injuries])
    }
    ,
    n
}(), GameSettingsService = function() {
    function n() {}
    return n.prototype.getGameSettings = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("gamesettings")
          , i = n ? CacheKey[CacheKey.GameSettings] : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i)
    }
    ,
    n.prototype.getAll = function(n) {
        n === void 0 && (n = !1);
        var t = this.getGameSettings(n);
        return t.predicateAll = LeanplumHelper.getInstance().filterGameSettingsWithVariables,
        t.orderBy = function(n) {
            return n.name
        }
        ,
        t
    }
    ,
    n.prototype.getAllByCategory = function(n, t) {
        t === void 0 && (t = !1);
        var i = this.getAll(t);
        return i.predicate = function(t) {
            return t.category === n
        }
        ,
        i
    }
    ,
    n
}(), BossCoinProductsService = function() {
    function n() {}
    return n.prototype.getBossCoinProducts = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("bosscoinproducts")
          , i = n ? CacheKey[CacheKey.BossCoinProducts] : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i)
    }
    ,
    n.prototype.getAll = function(n) {
        n === void 0 && (n = !1);
        var t = this.getBossCoinProducts(n);
        return t.predicateAll = LeanplumHelper.getInstance().filterGameSettingsWithVariables,
        t.orderBy = function(n) {
            return n.increment
        }
        ,
        t
    }
    ,
    n
}(), TeamsService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t) {
        return n ? CacheKey[CacheKey.Teams] + "_" + t : null
    }
    ,
    n.prototype.getByLeague = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagues/" + n + "/teams");
        return RequestItemFactory.getInstance().createRequestItem(i, this.getCacheKey(t, n))
    }
    ,
    n.prototype.getByLeagueFilteredByTeamId = function(n, t, i) {
        i === void 0 && (i = !1);
        var u = (new breeze.EntityQuery).from("/leagues/" + n + "/teams")
          , r = RequestItemFactory.getInstance().createRequestItemSingle(u, this.getCacheKey(i, n));
        return r.predicate = function(n) {
            return n.id === t
        }
        ,
        r
    }
    ,
    n.prototype.getTeamsStatistics = function(n) {
        var t = (new breeze.EntityQuery).from("/leagues/" + n + "/teams/statistics");
        return RequestItemFactory.getInstance().createRequestItem(t, !1)
    }
    ,
    n.prototype.getAvailable = function(n) {
        var t = (new breeze.EntityQuery).from("leaguetypes/" + n + "/availableteams");
        return RequestItemFactory.getInstance().createRequestItem(t, !0)
    }
    ,
    n.prototype.getAvailableBaseTeams = function(n) {
        var t = (new breeze.EntityQuery).from("leaguetypes/" + n + "/teams");
        return RequestItemFactory.getInstance().createRequestItem(t, !0)
    }
    ,
    n.prototype.signContractForSlot = function(n, t, i) {
        var r = "leagues/" + n + "/teams/" + t + "/signcontract/" + i;
        return RequestItemFactory.getInstance().createRequestItemSingle(r, HttpMethod.Put)
    }
    ,
    n.prototype.signContractForFantasyLeague = function(n, t, i) {
        var r = "fantasyleagues/" + n + "/signcontract"
          , u = {
            name: t,
            slotIndex: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle(r, HttpMethod.Put, u)
    }
    ,
    n.prototype.signContractForPrizePool = function(n, t, i, r) {
        var u = "leaguetypes/" + n + "/prizepool/signcontract"
          , f = {
            leagueTypeId: n,
            slotIndex: r,
            productId: i,
            teamName: t
        };
        return RequestItemFactory.getInstance().createRequestItemSingle(u, HttpMethod.Post, f)
    }
    ,
    n.prototype.signContractForSpecificFantasyLeague = function(n, t, i) {
        var r = "fantasyleagues/" + n + "/join"
          , u = {
            name: t,
            slotIndex: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle(r, HttpMethod.Put, u)
    }
    ,
    n.prototype.signContractForVipLeague = function(n, t, i, r) {
        var u = "leagues/" + n + "/teams/" + t + "/signcontract/" + i + "/consumereward"
          , f = {
            rewardId: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle(u, HttpMethod.Put, f)
    }
    ,
    n
}(), ManagersService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t, i, r) {
        return (i === void 0 && (i = !0),
        r === void 0 && (r = !0),
        !r) ? null : t ? CacheKey[CacheKey.Managers] + "_" + n.toString() + "_" + t.toString() : i ? CacheKey[CacheKey.Managers] + "_" + n.toString() : CacheKey[CacheKey.ManagersFetchedWithoutPoints] + "_" + n.toString()
    }
    ,
    n.prototype.getByLeagueWithPoints = function(n, t, i) {
        t === void 0 && (t = !1);
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/leagues/" + n + "/managers");
        return RequestItemFactory.getInstance().createRequestItem(r, this.getCacheKey(n, null, !0, t), i)
    }
    ,
    n.prototype.getByLeagueWithoutPoints = function(n, t, i) {
        t === void 0 && (t = !1);
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/leagues/" + n + "/managerswithoutpoints");
        return RequestItemFactory.getInstance().createRequestItem(r, this.getCacheKey(n, null, !1, t), i)
    }
    ,
    n.prototype.getByLeagueAndTeamId = function(n, t, i, r) {
        i === void 0 && (i = !1);
        r === void 0 && (r = !1);
        var f = (new breeze.EntityQuery).from("/leagues/" + n + "/managers")
          , u = RequestItemFactory.getInstance().createRequestItemSingle(f, this.getCacheKey(n, t, !1, i), r);
        return u.predicate = function(n) {
            return n.teamId === t
        }
        ,
        u
    }
    ,
    n.prototype.getAllByIdentity = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("/managers/account");
        return RequestItemFactory.getInstance().createRequestItem(t, CacheKey[CacheKey.UserManagers])
    }
    ,
    n.prototype.kickManager = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/managers/" + t + "/sack", HttpMethod.Post)
    }
    ,
    n.prototype.clearCache = function(n, t) {
        CacheHandler.getInstance().removeKey(this.getCacheKey(n, null, !1, !0));
        CacheHandler.getInstance().removeKey(this.getCacheKey(n, null, !0, !0));
        CacheHandler.getInstance().removeKey(this.getCacheKey(n, t, !1, !0))
    }
    ,
    n
}(), MatchesService = function() {
    function n() {}
    return n.prototype.getCacheKeyForWeek = function(n, t, i) {
        return n ? CacheKey[CacheKey.MatchesByWeek] + "_" + t + "_" + i : null
    }
    ,
    n.prototype.getCacheKeyForTeam = function(n, t, i) {
        return n ? CacheKey[CacheKey.Matches] + "_" + t + "_" + i : null
    }
    ,
    n.prototype.getAllLeagueAndCup = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?type=" + MatchType.League + "&type=" + MatchType.Cup)
          , r = t ? CacheKey[CacheKey.Matches] + "_" + n.toString() : null;
        return RequestItemFactory.getInstance().createRequestItem(i, r)
    }
    ,
    n.prototype.getByWeekLeagueAndCup = function(n, t, i, r) {
        i === void 0 && (i = !1);
        r === void 0 && (r = !0);
        var u = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?weekNr=" + t + "&type=" + MatchType.League + "&type=" + MatchType.Cup);
        return RequestItemFactory.getInstance().createRequestItem(u, this.getCacheKeyForWeek(i, n, t), r)
    }
    ,
    n.prototype.getByTeamLeagueAndCup = function(n, t, i) {
        i === void 0 && (i = !1);
        var u = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?teamId=" + t + "&type=" + MatchType.League + "&type=" + MatchType.Cup)
          , r = RequestItemFactory.getInstance().createRequestItem(u, this.getCacheKeyForTeam(i, n, t));
        return r.orderBy = function(n) {
            return n.weekNr
        }
        ,
        r
    }
    ,
    n.prototype.getFriendliesByTeamFilteredByWeek = function(n, t, i, r, u) {
        u === void 0 && (u = !1);
        var e = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?teamId=" + t + "&weekNr=" + i + "&type=" + MatchType.Friendly)
          , o = u ? CacheKey[CacheKey.Friendlies] + "_" + n + "_" + t + "_" + i : null
          , f = RequestItemFactory.getInstance().createRequestItem(e, o, r);
        return f.orderBy = function(n) {
            return n.weekNr
        }
        ,
        f
    }
    ,
    n.prototype.getCupMatches = function(n, t) {
        t === void 0 && (t = !1);
        var r = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?type=" + MatchType.Cup)
          , u = t ? CacheKey[CacheKey.CupMatches] + "_" + n : null
          , i = RequestItemFactory.getInstance().createRequestItem(r, u);
        return i.orderBy = function(n) {
            return n.weekNr
        }
        ,
        i
    }
    ,
    n.prototype.getByMatchId = function(n, t, i, r, u, f) {
        var e, o, s;
        return f === void 0 && (f = !1),
        u ? (e = (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?teamId=" + SessionManager.getTeamId() + "&weekNr=" + t + "&type=" + MatchType.Friendly),
        o = f ? CacheKey[CacheKey.CupMatches] + "_" + n : null) : (e = r ? (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?teamId=" + SessionManager.getTeamId() + "&type=" + MatchType.League + "&type=" + MatchType.Cup) : (new breeze.EntityQuery).from("/leagues/" + n + "/matches/filter?weekNr=" + t + "&type=" + MatchType.League + "&type=" + MatchType.Cup),
        o = r ? this.getCacheKeyForTeam(f, n, SessionManager.getTeamId()) : this.getCacheKeyForWeek(f, n, t)),
        s = RequestItemFactory.getInstance().createRequestItemSingle(e, o),
        s.predicate = function(n) {
            return n.matchId === i && n.weekNr === t
        }
        ,
        s
    }
    ,
    n.prototype.post = function(n, t, i, r, u) {
        var f = {
            opponentId: i,
            productId: r,
            isTutorialFriendly: u
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/matches", HttpMethod.Post, f)
    }
    ,
    n
}(), LeagueStandingsService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t) {
        return n ? CacheKey[CacheKey.LeagueStandings] + "_" + t.toString() : null
    }
    ,
    n.prototype.getAll = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagues/" + n + "/standings");
        return RequestItemFactory.getInstance().createRequestItem(i, this.getCacheKey(t, n))
    }
    ,
    n.prototype.getAllFilteredByTeamId = function(n, t, i) {
        i === void 0 && (i = !1);
        var u = (new breeze.EntityQuery).from("/leagues/" + n + "/standings")
          , r = RequestItemFactory.getInstance().createRequestItemSingle(u, this.getCacheKey(i, n));
        return r.predicate = function(n) {
            return n.teamId === t
        }
        ,
        r
    }
    ,
    n
}(), LeaguesService = function() {
    function n() {}
    return n.prototype.getLeagueCacheKey = function(n, t) {
        return n ? CacheKey[CacheKey.League] + "_" + t : null
    }
    ,
    n.prototype.getBySession = function(n) {
        n === void 0 && (n = !1);
        var t = this.getByLeagueId(SessionManager.getLeagueId(), n);
        return t.deferred.promise.fail(function(n) {
            SessionManager.getLeagueId() > 0 && n.httpStatus === HttpStatus.NotFound && (SessionManager.getInstance().resetLeagueAndTeam(),
            WebApiConfig.getInstance().removeAccessToken(),
            window.location.href = Urls.career)
        }).done(),
        t
    }
    ,
    n.prototype.getByLeagueId = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("leagues/" + n);
        return RequestItemFactory.getInstance().createRequestItemSingle(i, this.getLeagueCacheKey(t, n))
    }
    ,
    n.prototype.getByVipLeagueEventId = function(n) {
        var t = (new breeze.EntityQuery).from("vipleagueevents/" + n + "/league");
        return RequestItemFactory.getInstance().createRequestItemSingle(t, !0)
    }
    ,
    n.prototype.getAvailable = function(n) {
        var t = (new breeze.EntityQuery).from("leagueTypes/" + n + "/available");
        return RequestItemFactory.getInstance().createRequestItem(t)
    }
    ,
    n.prototype.getLeaguesPerServerByLeagueType = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/" + t);
        return RequestItemFactory.getInstance().createRequestItem(i)
    }
    ,
    n.prototype.createFirstLeague = function(n, t, i, r) {
        r === void 0 && (r = LeagueMode.Normal);
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues", HttpMethod.Post, {
            leagueTypeId: n,
            teamId: t,
            name: null,
            settings: null,
            slotIndex: i,
            productId: null,
            leagueMode: r
        })
    }
    ,
    n.prototype.createLeagueForOccupiedTeam = function(n, t, i, r, u) {
        u === void 0 && (u = LeagueMode.Normal);
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues", HttpMethod.Post, {
            leagueTypeId: n,
            teamId: t,
            name: null,
            settings: null,
            slotIndex: i,
            productId: r,
            leagueMode: u
        })
    }
    ,
    n.prototype.createLeagueWithSettings = function(n, t, i, r, u, f, e) {
        e === void 0 && (e = LeagueMode.Normal);
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues", HttpMethod.Post, {
            leagueTypeId: n,
            teamId: t,
            name: i,
            settings: r,
            slotIndex: u,
            productId: f,
            leagueMode: e
        })
    }
    ,
    n.prototype.updateName = function(n, t) {
        var i = "leagues/" + n;
        return RequestItemFactory.getInstance().createRequestItemSingle(i, HttpMethod.Put, {
            name: t
        })
    }
    ,
    n.prototype.filter = function(n) {
        var t = (new breeze.EntityQuery).from("/leagues/filter?query=" + encodeURIComponent(n));
        return RequestItemFactory.getInstance().createRequestItem(t, !0)
    }
    ,
    n.prototype.validateJoiningPhase = function(n) {
        var t = (new breeze.EntityQuery).from("leagues/" + n + "/validatejoiningphase");
        return RequestItemFactory.getInstance().createRequestItemSingle(t)
    }
    ,
    n
}(), CupRoundsService = function() {
    function n() {}
    return n.prototype.getByLeague = function(n, t) {
        t === void 0 && (t = !1);
        var i = (new breeze.EntityQuery).from("/leagues/" + n + "/cuprounds")
          , r = t ? CacheKey[CacheKey.CupRounds] + "_" + n : null;
        return RequestItemFactory.getInstance().createRequestItem(i, r, !0)
    }
    ,
    n
}(), CountdownTimerService = function() {
    function n() {}
    return n.prototype.getAll = function(n, t, i) {
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("leagues/" + n + "/teams/" + t + "/timers")
          , u = i ? CacheKey[CacheKey.CountdownTimers] : null;
        return RequestItemFactory.getInstance().createRequestItem(r, u, !0)
    }
    ,
    n
}(), TeamFinancesService = function() {
    function n() {}
    return n.prototype.getByTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/teams/" + t + "/finances");
        return RequestItemFactory.getInstance().createRequestItemSingle(i, !1)
    }
    ,
    n.prototype.getBalanceAndSavingsByTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/" + n + "/teams/" + t + "/finances/balanceandsavings");
        return RequestItemFactory.getInstance().createRequestItemSingle(i, !1)
    }
    ,
    n.prototype.buyClubFunds = function(n, t, i, r) {
        var u = {
            clubFundsToConvert: i,
            productId: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/buyclubfunds", HttpMethod.Put, u)
    }
    ,
    n.prototype.transfer = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/savings/transfer", HttpMethod.Put)
    }
    ,
    n
}(), TeamTacticService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n, t, i) {
        return n ? CacheKey[CacheKey.TeamTactic] + "_" + t + "_" + i : null
    }
    ,
    n.prototype.getTeamTacticByTeamId = function(n, t, i) {
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/leagues/" + n + "/teams/" + t + "/teamtactics");
        return RequestItemFactory.getInstance().createRequestItemSingle(r, this.getCacheKey(i, n, t))
    }
    ,
    n.prototype.saveTacticSettings = function(n, t, i, r, u, f, e, o, s, h, c, l, a, v) {
        var y = {
            attack: i,
            defense: r,
            midField: u,
            style: f,
            overallMatchTactics: e,
            marking: o,
            mentality: s,
            offSideTrap: h,
            pressing: c,
            tempo: l,
            formation: a,
            formationDetail: v
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/teamtactics", HttpMethod.Put, y)
    }
    ,
    n
}(), NewspaperArticlesService = function() {
    function n() {}
    return n.prototype.getByWeekNr = function(n, t, i) {
        i === void 0 && (i = !1);
        var r = (new breeze.EntityQuery).from("/leagues/" + n + "/newspaperarticles/" + t)
          , u = i ? CacheKey[CacheKey.NewsPaperArticles] + "_" + n + "_" + t : null;
        return RequestItemFactory.getInstance().createRequestItem(r, u, !0)
    }
    ,
    n
}(), BranchHelper = function() {
    function n() {}
    return n.setupLinkData = function(t, i, r) {
        if (!t && !i)
            return null;
        var u = {};
        return t && (u.userId = t),
        i && (u.leagueId = i),
        r != undefined && r != null && (u.worldNr = r),
        this.saveLinkData(n.parseLinkData(JSON.stringify(u)))
    }
    ,
    n.saveLinkData = function(n) {
        var i = JSON.stringify(n), t;
        if ($.cookie("branchSession", i, {
            path: "/"
        }),
        t = this.loadLinkData(),
        !t)
            throw new Error("Invalid branch linkData loaded from cookie.");
        return t
    }
    ,
    n.loadLinkData = function() {
        var t = $.cookie("branchSession");
        if (!t)
            return null;
        try {
            return n.parseLinkData(t)
        } catch (i) {
            return null
        }
    }
    ,
    n.removeLinkData = function() {
        $.removeCookie("branchSession", {
            path: "/"
        })
    }
    ,
    n.parseLinkData = function(n) {
        var t = JSON.parse(n)
          , i = {
            leagueId: 0,
            userId: 0,
            worldNr: WorldNr.OFM
        };
        return t.hasOwnProperty("leagueId") && (i.leagueId = Number(t.leagueId)),
        t.hasOwnProperty("userId") && (i.userId = Number(t.userId)),
        t.hasOwnProperty("worldNr") && (i.worldNr = Number(t.worldNr)),
        i
    }
    ,
    n
}(), CarouselPartial = function() {
    function n() {
        var n = this;
        this.sliderValue = ko.observable();
        this.actualValue = ko.observable();
        this.isInSavingState = ko.observable(!1);
        this.valueToBeSaved = ko.computed(function() {
            return n.sliderValue() !== undefined && n.sliderValue() !== n.actualValue() ? n.sliderValue() : n.actualValue()
        }).extend({
            throttle: 1e3
        });
        this.isChanged = ko.computed(function() {
            return n.sliderValue() !== undefined && n.valueToBeSaved() !== undefined && n.valueToBeSaved() !== n.actualValue() ? (n.isInSavingState(!0),
            !0) : !1
        });
        this.hideSuccessIcon = ko.computed(function() {
            !n.isChanged() && n.isInSavingState() && (n.hideSuccessIconTimeout && (clearTimeout(n.hideSuccessIconTimeout),
            n.hideSuccessIconTimeout = null),
            n.hideSuccessIconTimeout = window.setTimeout(function() {
                n.hideSuccessIconTimeout = null;
                n.isInSavingState(!1)
            }, 4e3))
        })
    }
    return n.prototype.init = function(n) {
        this.actualValue(n);
        this.sliderValue(n)
    }
    ,
    n
}(), PartialArrayViewModel = function() {
    function n() {
        var n = this;
        this._items = ko.observableArray([]);
        this._isLoading = ko.observable(!0);
        this._sorting = ko.observable({});
        this._filters = ko.observableArray();
        this._hasOrderedIndex = ko.observable(!0);
        this.sortingEnabled = ko.observable(!1);
        this.filteringEnabled = ko.observable(!1);
        this._sortItems = ko.computed(function() {
            if (n.sortingEnabled() && n._items()) {
                var t = n.getOrderedArray(n._sorting().keySelector, n._sorting().sortOrder === SortOrder.Ascending, n._sorting().thenByKeySelectors);
                n.haveItemsBeenSorted || (n.haveItemsBeenSorted = !0);
                n._items(t)
            }
        }).extend({
            rateLimit: {
                timeout: 100,
                method: "notifyAtFixedRate"
            }
        });
        this.getItems = ko.computed(function() {
            return n._items()
        });
        this.count = ko.computed(function() {
            return n._isLoading() ? 0 : n._items().length
        })
    }
    return n.prototype.getFilteredItems = function() {
        if (!this._isLoading()) {
            var n = Enumerable.from(this.getItems());
            return this._filters().forEach(function(t) {
                n = n.where(t.keySelector)
            }),
            n.toArray()
        }
    }
    ,
    n.prototype.setItems = function(n) {
        this._items(n);
        this._isLoading(!1)
    }
    ,
    n.prototype.clearItems = function() {
        this._items([])
    }
    ,
    n.prototype.sortItems = function(n, t, i, r) {
        t === void 0 && (t = null);
        i === void 0 && (i = null);
        r === void 0 && (r = !1);
        i == null && this.haveItemsBeenSorted && (this.sortOrder = this.sortOrder === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending);
        this._hasOrderedIndex(r);
        i != null && (this.sortOrder = i);
        var u = {
            keySelector: n,
            sortOrder: i != null ? i : this.sortOrder,
            thenByKeySelectors: t
        };
        this._sorting(u)
    }
    ,
    n.prototype.filterItems = function(n, t) {
        var i = {
            keySelector: n,
            keySelectorAsString: n.toString()
        };
        return Enumerable.from(this._filters()).any(function(n) {
            return n.keySelectorAsString === i.keySelectorAsString
        }) ? (this._filters(Enumerable.from(this._filters()).where(function(n) {
            return n.keySelectorAsString !== i.keySelectorAsString
        }).toArray()),
        t && t(!1),
        !1) : (t && t(!0),
        this._filters.push(i),
        !0)
    }
    ,
    n.prototype.removeFilters = function() {
        this._filters([])
    }
    ,
    n.prototype.removeFilter = function(n, t) {
        if (this._filters()) {
            var i = n.toString();
            this._filters(Enumerable.from(this._filters()).where(function(n) {
                return n.keySelectorAsString !== i
            }).toArray());
            t && t(!1)
        }
    }
    ,
    n.prototype.removeItem = function(n) {
        var t = Enumerable.from(this._items()).except([n]).toArray();
        this._items(t)
    }
    ,
    n.prototype.removeItemByFunction = function(n) {
        this._items.remove(n)
    }
    ,
    n.prototype.replace = function(n, t) {
        this._items.replace(n, t)
    }
    ,
    n.prototype.addItem = function(n) {
        this._items.push(n)
    }
    ,
    n.prototype.getRankedArray = function(n, t, i, r) {
        var f, u, o, l;
        if (i === void 0 && (i = null),
        r === void 0 && (r = !1),
        f = [],
        this._items === undefined || !this._items() || this._items().length === 0)
            return f;
        var c = this.getOrderedArray(i, r)
          , s = 0
          , h = null
          , e = 1;
        for (u = 0; u < c.length; u++)
            o = c[u],
            h ? n && n(h) === n(o) ? e++ : (s += t ? e : 1,
            e = 1) : s++,
            h = o,
            l = {
                rank: s,
                item: o,
                isFirstTie: e === 1,
                index: u
            },
            f.push(l);
        return f
    }
    ,
    n.prototype.getOrderedArray = function(n, t, i) {
        var r, u, f;
        if (i === void 0 && (i = null),
        n) {
            if (r = t ? Enumerable.from(this._items()).orderBy(n) : Enumerable.from(this._items()).orderByDescending(n),
            i)
                for (u = 0; u < i.length; u++)
                    r = t ? r.thenBy(i[u]) : r.thenByDescending(i[u])
        } else
            return this._items();
        return this._hasOrderedIndex() && (f = 1,
        r.forEach(function(n) {
            n && n.hasOwnProperty("orderedIndex") && (n.orderedIndex(f),
            f++)
        })),
        r.toArray()
    }
    ,
    n.prototype.getSlice = function(n, t, i, r) {
        i === void 0 && (i = null);
        r === void 0 && (r = !1);
        var u = this.getRankedArray(i, !0, i, r)
          , f = Enumerable.from(u).singleOrDefault(function(t) {
            return n(t.item)
        })
          , e = f ? this.getStartIndex(f.index, u.length, t) : 0;
        return Enumerable.from(u).skip(e).take(t).toArray()
    }
    ,
    n.prototype.getStartIndex = function(n, t, i) {
        var r = Math.floor(i / 2);
        return n + r >= t ? Math.max(0, t - i) : Math.max(0, n - r)
    }
    ,
    n.prototype.addItemsFromModels = function(n, t) {
        var i = this;
        n && n.length !== 0 && (n.forEach(function(n) {
            i.addItem(new t(n))
        }),
        this._isLoading(!1))
    }
    ,
    n
}(), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), SingleSelectableViewModel = function(n) {
    function t() {
        var t = n !== null && n.apply(this, arguments) || this;
        return t.selectedIndex = ko.observable(0),
        t.isIncrementIndexDisabled = ko.computed(function() {
            return t.selectedIndex() >= t.getItems().length - 1
        }),
        t.isDecrementIndexDisabled = ko.computed(function() {
            return t.selectedIndex() <= 0
        }),
        t.maxValue = ko.computed(function() {
            return t.getItems().length === 0 ? 0 : t.getItems().length - 1
        }),
        t
    }
    return __extends(t, n),
    t.prototype.incrementIndex = function() {
        this.isIncrementIndexDisabled() ? this.setIndex(0) : this.setIndex(this.selectedIndex() + 1)
    }
    ,
    t.prototype.decrementIndex = function() {
        this.isDecrementIndexDisabled() ? this.setIndex(this.maxValue()) : this.setIndex(this.selectedIndex() - 1)
    }
    ,
    t.prototype.setIndex = function(n) {
        this.selectedIndex(n)
    }
    ,
    t.prototype.getSelectedItem = function() {
        return this.getItems()[this.selectedIndex()]
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), SingleSelectablePartialViewmodel = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.selectedValue = ko.observable(),
        i.setSelectableItems(t),
        i
    }
    return __extends(t, n),
    t.prototype.setSelectableItems = function(n) {
        n && this.setItems(n)
    }
    ,
    t
}(SingleSelectableViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), SingleSelectableEnumViewModel = function(n) {
    function t(t, i) {
        i === void 0 && (i = "");
        var r = n.call(this) || this;
        return r._panelId = ko.observable(),
        r._enumSortSelectors = ko.observable(),
        r._enumSortOrder = ko.observable(),
        r.isTranslationElementRendered = ko.observable(!0),
        r.getTranslatedEnumItems = ko.computed(function() {
            return !r.getItems() || !r._panelId() || !r.isTranslationElementRendered() ? [] : r.getItems().map(function(n, t) {
                return {
                    displayValue: $("#" + r._panelId()).data("enumtranslation" + t),
                    key: r._enumType[n]
                }
            })
        }),
        r.getSortedTranslatedEnumItems = ko.computed(function() {
            var i = r.getTranslatedEnumItems(), u, n, t;
            if (!r._enumSortSelectors())
                return i;
            if (u = r._enumSortSelectors()[0],
            n = r._enumSortOrder() === SortOrder.Ascending ? Enumerable.from(i).orderBy(u) : Enumerable.from(i).orderByDescending(u),
            r._enumSortSelectors().length > 1)
                for (t = 1; t < r._enumSortSelectors().length; t++)
                    n = r._enumSortOrder() === SortOrder.Ascending ? n.thenBy(r._enumSortSelectors()[t]) : n.thenByDescending(r._enumSortSelectors()[t]);
            return n.toArray()
        }),
        r.setSelectableItems(t),
        r._enumType = t,
        r._panelId(i),
        r
    }
    return __extends(t, n),
    t.prototype.setTranslatedEnumSorting = function(n, t) {
        this._enumSortOrder(t);
        this._enumSortSelectors(n)
    }
    ,
    t.prototype.setSelectableItems = function(n) {
        var i = []
          , t = Helper.enumToDictionary(n);
        for (var r in t)
            t.hasOwnProperty(r) && i.push(t[r]);
        this.setItems(i)
    }
    ,
    t.prototype.getTranslatedEnum = function(n) {
        return $("#" + n).data("enumtranslation" + this.selectedIndex())
    }
    ,
    t
}(SingleSelectableViewModel), LaurelDisplayType;
(function(n) {
    n[n.Avatar = 0] = "Avatar";
    n[n.Amount = 1] = "Amount"
}
)(LaurelDisplayType || (LaurelDisplayType = {}));
var LaurelPartial = function() {
    function n(n, t, i) {
        var r = this;
        t === void 0 && (t = LaurelDisplayType.Avatar);
        i === void 0 && (i = null);
        this._itemCount = 22;
        this.level = ko.observable(0);
        this.avatarUrl = ko.observable();
        this.extraLeaf = ko.observable();
        this.leaves = ko.computed(function() {
            for (var i, t = [], n = 1; n <= r._itemCount; n++)
                i = r.createAvatarLeaf(n, !1),
                t.push(i);
            return t
        });
        this.level(n);
        this.displayType = t;
        this.avatarUrl(Helper.getAvatarUrl(i, AvatarType.Player))
    }
    return n.prototype.createAvatarLeaf = function(n, t) {
        return {
            url: this.getLeafUrl(n, t ? 1 : 0),
            isMirrored: n % 2 == 0,
            isEarnable: t,
            isVisible: ko.observable(!1)
        }
    }
    ,
    n.prototype.getLeafUrl = function(n, t) {
        t === void 0 && (t = 0);
        var i = Math.floor((n - 1) / 2) + 1
          , r = Math.floor(this.level() / this._itemCount) + (this.level() % this._itemCount < n ? 0 : 1) + t;
        return r.toString() + "_" + i.toString()
    }
    ,
    n.prototype.addLeaf = function() {
        var n = this
          , i = this.level() % this._itemCount + 1
          , t = this.createAvatarLeaf(i, !0);
        this.extraLeaf(t);
        setTimeout(function() {
            t.isVisible(!0);
            setTimeout(function() {
                n.level(n.level() + 1);
                n.extraLeaf(null)
            }, 1300)
        }, 100)
    }
    ,
    n
}()
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , UserPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this, r;
        return i.showActivateAccountNotification = ko.observable(!1),
        i.showUnconfirmedEmailNotification = ko.observable(!1),
        i.orderedIndex = ko.observable(),
        Helper.copyProperties(t, i),
        i.teamSlots && Object.keys(i.teamSlots).length > 0 && i.teamSlotsPartial(new TeamSlotsPartial(i.teamSlots,i.signUpTimestamp)),
        i.masterAccount = i.masterAccount ? i.masterAccount : i.name,
        i.isNewUser = i.loginCount <= 1,
        r = $.cookie(CookieHelper.CookieKeys.unconfirmedActivationEmail),
        r && i.showUnconfirmedEmailNotification(!0),
        r || i.isActivated() || i.showActivateAccountNotification(!0),
        i.isInSessionLeague = ko.computed(function() {
            return appViewModel.leaguePartial() ? i.teamSlotsPartial() ? Enumerable.from(i.teamSlotsPartial().getItems()).any(function(n) {
                return n.leaguePartial() && n.leaguePartial().id === appViewModel.leaguePartial().id
            }) : !1 : !1
        }),
        i.canBeInvited = ko.computed(function() {
            return !appViewModel.leaguePartial() || !appViewModel.userPartial() ? !1 : appViewModel.leaguePartial().isClosed() && !appViewModel.userPartial().isUser(appViewModel.leaguePartial().moderator) ? !1 : appViewModel.leaguePartial().vacancies === 0 ? !1 : i.isInSessionLeague() ? !1 : !0
        }),
        i.isLegacyUser = ko.computed(function() {
            return Enumerable.from([Platform.LegacyWeb, Platform.LegacyIphone, Platform.LegacyAndroid, Platform.LegacyIpad, Platform.LegacyFacebook, Platform.LegacyVKontakte]).contains(i.partnerNr)
        }),
        i
    }
    return __extends(t, n),
    t.prototype.isActivated = function() {
        return !this.activationCode
    }
    ,
    t.prototype.hasMultipleSlots = function() {
        return Enumerable.from(this.teamSlotsPartial().getItems()).where(function(n) {
            return Boolean(n.managerPartial())
        }).count() > 1
    }
    ,
    t.prototype.canHaveMultipleSlots = function() {
        return this.hasMultipleSlots() || Enumerable.from(this.teamSlotsPartial().getItems()).count(function(n) {
            return n.daysUntilUnlockable === 0
        }) > 1
    }
    ,
    t.prototype.hasAvailableSlots = function() {
        return Enumerable.from(this.teamSlotsPartial().getItems()).any(function(n) {
            return !n.hasTeam() && !n.isLocked
        })
    }
    ,
    t.prototype.getPartnerNrImage = function() {
        return Helper.getPlatformImage(this.partnerNr)
    }
    ,
    t.prototype.getLastLoginPlatformImage = function() {
        return Helper.getPlatformImage(this.lastLoginPlatform)
    }
    ,
    t.prototype.navigateTo = function() {
        window.location.href = Helper.replaceText(Urls.profile, [new KeyValuePair("userId",this.id.toString())])
    }
    ,
    t.prototype.navigateToSlots = function() {
        window.location.href = Helper.replaceText(Urls.profileSlots, [new KeyValuePair("userId",this.id.toString())])
    }
    ,
    t.prototype.areAdsEnabledForUser = function() {
        var n = LeanplumHelper.getInstance().getVariables("Settings", "AdWaitingHours", 72);
        return this.hasAds && Helper.getHoursSinceTimestamp(this.signUpTimestamp) > n
    }
    ,
    t.prototype.isUser = function(n) {
        return n === this.login || n === this.login + "S1" || n === this.login + "S2" || n === this.login + "S3"
    }
    ,
    t
}(User)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TeamPartial = function(n) {
    function t(t, i, r) {
        var u = n.call(this) || this, f, e;
        return u._interestMultiplier = .02,
        u.isSessionTeam = ko.observable(!1),
        u.imageLarge = "",
        u.boardMood = ko.observable(BoardMood.Satisfied),
        u.hasOngoingSpyInstruction = ko.computed(function() {
            return !u.spyInstructionPartial() || !u.spyInstructionPartial().countdownTimerPartial() ? !1 : u.spyInstructionPartial().countdownTimerPartial().timerState() !== TimerState.Claimed
        }),
        u.onTrainingCamp = ko.computed(function() {
            return !u.teamTrainingsPartial() || !appViewModel || !appViewModel.leaguePartial() ? !1 : Enumerable.from(u.teamTrainingsPartial().getItems()).any(function(n) {
                return n.type === TeamTrainingType.Camp && n.week === appViewModel.leaguePartial().weekNr
            })
        }),
        u.onSecretTraining = ko.computed(function() {
            return !u.teamTrainingsPartial() || !appViewModel || !appViewModel.leaguePartial() ? !1 : Enumerable.from(u.teamTrainingsPartial().getItems()).any(function(n) {
                return n.type === TeamTrainingType.Secret && n.week === appViewModel.leaguePartial().weekNr
            })
        }),
        Helper.copyProperties(t, u),
        u.manager && u.managerPartial(new ManagerPartial(u.manager)),
        u.tactic && u.tacticPartial(new TeamTacticPartial(u.tactic)),
        u.finance && u.financePartial(new TeamFinancePartial(u.finance)),
        u.leagueStanding && u.leagueStandingPartial(new LeagueStandingPartial(u.leagueStanding)),
        u.league && u.leaguePartial(new LeaguePartial(u.league)),
        u.spyInstruction && u.spyInstructionPartial(new SpyInstructionPartial(u.spyInstruction)),
        u.assets && (f = Enumerable.from(u.assets).firstOrDefault(function(n) {
            return n.type === AssetType.NormalCrest
        }),
        f != null ? u.imageLarge = f.path : (e = (u.id - 1) % 24 + 1,
        u.imageLarge = Helper.replaceText(teamLogoFallbackNormalUrl, [{
            key: "teamId",
            value: e.toString()
        }]))),
        u.players && u.playersPartial(new PlayersPartial(u.players,i,r)),
        u.stadium && u.stadiumPartial(new StadiumPartial(u.stadium,null,null)),
        u.leagueType && u.leagueTypePartial(new LeagueTypePartial(u.leagueType)),
        u.teamTrainings && u.teamTrainingsPartial(new TeamTrainingsPartial(u.teamTrainings)),
        u.teamStatistic && u.teamStatisticPartial(new TeamStatisticPartial(u.teamStatistic)),
        u.isSessionTeam(u.id === SessionManager.getTeamId()),
        u.boardMood(u.getBoardMood(u.ranking, u.goal)),
        u
    }
    return __extends(t, n),
    t.prototype.getBoardMood = function(n, t) {
        return appViewModel.leaguePartial() ? appViewModel.leaguePartial().isInPreparation ? BoardMood.Satisfied : n === 0 ? BoardMood.Hopeful : n < t || n === 1 ? BoardMood.Happy : n === t ? BoardMood.Satisfied : BoardMood.Angry : BoardMood.Satisfied
    }
    ,
    t.prototype.navigateTo = function() {
        window.location.href = Urls.squad + "/" + this.leagueId + "/" + this.id
    }
    ,
    t.prototype.navigateToBaseTeam = function() {
        window.location.href = Urls.leagueTypesTeam + "/" + this.leagueTypeId + "/" + this.id
    }
    ,
    t.prototype.navigateToChooseTeam = function() {
        window.location.href = Urls.chooseTeamForLeagueType + "/" + this.leagueTypeId
    }
    ,
    t.prototype.navigateToSquadStrengthReport = function() {
        this.isSessionTeam() || (window.location.href = Urls.spy)
    }
    ,
    t.prototype.getPositionDifference = function() {
        return this.goal - this.ranking
    }
    ,
    t.prototype.getPositionDifferenceString = function() {
        var n = this.getPositionDifference();
        return n > 0 ? "+ " + n : n < 0 ? "- " + -n : "0"
    }
    ,
    t.prototype.getSquadStrength = function() {
        var i = this, n, t;
        return !this.tacticPartial() || !this.tacticPartial().formation || !this.playersPartial() ? 0 : (n = this.tacticPartial().formation,
        t = [PlayerPosition.A, PlayerPosition.D, PlayerPosition.M, PlayerPosition.G],
        Math.round(Enumerable.from(t).sum(function(t) {
            return i.playersPartial().getAverageLineStrengthForFormation(t, n)
        }) / 4))
    }
    ,
    t.prototype.getSquadStrengthForPosition = function(n) {
        if (!this.tacticPartial() || !this.tacticPartial().formation || !this.playersPartial())
            return 0;
        var t = this.tacticPartial().formation;
        return Math.round(this.playersPartial().getAverageLineStrengthForFormation(n, t))
    }
    ,
    t.prototype.getSquadStrengthAvailabilityStatus = function() {
        return this.isSessionTeam() ? t.SquadStrengthAvailabilityStatus.IsSessionTeam : this.onSecretTraining() ? t.SquadStrengthAvailabilityStatus.OnSecretTraining : this.spyInstructionPartial() ? this.spyInstructionPartial() && this.spyInstructionPartial().hasUnclaimedSpyInstruction() ? t.SquadStrengthAvailabilityStatus.UnclaimedReport : this.spyInstructionPartial() && this.spyInstructionPartial().hasRunningSpyInstruction() ? t.SquadStrengthAvailabilityStatus.AnalistSearching : this.spyInstructionPartial() ? t.SquadStrengthAvailabilityStatus.ReportAvailable : void 0 : t.SquadStrengthAvailabilityStatus.NoReport
    }
    ,
    t.prototype.getBalance = function() {
        return this.financePartial() ? this.financePartial().balance : 0
    }
    ,
    t
}(Team);
(function(n) {
    var t;
    (function(n) {
        n[n.IsSessionTeam = 0] = "IsSessionTeam";
        n[n.NoReport = 1] = "NoReport";
        n[n.AnalistSearching = 2] = "AnalistSearching";
        n[n.UnclaimedReport = 3] = "UnclaimedReport";
        n[n.ReportAvailable = 4] = "ReportAvailable";
        n[n.OnSecretTraining = 5] = "OnSecretTraining"
    }
    )(t = n.SquadStrengthAvailabilityStatus || (n.SquadStrengthAvailabilityStatus = {}))
}
)(TeamPartial || (TeamPartial = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CommentatorEventPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(CommentatorEvent), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CommentatorEventsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.addItemsFromModels(t, CommentatorEventPartial),
        i
    }
    return __extends(t, n),
    t.prototype.getPostMatchCommentary = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.commentatorPhase === CommentatorPhase.PostMatch && n.commentatorType === CommentatorType.Pundit
        }).toArray()
    }
    ,
    t.prototype.getPostMatchTop = function() {
        return Enumerable.from(this.getPostMatchCommentary()).firstOrDefault()
    }
    ,
    t.prototype.getPostMatchTip = function() {
        return Enumerable.from(this.getPostMatchCommentary()).lastOrDefault()
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), ManagerPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.isCpu = !0,
        i.avatarType = AvatarType.Player,
        i.masterAccountName = "",
        i.isSacking = ko.observable(!1),
        Helper.copyProperties(t, i),
        i.masterAccountName = i.masterAccount === "" ? i.name : i.masterAccount,
        i.isCpu = i.id === 0,
        i.isCpu && (i.avatarType = AvatarType.Cpu),
        i.team && (i.teamPartial = new TeamPartial(i.team)),
        i.mayBeKicked = ko.computed(function() {
            if (!appViewModel || !appViewModel.gameSettingsPartial())
                return !1;
            var n = appViewModel.gameSettingsPartial().getValue(GameVarCategory.Manager, "NotSackableDays");
            return i.lastLoginTimestamp < Helper.unixTimeStamp() - 86400 * n
        }),
        i
    }
    return __extends(t, n),
    t.prototype.getPartnerNrImage = function() {
        return Helper.getPlatformImage(this.lastLoginPlatform)
    }
    ,
    t.prototype.getCrewTagClassName = function() {
        return this.isCpu ? "" : this.crewId == 0 ? "crew-tag-image-division-placeholder" : "crew-tag-image-division-" + this.crewRankingDivisionSorting
    }
    ,
    t.prototype.navigateTo = function() {
        location.href = Helper.replaceText(Urls.profile, [new KeyValuePair("userId",this.id.toString())])
    }
    ,
    t
}(Manager), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), LeaguePartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.displayName = "",
        i.preparationDaysLeft = 0,
        i.nextPositiveWeekNr = 1,
        i.isLastDay = !1,
        i.isInPreparation = !0,
        i.hasCup = !1,
        i.vacancies = 0,
        i.isSessionLeague = ko.observable(!1),
        i.friendPartials = ko.observableArray(),
        i.invitePartials = ko.observableArray(),
        i.isClosed = ko.computed(function() {
            if (!i.settingsPartial())
                return !0;
            var n = i.settingsPartial().getSetting(LeagueSettingType.Closed);
            return n && n.value === 1
        }),
        i.boostTimersAllowed = ko.computed(function() {
            return i.settingsPartial() ? i.settingsPartial().boostTimersAllowed : !0
        }),
        i.agentContactPerson = ko.computed(function() {
            return i.hasFriendModerator() ? Enumerable.from(i.friendPartials()).first(function(n) {
                return i.isModerator(n.login)
            }) : i.friendPartials().length > 0 ? Enumerable.from(i.friendPartials()).orderByDescending(function(n) {
                return n.lastLoginTimestamp
            }).first() : i.hasInviterModerator() ? Enumerable.from(i.invitePartials()).first(function(n) {
                return i.isModerator(n.inviterLogin)
            }).inviterPartial() : i.invitePartials().length > 0 ? Enumerable.from(i.invitePartials()).orderByDescending(function(n) {
                return n.timeStamp
            }).first().inviterPartial() : null
        }),
        Helper.copyProperties(t, i),
        i.isLastDay = i.weekNr === i.weeks,
        i.isInPreparation = i.weekNr <= 0,
        i.hasCup = i.totalCupRounds > 0,
        i.name.length > 0 ? i.displayName = i.name : i.leagueType && (i.displayName = i.leagueType.name),
        i.weekNr <= 0 && (i.preparationDaysLeft = i.weekNr * -1 + 1),
        i.weekNr + 1 > 1 && (i.nextPositiveWeekNr = i.weekNr + 1),
        i.isSessionLeague(i.id === SessionManager.getLeagueId()),
        i.leagueType && i.leagueTypePartial(new LeagueTypePartial(i.leagueType)),
        i.vacancies = i.teamCount - i.managers,
        i.settings && i.settingsPartial(new LeagueSettingsPartial(i.settings)),
        i
    }
    return __extends(t, n),
    t.prototype.navigateTo = function() {
        window.location.href = Urls.leagueTable + "/" + this.id
    }
    ,
    t.prototype.navigateToChooseTeam = function() {
        window.location.href = Helper.replaceText(Urls.chooseTeamForLeague, [{
            key: "leagueId",
            value: this.id.toString()
        }])
    }
    ,
    t.prototype.isModerator = function(n) {
        var t = n.toUpperCase()
          , i = this.moderator.toUpperCase();
        return t === i || t + "S1" === i || t + "S2" === i || t + "S3" === i
    }
    ,
    t.prototype.isUserIdModerator = function(n) {
        return this.moderatorUserId === n
    }
    ,
    t.prototype.getServerNr = function() {
        return Helper.getWorldNr() === 0 ? this.id < 5e5 ? 0 : Math.floor(this.id / 1e6) + 1 : Math.floor(this.id / 1e6)
    }
    ,
    t.prototype.isTournamentLeague = function() {
        return this.leagueScheduleType === LeagueScheduleType.Tournament
    }
    ,
    t.prototype.isFantasyLeague = function() {
        return this.leagueTypePartial() && this.leagueTypePartial().isFantasyLeague()
    }
    ,
    t.prototype.isEuro2021League = function() {
        return this.leagueTypePartial() && this.leagueTypePartial().isEuro2021League()
    }
    ,
    t.prototype.isVipLeague = function() {
        return this.mode === LeagueMode.VipLeague
    }
    ,
    t.prototype.isPrizePool = function() {
        return this.mode === LeagueMode.PrizePool
    }
    ,
    t.prototype.isKnockoutLeague = function() {
        return this.leagueScheduleType === LeagueScheduleType.Knockout
    }
    ,
    t.prototype.isPoulesLeague = function() {
        return this.leagueScheduleType === LeagueScheduleType.Poules
    }
    ,
    t.prototype.leagueIsKnockoutPhase = function() {
        return this.leaguePhase === LeaguePhase.KnockoutPhase || this.isKnockoutLeague()
    }
    ,
    t.prototype.leagueIsPoulesPhase = function() {
        return this.leaguePhase === LeaguePhase.PoulesPhase
    }
    ,
    t.prototype.leagueHasKnockoutPhase = function() {
        return this.isKnockoutLeague() || this.isTournamentLeague()
    }
    ,
    t.prototype.leagueHasPoulesSchedule = function() {
        return this.isPoulesLeague() || this.isTournamentLeague()
    }
    ,
    t.prototype.isJoinable = function(n) {
        var i = this, t;
        return this.mode === LeagueMode.Battle || this.mode === LeagueMode.WinnersLeague || this.isVipLeague() || this.isPrizePool() ? !1 : this.isFantasyLeague() && !this.hasIncompleteTeams ? !1 : (t = appViewModel.gameSettingsPartial().getGameSetting(GameVarCategory.ChooseTeam, "CannotJoinLeagueAfterWeekPercentage").value,
        this.weekNr >= t / 100 * this.weeks) ? !1 : this.vacancies === 0 ? !1 : !Enumerable.from(n.teamSlots).any(function(n) {
            return n.league && n.league.id === i.id
        })
    }
    ,
    t.prototype.canJoinLeagueAfterDays = function() {
        var n = appViewModel.gameSettingsPartial().getGameSetting(GameVarCategory.ChooseTeam, "CannotJoinLeagueAfterWeekPercentage").value;
        return !(this.weekNr >= n / 100 * this.weeks)
    }
    ,
    t.prototype.hasFriendModerator = function() {
        var n = this;
        return Enumerable.from(this.friendPartials()).any(function(t) {
            return n.isModerator(t.login)
        })
    }
    ,
    t.prototype.hasInviterModerator = function() {
        var n = this;
        return Enumerable.from(this.invitePartials()).any(function(t) {
            return n.isModerator(t.inviterLogin)
        })
    }
    ,
    t.prototype.getMostRecentFriendTimestamp = function() {
        return this.friendPartials().length === 0 ? 0 : Enumerable.from(this.friendPartials()).max(function(n) {
            return n.lastLoginTimestamp
        })
    }
    ,
    t.prototype.getMostRecentInviteTimestamp = function() {
        return this.invitePartials().length === 0 ? 0 : Enumerable.from(this.invitePartials()).max(function(n) {
            return n.timeStamp
        })
    }
    ,
    t.prototype.getBaseLeagueTheme = function() {
        return this.leagueTypePartial() ? this.leagueTypePartial().baseLeagueThemeType : BaseLeagueThemeType.Default
    }
    ,
    t.prototype.getLeagueTheme = function() {
        var n = LeagueTheme.Default;
        switch (this.getBaseLeagueTheme()) {
        case BaseLeagueThemeType.Knockout:
            n = LeagueTheme.Knockout;
            break;
        case BaseLeagueThemeType.Tournament:
            n = LeagueTheme.Tournament;
            break;
        case BaseLeagueThemeType.WinnersLeague:
            n = LeagueTheme.WinnersLeague;
            break;
        case BaseLeagueThemeType.FantasyLeague:
            n = LeagueTheme.FantasyLeague;
            break;
        case BaseLeagueThemeType.Euro2021:
            n = LeagueTheme.Euro2021
        }
        if (n !== LeagueTheme.Default)
            return n;
        switch (this.mode) {
        case LeagueMode.Battle:
            n = LeagueTheme.CrewBattle;
            break;
        case LeagueMode.VipLeague:
            n = LeagueTheme.VipLeague
        }
        return n
    }
    ,
    t.prototype.managersLeftForPrizePoolRound = function(n) {
        return this.isPrizePool() ? this.teamCount / Math.pow(2, n - 1) : this.teamCount
    }
    ,
    t.prototype.managersLeftBehindForPrizePoolRound = function(n) {
        return this.isPrizePool() ? this.teamCount - this.managersLeftForPrizePoolRound(n) : this.teamCount
    }
    ,
    t
}(League), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), RankingPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t.prototype.navigateTo = function() {
        (this.rankingType === RankingType.User || this.rankingType === RankingType.Country) && (location.href = Helper.replaceText(Urls.profile, [new KeyValuePair("userId",this.externalId.toString())]))
    }
    ,
    t
}(Ranking), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), LeagueTypePartial = function(n) {
    function t(t) {
        var i = n.call(this) || this, r, u;
        return i.imageLarge = "",
        i.imageSmall = "",
        Helper.copyProperties(t, i),
        i.assets && (r = Enumerable.from(i.assets).firstOrDefault(function(n) {
            return n.type === AssetType.NormalLeague
        }),
        r != null && (i.imageLarge = r.path),
        u = Enumerable.from(i.assets).firstOrDefault(function(n) {
            return n.type === AssetType.SmallLeague
        }),
        u != null && (i.imageSmall = u.path),
        i.assetsPartial(new AssetsPartial(i.assets))),
        i.historyItems && i.historyItemsPartial(new HistoryItemsPartial(i.historyItems)),
        i.historyItemsV1Dot1 && i.historyItemsPartialV1Dot1(new WebApiV1Dot1.HistoryItemsPartial(i.historyItemsV1Dot1)),
        i.winnersLeagueQualification && i.winnersLeagueQualificationPartial(new WinnersLeagueQualificationPartial(i.winnersLeagueQualification)),
        i.activeEndTimestamp > 0 && i.createExpirationCountdownTimer(),
        i
    }
    return __extends(t, n),
    t.prototype.createExpirationCountdownTimer = function() {
        var n = {
            finishedTimestamp: this.activeEndTimestamp,
            id: 0,
            leagueId: 0,
            type: CountdownTimerType.LeagueTypeExpiration,
            title: "",
            currentTimestamp: 0,
            isClaimed: !1,
            isBoosted: !1
        };
        this.activeEndCountdownTimerPartial(new CountdownTimerPartial(n))
    }
    ,
    t.prototype.navigateToActiveLeague = function(n) {
        window.location.href = Urls.activeLeaguesLeague + "/" + n + "/" + this.id
    }
    ,
    t.prototype.navigateToBaseLeague = function() {
        window.location.href = Urls.leagueTypesLeague + "/" + this.id
    }
    ,
    t.prototype.navigateToChooseTeam = function() {
        window.location.href = Urls.chooseTeamForLeagueType + "/" + this.id
    }
    ,
    t.prototype.isLeagueTypeCompleted = function() {
        return this.historyItemsPartial() ? this.historyItemsPartial().hasBeenChampion() || this.historyItemsPartial().hasWonCup() || this.historyItemsPartial().hasReachedGoal() : !1
    }
    ,
    t.prototype.isLeagueTypeActive = function() {
        var n, t = moment(moment.utc().valueOf()).unix();
        return ((n = this.activeEndCountdownTimerPartial()) === null || n === void 0 ? void 0 : n.timerState()) == TimerState.InProgress && this.activeEndTimestamp >= t || this.activeEndTimestamp === 0
    }
    ,
    t.prototype.secondsRemainingUntilLeagueTypeIsExpired = function() {
        if (!this.isLeagueTypeActive())
            return 0;
        var n = moment(moment.utc().valueOf()).unix();
        return n - this.activeEndTimestamp
    }
    ,
    t.prototype.isLeagueTypeCompletedV1Dot1 = function() {
        return this.historyItemsPartialV1Dot1() ? this.historyItemsPartialV1Dot1().hasBeenChampion() || this.historyItemsPartialV1Dot1().hasWonCup() || this.historyItemsPartialV1Dot1().hasReachedGoal() : !1
    }
    ,
    t.prototype.isTournamentLeagueType = function() {
        return this.leagueScheduleType === LeagueScheduleType.Tournament
    }
    ,
    t.prototype.isFantasyLeague = function() {
        return this.type === LeagueGroupType.Fantasy
    }
    ,
    t.prototype.isEuro2021League = function() {
        return this.baseLeagueThemeType === BaseLeagueThemeType.Euro2021
    }
    ,
    t.prototype.isPrizePool = function() {
        return this.type === LeagueGroupType.PrizePool
    }
    ,
    t.prototype.isKnockoutLeagueType = function() {
        return this.leagueScheduleType === LeagueScheduleType.Knockout
    }
    ,
    t.prototype.isPoulesLeagueType = function() {
        return this.leagueScheduleType === LeagueScheduleType.Poules
    }
    ,
    t.prototype.leagueTypeHasPoulesSchedule = function() {
        return this.isPoulesLeagueType() || this.isTournamentLeagueType()
    }
    ,
    t.prototype.getAmountOfPouleMatches = function() {
        switch (this.leagueScheduleType) {
        case LeagueScheduleType.Tournament:
            return this.weeks - this.totalCupWeeks;
        case LeagueScheduleType.Poules:
            return this.weeks;
        default:
            return 0
        }
    }
    ,
    t.prototype.calculatePrizePoolOrganizationFee = function() {
        var t = this;
        if (!this.isPrizePool())
            return 0;
        var i = "PrizePoolFee" + this.id
          , r = appViewModel.bossCoinProductsPartial().getBossCoinProduct(i)
          , u = appViewModel.actionRewardsPartial().getByActionType(ActionType.PrizePool)
          , o = Enumerable.from(u).sum(function(n) {
            return n.getFirstRewardVariation().value
        })
          , f = [{
            type: PrizePoolRewardType.Winner,
            amount: 1
        }, {
            type: PrizePoolRewardType.RunnerUp,
            amount: 1
        }, {
            type: PrizePoolRewardType.SemiFinalist,
            amount: 2
        }, {
            type: PrizePoolRewardType.QuarterFinalist,
            amount: 4
        }, {
            type: PrizePoolRewardType.EightFinalist,
            amount: 8
        }, {
            type: PrizePoolRewardType.SixteenthFinalist,
            amount: 16
        }]
          , e = this.teamCount * r.value
          , n = 0;
        return f.forEach(function(i) {
            var r = appViewModel.actionRewardsPartial().getPrizePoolRewardForRewardType(i.type, t.id);
            n += r.getFirstRewardVariation().value * i.amount
        }),
        e - n
    }
    ,
    t.prototype.getLeagueThemeForBaseTheme = function() {
        switch (this.baseLeagueThemeType) {
        case BaseLeagueThemeType.Knockout:
            return LeagueTheme.Knockout;
        case BaseLeagueThemeType.Tournament:
            return LeagueTheme.Tournament;
        case BaseLeagueThemeType.WinnersLeague:
            return LeagueTheme.WinnersLeague
        }
        return LeagueTheme.Default
    }
    ,
    t
}(LeagueType), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AssetsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new AssetPartial(n))
        });
        this.setItems(t)
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), LanguagePartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.flagCode = "en-GB",
        i.googlePlayStoreImageUrl = "",
        i.appStoreImageUrl = "",
        Helper.copyProperties(t, i),
        i.flagCode = i.cultureCode.toLowerCase().substr(0, 2) === i.code.toLowerCase() ? i.cultureCode.substr(i.cultureCode.length - 2, 2).toLowerCase() : i.code.toLowerCase(),
        i.googlePlayStoreImageUrl = "/Images/shared/playstore/" + i.googlePlayButtonCode + "_badge_web_generic.png",
        i.appStoreImageUrl = "/Images/shared/appstore/Download_on_the_App_Store_Badge_" + i.appStoreButtonCode + "_135x40.svg",
        i
    }
    return __extends(t, n),
    t.prototype.select = function(n) {
        WebApiConfig.getInstance().cultureCode = this.cultureCode;
        CacheHandler.getInstance().removeKeysStartingWith(CacheKey.Texts);
        n ? window.location.href = n : window.location.reload()
    }
    ,
    t
}(Language), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), LanguagesPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.isInitialized = ko.observable(!1),
        i.leftItems = ko.computed(function() {
            return i.getItems().slice(0, i.getItems().length / 2)
        }),
        i.rightItems = ko.computed(function() {
            return i.getItems().slice(i.getItems().length / 2, i.getItems().length)
        }),
        i.currentLanguage = ko.computed(function() {
            var n = i.getCurrentLanguage();
            return !n && i.isInitialized() ? Enumerable.from(i.getItems()).firstOrDefault(function(n) {
                return n.cultureCode === Helper.getDefaultCultureCode(appViewModel.sessionSettings.worldNr)
            }) : i.getCurrentLanguage()
        }),
        i.setItemsFromModels(t),
        i.isInitialized(!0),
        i
    }
    return __extends(t, n),
    t.prototype.getCurrentLanguage = function() {
        return Enumerable.from(this.getItems()).firstOrDefault(function(n) {
            return n.cultureCode === WebApiConfig.getInstance().cultureCode
        })
    }
    ,
    t.prototype.determineUserCultureCodeFromLanguages = function(n, t) {
        var i = ""
          , r = $.cookie(Cookies[Cookies.FacebookCultureCode]);
        return t && r ? FacebookHelper.convertFacebookCultureCode(r, Helper.getDefaultCultureCode(appViewModel.sessionSettings.worldNr)) : (i = this.getCultureCodeFromHostname(n),
        i || (i = WebApiConfig.getInstance().cultureCode),
        i || (i = WebApiConfig.getInstance().defaultCultureCode),
        i || (i = Helper.getDefaultCultureCode(appViewModel.sessionSettings.worldNr)),
        i)
    }
    ,
    t.prototype.getCultureCodeFromHostname = function(n) {
        return !n || !this.getItems() || n.indexOf("localhost") > -1 || n.indexOf("127.0.0.1") > -1 ? "" : n.indexOf(".nl") > -1 ? Enumerable.from(this.getItems()).where(function(n) {
            return n.code === "nl"
        }).select(function(n) {
            return n.cultureCode
        }).firstOrDefault() : Enumerable.from(this.getItems()).where(function(t) {
            return n.indexOf(Helper.transformWorldUrlToUrlWithLanguageCode(t.code)) > -1
        }).select(function(n) {
            return n.cultureCode
        }).firstOrDefault()
    }
    ,
    t.prototype.transformHostnameToHostnameForCultureCodeIfNeeded = function(n, t) {
        if (!t || !this.getItems() || n.indexOf("localhost") > -1 || appViewModel.isFacebookCanvas())
            return n;
        if (t === Helper.getDefaultCultureCode(WorldNr.OSM) && n.indexOf("best-dev") <= -1 && n.indexOf("hk-dev") <= -1 && n.indexOf("var-dev") <= -1 && n.indexOf("nightly-dev") <= -1)
            return n.indexOf("staging") > -1 ? stagingNlHostname : nlHostname;
        var i = Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return n === Helper.transformWorldUrlToUrlWithLanguageCode(t.code)
        })
          , r = Enumerable.from(this.getItems()).firstOrDefault(function(n) {
            return n.cultureCode === t
        });
        return i && i.cultureCode !== t || !i ? Helper.transformWorldUrlToUrlWithLanguageCode(r.code) : n
    }
    ,
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            n.code != "ja" && n.code != "cn" && t.push(new LanguagePartial(n))
        });
        this.setItems(t)
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CapReachedPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this, r;
        return Helper.copyProperties(t, i),
        r = new CountdownTimer,
        r.finishedTimestamp = i.timestampUntilUnreached,
        i.countdownTimerPartial(new CountdownTimerPartial(r)),
        i
    }
    return __extends(t, n),
    t
}(CapReached), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CapsReachedPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.addItemsFromModels(t, CapReachedPartial),
        i
    }
    return __extends(t, n),
    t.prototype.getFirstCapPlacementByIsReached = function(n) {
        var t = Enumerable.from(this.getItems()).orderBy(function(n) {
            return n.placement
        }).firstOrDefault(function(t) {
            return t.isCapReached === n
        });
        return t ? t.placement : ""
    }
    ,
    t.prototype.getIndexOfFirstAvailablePlacement = function() {
        var t = Enumerable.from(this.getItems()).orderBy(function(n) {
            return n.placement
        })
          , i = this.getFirstCapPlacementByIsReached(!1)
          , n = Enumerable.from(this.getItems()).firstOrDefault(function(n) {
            return n.placement === i
        });
        return n ? t.indexOf(n) : 0
    }
    ,
    t.prototype.updateCapReachedForPlacement = function(n, t) {
        var i = Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.placement === n
        });
        return i ? (i.isCapReached = t,
        !0) : !1
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AssetPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(Asset), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AchievementProgressPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.isClaiming = ko.observable(!1),
        r.isClaimed = ko.observable(!1),
        r.progressPercentage = 0,
        r._achievementsService = i,
        r.update(t),
        r
    }
    return __extends(t, n),
    t.prototype.update = function(n) {
        Helper.copyProperties(n, this);
        this.isClaimed(this.claimed);
        this.progressPercentage = Math.min(100, this.amount / this.threshold * 100)
    }
    ,
    t.prototype.claim = function() {
        var n = this;
        this.isClaiming(!0);
        WebApi.getInstance().execute(this._achievementsService.claim(this.userAchievementId)).then(function(t) {
            LeanplumHelper.getInstance().trackEventWithValue(LeanplumTrackingService.Event.BCClaim, n.reward, {
                BCClaimSource: "Achievement",
                AchievementId: n.achievementId
            });
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.Achievements]);
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.AchievementCount]);
            n.update(t);
            appViewModel.achievementProgressesPartial().refreshAchievementProgress(t);
            appViewModel.refreshBossCoinsWallet().done()
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n)
        }).fin(function() {
            n.isClaiming(!1)
        }).done()
    }
    ,
    t
}(AchievementProgress), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AchievementProgressesPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.completedAchievements = ko.computed(function() {
            return Enumerable.from(r.getItems()).where(function(n) {
                return n.completed
            }).toArray()
        }),
        r.hasUnclaimedAchievements = ko.computed(function() {
            return Enumerable.from(r.getItems()).any(function(n) {
                return n.completed && !n.isClaimed()
            })
        }),
        r.lastAchievement = ko.computed(function() {
            return Enumerable.from(r.completedAchievements()).orderBy(function(n) {
                return n.awardedAtTimestamp
            }).lastOrDefault()
        }),
        r.setItemsFromModels(t, i),
        r
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n, t) {
        var i = [];
        n.forEach(function(n) {
            i.push(new AchievementProgressPartial(n,t))
        });
        this.setItems(i)
    }
    ,
    t.prototype.refreshAchievementProgress = function(n) {
        Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.achievementId === n.achievementId
        }).update(n)
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TeamSlotPartial = function(n) {
    function t(t, i, r) {
        var u = n.call(this) || this;
        return u.hasLeague = !1,
        u.rankingPoints = ko.observable(0),
        u.hasTeam = ko.observable(!1),
        Helper.copyProperties(t, u),
        u.setDaysUntilUnlockable(i, r),
        u.team && (u.teamPartial(new TeamPartial(u.team)),
        u.hasTeam(u.team.id > 0)),
        u.league && (u.leaguePartial(new LeaguePartial(u.league)),
        u.hasLeague = u.leaguePartial().id > 0),
        u.manager && u.managerPartial(new ManagerPartial(u.manager)),
        u.canContinueLeague = u.league && u.league.id > 0 && u.team && u.team.id === 0,
        u
    }
    return __extends(t, n),
    t.prototype.navigateTo = function(n, t, i) {
        var u = this, r;
        if (this.hasLeague) {
            if (n && this.hasTeam()) {
                appViewModel.switchSlot(t, SwitchSlotFlow.Normal, i, this.leaguePartial(), !1);
                return
            }
            if (!n && (r = Enumerable.from(appViewModel.userPartial().teamSlotsPartial().getItems()).indexOf(function(n) {
                return n.leaguePartial() && n.leaguePartial().id === u.leaguePartial().id
            }),
            r > -1 && appViewModel.userPartial().teamSlotsPartial().hasTeamInLeague(this.leaguePartial().id))) {
                appViewModel.switchSlot(r, SwitchSlotFlow.Normal, i, this.leaguePartial(), !1);
                return
            }
            if (!SessionManager.hasTeam() && this.leaguePartial().canJoinLeagueAfterDays() && this.leaguePartial().vacancies !== 0) {
                this.leaguePartial().navigateToChooseTeam();
                return
            }
            this.leaguePartial().navigateTo()
        }
    }
    ,
    t.prototype.setDaysUntilUnlockable = function(n, t) {
        var i, r;
        if (!n || !t) {
            this.daysUntilUnlockable = 0;
            return
        }
        i = 0;
        switch (n) {
        case 1:
            i = 5;
            break;
        case 2:
            i = 20;
            break;
        case 3:
            i = 50
        }
        r = LeanplumHelper.getInstance().getVariables("TeamSlotUnlock", n.toString());
        r && (i = r);
        this.daysUntilUnlockable = this.calculateDaysUntilUnlockable(t, i)
    }
    ,
    t.prototype.calculateDaysUntilUnlockable = function(n, t) {
        var r = new Date(n * 1e3), u, i;
        return r.setDate(r.getDate() + t),
        u = (new Date).getTime(),
        i = Math.ceil((r.getTime() - u) / 864e5),
        i >= t && (i = t),
        i > 0 ? i : 0
    }
    ,
    t
}(TeamSlot), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TeamSlotsPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.areAllSlotsOccupied = !1,
        r.areAllUnlockedSlotsOccupied = !1,
        r.cumulatedRankingPoints = ko.computed(function() {
            return Enumerable.from(r.getItems()).sum(function(n) {
                return n.rankingPoints()
            })
        }),
        r.setItemsFromModels(t, i),
        r
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n, t) {
        for (var r, u = [], i = 0; i < 4; i++)
            r = n[i],
            r && u.push(new TeamSlotPartial(r,i,t));
        this.setItems(u);
        this.getItems() && this.getItems().length === 4 && Enumerable.from(this.getItems()).all(function(n) {
            return n.teamPartial() && n.teamPartial().id > 0
        }) && (this.areAllSlotsOccupied = !0);
        this.getItems() && Enumerable.from(this.getItems()).where(function(n) {
            return n.daysUntilUnlockable === 0
        }).all(function(n) {
            return n.teamPartial() && n.teamPartial().id > 0
        }) && (this.areAllUnlockedSlotsOccupied = !0)
    }
    ,
    t.prototype.getByIndex = function(n) {
        return Enumerable.from(this.getItems()).elementAtOrDefault(n)
    }
    ,
    t.prototype.getCumulatedTeamSlot = function() {
        var n = new TeamSlot;
        return n.manager = new Manager,
        n.manager.total = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().total : 0
        }),
        n.manager.wins = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().wins : 0
        }),
        n.manager.losses = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().losses : 0
        }),
        n.manager.resignCount = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().resignCount : 0
        }),
        n.manager.points = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().points : 0
        }),
        n.manager.skillRating = Enumerable.from(this.getItems()).sum(function(n) {
            return n.managerPartial() ? n.managerPartial().skillRating : 0
        }),
        new TeamSlotPartial(n,null,null)
    }
    ,
    t.prototype.hasTeamInLeague = function(n) {
        return Enumerable.from(this.getItems()).any(function(t) {
            return t.teamPartial() && t.teamPartial().id > 0 && t.leaguePartial() && t.leaguePartial().id === n
        })
    }
    ,
    t.prototype.isInLeague = function(n) {
        return Enumerable.from(this.getItems()).any(function(t) {
            return t.league && t.league.id === n
        })
    }
    ,
    t.prototype.getTeamSlotFromLeagueId = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.league && t.league.id === n
        })
    }
    ,
    t.prototype.isManagingAnyTeam = function() {
        return Enumerable.from(this.getItems()).any(function(n) {
            return n.hasTeam()
        })
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), InvitePartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i.league && i.leaguePartial(new LeaguePartial(i.league)),
        i.inviter && i.inviterPartial(new WebApiV1Dot1.UserPartial(i.inviter)),
        i
    }
    return __extends(t, n),
    t.prototype.equalsParameters = function(n, t) {
        return this.leagueId === n && this.inviterLogin === t
    }
    ,
    t.prototype.canJoinLeague = function(n) {
        return this.leaguePartial() && this.leaguePartial().isJoinable(n)
    }
    ,
    t
}(Invite), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), InvitesPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new InvitePartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.filterWithJoinableLeagues = function(n) {
        return this.getItems().filter(function(t) {
            return t.canJoinLeague(n)
        })
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), RewardPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(Reward), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), RewardsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.unclaimedRewards = ko.computed(function() {
            return Enumerable.from(i.getItems()).where(function(n) {
                return n.status === RewardStatus.Unclaimed
            }).toArray()
        }),
        i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new RewardPartial(n))
        });
        this.setItems(t)
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AdPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i.dimensions = i.getDimensions(),
        i
    }
    return __extends(t, n),
    t.prototype.getDimensions = function() {
        switch (this.position) {
        case Ad.Position.Lead:
            return [new Dimension(728,90), new Dimension(970,90), new Dimension(970,250)];
        case Ad.Position.MRec:
            return [new Dimension(300,250), new Dimension(336,280)];
        case Ad.Position.Hpa:
            return [new Dimension(300,600), new Dimension(160,600), new Dimension(120,600)];
        case Ad.Position.Mobile:
            return [new Dimension(300,250)];
        default:
            return [new Dimension(0,0)]
        }
    }
    ,
    t
}(Ad), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AdsPartial = function(n) {
    function t(t, i) {
        i === void 0 && (i = !1);
        var r = n.call(this) || this;
        return r.isLeaderboardClickEnabled = ko.observable(!0),
        r.setItemsFromModels(t),
        r.initializeAds(i),
        r
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new AdPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.initializeAds = function(n) {
        var t = this;
        googletag.cmd.push(this.detectAdLoad.bind(this));
        googletag.cmd.push(function() {
            googletag.pubads().disableInitialLoad();
            t.getItems().forEach(function(n) {
                var i = [], t;
                n.dimensions.forEach(function(n) {
                    i.push([n.width, n.height])
                });
                t = googletag.defineSlot(n.dfpTag, i, n.dfpAsyncDiv);
                t && t.addService(googletag.pubads())
            });
            googletag.enableServices();
            googletag.pubads().enableSingleRequest();
            googletag.pubads().setRequestNonPersonalizedAds(n ? 0 : 1)
        })
    }
    ,
    t.prototype.detectAdLoad = function() {
        var n = this;
        googletag && googletag.pubadsReady ? googletag.pubads().refresh() : setTimeout(function() {
            n.detectAdLoad()
        }, 500)
    }
    ,
    t.prototype.refreshAds = function(n) {
        appViewModel.adBlockerDetectedObservable() || (googletag.pubads().setRequestNonPersonalizedAds(n ? 0 : 1),
        googletag.pubads().refresh())
    }
    ,
    t.prototype.getAdPartial = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.position === n
        }).orderByDescending(function(n) {
            return n.cultureCode
        }).firstOrDefault()
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TranslationPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(Translation), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TranslationsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new TranslationPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.getTranslation = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.key === n
        })
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TranslationCategoryPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i.translations && i.translationsPartial(new TranslationsPartial(i.translations)),
        i
    }
    return __extends(t, n),
    t.prototype.getTranslation = function(n) {
        return this.translationsPartial() ? this.translationsPartial().getTranslation(n) : null
    }
    ,
    t
}(TranslationCategory), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TranslationCategoriesPartial = function(n) {
    function t() {
        return n.call(this) || this
    }
    return __extends(t, n),
    t.prototype.getTranslation = function(n, t) {
        var i = Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.name === n
        });
        return i ? i.getTranslation(t) : null
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CupRoundPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i.simulationForecastTimestamp = ko.computed(function() {
            return appViewModel.calculateSimulationForecastTimestamp(i.weekNr)
        }),
        i.simulationState = ko.computed(function() {
            return appViewModel.calculateSimulationState(i.weekNr)
        }),
        i.isNextWeek = ko.computed(function() {
            return !appViewModel || !appViewModel.leaguePartial() ? !1 : i.weekNr === appViewModel.leaguePartial().weekNr + 1
        }),
        i.hasPassed = ko.computed(function() {
            return !appViewModel || !appViewModel.leaguePartial() ? !1 : i.weekNr <= appViewModel.leaguePartial().weekNr
        }),
        i
    }
    return __extends(t, n),
    t
}(CupRound), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CupRoundsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new CupRoundPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.isCupRound = function(n) {
        return Enumerable.from(this.getItems()).any(function(t) {
            return t.weekNr === n
        })
    }
    ,
    t.prototype.getCupRoundForWeekNr = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.weekNr === n
        }).firstOrDefault()
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PagingViewModel = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.pageSize = ko.observable(),
        i.currentPage = ko.observable(),
        i.pageItems = ko.computed(function() {
            var n = i.pageSize() * (i.currentPage() - 1);
            return Enumerable.from(i.getItems()).skip(n).take(i.pageSize()).toArray()
        }).extend({
            rateLimit: {
                timeout: 100,
                method: "notifyAtFixedRate"
            }
        }),
        i.pageCount = ko.computed(function() {
            return Math.ceil(i.getItems().length / i.pageSize())
        }),
        i.isGoToPreviousPageDisabled = ko.computed(function() {
            return i.currentPage() <= 1
        }),
        i.isGoToNextPageDisabled = ko.computed(function() {
            return i.currentPage() * i.pageSize() >= i.getItems().length
        }),
        i.pageSize(t),
        i.currentPage(1),
        i
    }
    return __extends(t, n),
    t.prototype.removeItemByFunction = function(t) {
        n.prototype.removeItemByFunction.call(this, t);
        this.pageItems().length === 0 && this.goToPreviousPage()
    }
    ,
    t.prototype.removeItem = function(t) {
        n.prototype.removeItem.call(this, t);
        this.pageItems().length === 0 && this.goToPreviousPage()
    }
    ,
    t.prototype.goToNextPage = function() {
        this.isGoToNextPageDisabled() || this.goToPage(this.currentPage() + 1)
    }
    ,
    t.prototype.goToPreviousPage = function() {
        this.isGoToPreviousPageDisabled() || this.goToPage(this.currentPage() - 1)
    }
    ,
    t.prototype.goToPage = function(n) {
        this.currentPage(n)
    }
    ,
    t
}(PartialArrayViewModel), TutorialPartial = function() {
    function n(n, t) {
        var i = this;
        this.tutorialStep = ko.observable(TutorialStep.NotInTutorial);
        this.visibleStepCount = 5;
        this.isInTutorialMode = ko.computed(function() {
            return i.tutorialStep() !== TutorialStep.NotInTutorial
        });
        this.visibleStep = ko.computed(function() {
            switch (i.tutorialStep()) {
            case TutorialStep.LineupIntro:
            case TutorialStep.LineupOpenFormations:
            case TutorialStep.LineupSelectFormation:
            case TutorialStep.LineupFormationOutro:
            case TutorialStep.LineupDragPlayer:
            case TutorialStep.LineupDropPlayer:
            case TutorialStep.LineupSelectPlayer:
            case TutorialStep.LineupOutro:
                return 1;
            case TutorialStep.MenuTactics:
            case TutorialStep.TacticsIntro:
            case TutorialStep.TacticsChange:
            case TutorialStep.TacticsOutro:
                return 2;
            case TutorialStep.MenuFriendlies:
            case TutorialStep.FriendliesIntro:
            case TutorialStep.FriendliesClaimBossCoins:
            case TutorialStep.FriendliesSelectOpponent:
            case TutorialStep.FriendliesConfirm:
            case TutorialStep.FriendliesCheckImprovement:
            case TutorialStep.FriendliesOutro:
                return 3;
            case TutorialStep.MenuTraining:
            case TutorialStep.TrainingIntro:
            case TutorialStep.TrainingOpenModal:
            case TutorialStep.TrainingSelectPlayer:
            case TutorialStep.TrainingClaimBossCoins:
            case TutorialStep.TrainingBoost:
            case TutorialStep.TrainingConfirmBoost:
            case TutorialStep.TrainingOutro:
            case TutorialStep.TrainingGoHome:
                return 4;
            case TutorialStep.HomeIntro:
            case TutorialStep.HomeTimer:
            case TutorialStep.HomeOpenNotifications:
            case TutorialStep.HomeCheckNotifications:
            case TutorialStep.Reward:
            case TutorialStep.End:
                return 5;
            default:
                return 0
            }
        });
        this.isInMenuNavigationStep = ko.computed(function() {
            var n = [TutorialStep.MenuTactics, TutorialStep.MenuFriendlies, TutorialStep.MenuTraining, TutorialStep.TrainingGoHome];
            return Enumerable.from(n).contains(i.tutorialStep())
        });
        this.isInModalStep = ko.computed(function() {
            var n = [TutorialStep.ChooseTeamChooseLeagueIntro, TutorialStep.ChooseTeamChooseSignContractIntro, TutorialStep.ChooseTeamChooseSignContractOutro, TutorialStep.LineupIntro, TutorialStep.LineupFormationOutro, TutorialStep.LineupOutro, TutorialStep.TacticsIntro, TutorialStep.TacticsOutro, TutorialStep.FriendliesIntro, TutorialStep.FriendliesClaimBossCoins, TutorialStep.FriendliesOutro, TutorialStep.TrainingIntro, TutorialStep.TrainingClaimBossCoins, TutorialStep.TrainingOutro, TutorialStep.HomeIntro];
            return Enumerable.from(n).contains(i.tutorialStep())
        });
        this._tutorialProgressesService = n;
        this._rewardsService = t;
        $.cookie("tutorialStep") && this.tutorialStep(parseInt($.cookie("tutorialStep")))
    }
    return n.prototype.startTutorial = function() {
        var t = this
          , i = LeanplumHelper.getInstance().getVariables("Settings", "IsTutorialEnabled", !0)
          , n = Q.defer();
        return this.updateTutorialStep(TutorialStep.ChooseTeamChooseLeagueIntro, !0).then(function() {
            i ? n.resolve(!0) : t.skipTutorial(!1, !0).then(function() {
                n.resolve(!0)
            }).fail(function() {
                n.reject(!1)
            }).done()
        }).fail(function() {
            n.reject(!1)
        }).done(),
        n.promise
    }
    ,
    n.prototype.skipTutorial = function(n, t) {
        var r = this, i;
        return t === void 0 && (t = !1),
        i = Q.defer(),
        ($.cookie("tutorialStep") || t) && WebApi.getInstance().execute(this._tutorialProgressesService.skipTutorial(n)).then(function(n) {
            r.completeTutorialStepUpdate(n, TutorialStep.Reward, i)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            r.terminateTutorial()
        }).done(),
        i.promise
    }
    ,
    n.prototype.skipTutorialAndRedirect = function() {
        this.skipTutorial(!0).done(function() {
            appViewModel.redirect(RedirectionFlow.AccountState)
        })
    }
    ,
    n.prototype.decideNextStepInTutorial = function() {
        this.tutorialStep() === TutorialStep.HomeTimer ? this.updateTutorialStep(TutorialStep.HomeOpenNotifications) : this.tutorialStep() === TutorialStep.HomeCheckNotifications && this.updateTutorialStep(TutorialStep.Reward)
    }
    ,
    n.prototype.getTutorialStep = function() {
        return WebApi.getInstance().execute(this._tutorialProgressesService.getByIdentity())
    }
    ,
    n.prototype.updateTutorialStep = function(n, t) {
        var r = this, i;
        return t === void 0 && (t = !1),
        i = Q.defer(),
        ($.cookie("tutorialStep") || t) && this.updateTutorialProgress(n).then(function(t) {
            r.completeTutorialStepUpdate(t, n, i)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            r.terminateTutorial()
        }).done(),
        i.promise
    }
    ,
    n.prototype.completeTutorialStepUpdate = function(n, t, i) {
        var r = this;
        t !== TutorialStep.End ? this.insertTutorialReward(t).then(function() {
            r.setTutorialStep(n.step)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            r.terminateTutorial()
        }).fin(function() {
            i.resolve(!0)
        }).done() : i.resolve(!0)
    }
    ,
    n.prototype.updateTutorialProgress = function(n) {
        var r = Enumerable.from([TutorialStep.ChooseTeamChooseLeagueIntro, TutorialStep.ChooseTeamChooseTeamIntro, TutorialStep.ChooseTeamChooseSignContractIntro, TutorialStep.ChooseTeamChooseSignContract]).orderBy(function(n) {
            return n
        }), t, i;
        return !r.contains(n) || SessionManager.getInstance().session ? WebApi.getInstance().execute(this._tutorialProgressesService.updateStep(n)) : (t = Q.defer(),
        i = {
            id: 0,
            userId: 0,
            step: n
        },
        t.resolve(i),
        t.promise)
    }
    ,
    n.prototype.syncTutorial = function(n) {
        var i = this, t;
        return n === void 0 && (n = 1),
        t = Q.defer(),
        WebApi.getInstance().execute(this._tutorialProgressesService.getByIdentity()).then(function(r) {
            r ? r.step < TutorialStep.Reward && (r.step > TutorialStep.ChooseTeamChooseSignContractOutro || SessionManager.hasTeam() || n > 1) ? i.skipTutorial(!1, !0).done(function() {
                t.resolve(!0)
            }) : r.step === TutorialStep.End ? (i.tutorialStep(TutorialStep.End),
            $.removeCookie("tutorialStep", {
                path: "/"
            }),
            t.resolve(!1)) : (i.setTutorialStep(r.step),
            t.resolve(!0)) : (i.tutorialStep(TutorialStep.NotInTutorial),
            $.removeCookie("tutorialStep", {
                path: "/"
            }),
            t.resolve(!1))
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            i.terminateTutorial();
            t.resolve(!1)
        }).done(),
        t.promise
    }
    ,
    n.prototype.claimTutorialReward = function(n) {
        var i = this
          , t = WebApi.getInstance().execute(this._rewardsService.claim(n));
        return t.then(function(n) {
            LeanplumHelper.getInstance().trackEventWithValue(LeanplumTrackingService.Event.BCClaim, n.amount, {
                BCClaimSource: "TutorialRewards"
            })
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n);
            i.terminateTutorial()
        }).done(),
        t
    }
    ,
    n.prototype.setTutorialStep = function(n) {
        this.tutorialStep(n);
        DataLayerHandler.trackTutorialStepUpdated(n);
        $.cookie("tutorialStep", n, {
            path: "/"
        })
    }
    ,
    n.prototype.endTutorial = function() {
        this.tutorialStep(TutorialStep.NotInTutorial);
        this.updateTutorialStep(TutorialStep.End);
        $.removeCookie("tutorialStep", {
            path: "/"
        })
    }
    ,
    n.prototype.terminateTutorial = function() {
        this.tutorialStep(TutorialStep.NotInTutorial);
        this.skipTutorial(!1);
        $.removeCookie("tutorialStep", {
            path: "/"
        })
    }
    ,
    n.prototype.insertTutorialReward = function(n) {
        if (n === TutorialStep.FriendliesClaimBossCoins)
            return WebApi.getInstance().execute(this._rewardsService.postTutorial(RewardType.TutorialFriendly));
        if (n === TutorialStep.TrainingClaimBossCoins)
            return WebApi.getInstance().execute(this._rewardsService.postTutorial(RewardType.TutorialTraining));
        if (n === TutorialStep.Reward)
            return WebApi.getInstance().execute(this._rewardsService.postTutorial(RewardType.TutorialFinish));
        var t = Q.defer();
        return t.resolve(null),
        t.promise
    }
    ,
    n.prototype.getReward = function() {
        var n = Q.defer();
        return this.tutorialStep() === TutorialStep.FriendliesClaimBossCoins ? WebApi.getInstance().execute(this._rewardsService.getSingleByIdentityFilteredByType(RewardType.TutorialFriendly, !1, !1, !1)) : this.tutorialStep() === TutorialStep.TrainingClaimBossCoins ? WebApi.getInstance().execute(this._rewardsService.getSingleByIdentityFilteredByType(RewardType.TutorialTraining, !1, !1, !1)) : this.tutorialStep() === TutorialStep.Reward ? WebApi.getInstance().execute(this._rewardsService.getSingleByIdentityFilteredByType(RewardType.TutorialFinish, !1, !1, !1)) : (n.resolve(null),
        n.promise)
    }
    ,
    n.prototype.hideLoadingOverlay = function() {
        $("#tutorial-overlay").fadeOut()
    }
    ,
    n
}(), ToastTemplate;
(function(n) {
    n[n.TipsToast = 0] = "TipsToast";
    n[n.BossCoinToast = 1] = "BossCoinToast";
    n[n.FeedbackToast = 2] = "FeedbackToast"
}
)(ToastTemplate || (ToastTemplate = {}));
BaseToast = function() {
    function n(n) {
        this.template = ko.observable(ToastTemplate.TipsToast);
        this.isVisible = ko.observable(!1);
        this.closedByUser = ko.observable(!1);
        this.openedByUser = ko.observable(!1);
        this.template(n)
    }
    return n.prototype.show = function() {
        this.isVisible(!0)
    }
    ,
    n.prototype.hide = function() {
        this.isVisible(!1)
    }
    ,
    n.prototype.close = function() {
        this.openedByUser(!1);
        this.closedByUser(!0);
        this.hide()
    }
    ,
    n.prototype.open = function() {
        this.openedByUser(!0);
        this.closedByUser(!1);
        this.show()
    }
    ,
    n.prototype.toggle = function() {
        this.isVisible() ? this.close() : this.open()
    }
    ,
    n
}(),
function(n) {
    n[n.Small = 0] = "Small";
    n[n.Normal = 1] = "Normal";
    n[n.Wide = 2] = "Wide";
    n[n.Large = 3] = "Large"
}(ModalSize || (ModalSize = {})),
function(n) {
    n[n.FullScreen = 0] = "FullScreen";
    n[n.FullScreenMinusMenu = 1] = "FullScreenMinusMenu";
    n[n.Normal = 2] = "Normal"
}(ScreenMode || (ScreenMode = {})),
function(n) {
    n[n.Custom = 0] = "Custom";
    n[n.Generic = 1] = "Generic";
    n[n.Achievement = 2] = "Achievement";
    n[n.Tutorial = 3] = "Tutorial"
}(ModalContainer || (ModalContainer = {})),
function(n) {
    n[n.Confirm = 0] = "Confirm";
    n[n.ConfirmPayment = 1] = "ConfirmPayment";
    n[n.HireTrainer = 2] = "HireTrainer";
    n[n.TrainPlayer = 3] = "TrainPlayer";
    n[n.BuyDomesticPlayer = 4] = "BuyDomesticPlayer";
    n[n.BuyForeignPlayer = 5] = "BuyForeignPlayer";
    n[n.NotEnoughBossCoins = 6] = "NotEnoughBossCoins";
    n[n.NotEnoughClubFunds = 7] = "NotEnoughClubFunds";
    n[n.Achievement = 8] = "Achievement";
    n[n.SellPlayer = 9] = "SellPlayer";
    n[n.OfferPlayer = 10] = "OfferPlayer";
    n[n.CancelTransferPlayer = 11] = "CancelTransferPlayer";
    n[n.InNegotiation = 12] = "InNegotiation";
    n[n.RequestAccessToLeague = 13] = "RequestAccessToLeague";
    n[n.TeamNotAvailable = 14] = "TeamNotAvailable";
    n[n.SignContract = 15] = "SignContract";
    n[n.ManagerName = 16] = "ManagerName";
    n[n.MatchDetails = 17] = "MatchDetails";
    n[n.Player = 18] = "Player";
    n[n.Finance = 19] = "Finance";
    n[n.SelectLineupPlayer = 20] = "SelectLineupPlayer";
    n[n.Formations = 21] = "Formations";
    n[n.Specialists = 22] = "Specialists";
    n[n.Alert = 23] = "Alert";
    n[n.NatFitMorPlayer = 24] = "NatFitMorPlayer";
    n[n.ChooseSponsor = 25] = "ChooseSponsor";
    n[n.SendSpy = 26] = "SendSpy";
    n[n.Pm = 27] = "Pm";
    n[n.Tutorial = 28] = "Tutorial";
    n[n.PreLoader = 29] = "PreLoader";
    n[n.ActivateAccount = 30] = "ActivateAccount";
    n[n.TutorialReward = 31] = "TutorialReward";
    n[n.AddFriends = 32] = "AddFriends";
    n[n.AdyenPayment = 33] = "AdyenPayment";
    n[n.CentiliPayment = 34] = "CentiliPayment";
    n[n.PayByMePayment = 35] = "PayByMePayment";
    n[n.AddNewFriends = 36] = "AddNewFriends";
    n[n.EndOfSeasonReward = 37] = "EndOfSeasonReward";
    n[n.OfferWall = 38] = "OfferWall";
    n[n.InviteReward = 39] = "InviteReward";
    n[n.CantAcceptInvite = 40] = "CantAcceptInvite";
    n[n.NoTeamSlotsAvailable = 41] = "NoTeamSlotsAvailable";
    n[n.FacebookShare = 42] = "FacebookShare";
    n[n.Surfacing = 43] = "Surfacing";
    n[n.AccountSlotLocked = 44] = "AccountSlotLocked";
    n[n.FacebookPayment = 45] = "FacebookPayment";
    n[n.InviteeReward = 46] = "InviteeReward";
    n[n.CreateLeague = 47] = "CreateLeague";
    n[n.ChooseLeagueSearch = 48] = "ChooseLeagueSearch";
    n[n.ModeratorTools = 49] = "ModeratorTools";
    n[n.CannotCreateLeagueGoToStore = 50] = "CannotCreateLeagueGoToStore";
    n[n.SuperSonicVideoAds = 51] = "SuperSonicVideoAds";
    n[n.ConnectAccount = 52] = "ConnectAccount";
    n[n.ConfirmChangeLeagueSetting = 53] = "ConfirmChangeLeagueSetting";
    n[n.TargetPayPayment = 54] = "TargetPayPayment";
    n[n.Euro2016Ranking = 55] = "Euro2016Ranking";
    n[n.NewsUpdate = 56] = "NewsUpdate";
    n[n.AlertErrorRefresh = 57] = "AlertErrorRefresh";
    n[n.ReportCheater = 58] = "ReportCheater";
    n[n.AppSurfacing = 59] = "AppSurfacing";
    n[n.FacebookConnected = 60] = "FacebookConnected";
    n[n.ChangeEmail = 61] = "ChangeEmail";
    n[n.ChangePassword = 62] = "ChangePassword";
    n[n.DeleteAccount = 63] = "DeleteAccount";
    n[n.ChangeAvatar = 64] = "ChangeAvatar";
    n[n.PromoCode = 65] = "PromoCode";
    n[n.ClaimPromoCode = 66] = "ClaimPromoCode";
    n[n.WorldmapHistory = 67] = "WorldmapHistory";
    n[n.StadiumHelpText = 68] = "StadiumHelpText";
    n[n.TrainingHelpText = 69] = "TrainingHelpText";
    n[n.DoctorHelpText = 70] = "DoctorHelpText";
    n[n.LawyerHelpText = 71] = "LawyerHelpText";
    n[n.CreateCrew = 72] = "CreateCrew";
    n[n.CrewSettings = 73] = "CrewSettings";
    n[n.CrewChangeAvatar = 74] = "CrewChangeAvatar";
    n[n.Agent = 75] = "Agent";
    n[n.CalendarLastDayHelpText = 76] = "CalendarLastDayHelpText";
    n[n.CreateLeagueHelpText = 77] = "CreateLeagueHelpText";
    n[n.CrewChangeCoverImage = 78] = "CrewChangeCoverImage";
    n[n.CrewLandingPageHelpText = 79] = "CrewLandingPageHelpText";
    n[n.SquadHelpText = 80] = "SquadHelpText";
    n[n.TacticsHelpText = 81] = "TacticsHelpText";
    n[n.LineupHelpText = 82] = "LineupHelpText";
    n[n.TransferlistHelpText = 83] = "TransferlistHelpText";
    n[n.SponsorHelpText = 84] = "SponsorHelpText";
    n[n.BusinessClubHelpText = 85] = "BusinessClubHelpText";
    n[n.CrewInviteFriends = 86] = "CrewInviteFriends";
    n[n.LeagueSettingAlert = 87] = "LeagueSettingAlert";
    n[n.CrewSelectTeamSlot = 88] = "CrewSelectTeamSlot";
    n[n.AdSetting = 89] = "AdSetting";
    n[n.PrivacyStatement = 90] = "PrivacyStatement";
    n[n.CrewBattleResults = 91] = "CrewBattleResults";
    n[n.CrewRankingTopHundred = 92] = "CrewRankingTopHundred";
    n[n.SquadNumbers = 93] = "SquadNumbers";
    n[n.BosscoinShop = 94] = "BosscoinShop";
    n[n.ConfirmLoginNameSuggestion = 95] = "ConfirmLoginNameSuggestion";
    n[n.WatchVideos = 96] = "WatchVideos";
    n[n.NextCareerStepHelpText = 97] = "NextCareerStepHelpText";
    n[n.GDPRStatement = 98] = "GDPRStatement";
    n[n.ChooseTeamHelpText = 99] = "ChooseTeamHelpText";
    n[n.CrewSetSocialProvider = 100] = "CrewSetSocialProvider";
    n[n.ChooseLeagueBetaHelpText = 101] = "ChooseLeagueBetaHelpText";
    n[n.Credits = 102] = "Credits";
    n[n.KnockoutProgression = 103] = "KnockoutProgression";
    n[n.SpyHelpText = 104] = "SpyHelpText";
    n[n.TicketCreatedHelpText = 105] = "TicketCreatedHelpText";
    n[n.TicketHelpText = 106] = "TicketHelpText";
    n[n.GenericVipTicketHelpText = 107] = "GenericVipTicketHelpText";
    n[n.SpecificVipTicketHelpText = 108] = "SpecificVipTicketHelpText";
    n[n.NextWinnersLeagueHelpText = 109] = "NextWinnersLeagueHelpText";
    n[n.TicketQueuedHelpText = 110] = "TicketQueuedHelpText";
    n[n.OccupiedForWinnersLeagueHelpText = 111] = "OccupiedForWinnersLeagueHelpText";
    n[n.Store = 112] = "Store";
    n[n.StoreInfoTextModal = 113] = "StoreInfoTextModal";
    n[n.TicketQualificationHelpText = 114] = "TicketQualificationHelpText";
    n[n.HelpText = 115] = "HelpText";
    n[n.FakeGermanyHelpText = 116] = "FakeGermanyHelpText";
    n[n.FinanceWithMultiStep = 117] = "FinanceWithMultiStep";
    n[n.FriendsDivisions = 118] = "FriendsDivisions";
    n[n.SkillRatingUpdate = 119] = "SkillRatingUpdate";
    n[n.SkillRatingUpdateHelpText = 120] = "SkillRatingUpdateHelpText";
    n[n.OccupiedForFantasyLeagueHelpText = 121] = "OccupiedForFantasyLeagueHelpText";
    n[n.FantasyLeagueNotSupportedHelpText = 122] = "FantasyLeagueNotSupportedHelpText";
    n[n.FantasyLeagueHelpText = 123] = "FantasyLeagueHelpText";
    n[n.FantasyLeagueInQueueHelpText = 124] = "FantasyLeagueInQueueHelpText";
    n[n.FantasyLeagueIntro = 125] = "FantasyLeagueIntro";
    n[n.AppInbox = 126] = "AppInbox";
    n[n.FantasyLeagueInQueue = 127] = "FantasyLeagueInQueue";
    n[n.Terms = 128] = "Terms";
    n[n.PrizePoolNotSupportedHelpText = 129] = "PrizePoolNotSupportedHelpText";
    n[n.PrizePoolHelpText = 130] = "PrizePoolHelpText";
    n[n.PrizePoolIntro = 131] = "PrizePoolIntro";
    n[n.PrizePoolProgression = 132] = "PrizePoolProgression";
    n[n.PrizePoolRewardsInfo = 133] = "PrizePoolRewardsInfo";
    n[n.InPrizePoolQueueHelpText = 134] = "InPrizePoolQueueHelpText";
    n[n.CenterPopup = 135] = "CenterPopup";
    n[n.PlayerInTrainingForLineupAlert = 136] = "PlayerInTrainingForLineupAlert";
    n[n.ShareLineupScreenshot = 137] = "ShareLineupScreenshot";
    n[n.RevealScoutedPlayers = 138] = "RevealScoutedPlayers";
    n[n.ScoutResultFeedback = 139] = "ScoutResultFeedback";
    n[n.LeagueInviteFriends = 140] = "LeagueInviteFriends";
    n[n.TodoHighlight = 141] = "TodoHighlight"
}(ModalTemplate || (ModalTemplate = {}));
var BaseModal = function() {
    function n(n, t, i) {
        var r = this;
        n === void 0 && (n = {});
        t === void 0 && (t = LeanplumTrackingService.State.None);
        i === void 0 && (i = null);
        this._leanplumState = LeanplumTrackingService.State.None;
        this._leanplumParameters = null;
        this.options = ko.observable({
            screenModeXs: ScreenMode.FullScreen,
            screenModeMd: ScreenMode.Normal,
            screenModeLg: ScreenMode.Normal,
            showCloseButton: !1,
            centerContentsMobile: !0,
            hideOnBackdropClick: !0,
            animation: "fade",
            template: ModalTemplate.Confirm,
            container: ModalContainer.Custom,
            url: "Base",
            modalSize: ModalSize.Normal
        });
        this.showEventFunction = function() {}
        ;
        this.shownEventFunction = function() {}
        ;
        this.hideEventFunction = function() {}
        ;
        this.hiddenEventFunction = function() {}
        ;
        this.classes = ko.computed(function() {
            var n = r.options().animation;
            return r.options().screenModeXs === ScreenMode.FullScreen && (n += " modal-xs-fullscreen"),
            r.options().screenModeXs === ScreenMode.FullScreenMinusMenu && (n += " modal-xs-fullscreen-minus-menu"),
            r.options().screenModeXs === ScreenMode.Normal && (n += " modal-xs-normal"),
            r.options().screenModeMd === ScreenMode.FullScreen && (n += " modal-md-fullscreen"),
            r.options().screenModeMd === ScreenMode.FullScreenMinusMenu && (n += " modal-md-fullscreen-minus-menu"),
            r.options().screenModeMd === ScreenMode.Normal && (n += " modal-md-normal"),
            r.options().screenModeLg === ScreenMode.FullScreen && (n += " modal-lg-fullscreen"),
            r.options().screenModeLg === ScreenMode.FullScreenMinusMenu && (n += " modal-lg-fullscreen-minus-menu"),
            r.options().screenModeLg === ScreenMode.Normal && (n += " modal-lg-normal"),
            r.options().modalSize === ModalSize.Small && (n += " small-modal"),
            r.options().modalSize === ModalSize.Wide && (n += " wide-modal"),
            r.options().modalSize === ModalSize.Large && (n += " large-modal"),
            r.options().centerContentsMobile || (n += " no-center-mobile"),
            n
        });
        this.options($.extend(!0, this.options(), n));
        t && (this._leanplumState = t);
        i && (this._leanplumParameters = i)
    }
    return n.prototype.create = function() {
        var n = this
          , t = Q.defer();
        return ko.renderTemplate("modal-" + ModalTemplate[this.options().template].toLowerCase(), this, {
            afterRender: function(i) {
                n._modalContainer = $(Enumerable.from(i).firstOrDefault(function(n) {
                    return n.nodeType === 1
                }, null));
                n._modalContainer.on("show.bs.modal", n.showEventFunction);
                n._modalContainer.on("shown.bs.modal", n.shownEventFunction);
                n._modalContainer.on("hide.bs.modal", n.hideEventFunction);
                n._modalContainer.on("hidden.bs.modal", n.hiddenEventFunction);
                t.resolve(n._modalContainer)
            }
        }, $("#" + ModalContainer[this.options().container].toLowerCase() + "ModalContainer")[0], "replaceChildren"),
        t.promise
    }
    ,
    n.prototype.hide = function() {
        this._modalContainer && $(this._modalContainer).modal("hide");
        this._leanplumState && LeanplumHelper.getInstance().modalClosed()
    }
    ,
    n.prototype.isVisible = function() {
        return this._modalContainer ? $(this._modalContainer).hasClass("in") : !1
    }
    ,
    n.prototype.closeButtonClicked = function() {}
    ,
    n.prototype.backdropClicked = function() {}
    ,
    n.prototype.show = function() {
        var n = this;
        this.create().then(function(t) {
            $(t).modal({
                backdrop: !1
            }).show();
            n._leanplumState && n._leanplumParameters ? LeanplumHelper.getInstance().modalOpened(n._leanplumState, n._leanplumParameters) : n._leanplumState && LeanplumHelper.getInstance().modalOpened(n._leanplumState);
            n.options().templateForTracking !== null ? DataLayerHandler.trackModalOpened(n.options().templateForTracking) : DataLayerHandler.trackModalOpened(n.options().template);
            n.options().hideOnBackdropClick && $(t).find(".modal-backdrop").click(function() {
                n.backdropClicked();
                n.hide()
            })
        })
    }
    ,
    n
}()
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , CenterPopupModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            template: ModalTemplate.CenterPopup,
            showCloseButton: !0,
            container: ModalContainer.Generic,
            hideOnBackdropClick: !0,
            screenModeXs: ScreenMode.FullScreen
        }) || this;
        return i.centerPopupMessagePartial = ko.observable(),
        i.centerPopupMessagePartial(t),
        i.hideEventFunction = function() {
            i._confirmDeferred.resolve()
        }
        ,
        i
    }
    return __extends(t, n),
    t.prototype.show = function() {
        return this._confirmDeferred = Q.defer(),
        n.prototype.show.call(this),
        this._confirmDeferred.promise
    }
    ,
    t.prototype.onAcceptButtonClick = function() {
        this.hide();
        this.centerPopupMessagePartial().runAcceptAction()
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BaseSurfacingModal = function(n) {
    function t(t) {
        return n.call(this, {
            template: t,
            showCloseButton: !0,
            hideOnBackdropClick: !1,
            modalSize: ModalSize.Normal
        }) || this
    }
    return __extends(t, n),
    t.prototype.showModal = function() {
        return this.show(),
        Q.resolve(!0)
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BaseConfirmModal = function(n) {
    function t(t, i, r, u, f) {
        i === void 0 && (i = !0);
        r === void 0 && (r = !0);
        u === void 0 && (u = LeanplumTrackingService.State.None);
        f === void 0 && (f = ModalSize.Small);
        var e = n.call(this, {
            modalSize: f,
            template: t,
            showCloseButton: i,
            container: ModalContainer.Generic,
            hideOnBackdropClick: r
        }, u) || this;
        return e.hideEventFunction = function() {
            var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("confirm modal was hidden.");
            e._confirmDeferred.reject(n)
        }
        ,
        e
    }
    return __extends(t, n),
    t.prototype.okAction = function() {
        this._confirmDeferred.resolve(!0);
        this.hide()
    }
    ,
    t.prototype.cancelAction = function() {
        this.hide()
    }
    ,
    t.prototype.show = function() {
        return this._confirmDeferred = Q.defer(),
        n.prototype.show.call(this),
        this._confirmDeferred.promise
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ConfirmModal = function(n) {
    function t(i, r, u, f) {
        u === void 0 && (u = t.ConfirmModalType.Default);
        f === void 0 && (f = LeanplumTrackingService.State.None);
        var e = n.call(this, ModalTemplate.Confirm, !0, !0, f) || this;
        return e.title = ko.observable(),
        e.content = ko.observable(),
        e.confirmModalType = ko.observable(),
        e.cancelButtonText = ko.observable(""),
        e.okButtonText = ko.observable(""),
        e.confirmModalType(u),
        e.title(i),
        e.content(r),
        e
    }
    return __extends(t, n),
    t
}(BaseConfirmModal);
(function(n) {
    var t;
    (function(n) {
        n[n.Default = 0] = "Default";
        n[n.SingleButton = 1] = "SingleButton"
    }
    )(t = n.ConfirmModalType || (n.ConfirmModalType = {}))
}
)(ConfirmModal || (ConfirmModal = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ConfirmPaymentModal = function(n) {
    function t(t, i, r, u, f, e, o, s) {
        e === void 0 && (e = !0);
        o === void 0 && (o = !0);
        s === void 0 && (s = "");
        var h = n.call(this, ModalTemplate.ConfirmPayment, e, o) || this;
        return h.paidGameOption = ko.observable(),
        h.clubFundsCost = ko.observable(),
        h.bossCoinCost = ko.observable(),
        h.isClubFundsComplement = ko.observable(),
        h.playerName = ko.observable(""),
        h.teamName = ko.observable(""),
        h.paidGameOption(t),
        h.clubFundsCost(i),
        h.bossCoinCost(r),
        h.isClubFundsComplement(u),
        h.playerName(f),
        h.teamName(s),
        h
    }
    return __extends(t, n),
    t
}(BaseConfirmModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , CreditsModal = function(n) {
    function t() {
        var t = n.call(this, {
            template: ModalTemplate.Credits,
            modalSize: ModalSize.Normal,
            showCloseButton: !0,
            hideOnBackdropClick: !0
        }) || this;
        return t.shownEventFunction = function() {
            $("#modal-dialog-credits .modal-body").scrollTop(0).animate({
                scrollTop: $("#modal-dialog-credits .modal-body > div").height() + 400
            }, 2e4, "linear", function() {
                t.hide()
            });
            $("#modal-dialog-credits .modal-body").click(function() {
                t.stopAnimating()
            })
        }
        ,
        t.hideEventFunction = function() {
            t.stopAnimating()
        }
        ,
        t
    }
    return __extends(t, n),
    t.prototype.stopAnimating = function() {
        $("#modal-dialog-credits .modal-body").stop()
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BaseAlertModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            modalSize: ModalSize.Small,
            template: t,
            showCloseButton: !0,
            container: ModalContainer.Generic
        }) || this;
        return i.hideEventFunction = function() {
            i._alertDeferred.resolve(!0)
        }
        ,
        i
    }
    return __extends(t, n),
    t.prototype.okAction = function() {
        this._alertDeferred.resolve(!0);
        this.hide()
    }
    ,
    t.prototype.show = function() {
        return this._alertDeferred = Q.defer(),
        n.prototype.show.call(this),
        this._alertDeferred.promise
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , AlertModal = function(n) {
    function t(t, i) {
        var r = n.call(this, ModalTemplate.Alert) || this;
        return r.title = ko.observable(),
        r.content = ko.observable(),
        r.okButtonText = ko.observable(""),
        r.title(t),
        r.content(i),
        r
    }
    return __extends(t, n),
    t
}(BaseAlertModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , NotEnoughClubFundsModal = function(n) {
    function t(t, i, r) {
        r === void 0 && (r = !0);
        var u = n.call(this, ModalTemplate.NotEnoughClubFunds, !0, !0, LeanplumTrackingService.State.None, ModalSize.Normal) || this;
        return u.clubFunds = ko.observable(0),
        u.bossCoins = ko.observable(0),
        u.clubFunds(t),
        u.bossCoins(i),
        u.isBossCoinCompletionAllowed = r,
        u
    }
    return __extends(t, n),
    t
}(BaseConfirmModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , __assign = this && this.__assign || function() {
    return __assign = Object.assign || function(n) {
        for (var t, r, i = 1, u = arguments.length; i < u; i++) {
            t = arguments[i];
            for (r in t)
                Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
        }
        return n
    }
    ,
    __assign.apply(this, arguments)
}
  , NotEnoughBossCoinsModal = function(n) {
    function t(t, i, r, u) {
        i === void 0 && (i = !1);
        u === void 0 && (u = {});
        var f = n.call(this, ModalTemplate.NotEnoughBossCoins, !0, !0, LeanplumTrackingService.State.NotEnoughBosscoins, ModalSize.Normal) || this;
        return f.cost = 0,
        f.shortage = 0,
        f.isClubFundsComplement = ko.observable(!1),
        f.cost = t,
        f.shortage = t - appViewModel.bossCoinWalletPartial().amount,
        f.isClubFundsComplement(i),
        r && (u = __assign(__assign({}, u), {
            BCProduct: r
        })),
        LeanplumHelper.getInstance().trackEventWithValue(LeanplumTrackingService.Event.NotEnoughBC, t, __assign(__assign({}, u), {
            NotEnoughBCAmount: f.shortage.toString()
        })),
        f
    }
    return __extends(t, n),
    t.prototype.okAction = function() {
        n.prototype.okAction.call(this)
    }
    ,
    t
}(BaseConfirmModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , FinanceModal = function(n) {
    function t(t, i) {
        var r = n.call(this, {
            template: ModalTemplate.Finance,
            container: ModalContainer.Custom,
            showCloseButton: !0
        }) || this;
        return r.isTransfering = ko.observable(!1),
        r.moneyTransferType = ko.observable(MoneyTransferType.Withdraw),
        r.balanceProgress = new ProgressHelper(0),
        r.savingsProgress = new ProgressHelper(0),
        r._isLoaded = ko.observable(!1),
        r.isLoaded = ko.computed(function() {
            return r._isLoaded()
        }),
        r._teamFinancesService = t,
        r.teamPartial = i,
        WebApi.getInstance().execute(r._teamFinancesService.getByTeam(r.teamPartial().leagueId, r.teamPartial().id)).then(function(n) {
            r.teamPartial().financePartial(new TeamFinancePartial(n));
            r._isLoaded(!0)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        r.updateProgresses(r.teamPartial(), !1),
        r.projectedIncome = ko.computed(function() {
            var n = 0;
            return !r.teamPartial() || !r.teamPartial().financePartial() ? n : (n += r.teamPartial().budget + r.teamPartial().financePartial().interest,
            n += r.teamPartial().financePartial().boardingSponsors,
            n + r.teamPartial().financePartial().gateReciepts)
        }),
        r.toggleMoneyTransferType(),
        r
    }
    return __extends(t, n),
    t.prototype.toggleMoneyTransferType = function() {
        this.teamPartial().finance.savings > this.teamPartial().finance.balance ? this.moneyTransferType(MoneyTransferType.Withdraw) : this.moneyTransferType(MoneyTransferType.Deposit)
    }
    ,
    t.prototype.transferMoney = function() {
        var n = this;
        this.teamPartial() && (this.isTransfering(!0),
        CacheHandler.getInstance().removeKeysStartingWith(CacheKey.Teams),
        WebApi.getInstance().execute(this._teamFinancesService.transfer(SessionManager.getLeagueId(), SessionManager.getTeamId())).then(function(t) {
            n.teamPartial().finance = t;
            n.teamPartial().financePartial(new TeamFinancePartial(t));
            appViewModel.clubFundsWalletPartial().updateProgress();
            n.updateProgresses(n.teamPartial(), !0);
            n.toggleMoneyTransferType()
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n)
        }).fin(function() {
            n.isTransfering(!1)
        }).done())
    }
    ,
    t.prototype.updateProgresses = function(n, t) {
        n && n.financePartial() && (this.balanceProgress.updateProgress(n.financePartial().balance),
        this.savingsProgress.updateProgress(n.financePartial().savings),
        t || (this.balanceProgress.stopAnimating(),
        this.savingsProgress.stopAnimating()))
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , FinanceWithMultiStepModal = function(n) {
    function t(i, r, u) {
        var f = n.call(this, {
            template: ModalTemplate.FinanceWithMultiStep,
            container: ModalContainer.Custom,
            showCloseButton: !0,
            modalSize: ModalSize.Wide
        }) || this;
        return f.isTransfering = ko.observable(!1),
        f.moneyTransferType = ko.observable(MoneyTransferType.Withdraw),
        f.balanceProgress = new ProgressHelper(0),
        f.savingsProgress = new ProgressHelper(0),
        f.activeFinanceTab = ko.observable(t.FinanceTabs.Savings),
        f.activeSlyItem = ko.observable(),
        f.isWatchingVideo = ko.observable(!1),
        f.isAnimatingWithdraw = ko.observable(!1),
        f.isAnimatingDeposit = ko.observable(!1),
        f.isLoaded = ko.observable(!1),
        f._teamFinancesService = i,
        f._watchVideosService = u,
        f.teamPartial = r,
        WebApi.getInstance().execute(f._teamFinancesService.getByTeam(f.teamPartial().leagueId, f.teamPartial().id)).then(function(n) {
            f.teamPartial().financePartial(new TeamFinancePartial(n));
            f.isLoaded(!0)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        f.updateProgresses(f.teamPartial(), !1),
        f.projectedIncome = ko.pureComputed(function() {
            var n = 0;
            return !f.teamPartial() || !f.teamPartial().financePartial() ? n : (n += f.teamPartial().budget + f.teamPartial().financePartial().interest,
            n += f.teamPartial().financePartial().boardingSponsors,
            n + f.teamPartial().financePartial().gateReciepts)
        }),
        appViewModel.multiStepVideoCapsReached() && f.activeSlyItem(appViewModel.multiStepVideoCapsReached().getIndexOfFirstAvailablePlacement()),
        f.toggleMoneyTransferType(),
        f
    }
    return __extends(t, n),
    t.prototype.getCapReachedForStep = function(n) {
        return Enumerable.from(appViewModel.multiStepVideoCapsReached().getItems()).firstOrDefault(function(t) {
            return t.placement === "Multistep" + n
        })
    }
    ,
    t.prototype.getMultiStepActionRewardForStep = function(n) {
        return Enumerable.from(appViewModel.actionRewardsPartial().getItems()).firstOrDefault(function(t) {
            return t.id === "Multistep" + n
        })
    }
    ,
    t.prototype.getLpRewardVariationForStep = function(n) {
        return LeanplumHelper.getInstance().getVariables("MultistepRV", "Multistep" + n, 0)
    }
    ,
    t.prototype.getFirstAvailableMultistepPlacementName = function() {
        var n, t;
        return (t = (n = appViewModel.multiStepVideoCapsReached()) === null || n === void 0 ? void 0 : n.getFirstCapPlacementByIsReached(!1)) !== null && t !== void 0 ? t : ""
    }
    ,
    t.prototype.getLastSeenCapReached = function() {
        var n, t, i = (n = appViewModel.multiStepVideoCapsReached()) === null || n === void 0 ? void 0 : n.getFirstCapPlacementByIsReached(!0);
        return i ? Enumerable.from((t = appViewModel.multiStepVideoCapsReached()) === null || t === void 0 ? void 0 : t.getItems()).firstOrDefault(function(n) {
            return n.placement === i
        }) : null
    }
    ,
    t.prototype.setActiveFinanceTab = function(n) {
        this.activeFinanceTab(n)
    }
    ,
    t.prototype.setupClubFundsRewardWatchVideoModal = function(n, t) {
        var i = this
          , u = {
            leagueId: SessionManager.getLeagueId(),
            teamId: SessionManager.getTeamId(),
            placement: n.id,
            rewardVariation: t.variation,
            capVariation: 0
        }
          , r = new WatchVideosModal(new IncentiveProviderCountriesService,new IncentiveProviderService,new WatchVideosService,new ActionRewardsService,new BossCoinsService,WatchVideoPlacementType.MultiStepCFReward,u);
        return r.videoWatchedRewardAnnouncer.subscribe(function(t) {
            t.then(function() {
                i.refreshVideoCaps();
                r.hideEventDeferred.promise.then(function() {
                    appViewModel.multiStepVideoCapsReached().updateCapReachedForPlacement(n.id, !0);
                    appViewModel.refreshClubFundsWallet().then(function() {
                        i.updateProgresses(appViewModel.teamPartial(), !0)
                    });
                    i.show()
                })
            }).fail(function() {}).done()
        }),
        r
    }
    ,
    t.prototype.setupBossCoinRewardWatchVideoModal = function(n, t) {
        var i = this
          , u = {
            placement: n.id,
            rewardVariation: t.variation,
            capVariation: 0
        }
          , r = new WatchVideosModal(new IncentiveProviderCountriesService,new IncentiveProviderService,new WatchVideosService,new ActionRewardsService,new BossCoinsService,WatchVideoPlacementType.MultiStepBCReward,u);
        return r.videoWatchedRewardAnnouncer.subscribe(function(t) {
            i.refreshVideoCaps();
            t.then(function(t) {
                appViewModel.multiStepVideoCapsReached().updateCapReachedForPlacement(n.id, !0);
                appViewModel.bossCoinWalletPartial().updateWallet(t);
                i.show()
            }).fail(function() {}).done()
        }),
        r
    }
    ,
    t.prototype.watchMultiStepVideo = function(n, t) {
        var r = this, i;
        if ((n === null || n === void 0 ? void 0 : n.id) === this.getFirstAvailableMultistepPlacementName()) {
            switch (t.type) {
            case RewardVariation.RewardType.ClubFunds:
                i = this.setupClubFundsRewardWatchVideoModal(n, t);
                break;
            case RewardVariation.RewardType.BossCoins:
                i = this.setupBossCoinRewardWatchVideoModal(n, t)
            }
            i.show().fail(function() {}).fin(function() {
                r.isWatchingVideo(!1)
            }).done()
        }
    }
    ,
    t.prototype.refreshVideoCaps = function() {
        var i = this, n = Q.defer(), t;
        return CacheHandler.getInstance().removeKey(CacheKey[CacheKey.VideoCaps]),
        t = this._watchVideosService.getCaps(WatchVideoPlacementGroup.MultiStep),
        WebApi.getInstance().execute(t).then(function(t) {
            appViewModel.multiStepVideoCapsReached(new CapsReachedPartial(t));
            i.activeSlyItem(appViewModel.multiStepVideoCapsReached().getIndexOfFirstAvailablePlacement());
            n.resolve()
        }).fail(function(t) {
            n.reject("Could not retrieve videocaps.");
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t)
        }).done(),
        n.promise
    }
    ,
    t.prototype.toggleMoneyTransferType = function() {
        this.teamPartial().finance.savings > this.teamPartial().finance.balance ? this.moneyTransferType(MoneyTransferType.Withdraw) : this.moneyTransferType(MoneyTransferType.Deposit)
    }
    ,
    t.prototype.transferMoney = function() {
        var n = this, t;
        this.teamPartial() && (this.isTransfering(!0),
        CacheHandler.getInstance().removeKeysStartingWith(CacheKey.Teams),
        this.moneyTransferType() === MoneyTransferType.Withdraw ? this.isAnimatingWithdraw(!0) : this.moneyTransferType() === MoneyTransferType.Deposit && this.isAnimatingDeposit(!0),
        t = window.setTimeout(function() {
            n.isAnimatingWithdraw(!1);
            n.isAnimatingDeposit(!1)
        }, 1e3),
        WebApi.getInstance().execute(this._teamFinancesService.transfer(SessionManager.getLeagueId(), SessionManager.getTeamId())).then(function(t) {
            n.teamPartial().finance = t;
            n.teamPartial().financePartial(new TeamFinancePartial(t));
            appViewModel.clubFundsWalletPartial().updateProgress();
            n.updateProgresses(n.teamPartial(), !0);
            n.toggleMoneyTransferType()
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n)
        }).fin(function() {
            n.isTransfering(!1)
        }).done())
    }
    ,
    t.prototype.updateProgresses = function(n, t) {
        n && n.financePartial() && (this.balanceProgress.updateProgress(n.financePartial().balance),
        this.savingsProgress.updateProgress(n.financePartial().savings),
        t || (this.balanceProgress.stopAnimating(),
        this.savingsProgress.stopAnimating()))
    }
    ,
    t
}(BaseModal);
(function(n) {
    var t;
    (function(n) {
        n[n.Savings = 0] = "Savings";
        n[n.Income = 1] = "Income"
    }
    )(t = n.FinanceTabs || (n.FinanceTabs = {}))
}
)(FinanceWithMultiStepModal || (FinanceWithMultiStepModal = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , PrivacyStatementModal = function(n) {
    function t() {
        return n.call(this, {
            modalSize: ModalSize.Normal,
            template: ModalTemplate.PrivacyStatement,
            showCloseButton: !0,
            container: ModalContainer.Generic
        }) || this
    }
    return __extends(t, n),
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TermsModal = function(n) {
    function t() {
        return n.call(this, {
            modalSize: ModalSize.Normal,
            template: ModalTemplate.Terms,
            showCloseButton: !0,
            container: ModalContainer.Generic
        }) || this
    }
    return __extends(t, n),
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ActivateAccountModal = function(n) {
    function t(i, r, u, f) {
        var e, o;
        return u === void 0 && (u = ""),
        f === void 0 && (f = ""),
        e = n.call(this, {
            template: ModalTemplate.ActivateAccount,
            modalSize: ModalSize.Small,
            showCloseButton: !0,
            hideOnBackdropClick: !u && !f
        }) || this,
        e.resendActivationEmail = ko.observable(""),
        e.activationCode = ko.observable(""),
        e.activationEmail = ko.observable(""),
        e.activationEmailErrorMessage = ko.observable(""),
        e.activationErrorMessage = ko.observable(""),
        e.isActivatingWithFacebook = ko.observable(!1),
        e.isSendingActivationMail = ko.observable(!1),
        e.activationEmailSent = ko.observable(!1),
        e.activationConfirmed = ko.observable(!1),
        e.isActivating = ko.observable(!1),
        e.isLoggedIn = ko.observable(!1),
        e.facebookErrorFeedback = ko.observable(""),
        e.invalidEmail = ko.observable(!1),
        e.determineViewType = ko.computed(function() {
            return !e.activationCode() && !e.activationEmail() ? t.ViewType.ResendActivationMail : e.activationCode() && e.activationEmail() ? t.ViewType.ActivateAccount : t.ViewType.ResendActivationMail
        }),
        e.isLoggedIn(SessionManager.getInstance().session !== null && SessionManager.getInstance().session !== undefined),
        e.activationCode(u),
        e.activationEmail(f),
        e._accountService = i,
        e._redirectionService = r,
        e.hideEventFunction = function() {
            location.pathname.toLowerCase().indexOf(Urls.activateAccount.toLowerCase()) === 0 && appViewModel.redirect(RedirectionFlow.AccountSelect)
        }
        ,
        e.activationCode() && e.activationEmail() && e.activateAccount(),
        o = $.cookie(CookieHelper.CookieKeys.unconfirmedActivationEmail),
        o && (e.activationEmailSent(!0),
        e.resendActivationEmail(o)),
        e
    }
    return __extends(t, n),
    t.prototype.activateAccountWithFacebook = function() {
        var n = this;
        this.isActivatingWithFacebook(!0);
        appViewModel.facebookPartial().ensurePermission("email").then(function() {
            appViewModel.facebookPartial().ensureAccessToken().then(function(t) {
                n.connectAndActivate(t).then(function() {
                    WebApi.getInstance().refreshToken().then(function() {
                        appViewModel.facebookPartial().loadFacebookUserPartial().done()
                    }).done()
                })
            }).fail(function(t) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
                n.isActivatingWithFacebook(!1)
            }).done()
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n.isActivatingWithFacebook(!1)
        }).done()
    }
    ,
    t.prototype.connectAndActivate = function(n) {
        var t = this
          , i = Q.defer();
        return WebApi.getInstance().execute(this._accountService.addExternal(n, appViewModel.sessionSettings.webapiClientId, appViewModel.sessionSettings.webapiClientSecret, ExternalType.Facebook)).then(function() {
            t.completeActivation();
            t.isActivatingWithFacebook(!1)
        }).fail(function(n) {
            n instanceof WebApiError && WebapiHelper.handleAndAlertError(n)
        }).done(function() {
            i.resolve()
        }),
        i.promise
    }
    ,
    t.prototype.completeActivation = function() {
        this.activationConfirmed(!0);
        appViewModel.userPartial().showActivateAccountNotification(!1);
        appViewModel.userPartial().showUnconfirmedEmailNotification(!1);
        CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserWithTeamSlots]);
        this.hide()
    }
    ,
    t.prototype.sendActivationMail = function() {
        var n = this;
        if (!Helper.isEmailValid(this.resendActivationEmail())) {
            this.invalidEmail(!0);
            return
        }
        this.isSendingActivationMail(!0);
        WebApi.getInstance().execute(this._accountService.sendActivationMail(this.resendActivationEmail())).then(function() {
            n.activationEmailSent(!0);
            $.cookie(CookieHelper.CookieKeys.unconfirmedActivationEmail, n.resendActivationEmail(), {
                expires: 9999,
                path: "/"
            });
            appViewModel.userPartial().showUnconfirmedEmailNotification(!0);
            appViewModel.userPartial().showActivateAccountNotification(!1)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            t instanceof WebApiError && n.activationEmailErrorMessage(t.getFirstError().value)
        }).fin(function() {
            n.isSendingActivationMail(!1);
            n.invalidEmail(!1)
        }).done()
    }
    ,
    t.prototype.resendActivationMail = function() {
        this.activationEmailSent(!1)
    }
    ,
    t.prototype.activateAccount = function() {
        var n = this;
        this.isActivating(!0);
        WebApi.getInstance().execute(this._accountService.activateAccount(this.activationEmail(), this.activationCode())).then(function() {
            n.isLoggedIn() ? WebApi.getInstance().refreshToken().then(function() {
                n.activationConfirmed(!0);
                CacheHandler.getInstance().removeKeysStartingWith(CacheKey.UserWithTeamSlots)
            }).done() : n.activationConfirmed(!0)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            t instanceof WebApiError && n.activationEmailErrorMessage(t.getFirstError().value)
        }).fin(function() {
            n.isActivating(!1);
            $.removeCookie(CookieHelper.CookieKeys.unconfirmedActivationEmail, {
                path: "/"
            })
        }).done()
    }
    ,
    t
}(BaseModal);
(function(n) {
    var t;
    (function(n) {
        n[n.ResendActivationMail = 0] = "ResendActivationMail";
        n[n.ActivateAccount = 1] = "ActivateAccount"
    }
    )(t = n.ViewType || (n.ViewType = {}))
}
)(ActivateAccountModal || (ActivateAccountModal = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ConnectAccountModal = function(n) {
    function t() {
        var t = n.call(this, {
            template: ModalTemplate.ConnectAccount
        }) || this;
        return t.isConnecting = ko.observable(!1),
        t
    }
    return __extends(t, n),
    t.prototype.connect = function(n) {
        appViewModel.postAndRedirectToUrl(Urls.facebookConnectAccount, {
            prefillManagerName: n
        })
    }
    ,
    t
}(BaseModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , AppSurfacingModal = function(n) {
    function t() {
        return n.call(this, ModalTemplate.AppSurfacing) || this
    }
    return __extends(t, n),
    t
}(BaseSurfacingModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , AlertErrorRefreshModal = function(n) {
    function t() {
        return n.call(this, ModalTemplate.AlertErrorRefresh) || this
    }
    return __extends(t, n),
    t.prototype.show = function() {
        return n.prototype.show.call(this).fin(function() {
            location.reload()
        }),
        Q.defer().promise
    }
    ,
    t
}(BaseAlertModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , HelpTextModal = function(n) {
    function t(i, r) {
        var u = n.call(this, {
            template: ModalTemplate.HelpText,
            showCloseButton: !0,
            modalSize: ModalSize.Normal,
            templateForTracking: i
        }) || this;
        return u.helpTextType = ko.observable(t.Type.ChooseLeagueBeta),
        u.helpTextType(r),
        u._confirmDeferred = Q.defer(),
        u.hideEventFunction = function() {
            u._confirmDeferred.resolve()
        }
        ,
        u
    }
    return __extends(t, n),
    t.prototype.show = function() {
        return n.prototype.show.call(this),
        this._confirmDeferred.promise
    }
    ,
    t
}(BaseModal);
(function(n) {
    var t;
    (function(n) {
        n[n.ChooseLeagueBeta = 0] = "ChooseLeagueBeta";
        n[n.Transferlist = 1] = "Transferlist";
        n[n.Training = 2] = "Training";
        n[n.TicketQueued = 3] = "TicketQueued";
        n[n.Ticket = 4] = "Ticket";
        n[n.TicketCreated = 5] = "TicketCreated";
        n[n.Tactics = 6] = "Tactics";
        n[n.Stadium = 7] = "Stadium";
        n[n.Squad = 8] = "Squad";
        n[n.Spy = 9] = "Spy";
        n[n.Sponsor = 10] = "Sponsor";
        n[n.OccupiedForWinnersLeague = 11] = "OccupiedForWinnersLeague";
        n[n.NextWinnersLeague = 12] = "NextWinnersLeague";
        n[n.NextCareerStep = 13] = "NextCareerStep";
        n[n.Lineup = 14] = "Lineup";
        n[n.Lawyer = 15] = "Lawyer";
        n[n.GenericVipTicket = 16] = "GenericVipTicket";
        n[n.Doctor = 17] = "Doctor";
        n[n.CrewLandingPage = 18] = "CrewLandingPage";
        n[n.Calendar = 19] = "Calendar";
        n[n.BusinessClub = 20] = "BusinessClub";
        n[n.FakeGermany = 21] = "FakeGermany";
        n[n.TicketQualification = 22] = "TicketQualification";
        n[n.VipHallOfFame = 23] = "VipHallOfFame";
        n[n.SquadStrengthOpponentHelpText = 24] = "SquadStrengthOpponentHelpText";
        n[n.SquadStrengthHelpText = 25] = "SquadStrengthHelpText";
        n[n.SkillRatingHelpText = 26] = "SkillRatingHelpText";
        n[n.OccupiedForFantasyLeague = 27] = "OccupiedForFantasyLeague";
        n[n.FantasyLeagueNotSupported = 28] = "FantasyLeagueNotSupported";
        n[n.LeaderBoardsHelpText = 29] = "LeaderBoardsHelpText";
        n[n.FantasyLeague = 30] = "FantasyLeague";
        n[n.PrizePoolNotSupported = 31] = "PrizePoolNotSupported";
        n[n.PrizePoolHelpText = 32] = "PrizePoolHelpText";
        n[n.InPrizePoolQueueHelpText = 33] = "InPrizePoolQueueHelpText"
    }
    )(t = n.Type || (n.Type = {}))
}
)(HelpTextModal || (HelpTextModal = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}();
FantasyLeagueInQueueModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            template: ModalTemplate.FantasyLeagueInQueue,
            showCloseButton: !0,
            modalSize: ModalSize.Normal
        }) || this;
        return i.leaguePartial = t,
        i._inQueueNavigationResultDeferred = Q.defer(),
        i
    }
    return __extends(t, n),
    t.prototype.show = function() {
        return n.prototype.show.call(this),
        this._inQueueNavigationResultDeferred.promise
    }
    ,
    t.prototype.isModerator = function() {
        var n, t;
        if ((n = this.leaguePartial) !== null && n !== void 0)
            return n.isUserIdModerator((t = appViewModel.userPartial()) === null || t === void 0 ? void 0 : t.id)
    }
    ,
    t.prototype.canInviteFriendsToFantasyLeague = function() {
        return this.leaguePartial.isFantasyLeague() && this.leaguePartial.hasIncompleteTeams
    }
    ,
    t.prototype.goToEntryRequests = function() {
        this._inQueueNavigationResultDeferred.resolve(t.InQueueNavigationResult.GoToEntryRequests)
    }
    ,
    t.prototype.hasOpenEntryRequestsForLeague = function() {
        var n = this;
        return appViewModel.entryRequestsPartial() && Enumerable.from(appViewModel.entryRequestsPartial().getItems()).any(function(t) {
            return t.leagueId == n.leaguePartial.id && t.status == EntryRequestStatus.Requested
        })
    }
    ,
    t.prototype.hide = function() {
        n.prototype.hide.call(this);
        this._inQueueNavigationResultDeferred.resolve(t.InQueueNavigationResult.Ok)
    }
    ,
    t.prototype.navigateToFriends = function() {
        this._inQueueNavigationResultDeferred.resolve(t.InQueueNavigationResult.GoToFriends)
    }
    ,
    t
}(BaseModal),
function(n) {
    var t;
    (function(n) {
        n[n.Ok = 0] = "Ok";
        n[n.GoToFriends = 1] = "GoToFriends";
        n[n.GoToEntryRequests = 2] = "GoToEntryRequests"
    }
    )(t = n.InQueueNavigationResult || (n.InQueueNavigationResult = {}))
}(FantasyLeagueInQueueModal || (FantasyLeagueInQueueModal = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), ProgressPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.isAnimating = ko.observable(!1),
        i.progressPercentage = ko.observable(),
        i.animatedProgressIncrease = ko.observable(0),
        i.animateArrowIn = ko.observable(!1),
        i.animateArrowBounce = ko.observable(!1),
        i.showUpgradeArrow = ko.observable(!0),
        i.totalPercentage = ko.computed(function() {
            return i.progressPercentage() + i.progressForecast
        }),
        i.forecastPercentage = ko.observable(),
        Helper.copyProperties(t, i),
        i.progressPercentage(i.progress),
        i.forecastPercentage(i.totalPercentage() > 100 ? 100 - i.progress : i.progressForecast),
        i
    }
    return __extends(t, n),
    t.prototype.animate = function() {
        var n = this, i = Q.defer(), t, r;
        return this.isAnimating(!0),
        this.showUpgradeArrow(!1),
        t = 0,
        r = setInterval(function() {
            n.progressPercentage(n.progressPercentage() + 1);
            n.forecastPercentage() > 0 && n.forecastPercentage(n.forecastPercentage() - 1);
            n.animatedProgressIncrease(n.animatedProgressIncrease() + 1);
            n.progressPercentage() >= 100 && (n.progressPercentage(0),
            n.level++,
            n.animateUpgradeArrow());
            t++;
            t >= n.totalProgressIncrease && (clearInterval(r),
            setTimeout(function() {
                i.resolve(!0);
                n.isAnimating(!1)
            }, 1e3))
        }, 10),
        i.promise
    }
    ,
    t.prototype.animateUpgradeArrow = function() {
        var n = this;
        setTimeout(function() {
            n.animateArrowIn(!0);
            n.showUpgradeArrow(!0);
            setTimeout(function() {
                n.animateArrowBounce(!0);
                n.animateArrowIn(!1)
            }, 450)
        }, 50)
    }
    ,
    t
}(Progress), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PlayerPartial = function(n) {
    function t(t, i, r, u, f, e) {
        var o = n.call(this) || this, h, s, c, l;
        return o.isAttacker = !1,
        o.isMidfielder = !1,
        o.isDefender = !1,
        o.isGoalKeeper = !1,
        o.isAvailable = ko.observable(!1),
        o.isInjured = ko.observable(!1),
        o.isSuspended = ko.observable(!1),
        o.lineupNr = ko.observable(0),
        o.isInLeague = !1,
        o.isSessionPlayer = !1,
        o.statMain = 0,
        o.imageLarge = ko.observable(),
        o.daysUnavailable = ko.observable(0),
        o.isLoading = ko.observable(),
        o.quickSellSellPrice = ko.observable(0),
        o.isLineupCardBeingDragged = ko.observable(!1),
        o.isOnTransferList = ko.computed(function() {
            return appViewModel.leaguePartial() && appViewModel.leaguePartial().settingsPartial() && appViewModel.leaguePartial().settingsPartial().areTransfersEnabled && o.transferPlayerPartial() ? !0 : !1
        }),
        o.isInNegotiation = ko.computed(function() {
            return appViewModel.leaguePartial() && appViewModel.leaguePartial().settingsPartial() && appViewModel.leaguePartial().settingsPartial().areTransfersEnabled && o.offersPartial() ? o.offersPartial().getItems().length > 0 : !1
        }),
        o.isInTraining = ko.computed(function() {
            return o.trainingSessionsPartial() ? o.trainingSessionsPartial().currentTrainingSession() !== null && o.trainingSessionsPartial().currentTrainingSession().countdownTimerPartial() !== null && !o.trainingSessionsPartial().currentTrainingSession().countdownTimerPartial().claimed() : !1
        }),
        o.isInSelection = ko.computed(function() {
            return o.lineupNr() > 0
        }),
        o.isInLineup = ko.computed(function() {
            return o.lineupNr() > 0 && o.lineupNr() <= 11
        }),
        o.isOnBench = ko.computed(function() {
            return o.isInSelection() && !o.isInLineup()
        }),
        o.squadNumberObservable = ko.observable(),
        o.nameWithSquadNumber = ko.pureComputed(function() {
            return 0 === o.squadNumberObservable() ? o.name : o.squadNumberObservable() + ". " + o.name
        }),
        o.fullNameWithSquadNumber = ko.pureComputed(function() {
            return 0 === o.squadNumberObservable() ? o.fullName : o.squadNumberObservable() + ". " + o.fullName
        }),
        o.squadOrLineupNumber = ko.pureComputed(function() {
            var n = o.squadNumberObservable();
            return n !== 0 ? "" + n : ""
        }),
        o.nameWithSquadNumberForMatch = ko.pureComputed(function() {
            return o.playerGradePartial() && o.playerGradePartial().squadNumber !== 0 ? o.playerGradePartial().squadNumber + ". " + o.name : o.name
        }),
        Helper.copyProperties(t, o),
        o.daysUnavailable(o.unavailable),
        i && (o._playersService = i),
        r && (o._offersService = r),
        o.nationality && o.nationalityPartial(new NationalityPartial(o.nationality)),
        o.team && o.teamPartial(new TeamPartial(o.team)),
        o.assets && o.assetsPartial(new AssetsPartial(o.assets)),
        o.foul && o.foulPartial(new FoulPartial(o.foul)),
        o.injury && o.injuryPartial(new InjuryPartial(o.injury)),
        o.doctorTreatment && o.doctorTreatmentPartial(new DoctorTreatmentPartial(o.doctorTreatment)),
        o.doctorTreatments && o.doctorTreatmentsPartial(new DoctorTreatmentsPartial(o.doctorTreatments)),
        o.trainingSessions && o.trainingSessionsPartial(new TrainingSessionsPartial(o.trainingSessions,u,e)),
        o.transferPlayer && o.transferPlayerPartial(new TransferPlayerPartial(o.transferPlayer,f)),
        o.playerGrade && o.playerGradePartial(new PlayerGradePartial(o.playerGrade)),
        o.playerGrades && o.playerGradesPartial(new PlayerGradesPartial(o.playerGrades)),
        o.training && o.trainingForecastPartial(new TrainingForecastPartial(o.training)),
        o.offers && o.offersPartial(new OffersPartial(o.offers)),
        o.isAttacker = o.position === PlayerPosition.A,
        o.isMidfielder = o.position === PlayerPosition.M,
        o.isDefender = o.position === PlayerPosition.D,
        o.isGoalKeeper = o.position === PlayerPosition.G,
        o.isAvailable(o.status === PlayerStatus.Available),
        o.isInjured(o.status === PlayerStatus.Injured),
        o.isSuspended(o.status === PlayerStatus.Suspended),
        o.lineupNr(o.lineup),
        o.isInLeague = o.leagueId === SessionManager.getLeagueId(),
        o.isSessionPlayer = o.isInLeague && o.teamId === SessionManager.getTeamId(),
        o.statMain = o.isAttacker ? o.statAtt : o.isMidfielder ? o.statOvr : o.statDef,
        o.assets && (h = Enumerable.from(o.assets).firstOrDefault(function(n) {
            return n.type === AssetType.NormalPassport
        }),
        h != null && o.imageLarge(h.path)),
        s = new Progress,
        s.level = o.statMain,
        s.progress = o.trainingProgress,
        s.progressForecast = o.training ? o.trainingForecastPartial().forecast : 0,
        o.trainingProgressPartial(new ProgressPartial(s)),
        o.isSessionPlayer && appViewModel && appViewModel.gameSettingsPartial() && (c = appViewModel.gameSettingsPartial().getGameSettings(GameVarCategory.Transfer, "QuickSellPricePercentage"),
        l = Enumerable.from(c).firstOrDefault(function(n) {
            return n.variation === 0 && n.increment === 0
        }),
        o.quickSellSellPrice(o.value * (l.value / 100))),
        o.isSessionPlayer && o.quickSellSellPrice(o.value),
        o.squadNumberObservable(o.squadNumber),
        o
    }
    return __extends(t, n),
    t.prototype.setLineup = function(n) {
        this.lineupNr(n)
    }
    ,
    t.prototype.sell = function(n) {
        var i = this, t = Q.defer(), r;
        return this._playersService ? (WebApi.getInstance().execute(this._playersService.sell(this.leagueId, this.teamId, this.id, n)).then(function(n) {
            i.transferPlayer = n;
            i.transferPlayerPartial(new TransferPlayerPartial(n,new TransferPlayerService));
            t.resolve(n);
            i.addFeedbackToast()
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n);
            var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "PlayerPartial.sell.sellDeferred: Error selling player.");
            t.reject(i)
        }).done(),
        t.promise) : (r = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("PlayerPartial.sell.sellDeferred: No playersService when trying to sell a player."),
        t.reject(r),
        t.promise)
    }
    ,
    t.prototype.offer = function(n) {
        if (this._offersService) {
            var t = this._offersService.post(this.leagueId, SessionManager.getTeamId(), this.id, n);
            return t.deferred.promise.then(function() {
                LeanplumHelper.getInstance().trackEvent(LeanplumTrackingService.Event.PlayerCardMakeOffer)
            }).done(),
            WebApi.getInstance().execute(t)
        }
    }
    ,
    t.prototype.willImproveByTraining = function() {
        return this.trainingForecastPartial() ? this.trainingProgress + this.trainingForecastPartial().forecast >= 100 : !1
    }
    ,
    t.prototype.addFeedbackToast = function() {
        appViewModel && appViewModel.toastsPartial && this.transferPlayerPartial() && this.transferPlayerPartial().playerPartial() && appViewModel.toastsPartial().addItem(new FeedbackToast(FeedbackToast.Type.PlayerToTransferlist,this.transferPlayerPartial().playerPartial().imageLarge(),[{
            key: "playername",
            value: this.transferPlayerPartial().playerPartial().name
        }],this.getPlayerWorldStarLevel(),this.rarity))
    }
    ,
    t.prototype.getPlayerWorldStarLevel = function() {
        return this.statMain >= 100 ? PlayerWorldStarLevel.WorldStar1 : PlayerWorldStarLevel.None
    }
    ,
    t.prototype.isWorldStar = function() {
        return this.getPlayerWorldStarLevel() >= PlayerWorldStarLevel.WorldStar1
    }
    ,
    t.prototype.isLegend = function() {
        return this.rarity == PlayerRarity.Legend
    }
    ,
    t.prototype.isInForm = function() {
        return this.rarity == PlayerRarity.InForm
    }
    ,
    t.prototype.getWorldStarClassName = function() {
        var n = this.getPlayerWorldStarLevel();
        switch (n) {
        case PlayerWorldStarLevel.WorldStar1:
            return "world-star-1";
        default:
            return "no-world-star"
        }
    }
    ,
    t.prototype.assignSquadNumber = function(n) {
        var t = this
          , i = Q.defer();
        if (this._playersService)
            return WebApi.getInstance().execute(this._playersService.assignSquadNumber(this.leagueId, this.teamId, this.id, n)).then(function(n) {
                t.squadNumber = n.squadNumber;
                t.squadNumberObservable(n.squadNumber);
                n.squadNumber && appViewModel.toastsPartial().addItem(new FeedbackToast(FeedbackToast.Type.SquadNumberAssigned,t.imageLarge(),[{
                    key: "SquadNumber",
                    value: String(n.squadNumber)
                }],t.getPlayerWorldStarLevel(),t.rarity));
                i.resolve(n)
            }).fail(function(n) {
                WebapiHelper.handleAndAlertError(n);
                var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "Could not assign squad number");
                i.reject(t)
            }).done(),
            i.promise
    }
    ,
    t
}(Player), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PlayersPartial = function(n) {
    function t(t, i, r, u, f, e) {
        e === void 0 && (e = !1);
        var o = n.call(this) || this;
        return o.totalValue = ko.computed(function() {
            return Enumerable.from(o.getItems()).sum(function(n) {
                return n.value
            })
        }),
        o.attackers = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isAttacker
            }).toArray()
        }),
        o.midfielders = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isMidfielder
            }).toArray()
        }),
        o.defenders = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isDefender
            }).toArray()
        }),
        o.goalkeepers = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isGoalKeeper
            }).toArray()
        }),
        o.injured = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isInjured()
            }).toArray()
        }),
        o.suspended = ko.computed(function() {
            return Enumerable.from(o.getItems()).where(function(n) {
                return n.isSuspended()
            }).toArray()
        }),
        o.currentLineupAmount = ko.computed(function() {
            return Enumerable.from(o.getItems()).count(function(n) {
                return n.isInLineup()
            })
        }),
        o.currentBenchAmount = ko.computed(function() {
            return Enumerable.from(o.getItems()).count(function(n) {
                return n.isOnBench()
            })
        }),
        o.isLineupComplete = ko.computed(function() {
            return o.currentLineupAmount() == 11
        }),
        o.isBenchComplete = ko.computed(function() {
            return o.currentBenchAmount() == 7
        }),
        o._playersService = i,
        o._offersService = r,
        e && (o.sortingEnabled(!0),
        o.sortOrder = SortOrder.Descending),
        o.setItemsFromModels(t, i, r, u, f),
        o
    }
    return __extends(t, n),
    t.prototype.isLineEligibleForTransfer = function(n) {
        switch (n) {
        case PlayerPosition.A:
            return Enumerable.from(this.getItems()).where(function(n) {
                return n.position === PlayerPosition.A
            }).count() > 3;
        case PlayerPosition.D:
            return Enumerable.from(this.getItems()).where(function(n) {
                return n.position === PlayerPosition.D
            }).count() > 4;
        case PlayerPosition.M:
            return Enumerable.from(this.getItems()).where(function(n) {
                return n.position === PlayerPosition.M
            }).count() > 4;
        case PlayerPosition.G:
            return Enumerable.from(this.getItems()).where(function(n) {
                return n.position === PlayerPosition.G
            }).count() > 2;
        default:
            return !1
        }
    }
    ,
    t.prototype.getPlayersEligibleToBePutOnTransferlist = function() {
        var n = this;
        return Enumerable.from(this.getItems()).where(function(t) {
            return !t.isOnTransferList() && n.isLineEligibleForTransfer(t.position)
        }).toArray()
    }
    ,
    t.prototype.getReserves = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return !n.isInSelection()
        }).orderByDescending(function(n) {
            return n.statMain
        }).toArray()
    }
    ,
    t.prototype.getNotInLineup = function() {
        return this.getItems().filter(function(n) {
            return !n.isInLineup()
        })
    }
    ,
    t.prototype.getPlayerBySquadNumber = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.squadNumberObservable() === n
        })
    }
    ,
    t.prototype.getByStaffMemberType = function(n) {
        return n === StaffMemberType.AttackerCoach ? this.attackers() : n === StaffMemberType.MidfielderCoach ? this.midfielders() : n === StaffMemberType.DefenderCoach ? this.defenders() : n === StaffMemberType.GoalkeeperCoach ? this.goalkeepers() : []
    }
    ,
    t.prototype.orderPlayersByName = function() {
        this.sortItems(function(n) {
            return n.name
        })
    }
    ,
    t.prototype.orderPlayersByAge = function() {
        this.sortItems(function(n) {
            return n.age
        })
    }
    ,
    t.prototype.orderPlayersByTeam = function() {
        this.sortItems(function(n) {
            return n.team.name
        })
    }
    ,
    t.prototype.orderPlayersByDefence = function() {
        this.sortItems(function(n) {
            return n.statDef
        })
    }
    ,
    t.prototype.orderPlayersByGoals = function() {
        this.sortItems(function(n) {
            return n.goals
        })
    }
    ,
    t.prototype.orderPlayersByAttack = function() {
        this.sortItems(function(n) {
            return n.statAtt
        })
    }
    ,
    t.prototype.orderPlayersBySpecificPosition = function() {
        this.sortItems(function(n) {
            return n.specificPosition
        })
    }
    ,
    t.prototype.orderPlayersByRarity = function() {
        this.sortItems(function(n) {
            return n.rarity
        })
    }
    ,
    t.prototype.orderPlayersByOvr = function() {
        this.sortItems(function(n) {
            return n.statOvr
        })
    }
    ,
    t.prototype.orderPlayersByMain = function() {
        this.sortItems(function(n) {
            return n.statMain
        })
    }
    ,
    t.prototype.orderPlayersByValue = function() {
        this.sortItems(function(n) {
            return n.value
        })
    }
    ,
    t.prototype.orderPlayersByPrice = function() {
        this.sortItems(function(n) {
            return n.price
        })
    }
    ,
    t.prototype.orderPlayersByNationality = function() {
        this.sortItems(function(n) {
            return n.nationality.code
        })
    }
    ,
    t.prototype.orderPlayersByFitness = function() {
        this.sortItems(function(n) {
            return n.fitness
        })
    }
    ,
    t.prototype.orderPlayersByMorale = function() {
        this.sortItems(function(n) {
            return n.morale
        })
    }
    ,
    t.prototype.orderPlayersByLineup = function() {
        this.sortItems(function(n) {
            return n.lineup
        })
    }
    ,
    t.prototype.orderPlayersByAverage = function() {
        this.sortItems(function(n) {
            return n.averagePlayerGrade
        })
    }
    ,
    t.prototype.orderPlayersByGradeForWeek = function(n) {
        this.sortItems(function(t) {
            return t.playerGradesPartial().getGradeForWeek(n)
        })
    }
    ,
    t.prototype.orderPlayersByPosition = function() {
        this.sortItems(function(n) {
            return n.position
        })
    }
    ,
    t.prototype.orderPlayersBySuspension = function() {
        this.sortItems(function(n) {
            return n.isSuspended
        })
    }
    ,
    t.prototype.getTopscorers = function(n, t) {
        return Enumerable.from(this.getRankedArray(function(n) {
            return n.goals
        }, !0)).skip(n).take(t).toArray()
    }
    ,
    t.prototype.getTopscorer = function() {
        return Enumerable.from(this.getItems()).orderByDescending(function(n) {
            return n.goals
        }).firstOrDefault()
    }
    ,
    t.prototype.getAssists = function(n, t) {
        return Enumerable.from(this.getRankedArray(function(n) {
            return n.assists
        }, !0)).skip(n).take(t).toArray()
    }
    ,
    t.prototype.getPlayers = function(n, t) {
        return Enumerable.from(this.getItems()).skip(n).take(t).toArray()
    }
    ,
    t.prototype.getOrderedByPlayerGradeLineup = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.playerGradePartial() !== null && n.playerGradePartial() !== undefined
        }).orderBy(function(n) {
            return n.playerGradePartial().lineup
        }).toArray()
    }
    ,
    t.prototype.setItemsFromModels = function(n, t, i, r, u) {
        var f = [];
        n.forEach(function(n) {
            f.push(new PlayerPartial(n,t,i,u,r))
        });
        this.setItems(f)
    }
    ,
    t.prototype.getAverageLineStrengthForFormation = function(n, t) {
        var i = Enumerable.from(this.getItems()).where(function(t) {
            return t.position === n
        }), r;
        if (!i.any())
            return 0;
        r = this.getPlayerAmountInPositionForFormation(n, t);
        switch (n) {
        case PlayerPosition.G:
            return i.orderByDescending(function(n) {
                return n.statMain
            }).firstOrDefault().statMain;
        case PlayerPosition.M:
        case PlayerPosition.D:
        case PlayerPosition.A:
            return i.orderByDescending(function(n) {
                return n.statMain
            }).take(r).sum(function(n) {
                return n.statMain
            }) / r
        }
    }
    ,
    t.prototype.getPlayerAmountInPositionForFormation = function(n, t) {
        switch (n) {
        case PlayerPosition.G:
            return 1;
        case PlayerPosition.D:
            return Math.floor(t / 100 % 10);
        case PlayerPosition.A:
            return Math.floor(t % 10);
        case PlayerPosition.M:
            return Math.floor(t / 10 % 10)
        }
    }
    ,
    t.prototype.getHighestAverageRatedPlayer = function() {
        return Enumerable.from(this.getItems()).orderByDescending(function(n) {
            return n.playerGradesPartial() && n.playerGradesPartial().getAverage()
        }).firstOrDefault()
    }
    ,
    t.prototype.getHighestMainStatPlayer = function() {
        return Enumerable.from(this.getItems()).orderByDescending(function(n) {
            return n.statMain
        }).firstOrDefault()
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TicketPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.isTimerFinished = ko.computed(function() {
            var n = Boolean(i.expiresTimerPartial() && i.expiresTimerPartial().timerState() === TimerState.Finished)
              , t = Boolean(i.availableTimerPartial() && i.availableTimerPartial().timerState() === TimerState.Finished);
            (n || t) && (i.status = TicketStatus.Consumed,
            i.statusObservable(i.status))
        }),
        i.statusObservable = ko.observable(),
        Helper.copyProperties(t, i),
        i.statusObservable(i.status),
        i.team && i.teamPartial(new TeamPartial(i.team)),
        i.leagueType && i.leagueTypePartial(new LeagueTypePartial(i.leagueType)),
        i.initializeAvailableTimer(),
        i.initializeExpiresTimer(),
        i
    }
    return __extends(t, n),
    t.prototype.initializeAvailableTimer = function() {
        if (this.status === TicketStatus.Created && this.availableAt) {
            var n = new CountdownTimer;
            n.finishedTimestamp = this.availableAt;
            this.availableTimerPartial(new CountdownTimerPartial(n))
        }
    }
    ,
    t.prototype.initializeExpiresTimer = function() {
        if (this.status === TicketStatus.Available && this.expiresAt) {
            var n = new CountdownTimer;
            n.finishedTimestamp = this.expiresAt;
            this.expiresTimerPartial(new CountdownTimerPartial(n))
        }
    }
    ,
    t
}(Ticket), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TicketsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.hasQueuedTicket = ko.pureComputed(function() {
            return Enumerable.from(i.getItems()).any(function(n) {
                return n.status === TicketStatus.InQueue
            })
        }),
        i.availableAndCreatedTickets = ko.pureComputed(function() {
            return Enumerable.from(i.getItems()).where(function(n) {
                return n.statusObservable() === TicketStatus.Available || n.statusObservable() === TicketStatus.Created
            }).toArray()
        }),
        i.addItemsFromModels(t, TicketPartial),
        i
    }
    return __extends(t, n),
    t.prototype.getByStatus = function() {
        for (var i, t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
        return i = Enumerable.from(t),
        Enumerable.from(this.getItems()).where(function(n) {
            return i.contains(n.status)
        }).toArray()
    }
    ,
    t.prototype.getForRewards = function(n) {
        return Enumerable.from(this.getByStatus(TicketStatus.Available, TicketStatus.Created)).where(function(t) {
            return !CookieHelper.isTicketRewardSeen(t.id) && (n === undefined || t.rewardedOnTeamSlotIndex === n)
        }).toArray()
    }
    ,
    t.prototype.hasLastDay = function(n, t) {
        return Enumerable.from(this.getByStatus(TicketStatus.Created)).any(function(i) {
            return i.fromLeagueId === n && i.fromSeasonNr === t
        })
    }
    ,
    t.prototype.getLastExpired = function(n) {
        return Enumerable.from(this.getByStatus(TicketStatus.Available)).where(function(t) {
            return n === undefined || t.id !== n
        }).orderByDescending(function(n) {
            return n.expiresAt
        }).firstOrDefault()
    }
    ,
    t.prototype.hasForTeamSlotIndex = function(n) {
        return Enumerable.from(this.getByStatus(TicketStatus.Available, TicketStatus.Created)).any(function(t) {
            return t.rewardedOnTeamSlotIndex === n
        })
    }
    ,
    t
}(PartialArrayViewModel), TicketsService = function() {
    function n() {}
    return n.prototype.getTickets = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("/user/tickets")
          , i = n ? CacheKey[CacheKey.Tickets] : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i, !0)
    }
    ,
    n.prototype.consumeTicket = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("/user/tickets/" + n + "/consume", HttpMethod.Put, {
            TeamSlotIndex: t
        })
    }
    ,
    n
}(), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PreLoaderModal = function(n) {
    function t() {
        var t = n.call(this, {
            modalSize: ModalSize.Normal,
            screenModeXs: ScreenMode.Normal,
            template: ModalTemplate.PreLoader,
            showCloseButton: !1,
            container: ModalContainer.Generic,
            hideOnBackdropClick: !1
        }) || this;
        return t.isLoading = ko.observable(!1),
        t._leagueTypesService = new LeagueTypesService,
        t._foulsService = new FoulsService,
        t._injuriesService = new InjuriesService,
        t._gameSettingsService = new GameSettingsService,
        t._bossCoinProductsService = new BossCoinProductsService,
        t._achievementsService = new AchievementsService,
        t._usersService = new UsersService,
        t._teamsService = new TeamsService,
        t._managersService = new ManagersService,
        t._matchesService = new MatchesService,
        t._leagueStandingsService = new LeagueStandingsService,
        t._leaguesService = new LeaguesService,
        t._cuproundsService = new CupRoundsService,
        t._countdownTimerService = new CountdownTimerService,
        t._teamTacticService = new TeamTacticService,
        t._teamFinancesService = new TeamFinancesService,
        t._releaseService = new ReleaseService,
        t._bossCoinsService = new BossCoinsService,
        t._usersV1Dot1Service = new WebApiV1Dot1.UsersService,
        t._ticketsService = new TicketsService,
        t.hideEventFunction = function() {
            if (t._isLoadedDeferred) {
                var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Preloader did not finish loading but was hidden.");
                t._isLoadedDeferred.reject(n)
            }
        }
        ,
        t
    }
    return __extends(t, n),
    t.prototype.cancelAction = function() {
        this.hide()
    }
    ,
    t.prototype.show = function() {
        n.prototype.show.call(this);
        this.isLoading(!0)
    }
    ,
    t.prototype.loadData = function() {
        var i = this, n, t;
        return (this._isLoadedDeferred = Q.defer(),
        this.isLoading(!0),
        !LocalStorageCacheProvider.isSupported()) ? (this._isLoadedDeferred.resolve(!0),
        this._isLoadedDeferred.promise) : (n = new WebApiBatch,
        n.add(this._foulsService.getAll()).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        n.add(this._injuriesService.getAll()).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        n.add(this._gameSettingsService.getAll(!0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        n.add(this._bossCoinProductsService.getAll(!0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        n.add(this._achievementsService.getByIdentity(!0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        n.add(this._usersService.getAccountByIdentity(!0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        SessionManager.getTeamId() === 0 && (t = {},
        t["CFAmountS" + SessionManager.getInstance().session.slotIndex] = null,
        LeanplumHelper.getInstance().setUserAttributes(t)),
        SessionManager.getLeagueId() > 0 && this.addLeagueDataToBatch(n),
        n.execute().fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).fin(function() {
            i.isLoading(!1);
            i._isLoadedDeferred.resolve(!0)
        }).done(),
        this._isLoadedDeferred.promise)
    }
    ,
    t.prototype.addLeagueDataToBatch = function(n) {
        var t, i;
        n.add(this._teamsService.getByLeague(SessionManager.getLeagueId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        n.add(this._managersService.getByLeagueWithoutPoints(SessionManager.getLeagueId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        t = this._matchesService.getByTeamLeagueAndCup(SessionManager.getLeagueId(), SessionManager.getTeamId(), !0);
        n.add(t);
        i = this._leaguesService.getBySession(!0);
        n.add(i);
        n.add(this._leagueStandingsService.getAll(SessionManager.getLeagueId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        n.add(this._cuproundsService.getByLeague(SessionManager.getLeagueId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        Q.all([t.deferred.promise, i.deferred.promise]).spread(function(n, t) {
            var i = Enumerable.from(n).firstOrDefault(function(n) {
                return n.weekNr === t.weekNr && (n.homeTeamId === SessionManager.getTeamId() || n.awayTeamId === SessionManager.getTeamId())
            });
            i && appViewModel.lastMatchPartial(new MatchPartial(i))
        }).fail(function() {}).done();
        SessionManager.getTeamId() > 0 && this.addTeamDataToBatch(n)
    }
    ,
    t.prototype.addTeamDataToBatch = function(n) {
        n.add(this._countdownTimerService.getAll(SessionManager.getLeagueId(), SessionManager.getTeamId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        n.add(this._teamTacticService.getTeamTacticByTeamId(SessionManager.getLeagueId(), SessionManager.getTeamId(), !0)).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done();
        n.add(this._teamFinancesService.getBalanceAndSavingsByTeam(SessionManager.getLeagueId(), SessionManager.getTeamId())).then(function(n) {
            var t = n.balance + n.savings
              , i = {};
            i["CFAmountS" + SessionManager.getInstance().session.slotIndex] = t ? t : null;
            LeanplumHelper.getInstance().setUserAttributes(i)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done()
    }
    ,
    t.prototype.loadLoginData = function() {
        var n = new WebApiBatch, e = this._releaseService.getWebApiInfo(!0), t, i, r, u, f;
        return n.add(e),
        t = this._usersV1Dot1Service.getByIdentity(!0, "teamslots,profile,connections"),
        n.add(t),
        i = this._bossCoinsService.getByIdentity(!1),
        n.add(i),
        r = this._achievementsService.getByIdentity(!0),
        n.add(r),
        u = Q.defer(),
        f = this._ticketsService.getTickets(!0),
        n.add(f).done(),
        Q.allSettled([e.deferred.promise, t.deferred.promise, i.deferred.promise, r.deferred.promise, f.deferred.promise]).spread(function(n, t, i, r, f) {
            var e = new WebApiV1Dot1.UserPartial(t.value)
              , o = new TicketsPartial(f.value);
            LeanplumHelper.getInstance().trackLogin(n.value, e, i.value, r.value, o).fail(function() {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().logWarning("Unable to track leanplum login.")
            }).fin(function() {
                u.resolve(e)
            }).done()
        }).done(),
        n.execute(),
        u.promise
    }
    ,
    t
}(BaseModal), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), LeagueSettingAlertModal = function(n) {
    function t(t) {
        var i = n.call(this, ModalTemplate.LeagueSettingAlert) || this;
        return i.type = ko.observable(),
        i.type(t),
        i
    }
    return __extends(t, n),
    t
}(BaseAlertModal), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), BosscoinShopModal = function(n) {
    function t(t, i, r) {
        var u = n.call(this, {
            template: ModalTemplate.BosscoinShop,
            showCloseButton: !0,
            hideOnBackdropClick: !0,
            modalSize: ModalSize.Large
        }) || this, f, e;
        return u.productsPartial = ko.observable(),
        u.selectedPaymentMethod = ko.observable(),
        u.bossCoinPaymentPromise = Q.defer(),
        u._watchVideoRewardVariationPartial = ko.observable(),
        u._watchVideoCapRewardVariation = ko.observable(),
        u.hasWatchedMaxAmountOfVideosPerInterval = ko.observable(!1),
        u._paymentFactory = r,
        f = appViewModel.actionRewardsPartial().getVideoActionRewardVariationForId(WatchVideoPlacementType.Shop),
        e = appViewModel.actionRewardsPartial().getVideoActionCapRewardVariationForId(WatchVideoPlacementType.Shop),
        u._watchVideoRewardVariationPartial(f),
        u._watchVideoCapRewardVariation(e),
        u.updateMaxAmountOfVideosWatched(),
        Q.all([appViewModel.userLoadedDeferred.promise, t, i.isDoneLoading]).then(function() {
            var n = new WebApiBatch
              , t = appViewModel.isFacebookCanvas() ? i.getFacebookProducts(appViewModel.userPartial().countryCode) : i.getByIdentity();
            n.add(t).then(function(n) {
                u.productsPartial(new ProductsPartial(n));
                u.productsPartial().orderProductsByIsEnlargedAndThenAmount()
            }).done();
            n.execute()
        }).done(),
        u.hiddenEventFunction = function() {
            appViewModel.refreshBossCoinsWallet()
        }
        ,
        window.closeModal = u.closeModalFromIframe.bind(u),
        u
    }
    return __extends(t, n),
    t.prototype.updateMaxAmountOfVideosWatched = function() {
        var n = CookieHelper.getJsonCookie(CookieHelper.CookieKeys.amountOfVideosWatched);
        this.hasWatchedMaxAmountOfVideosPerInterval(n && n.amountOfVideosWatched >= WatchVideosModal.MaxAmountOfVideosPerInterval)
    }
    ,
    t.prototype.closeModalFromIframe = function() {
        this.hide();
        this.bossCoinPaymentPromise.resolve(!0)
    }
    ,
    t.prototype.closeButtonClicked = function() {
        n.prototype.closeButtonClicked.call(this);
        var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Closed the bosscoinshop modal");
        this.bossCoinPaymentPromise.reject(t)
    }
    ,
    t.prototype.openWatchVideosModal = function() {
        var n = this
          , i = {
            placement: WatchVideoPlacementType.Shop,
            rewardVariation: this._watchVideoRewardVariationPartial() ? this._watchVideoRewardVariationPartial().variation : 0,
            capVariation: this._watchVideoCapRewardVariation() ? this._watchVideoCapRewardVariation() : 0
        }
          , t = new WatchVideosModal(new IncentiveProviderCountriesService,new IncentiveProviderService,new WatchVideosService,new ActionRewardsService,new BossCoinsService,WatchVideoPlacementType.Shop,i);
        t.videoWatchedRewardAnnouncer.subscribe(function(n) {
            n.then(function(n) {
                appViewModel.bossCoinWalletPartial().updateWallet(n)
            }).fail(function() {}).done()
        });
        t.show().then(function() {
            n.show();
            n.updateMaxAmountOfVideosWatched()
        }).fail(function() {}).done()
    }
    ,
    t.prototype.backdropClicked = function() {
        n.prototype.backdropClicked.call(this);
        var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Closed the bosscoinshop modal by backdrop");
        this.bossCoinPaymentPromise.reject(t)
    }
    ,
    t.prototype.show = function() {
        return n.prototype.show.call(this),
        this.bossCoinPaymentPromise.promise
    }
    ,
    t.prototype.choose = function(n) {
        var t = this, i;
        n && (i = this._paymentFactory.createPaymentMethod(n),
        i) && (n.isLoadingPaymentEnvironment(!0),
        this.selectedPaymentMethod(i),
        this.selectedPaymentMethod().checkOut().then(function() {
            t.selectedPaymentMethod().startPaymentEnvironment().then(function() {
                LeanplumHelper.getInstance().trackEvent(LeanplumTrackingService.Event.PurchaseIntent, {
                    ProductId: n.id,
                    ProductPaymentMethodId: n.productPaymentMethodId,
                    BCAmount: n.amount,
                    PaymentMethod: PaymentSystem[n.paymentMethod].toString()
                });
                n.isLoadingPaymentEnvironment(!1)
            }).fail(function() {
                t.selectedPaymentMethod(null);
                n.isLoadingPaymentEnvironment(!1)
            }).done()
        }).fail(function() {
            t.selectedPaymentMethod(null);
            n.isLoadingPaymentEnvironment(!1)
        }).done())
    }
    ,
    t.prototype.showWatchVideoButton = function() {
        var t = Enumerable.from(this.productsPartial().getItems()).any(function(n) {
            return n.isEnlargedProduct()
        })
          , n = Enumerable.from(this.productsPartial().getItems()).any(function(n) {
            return n.isEnlargedProduct()
        }) ? 7 : 8;
        return Enumerable.from(this.productsPartial().getItems()).count(function(n) {
            return n.isVisibleInStore && (n.countdownTimer() && n.countdownTimer().timerState() !== TimerState.Finished || !n.countdownTimer())
        }) < n
    }
    ,
    t
}(BaseModal), DragWheelScrollHelper = function() {
    function n(n) {
        this.element = n;
        this._eventNamespace = ".dragWheelScrollHelper";
        this._isEnabled = !1;
        this._isDragging = !1;
        this._pageX = 0
    }
    return n.prototype.enable = function() {
        if (!this._isEnabled) {
            this._isEnabled = !0;
            this.element.on("mousewheel" + this._eventNamespace, this.mouseWheelHandler.bind(this));
            this.element.on("mousedown" + this._eventNamespace, this.mouseDownHandler.bind(this));
            this.element.on("mouseup" + this._eventNamespace + " mouseleave" + this._eventNamespace, this.mouseUpHandler.bind(this));
            this.element.on("mousemove" + this._eventNamespace, this.mouseMoveHandler.bind(this))
        }
    }
    ,
    n.prototype.disable = function() {
        this._isEnabled && (this._isEnabled = !1,
        this.element.off(this._eventNamespace))
    }
    ,
    n.prototype.mouseWheelHandler = function(n) {
        n.preventDefault();
        var t = n.originalEvent;
        this.element.stop().animate({
            scrollLeft: "-=" + t.deltaX
        }, 150, "linear")
    }
    ,
    n.prototype.mouseDownHandler = function(n) {
        n.preventDefault();
        this._isDragging = !0;
        this._pageX = n.pageX
    }
    ,
    n.prototype.mouseUpHandler = function() {
        this._isDragging = !1
    }
    ,
    n.prototype.mouseMoveHandler = function(n) {
        this._isDragging && this.element.stop().animate({
            scrollLeft: "-=" + (n.pageX - this._pageX)
        }, 100, "linear")
    }
    ,
    n
}(), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), StoreModal = function(n) {
    function t(t, i, r, u) {
        var f = n.call(this, {
            template: ModalTemplate.Store,
            showCloseButton: !0,
            hideOnBackdropClick: !0,
            modalSize: ModalSize.Large
        }, LeanplumTrackingService.State.Shop, {
            EntryPoint: i
        }) || this, e, o;
        return f.categoriesWithProducts = ko.observable(),
        f.selectedPaymentMethod = ko.observable(),
        f.isLoadingPaymentEnvironment = ko.observable(!1),
        f.hasWatchedMaxAmountOfVideosPerInterval = ko.observable(!1),
        f._bossCoinPaymentPromise = Q.defer(),
        f._watchVideoRewardVariationPartial = ko.observable(),
        f._watchVideoCapRewardVariation = ko.observable(),
        f.dailyRewardClaimTimer = ko.observable(),
        f.dailyRewardCounter = ko.observable(),
        f.hasUnclaimedDailyReward = ko.observable(!1),
        f.hasDailyRewardToClaim = ko.computed(function() {
            return f.dailyRewardCounter() ? f.dailyRewardCounter().value() > 0 : !1
        }),
        f._paymentFactory = u,
        e = appViewModel.actionRewardsPartial().getVideoActionRewardVariationForId(WatchVideoPlacementType.Shop),
        o = appViewModel.actionRewardsPartial().getVideoActionCapRewardVariationForId(WatchVideoPlacementType.Shop),
        f._watchVideoRewardVariationPartial(e),
        f._watchVideoCapRewardVariation(o),
        f.updateMaxAmountOfVideosWatched(),
        f.setUpClaimDailyReward(),
        Q.all([appViewModel.userLoadedDeferred.promise, t, r.isDoneLoading]).then(function() {
            var n = r.getOrderedEnabledCategories()
              , t = appViewModel.isFacebookCanvas() ? r.getFacebookProducts(appViewModel.userPartial().countryCode) : r.getByIdentity();
            WebApi.getInstance().execute(t).then(function(t) {
                var i, r = LeanplumHelper.getInstance().getVariables("Settings", "NewBCShopDailyRewardEnabled", !1);
                f.categoriesWithProducts(f.mapCategoriesWithProducts(n, t, r));
                f.hasUnclaimedDailyReward(r && ((i = appViewModel.bossCoinWalletPartial()) === null || i === void 0 ? void 0 : i.unclaimedCoins) > 0)
            }).done()
        }).done(),
        f.hiddenEventFunction = function() {
            appViewModel.refreshBossCoinsWallet()
        }
        ,
        window.closeModal = f.closeModalFromIframe.bind(f),
        f
    }
    return __extends(t, n),
    t.prototype.mapCategoriesWithProducts = function(n, t, i) {
        var u = this
          , r = [];
        return n.forEach(function(n) {
            var e = Enumerable.from(t).where(function(t) {
                return t.categoryName === n.key
            }), f, o;
            switch (n.key) {
            case ProductCategory.Free:
                f = [u.createWatchAdShopItem(n)];
                i && (o = {
                    color: ProductColor.Green,
                    type: ShopItemType.ClaimDailyReward
                },
                f.push(o));
                r.push(new KeyValuePair(ProductCategory.Free,new ShopItemsPartial(f)));
                break;
            case ProductCategory.BCDeals:
                r.push(new KeyValuePair(ProductCategory.BCDeals,new ProductsPartial(e.orderBy(function(n) {
                    return n.isMobile
                }).thenBy(function(n) {
                    return n.price
                }).toArray())));
                break;
            case ProductCategory.Context:
                break;
            default:
                r.push(new KeyValuePair(n.key,new ProductsPartial(e.orderBy(function(n) {
                    return n.priority
                }).toArray())))
            }
        }),
        r
    }
    ,
    t.prototype.createWatchAdShopItem = function(n) {
        var t = n.value && n.value.WatchVideoSettings && n.value.WatchVideoSettings.Color ? n.value.WatchVideoSettings.Color : ProductColor.Blue;
        return Enumerable.from(ProductColor).any(function(n) {
            return n.value === t
        }) || (t = ProductColor.Blue),
        {
            color: t,
            type: ShopItemType.WatchVideo
        }
    }
    ,
    t.prototype.closeModalFromIframe = function() {
        this.hide();
        this._bossCoinPaymentPromise.resolve(!0)
    }
    ,
    t.prototype.closeButtonClicked = function() {
        n.prototype.closeButtonClicked.call(this);
        var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("store was closed with the close button.");
        this._bossCoinPaymentPromise.reject(t)
    }
    ,
    t.prototype.backdropClicked = function() {
        n.prototype.backdropClicked.call(this);
        var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("store was closed by clicking on the backdrop.");
        this._bossCoinPaymentPromise.reject(t)
    }
    ,
    t.prototype.show = function() {
        return n.prototype.show.call(this),
        this._bossCoinPaymentPromise.promise
    }
    ,
    t.prototype.updateMaxAmountOfVideosWatched = function() {
        var n = CookieHelper.getJsonCookie(CookieHelper.CookieKeys.amountOfVideosWatched);
        this.hasWatchedMaxAmountOfVideosPerInterval(n && n.amountOfVideosWatched >= WatchVideosModal.MaxAmountOfVideosPerInterval)
    }
    ,
    t.prototype.openWatchVideosModal = function() {
        var t = this, i, n;
        this.hasWatchedMaxAmountOfVideosPerInterval() || (i = {
            placement: WatchVideoPlacementType.Shop,
            rewardVariation: this._watchVideoRewardVariationPartial() ? this._watchVideoRewardVariationPartial().variation : 0,
            capVariation: this._watchVideoCapRewardVariation() ? this._watchVideoCapRewardVariation() : 0
        },
        n = new WatchVideosModal(new IncentiveProviderCountriesService,new IncentiveProviderService,new WatchVideosService,new ActionRewardsService,new BossCoinsService,WatchVideoPlacementType.Shop,i),
        n.videoWatchedRewardAnnouncer.subscribe(function(n) {
            n.then(function(n) {
                appViewModel.bossCoinWalletPartial().updateWallet(n)
            }).fail(function() {}).done()
        }),
        n.show().then(function() {
            t.show();
            t.updateMaxAmountOfVideosWatched()
        }).fail(function() {}).done())
    }
    ,
    t.prototype.setUpClaimDailyReward = function() {
        var n = appViewModel.bossCoinWalletPartial();
        this.dailyRewardClaimTimer(new CountdownTimerPartial(n.countdownTimer));
        this.dailyRewardCounter(new Counter(n.unclaimedCoins))
    }
    ,
    t.prototype.claimDailyReward = function() {
        var n = appViewModel.bossCoinWalletPartial();
        n.unclaimedCoins <= 0 || (n.claimBossCoins(),
        this.dailyRewardCounter().countToValue(0, 1e3).done())
    }
    ,
    t.prototype.calculatedRowWidth = function(n) {
        var t = 10;
        return appViewModel && appViewModel.sessionSettings && appViewModel.sessionSettings.screenSize() === ScreenSize.Xs ? "auto" : Math.ceil(n / 2) * (200 + t) + t + "px"
    }
    ,
    t.prototype.choose = function(n) {
        var t = this, i;
        n && !this.isLoadingPaymentEnvironment() && (i = this._paymentFactory.createPaymentMethod(n),
        i) && (this.isLoadingPaymentEnvironment(!0),
        n.isLoadingPaymentEnvironment(!0),
        this.selectedPaymentMethod(i),
        this.selectedPaymentMethod().checkOut().then(function() {
            t.selectedPaymentMethod().startPaymentEnvironment().then(function() {
                LeanplumHelper.getInstance().trackEvent(LeanplumTrackingService.Event.PurchaseIntent, {
                    ProductId: n.id,
                    ProductPaymentMethodId: n.productPaymentMethodId,
                    BCAmount: n.amount,
                    PaymentMethod: PaymentSystem[n.paymentMethod].toString()
                });
                t.isLoadingPaymentEnvironment(!1);
                n.isLoadingPaymentEnvironment(!1)
            }).fail(function() {
                t.selectedPaymentMethod(null);
                t.isLoadingPaymentEnvironment(!1);
                n.isLoadingPaymentEnvironment(!1)
            }).done()
        }).fail(function() {
            t.selectedPaymentMethod(null);
            t.isLoadingPaymentEnvironment(!1);
            n.isLoadingPaymentEnvironment(!1)
        }).done())
    }
    ,
    t.prototype.openInfoTextModal = function(n) {
        n && new StoreInfoTextModal(n.infoText).show()
    }
    ,
    t.prototype.unsetPaymentMethod = function() {
        this.selectedPaymentMethod(null)
    }
    ,
    t
}(BaseModal), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), StoreInfoTextModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            template: ModalTemplate.StoreInfoTextModal,
            showCloseButton: !0,
            modalSize: ModalSize.Normal,
            container: ModalContainer.Generic
        }) || this;
        return i.text = ko.observable(""),
        i.text(t),
        i
    }
    return __extends(t, n),
    t
}(BaseModal), WebApiV1Dot1;
(function(n) {
    var t = function() {
        function n(n) {
            var t = this;
            n === void 0 && (n = null);
            this.isDoneLoading = Q.defer();
            n || (n = Q.resolve(!0));
            Q.all([LeanplumHelper.getInstance().isInitialized(), n]).then(function() {
                t._newBCShopEnabled = LeanplumHelper.getInstance().getVariables("Settings", "NewBCShopEnabled", !0);
                t._categories = t.getOrderedEnabledCategories();
                t._oldProductVariables = LeanplumHelper.getInstance().getVariables("BossCoinPack")
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleError(n)
            }).fin(function() {
                t.isDoneLoading.resolve(!0)
            }).done()
        }
        return n.prototype.getByIdentity = function(n) {
            var i = this;
            n === void 0 && (n = !1);
            var r = (new breeze.EntityQuery).from("products/web/")
              , u = n ? CacheKey[CacheKey.Products] : null
              , t = RequestItemFactory.getInstance().createRequestItemForVersion("v1.1", r, u);
            return t.predicate = function(n) {
                return i.leanplumProductsPredicate(n)
            }
            ,
            n && (t.cacheDurationInMinutes = 5),
            t
        }
        ,
        n.prototype.getFacebookProducts = function(n, t) {
            var r = this;
            t === void 0 && (t = !1);
            var u = (new breeze.EntityQuery).from("products/facebook/" + n)
              , f = t ? CacheKey[CacheKey.Products] : null
              , i = RequestItemFactory.getInstance().createRequestItemForVersion("v1.1", u, f);
            return i.predicate = function(n) {
                return r.leanplumProductsPredicate(n)
            }
            ,
            t && (i.cacheDurationInMinutes = 5),
            i
        }
        ,
        n.prototype.getOrderedEnabledCategories = function() {
            var n = LeanplumHelper.getInstance().getVariables("ShopCategories");
            return n || (n = this.getDefaultCategories()),
            Enumerable.from(n).where(function(n) {
                return n.key in ProductCategory && n.value.hasOwnProperty("Enabled") && n.value.Enabled
            }).orderBy(function(n) {
                return n.value.Priority
            }).toArray()
        }
        ,
        n.prototype.leanplumProductsPredicate = function(n) {
            var t = this;
            return !this._newBCShopEnabled || !this._categories ? this.leanplumProductsPredicateOld(n) : (this._categories.forEach(function(i) {
                if (!t.isProductUpdated(n) && n.isVisibleInStore) {
                    var r = t.getLeanplumProductFromCategory(i, n.productPaymentMethodId);
                    r && r.hasOwnProperty("Enabled") && r.Enabled && t.updateProduct(n, i.key, i.value, r)
                }
            }),
            !this.isProductUpdated(n)) ? !1 : !0
        }
        ,
        n.prototype.isProductUpdated = function(n) {
            return !!n.categoryName
        }
        ,
        n.prototype.getLeanplumProductFromCategory = function(n, t) {
            return appViewModel.isFacebookCanvas() ? !n.value.hasOwnProperty("ProductsFacebook") || !n.value.ProductsFacebook.hasOwnProperty(t.toString()) ? null : n.value.ProductsFacebook[t] : !n.value.hasOwnProperty("ProductsWeb") || !n.value.ProductsWeb.hasOwnProperty(t.toString()) ? null : n.value.ProductsWeb[t]
        }
        ,
        n.prototype.updateProduct = function(n, t, i, r) {
            n.categoryName = t;
            n.priority = r.hasOwnProperty("Priority") ? r.Priority : 0;
            n.size = t === ProductCategory.BCDeals ? ProductSize.Small : r.hasOwnProperty("Size") && r.Size === ProductSize.Large ? r.Size : ProductSize.Medium;
            n.infoText = r.hasOwnProperty("InfoText") ? r.InfoText : "";
            n.color = t === ProductCategory.BCDeals ? n.amountPrevious > 0 ? i.DiscountColor : ProductColor.Blue : r.Color;
            Enumerable.from(ProductColor).any(function(t) {
                return t.value === n.color
            }) || (n.color = ProductColor.Blue);
            r.hasOwnProperty("Image") && (n.image = r.Image)
        }
        ,
        n.prototype.leanplumProductsPredicateOld = function(n) {
            if (!this._oldProductVariables || !this._oldProductVariables.hasOwnProperty(n.productPaymentMethodId))
                return !0;
            var t = !!this._oldProductVariables[n.productPaymentMethodId];
            return n.isVisibleInStore = t,
            !0
        }
        ,
        n.prototype.getDefaultCategories = function() {
            var i = this.getDefaultProductPaymentMethodIds(), t = [], n;
            return i.forEach(function(n) {
                t[n] = {
                    Enabled: !0,
                    Priority: 1,
                    Size: ProductSize.Small,
                    Color: ProductColor.Blue
                }
            }),
            n = {
                Enabled: !0,
                Priority: 2
            },
            appViewModel.isFacebookCanvas() ? n.ProductsFacebook = t : n.ProductsWeb = t,
            [new KeyValuePair(ProductCategory.Free,{
                Enabled: !0,
                Priority: 1
            }), new KeyValuePair(ProductCategory.BCDeals,n)]
        }
        ,
        n.prototype.getDefaultProductPaymentMethodIds = function() {
            if (appViewModel.isFacebookCanvas())
                return appViewModel.sessionSettings.worldNr === WorldNr.OFM || appViewModel.sessionSettings.worldNr === WorldNr.Dev ? [6151, 6154, 6155, 6156, 6157, 6158] : [6106, 6106, 6107, 6108, 6109, 6010];
            var n = [6087, 6088, 6089, 6090, 6091, 6092, 6141, 6142, 6143, 6144, 6145, 6146];
            return appViewModel.sessionSettings.worldNr === WorldNr.OFM || appViewModel.sessionSettings.worldNr === WorldNr.Dev ? n.concat([6096, 6103, 6123, 6124, 6127, 6129, 6131, 6133, 6135, 6160]) : n.concat([6149, 6150, 6151, 6152]),
            n
        }
        ,
        n
    }();
    n.ProductService = t
}
)(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
var OrdersService = function() {
    function n() {}
    return n.prototype.getByOrderCode = function(n) {
        var t = (new breeze.EntityQuery).from("orders/" + n);
        return RequestItemFactory.getInstance().createRequestItemSingle(t, !0)
    }
    ,
    n.prototype.checkoutAdyenOrder = function(n) {
        var t = {
            productPaymentMethodId: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("/orders/adyen/checkout", HttpMethod.Post, t)
    }
    ,
    n.prototype.checkoutTargetPayOrder = function(n) {
        var t = {
            productPaymentMethodId: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("/orders/targetpay/checkout", HttpMethod.Post, t)
    }
    ,
    n.prototype.payTargetPayOrder = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("/orders/targetpay/pay", HttpMethod.Post, n)
    }
    ,
    n.prototype.checkoutOrder = function(n) {
        var t = {
            productPaymentMethodId: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("/orders", HttpMethod.Post, t)
    }
    ,
    n
}(), PayByMeService = function() {
    function n() {}
    return n.prototype.getUrl = function(n) {
        var t = (new breeze.EntityQuery).from("orders/payByMe/url/" + n);
        return RequestItemFactory.getInstance().createRequestItemSingle(t)
    }
    ,
    n
}(), CentiliService = function() {
    function n() {}
    return n.prototype.getUrl = function(n) {
        var t = (new breeze.EntityQuery).from("orders/centili/url/" + n);
        return RequestItemFactory.getInstance().createRequestItemSingle(t)
    }
    ,
    n
}(), PaymentFactory = function() {
    function n(n, t, i, r) {
        this._ordersService = n;
        this._payByMeService = t;
        this._centiliService = i;
        this._facebookService = r
    }
    return n.prototype.createPaymentMethod = function(n) {
        if (!n)
            return null;
        switch (n.paymentMethod) {
        case PaymentSystem.Adyen:
            return new AdyenPaymentMethod(this._ordersService,n);
        case PaymentSystem.Centili:
            return new CentiliPaymentMethod(this._ordersService,this._centiliService,n);
        case PaymentSystem.PayByMe:
            return new PayBymePaymentMethod(this._ordersService,this._payByMeService,n);
        case PaymentSystem.TargetPay:
            return new TargetPayPaymentMethod(this._ordersService,n);
        case PaymentSystem.Facebook:
            return new FacebookPaymentMethod(this._ordersService,this._facebookService,n);
        default:
            return null
        }
    }
    ,
    n
}(), BasePaymentMethod = function() {
    function n(n, t) {
        this._paymentCheckoutDeferred = Q.defer();
        this._paymentEnvironmentStartedDeferred = Q.defer();
        this.selectedProduct = t;
        this._ordersService = n
    }
    return n
}(), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AdyenPaymentMethod = function(n) {
    function t(t, i) {
        var r = n.call(this, t, i) || this;
        return r.adyenForm = ko.observable(),
        r.shouldGoToAdyenInIframe = ko.observable(!0),
        (Helper.isSafari() || Helper.isChrome()) && r.shouldGoToAdyenInIframe(!1),
        r
    }
    return __extends(t, n),
    t.prototype.checkOut = function() {
        var n = this;
        return WebApi.getInstance().execute(this._ordersService.checkoutAdyenOrder(this.selectedProduct.productPaymentMethodId)).then(function(t) {
            n.adyenForm(t);
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.Success)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n._paymentCheckoutDeferred.reject(PaymentCheckoutResult.OrderCreationFailed)
        }).done(),
        this._paymentCheckoutDeferred.promise
    }
    ,
    t.prototype.startPaymentEnvironment = function() {
        if (this.adyenForm())
            return $("#adyenSubmitForm").submit(),
            this._paymentEnvironmentStartedDeferred.resolve(PaymentEnvironmentLoadResult.Complete),
            this._paymentEnvironmentStartedDeferred.promise
    }
    ,
    t
}(BasePaymentMethod), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PayBymePaymentMethod = function(n) {
    function t(t, i, r) {
        var u = n.call(this, t, r) || this;
        return u.iframeUrl = ko.observable(),
        u.order = ko.observable(),
        u._payByMeService = i,
        u
    }
    return __extends(t, n),
    t.prototype.checkOut = function() {
        var n = this;
        return WebApi.getInstance().execute(this._ordersService.checkoutOrder(this.selectedProduct.productPaymentMethodId)).then(function(t) {
            n.order(t);
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.Success)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n._paymentCheckoutDeferred.reject(PaymentCheckoutResult.OrderCreationFailed)
        }).done(),
        this._paymentCheckoutDeferred.promise
    }
    ,
    t.prototype.startPaymentEnvironment = function() {
        var n = this;
        if (this.order())
            return WebApi.getInstance().execute(this._payByMeService.getUrl(this.order().orderCode)).then(function(t) {
                n.iframeUrl(t.value);
                n._paymentEnvironmentStartedDeferred.resolve(PaymentEnvironmentLoadResult.Complete)
            }).fail(function(t) {
                WebapiHelper.handleAndAlertError(t);
                n._paymentEnvironmentStartedDeferred.reject(PaymentEnvironmentLoadResult.Failed)
            }).done(),
            this._paymentEnvironmentStartedDeferred.promise
    }
    ,
    t
}(BasePaymentMethod), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), FacebookPaymentMethod = function(n) {
    function t(t, i, r) {
        var u = n.call(this, t, r) || this;
        return u._order = ko.observable(),
        u.iframeUrl = ko.observable(),
        u._facebookService = i,
        u
    }
    return __extends(t, n),
    t.prototype.checkOut = function() {
        var n = this;
        return WebApi.getInstance().execute(this._ordersService.checkoutOrder(this.selectedProduct.productPaymentMethodId)).then(function(t) {
            n._order(t);
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.Success)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n._paymentCheckoutDeferred.reject(PaymentCheckoutResult.OrderCreationFailed)
        }).done(),
        this._paymentCheckoutDeferred.promise
    }
    ,
    t.prototype.startPaymentEnvironment = function() {
        var n = this, t;
        return this._order() ? (t = {
            method: "pay",
            action: "purchaseitem",
            product: appViewModel.getWebApiBaseUrl() + ("/v1/facebook/products/" + this._order().productId + "/" + this._order().cultureCode),
            request_id: this._order().orderCode + "_" + appViewModel.sessionSettings.worldNr
        },
        this._facebookService.showFacebookPaymentModal(t, this._order().orderCode).then(function() {
            n.iframeUrl(window.location.protocol + "//" + window.location.host + "/" + Urls.paymentThankYou + "?orderCode=" + n._order().orderCode)
        }).fail(function() {
            n.iframeUrl(window.location.protocol + "//" + window.location.host + "/" + Urls.paymentFailed + "?orderCode=" + n._order().orderCode)
        }).done(),
        this._paymentEnvironmentStartedDeferred.resolve(PaymentEnvironmentLoadResult.Complete),
        this._paymentEnvironmentStartedDeferred.promise) : (this._paymentEnvironmentStartedDeferred.reject(PaymentEnvironmentLoadResult.Failed),
        this._paymentEnvironmentStartedDeferred.promise)
    }
    ,
    t
}(BasePaymentMethod), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TargetPayPaymentMethod = function(n) {
    function t(t, i) {
        var r = n.call(this, t, i) || this;
        return r.targetPayForm = ko.observable(),
        r.order = ko.observable(),
        r.errorMessage = ko.observable(),
        r.iframeUrl = ko.observable(),
        r
    }
    return __extends(t, n),
    t.prototype.checkOut = function() {
        var n = this;
        return WebApi.getInstance().execute(this._ordersService.checkoutTargetPayOrder(this.selectedProduct.productPaymentMethodId)).then(function(t) {
            n.targetPayForm(t);
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.Success)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.OrderCreationFailed)
        }).done(),
        this._paymentCheckoutDeferred.promise
    }
    ,
    t.prototype.startPaymentEnvironment = function() {
        return this._paymentEnvironmentStartedDeferred.resolve(PaymentEnvironmentLoadResult.Complete),
        this._paymentEnvironmentStartedDeferred.promise
    }
    ,
    t.prototype.submitCode = function() {
        var n = this;
        WebApi.getInstance().execute(this._ordersService.payTargetPayOrder(this.targetPayForm())).then(function() {
            n.iframeUrl(window.location.protocol + "//" + window.location.host + "/" + Urls.paymentThankYou + "?orderCode=" + n.targetPayForm().orderCode)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            t instanceof WebApiError && n.errorMessage(t.getFirstError().value)
        }).done()
    }
    ,
    t
}(BasePaymentMethod), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CentiliPaymentMethod = function(n) {
    function t(t, i, r) {
        var u = n.call(this, t, r) || this;
        return u.iframeUrl = ko.observable(),
        u.orderCode = ko.observable(),
        u._centiliService = i,
        u
    }
    return __extends(t, n),
    t.prototype.checkOut = function() {
        var n = this;
        return WebApi.getInstance().execute(this._ordersService.checkoutOrder(this.selectedProduct.productPaymentMethodId)).then(function(t) {
            n._paymentCheckoutDeferred.resolve(PaymentCheckoutResult.Success);
            n.orderCode(t.orderCode)
        }).fail(function(t) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
            n._paymentCheckoutDeferred.reject(PaymentCheckoutResult.OrderCreationFailed)
        }).done(),
        this._paymentCheckoutDeferred.promise
    }
    ,
    t.prototype.startPaymentEnvironment = function() {
        var n = this;
        if (this.orderCode())
            return WebApi.getInstance().execute(this._centiliService.getUrl(this.orderCode())).then(function(t) {
                n.iframeUrl(t.value);
                n._paymentEnvironmentStartedDeferred.resolve(PaymentEnvironmentLoadResult.Complete)
            }).fail(function(t) {
                WebapiHelper.handleAndAlertError(t);
                n._paymentEnvironmentStartedDeferred.reject(PaymentEnvironmentLoadResult.Failed)
            }).done(),
            this._paymentEnvironmentStartedDeferred.promise
    }
    ,
    t
}(BasePaymentMethod), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), RequestAccessToLeagueModal = function(n) {
    function t(t) {
        var i = n.call(this, ModalTemplate.RequestAccessToLeague) || this;
        return i.existingEntryRequestPartial = ko.observable(),
        i.existingEntryRequestPartial(t),
        i
    }
    return __extends(t, n),
    t
}(BaseConfirmModal), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), AdSettingModal = function(n) {
    function t(t, i) {
        var u, r = n.call(this, {
            template: ModalTemplate.AdSetting,
            showCloseButton: !1,
            hideOnBackdropClick: !1
        }) || this, f;
        return (r._userServiceV1 = t,
        r.isSaving = ko.observable(!1),
        i) ? r : (f = (u = parseInt($.cookie(CookieHelper.CookieKeys.personalizedAdsAskAmount))) !== null && u !== void 0 ? u : 0,
        $.cookie(CookieHelper.CookieKeys.personalizedAdsSettingLastAskedTimestamp, moment().unix(), {
            expires: 365,
            path: "/",
            domain: appViewModel.getDomain()
        }),
        $.cookie(CookieHelper.CookieKeys.personalizedAdsAskAmount, f + 1, {
            expires: 365,
            path: "/",
            domain: appViewModel.getDomain()
        }),
        r)
    }
    return __extends(t, n),
    t.prototype.saveAdSetting = function(n) {
        var t = this;
        this.isSaving() || (this.isSaving(!0),
        WebApi.getInstance().execute(this._userServiceV1.updateGdprSetting(GdprSettingType.PersonalisedAds, n)).then(function(i) {
            appViewModel.userPartialV1Dot1().gdprSettingsPartial().addItem(new WebApiV1Dot1.GdprSettingPartial(i));
            appViewModel.adsPartial() && appViewModel.adsPartial().refreshAds(i.permission);
            CacheHandler.getInstance().removeKeysStartingWith(CacheKey.User);
            $.cookie(CookieHelper.CookieKeys.personalizedAdsEnabled, n, {
                path: "/"
            });
            t._deferred.resolve(!0);
            t.hide()
        }).fail(function(n) {
            if (n.httpStatus !== HttpStatus.NotFound) {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "could not update the gdpr setting");
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
                t._deferred.reject(i)
            }
        }).done(function() {
            t.isSaving(!1)
        }))
    }
    ,
    t.prototype.show = function() {
        return this._deferred = Q.defer(),
        n.prototype.show.call(this),
        this._deferred.promise
    }
    ,
    t
}(BaseModal), PopoverTemplate;
(function(n) {
    n[n.SurfacingPopover = 0] = "SurfacingPopover"
}
)(PopoverTemplate || (PopoverTemplate = {}));
var BasePopover = function() {
    function n(n) {
        this.template = ko.observable(PopoverTemplate.SurfacingPopover);
        this.isVisible = ko.observable(!1);
        this.template(n)
    }
    return n.prototype.clickAction = function() {
        this.isVisible() && this._deferred.resolve(!0)
    }
    ,
    n.prototype.show = function() {
        return this._deferred = Q.defer(),
        this.isVisible(!0),
        this._deferred.promise
    }
    ,
    n.prototype.hide = function() {
        this.isVisible(!1)
    }
    ,
    n
}(), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), SurfacingPopover = function(n) {
    function t(t, i, r, u) {
        var f = n.call(this, PopoverTemplate.SurfacingPopover) || this;
        return f.surfacingType = t,
        f.dudeType = i,
        f.balloonText = r,
        f.linkText = u,
        f
    }
    return __extends(t, n),
    t.prototype.clickAction = function() {
        if (this.surfacingType === SurfacingType.Forums) {
            n.prototype.clickAction.call(this);
            this.isVisible(!1);
            window.open(Urls.getForumUrl(appViewModel.sessionSettings.worldNr), "_blank");
            return
        }
        n.prototype.clickAction.call(this)
    }
    ,
    t
}(BasePopover), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), TimerState;
(function(n) {
    n[n.None = 0] = "None";
    n[n.InProgress = 1] = "InProgress";
    n[n.Finished = 2] = "Finished";
    n[n.Claimed = 3] = "Claimed";
    n[n.ResultShown = 4] = "ResultShown"
}
)(TimerState || (TimerState = {}));
var CountdownTimerPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.isNextMatchInfoBalloonVisible = ko.observable(!1),
        i.claimed = ko.observable(),
        i.animatingCountdown = ko.observable(!1),
        i.fastAnimationCountdownStepTimeout = 80,
        i._animationLength = 2e3,
        i.secondsRemaining = ko.observable(0),
        i._timerTypesToRemoveWhenExpired = [CountdownTimerType.TemporaryOfferCounting, CountdownTimerType.ScoutDeadlineCounting, CountdownTimerType.BcBonusCounting],
        Helper.copyProperties(t, i),
        i.claimed(i.isClaimed),
        i.timerUrl = i.getTimerUrl(),
        i.calculateSecondsRemaining = ko.computed(function() {
            if (!appViewModel) {
                i.secondsRemaining(0);
                return
            }
            if (!i.animatingCountdown()) {
                var n = Math.ceil(i.finishedTimestamp - appViewModel.now().getTime() / 1e3);
                i.secondsRemaining(n > 0 ? n : 0)
            }
        }),
        i.hoursRemaining = ko.computed(function() {
            return Math.ceil(i.secondsRemaining() / 3600)
        }),
        i.minutesRemaining = ko.computed(function() {
            return i.secondsRemaining() / 60
        }),
        i.timerState = ko.computed(function() {
            return i.claimed() ? TimerState.Claimed : i.secondsRemaining() <= 0 ? TimerState.Finished : TimerState.InProgress
        }),
        i.isClaimable = ko.computed(function() {
            return !Enumerable.from(i._timerTypesToRemoveWhenExpired).contains(i.type) && i.timerState() === TimerState.Finished
        }),
        i.isActive = ko.computed(function() {
            return !Enumerable.from(i._timerTypesToRemoveWhenExpired).contains(i.type) || i.timerState() === TimerState.InProgress
        }),
        i
    }
    return __extends(t, n),
    t.prototype.getTimerUrl = function() {
        switch (this.type) {
        case CountdownTimerType.ForwardTraining:
        case CountdownTimerType.MidfielderTraining:
        case CountdownTimerType.DefenderTraining:
        case CountdownTimerType.GoalKeeperTraining:
            return Urls.training;
        case CountdownTimerType.StadiumCapacityExpanding:
        case CountdownTimerType.StadiumPitchExpanding:
        case CountdownTimerType.StadiumTrainingExpanding:
            return Urls.stadium;
        case CountdownTimerType.SpySpying:
            return Urls.spy;
        case CountdownTimerType.ScoutDeadlineCounting:
        case CountdownTimerType.Scout:
            return Urls.scout;
        case CountdownTimerType.DoctorTreating:
            return Urls.doctor;
        case CountdownTimerType.LawyerAppealing:
            return Urls.lawyer;
        case CountdownTimerType.TemporaryOfferCounting:
            return Urls.transferlist;
        case CountdownTimerType.BcBonusCounting:
            return "";
        default:
            return ""
        }
    }
    ,
    t.prototype.getBosscoinProductForCurrentIncrement = function(n) {
        var t = this
          , i = appViewModel.bossCoinProductsPartial().getBossCoinProducts(n);
        return Enumerable.from(i).orderByDescending(function(n) {
            return n.increment
        }).firstOrDefault(function(n) {
            return n.increment <= t.hoursRemaining()
        })
    }
    ,
    t.prototype.updateFinishedTimestamp = function(n, t) {
        return t ? this.animateFinishedTimestampToNewTimestamp(n) : (this.finishedTimestamp = n,
        Q.resolve(null))
    }
    ,
    t.prototype.reduceFinishedTimestamp = function(n, t) {
        t === void 0 && (t = !1);
        var i = this.finishedTimestamp - n;
        return this.updateFinishedTimestamp(i, t)
    }
    ,
    t.prototype.increaseFinishedTimestamp = function(n, t) {
        t === void 0 && (t = !1);
        var i = this.finishedTimestamp + n;
        return this.updateFinishedTimestamp(i, t)
    }
    ,
    t.prototype.expiresToday = function() {
        return this.secondsRemaining() > 0 && this.secondsRemaining() <= 86400
    }
    ,
    t.prototype.animateFinishedTimestampToNewTimestamp = function(n) {
        var t = this
          , r = Q.defer();
        this.animatingCountdown(!0);
        var u = this.finishedTimestamp - n
          , f = this._animationLength / this.fastAnimationCountdownStepTimeout
          , i = u / f
          , e = setInterval(function() {
            var u = Math.ceil(t.finishedTimestamp - appViewModel.now().getTime() / 1e3);
            if (t.finishedTimestamp <= n || u <= 0) {
                clearInterval(e);
                t.animatingCountdown(!1);
                r.resolve();
                return
            }
            n < t.finishedTimestamp ? (u = u - i,
            t.finishedTimestamp = t.finishedTimestamp - i) : (u = u + i,
            t.finishedTimestamp = t.finishedTimestamp + i);
            t.secondsRemaining(u)
        }, this.fastAnimationCountdownStepTimeout);
        return r.promise
    }
    ,
    t
}(CountdownTimer), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CountdownTimerNextMatchPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.opponentTeamPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().opponentTeamPartial() ? i.matchPartial().opponentTeamPartial() : null
        }),
        i.awayTeamPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().awayTeamPartial() ? i.matchPartial().awayTeamPartial() : null
        }),
        i.homeTeamPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().homeTeamPartial() ? i.matchPartial().homeTeamPartial() : null
        }),
        i.opponentManagerPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().opponentManagerPartial() ? i.matchPartial().opponentManagerPartial() : null
        }),
        i.homeManagerPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().homeManagerPartial() ? i.matchPartial().homeManagerPartial() : null
        }),
        i.awayManagerPartial = ko.computed(function() {
            return i.matchPartial() && i.matchPartial().awayManagerPartial() ? i.matchPartial().awayManagerPartial() : null
        }),
        Helper.copyProperties(t, i),
        t.countdownTimer && i.countdownTimerPartial(new CountdownTimerPartial(t.countdownTimer)),
        t.match && i.matchPartial(new MatchPartial(t.match)),
        i
    }
    return __extends(t, n),
    t.prototype.goToOpponentSquad = function() {
        this.opponentTeamPartial() && (window.location.href = Urls.squad + "/" + this.opponentTeamPartial().id)
    }
    ,
    t
}(CountdownTimerNextMatch), FacebookPartial = function() {
    function n(n, t) {
        var i = this;
        this.status = ko.observable();
        this.facebookUserPartial = ko.observable();
        this.isInitCalled = ko.observable(!1);
        this.authResponse = ko.observable();
        t.loadScript(document, "script", "facebook-jssdk");
        this._facebookService = t;
        this._accountService = n;
        this.facebookUserPartial(new FacebookUserPartial(t,n));
        this.imageUrl = ko.computed(function() {
            return i.facebookUserPartial().isLoaded() ? "http://graph.facebook.com/" + i.facebookUserPartial().id + "/picture" : ""
        })
    }
    return n.prototype.init = function(n, t) {
        var i = {
            appId: n,
            xfbml: !0,
            version: t,
            status: !0
        };
        this._facebookService.init(i);
        this.isInitCalled(!0);
        this.loadFacebookUserPartial().fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done()
    }
    ,
    n.prototype.ensureAccessToken = function(n) {
        var r = this, t, i;
        return n === void 0 && (n = !1),
        t = Q.defer(),
        i = this.getCachedAccessToken(n),
        i ? t.resolve(i) : this._facebookService.login().then(function(n) {
            r.authResponse(n.authResponse);
            t.resolve(n.authResponse.accessToken)
        }).fail(function() {
            var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Login with facebook failed");
            t.reject(n)
        }).done(),
        t.promise
    }
    ,
    n.prototype.ensurePermission = function(n) {
        return this._facebookService.ensurePermission(n)
    }
    ,
    n.prototype.handleStatusChange = function(n) {
        this.authResponse(n.authResponse);
        switch (n.status) {
        case "connected":
            this.status(FacebookStatus.Connected);
            break;
        case "not_authorized":
            this.status(FacebookStatus.NotAuthorized);
            break;
        case "not_connected":
            this.status(FacebookStatus.NotConnected)
        }
    }
    ,
    n.prototype.login = function() {
        var t = this
          , n = Q.defer();
        return CacheHandler.getInstance().clear(),
        this._facebookService.login().then(function(t) {
            n.resolve(Boolean(t))
        }).fail(function() {
            var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("failed to login to facebook");
            n.reject(t)
        }).done(),
        n.promise.then(function() {
            t.loadFacebookUserPartial().fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done()
        }),
        n.promise
    }
    ,
    n.prototype.logout = function() {
        var n = this;
        this._facebookService.getAccessToken().then(function() {
            n._facebookService.logout().then(function() {
                n.clearFacebookUser()
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done()
        }).fail(function() {
            n.clearFacebookUser()
        })
    }
    ,
    n.prototype.clearFacebookUser = function() {
        this.facebookUserPartial().unload();
        this.status(null);
        this.authResponse(null);
        CacheHandler.getInstance().removeKey(CacheKey[CacheKey.FacebookUser])
    }
    ,
    n.prototype.getCachedAccessToken = function(n) {
        return n ? "" : this.authResponse() && this.authResponse().accessToken ? this.authResponse().accessToken : ""
    }
    ,
    n.prototype.loadFacebookUserPartial = function() {
        var t = this
          , n = Q.defer();
        return this.facebookUserPartial().isLoaded() ? (n.resolve(null),
        n.promise) : (CacheHandler.getInstance().getItem(CacheKey[CacheKey.FacebookUser]).then(function(i) {
            t.facebookUserPartial().setFacebookUser(i);
            n.resolve(null)
        }).fail(function() {
            var i = t.getCachedAccessToken(!1)
              , r = i ? Q.resolve(i) : t._facebookService.getAccessToken();
            r.then(function(i) {
                if (i)
                    t.facebookUserPartial().setFacebookUserPartial(i).then(function() {
                        n.resolve(null)
                    }).fail(function(t) {
                        var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(t, "Could not set the facebook user partial");
                        n.reject(i)
                    }).done();
                else {
                    var r = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("The facebook access token was null");
                    n.reject(r)
                }
            }).fail(function() {
                var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Could not resolve the facebook acces token promise");
                n.reject(t)
            }).done()
        }).done(),
        n.promise)
    }
    ,
    n.prototype.connectToFacebook = function(n) {
        var t = this;
        this.ensureAccessToken().then(function(i) {
            var r = t.facebookUserPartial();
            r.setFacebookUserPartial(i).then(function() {
                var r = t._accountService.addExternal(i, appViewModel.sessionSettings.webapiClientId, appViewModel.sessionSettings.webapiClientSecret, ExternalType.Facebook);
                WebApi.getInstance().execute(r).then(function() {
                    n()
                }).fail(function(n) {
                    n instanceof WebApiError && WebapiHelper.handleAndAlertError(n);
                    ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
                }).done()
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done()
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done()
    }
    ,
    n.prototype.share = function(n, t, i, r, u) {
        var e = this, f;
        return r === void 0 && (r = ""),
        u === void 0 && (u = FacebookShareModal.ShareType.CupWon),
        f = Q.defer(),
        r === "" && (r = this.getFacebookImage(u)),
        this._facebookService.share(r, n, t, i).then(function() {
            f.resolve(!0);
            e.ensureAccessToken().then(function() {
                e.loadFacebookUserPartial().done()
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done()
        }).fail(function() {
            var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Facebook share failed.");
            f.reject(n)
        }),
        f.promise
    }
    ,
    n.prototype.getFacebookImage = function(n) {
        var t;
        switch (n) {
        case FacebookShareModal.ShareType.CupWon:
            t = "fb_cupwin.png";
            break;
        case FacebookShareModal.ShareType.Champion:
            t = "fb_champion.png";
            break;
        case FacebookShareModal.ShareType.Signed:
            t = "fb_signed.png";
            break;
        case FacebookShareModal.ShareType.GoalAchieved:
            t = "fb_goalachieved.png";
            break;
        default:
            t = "fb_default.png"
        }
        return "https://" + location.hostname + "/Images/Icons/Facebook/" + t
    }
    ,
    n
}(), FacebookStatus;
(function(n) {
    n[n.Unknown = 0] = "Unknown";
    n[n.NotConnected = 1] = "NotConnected";
    n[n.Connected = 2] = "Connected";
    n[n.NotAuthorized = 3] = "NotAuthorized"
}
)(FacebookStatus || (FacebookStatus = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , FacebookUserPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r._isLoaded = ko.observable(!1),
        r.isLoaded = ko.computed(function() {
            return r._isLoaded()
        }),
        r._accountService = i,
        r._facebookService = t,
        r
    }
    return __extends(t, n),
    t.prototype.setFacebookUser = function(n) {
        Helper.copyProperties(n, this);
        this._isLoaded(!0);
        this.user && this.userPartial(new UserPartial(this.user))
    }
    ,
    t.prototype.unload = function() {
        this._isLoaded(!1)
    }
    ,
    t.prototype.setFacebookUserPartial = function(n) {
        var i = this
          , t = Q.defer();
        return this._facebookService.getFacebookUserInfo().then(function(r) {
            var u = i.createFacebookUser(r);
            WebApi.getInstance().execute(i._accountService.fetchUserByAccessToken(n)).then(function(n) {
                u.user = n;
                CacheHandler.getInstance().setItem(u, CacheKey[CacheKey.FacebookUser]);
                i.setFacebookUser(u);
                t.resolve(null)
            }).fail(function(n) {
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "failed start doctor treatment");
                t.reject(i)
            }).done()
        }).fail(function() {
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.FacebookUser]);
            var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Could not retrieve facebook user info.");
            t.reject(n)
        }).done(),
        t.promise
    }
    ,
    t.prototype.createFacebookUser = function(n) {
        var t = new FacebookUser;
        return t.name = n.name,
        t.firstName = n.first_name,
        t.id = n.id,
        t.locale = n.locale,
        t.email = n.email ? n.email : "",
        t.thirdPartyId = n.third_party_id,
        t
    }
    ,
    t
}(FacebookUser)
  , TutorialProgressesService = function() {
    function n() {}
    return n.prototype.getByIdentity = function() {
        var n = (new breeze.EntityQuery).from("user/tutorialprogress");
        return RequestItemFactory.getInstance().createRequestItemSingle(n, !0)
    }
    ,
    n.prototype.updateStep = function(n) {
        var t = {
            step: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/tutorialprogress", HttpMethod.Put, t)
    }
    ,
    n.prototype.skipTutorial = function(n) {
        var t = {
            isVoluntarySkip: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/tutorialprogress/skip", HttpMethod.Put, t)
    }
    ,
    n.prototype.claimReward = function(n) {
        var t = {
            productId: n
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/tutorialprogress/claimreward", HttpMethod.Put, t)
    }
    ,
    n
}()
  , SnowFlake = function() {
    function n(n, t, i) {
        this.x = n;
        this.y = t;
        this.screenSize = i;
        this.setup()
    }
    return n.prototype.reset = function(n) {
        this.x = Math.floor(Math.random() * n);
        this.y = 0;
        this.setup()
    }
    ,
    n.prototype.setup = function() {
        this.speed = Math.random() * 2 + 1;
        this.alpha = Math.min(Math.random() + .35, 1);
        this.rotation = Math.random() * 4 + 1;
        this.size = 1 + Math.random() * 3;
        this.ticks = 0
    }
    ,
    n.prototype.idle = function() {
        this.y += this.speed;
        this.ticks += this.size / 20
    }
    ,
    n.prototype.update = function(n) {
        n.save();
        n.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        this.screenSize === ScreenSize.Lg || this.screenSize === ScreenSize.Md ? (n.translate(this.x, this.y),
        n.rotate(Math.cos(this.rotation)),
        n.textAlign = "center",
        n.textBaseline = "middle",
        n.font = this.size + "vh Arial",
        n.fillText("❄", 0, 0),
        n.translate(0, 0)) : (n.beginPath(),
        n.arc(this.x, this.y, this.rotation, 0, Math.PI * 2, !1),
        n.fill(),
        n.closePath());
        n.restore();
        this.x += Math.sin(this.ticks % 1e3) * 2;
        this.y += Math.random() * .01 + .5
    }
    ,
    n
}()
  , SnowRenderer = function() {
    function n(n) {
        if (this.snowFlakes = [],
        this.canvasId = "snow-canvas",
        $("canvas#" + this.canvasId).length === 0) {
            var t = $("<canvas/>", {
                id: this.canvasId
            });
            t.appendTo("#body-content");
            this.canvas = t[0]
        }
        this.scale = window.devicePixelRatio;
        this.snowflakeCount = n;
        this.render();
        window.addEventListener("resize", this.resize.bind(this), !1)
    }
    return n.prototype.resize = function() {
        var n = this
          , t = appViewModel.getScreenSize();
        (t === ScreenSize.Lg || t === ScreenSize.Md) && (this.snowFlakes = [],
        this.isResizing || (this.isResizing = !0,
        setTimeout(function() {
            n.render();
            n.isResizing = !1
        }, 1e3)))
    }
    ,
    n.prototype.render = function() {
        var n, t, i;
        for (this.canvas.width = window.innerWidth * this.scale,
        this.canvas.height = window.innerHeight * this.scale,
        this.canvas.style.height = window.innerHeight + "px",
        this.canvas.style.position = "fixed",
        this.canvas.getContext("2d").scale(this.scale, this.scale),
        n = 0; n < this.snowflakeCount; ++n)
            t = Math.floor(Math.random() * this.canvas.width / this.scale),
            i = Math.floor(Math.random() * this.canvas.height / this.scale),
            this.snowFlakes[n] = new SnowFlake(t,i,appViewModel.getScreenSize())
    }
    ,
    n.prototype.startAnimation = function(n) {
        n === void 0 && (n = 30);
        this.fps = n;
        this.requestId = window.requestAnimationFrame(this.animate.bind(this))
    }
    ,
    n.prototype.animate = function(n) {
        this.lastTime || (this.lastTime = n);
        var t = n - this.lastTime;
        t >= 1e3 / this.fps && (this.lastTime = n,
        this.update());
        this.requestId = window.requestAnimationFrame(this.animate.bind(this))
    }
    ,
    n.prototype.stopAnimation = function() {
        this.requestId && (window.cancelAnimationFrame(this.requestId),
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height))
    }
    ,
    n.prototype.update = function() {
        var n = this;
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snowFlakes.forEach(function(t) {
            (t.y > n.canvas.height / n.scale + 100 || t.y < -100 || t.x > n.canvas.width / n.scale + 100 || t.x < -100) && t.reset(n.canvas.width / n.scale);
            t.update(n.canvas.getContext("2d"));
            t.idle()
        })
    }
    ,
    n
}()
  , layoutInitialisedDeferred = Q.defer();
var AppViewModel = function() {
    function n(n, t, i, r, u, f, e, o, s, h) {
        var c = this, l;
        this._cachedSession = ko.observable();
        this.bossCoinWalletPartial = ko.observable();
        this.leaguePartial = ko.observable();
        this.facebookPartial = ko.observable();
        this.userPartial = ko.observable();
        this.userPartialV1Dot1 = ko.observable();
        this.multiStepVideoCapsReached = ko.observable();
        this.amountOfMultiStepSteps = ko.observable(0);
        this.invitesPartial = ko.observable();
        this.entryRequestsPartial = ko.observable();
        this.userEntryRequestsPartial = ko.observable();
        this.branchLinkData = ko.observable();
        this.gameSettingsPartial = ko.observable();
        this.bossCoinProductsPartial = ko.observable();
        this.tutorialPartial = ko.observable();
        this.adsPartial = ko.observable();
        this.pmModal = ko.observable();
        this.productsPartial = ko.observable();
        this.languagesPartial = ko.observable();
        this.crewPartial = ko.observable();
        this.crewRequestsPartial = ko.observable();
        this.crewInvitesPartial = ko.observable();
        this.crewRequestsForCrewPartial = ko.observable();
        this.webAndEventNotificationsPartial = ko.observable();
        this.actionRewardsPartial = ko.observable();
        this.userRewardsPartial = ko.observable();
        this.spiedTeamResults = ko.observable();
        this.countdownTimersPartial = ko.observable();
        this.skillRatingTiersPartial = ko.observable();
        this.skillRatingBonusesPartial = ko.observable();
        this.surfacingPartial = ko.observable();
        this.currentPopover = ko.observable();
        this.nextMatchPartial = ko.observable();
        this.lastMatchPartial = ko.observable();
        this.laurelPartial = ko.observable();
        this.showScrollToTopBtn = ko.observable(!1);
        this.isRedirecting = ko.observable(!1);
        this.isHeaderLoaded = ko.observable(!1);
        this.isSubHeaderLoaded = ko.observable(!1);
        this.now = ko.computed(function() {
            return new Date
        });
        this.showCrewNotification = ko.computed(function() {
            return !1
        });
        this.specificModalsProcessing = ko.observable(!1);
        this.onSpecificModalsProcessedDeferred = Q.defer();
        this.userAndLeagueLoadedDeferred = Q.defer();
        this.userAndLeagueAndTeamDataLoadedDeferred = Q.defer();
        this.userLoadedDeferred = Q.defer();
        this.appViewModelDataLoadedDeferred = Q.defer();
        this.showBossCoins = ko.computed(function() {
            if (c.tutorialPartial() && c.tutorialPartial().isInTutorialMode()) {
                if (c.bossCoinWalletPartial() && c.bossCoinWalletPartial().amount > 0)
                    return !0;
                if (c.tutorialPartial().tutorialStep() <= TutorialStep.FriendliesClaimBossCoins)
                    return !1
            }
            return !0
        });
        this.hasInvites = ko.computed(function() {
            return c.invitesPartial() && c.invitesPartial().getItems().length > 0 || c.branchLinkData() && c.branchLinkData().leagueId > 0 ? !0 : !1
        });
        this.isHeaderDisabled = ko.computed(function() {
            return c.tutorialPartial() ? c.tutorialPartial().tutorialStep() === TutorialStep.NotInTutorial ? !1 : c.tutorialPartial().tutorialStep() === TutorialStep.End ? !1 : SessionManager.isReservedForFantasyLeague() ? !1 : SessionManager.hasTeam() ? !0 : !1 : !1
        });
        this.isHeaderDisabledWithOverlay = ko.computed(function() {
            return c.isHeaderDisabled() ? c.menuPartial && c.menuPartial() && c.menuPartial().hasHighlightedMenu() ? !0 : c.tutorialPartial() && (c.tutorialPartial().tutorialStep() === TutorialStep.HomeOpenNotifications || c.tutorialPartial().tutorialStep() === TutorialStep.HomeCheckNotifications) && c.sessionSettings && c.sessionSettings.screenSize() === ScreenSize.Xs ? !0 : !1 : !1
        });
        this.adBlockerDetectedObservable = ko.observable(adBlockerDetected);
        this.christmasThemeEnabled = ko.observable(!1);
        this.pushNotificationsEnabled = ko.observable(!1);
        this.pushNotificationsSupported = ko.observable(!1);
        this.isShopEventActive = ko.observable(!1);
        this._gdprOptInCountryCodes = ["AT", "BE", "BG", "HR", "CY", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "BR", "CA", "CH"];
        this._ipCountryApiUrl = "https://ip2c.miniclippt.com";
        this.appTheme = ko.observable(AppTheme.None);
        this.isChristmasThemeEnabled = ko.computed(function() {
            return c.appTheme() === AppTheme.Xmas
        });
        this.isEurosThemeEnabled = ko.computed(function() {
            return c.appTheme() === AppTheme.Euros
        });
        this.showFooter = ko.computed(function() {
            return c.tutorialPartial() && c.tutorialPartial().isInTutorialMode() && !SessionManager.hasTeam() ? !1 : !0
        });
        this.redirectionService = t;
        this.adsService = r;
        this.accountService = u;
        this.authService = f;
        this.languageService = s;
        this.actionRewardsService = h;
        this.updateCachedSession(SessionManager.getInstance().session);
        this.setSessionSettings();
        l = $("#default-error-message");
        this.defaultErrorMessage = l.length > 0 && l.text().length > 0 ? l.text() : "Error";
        this.isPrivacyNoticeAccepted() && this.initializeUnsafePrivacyData(e, n, i);
        o && (this.cookieHelper = new CookieHelper(o))
    }
    return n.prototype.isFacebookCanvas = function() {
        return location.hostname === this.sessionSettings.facebookCanvasDomain && window.parent && window.parent !== window && window.name === "iframe_canvas_fb_https" || document.childNodes[1].id === "facebook"
    }
    ,
    n.prototype.scrollBackToTop = function() {
        $(document).scrollTop(0)
    }
    ,
    n.prototype.isFromGdprOptInCountry = function() {
        var t = this
          , n = Q.defer();
        return WebApi.getInstance().executeExternalAjaxRequest(this._ipCountryApiUrl, 5e3).then(function(i) {
            var r = Enumerable.from(t._gdprOptInCountryCodes).any(function(n) {
                var t, r;
                return n == ((r = (t = i === null || i === void 0 ? void 0 : i.country) === null || t === void 0 ? void 0 : t.code) === null || r === void 0 ? void 0 : r.toUpperCase())
            });
            n.resolve(r)
        }).fail(function() {
            n.reject(null)
        }).done(),
        n.promise
    }
    ,
    Object.defineProperty(n.prototype, "cachedSession", {
        get: function() {
            return this._cachedSession()
        },
        enumerable: !0,
        configurable: !0
    }),
    n.prototype.updateCachedSession = function(n) {
        n && this._cachedSession(n)
    }
    ,
    n.prototype.initializeUnsafePrivacyData = function(n, t, i) {
        BranchHelper && this.branchLinkData(BranchHelper.loadLinkData());
        n && this.facebookPartial(new FacebookPartial(this.accountService,n));
        typeof dataLayer != "undefined" && dataLayer && DataLayerHandler.trackLocalStorageSupport(LocalStorageCacheProvider.isSupported());
        t && i && this.tutorialPartial(new TutorialPartial(t,i))
    }
    ,
    n.prototype.getHost = function() {
        return window.location.hostname.indexOf("localhost") === 0 ? "localhost" : window.location.hostname.indexOf("stagingfb") === 0 ? "stagingfb" : window.location.hostname.indexOf("staging") === 0 ? "staging" : window.location.hostname.indexOf("nightly-dev-web") === 0 ? "nightly-dev-web" : window.location.hostname.indexOf("best-dev-web1fb") === 0 ? "best-dev-web1fb" : window.location.hostname.indexOf("best-dev-web1") === 0 ? "best-dev-web1" : window.location.hostname.indexOf("best-dev-web2") === 0 ? "best-dev-web2" : window.location.hostname.indexOf("best-dev-web3") === 0 ? "best-dev-web3" : window.location.hostname.indexOf("hk-dev-web1") === 0 ? "hk-dev-web1" : window.location.hostname.indexOf("var-dev-web1") === 0 ? "var-dev-web1" : window.location.hostname.indexOf("var-dev-web2") === 0 ? "var-dev-web2" : window.location.hostname.indexOf("var-dev-web3") === 0 ? "var-dev-web3" : ""
    }
    ,
    n.prototype.init = function() {
        var n = this, i, r = Q.defer(), f = new WebApiBatch, e = this.languageService.getAll(), t, u;
        return f.add(e),
        t = (i = $.cookie(CookieHelper.CookieKeys.isFromGdprOptInCountry)) !== null && i !== void 0 ? i : "",
        u = Q.resolve(t.toLowerCase() === "true"),
        t === "" && (u = this.isFromGdprOptInCountry()),
        Q.all([e.deferred.promise, u]).spread(function(i, u) {
            var f, e = window.location.host;
            t === "" && $.cookie(CookieHelper.CookieKeys.isFromGdprOptInCountry, u, {
                expires: 9999,
                path: "/",
                domain: appViewModel.getDomain()
            });
            n.languagesPartial(new LanguagesPartial(i));
            n.sessionSettings.cultureCode = n.languagesPartial().determineUserCultureCodeFromLanguages(e, n.isFacebookCanvas());
            var s = n.languagesPartial().transformHostnameToHostnameForCultureCodeIfNeeded(window.location.host, n.sessionSettings.cultureCode)
              , h = "https://" + s + (window.location.pathname ? window.location.pathname : "") + (window.location.search ? window.location.search : "")
              , o = !1;
            (s !== e || window.location.protocol !== "https:" && e !== "localhost:44302") && (o = !0);
            WebApiConfig.getInstance().cultureCode !== n.sessionSettings.cultureCode && (o = !WebApiConfig.getInstance().cultureCode && WebApiConfig.getInstance().defaultCultureCode !== n.sessionSettings.cultureCode || WebApiConfig.getInstance().cultureCode && WebApiConfig.getInstance().cultureCode !== n.sessionSettings.cultureCode,
            WebApiConfig.getInstance().cultureCode = n.sessionSettings.cultureCode);
            o && (window.location.href = h);
            moment && n.sessionSettings && n.sessionSettings.cultureCode && moment.locale(n.sessionSettings.cultureCode.substring(0, 2));
            r.resolve(!0);
            (f = LeanplumHelper === null || LeanplumHelper === void 0 ? void 0 : LeanplumHelper.getInstance()) === null || f === void 0 ? void 0 : f.isInitialized().then(function() {
                n.appTheme(n.determineAppTheme());
                n.initializeChristmasTheme()
            }).done()
        }).fail(function(n) {
            var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "Failed to initialise the appviewmodel.");
            r.reject(t);
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        f.execute(),
        r.promise
    }
    ,
    n.prototype.redirect = function(n) {
        this.redirectionService.redirect(n)
    }
    ,
    n.prototype.updateScreenSize = function() {
        this.sessionSettings.screenSize(this.getScreenSize())
    }
    ,
    n.prototype.setSessionSettings = function() {
        var n = $("body").data();
        this.sessionSettings = {
            webapiProtocol: n.webapiprotocol,
            webapiVersion: n.webapiversion,
            webapiUrl: n.webapiurl,
            webapiClientId: n.webapiclientid,
            webapiClientSecret: n.webapiclientsecret,
            cultureCode: "",
            currency: n.currency,
            timestamp: n.timestamp,
            facebookAppId: n.facebookappid,
            facebookCanvasDomain: n.facebookcanvasdomain,
            worldNr: n.worldnr,
            buildVersion: new BuildVersion(n.buildversion),
            screenSize: ko.observable(this.getScreenSize()),
            idleTimeout: n.idletimeout,
            idleRefreshAfterTimeout: n.idlerefreshaftertimeout,
            refeshbosscoincachetime: n.refeshbosscoincachetime,
            useCdn: n.usecdn,
            platform: Platform.WebDesktop
        };
        this.sessionSettings.cultureCode = Helper.getDefaultCultureCode(this.sessionSettings.worldNr);
        this.sessionSettings.platform = this.getPlatform()
    }
    ,
    n.prototype.getWebApiBaseUrl = function() {
        return this.sessionSettings.webapiProtocol + this.sessionSettings.webapiUrl
    }
    ,
    n.prototype.getWebApiVersion = function() {
        return this.sessionSettings.webapiVersion
    }
    ,
    n.prototype.clearAccountSlotCache = function() {
        var n = Enumerable.from(CacheHandler.getInstance().getKeys()).except([CacheKey[CacheKey.FacebookUser]]);
        CacheHandler.getInstance().removeKeys(n.toArray())
    }
    ,
    n.prototype.getScreenSize = function() {
        var n = $("#screen-size >").filter(function() {
            return $(this).css("display") !== "inline" ? !1 : !0
        })
          , t = "";
        return (n && n.attr && typeof n.attr == "function" && n.attr("id") && (t = n.attr("id").replace("screen-size-", "")),
        t === "xs") ? ScreenSize.Xs : t === "sm" ? ScreenSize.Sm : t === "lg" ? ScreenSize.Lg : ScreenSize.Md
    }
    ,
    n.prototype.getPlatform = function() {
        if (this.isFacebookCanvas())
            return Platform.FacebookCanvas;
        switch (this.getScreenSize()) {
        case ScreenSize.Xs:
            return Platform.WebPhone;
        case ScreenSize.Sm:
            return Platform.WebTablet;
        default:
            return Platform.WebDesktop
        }
    }
    ,
    n.prototype.getDomain = function() {
        return window.location.hostname.indexOf("onlinesoccermanager.com") > -1 ? ".onlinesoccermanager.com" : window.location.hostname.indexOf("onlinesoccermanager.nl") > -1 ? ".onlinesoccermanager.nl" : ""
    }
    ,
    n.prototype.isArabic = function() {
        return this.sessionSettings.cultureCode === "ar-SA" || this.sessionSettings.cultureCode === "fa-IR"
    }
    ,
    n.prototype.hasAnyToken = function() {
        return WebApi.getInstance().hasAnyToken()
    }
    ,
    n.prototype.isPrivacyNoticeAccepted = function() {
        return $.cookie("isPrivacyNoticeAccepted") === "true"
    }
    ,
    n.prototype.postAndRedirectToUrl = function(n, t) {
        var i = document.createElement("form");
        Object.keys(t).forEach(function(n) {
            var r = document.createElement("input");
            r.type = "text";
            r.name = n;
            r.value = JSON.stringify(t[n]);
            i.appendChild(r)
        });
        i.method = "POST";
        i.action = n;
        document.body.appendChild(i);
        i.submit()
    }
    ,
    n.prototype.refreshClubFundsWallet = function() {
        return Q.defer().promise
    }
    ,
    n.prototype.refreshBossCoinsWallet = function() {
        return Q.defer().promise
    }
    ,
    n.prototype.refreshTimers = function() {
        return
    }
    ,
    n.prototype.refreshNotifications = function() {
        return
    }
    ,
    n.prototype.refreshEntryRequests = function() {
        return
    }
    ,
    n.prototype.exchangeBossCoinsToClubFundsWhenNeeded = function(n, t, i, r, u, f, e) {
        return r === void 0 && (r = 0),
        u === void 0 && (u = !0),
        f === void 0 && (f = ""),
        e === void 0 && (e = {}),
        Q.defer().promise
    }
    ,
    n.prototype.executePaidAction = function() {}
    ,
    n.prototype.isLeagueAccessAllowed = function() {
        return !1
    }
    ,
    n.prototype.requestAccessToLeague = function() {}
    ,
    n.prototype.calculateSimulationForecastTimestamp = function() {
        return 0
    }
    ,
    n.prototype.calculateSimulationState = function() {
        return MatchSimulationState.Finished
    }
    ,
    n.prototype.showActivateAccountModal = function(n, t) {
        n === void 0 && (n = "");
        t === void 0 && (t = "")
    }
    ,
    n.prototype.showConnectAccountModal = function() {}
    ,
    n.prototype.openAppInbox = function() {}
    ,
    n.prototype.hideAppInbox = function() {}
    ,
    n.prototype.syncServerTime = function() {}
    ,
    n.prototype.setPopover = function() {
        return null
    }
    ,
    n.prototype.processQueuedAchievements = function() {}
    ,
    n.prototype.showCreditsModal = function() {
        (new CreditsModal).show()
    }
    ,
    n.prototype.updateSeoInfo = function(n, t) {
        var r, i;
        for (document.title = n,
        r = document.getElementsByTagName("meta"),
        i = 0; i < r.length; i++)
            r[i].name.toLowerCase() === "description" && (r[i].content = t)
    }
    ,
    n.prototype.switchSlot = function(n, t, i) {
        t === void 0 && (t = SwitchSlotFlow.Normal);
        i === void 0 && (i = !1)
    }
    ,
    n.prototype.initializeBossCoinRewardToast = function() {}
    ,
    n.prototype.showAdSettingModal = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.redirectToSlot = function(n) {
        n === void 0 && (n = SwitchSlotFlow.CreateCrewLeague)
    }
    ,
    n.prototype.showSignContractForSpecificFantasyLeagueModal = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.handleDeeplink = function() {
        return Q.resolve(!0)
    }
    ,
    n.prototype.determineAppTheme = function() {
        var n, t, i, r;
        try {
            return (n = LeanplumHelper.getInstance(),
            t = Boolean(n.getVariables("Settings", "EurosTheme", !1)),
            t) ? AppTheme.Euros : (i = Boolean(n.getVariables("Settings", "RamadanTheme", !1)),
            i) ? AppTheme.Ramadan : (r = Boolean(n.getVariables("Settings", "XmasTheme2019", !1)),
            r) ? AppTheme.Xmas : AppTheme.None
        } catch (u) {
            return AppTheme.None
        }
    }
    ,
    n.prototype.initializeChristmasTheme = function() {
        var n = this, t;
        this.appTheme() === AppTheme.Xmas && (this.christmasThemeEnabled.subscribe(function(t) {
            n.snowRenderer || (n.snowRenderer = new SnowRenderer(50));
            t ? (n.snowRenderer.startAnimation(),
            $("img[src*='avatar_empty.jpg']").attr("src", Helper.getAvatarUrl(null, AvatarType.Player))) : (n.snowRenderer.stopAnimation(),
            $("img[src*='avatar_empty_xmas.jpg']").attr("src", Helper.getAvatarUrl(null, AvatarType.Player)));
            $.cookie(CookieHelper.CookieKeys.christmasTheme, t, {
                path: "/"
            })
        }),
        t = $.cookie(CookieHelper.CookieKeys.christmasTheme),
        this.christmasThemeEnabled(t === "true" || t === undefined))
    }
    ,
    n.prototype.daysUntilCrewsIsUnlocked = function() {
        return null
    }
    ,
    n
}()
  , BaseView = function() {
    function n(n) {
        n === void 0 && (n = LeanplumTrackingService.State.None);
        n !== LeanplumTrackingService.State.None && LeanplumHelper.getInstance().pageOpened(n)
    }
    return n
}()
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BaseTextViewModel = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.primaryTranslationsCategory = "",
        r.translationCategories = ko.observable(new TranslationCategoriesPartial),
        r.primaryTranslationsCategory = t,
        r.textsService = i,
        r
    }
    return __extends(t, n),
    t.prototype.getPrimaryTranslationsRequestItem = function() {
        return this.getTranslationsByCategoryRequestItem(this.primaryTranslationsCategory)
    }
    ,
    t.prototype.getTranslationsByCategoryRequestItem = function(n) {
        var i = this
          , t = this.textsService.getByCategory(n);
        return t.deferred.promise.then(function(t) {
            var r = new TranslationCategory;
            r.name = n;
            r.translations = t;
            i.translationCategories().addItem(new TranslationCategoryPartial(r))
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        t
    }
    ,
    t
}(BaseView);
pushStateSupported = !!history.pushState;
initialScrollTop = $(window).scrollTop();
$(window).on("resize", function() {
    resizeBackground();
    appViewModel === null || appViewModel === void 0 ? void 0 : appViewModel.updateScreenSize()
});
$(function() {
    var n = $(".nav-tabs");
    resizeBackground();
    n.on("click", "li a[href^=#]", function(n) {
        var r = hashSantize($(n.target).closest("a").attr("href")), t, i;
        pushStateSupported ? history.pushState(null, null, r) : (t = r.substr(1),
        t && (i = document.getElementById(t),
        i && (i.removeAttribute("id"),
        window.location.hash = r,
        i.setAttribute("id", t))))
    });
    n.on("shown.bs.tab", function(n) {
        DataLayerHandler.trackTabOpened(n.target.hash)
    });
    window.location.hash && n.find("[href^=" + hashSantize(window.location.hash) + "]").trigger("click").tab("show")
});
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(i) {
            var r = t.call(this) || this;
            return r.countryCodeObservable = ko.observable(r.countryCode),
            r.isInvitingFriendToCrew = ko.observable(!1),
            r.crewInvitePartial = ko.observable(),
            r.orderedIndex = ko.observable(),
            r.isInSessionLeague = ko.computed(function() {
                return appViewModel.leaguePartial() ? r.teamSlotsPartial() ? Enumerable.from(r.teamSlotsPartial().getItems()).any(function(n) {
                    return n.leaguePartial() && n.leaguePartial().id === appViewModel.leaguePartial().id
                }) : !1 : !1
            }),
            r.canBeInvited = ko.computed(function() {
                return !appViewModel.leaguePartial() || !appViewModel.userPartial() ? !1 : appViewModel.leaguePartial().isClosed() && !appViewModel.userPartial().isUser(appViewModel.leaguePartial().moderator) ? !1 : appViewModel.leaguePartial().vacancies === 0 ? !1 : r.isInSessionLeague() ? !1 : !0
            }),
            Helper.copyProperties(i, r),
            r.countryCodeObservable(r.countryCode),
            r.interests && r.interestsPartial(new n.UserInterestsPartial(r.interests)),
            r.customContentPartial(new n.UserCustomContentPartial(r.customContent)),
            r.connections && r.connectionsPartial(new n.UserConnectionsPartial(r.connections)),
            r.images && r.imagesPartial(new n.UserImagesPartial(r.images)),
            r.stats && r.statsPartial(new n.UserStatsPartial(r.stats)),
            r.teamSlots && r.teamSlotsPartial(new n.TeamSlotsPartial(r.teamSlots,r.signUpTimestamp)),
            r.gdprSettings && r.gdprSettingsPartial(new n.GdprSettingsPartial(r.gdprSettings)),
            r
        }
        return __extends(i, t),
        i.prototype.navigateTo = function() {
            window.location.href = Helper.replaceText(Urls.profile, [new KeyValuePair("userId",this.id.toString())])
        }
        ,
        i.prototype.getCrewInviteState = function(n) {
            return this.crewInvitePartial() ? UserCrewMembershipStatus.Pending : n === this.crewId ? UserCrewMembershipStatus.InYourCrew : this.crewId !== 0 && n !== this.crewId ? UserCrewMembershipStatus.HasCrew : UserCrewMembershipStatus.None
        }
        ,
        i.prototype.getPartnerNrImage = function() {
            return Helper.getPlatformImage(this.signupPlatformId)
        }
        ,
        i.prototype.areAdsEnabledForUser = function() {
            var n = LeanplumHelper.getInstance().getVariables("Settings", "AdWaitingHours", 72);
            return this.hasAds && Helper.getHoursSinceTimestamp(this.signUpTimestamp) > n
        }
        ,
        i.prototype.getAvatarUrl = function() {
            return this.imagesPartial() ? this.imagesPartial().getAvatarUrl() : ""
        }
        ,
        i.prototype.getKnownSkillRating = function() {
            if (!appViewModel.skillRatingBonusesPartial() || !this.teamSlotsPartial() || !this.statsPartial() || this.statsPartial().skillRating <= 0)
                return 0;
            var n = appViewModel.skillRatingBonusesPartial().getItems()
              , t = appViewModel.skillRatingBonusesPartial().getAlreadyShownBonuses(this.teamSlotsPartial())
              , i = Enumerable.from(n).where(function(n) {
                return !Enumerable.from(t).any(function(t) {
                    return t.id == n.id
                })
            }).sum(function(n) {
                return n.amount
            });
            return this.statsPartial().skillRating - i
        }
        ,
        i.prototype.getHighestSkillRating = function() {
            return this.statsPartial() ? this.statsPartial().highestSkillRating : 0
        }
        ,
        i.prototype.userHasUnkownTierUp = function() {
            if (!appViewModel.skillRatingBonusesPartial() || !this.statsPartial() || this.statsPartial().skillRating <= 0)
                return !1;
            var n = appViewModel.skillRatingTiersPartial().getTierForSkillRating(this.getKnownSkillRating())
              , t = appViewModel.skillRatingTiersPartial().getTierForSkillRating(this.statsPartial().skillRating);
            return t.level > n.level
        }
        ,
        i.prototype.hasTierRewardsToClaim = function() {
            if (!appViewModel.userRewardsPartial())
                return !1;
            var n = appViewModel.userRewardsPartial().getByActionType(ActionType.FirstTimeTierReachedEvent)
              , t = Enumerable.from(n).where(function(n) {
                return n.rewardVariationPartial() != null
            }).sum(function(n) {
                return n.rewardVariationPartial().value
            });
            return t > 0 && !this.userHasUnkownTierUp()
        }
        ,
        i
    }(n.User);
    n.UserPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return Helper.copyProperties(t, i),
            i
        }
        return __extends(t, n),
        t
    }(n.GdprSetting);
    n.GdprSettingPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(n) {
            var i = t.call(this) || this;
            return i.setItemsFromModels(n),
            i
        }
        return __extends(i, t),
        i.prototype.setItemsFromModels = function(t) {
            var i = [];
            t.forEach(function(t) {
                i.push(new n.GdprSettingPartial(t))
            });
            this.setItems(i)
        }
        ,
        i.prototype.getMostRecentChangedSettingForSettingType = function(n) {
            return Enumerable.from(this.getItems()).orderByDescending(function(n) {
                return n.lastModifiedTimestamp
            }).firstOrDefault(function(t) {
                return t.type === n
            })
        }
        ,
        i
    }(PartialArrayViewModel);
    n.GdprSettingsPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return Helper.copyProperties(t, i),
            i
        }
        return __extends(t, n),
        t
    }(n.UserConnection);
    n.UserConnectionPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return i.contentObservable = ko.observable(""),
            i.isContentCharacterLimitReached = ko.computed(function() {
                return i.contentObservable() ? i.contentObservable().length > 3e4 ? !0 : !1 : !1
            }),
            t && Helper.copyProperties(t, i),
            i.contentObservable(i.content),
            i
        }
        return __extends(t, n),
        t
    }(n.UserCustomContent);
    n.UserCustomContentPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return Helper.copyProperties(t, i),
            i
        }
        return __extends(t, n),
        t
    }(n.UserImage);
    n.UserImagePartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return i.mottoObservable = ko.observable(i.motto),
            i.favouriteTeamObservable = ko.observable(i.favouriteTeam),
            i.favouritePlayerObservable = ko.observable(i.favouritePlayer),
            t && Helper.copyProperties(t, i),
            i.mottoObservable(i.motto),
            i.favouriteTeamObservable(i.favouriteTeam),
            i.favouritePlayerObservable(i.favouritePlayer),
            i
        }
        return __extends(t, n),
        t
    }(n.UserInterests);
    n.UserInterestsPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return Helper.copyProperties(t, i),
            i
        }
        return __extends(t, n),
        t
    }(n.UserStats);
    n.UserStatsPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}();
CrewBattleRequestPartial = function(n) {
    function t(i) {
        var r = n.call(this) || this;
        return r.crewBattleBannerState = ko.computed(function() {
            return !r.participantsPartial() || !appViewModel.userPartialV1Dot1() ? t.CrewBattleBannerState.None : appViewModel.userPartialV1Dot1().teamSlotsPartial() && appViewModel.userPartialV1Dot1().teamSlotsPartial().isInBattle() ? t.CrewBattleBannerState.AlreadyInABattle : r.isQueueFull() ? t.CrewBattleBannerState.SearchingOpponent : r.checkIfManagerIsInQueue(appViewModel.userPartialV1Dot1().id) ? t.CrewBattleBannerState.WaitingForMembers : t.CrewBattleBannerState.JoinBattle
        }),
        Helper.copyProperties(i, r),
        r.participants && r.participantsPartial(new CrewMembersPartial(r.participants)),
        r
    }
    return __extends(t, n),
    t.prototype.getAmountOfOpenQueueSpace = function() {
        return this.maxParticipants - this.participantsPartial().count()
    }
    ,
    t.prototype.checkIfManagerIsInQueue = function(n) {
        return Enumerable.from(this.participantsPartial().getItems()).any(function(t) {
            return t.userId === n
        })
    }
    ,
    t.prototype.isQueueFull = function() {
        return this.maxParticipants === this.participantsPartial().count()
    }
    ,
    t.prototype.getCurrentProgressionStep = function() {
        return this.status === CrewBattleRequestStatus.Recruiting && this.getAmountOfOpenQueueSpace() !== 0 ? 1 : this.status === CrewBattleRequestStatus.Matchmaking || this.getAmountOfOpenQueueSpace() === 0 ? 2 : void 0
    }
    ,
    t
}(CrewBattleRequest),
function(n) {
    var t;
    (function(n) {
        n[n.None = 0] = "None";
        n[n.JoinBattle = 1] = "JoinBattle";
        n[n.WaitingForMembers = 2] = "WaitingForMembers";
        n[n.SearchingOpponent = 3] = "SearchingOpponent";
        n[n.AlreadyInABattle = 4] = "AlreadyInABattle"
    }
    )(t = n.CrewBattleBannerState || (n.CrewBattleBannerState = {}))
}(CrewBattleRequestPartial || (CrewBattleRequestPartial = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}();
CrewMemberPartial = function(n) {
    function t(i) {
        var r = n.call(this) || this;
        return r.visibleEditMemberInfoView = ko.observable(t.EditMemberInfoView.None),
        r.isPromoteMemberLoading = ko.observable(!1),
        r.isDemoteMemberLoading = ko.observable(!1),
        r.isKickingMemberLoading = ko.observable(!1),
        r.isTransferOwnershipLoading = ko.observable(!1),
        Helper.copyProperties(i, r),
        r
    }
    return __extends(t, n),
    t.prototype.toggleVisibleEditMemberInfoView = function(n, i) {
        if (this.userId === appViewModel.userPartial().id)
            return !1;
        if (n === this.visibleEditMemberInfoView())
            return this.visibleEditMemberInfoView(t.EditMemberInfoView.None),
            !1;
        if (i.status === CrewMemberStatus.President)
            return !1;
        this.visibleEditMemberInfoView(n)
    }
    ,
    t.prototype.isYourAccount = function() {
        return appViewModel.userPartial() ? this.userId === appViewModel.userPartial().id : !1
    }
    ,
    t
}(CrewMember),
function(n) {
    var t;
    (function(n) {
        n[n.None = 0] = "None";
        n[n.KickMember = 1] = "KickMember";
        n[n.PromoteMember = 2] = "PromoteMember";
        n[n.DemoteMember = 3] = "DemoteMember";
        n[n.TransferOwnershipOrDemote = 4] = "TransferOwnershipOrDemote";
        n[n.TransferOwnership = 5] = "TransferOwnership"
    }
    )(t = n.EditMemberInfoView || (n.EditMemberInfoView = {}))
}(CrewMemberPartial || (CrewMemberPartial = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), CrewMembersPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return t ? (i.sortingEnabled(!0),
        i.setItemsFromModels(t),
        i) : i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new CrewMemberPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.getCrewOwner = function() {
        return this.getItems() ? Enumerable.from(this.getItems()).firstOrDefault(function(n) {
            return n.status === CrewMemberStatus.President
        }) : null
    }
    ,
    t.prototype.orderByUserName = function() {
        this.sortItems(function(n) {
            return n.userName.toLowerCase()
        })
    }
    ,
    t.prototype.orderByRank = function() {
        this.sortItems(function(n) {
            return n.rank === 0
        }, [function(n) {
            return n.rank
        }
        ])
    }
    ,
    t.prototype.orderByNationality = function() {
        this.sortItems(function(n) {
            return n.countryCode
        })
    }
    ,
    t.prototype.orderByLastLogin = function() {
        this.sortItems(function(n) {
            return n.lastLoginTimestamp
        })
    }
    ,
    t.prototype.orderByStatus = function() {
        this.sortItems(function(n) {
            return n.status
        })
    }
    ,
    t.prototype.orderByBattleForm = function() {
        this.sortItems(function(n) {
            return n.battleForm
        })
    }
    ,
    t.prototype.isCrewOwner = function(n) {
        if (!this.getItems())
            return !1;
        var t = this.getCrewOwner();
        return t ? n === t.userId : !1
    }
    ,
    t.prototype.doesUserIdExistInCrewMembers = function(n) {
        return this.getItems() ? Enumerable.from(this.getItems()).any(function(t) {
            return t.userId === n
        }) : !1
    }
    ,
    t.prototype.getCrewMemberByUserId = function(n) {
        return this.getItems() ? Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.userId === n
        }) : null
    }
    ,
    t.prototype.getCrewOwnerAndVps = function() {
        return this.getItems() ? Enumerable.from(this.getItems()).where(function(n) {
            return n.status === CrewMemberStatus.President || n.status === CrewMemberStatus.Vp
        }).toArray() : null
    }
    ,
    t.prototype.isCrewOwnerOrVp = function(n) {
        return this.getItems() ? Enumerable.from(this.getItems()).any(function(t) {
            return t.userId === n && (t.status === CrewMemberStatus.President || t.status === CrewMemberStatus.Vp)
        }) : !1
    }
    ,
    t
}(PartialArrayViewModel), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), WebApiV1Dot1;
(function(n) {
    var t = function(n) {
        function t(t, i, r) {
            var u = n.call(this) || this;
            return u.daysUntilUnlockable = 0,
            u.emptyTeamSlotLayout = ko.observable(TeamSlotLayout.Default),
            Helper.copyProperties(t, u),
            u.setDaysUntilUnlockable(i, r),
            u.team && u.teamPartial(new TeamPartial(u.team)),
            u.league && u.leaguePartial(new LeaguePartial(u.league)),
            u.manager && u.managerPartial(new ManagerPartial(u.manager)),
            u.ranking && u.rankingPartial(new RankingPartial(u.ranking)),
            u.crewBattleRequest && u.crewBattleRequestPartial(new CrewBattleRequestPartial(u.crewBattleRequest)),
            u
        }
        return __extends(t, n),
        t.prototype.isOccupiedForCrewBattle = function() {
            return this.status === TeamSlotStatus.NotImplemented && this.crewBattleRequestPartial() && (this.crewBattleRequestPartial().status === CrewBattleRequestStatus.Matchmaking || this.crewBattleRequestPartial().status === CrewBattleRequestStatus.Recruiting)
        }
        ,
        t.prototype.isOccupiedForTicket = function() {
            return this.status === TeamSlotStatus.WinnersLeagueQueue
        }
        ,
        t.prototype.isOccupiedForWinnersLeague = function() {
            return this.status === TeamSlotStatus.NotImplemented && this.leaguePartial() && this.leaguePartial().mode === LeagueMode.WinnersLeague
        }
        ,
        t.prototype.isOccupiedForNormalLeague = function() {
            return this.leaguePartial() && this.leaguePartial().mode === LeagueMode.Normal && this.teamPartial() && this.teamPartial().id > 0
        }
        ,
        t.prototype.isOccupiedForVipLeague = function() {
            return this.leaguePartial() && this.leaguePartial().mode === LeagueMode.VipLeague && this.teamPartial() && this.teamPartial().id > 0
        }
        ,
        t.prototype.isOccupiedForFantasyLeague = function() {
            return this.isOccupiedForFantasyQueue() || this.isOccupiedForFantasyTeamSelection()
        }
        ,
        t.prototype.isOccupiedForFantasyQueue = function() {
            return this.status === TeamSlotStatus.InFantasyQueue
        }
        ,
        t.prototype.isOccupiedForPrizePool = function() {
            return this.status === TeamSlotStatus.InPrizePoolQueue || this.leaguePartial() && this.leaguePartial().isPrizePool()
        }
        ,
        t.prototype.isOccupiedForPrizePoolQueue = function() {
            return this.status === TeamSlotStatus.InPrizePoolQueue
        }
        ,
        t.prototype.isOccupiedForFantasyTeamSelection = function() {
            return this.status === TeamSlotStatus.InFantasyTeamSelection
        }
        ,
        t.prototype.isAvailable = function() {
            return !this.isOccupiedForTicket() && !this.isOccupiedForNormalLeague() && !this.isOccupiedForWinnersLeague() && !this.isOccupiedForVipLeague() && !this.isOccupiedForCrewBattle() && !this.isOccupiedForFantasyLeague() && !this.isOccupiedForPrizePool() && !this.isUnavailable && this.daysUntilUnlockable === 0
        }
        ,
        t.prototype.initEmptyTeamSlotLayout = function(n, t, i, r) {
            if (n && !i && (t && !r || !t)) {
                this.emptyTeamSlotLayout(TeamSlotLayout.VipLeague);
                return
            }
            if (t) {
                this.emptyTeamSlotLayout(TeamSlotLayout.WinnersLeague);
                return
            }
            this.emptyTeamSlotLayout(TeamSlotLayout.Default)
        }
        ,
        t.prototype.canJoinLeague = function(n) {
            return this.leaguePartial() && this.leaguePartial().isJoinable(n)
        }
        ,
        t.prototype.setDaysUntilUnlockable = function(n, t) {
            var i, r;
            if (!n || !t) {
                this.daysUntilUnlockable = 0;
                return
            }
            i = 0;
            switch (n) {
            case 1:
                i = 5;
                break;
            case 2:
                i = 20;
                break;
            case 3:
                i = 50
            }
            r = LeanplumHelper.getInstance().getVariables("TeamSlotUnlock", n.toString());
            r && (i = r);
            this.daysUntilUnlockable = this.calculateDaysUntilUnlockable(t, i)
        }
        ,
        t.prototype.calculateDaysUntilUnlockable = function(n, t) {
            var r = new Date(n * 1e3), u, i;
            return r.setDate(r.getDate() + t),
            u = (new Date).getTime(),
            i = Math.ceil((r.getTime() - u) / 864e5),
            i >= t && (i = t),
            i > 0 ? i : 0
        }
        ,
        t.prototype.navigateTo = function(n, t) {
            var r = this, i;
            if (this.leaguePartial() && this.leaguePartial().id !== 0) {
                if (n && this.teamPartial()) {
                    appViewModel.switchSlot(t, SwitchSlotFlow.Normal, this.isOccupiedForCrewBattle(), this.leaguePartial(), !1);
                    return
                }
                if (!n && (i = Enumerable.from(appViewModel.userPartial().teamSlotsPartial().getItems()).indexOf(function(n) {
                    return n.leaguePartial() && n.leaguePartial().id === r.leaguePartial().id
                }),
                i > -1 && appViewModel.userPartial().teamSlotsPartial().hasTeamInLeague(this.leaguePartial().id))) {
                    appViewModel.switchSlot(i, SwitchSlotFlow.Normal, this.isOccupiedForCrewBattle(), this.leaguePartial(), !1);
                    return
                }
                if (!SessionManager.hasTeam() && this.leaguePartial().canJoinLeagueAfterDays() && this.leaguePartial().vacancies !== 0) {
                    this.leaguePartial().isFantasyLeague() ? appViewModel.showSignContractForSpecificFantasyLeagueModal(this.leaguePartial()) : this.leaguePartial().navigateToChooseTeam();
                    return
                }
                this.leaguePartial().navigateTo()
            }
        }
        ,
        t
    }(n.TeamSlot);
    n.TeamSlotPartial = t
}
)(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(n, i) {
            var r = t.call(this) || this;
            return r.areAllSlotsOccupied = !1,
            r.areAllUnlockedSlotsOccupied = !1,
            r.cumulatedRankingPoints = ko.computed(function() {
                return Enumerable.from(r.getItems()).where(function(n) {
                    return n.rankingPartial() !== null && n.rankingPartial() !== undefined
                }).sum(function(n) {
                    return n.rankingPartial().points
                })
            }),
            r.setItemsFromModels(n, i),
            r.getItems() && r.getItems().length === 4 && Enumerable.from(r.getItems()).all(function(n) {
                return n.teamPartial() && n.teamPartial().id > 0
            }) && (r.areAllSlotsOccupied = !0),
            r.getItems() && Enumerable.from(r.getItems()).where(function(n) {
                return n.daysUntilUnlockable === 0
            }).all(function(n) {
                return n.teamPartial() && n.teamPartial().id > 0 || n.isOccupiedForCrewBattle()
            }) && (r.areAllUnlockedSlotsOccupied = !0),
            r
        }
        return __extends(i, t),
        i.prototype.setLayoutForEmptyTeamSlots = function(n, t) {
            var i = this;
            this.getItems().forEach(function(r) {
                return i.setLayoutForEmptyTeamSlot(r, n, t)
            })
        }
        ,
        i.prototype.setLayoutForEmptyTeamSlot = function(n, t, i) {
            if (n && (!n.leaguePartial() || n.leaguePartial().id === 0) && !n.isOccupiedForCrewBattle() && !n.isOccupiedForTicket()) {
                var r = t && t.hasForTeamSlotIndex(n.slotIndex) && !n.isOccupiedForNormalLeague()
                  , u = Enumerable.from(i).any()
                  , f = Enumerable.from(this.getItems()).any(function(n) {
                    return n.emptyTeamSlotLayout() === TeamSlotLayout.VipLeague
                })
                  , e = Enumerable.from(this.getItems()).any(function(t) {
                    return t.slotIndex > n.slotIndex && t.leaguePartial() && t.leaguePartial().id === 0 && !t.isOccupiedForTicket() && !t.isOccupiedForCrewBattle()
                });
                n.initEmptyTeamSlotLayout(u, r, f, e)
            }
        }
        ,
        i.prototype.setItemsFromModels = function(t, i) {
            for (var u, f = [], r = 0; r < 4; r++)
                u = t[r],
                u && f.push(new n.TeamSlotPartial(u,r,i));
            this.setItems(f)
        }
        ,
        i.prototype.isInLeague = function(n) {
            return Enumerable.from(this.getItems()).any(function(t) {
                return t.league && t.league.id === n
            })
        }
        ,
        i.prototype.filterWithJoinableLeagues = function(n) {
            return this.getItems().filter(function(t) {
                return t.teamPartial() && t.canJoinLeague(n)
            })
        }
        ,
        i.prototype.filterWithContinueLeagues = function() {
            return this.getItems().filter(function(n) {
                return n.league && n.league.id > 0 && (!n.team || n.team.id === 0)
            })
        }
        ,
        i.prototype.filterWithAvailableSlots = function() {
            return this.getItems().filter(function(n) {
                return n.isAvailable()
            })
        }
        ,
        i.prototype.filterWithActiveSlots = function() {
            return this.getItems().filter(function(n) {
                return n.leaguePartial() && n.leaguePartial().id > 0 && n.teamPartial() && n.teamPartial().id > 0
            })
        }
        ,
        i.prototype.isSlotAvailable = function(n) {
            return Enumerable.from(this.getItems()).any(function(t) {
                return t.isAvailable() && t.slotIndex === n
            })
        }
        ,
        i.prototype.getByIndex = function(n) {
            return Enumerable.from(this.getItems()).elementAtOrDefault(n)
        }
        ,
        i.prototype.isInBattle = function() {
            return Enumerable.from(this.getItems()).any(function(n) {
                return n.leaguePartial() && n.leaguePartial().mode === LeagueMode.Battle
            })
        }
        ,
        i.prototype.getCumulatedTeamSlot = function() {
            var t = new n.TeamSlot;
            return t.manager = new Manager,
            t.manager.total = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().total : 0
            }),
            t.manager.wins = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().wins : 0
            }),
            t.manager.losses = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().losses : 0
            }),
            t.manager.resignCount = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().resignCount : 0
            }),
            t.manager.points = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().points : 0
            }),
            t.manager.skillRating = Enumerable.from(this.getItems()).sum(function(n) {
                return n.managerPartial() ? n.managerPartial().skillRating : 0
            }),
            new n.TeamSlotPartial(t,null,null)
        }
        ,
        i.prototype.hasTeamInLeague = function(n) {
            return Enumerable.from(this.getItems()).any(function(t) {
                return t.teamPartial() && t.teamPartial().id > 0 && t.leaguePartial() && t.leaguePartial().id === n
            })
        }
        ,
        i.prototype.getTeamSlotFromLeagueId = function(n) {
            return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
                return t.league && t.league.id === n
            })
        }
        ,
        i
    }(PartialArrayViewModel);
    n.TeamSlotsPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(n) {
            var i = t.call(this) || this;
            return i.setItemsFromModels(n),
            i
        }
        return __extends(i, t),
        i.prototype.setItemsFromModels = function(t) {
            var i = [];
            t.forEach(function(t) {
                i.push(new n.UserConnectionPartial(t))
            });
            Enumerable.from(i).any(function(n) {
                return n.type === UserConnectionType.Email
            }) || i.push(new n.UserConnectionPartial({
                value: "",
                type: UserConnectionType.Email,
                isVerified: !1
            }));
            this.setItems(i)
        }
        ,
        i.prototype.getEmailConnectionFromConnectionsOrderedByIsVerified = function(n) {
            return (n === void 0 && (n = !0),
            !this.getItems() || this.getItems().length === 0) ? null : Enumerable.from(this.getItems()).where(function(n) {
                return n.type === UserConnectionType.Email
            }).orderByDescending(function(t) {
                return t.isVerified === n
            }).thenByDescending(function(n) {
                return n.value
            }).firstOrDefault()
        }
        ,
        i.prototype.getEmailConnectionFromConnections = function(n) {
            return (n === void 0 && (n = !0),
            !this.getItems() || this.getItems().length === 0) ? null : Enumerable.from(this.getItems()).firstOrDefault(function(t) {
                return t.type === UserConnectionType.Email && t.isVerified === n
            })
        }
        ,
        i
    }(PartialArrayViewModel);
    n.UserConnectionsPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(n) {
            var i = t.call(this) || this;
            return i.setItemsFromModels(n),
            i
        }
        return __extends(i, t),
        i.prototype.setItemsFromModels = function(t) {
            var i = [];
            t.forEach(function(t) {
                i.push(new n.UserImagePartial(t))
            });
            this.setItems(i)
        }
        ,
        i.prototype.getAvatarUrl = function() {
            var n = Enumerable.from(this.getItems()).where(function(n) {
                return n.type === UserImageType.Avatar
            }).firstOrDefault();
            return Helper.getAvatarUrl(n.url, AvatarType.Player)
        }
        ,
        i
    }(PartialArrayViewModel);
    n.UserImagesPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(),
function(n) {
    var t = function(t) {
        function i(n) {
            var i = t.call(this) || this;
            return i.setItemsFromModels(n),
            i.sortingEnabled(!0),
            i
        }
        return __extends(i, t),
        i.prototype.setItemsFromModels = function(t) {
            var i = [];
            t.forEach(function(t) {
                i.push(new n.UserPartial(t))
            });
            this.setItems(i)
        }
        ,
        i.prototype.orderBySkillRating = function(n) {
            n === void 0 && (n = !1);
            this.sortItems(function(n) {
                return n.statsPartial() && n.statsPartial().skillRating
            }, null, null, n)
        }
        ,
        i.prototype.orderByName = function(n) {
            n === void 0 && (n = null);
            this.sortItems(function(n) {
                return n.name && n.name.toLowerCase()
            }, null, n)
        }
        ,
        i.prototype.orderByCountryCode = function() {
            this.sortItems(function(n) {
                return n.countryCode
            })
        }
        ,
        i.prototype.orderByLastLogin = function() {
            this.sortItems(function(n) {
                return n.lastLoginTimestamp
            })
        }
        ,
        i.prototype.orderByCrewStatus = function(n, t) {
            t === void 0 && (t = null);
            this.sortItems(function(t) {
                return t.getCrewInviteState(n) === UserCrewMembershipStatus.Pending
            }, [function(t) {
                return t.getCrewInviteState(n) === UserCrewMembershipStatus.HasCrew
            }
            , function(t) {
                return t.getCrewInviteState(n) === UserCrewMembershipStatus.InYourCrew
            }
            , function(t) {
                return t.getCrewInviteState(n) === UserCrewMembershipStatus.None
            }
            , function(n) {
                return n.name
            }
            ], t)
        }
        ,
        i.prototype.countUsersByCrewId = function(n) {
            return Enumerable.from(this.getItems()).count(function(t) {
                return t.crewId === n
            })
        }
        ,
        i
    }(PartialArrayViewModel);
    n.UsersPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
var WatchVideosService = function() {
    function n() {}
    return n.prototype.spyTimerWatchVideo = function(n, t, i, r) {
        var f = {
            rewardId: r
        }
          , u = RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/spyinstructions/" + i + "/consumereward", HttpMethod.Post, f);
        return u.requestQuery.is503Valid = !1,
        u
    }
    ,
    n.prototype.scoutTimerConsumeWatchVideoReward = function(n, t, i) {
        var u = {
            rewardId: i
        }
          , r = RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/scoutinstructions/consumereward", HttpMethod.Post, u);
        return r.requestQuery.is503Valid = !1,
        r
    }
    ,
    n.prototype.clubfundsConsumeWatchVideoReward = function(n, t, i) {
        var u = {
            rewardId: i
        }
          , r = RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/finances/consumereward", HttpMethod.Post, u);
        return r.requestQuery.is503Valid = !1,
        r
    }
    ,
    n.prototype.trainingSessionWatchVideo = function(n, t, i, r) {
        var f = {
            rewardId: r
        }, u;
        return CacheHandler.getInstance().removeKeysStartingWith(CacheKey.TrainingSessionsOngoing),
        u = RequestItemFactory.getInstance().createRequestItemSingle("leagues/" + n + "/teams/" + t + "/trainingsessions/" + i + "/consumereward", HttpMethod.Post, f),
        u.requestQuery.is503Valid = !1,
        u
    }
    ,
    n.prototype.videoWatched = function(n, t, i) {
        var r = {
            placementId: n,
            rewardVariation: t,
            capVariation: i
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/rewards/videowatched", HttpMethod.Post, r)
    }
    ,
    n.prototype.getCaps = function(n, t) {
        t === void 0 && (t = 0);
        var i = (new breeze.EntityQuery).from("/user/videos/caps?placementGroup=" + n + "&variation=" + t);
        return RequestItemFactory.getInstance().createRequestItem(i, CacheKey[CacheKey.VideoCaps], !0)
    }
    ,
    n.prototype.startVideo = function(n, t) {
        var i = {
            placement: n,
            capVariation: t
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("user/videos/start", HttpMethod.Post, i)
    }
    ,
    n
}()
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ActionRewardPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i.rewards && i.rewardVariationsPartial(new RewardVariationsPartial(i.rewards)),
        i
    }
    return __extends(t, n),
    t.prototype.getFirstRewardVariation = function(n) {
        return n === void 0 && (n = 0),
        Enumerable.from(this.rewardVariationsPartial().getItems()).firstOrDefault(function(t) {
            return t.variation === n
        })
    }
    ,
    t.prototype.getPrizePoolRewardType = function() {
        var n, t;
        return this.type !== ActionType.PrizePool ? PrizePoolRewardType.None : (t = this.id.split("-")[0] + "-",
        (n = PrizePoolRewardType[Helper.getEnumKeyByEnumValue(PrizePoolRewardType, t)]) !== null && n !== void 0 ? n : PrizePoolRewardType.None)
    }
    ,
    t.prototype.getPrizePoolContestantsAmountForReward = function() {
        if (this.type !== ActionType.PrizePool)
            return 0;
        var n = this.getPrizePoolRewardType();
        switch (n) {
        case PrizePoolRewardType.Winner:
            return 2;
        case PrizePoolRewardType.RunnerUp:
            return 2;
        case PrizePoolRewardType.SemiFinalist:
            return 4;
        case PrizePoolRewardType.QuarterFinalist:
            return 8;
        case PrizePoolRewardType.EightFinalist:
            return 16;
        case PrizePoolRewardType.SixteenthFinalist:
            return 32
        }
    }
    ,
    t
}(ActionReward)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , RewardVariationPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        t.action && i.actionRewardPartial(new ActionRewardPartial(t.action)),
        i
    }
    return __extends(t, n),
    t
}(RewardVariation)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TimerRewardVariationPartial = function(n) {
    function t(t) {
        return n.call(this, t) || this
    }
    return __extends(t, n),
    t.prototype.getValueInSeconds = function() {
        return this.value * 60
    }
    ,
    t.prototype.animateTimestampReduction = function(n) {
        return n.reduceFinishedTimestamp(this.getValueInSeconds(), !0)
    }
    ,
    t
}(RewardVariationPartial)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BossCoinRewardVariationPartial = function(n) {
    function t(t) {
        return n.call(this, t) || this
    }
    return __extends(t, n),
    t
}(RewardVariationPartial)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ClubFundsRewardVariationPartial = function(n) {
    function t(t) {
        return n.call(this, t) || this
    }
    return __extends(t, n),
    t.prototype.calculateClubfundsAmountForReward = function() {
        var n = appViewModel.teamPartial().budget;
        return this.value * n / 100
    }
    ,
    t
}(RewardVariationPartial)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , VipLeagueRewardVariationPartial = function(n) {
    function t(t) {
        return n.call(this, t) || this
    }
    return __extends(t, n),
    t
}(RewardVariationPartial)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , RewardVariationsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            switch (n.type) {
            case RewardVariation.RewardType.ReduceSpyTimer:
            case RewardVariation.RewardType.ReduceTrainingTimer:
            case RewardVariation.RewardType.ReduceScoutTimer:
                t.push(new TimerRewardVariationPartial(n));
                break;
            case RewardVariation.RewardType.BossCoins:
                t.push(new BossCoinRewardVariationPartial(n));
                break;
            case RewardVariation.RewardType.VipLeague:
                t.push(new VipLeagueRewardVariationPartial(n));
                break;
            case RewardVariation.RewardType.ClubFunds:
                t.push(new ClubFundsRewardVariationPartial(n));
                break;
            default:
                t.push(new RewardVariationPartial(n))
            }
        });
        this.setItems(t)
    }
    ,
    t.prototype.getVariationsType = function() {
        return Enumerable.from(this.getItems()).select(function(n) {
            return n.type
        }).firstOrDefault()
    }
    ,
    t.prototype.getRewardVariation = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.variation === n
        })
    }
    ,
    t
}(PartialArrayViewModel)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ActionRewardsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new ActionRewardPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.getByType = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.rewardVariationsPartial() && t.rewardVariationsPartial().getVariationsType() == n
        }).toArray()
    }
    ,
    t.prototype.getByActionType = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.type === n
        }).toArray()
    }
    ,
    t.prototype.getVideoActionRewardVariationForId = function(n) {
        var t = this.getVideoActionRewardLeanplumCategory(n)
          , i = this.getVideoActionRewardLeanplumChildKey(n)
          , r = LeanplumHelper.getInstance().getVariables(t, i, 0);
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.id.toLowerCase() === n.toLowerCase()
        }).select(function(n) {
            return n.rewardVariationsPartial().getRewardVariation(r)
        }).firstOrDefault()
    }
    ,
    t.prototype.getVideoActionRewardLeanplumCategory = function(n) {
        switch (n) {
        case WatchVideoPlacementType.Spy:
        case WatchVideoPlacementType.Training:
        case WatchVideoPlacementType.Scout:
            return "TimerVariationRV";
        case WatchVideoPlacementType.BusinessClub:
        case WatchVideoPlacementType.Header:
        case WatchVideoPlacementType.Shop:
        case WatchVideoPlacementType.Transfers:
            return "BossCoinRV"
        }
    }
    ,
    t.prototype.getVideoActionRewardLeanplumChildKey = function(n) {
        switch (n) {
        case WatchVideoPlacementType.Spy:
            return "SpyTimer";
        case WatchVideoPlacementType.Training:
            return "TrainingTimer";
        case WatchVideoPlacementType.Scout:
            return "ScoutTimer";
        case WatchVideoPlacementType.BusinessClub:
        case WatchVideoPlacementType.Header:
        case WatchVideoPlacementType.Shop:
        case WatchVideoPlacementType.Transfers:
            return n
        }
    }
    ,
    t.prototype.getVideoActionCapRewardVariationForId = function(n) {
        var t = this.getVideoActionCapRewardLeanplumCategory(n)
          , i = this.getVideoActionCapRewardLeanplumChildKey(n);
        return LeanplumHelper.getInstance().getVariables(t, i, 0)
    }
    ,
    t.prototype.getVideoActionCapRewardLeanplumCategory = function(n) {
        switch (n) {
        case WatchVideoPlacementType.Spy:
        case WatchVideoPlacementType.BusinessClub:
        case WatchVideoPlacementType.Header:
        case WatchVideoPlacementType.Shop:
        case WatchVideoPlacementType.Transfers:
        case WatchVideoPlacementType.Training:
        case WatchVideoPlacementType.Scout:
            return "CapVariationRV"
        }
    }
    ,
    t.prototype.getVideoActionCapRewardLeanplumChildKey = function(n) {
        switch (n) {
        case WatchVideoPlacementType.Training:
            return "TrainingTimer";
        case WatchVideoPlacementType.Spy:
            return "SpyTimer";
        case WatchVideoPlacementType.Scout:
            return "ScoutTimer";
        case WatchVideoPlacementType.BusinessClub:
        case WatchVideoPlacementType.Header:
        case WatchVideoPlacementType.Shop:
        case WatchVideoPlacementType.Transfers:
            return n
        }
    }
    ,
    t.prototype.getPrizePoolRewardForRewardType = function(n, t) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(i) {
            return i.id === n + t
        })
    }
    ,
    t
}(PartialArrayViewModel)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , UserRewardPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        t.action && i.actionRewardPartial(new ActionRewardPartial(t.action)),
        t.reward && i.rewardVariationPartial(new RewardVariationPartial(t.reward)),
        t.expiredTimestamp && i.expirationCountdownTimerPartial(new CountdownTimerPartial(i.createExpiredCountdownTimer(i.expiredTimestamp))),
        i
    }
    return __extends(t, n),
    t.prototype.createExpiredCountdownTimer = function(n) {
        var t = new CountdownTimer;
        return t.finishedTimestamp = n,
        t
    }
    ,
    t.prototype.isRewardSeen = function() {
        if (!this.actionRewardPartial())
            return !1;
        switch (this.actionRewardPartial().type) {
        case ActionType.InvitedForVipLeagueEvent:
            return CookieHelper.isVipTicketRewardSeen(this.id);
        default:
            return !1
        }
    }
    ,
    t
}(UserReward)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , UserRewardsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.addItemsFromModels(t, UserRewardPartial),
        i
    }
    return __extends(t, n),
    t.prototype.getByActionType = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.actionRewardPartial() && t.actionRewardPartial().type == n
        }).toArray()
    }
    ,
    t.prototype.getUnseenRewardsByActionType = function(n) {
        return Enumerable.from(this.getByActionType(n)).where(function(n) {
            return !n.isRewardSeen()
        }).toArray()
    }
    ,
    t
}(PartialArrayViewModel)
  , PromoCodeService = function() {
    function n() {}
    return n.prototype.claimVoucher = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/promocode/claim", HttpMethod.Post, {
            code: n
        })
    }
    ,
    n
}()
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                t.hasOwnProperty(i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , ClaimPromoCodeModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            template: ModalTemplate.ClaimPromoCode,
            modalSize: ModalSize.Normal,
            showCloseButton: !1
        }) || this;
        return i._redirectionTimeout = 1500,
        i.reward = ko.observable(),
        i.reward(t),
        i
    }
    return __extends(t, n),
    t.prototype.claimCoins = function() {
        var n = this;
        appViewModel.refreshBossCoinsWallet().then(function() {
            n.hide()
        })
    }
    ,
    t
}(BaseModal)
