var OffersService = function() {
    function n() {}
    return n.prototype.getByTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("/leagues/".concat(n, "/teams/").concat(t, "/offers"));
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.post = function(n, t, i, r) {
        var u = {
            playerId: i,
            price: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/offers"), HttpMethod.Post, u)
    }
    ,
    n.prototype.counter = function(n, t, i, r) {
        var u = {
            price: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/offers/").concat(i, "/counter"), HttpMethod.Post, u)
    }
    ,
    n.prototype.accept = function(n, t, i) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/offers/").concat(i, "/accept"), HttpMethod.Put)
    }
    ,
    n.prototype.reject = function(n, t, i) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/offers/").concat(i, "/reject"), HttpMethod.Put)
    }
    ,
    n.prototype.withdraw = function(n, t, i) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/offers/").concat(i), HttpMethod.Delete)
    }
    ,
    n
}(), TransfersService = function() {
    function n() {}
    return n.prototype.getAllTransfers = function(n, t, i) {
        var r = (new breeze.EntityQuery).from("/leagues/".concat(n, "/transfers?limit=").concat(i, "&offset=").concat(t));
        return RequestItemFactory.getInstance().createRequestItem(r, !0)
    }
    ,
    n.prototype.getAllTransfersForWeek = function(n, t) {
        var i = (new breeze.EntityQuery).from("/leagues/".concat(n, "/transfers/").concat(t));
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.getAllTransfersForTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("/leagues/".concat(n, "/team/").concat(t, "/transfers"));
        return RequestItemFactory.getInstance().createRequestItem(i, !0)
    }
    ,
    n.prototype.quickSell = function(n, t, i, r, u) {
        var f = "/leagues/".concat(n, "/teams/").concat(t, "/players/").concat(i, "/quicksell");
        return RequestItemFactory.getInstance().createRequestItemSingle(f, HttpMethod.Post, {
            productId: r,
            pricePercentageGameVariableId: u
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
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
        i.showUpgradeArrow = ko.observable(!1),
        i.totalPercentage = ko.computed(function() {
            return i.progressPercentage() + i.progressForecast
        }),
        i.forecastPercentage = ko.observable(),
        i.textualForecastPercentage = ko.observable(),
        Helper.copyProperties(t, i),
        i.progressPercentage(i.progress),
        i.setForecastPercentage(),
        i
    }
    return __extends(t, n),
    t.prototype.willLevelUp = function() {
        return this.progress + this.progressForecast >= 100
    }
    ,
    t.prototype.setForecastPercentage = function() {
        this.forecastPercentage(this.totalPercentage() > 100 ? 100 - this.progress : this.progressForecast);
        this.textualForecastPercentage(this.progressForecast)
    }
    ,
    t.prototype.animate = function(n, t, i) {
        var h = this, u, f;
        i === void 0 && (i = 0);
        u = Q.defer();
        this.isAnimating(!0);
        f = 0;
        n(i);
        var e = i > t
          , c = e ? i - t : t - i
          , o = 10
          , s = 1e3 / o
          , r = c / s
          , l = s * r
          , a = setInterval(function() {
            if (f += r,
            f >= l) {
                clearInterval(a);
                u.resolve(!0);
                h.isAnimating(!1);
                return
            }
            e ? n() > t && n(n() - r) : n() < t && n(n() + r)
        }, o);
        return u.promise
    }
    ,
    t.prototype.animateProgressBar = function(n, t) {
        return t === void 0 && (t = 0),
        this.animate(this.progressPercentage, n, t)
    }
    ,
    t.prototype.animateForecastBar = function(n, t) {
        return t === void 0 && (t = 0),
        this.animate(this.forecastPercentage, n, t)
    }
    ,
    t.prototype.animateTextualForecastBar = function(n, t) {
        return t === void 0 && (t = 0),
        this.animate(this.textualForecastPercentage, n, t)
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
}(Progress), TransferPlayerService = function() {
    function n() {}
    return n.prototype.getByTeam = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/".concat(n, "/teams/").concat(t, "/transferplayers"));
        return RequestItemFactory.getInstance().createRequestItem(i)
    }
    ,
    n.prototype.getByTransferPlayerType = function(n, t, i) {
        var r = (new breeze.EntityQuery).from("leagues/".concat(n, "/teams/").concat(t, "/transferplayers/").concat(i));
        return RequestItemFactory.getInstance().createRequestItem(r)
    }
    ,
    n.prototype.boostScout = function(n, t, i, r) {
        var u = {
            productId: i,
            minPriceGameSettingId: 0,
            maxPriceGameSettingId: 0,
            timerGameSettingId: 0,
            shouldBoostPlayers: r
        };
        return RequestItemFactory.getInstance().createRequestItem("leagues/".concat(n, "/teams/").concat(t, "/boostscout"), HttpMethod.Put, u)
    }
    ,
    n.prototype.claim = function(n, t, i) {
        var r = {
            timerGameSettingId: 0,
            minPriceGameSettingId: 0,
            maxPriceGameSettingId: 0,
            shouldBoostPlayers: i
        };
        return RequestItemFactory.getInstance().createRequestItem("leagues/".concat(n, "/teams/").concat(t, "/claimscout"), HttpMethod.Put, r)
    }
    ,
    n.prototype.buy = function(n, t, i, r) {
        var u = {
            productId: r
        };
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/transferplayers/").concat(i, "/buy"), HttpMethod.Put, u)
    }
    ,
    n.prototype.validateTransfer = function(n, t, i) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/transferplayers/").concat(i, "/validatetransfer"), HttpMethod.Post)
    }
    ,
    n.prototype.deleteById = function(n, t, i) {
        return RequestItemFactory.getInstance().createRequestItemSingle("leagues/".concat(n, "/teams/").concat(t, "/transferplayers/").concat(i), HttpMethod.Delete)
    }
    ,
    n.prototype.getSpecialOffer = function(n, t) {
        var i = (new breeze.EntityQuery).from("leagues/".concat(n, "/teams/").concat(t, "/specialoffer"));
        return RequestItemFactory.getInstance().createRequestItemSingle(i, !0)
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PlayerModal = function(n) {
    function t(t, i, r, u) {
        var f = n.call(this, {
            template: u,
            screenModeXs: ScreenMode.Normal,
            showCloseButton: !1,
            showCloseButtonLarge: !0,
            container: ModalContainer.Generic
        }) || this;
        return f.player = t,
        f.teamPartial = i,
        f.leaguePartial = r,
        f
    }
    return __extends(t, n),
    t.prototype.isSessionLeague = function() {
        return this.leaguePartial && this.leaguePartial.isSessionLeague()
    }
    ,
    t.prototype.isSessionTeam = function() {
        return this.teamPartial && this.teamPartial.isSessionTeam()
    }
    ,
    t.prototype.areTransfersEnabled = function() {
        return !this.leaguePartial || !this.leaguePartial.settingsPartial() ? !1 : this.leaguePartial.settingsPartial().areTransfersEnabled
    }
    ,
    t.prototype.showTransfersDisabledToast = function() {
        this.hide();
        appViewModel.toastsPartial().addItemTimed(new FeedbackToast(FeedbackToast.Type.TransfersInLeagueDisabled))
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PlayerInNegotiationModal = function(n) {
    function t(t, i, r, u) {
        return n.call(this, t, i, r, u) || this
    }
    return __extends(t, n),
    t.prototype.redirectToOffers = function(n) {
        n && (window.location.href = Urls.offers + "/" + n.id)
    }
    ,
    t
}(PlayerModal), __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}(), PlayerPriceModal = function(n) {
    function t(t, i, r, u) {
        var f = n.call(this, t, i, r, u) || this;
        return f.viewType = ko.observable(PlayerPriceViewType.Stats),
        f.price = ko.observable(),
        f.isInitialized = ko.observable(!1),
        f.minPricePercentage = .75,
        f.maxPricePercentage = ko.observable(2.5),
        f.playerValue = ko.observable(0),
        f.minPrice = ko.computed(function() {
            return Math.round(f.playerValue() * f.minPricePercentage)
        }),
        f.maxPrice = ko.computed(function() {
            return Math.round(f.playerValue() * f.maxPricePercentage())
        }),
        appViewModel.appViewModelDataLoadedDeferred.promise.then(function() {
            if (appViewModel.gameSettingsPartial()) {
                var n = appViewModel.gameSettingsPartial().getValue(GameVarCategory.Transfer, "MaxSalePercentage") / 100;
                n && f.maxPricePercentage(n)
            }
            f.isInitialized(!0)
        }),
        f.playerValue(t.value),
        f.price(t.value),
        f
    }
    return __extends(t, n),
    t.prototype.setPrice = function() {
        var n = this.price();
        this.price(this.player.value);
        this.viewType(PlayerPriceViewType.SetPrice);
        this.price(n)
    }
    ,
    t.prototype.showStats = function() {
        this.viewType(PlayerPriceViewType.Stats)
    }
    ,
    t
}(PlayerModal), PlayerPriceViewType, TransferDomesticPlayerModal;
(function(n) {
    n[n.Stats = 0] = "Stats";
    n[n.SetPrice = 1] = "SetPrice"
}
)(PlayerPriceViewType || (PlayerPriceViewType = {}));
__extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}();
TransferDomesticPlayerModal = function(n) {
    function t(i, r, u, f, e) {
        var o = n.call(this, i.playerPartial(), r, u, ModalTemplate.BuyDomesticPlayer) || this;
        return o.transferPlayerPartial = ko.observable(),
        o._isHiddenDeferred = Q.defer(),
        o.currentOfferPartial = ko.observable(),
        o.visibleBottomView = ko.observable(t.BottomViewType.Stats),
        o.isLoadingBuyAction = ko.observable(!1),
        o.playerTransferStatusHasBeenChanged = ko.observable(!1),
        o.minOfferPrice = ko.computed(function() {
            return !o.transferPlayerPartial() || !o.transferPlayerPartial().playerPartial() ? o.price() : Math.round(o.transferPlayerPartial().playerPartial().value * o.minPricePercentage)
        }),
        o.offerPrice = ko.computed(function() {
            return !o.transferPlayerPartial() || !o.transferPlayerPartial().playerPartial() || !o.currentOfferPartial() || !o.currentOfferPartial().bidsPartial() || !o.currentOfferPartial().bidsPartial().lastBid() ? o.price() : o.currentOfferPartial().bidsPartial().lastBid().price
        }),
        o.transferPlayerSliderState = ko.computed(function() {
            return !o.transferPlayerPartial() || o.price() === o.transferPlayerPartial().price ? t.TransferPlayerSliderState.SameAsOriginalPrice : o.currentOfferPartial() && o.currentOfferPartial().bidsPartial() && o.currentOfferPartial().bidsPartial().lastBid() ? o.price() === o.currentOfferPartial().bidsPartial().lastBid().price ? o.currentOfferPartial().isLatestBidByOwner() ? t.TransferPlayerSliderState.SameAsAlreadyOutstandingCounterOffer : t.TransferPlayerSliderState.SameAsAlreadyOutstandingOffer : o.price() > o.currentOfferPartial().bidsPartial().lastBid().price ? t.TransferPlayerSliderState.HigherThanAlreadyOutstandingOffer : t.TransferPlayerSliderState.LowerThanAlreadyOutstandingOffer : o.price() !== o.transferPlayerPartial().price ? t.TransferPlayerSliderState.DifferentThanOriginalPrice : void 0
        }),
        o.transferPlayerPartial(i),
        o._offerService = f,
        o.price(i.price),
        e && o.currentOfferPartial(e),
        o.hiddenEventFunction = function() {
            if (o.playerTransferStatusHasBeenChanged())
                o._isHiddenDeferred.resolve();
            else {
                var n = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Player transfer status has not been changed, no update needed");
                o._isHiddenDeferred.reject(n)
            }
        }
        ,
        i.isTransferred.subscribe(function(n) {
            n && o.hide()
        }),
        o.isLoadingBuyAction.subscribe(function(n) {
            n && o.playerTransferStatusHasBeenChanged(!0)
        }),
        o
    }
    return __extends(t, n),
    t.prototype.determineBuyActionForTransferPlayer = function() {
        if (this.transferPlayerSliderState() === t.TransferPlayerSliderState.DifferentThanOriginalPrice) {
            this.sendOffer();
            return
        }
        if (this.transferPlayerSliderState() === t.TransferPlayerSliderState.HigherThanAlreadyOutstandingOffer || this.transferPlayerSliderState() === t.TransferPlayerSliderState.LowerThanAlreadyOutstandingOffer) {
            window.location.href = Urls.offers;
            return
        }
        if (this.transferPlayerSliderState() === t.TransferPlayerSliderState.SameAsAlreadyOutstandingCounterOffer) {
            this.acceptCounterOffer();
            return
        }
        if (this.transferPlayerSliderState() === t.TransferPlayerSliderState.SameAsAlreadyOutstandingOffer) {
            this.withdrawOffer();
            return
        }
        if (this.transferPlayerSliderState() === t.TransferPlayerSliderState.SameAsOriginalPrice) {
            this.buyPlayer();
            return
        }
    }
    ,
    t.prototype.show = function() {
        return n.prototype.show.call(this),
        this._isHiddenDeferred.promise
    }
    ,
    t.prototype.sendOffer = function() {
        var n = this, t;
        this.isLoadingBuyAction(!0);
        t = this._offerService.post(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.transferPlayerPartial().playerPartial().id, this.price());
        WebApi.getInstance().execute(t).then(function(t) {
            n.currentOfferPartial(new OfferPartial(t));
            LeanplumHelper.getInstance().trackEvent(LeanplumTrackingService.Event.PlayerCardMakeOffer)
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n)
        }).done(function() {
            n.isLoadingBuyAction(!1)
        })
    }
    ,
    t.prototype.withdrawOffer = function() {
        var n = this, t;
        this.isLoadingBuyAction(!0);
        t = this._offerService.withdraw(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.currentOfferPartial().id);
        WebApi.getInstance().execute(t).then(function() {
            n.currentOfferPartial(null)
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n)
        }).done(function() {
            n.isLoadingBuyAction(!1)
        })
    }
    ,
    t.prototype.isOutstandingOfferBelowTransferPrice = function() {
        return !this.currentOfferPartial() || !this.currentOfferPartial().bidsPartial() || !this.currentOfferPartial().bidsPartial().lastBid() ? !1 : this.currentOfferPartial().bidsPartial().lastBid().price < this.transferPlayerPartial().price
    }
    ,
    t.prototype.buyPlayer = function() {
        this.transferPlayerPartial() && this.transferPlayerPartial().buy()
    }
    ,
    t.prototype.acceptCounterOffer = function() {
        var n = this;
        if (this.currentOfferPartial() && this.currentOfferPartial().bidsPartial()) {
            this.isLoadingBuyAction(!0);
            var i = this._offerService.accept(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.currentOfferPartial().id)
              , t = this.currentOfferPartial().bidsPartial().lastBid().price
              , r = appViewModel.clubFundsWalletPartial().calculateClubFundsRemainderForPrice(t);
            WebApi.getInstance().execute(i).then(function() {
                if (n.currentOfferPartial().isIncomingOffer()) {
                    var i = SessionManager.getInstance().session ? "S" + SessionManager.getInstance().session.slotIndex : "";
                    LeanplumHelper.getInstance().trackEventWithValue(LeanplumTrackingService.Event.CFClaim, t, {
                        CFClaimSource: "PlayerOffer",
                        Teamslot: i,
                        PlayerName: n.currentOfferPartial().playerPartial() ? n.currentOfferPartial().playerPartial().name : ""
                    })
                } else
                    LeanplumHelper.getInstance().trackClubFundsSpentEvent(LeanplumHelper.ClubFundsProductType.OfferPlayer, r, t, {
                        PlayerSource: "Offers",
                        PlayerName: n.currentOfferPartial().playerPartial() ? n.currentOfferPartial().playerPartial().name : ""
                    });
                n.hide();
                n.transferPlayerPartial().addFeedbackToast();
                setTimeout(function() {
                    window.location.href = Urls.squad
                }, 1e3)
            }).fail(function(n) {
                WebapiHelper.handleAndAlertError(n)
            }).done()
        }
    }
    ,
    t
}(PlayerPriceModal),
function(n) {
    var t, i;
    (function(n) {
        n[n.Stats = 0] = "Stats";
        n[n.BuyPlayer = 1] = "BuyPlayer"
    }
    )(t = n.BottomViewType || (n.BottomViewType = {})),
    function(n) {
        n[n.HigherThanAlreadyOutstandingOffer = 0] = "HigherThanAlreadyOutstandingOffer";
        n[n.LowerThanAlreadyOutstandingOffer = 1] = "LowerThanAlreadyOutstandingOffer";
        n[n.SameAsAlreadyOutstandingOffer = 2] = "SameAsAlreadyOutstandingOffer";
        n[n.SameAsAlreadyOutstandingCounterOffer = 3] = "SameAsAlreadyOutstandingCounterOffer";
        n[n.DifferentThanOriginalPrice = 4] = "DifferentThanOriginalPrice";
        n[n.SameAsOriginalPrice = 5] = "SameAsOriginalPrice"
    }(i = n.TransferPlayerSliderState || (n.TransferPlayerSliderState = {}))
}(TransferDomesticPlayerModal || (TransferDomesticPlayerModal = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransferPlayerModal = function(n) {
    function t(t, i, r, u, f) {
        f === void 0 && (f = null);
        var e = n.call(this, {
            template: u,
            showCloseButton: !1,
            showCloseButtonLarge: !0,
            container: ModalContainer.Generic,
            screenModeXs: ScreenMode.Normal
        }) || this;
        return e.player = ko.observable(),
        e._playerParent = ko.observable(),
        e.teamPartial = i,
        e.leaguePartial = r,
        e.player(t),
        e._playerParent(f),
        e.player().isTransferred.subscribe(function(n) {
            n && e.hide()
        }),
        e
    }
    return __extends(t, n),
    t.prototype.isEventActive = function() {
        return appViewModel.webAndEventNotificationsPartial() ? appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.SellPlayersHighSellChance) || appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.AllOut) : !1
    }
    ,
    t.prototype.removeFromTransferlist = function() {
        var n = this;
        this.player().removeFromTransferlist().then(function(t) {
            t && (n._playerParent() && (n._playerParent().transferPlayer = null,
            n._playerParent().transferPlayerPartial(null)),
            n.hide())
        }).done()
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , __spreadArray = this && this.__spreadArray || function(n, t, i) {
    if (i || arguments.length === 2)
        for (var r = 0, f = t.length, u; r < f; r++)
            !u && r in t || (u || (u = Array.prototype.slice.call(t, 0, r)),
            u[r] = t[r]);
    return n.concat(u || Array.prototype.slice.call(t))
}
  , SellPlayerModal = function(n) {
    function t(t, i, r, u, f, e) {
        f === void 0 && (f = !0);
        e === void 0 && (e = !1);
        var o = n.call(this, t, i, r, ModalTemplate.SellPlayer) || this;
        return o.isSelling = ko.observable(!1),
        o.shouldAnimateQuickSellRow = ko.observable(!1),
        o.quickSellBosscoinProduct = ko.observable(),
        o.quickSellDeferred = Q.defer(),
        o.areTransfersEnabled = ko.observable(),
        o._transfersService = u,
        o._showSurfacing = e,
        o.areTransfersEnabled(f),
        o.areTransfersEnabled() && isQuickSellEnabled && (o.options().centerContentsMobile = !1,
        o.options.valueHasMutated()),
        o.shownEventFunction = function() {
            o.shouldAnimateQuickSellRow(!0)
        }
        ,
        o.quickSellBosscoinProduct(Enumerable.from(appViewModel.bossCoinProductsPartial().getItems()).firstOrDefault(function(n) {
            return n.name === "QuickSellFee"
        })),
        o
    }
    return __extends(t, n),
    t.prototype.show = function() {
        n.prototype.show.call(this);
        this._showSurfacing && new StaffSurfacingModal(SurfacingFollowUp.SquadSellPlayerProfile,DudeType.Assistant).show().done()
    }
    ,
    t.prototype.sell = function() {
        var t = this, n;
        this.isSelling() || (this.isSelling(!0),
        n = appViewModel.webAndEventNotificationsPartial().getNotificationByType(NotificationType.SellPlayer),
        n && appViewModel.webAndEventNotificationsPartial().removeNotification(n),
        this.player.sell(this.price()).fail(function() {}).fin(function() {
            appViewModel.surfacingPartial().skipSurfacingType(SurfacingType.SquadSellPlayer);
            t.hide();
            t.isSelling(!1)
        }).done())
    }
    ,
    t.prototype.quickSell = function() {
        var t, n = this;
        this.player && this.quickSellBosscoinProduct().value !== undefined && this.player.isSessionPlayer && (t = appViewModel.bossCoinWalletPartial()).confirmBossCoinPayment.apply(t, __spreadArray(__spreadArray([PaidGameOption.QuickSell, this.quickSellBosscoinProduct().value, this.player.fullName, this.player.quickSellSellPrice()], Array(6), !1), [!0], !1)).then(function() {
            WebApi.getInstance().execute(n._transfersService.quickSell(n.player.leagueId, n.player.teamId, n.player.id, n.quickSellBosscoinProduct().id, 0)).then(function(t) {
                appViewModel.toastsPartial().addItemTimed(new FeedbackToast(FeedbackToast.Type.PlayerSoldThroughQuickSell,n.player.imageLarge(),[{
                    key: "PlayerName",
                    value: n.player.name
                }, {
                    key: "ForeignClub",
                    value: t.destinationTeam.name
                }],n.player.getPlayerWorldStarLevel(),n.player.rarity));
                n.quickSellDeferred.resolve(!0);
                appViewModel.refreshBossCoinsWallet();
                appViewModel.refreshClubFundsWallet();
                n.hide()
            }).fail(function(t) {
                WebapiHelper.handleAndAlertError(t);
                var i = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(t, "could not quicksell player because of an error");
                n.quickSellDeferred.reject(i);
                n.hide()
            }).done()
        }).fail(function() {
            var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("Bosscoin payment for quicksell was not confirmed.");
            n.quickSellDeferred.reject(t)
        }).done()
    }
    ,
    t.prototype.isEventActive = function() {
        return appViewModel.webAndEventNotificationsPartial() ? appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.SellPlayersHighSellChance) || appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.AllOut) || appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.Squad) : !1
    }
    ,
    t
}(PlayerPriceModal)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , HighValueRewardedVideoModal = function(n) {
    function t() {
        var t = n.call(this, {
            template: ModalTemplate.HighValueRewardedVideo,
            showCloseButton: !0,
            screenModeXs: ScreenMode.Normal,
            hideOnBackdropClick: !1
        }) || this
          , i = Enumerable.from(appViewModel.actionRewardsPartial().getByActionId(WatchVideoPlacementType.OnboardingTransfer)).firstOrDefault();
        return t.rewardVariation = i.rewardVariationPartial(),
        t
    }
    return __extends(t, n),
    t.prototype.continueAction = function() {
        this.showDeferred.resolve(!0);
        this.hide()
    }
    ,
    t.prototype.show = function() {
        return this.showDeferred = Q.defer(),
        n.prototype.show.call(this),
        this.showDeferred.promise
    }
    ,
    t
}(BaseModal)
  , PlayersGroupablePartial = function() {
    function n(t, i, r, u, f, e) {
        var o, h, s;
        e === void 0 && (e = n.InitialSortingMethod.Value);
        o = this;
        this.sortedPlayersListByLine = ko.observableArray();
        this.sortedPlayers = ko.observable();
        this.sortPlayersByLine = ko.observable(!0);
        this.getPlayers = ko.computed(function() {
            return o.sortPlayersByLine() ? o.sortedPlayersListByLine() : [{
                position: PlayerPosition.None,
                players: o.sortedPlayers()
            }]
        });
        h = Enumerable.from(t).groupBy(function(n) {
            return n.position
        }, function(n) {
            return n
        }, function(t, o) {
            var s = new PlayersPartial(o.toArray(),i,r,u,f,!0);
            return e === n.InitialSortingMethod.Value && s.orderPlayersByValue(),
            e === n.InitialSortingMethod.MainStat && s.orderPlayersByMain(),
            {
                position: t,
                players: s
            }
        });
        this.sortedPlayersListByLine(Enumerable.from(h).orderBy(function(n) {
            return n.position
        }).toArray());
        s = new PlayersPartial(t,i,r,u,f,!0);
        s.orderPlayersByValue();
        this.sortedPlayers(s)
    }
    return n.prototype.updatePlayer = function(n, t) {
        t === void 0 && (t = !1);
        var i = Enumerable.from(this.sortedPlayersListByLine()).where(function(t) {
            return t.position === n.position
        }).select(function(n) {
            return n.players
        }).firstOrDefault()
          , r = Enumerable.from(i.getItems()).where(function(t) {
            return t.id === n.id
        }).firstOrDefault();
        i.sortingEnabled(t);
        r && i.replace(r, new PlayerPartial(n))
    }
    ,
    n
}();
(function(n) {
    var t;
    (function(n) {
        n[n.Value = 0] = "Value";
        n[n.MainStat = 1] = "MainStat"
    }
    )(t = n.InitialSortingMethod || (n.InitialSortingMethod = {}))
}
)(PlayersGroupablePartial || (PlayersGroupablePartial = {}));
var __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , SelectSellPlayerModal = function(n) {
    function t(t) {
        var i = n.call(this, {
            template: ModalTemplate.SelectSellPlayer,
            showCloseButton: !0
        }) || this;
        return i.playersGroupablePartial = t,
        i
    }
    return __extends(t, n),
    t.prototype.selectPlayer = function(n) {
        n.isOnTransferList() || (this._playerSelectedDeferred.resolve(n),
        this.hide())
    }
    ,
    t.prototype.show = function() {
        return this._playerSelectedDeferred = Q.defer(),
        n.prototype.show.call(this),
        this._playerSelectedDeferred.promise
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , PlayerPartial = function(n) {
    function t(i, r, u, f, e, o) {
        var s = n.call(this) || this, c, h, l, a;
        return s.isAttacker = !1,
        s.isMidfielder = !1,
        s.isDefender = !1,
        s.isGoalKeeper = !1,
        s.isAvailable = ko.observable(!1),
        s.isInjured = ko.observable(!1),
        s.isSuspended = ko.observable(!1),
        s.isLeveledUp = ko.observable(!1),
        s.isMaxLevel = ko.observable(!1),
        s.isWorldCupInformPlayerCardEnabled = ko.observable(),
        s.lineupNr = ko.observable(0),
        s.isInLeague = !1,
        s.isSessionPlayer = !1,
        s.statMain = 0,
        s.imageLarge = ko.observable(),
        s.daysUnavailable = ko.observable(0),
        s.isLoading = ko.observable(),
        s.quickSellSellPrice = ko.observable(0),
        s.isLineupCardBeingDragged = ko.observable(!1),
        s.isOnTransferList = ko.computed(function() {
            return appViewModel.leaguePartial() && appViewModel.leaguePartial().settingsPartial() && appViewModel.leaguePartial().settingsPartial().areTransfersEnabled && s.transferPlayerPartial() ? !0 : !1
        }),
        s.isInNegotiation = ko.computed(function() {
            return appViewModel.leaguePartial() && appViewModel.leaguePartial().settingsPartial() && appViewModel.leaguePartial().settingsPartial().areTransfersEnabled && s.offersPartial() ? s.offersPartial().getItems().length > 0 : !1
        }),
        s.isInTraining = ko.computed(function() {
            return s.trainingSessionsPartial() ? s.trainingSessionsPartial().currentTrainingSession() !== null && s.trainingSessionsPartial().currentTrainingSession().countdownTimerPartial() !== null && !s.trainingSessionsPartial().currentTrainingSession().countdownTimerPartial().claimed() : !1
        }),
        s.isInSelection = ko.computed(function() {
            return s.lineupNr() > 0
        }),
        s.isInLineup = ko.computed(function() {
            return s.lineupNr() > 0 && s.lineupNr() <= 11
        }),
        s.isOnBench = ko.computed(function() {
            return s.isInSelection() && !s.isInLineup()
        }),
        s.squadNumberObservable = ko.observable(),
        s.nameWithSquadNumber = ko.pureComputed(function() {
            return 0 === s.squadNumberObservable() ? s.name : "".concat(s.squadNumberObservable(), ". ").concat(s.name)
        }),
        s.fullNameWithSquadNumber = ko.pureComputed(function() {
            return 0 === s.squadNumberObservable() ? s.fullName : "".concat(s.squadNumberObservable(), ". ").concat(s.fullName)
        }),
        s.squadOrLineupNumber = ko.pureComputed(function() {
            var n = s.squadNumberObservable();
            return n !== 0 ? "".concat(n) : ""
        }),
        s.nameWithSquadNumberForMatch = ko.pureComputed(function() {
            return s.playerGradePartial() && s.playerGradePartial().squadNumber !== 0 ? "".concat(s.playerGradePartial().squadNumber, ". ").concat(s.name) : s.name
        }),
        s.numberOfStatusIcons = ko.pureComputed(function() {
            var n = 0;
            return (s.isInjured() || s.injuryPartial()) && n++,
            (s.isSuspended() || s.yellowCards > 0) && n++,
            s.isInTraining() && n++,
            n
        }),
        Helper.copyProperties(i, s),
        s.daysUnavailable(s.unavailable),
        r && (s._playersService = r),
        u && (s._offersService = u),
        s.nationality && s.nationalityPartial(new NationalityPartial(s.nationality)),
        s.team && s.teamPartial(new TeamPartial(s.team)),
        s.assets && s.assetsPartial(new AssetsPartial(s.assets)),
        s.foul && s.foulPartial(new FoulPartial(s.foul)),
        s.injury && s.injuryPartial(new InjuryPartial(s.injury)),
        s.doctorTreatment && s.doctorTreatmentPartial(new DoctorTreatmentPartial(s.doctorTreatment)),
        s.doctorTreatments && s.doctorTreatmentsPartial(new DoctorTreatmentsPartial(s.doctorTreatments)),
        s.trainingSessions && s.trainingSessionsPartial(new TrainingSessionsPartial(s.trainingSessions,f,o)),
        s.transferPlayer && s.transferPlayerPartial(new TransferPlayerPartial(s.transferPlayer,e)),
        s.playerGrade && s.playerGradePartial(new PlayerGradePartial(s.playerGrade)),
        s.playerGrades && s.playerGradesPartial(new PlayerGradesPartial(s.playerGrades)),
        s.training && s.trainingForecastPartial(new TrainingForecastPartial(s.training)),
        s.offers && s.offersPartial(new OffersPartial(s.offers)),
        s.isAttacker = s.position === PlayerPosition.A,
        s.isMidfielder = s.position === PlayerPosition.M,
        s.isDefender = s.position === PlayerPosition.D,
        s.isGoalKeeper = s.position === PlayerPosition.G,
        s.isAvailable(s.status === PlayerStatus.Available),
        s.isInjured(s.status === PlayerStatus.Injured),
        s.isSuspended(s.status === PlayerStatus.Suspended),
        s.lineupNr(s.lineup),
        s.isInLeague = s.leagueId === SessionManager.getLeagueId(),
        s.isSessionPlayer = s.isInLeague && s.teamId === SessionManager.getTeamId(),
        s.statMain = s.isAttacker ? s.statAtt : s.isMidfielder ? s.statOvr : s.statDef,
        s.isMaxLevel(s.statMain === t.mainStatMax),
        s.assets && (c = Enumerable.from(s.assets).firstOrDefault(function(n) {
            return n.type === AssetType.NormalPassport
        }),
        c != null && s.imageLarge(c.path)),
        h = new Progress,
        h.level = s.statMain,
        h.progress = s.trainingProgress,
        h.progressForecast = s.training ? s.trainingForecastPartial().forecast : 0,
        s.trainingProgressPartial(new ProgressPartial(h)),
        s.isSessionPlayer && appViewModel && appViewModel.gameSettingsPartial() && (l = appViewModel.gameSettingsPartial().getGameSettings(GameVarCategory.Transfer, "QuickSellPricePercentage"),
        a = Enumerable.from(l).firstOrDefault(function(n) {
            return n.variation === 0 && n.increment === 0
        }),
        s.quickSellSellPrice(s.value * (a.value / 100))),
        s.isWorldCupInformPlayerCardEnabled(LeanplumHelper.getInstance().getVariables("Settings", "WorldCupInformPlayerCardIsEnabled", !1)),
        s.isSessionPlayer && s.quickSellSellPrice(s.value),
        s.squadNumberObservable(s.squadNumber),
        s
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
        appViewModel && appViewModel.toastsPartial && this.transferPlayerPartial() && this.transferPlayerPartial().playerPartial() && appViewModel.toastsPartial().addItemTimed(new FeedbackToast(FeedbackToast.Type.PlayerToTransferlist,this.transferPlayerPartial().playerPartial().imageLarge(),[{
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
        var t = this.getPlayerWorldStarLevel()
          , n = "no-world-star";
        switch (t) {
        case PlayerWorldStarLevel.WorldStar1:
            n = "world-star-1"
        }
        return this.isWorldCupInformPlayerCardEnabled() && (n += " world-cup-theme-enabled"),
        n
    }
    ,
    t.prototype.assignSquadNumber = function(n) {
        var t = this
          , i = Q.defer();
        if (this._playersService)
            return WebApi.getInstance().execute(this._playersService.assignSquadNumber(this.leagueId, this.teamId, this.id, n)).then(function(n) {
                t.squadNumber = n.squadNumber;
                t.squadNumberObservable(n.squadNumber);
                n.squadNumber && appViewModel.toastsPartial().addItemTimed(new FeedbackToast(FeedbackToast.Type.SquadNumberAssigned,t.imageLarge(),[{
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
    t.prototype.levelUp = function() {
        this.statMain++;
        switch (this.position) {
        case PlayerPosition.A:
            this.statAtt++;
            break;
        case PlayerPosition.M:
            this.statAtt++;
            this.statDef++;
            break;
        case PlayerPosition.D:
        case PlayerPosition.G:
            this.statDef++
        }
        this.statOvr = Math.floor((this.statAtt + this.statDef) / 2)
    }
    ,
    t.mainStatMax = 255,
    t
}(Player)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BidPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(Bid)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , BidsPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.lastBid = ko.computed(function() {
            return Enumerable.from(i.getItems()).orderByDescending(function(n) {
                return n.createdAt
            }).firstOrDefault()
        }),
        i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new BidPartial(n))
        });
        this.setItems(t)
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , OfferPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.notYourTeamPartial = ko.computed(function() {
            return i.owningTeamId === SessionManager.getInstance().session.teamId ? i.biddingTeamPartial() : i.owningTeamPartial()
        }),
        i.isLatestBidByOwner = ko.computed(function() {
            return i.bidsPartial() ? i.bidsPartial().lastBid().sentBy === BidSentBy.Owner : !1
        }),
        i.isIncomingOffer = ko.computed(function() {
            return i.bidsPartial() ? i.owningTeamId === SessionManager.getTeamId() : !1
        }),
        i.requiresAction = ko.computed(function() {
            return i.isLatestBidByOwner() && !i.isIncomingOffer() || !i.isLatestBidByOwner() && i.isIncomingOffer()
        }),
        Helper.copyProperties(t, i),
        i.player && i.playerPartial(new PlayerPartial(i.player)),
        i.bids && i.bidsPartial(new BidsPartial(i.bids)),
        i.biddingTeam && i.biddingTeamPartial(new TeamPartial(i.biddingTeam)),
        i.owningTeam && i.owningTeamPartial(new TeamPartial(i.owningTeam)),
        i
    }
    return __extends(t, n),
    t
}(Offer)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , OffersPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i.offersWithRequiredAction = ko.computed(function() {
            return Enumerable.from(i.getItems()).where(function(n) {
                return n.requiresAction()
            }).toArray()
        }),
        i.owningOffersWithRequiredAction = ko.computed(function() {
            return Enumerable.from(i.getItems()).where(function(n) {
                return n.owningTeamId === SessionManager.getTeamId() && !n.isLatestBidByOwner()
            }).toArray()
        }),
        i.hasOffersBelongingToCurrentSessionTeam = ko.computed(function() {
            return Enumerable.from(i.getItems()).any(function(n) {
                return n.owningTeamId === SessionManager.getTeamId() || n.biddingTeamId === SessionManager.getTeamId()
            })
        }),
        i.setItemsFromModels(t),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new OfferPartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.getLatestOfferForPlayer = function(n) {
        if (this.getItems())
            return Enumerable.from(this.getItems()).orderByDescending(function(n) {
                return n.createdAt
            }).firstOrDefault(function(t) {
                return t.playerId === n
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TrainingForecastPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(TrainingForecast)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , PlayersPartial = function(n) {
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
        }).thenBy(function(n) {
            return n.matchesPlayed
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransferPlayerPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r._bossCoinConversionProductName = "",
        r._bossCoinFeeProductName = "",
        r.isBossCoinCompletionAllowed = ko.observable(!1),
        r.isRemoving = ko.observable(!1),
        r.isTransferred = ko.observable(!1),
        r.isBuying = ko.observable(!1),
        r.isOnList = !1,
        r._isInitialized = ko.observable(!1),
        r.bossCoinConversionCost = ko.computed(function() {
            if (!appViewModel.clubFundsWalletPartial() || !appViewModel.bossCoinProductsPartial() || !r._isInitialized())
                return 0;
            var n = appViewModel.bossCoinProductsPartial().getBossCoinProduct(r._bossCoinConversionProductName);
            return n ? appViewModel.clubFundsWalletPartial().calculateBossCoinConversionCount(r.price, n) : 0
        }),
        r.bossCoinTransferFeeCost = ko.computed(function() {
            return !appViewModel.bossCoinProductsPartial() || !r._isInitialized() ? 0 : appViewModel.bossCoinProductsPartial().getValue(r._bossCoinFeeProductName) + r.variableFee
        }),
        r.clubFundsCost = ko.computed(function() {
            return !appViewModel.clubFundsWalletPartial() || !r._isInitialized() ? 0 : appViewModel.clubFundsWalletPartial().calculateClubFundsRemainderForPrice(r.price)
        }),
        r.bossCoinCost = ko.computed(function() {
            return r.bossCoinTransferFeeCost() + r.bossCoinConversionCost()
        }),
        r.hasEnoughBossCoinsForConversion = ko.computed(function() {
            var n, t;
            return (t = (n = appViewModel.bossCoinWalletPartial()) === null || n === void 0 ? void 0 : n.canPayBossCoins(r.bossCoinCost())) !== null && t !== void 0 ? t : !1
        }),
        Helper.copyProperties(t, r),
        r._transferPlayerService = i,
        r.team && r.teamPartial(new TeamPartial(r.team)),
        r.countdownTimer && (r.countdownTimerPartial(new CountdownTimerPartial(r.countdownTimer)),
        r.isOnList = r.countdownTimer.finishedTimestamp > Helper.unixTimeStamp()),
        r.player && (r.team && (r.player.team = r.team),
        r.playerPartial(new PlayerPartial(r.player))),
        appViewModel.leaguePartial() && appViewModel.leaguePartial().settingsPartial() && r.isBossCoinCompletionAllowed(appViewModel.leaguePartial().settingsPartial().isBossCoinCompletionAllowed),
        t.type === TransferPlayerType.Scout ? (r._bossCoinFeeProductName = r.playerPartial().isWorldStar() ? "BoostedPlayerScoutFee" : "ScoutFee",
        r._bossCoinConversionProductName = "BossCoinConversionRateScout") : t.player.rarity == PlayerRarity.Legend && r.teamPartial() && r.teamPartial().isForeignTeam ? (r._bossCoinFeeProductName = "ForeignLegendTransferFee",
        r._bossCoinConversionProductName = "BossCoinConversionRateTransfer") : t.player.rarity == PlayerRarity.InForm && t.type != TransferPlayerType.SpecialOffer && r.teamPartial() && r.teamPartial().isForeignTeam ? (r._bossCoinFeeProductName = "ForeignInFormTransferFee",
        r._bossCoinConversionProductName = "BossCoinConversionRateTransfer") : (r._bossCoinFeeProductName = "TransferFee",
        r._bossCoinConversionProductName = "BossCoinConversionRateTransfer"),
        r._isInitialized(!0),
        r
    }
    return __extends(t, n),
    t.prototype.buy = function() {
        this.isBossCoinCompletionAllowed() ? this.buyWithBossCoinCompletion() : this.buyWithoutBossCoinCompletion()
    }
    ,
    t.prototype.buyWithBossCoinCompletion = function() {
        var n = this, t, i, r;
        this.isBuying() || (t = appViewModel.bossCoinProductsPartial().getBossCoinProduct(this._bossCoinConversionProductName),
        t) && (this.isBuying(!0),
        LeanplumHelper.getInstance().trackBossCoinSpendIntentEvent(this._bossCoinFeeProductName, this.bossCoinTransferFeeCost()),
        i = this.price,
        r = this.clubFundsCost(),
        WebApi.getInstance().execute(this._transferPlayerService.validateTransfer(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.id)).then(function() {
            appViewModel.exchangeBossCoinsToClubFundsWhenNeeded(PaidGameOption.TransferPlayer, i, t, n.bossCoinTransferFeeCost(), !1, n.player.name).then(function(u) {
                var f = n.bossCoinCost() > n.bossCoinTransferFeeCost();
                f && LeanplumHelper.getInstance().trackBossCoinSpendIntentEvent(t.name, n.bossCoinConversionCost());
                appViewModel.bossCoinWalletPartial().confirmBossCoinPayment(PaidGameOption.TransferPlayer, n.bossCoinCost(), n.playerPartial().name, r, f, !0, !0, n._bossCoinFeeProductName, {}, !1).then(function() {
                    appViewModel.bossCoinWalletPartial().convertBossCoinsToClubFunds(u).then(function() {
                        appViewModel.executePaidAction(n.transferPlayer(i, r));
                        n.isBuying(!1)
                    })
                }).fail(function(t) {
                    ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(t);
                    n.isBuying(!1)
                }).done()
            }).fail(function(t) {
                WebapiHelper.handleAndAlertError(t);
                n.isBuying(!1)
            }).done()
        }).fail(function(t) {
            WebapiHelper.handleAndAlertError(t);
            n.isBuying(!1)
        }).done())
    }
    ,
    t.prototype.buyWithoutBossCoinCompletion = function() {
        var n = this;
        this.isBuying() || (this.isBuying(!0),
        LeanplumHelper.getInstance().trackBossCoinSpendIntentEvent(this._bossCoinFeeProductName, this.bossCoinTransferFeeCost()),
        this._isInitialized && appViewModel.clubFundsWalletPartial() && appViewModel.clubFundsWalletPartial().calculateClubFundsShortageForPrice(this.price) === 0 ? WebApi.getInstance().execute(this._transferPlayerService.validateTransfer(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.id)).then(function() {
            var t = n.clubFundsCost();
            appViewModel.bossCoinWalletPartial().confirmBossCoinPayment(PaidGameOption.TransferPlayer, n.bossCoinTransferFeeCost(), n.playerPartial().name, t, !1, !0, !0, n._bossCoinFeeProductName).then(function() {
                appViewModel.executePaidAction(n.transferPlayer(t, t));
                n.isBuying(!1)
            }).fail(function(t) {
                WebapiHelper.handleAndAlertError(t);
                n.isBuying(!1)
            }).done()
        }).fail(function(t) {
            WebapiHelper.handleAndAlertError(t);
            n.isBuying(!1)
        }).done() : (new NotEnoughClubFundsModal(this.price,this.bossCoinTransferFeeCost(),!1).show(),
        this.isBuying(!1)))
    }
    ,
    t.prototype.transferPlayer = function(n, t) {
        var i = Q.defer(), r = appViewModel.bossCoinProductsPartial().getBossCoinProduct(this._bossCoinFeeProductName), u;
        return r == null ? (u = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionError("TransferPlayerPartial.transferPlayer.deferred: No Boss Coin product partial when transfering a player."),
        i.reject(u),
        i.promise) : (this.executeTransfer(r, n, t).then(function(n) {
            i.resolve(n)
        }),
        i.promise)
    }
    ,
    t.prototype.executeTransfer = function(n, t, i) {
        var r = this
          , u = Q.defer()
          , f = this.bossCoinTransferFeeCost();
        return WebApi.getInstance().execute(this._transferPlayerService.buy(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.id, n.id)).then(function() {
            r.addFeedbackToast();
            r.isTransferred(!0);
            LeanplumHelper.getInstance().trackBossCoinSpentEvent(r._bossCoinFeeProductName, f);
            var n;
            switch (r.type) {
            case TransferPlayerType.Scout:
                n = LeanplumHelper.ClubFundsProductType.ScoutPlayer;
                break;
            case TransferPlayerType.SpecialOffer:
                n = LeanplumHelper.ClubFundsProductType.SpecialOfferPlayer;
                break;
            case TransferPlayerType.Transferlist:
            default:
                n = LeanplumHelper.ClubFundsProductType.TransferPlayer
            }
            LeanplumHelper.getInstance().trackClubFundsSpentEvent(n, i, t, {
                PlayerName: r.playerPartial() ? r.playerPartial().name : ""
            });
            u.resolve(!0)
        }).fail(function(n) {
            WebapiHelper.handleAndAlertError(n);
            var t = ErrorHandlerInstanceFactory.getErrorHandlerInstance().createPromiseRejectionWebApiError(n, "failed to buy player");
            u.reject(t)
        }).done(),
        u.promise
    }
    ,
    t.prototype.removeFromTransferlist = function() {
        var t = this
          , n = Q.defer();
        return this.isRemoving(!0),
        WebApi.getInstance().execute(this._transferPlayerService.deleteById(SessionManager.getLeagueId(), SessionManager.getTeamId(), this.id)).then(function() {
            t.isTransferred(!0);
            n.resolve(!0)
        }).fail(function(t) {
            WebapiHelper.handleAndAlertError(t);
            n.resolve(!1)
        }).fin(function() {
            t.isRemoving(!1)
        }).done(),
        n.promise
    }
    ,
    t.prototype.addFeedbackToast = function() {
        appViewModel && appViewModel.toastsPartial && this.playerPartial() && appViewModel.toastsPartial().addItemTimed(new FeedbackToast(FeedbackToast.Type.PlayerBought,this.playerPartial().imageLarge(),[{
            key: "playername",
            value: this.playerPartial().name
        }],this.playerPartial().getPlayerWorldStarLevel(),this.playerPartial().rarity))
    }
    ,
    t
}(TransferPlayer)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransferPlayersPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.countdownTimerPartial = ko.observable(),
        r.playerHasBeenTransferred = ko.computed(function() {
            return Enumerable.from(r.getItems()).any(function(n) {
                return n.isTransferred()
            })
        }).extend({
            rateLimit: {
                timeout: 500,
                method: "notifyWhenChangesStop"
            }
        }),
        r.hasScoutResults = ko.computed(function() {
            return Enumerable.from(r.getItems()).any(function(n) {
                return n.isOnList
            })
        }).extend({
            rateLimit: {
                timeout: 500,
                method: "notifyWhenChangesStop"
            }
        }),
        r._transferPlayerService = i,
        r.sortingEnabled(!0),
        r.sortOrder = SortOrder.Descending,
        r.setItemsFromModels(t, i),
        r
    }
    return __extends(t, n),
    t.prototype.orderPlayersByName = function() {
        this.sortItems(function(n) {
            return n.player.name.toLowerCase()
        })
    }
    ,
    t.prototype.orderPlayersByNationality = function() {
        this.sortItems(function(n) {
            var t;
            if ((t = n.player.nationality) !== null && t !== void 0)
                return t.code
        })
    }
    ,
    t.prototype.orderPlayersByAge = function() {
        this.sortItems(function(n) {
            return n.player.age
        })
    }
    ,
    t.prototype.orderPlayersBySpecificPosition = function() {
        this.sortItems(function(n) {
            return n.player.specificPosition
        })
    }
    ,
    t.prototype.orderPlayersByRarity = function() {
        this.sortItems(function(n) {
            return n.player.rarity
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
            return n.player.statDef
        })
    }
    ,
    t.prototype.orderPlayersByAttack = function() {
        this.sortItems(function(n) {
            return n.player.statAtt
        })
    }
    ,
    t.prototype.orderPlayersByOvr = function() {
        this.sortItems(function(n) {
            return n.player.statOvr
        })
    }
    ,
    t.prototype.orderPlayersByMain = function() {
        this.sortItems(function(n) {
            return n.playerPartial().statMain
        })
    }
    ,
    t.prototype.orderPlayersByPrice = function() {
        this.sortItems(function(n) {
            return n.price
        })
    }
    ,
    t.prototype.orderPlayersByPosition = function() {
        this.sortItems(function(n) {
            return n.playerPartial().position
        })
    }
    ,
    t.prototype.getByPlayerId = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.player.id === n
        })
    }
    ,
    t.prototype.setItemsFromModels = function(n, t) {
        var i = this
          , r = [];
        n.forEach(function(n) {
            !i.countdownTimerPartial() && n.countdownTimer && i.countdownTimerPartial(new CountdownTimerPartial(n.countdownTimer));
            r.push(new TransferPlayerPartial(n,t))
        });
        this.setItems(r)
    }
    ,
    t.prototype.getAbleToBuy = function(n, t) {
        return Enumerable.from(this.getExcludedOwningTeam(n)).where(function(n) {
            return n.price <= t
        }).toArray()
    }
    ,
    t.prototype.getExcludedOwningTeam = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.playerPartial().teamId !== n
        }).toArray()
    }
    ,
    t.prototype.getWorldStar = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.playerPartial().getPlayerWorldStarLevel() >= PlayerWorldStarLevel.WorldStar1
        }).toArray()
    }
    ,
    t.prototype.getLegends = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.playerPartial() && n.playerPartial().isLegend()
        }).toArray()
    }
    ,
    t.prototype.containsWorldStar = function() {
        return Enumerable.from(this.getItems()).any(function(n) {
            return n.playerPartial() && n.playerPartial().getPlayerWorldStarLevel() >= PlayerWorldStarLevel.WorldStar1
        })
    }
    ,
    t.prototype.getInForms = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.playerPartial() && n.playerPartial().isInForm()
        }).toArray()
    }
    ,
    t.prototype.containsInForm = function() {
        return Enumerable.from(this.getItems()).any(function(n) {
            return n.playerPartial() && n.playerPartial().isInForm()
        })
    }
    ,
    t.prototype.containsLegend = function() {
        return Enumerable.from(this.getItems()).any(function(n) {
            return n.playerPartial() && n.playerPartial().isLegend()
        })
    }
    ,
    t
}(PartialArrayViewModel)
  , TransferPlayersGroupablePartial = function() {
    function n(n, t, i) {
        var r, u, f;
        i === void 0 && (i = !0);
        r = this;
        this.sortedTransferPlayersListByLine = ko.observableArray();
        this.sortedTransferPlayers = ko.observableArray();
        this.sortTransferPlayersByLine = ko.observable(!0);
        this.getPlayers = ko.computed(function() {
            return r.sortTransferPlayersByLine() ? r.sortedTransferPlayersListByLine() : r.sortedTransferPlayers()
        }).extend({
            rateLimit: {
                timeout: 500,
                method: "notifyWhenChangesStop"
            }
        });
        this.getPlayersFromSessionManager = ko.computed(function() {
            if (r.sortedTransferPlayers() === undefined || r.sortedTransferPlayers() === null)
                return [];
            var n = Enumerable.from(r.sortedTransferPlayers()).firstOrDefault();
            return !n || !n.players ? [] : Enumerable.from(n.players.getItems()).where(function(n) {
                var t;
                return ((t = n.player) === null || t === void 0 ? void 0 : t.teamId) === SessionManager.getTeamId()
            }).toArray()
        }).extend({
            rateLimit: {
                timeout: 500,
                method: "notifyWhenChangesStop"
            }
        });
        this.hasPlayers = ko.computed(function() {
            return r.sortedTransferPlayers() === undefined || r.sortedTransferPlayers() === null ? !1 : Enumerable.from(r.sortedTransferPlayers()).any(function(n) {
                return Enumerable.from(n.players.getItems()).any()
            })
        }).extend({
            rateLimit: {
                timeout: 500,
                method: "notifyWhenChangesStop"
            }
        });
        u = new TransferPlayersPartial(n,t);
        u.orderPlayersByPrice();
        this.sortedTransferPlayers([{
            position: PlayerPosition.None,
            players: u
        }]);
        f = Enumerable.from(n).groupBy(function(n) {
            return n.player.position
        }, function(n) {
            return n
        }, function(n, i) {
            var r = new TransferPlayersPartial(i.toArray(),t);
            return r.orderPlayersByPrice(),
            {
                position: n,
                players: r
            }
        });
        this.sortedTransferPlayersListByLine(Enumerable.from(f).orderBy(function(n) {
            return n.position
        }).toArray());
        this.sortTransferPlayersByLine(i)
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransferPartial = function(n) {
    function t(t, i, r) {
        var u = n.call(this) || this;
        return Helper.copyProperties(t, u),
        u.player && u.playerPartial(new PlayerPartial(u.player,i,r)),
        u.destinationTeam && u.destinationTeamPartial(new TeamPartial(u.destinationTeam)),
        u.sourceTeam && u.sourceTeamPartial(new TeamPartial(u.sourceTeam)),
        u
    }
    return __extends(t, n),
    t
}(Transfer)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransfersPartial = function(n) {
    function t(t, i, r) {
        var u = n.call(this) || this;
        return u.getLatest = ko.computed(function() {
            return Enumerable.from(u.getItems()).orderByDescending(function(n) {
                return n.timestamp
            }).firstOrDefault()
        }),
        u.sortingEnabled(!0),
        u.setItemsFromModels(t, i, r),
        u
    }
    return __extends(t, n),
    t.prototype.orderByPlayerName = function() {
        this.sortItems(function(n) {
            return n.player.name
        })
    }
    ,
    t.prototype.orderBySourceTeamName = function() {
        this.sortItems(function(n) {
            return n.sourceTeam.name
        })
    }
    ,
    t.prototype.orderByDestinationTeamName = function() {
        this.sortItems(function(n) {
            return n.destinationTeam.name
        })
    }
    ,
    t.prototype.orderByValue = function() {
        this.sortItems(function(n) {
            return n.value
        })
    }
    ,
    t.prototype.orderByPrice = function() {
        this.sortItems(function(n) {
            return n.price
        })
    }
    ,
    t.prototype.orderByWeek = function() {
        this.sortItems(function(n) {
            return n.weekNr
        })
    }
    ,
    t.prototype.orderByDate = function() {
        this.sortItems(function(n) {
            return n.timestamp
        })
    }
    ,
    t.prototype.orderByPosition = function() {
        this.sortItems(function(n) {
            return n.player.position
        })
    }
    ,
    t.prototype.orderBySpecificPosition = function() {
        this.sortItems(function(n) {
            return n.player.specificPosition
        })
    }
    ,
    t.prototype.setItemsFromModels = function(n, t, i) {
        var r = [];
        n.forEach(function(n) {
            r.push(new TransferPartial(n,t,i))
        });
        this.setItems(r);
        this.sortOrder = SortOrder.Descending;
        this.orderByDate()
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
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , SpecialOfferPartial = function(n) {
    function t(t, i) {
        var r = n.call(this) || this;
        return r.originalBossCoinsCost = ko.computed(function() {
            if (!r.offeredPlayerPartial())
                return 0;
            var n = r.offeredPlayerPartial().bossCoinTransferFeeCost() - r.offeredPlayerPartial().variableFee + r.originalBossCoinsPrice
              , t = r.offeredPlayerPartial().hasEnoughBossCoinsForConversion() && r.offeredPlayerPartial().isBossCoinCompletionAllowed();
            return t ? n + r.offeredPlayerPartial().bossCoinConversionCost() : n
        }),
        r.discountPercentage = ko.computed(function() {
            if (!r.offeredPlayerPartial() || r.originalBossCoinsCost() === 0)
                return 0;
            var n = r.offeredPlayerPartial().hasEnoughBossCoinsForConversion() && r.offeredPlayerPartial().isBossCoinCompletionAllowed()
              , t = n ? r.offeredPlayerPartial().bossCoinCost() : r.offeredPlayerPartial().bossCoinCost() - r.offeredPlayerPartial().bossCoinConversionCost();
            return Math.round((1 - t / r.originalBossCoinsCost()) * 100)
        }),
        Helper.copyProperties(t, r),
        r.offeredPlayer && r.offeredPlayerPartial(new TransferPlayerPartial(r.offeredPlayer,i)),
        r.currentPlayer && r.currentPlayerPartial(new PlayerPartial(r.currentPlayer)),
        r
    }
    return __extends(t, n),
    t
}(SpecialOffer)
  , __extends = this && this.__extends || function() {
    var n = function(t, i) {
        return n = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(n, t) {
            n.__proto__ = t
        }
        || function(n, t) {
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }
        ,
        n(t, i)
    };
    return function(t, i) {
        function r() {
            this.constructor = t
        }
        if (typeof i != "function" && i !== null)
            throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
        n(t, i);
        t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype,
        new r)
    }
}()
  , TransferListView = function(n) {
    function t(i, r, u, f, e, o, s, h) {
        var c = this, a, l;
        return c = n.call(this) || this,
        c.transferPlayersGroupablePartial = ko.observable(),
        c.sessionTeamPlayersGroupablePartial = ko.observable(),
        c.transfersPartial = ko.observable(),
        c.specialOfferPartial = ko.observable(),
        c.legendPlayersPartial = ko.observable(),
        c._sessionTeamOffersPartial = ko.observable(),
        c.isGroupFilterVisible = ko.observable(!0),
        c.showRewardedVideoBanner = ko.observable(!1),
        c.onBoardingReward = ko.observable(),
        c._fetchNumberOfTransfers = 50,
        c._transfersFetchedCount = 0,
        c.isLoadingTransfers = ko.observable(!1),
        c.areAllTransfersLoaded = ko.observable(!1),
        c.renderFlags = ko.observable(!0),
        c.activePlayerScrollPosition = ko.observable(PlayerPosition.A),
        c.activeSellPlayerSlotSlide = ko.observable(1),
        c.maxPlayersOnTransferlist = ko.observable(0),
        c.currentTab = ko.observable(t.Tab.List),
        c.isInitialized = ko.observable(!1),
        c.hasSpecialOffer = ko.computed(function() {
            var n, t, i, r = (i = (t = (n = c.specialOfferPartial()) === null || n === void 0 ? void 0 : n.offeredPlayerPartial()) === null || t === void 0 ? void 0 : t.countdownTimerPartial()) === null || i === void 0 ? void 0 : i.timerState();
            return r === TimerState.InProgress
        }),
        c.availableSellPlayerSlotsAmount = ko.computed(function() {
            if (!c.transferPlayersGroupablePartial())
                return c.maxPlayersOnTransferlist();
            var n = c.transferPlayersGroupablePartial().getPlayersFromSessionManager();
            return c.maxPlayersOnTransferlist() - n.length
        }),
        c.hasAvailableSellPlayerSlots = ko.computed(function() {
            return c.availableSellPlayerSlotsAmount() != 0
        }),
        c.sellPlayerSlots = ko.computed(function() {
            if (!c.transferPlayersGroupablePartial())
                return new Array(c.maxPlayersOnTransferlist());
            var n = c.transferPlayersGroupablePartial().getPlayersFromSessionManager();
            return (n = Enumerable.from(n).orderBy(function(n) {
                if (n !== null && n !== void 0)
                    return n.id
            }).toArray(),
            n.length === c.maxPlayersOnTransferlist()) ? n : (n.length = Math.max(c.maxPlayersOnTransferlist(), n.length),
            n)
        }),
        c._onTransferredPlayer = ko.computed(function() {
            if (c.transferPlayersGroupablePartial()) {
                if (c.specialOfferPartial() && c.specialOfferPartial().offeredPlayerPartial().isTransferred()) {
                    c.specialOfferPartial(null);
                    appViewModel.refreshTimers();
                    $("ul.nav-tabs").find("a[href='#transfer-list']").trigger("click");
                    return
                }
                (Enumerable.from(c.transferPlayersGroupablePartial().sortedTransferPlayers()).any(function(n) {
                    return n.players.playerHasBeenTransferred()
                }) || Enumerable.from(c.transferPlayersGroupablePartial().sortedTransferPlayersListByLine()).any(function(n) {
                    return n.players.playerHasBeenTransferred()
                })) && c.refreshTransferlist()
            }
        }),
        c._transferPlayerService = i,
        c._transfersService = r,
        c._playersService = u,
        c._offersService = f,
        c._managersService = s,
        appViewModel.gameSettingsPartial() && c.maxPlayersOnTransferlist((a = appViewModel.gameSettingsPartial().getValue(GameVarCategory.Transfer, "MaxPlayersOnTransferlist")) !== null && a !== void 0 ? a : 4),
        c.refreshTransferlist(),
        l = new WebApiBatch,
        l.add(e.getBySession(!0)).then(function(n) {
            WebApi.getInstance().execute(o.getByLeagueId(SessionManager.getLeagueId(), n.seasonNr)).done(function(n) {
                var t = new LeagueSettingsPartial(n).areTransfersEnabled;
                t || appViewModel.redirect(RedirectionFlow.AccountState)
            })
        }).done(),
        l.add(h.getActionCap(WatchVideoPlacementType.OnboardingTransfer)).then(function(n) {
            if (n && !n.isCapReached) {
                c.onBoardingReward(Enumerable.from(appViewModel.actionRewardsPartial().getByActionId(WatchVideoPlacementType.OnboardingTransfer)).firstOrDefault());
                if (!(moment.unix(appViewModel.userPartialV1Dot1().signUpTimestamp).add(3, "days").valueOf() <= moment().valueOf())) {
                    var t = LeanplumHelper.getInstance().getVariables("Settings");
                    t && (t.hasOwnProperty("TransferListRVPopupEnabled") && Boolean(t.TransferListRVPopupEnabled) && c.showHighValueRewardedVideoModal(),
                    t.hasOwnProperty("TransferListRVBannerEnabled") && Boolean(t.TransferListRVBannerEnabled) && c.showRewardedVideoBanner(!0))
                }
            }
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        l.execute(),
        c
    }
    return __extends(t, n),
    t.prototype.switchTabs = function(n) {
        switch (n) {
        case "#transfer-list":
            this.currentTab(t.Tab.List);
            break;
        case "#transfer-history":
            this.currentTab(t.Tab.History);
            break;
        case "#special-offer":
            this.currentTab(t.Tab.SpecialOffer);
            break;
        case "#sell-players":
            this.currentTab(t.Tab.SellPlayers);
            break;
        default:
            this.currentTab(t.Tab.List)
        }
        this.loadData()
    }
    ,
    t.prototype.loadData = function() {
        switch (this.currentTab()) {
        case t.Tab.List:
            this.loadList();
            LeanplumHelper.getInstance().pageOpened(LeanplumTrackingService.State.TransferlistTransferlist);
            break;
        case t.Tab.History:
            this.loadHistory();
            break;
        case t.Tab.SellPlayers:
            this.loadList()
        }
    }
    ,
    t.prototype.loadList = function() {
        var n = this, t, u, f;
        if (!this.transferPlayersGroupablePartial()) {
            t = new WebApiBatch;
            this.activePlayerScrollPosition(PlayerPosition.A);
            var o = this.transferPlayersGroupablePartial() ? this.transferPlayersGroupablePartial().sortTransferPlayersByLine() : !0
              , i = SessionManager.getLeagueId()
              , r = SessionManager.getTeamId()
              , e = this._playersService.getByTeam(SessionManager.getLeagueId(), SessionManager.getTeamId());
            t.add(e);
            t.add(this._offersService.getByTeam(SessionManager.getLeagueId(), r)).then(function(t) {
                n._sessionTeamOffersPartial(new OffersPartial(t))
            }).fail(function() {}).done();
            u = this._transferPlayerService.getByTransferPlayerType(i, r, TransferPlayerType.Transferlist);
            t.add(u);
            f = this._managersService.getByLeagueWithoutPoints(i, !0);
            t.add(f).done();
            Q.all([u.deferred.promise, f.deferred.promise, e.deferred.promise]).spread(function(t, r, u) {
                n._managersList = Enumerable.from(r);
                u && u.forEach(function(n) {
                    n.transferPlayer = Enumerable.from(t).firstOrDefault(function(t) {
                        var i;
                        return ((i = t.player) === null || i === void 0 ? void 0 : i.id) === n.id
                    })
                });
                var f = new PlayersGroupablePartial(u,n._playersService,n._offersService,n._transferPlayerService,null,PlayersGroupablePartial.InitialSortingMethod.MainStat);
                n.sessionTeamPlayersGroupablePartial(f);
                t.forEach(function(t) {
                    t.team.manager = n._managersList.firstOrDefault(function(n) {
                        return n.teamId === t.team.id
                    }, Helper.createComputerManager(i, t.team.id))
                });
                n.transferPlayersGroupablePartial(new TransferPlayersGroupablePartial(t,n._transferPlayerService,o));
                n.renderFlags((t === null || t === void 0 ? void 0 : t.length) < 400)
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done();
            t.add(this._transferPlayerService.getSpecialOffer(i, r)).then(function(t) {
                t && n.specialOfferPartial(new SpecialOfferPartial(t,n._transferPlayerService))
            }).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done();
            t.execute().finally(function() {
                n.isInitialized(!0)
            }).done()
        }
    }
    ,
    t.prototype.loadHistory = function() {
        this.transfersPartial() || this.loadMoreTransfers()
    }
    ,
    t.prototype.scrollToPlayerPosition = function(n) {
        var r, u;
        if (this.transferPlayersGroupablePartial() && this.transferPlayersGroupablePartial().sortTransferPlayersByLine() && (n == this.activePlayerScrollPosition() && (n = PlayerPosition.A),
        r = $("#position-header-" + n),
        r.length)) {
            this.activePlayerScrollPosition(n);
            var i = $("html")
              , f = !0
              , t = $("#transferlist-scroll-container").get(0);
            (t === null || t === void 0 ? void 0 : t.scrollHeight) > (t === null || t === void 0 ? void 0 : t.clientHeight) && (i = $("#transferlist-scroll-container"),
            f = !1);
            u = r.offset().top - i.offset().top + i.scrollTop();
            f && (u -= $("#header").height() + $("#subheader").height());
            i.scrollTop(u)
        }
    }
    ,
    t.prototype.refreshTransferlist = function() {
        this.isInitialized(!1);
        this.transferPlayersGroupablePartial(null);
        this.transfersPartial(null);
        this.areAllTransfersLoaded(!1);
        this._transfersFetchedCount = 0;
        this.loadData()
    }
    ,
    t.prototype.getTranslatedPosition = function(n) {
        return $("#transfer-list").data("position" + n)
    }
    ,
    t.prototype.showBuyPlayerModal = function(n) {
        var t = this, i = ModalTemplate.BuyForeignPlayer, r, u;
        if (n.teamPartial().isSessionTeam())
            i = ModalTemplate.CancelTransferPlayer;
        else if (!n.teamPartial().isForeignTeam) {
            r = this._sessionTeamOffersPartial() ? this._sessionTeamOffersPartial().getLatestOfferForPlayer(n.playerPartial().id) : null;
            new TransferDomesticPlayerModal(n,n.teamPartial(),appViewModel.leaguePartial(),this._offersService,r).show().then(function() {
                t.isInitialized(!1);
                WebApi.getInstance().execute(t._offersService.getByTeam(SessionManager.getLeagueId(), SessionManager.getTeamId())).then(function(n) {
                    t._sessionTeamOffersPartial(new OffersPartial(n))
                }).fail(function() {}).done(function() {
                    t.isInitialized(!0)
                })
            });
            return
        }
        u = new TransferPlayerModal(n,n.teamPartial(),appViewModel.leaguePartial(),i);
        u.show()
    }
    ,
    t.prototype.showTransferHistoryPlayerModal = function(n, t) {
        var u = this, i, r;
        n.teamId === SessionManager.getTeamId() ? (i = new SellPlayerModal(n,t,appViewModel.leaguePartial(),this._transfersService),
        i.show(),
        i.quickSellDeferred.promise.then(function() {
            u.refreshTransferlist()
        })) : (r = new PlayerModal(n,t,appViewModel.leaguePartial(),ModalTemplate.Player),
        r.show())
    }
    ,
    t.prototype.showSelectSellPlayerModal = function() {
        var n = this;
        new SelectSellPlayerModal(this.sessionTeamPlayersGroupablePartial).show().then(function(t) {
            var i = new SellPlayerModal(t,appViewModel.teamPartial(),appViewModel.leaguePartial(),n._transfersService);
            i.setPrice();
            i.show();
            i.player.isOnTransferList.subscribe(function(t) {
                t && n.refreshTransferlist()
            })
        }).fail(function() {}).done()
    }
    ,
    t.prototype.removeFromTransferList = function(n) {
        var t = this;
        n.removeFromTransferlist().then(function(n) {
            n && t.refreshTransferlist()
        }).done()
    }
    ,
    t.prototype.loadMoreTransfers = function() {
        this.areAllTransfersLoaded() || this.isLoadingTransfers() || WebApi.getInstance().execute(this.getMoreTransfersRequestItem())
    }
    ,
    t.prototype.getMoreTransfersRequestItem = function() {
        var n = this, i, t;
        return this.isLoadingTransfers(!0),
        i = this._transfersFetchedCount * this._fetchNumberOfTransfers,
        t = this._transfersService.getAllTransfers(SessionManager.getLeagueId(), i, this._fetchNumberOfTransfers),
        t.deferred.promise.then(function(t) {
            var i, r;
            n._transfersFetchedCount++;
            t.length < n._fetchNumberOfTransfers && n.areAllTransfersLoaded(!0);
            t.forEach(function(t) {
                t.sourceTeam.manager = n._managersList.firstOrDefault(function(n) {
                    return n.teamId === t.sourceTeam.id
                }, Helper.createComputerManager(t.leagueId, t.sourceTeam.id));
                t.destinationTeam.manager = n._managersList.firstOrDefault(function(n) {
                    return n.teamId === t.destinationTeam.id
                }, Helper.createComputerManager(t.leagueId, t.destinationTeam.id))
            });
            i = new TransfersPartial(t,n._playersService,n._offersService);
            n.transfersPartial() ? (r = n.transfersPartial().getItems().concat(i.getItems()),
            n.transfersPartial().setItems(r)) : n.transfersPartial(i)
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).fin(function() {
            n.isLoadingTransfers(!1)
        }).done(),
        t
    }
    ,
    t.prototype.openHelpTextModal = function() {
        new HelpTextModal(ModalTemplate.TransferlistHelpText,HelpTextModal.Type.Transferlist).show()
    }
    ,
    t.prototype.isEventActive = function() {
        return appViewModel.webAndEventNotificationsPartial() ? appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.AllOut) || appViewModel.webAndEventNotificationsPartial().hasActiveEvent(EventNotificationType.Squad) : !1
    }
    ,
    t.prototype.showHighValueRewardedVideoModal = function() {
        var n = this;
        this.shouldShowRewardedVideoModal() && (new HighValueRewardedVideoModal).show().then(function() {
            n.watchVideo()
        }).done()
    }
    ,
    t.prototype.shouldShowRewardedVideoModal = function() {
        return Boolean($.cookie(CookieHelper.hasSeenTransferListBeforeCookieName(appViewModel.userPartialV1Dot1().id))) ? Boolean($.cookie(CookieHelper.hasSeenHighValueRewardedVideoModalCookieName(appViewModel.userPartialV1Dot1().id))) ? !1 : ($.cookie(CookieHelper.hasSeenHighValueRewardedVideoModalCookieName(appViewModel.userPartialV1Dot1().id), !0, {
            expires: moment().add(12, "hours").toDate(),
            path: "/",
            domain: appViewModel.getDomain()
        }),
        !0) : ($.cookie(CookieHelper.hasSeenTransferListBeforeCookieName(appViewModel.userPartialV1Dot1().id), !0, {
            expires: moment().add(3, "days").toDate(),
            path: "/",
            domain: appViewModel.getDomain()
        }),
        !1)
    }
    ,
    t.prototype.watchVideo = function() {
        var t = this
          , i = {
            actionId: WatchVideoPlacementType.OnboardingTransfer,
            rewardVariation: 0,
            capVariation: 0
        }
          , n = new WatchVideosModal(new IncentiveProviderCountriesService,new IncentiveProviderService,new WatchVideosService,new WebApiV1Dot1.ActionRewardsService,new BossCoinsService,new TeamFinancesService,WatchVideoPlacementType.OnboardingTransfer,i);
        n.show().done();
        n.videoWatchedRewardAnnouncer.subscribe(function(n) {
            n.then(function() {
                appViewModel.refreshClubFundsWallet();
                t.showRewardedVideoBanner(!1)
            }).fail(function() {}).done()
        })
    }
    ,
    t
}(BaseView);
(function(n) {
    var t;
    (function(n) {
        n[n.List = 0] = "List";
        n[n.History = 1] = "History";
        n[n.SpecialOffer = 2] = "SpecialOffer";
        n[n.SellPlayers = 3] = "SellPlayers"
    }
    )(t = n.Tab || (n.Tab = {}))
}
)(TransferListView || (TransferListView = {}));
window.onload = function() {
    initLayout().done(function() {
        appViewModel.appViewModelDataLoadedDeferred.promise.then(function() {
            var n = new TransferListView(new TransferPlayerService,new TransfersService,new PlayersService,new OffersService,new LeaguesService,new LeagueSettingsService,new ManagersService,new WebApiV1Dot1.ActionRewardsService);
            $("#cached-html-wrapper-transferlist").load("/Cached/TransferlistPartial?v=544345345", null, function() {
                ko.bindContentViewModel(n);
                $("a[data-toggle='tab']").on("shown.bs.tab", function(t) {
                    var i = t.target;
                    n.switchTabs($(i).attr("href"))
                });
                var t = window.location.hash;
                t !== "" && $(".nav-tabs a[href=" + t + "]").tab("show")
            })
        })
    })
}
