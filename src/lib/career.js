var HistoryService = function() {
    function n() {}
    return n.prototype.getCacheKey = function(n) {
        return n ? CacheKey[CacheKey.HistoryCollection] + "_" + n : CacheKey[CacheKey.HistoryCollection]
    }
    ,
    n.prototype.getCollection = function(n) {
        n === void 0 && (n = null);
        var t = n ? "/users/".concat(n, "/history") : "/user/history"
          , i = (new breeze.EntityQuery).from(t);
        return RequestItemFactory.getInstance().createRequestItemSingle(i, this.getCacheKey(n), !0)
    }
    ,
    n.prototype.claim = function(n) {
        return RequestItemFactory.getInstance().createRequestItemSingle("user/history/".concat(n, "/claim"), HttpMethod.Put)
    }
    ,
    n
}(), __extends, WebApiV1Dot1;
(function(n) {
    var t = function() {
        function n() {}
        return n.prototype.getCacheKey = function(n) {
            return n ? CacheKey[CacheKey.HistoryCollectionV1Dot1] + "_" + n : CacheKey[CacheKey.HistoryCollectionV1Dot1]
        }
        ,
        n.prototype.getCollection = function(n) {
            n === void 0 && (n = null);
            var t = n ? "/users/".concat(n, "/history") : "/user/history"
              , i = (new breeze.EntityQuery).from(t);
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", i, this.getCacheKey(n), !0)
        }
        ,
        n.prototype.claim = function(n) {
            return RequestItemFactory.getInstance().createRequestItemSingleForVersion("v1.1", "user/history/".concat(n, "/claim"), HttpMethod.Put)
        }
        ,
        n
    }();
    n.HistoryService = t
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
}(),
function(n) {
    var t = function(t) {
        function i(n) {
            n === void 0 && (n = null);
            var i = t.call(this) || this;
            return i.hasBeenChampion = ko.computed(function() {
                return Enumerable.from(i.getItems()).any(function(n) {
                    return n.wonLeague()
                })
            }),
            i.hasReachedGoal = ko.computed(function() {
                return Enumerable.from(i.getItems()).any(function(n) {
                    return n.reachedGoal()
                })
            }),
            i.hasWonCup = ko.computed(function() {
                return Enumerable.from(i.getItems()).any(function(n) {
                    return n.wonCup()
                })
            }),
            i.unclaimedRewards = ko.computed(function() {
                return Enumerable.from(i.getItems()).where(function(n) {
                    return n.isClaimed === !1 && n.reward > 0
                }).toArray()
            }),
            i.sortedByTimestamp = ko.computed(function() {
                return Enumerable.from(i.getItems()).orderByDescending(function(n) {
                    return n.timestamp
                }).toArray()
            }),
            i.sortingEnabled(!0),
            n && i.setItemsFromModels(n),
            i
        }
        return __extends(i, t),
        i.prototype.wonCupsForLeagueType = function(n) {
            return Enumerable.from(this.getItems()).where(function(t) {
                return t.leagueTypeId === n
            }).count(function(n) {
                return n.wonCup()
            })
        }
        ,
        i.prototype.reachedGoalsForLeagueType = function(n) {
            return Enumerable.from(this.getItems()).where(function(t) {
                return t.leagueTypeId === n
            }).count(function(n) {
                return n.reachedGoal()
            })
        }
        ,
        i.prototype.wonLeaguesForLeagueType = function(n) {
            return Enumerable.from(this.getItems()).where(function(t) {
                return t.leagueTypeId === n
            }).count(function(n) {
                return n.wonLeague()
            })
        }
        ,
        i.prototype.setItemsFromModels = function(t) {
            var i = [];
            t.forEach(function(t) {
                i.push(new n.HistoryItemPartial(t))
            });
            this.setItems(i)
        }
        ,
        i
    }(PartialArrayViewModel);
    n.HistoryItemsPartial = t
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
}(),
function(n) {
    var t = function(n) {
        function t(t) {
            var i = n.call(this) || this;
            return i.wonLeague = ko.observable(),
            i.wonCup = ko.observable(),
            i.reachedGoal = ko.observable(),
            Helper.copyProperties(t, i),
            i.wonLeague(i.ranking === 1),
            i.wonCup(i.hasCupWon),
            i.reachedGoal(i.ranking <= i.goal),
            i
        }
        return __extends(t, n),
        t
    }(n.HistoryItem);
    n.HistoryItemPartial = t
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
}(),
function(n) {
    var t = function(t) {
        function i(i) {
            var r = t.call(this) || this;
            return i && Helper.copyProperties(i, r),
            r.history && r.historyItemsPartial(new n.HistoryItemsPartial(r.history)),
            r.leagueTypes && r.leagueTypesPartial(new LeagueTypesPartial(r.leagueTypes)),
            r
        }
        return __extends(i, t),
        i.prototype.totalCountriesUnlockedForContinent = function(n) {
            if (!this.historyItemsPartial() || !this.leagueTypesPartial())
                return 0;
            var i = this.historyItemsPartial().getItems()
              , t = Enumerable.from(this.leagueTypesPartial().getItems());
            return t = n !== Continent.World ? t.where(function(t) {
                return t.continent === n
            }) : t.where(function(n) {
                return n.continent !== Continent.None
            }),
            t.where(function(n) {
                return Enumerable.from(i).any(function(t) {
                    return (t.wonCup() || t.reachedGoal() || t.wonLeague()) && t.leagueTypeId === n.id && n.type === LeagueGroupType.Major
                })
            }).groupBy(function(n) {
                return n.code
            }).count()
        }
        ,
        i.prototype.totalActiveCountriesForContinent = function(n) {
            if (!this.leagueTypesPartial())
                return 0;
            var t = Enumerable.from(this.leagueTypesPartial().getItems()).distinct(function(n) {
                return n.code
            });
            return n === Continent.World ? t.count(function(n) {
                return n.continent !== Continent.None
            }) : t.count(function(t) {
                return t.continent === n
            })
        }
        ,
        i.prototype.wonCupsForContinent = function(n) {
            if (!this.historyItemsPartial() || !this.leagueTypesPartial())
                return 0;
            var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
                return t.continent === n
            }).select(function(n) {
                return n.id
            }).toArray();
            return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
                return Enumerable.from(t).contains(n.leagueTypeId)
            }).count(function(n) {
                return n.wonCup()
            })
        }
        ,
        i.prototype.reachedGoalsForContinent = function(n) {
            if (!this.historyItemsPartial() || !this.leagueTypesPartial())
                return 0;
            var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
                return t.continent === n
            }).select(function(n) {
                return n.id
            }).toArray();
            return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
                return Enumerable.from(t).contains(n.leagueTypeId)
            }).count(function(n) {
                return n.reachedGoal()
            })
        }
        ,
        i.prototype.wonLeaguesForContinent = function(n) {
            if (!this.historyItemsPartial() || !this.leagueTypesPartial())
                return 0;
            var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
                return t.continent === n
            }).select(function(n) {
                return n.id
            }).toArray();
            return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
                return Enumerable.from(t).contains(n.leagueTypeId)
            }).count(function(n) {
                return n.wonLeague()
            })
        }
        ,
        i.prototype.percentageCompletedForContinent = function(n) {
            return Math.round(100 / this.totalActiveCountriesForContinent(n) * this.totalCountriesUnlockedForContinent(n))
        }
        ,
        i.prototype.wonLeagueCups = function() {
            return this.historyItemsPartial() ? Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
                return n.leagueScheduleType !== LeagueScheduleType.Knockout && n.leagueScheduleType !== LeagueScheduleType.Tournament
            }).count(function(n) {
                return n.wonCup()
            }) : 0
        }
        ,
        i.prototype.wonTournamentKnockoutCups = function() {
            return this.historyItemsPartial() ? Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
                return n.leagueScheduleType === LeagueScheduleType.Knockout || n.leagueScheduleType === LeagueScheduleType.Tournament
            }).count(function(n) {
                return n.wonCup()
            }) : 0
        }
        ,
        i.prototype.totalTrophyCount = function() {
            return this.historyItemsPartial() ? this.reachedGoals + this.wonLeagues + this.wonCups : 0
        }
        ,
        i
    }(n.HistoryCollection);
    n.HistoryCollectionPartial = t
}(WebApiV1Dot1 || (WebApiV1Dot1 = {}));
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
  , LeagueTypesPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return i._defaultPopularLeagueTypeIds = [25, 8, 14, 12, 11, 76, 17, 19],
        i.countriesStillToPlayFilterEnabled = ko.observable(!1),
        i.countriesAlreadyPlayedFilterEnabled = ko.observable(!1),
        i.cupWonFilterEnabled = ko.observable(!1),
        i.goalAchievedFilterEnabled = ko.observable(!1),
        i.championshipWonFilterEnabled = ko.observable(!1),
        i.isLeagueTypesFilterVisible = ko.observable(!1),
        i.getItems = ko.computed(function() {
            return Enumerable.from(i._items()).where(function(n) {
                return n.isLeagueTypeActive()
            }).toArray()
        }),
        i.sortingEnabled(!0),
        i.sortOrder = SortOrder.Descending,
        i.setItemsFromModels(t),
        i._leanplumAgentVariables = LeanplumHelper.getInstance().getVariables("Agent"),
        i
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            t.push(new LeagueTypePartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.filterByCountriesStillToPlay = function() {
        return this.removeFilter(function(n) {
            return n.historyItems.length
        }, this.countriesAlreadyPlayedFilterEnabled),
        this.filterItems(function(n) {
            return !n.historyItems.length
        }, this.countriesStillToPlayFilterEnabled),
        !0
    }
    ,
    t.prototype.filterByCountriesAlreadyPlayed = function() {
        return this.removeFilter(function(n) {
            return !n.historyItems.length
        }, this.countriesStillToPlayFilterEnabled),
        this.filterItems(function(n) {
            return n.historyItems.length
        }, this.countriesAlreadyPlayedFilterEnabled),
        !0
    }
    ,
    t.prototype.filterByCupWon = function() {
        this.filterItems(function(n) {
            return n.historyItemsPartial().hasWonCup()
        }, this.cupWonFilterEnabled)
    }
    ,
    t.prototype.filterByGoalAchieved = function() {
        this.filterItems(function(n) {
            return n.historyItemsPartial().hasReachedGoal()
        }, this.goalAchievedFilterEnabled)
    }
    ,
    t.prototype.filterByHasWonChampionship = function() {
        this.filterItems(function(n) {
            return n.historyItemsPartial().hasBeenChampion()
        }, this.championshipWonFilterEnabled)
    }
    ,
    t.prototype.removeFilters = function() {
        n.prototype.removeFilters.call(this);
        this.championshipWonFilterEnabled(!1);
        this.goalAchievedFilterEnabled(!1);
        this.cupWonFilterEnabled(!1);
        this.countriesAlreadyPlayedFilterEnabled(!1);
        this.countriesStillToPlayFilterEnabled(!1)
    }
    ,
    t.prototype.orderByName = function() {
        this.sortItems(function(n) {
            return n.name
        })
    }
    ,
    t.prototype.orderByLeagueCount = function() {
        this.sortItems(function(n) {
            return n.stats.leagues
        })
    }
    ,
    t.prototype.orderByLastUpdate = function() {
        this.sortItems(function(n) {
            return n.lastUpdate
        })
    }
    ,
    t.prototype.orderBySeason = function() {
        this.sortItems(function(n) {
            return n.season
        })
    }
    ,
    t.prototype.orderByHasCup = function() {
        this.sortItems(function(n) {
            return n.hasCup
        })
    }
    ,
    t.prototype.orderByTeamCount = function() {
        this.sortItems(function(n) {
            return n.teamCount
        })
    }
    ,
    t.prototype.orderByThanksTo = function() {
        this.sortItems(function(n) {
            return n.thanksTo
        })
    }
    ,
    t.prototype.getLeagueTypesForContinentGroupedByLeagueGroupType = function(n) {
        var t = Enumerable.from(this.getFilteredItems());
        return t = n === Continent.World ? t.where(function(n) {
            return n.continent !== Continent.None
        }) : t.where(function(t) {
            return t.continent === n
        }),
        t = t.orderBy(function(n) {
            return n.type
        }),
        t.groupBy(function(n) {
            return n.type
        }, function(n) {
            return n
        }, function(n, t) {
            return {
                leagueGroupType: n,
                leagueTypes: t.toArray()
            }
        }).toArray()
    }
    ,
    t.prototype.getLeagueTypeCodeFromLeaguetypeId = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.id === n
        }).select(function(n) {
            return n.code.toLowerCase()
        }).firstOrDefault()
    }
    ,
    t.prototype.getLeagueTypeNameFromLeagueTypeId = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.id === n
        }).select(function(n) {
            return n.name
        }).firstOrDefault()
    }
    ,
    t.prototype.filterById = function(n) {
        var i = this
          , t = [];
        return n.forEach(function(n) {
            var r = Enumerable.from(i.getItems()).firstOrDefault(function(t) {
                return t.id === n
            });
            r && t.push(r)
        }),
        t
    }
    ,
    t.prototype.getRecommendedLeagueTypes = function(n) {
        var t = this.filterById(this.getPopularLeagueTypeIds()), i;
        return (t = Enumerable.from(t).where(function(n) {
            return !n.isPrizePool()
        }).toArray(),
        !n) ? t : (i = this.getMajorLeagueTypeForCountryCode(n.countryCode),
        !i) ? t : this.insertLeagueTypeInTopRecommendedLeagueTypes(t, i)
    }
    ,
    t.prototype.getFantasyLeagueTypes = function() {
        return Enumerable.from(this.getItems()).where(function(n) {
            return n.isFantasyLeague()
        }).toArray()
    }
    ,
    t.prototype.getMajorLeagueTypeForCountryCode = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.code.toLowerCase() === n.toLowerCase() && t.type === LeagueGroupType.Major
        })
    }
    ,
    t.prototype.insertLeagueTypeInTopRecommendedLeagueTypes = function(n, t) {
        var i = this._leanplumAgentVariables && this._leanplumAgentVariables.hasOwnProperty("AgentPopularLeaguesPositionOwnCountry") ? this._leanplumAgentVariables.AgentPopularLeaguesPositionOwnCountry : 3
          , r = n.indexOf(t);
        return r >= i && n.splice(r, 1),
        n.indexOf(t) <= -1 && n.splice(i - 1, 0, t),
        n
    }
    ,
    t.prototype.getPopularLeagueTypeIds = function() {
        var t = this._defaultPopularLeagueTypeIds, i, n;
        if (!this._leanplumAgentVariables || this._leanplumAgentVariables && !this._leanplumAgentVariables.hasOwnProperty("AgentPopularLeagues"))
            return t;
        for (i = this._leanplumAgentVariables.AgentPopularLeagues,
        n = 0; n < t.length; n++)
            i && i[n + 1] && (t[n] = i[n + 1]);
        return t
    }
    ,
    t.prototype.getLeagueTypeById = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.id === n
        })
    }
    ,
    t
}(PartialArrayViewModel)
  , NewsUpdatesService = function() {
    function n() {}
    return n.prototype.getByVersion = function(n) {
        var t = (new breeze.EntityQuery).from("newsupdates?majorVersion=".concat(n.majorVersion, "&minorVersion=").concat(n.minorVersion, "&patchVersion=").concat(n.patchVersion));
        return RequestItemFactory.getInstance().createRequestItemSingle(t, !0)
    }
    ,
    n.prototype.read = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("newsupdates/read", HttpMethod.Put, {
            newsUpdateId: n,
            userId: t
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
  , ProgressPartial = function(n) {
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
}(Progress)
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
  , TicketPartial = function(n) {
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
}(Ticket)
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
  , TicketsPartial = function(n) {
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
}(PartialArrayViewModel)
  , TicketsService = function() {
    function n() {}
    return n.prototype.getTickets = function(n) {
        n === void 0 && (n = !1);
        var t = (new breeze.EntityQuery).from("/user/tickets")
          , i = n ? CacheKey[CacheKey.Tickets] : null;
        return RequestItemFactory.getInstance().createRequestItem(t, i, !0)
    }
    ,
    n.prototype.consumeTicket = function(n, t) {
        return RequestItemFactory.getInstance().createRequestItemSingle("/user/tickets/".concat(n, "/consume"), HttpMethod.Put, {
            TeamSlotIndex: t
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
  , HistoryCollectionPartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return t && Helper.copyProperties(t, i),
        i.history && i.historyItemsPartial(new HistoryItemsPartial(i.history)),
        i.leagueTypes && i.leagueTypesPartial(new LeagueTypesPartial(i.leagueTypes)),
        i
    }
    return __extends(t, n),
    t.prototype.totalCountriesUnlockedForContinent = function(n) {
        if (!this.historyItemsPartial() || !this.leagueTypesPartial())
            return 0;
        var i = this.historyItemsPartial().getItems()
          , t = Enumerable.from(this.leagueTypesPartial().getItems());
        return t = n !== Continent.World ? t.where(function(t) {
            return t.continent === n
        }) : t.where(function(n) {
            return n.continent !== Continent.None
        }),
        t.where(function(n) {
            return Enumerable.from(i).any(function(t) {
                return (t.wonCup() || t.reachedGoal() || t.wonLeague()) && t.leagueTypeId === n.id && n.type === LeagueGroupType.Major
            })
        }).groupBy(function(n) {
            return n.code
        }).count()
    }
    ,
    t.prototype.totalActiveCountriesForContinent = function(n) {
        if (!this.leagueTypesPartial())
            return 0;
        var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(n) {
            return n.isActiveForWorldMap
        }).distinct(function(n) {
            return n.code
        });
        return n === Continent.World ? t.count(function(n) {
            return n.continent !== Continent.None
        }) : t.count(function(t) {
            return t.continent === n
        })
    }
    ,
    t.prototype.wonCupsForContinent = function(n) {
        if (!this.historyItemsPartial() || !this.leagueTypesPartial())
            return 0;
        var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
            return t.continent === n
        }).select(function(n) {
            return n.id
        }).toArray();
        return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
            return Enumerable.from(t).contains(n.leagueTypeId)
        }).count(function(n) {
            return n.wonCup()
        })
    }
    ,
    t.prototype.reachedGoalsForContinent = function(n) {
        if (!this.historyItemsPartial() || !this.leagueTypesPartial())
            return 0;
        var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
            return t.continent === n
        }).select(function(n) {
            return n.id
        }).toArray();
        return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
            return Enumerable.from(t).contains(n.leagueTypeId)
        }).count(function(n) {
            return n.reachedGoal()
        })
    }
    ,
    t.prototype.wonLeaguesForContinent = function(n) {
        if (!this.historyItemsPartial() || !this.leagueTypesPartial())
            return 0;
        var t = Enumerable.from(this.leagueTypesPartial().getItems()).where(function(t) {
            return t.continent === n
        }).select(function(n) {
            return n.id
        }).toArray();
        return Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
            return Enumerable.from(t).contains(n.leagueTypeId)
        }).count(function(n) {
            return n.wonLeague()
        })
    }
    ,
    t.prototype.percentageCompletedForContinent = function(n) {
        return Math.round(100 / this.totalActiveCountriesForContinent(n) * this.totalCountriesUnlockedForContinent(n))
    }
    ,
    t.prototype.wonLeagueCups = function() {
        return this.historyItemsPartial() ? Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
            return n.leagueScheduleType !== LeagueScheduleType.Knockout && n.leagueScheduleType !== LeagueScheduleType.Tournament
        }).count(function(n) {
            return n.wonCup()
        }) : 0
    }
    ,
    t.prototype.wonTournamentKnockoutCups = function() {
        return this.historyItemsPartial() ? Enumerable.from(this.historyItemsPartial().getItems()).where(function(n) {
            return n.leagueScheduleType === LeagueScheduleType.Knockout || n.leagueScheduleType === LeagueScheduleType.Tournament
        }).count(function(n) {
            return n.wonCup()
        }) : 0
    }
    ,
    t.prototype.totalTrophyCount = function() {
        return this.historyItemsPartial() ? this.reachedGoals + this.wonLeagues + this.wonCups : 0
    }
    ,
    t
}(HistoryCollection)
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
  , NewsUpdatePartial = function(n) {
    function t(t) {
        var i = n.call(this) || this;
        return Helper.copyProperties(t, i),
        i
    }
    return __extends(t, n),
    t
}(NewsUpdate)
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
  , TeamsPartial = function(n) {
    function t(t, i, r) {
        var u = n.call(this) || this;
        return u.sessionTeam = ko.computed(function() {
            return Enumerable.from(u.getItems()).firstOrDefault(function(n) {
                return n.isSessionTeam()
            })
        }),
        u._playersService = i,
        u._offersService = r,
        u.sortingEnabled(!0),
        u.setItemsFromModels(t),
        u.teamPoules = Enumerable.from(u.getItems()).where(function(n) {
            return !!n.poule
        }).select(function(n) {
            return n.poule
        }).distinct().orderBy(function(n) {
            return n
        }).toArray(),
        u.hasPoules = u.teamPoules && u.teamPoules.length > 0,
        u
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = this
          , i = [];
        n.forEach(function(n) {
            i.push(new TeamPartial(n,t._playersService,t._offersService))
        });
        this.setItems(i)
    }
    ,
    t.prototype.getOrderedBySpy = function() {
        return Enumerable.from(this.getItems()).orderByDescending(function(n) {
            return n.spyInstructionPartial() !== undefined && n.spyInstructionPartial() !== null
        }).thenByDescending(function(n) {
            return n.onSecretTraining() === !1
        }).toArray()
    }
    ,
    t.prototype.getByPoule = function(n) {
        return Enumerable.from(this.getItems()).where(function(t) {
            return t.poule == n
        }).toArray()
    }
    ,
    t.prototype.orderByTeamTaken = function(n) {
        this.sortItems(function(n) {
            return n.manager != null
        }, [function(n) {
            return n.goal
        }
        , function(n) {
            return n.name
        }
        ], n)
    }
    ,
    t.prototype.orderByName = function() {
        this.sortItems(function(n) {
            return n.name
        })
    }
    ,
    t.prototype.orderByCity = function() {
        this.sortItems(function(n) {
            return n.city
        })
    }
    ,
    t.prototype.orderByGoal = function(n) {
        this.sortItems(function(n) {
            return n.goal
        }, [function(n) {
            return n.name
        }
        ], n)
    }
    ,
    t.prototype.orderByBudget = function() {
        this.sortItems(function(n) {
            return n.budget
        })
    }
    ,
    t.prototype.orderByStadiumCapacity = function() {
        this.sortItems(function(n) {
            return n.stadiumCapacity
        })
    }
    ,
    t.prototype.orderBySquadValue = function() {
        this.sortItems(function(n) {
            return n.playersPartial().totalValue()
        })
    }
    ,
    t.prototype.getById = function(n) {
        return Enumerable.from(this.getItems()).firstOrDefault(function(t) {
            return t.id === n
        })
    }
    ,
    t.prototype.areAllGoalsEqual = function() {
        var n = Enumerable.from(this.getItems())
          , t = n.first().goal;
        return n.all(function(n) {
            return n.goal === t
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
  , LeaguesPartial = function(n) {
    function t(t, i) {
        i === void 0 && (i = !1);
        var r = n.call(this) || this;
        return r.setItemsFromModels(t),
        i && (r.sortingEnabled(!0),
        r.sortOrder = SortOrder.Ascending,
        r.orderByRound()),
        r
    }
    return __extends(t, n),
    t.prototype.setItemsFromModels = function(n) {
        var t = [];
        n.forEach(function(n) {
            n == null ? t.push(null) : t.push(new LeaguePartial(n))
        });
        this.setItems(t)
    }
    ,
    t.prototype.sortForLeagueOverview = function() {
        this.sortOrder = SortOrder.Ascending;
        this.orderByLeagueName()
    }
    ,
    t.prototype.orderByRound = function() {
        this.sortItems(function(n) {
            return n.weekNr
        })
    }
    ,
    t.prototype.orderByLeagueName = function() {
        this.sortItems(function(n) {
            return n.displayName.toLowerCase()
        })
    }
    ,
    t.prototype.orderByModerator = function() {
        this.sortItems(function(n) {
            return n.moderator.toLowerCase()
        })
    }
    ,
    t.prototype.orderByManagers = function() {
        this.sortItems(function(n) {
            return n.teamCount / n.managers
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
  , ClaimUnclaimedShopRewardsModal = function(n) {
    function t(t, i) {
        var r = n.call(this, {
            template: ModalTemplate.ClaimUnclaimedShopRewards,
            showCloseButton: !1,
            hideOnBackdropClick: !1
        }) || this;
        return r.isClaimingReward = ko.observable(!1),
        r.userRewardSelectablePartial = new SingleSelectableViewModel,
        r._bossCoinsService = t,
        r.userRewardSelectablePartial.setItems(i),
        r.hideEventFunction = function(n) {
            r.userRewardSelectablePartial.isIncrementIndexDisabled() ? r.showDeferred.resolve(!0) : (n.stopPropagation(),
            n.preventDefault(),
            r.showNextReward())
        }
        ,
        r
    }
    return __extends(t, n),
    t.prototype.claimUnclaimedReward = function() {
        var t = this, n, i;
        this.isClaimingReward(!0);
        n = this.userRewardSelectablePartial.getSelectedItem();
        i = this._bossCoinsService.consumeReward(n.id);
        WebApi.getInstance().execute(i).then(function() {
            appViewModel.userRewardsPartial().removeItemByFunction(function(t) {
                return t.id === n.id
            });
            appViewModel.refreshBossCoinsWallet().then(function() {
                t.hide()
            })
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n);
            n instanceof WebApiError && n.httpStatus !== HttpStatus.NotFound && WebapiHelper.handleAndAlertError(n);
            t.hide()
        }).fin(function() {
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserRewards])
        }).done()
    }
    ,
    t.prototype.show = function() {
        return this.showDeferred = Q.defer(),
        n.prototype.show.call(this),
        this.showDeferred.promise
    }
    ,
    t.prototype.showNextReward = function() {
        var n = this
          , t = $("#claim-unclaimed-rewards-modal-content");
        t.fadeOut("fast", function() {
            n.userRewardSelectablePartial.incrementIndex();
            n.isClaimingReward(!1);
            t.fadeIn("fast")
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
  , EndOfSeasonRewardModal = function(n) {
    function t(t, i, r, u, f, e, o) {
        var s = n.call(this, {
            template: ModalTemplate.EndOfSeasonReward,
            showCloseButton: !0,
            container: ModalContainer.Generic,
            hideOnBackdropClick: !0
        }) || this;
        return s.itemsSelectablePartial = new SingleSelectableViewModel,
        s.isClaiming = ko.observable(!1),
        s.activeLeagueType = ko.observable(),
        s.isLoadingActiveLeagueType = ko.observable(),
        s._historyService = t,
        s._leagueTypesService = e,
        s._bossCoinsService = o,
        s.itemsSelectablePartial.addItemsFromModels(i, WebApiV1Dot1.HistoryItemPartial),
        s.itemsSelectablePartial.addItemsFromModels(r, TicketPartial),
        s.itemsSelectablePartial.addItemsFromModels(u, UserRewardPartial),
        s.itemsSelectablePartial.addItemsFromModels(f, UserRewardPartial),
        s.initializeActiveLeagueType(),
        s.hideEventFunction = function(n) {
            s.itemsSelectablePartial.isIncrementIndexDisabled() ? s._deferred.resolve(!0) : (n.stopPropagation(),
            n.preventDefault(),
            s.showNextReward())
        }
        ,
        s
    }
    return __extends(t, n),
    t.prototype.initializeActiveLeagueType = function() {
        var t = this, i = this.itemsSelectablePartial.getSelectedItem(), n;
        return (i instanceof WebApiV1Dot1.HistoryItemPartial) ? (this.isLoadingActiveLeagueType(!0),
        n = Q.defer(),
        WebApi.getInstance().execute(this._leagueTypesService.getById(i.leagueTypeId)).then(function(n) {
            t.activeLeagueType(new LeagueTypePartial(n))
        }).fail(function() {}).done(function() {
            n.resolve();
            t.isLoadingActiveLeagueType(!1)
        }),
        n.promise) : Q.reject()
    }
    ,
    t.prototype.claim = function() {
        var n = this, t;
        this.itemsSelectablePartial && (t = this.itemsSelectablePartial.getSelectedItem(),
        t instanceof WebApiV1Dot1.HistoryItemPartial) && (this.isClaiming(!0),
        WebApi.getInstance().execute(this._historyService.claim(t.id)).then(function(n) {
            LeanplumHelper.getInstance().trackEventWithValue(LeanplumTrackingService.Event.BCClaim, n.reward, {
                BCClaimSource: "EndOfSeason"
            })
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).fin(function() {
            appViewModel.refreshBossCoinsWallet();
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.HistoryCollectionV1Dot1]);
            CacheHandler.getInstance().removeKey(n._historyService.getCacheKey(null));
            CacheHandler.getInstance().removeKey(CacheKey[CacheKey.UserRewards]);
            n.isClaiming(!1);
            n.hide()
        }).done())
    }
    ,
    t.prototype.claimUserReward = function() {
        var n = this, t, i;
        this.isClaiming(!0);
        t = this.itemsSelectablePartial.getSelectedItem();
        i = this._bossCoinsService.consumeReward(t.id);
        WebApi.getInstance().execute(i).then(function() {
            n.hide()
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).fin(function() {
            appViewModel.refreshBossCoinsWallet();
            n.isClaiming(!1);
            n.hide()
        }).done()
    }
    ,
    t.prototype.continueToResults = function() {
        $("#season-winlost-panel").fadeOut("fast", function() {
            $("#season-results-panel").fadeIn("fast")
        })
    }
    ,
    t.prototype.show = function() {
        return this._deferred = Q.defer(),
        n.prototype.show.call(this),
        this.shouldStartConfettiShow() && this.startConfettiShow(),
        this._deferred.promise
    }
    ,
    t.prototype.shouldStartConfettiShow = function() {
        var n = this.itemsSelectablePartial.getSelectedItem();
        return n === null || !(n instanceof WebApiV1Dot1.HistoryItemPartial) ? !1 : (n.leagueScheduleType === LeagueScheduleType.Knockout || n.leagueScheduleType === LeagueScheduleType.Tournament) && n.wonCup()
    }
    ,
    t.prototype.startConfettiShow = function() {
        var n = document.getElementById("modal-canvas"), i, t;
        n.confetti = n.confetti || confetti.create(n, {
            resize: !0
        });
        i = Date.now() + 15e3;
        t = ["#3DACF7", "#BC0024", "#F3AF22"],
        function r() {
            n.confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: {
                    x: 0
                },
                colors: t
            });
            n.confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: {
                    x: 1
                },
                colors: t
            });
            Date.now() < i && requestAnimationFrame(r)
        }()
    }
    ,
    t.prototype.showNextReward = function() {
        var n = this;
        $("#endofseasonreward-modal-content-container").fadeOut("fast", function() {
            n.itemsSelectablePartial.incrementIndex();
            n.initializeActiveLeagueType();
            $("#endofseasonreward-modal-content-container").fadeIn("fast")
        })
    }
    ,
    t.prototype.goToTicketsTab = function(n) {
        var t = Enumerable.from(appViewModel.userPartialV1Dot1().teamSlotsPartial().filterWithAvailableSlots()).firstOrDefault();
        if (CookieHelper.setUserRewardSeen(n),
        !t) {
            this.hide();
            return
        }
        appViewModel.switchSlot(t.slotIndex, SwitchSlotFlow.VipLeagueTicket)
    }
    ,
    t.prototype.hideTicket = function(n) {
        CookieHelper.setTicketRewardSeen(n);
        this.hide()
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
  , NewsUpdateModal = function(n) {
    function t(t, i) {
        var r = n.call(this, {
            template: ModalTemplate.NewsUpdate,
            container: ModalContainer.Custom,
            showCloseButton: !0
        }) || this;
        return r.newsUpdatePartial = ko.observable(),
        r.newsUpdatePartial(i),
        r.shownEventFunction = function() {
            WebApi.getInstance().execute(t.read(r.newsUpdatePartial().id, SessionManager.getInstance().session.userId)).fail(function(n) {
                ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
            }).done()
        }
        ,
        r.hiddenEventFunction = function() {
            r._deferred.resolve(!0)
        }
        ,
        r
    }
    return __extends(t, n),
    t.prototype.show = function() {
        return this._deferred = Q.defer(),
        n.prototype.show.call(this),
        this._deferred.promise
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
  , CareerView = function(n) {
    function t(t, i, r, u, f) {
        var e = n.call(this) || this, o, s, h, c;
        return e.userPartial = ko.observable(),
        e.achievementProgressesPartial = ko.observable(),
        e.laurelPartial = ko.observable(),
        e.historyDataPartial = ko.observable(),
        e.ticketsPartial = ko.observable(),
        e.vipLeagueTicketRewards = ko.observableArray(),
        e.isSkillRatingEnabled = ko.observable(),
        e._leaguesService = r,
        e._usersServiceV1Dot1 = u,
        e._historyService = i,
        o = new WebApiBatch,
        e.userPartial(new WebApiV1Dot1.UserPartial(appViewModel.userPartialV1Dot1())),
        ReferralHelper.loadLinkData(!0) && e.userPartial().teamSlotsPartial().areAllSlotsOccupied && new BaseAlertModal(ModalTemplate.NoTeamSlotsAvailable).show().done(),
        s = i.getCollection(),
        o.add(s).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        h = f.getTickets(!0),
        o.add(h).done(),
        o.execute(),
        Q.all([s.deferred.promise, h.deferred.promise]).spread(function(n, t) {
            var i, r;
            n || (n = new WebApiV1Dot1.HistoryCollection);
            e.initVipLeagueTickets();
            e.historyDataPartial(new WebApiV1Dot1.HistoryCollectionPartial(n));
            e.ticketsPartial(new TicketsPartial(t));
            e.userPartial().teamSlotsPartial() && e.userPartial().teamSlotsPartial().setLayoutForEmptyTeamSlots(e.ticketsPartial(), e.vipLeagueTicketRewards());
            appViewModel.userPartialV1Dot1().teamSlotsPartial() && appViewModel.userPartialV1Dot1().teamSlotsPartial().setLayoutForEmptyTeamSlots(e.ticketsPartial(), e.vipLeagueTicketRewards());
            e.handleUnclaimedRewards();
            (i = e.userPartial().skillRatingProgress) === null || i === void 0 ? void 0 : i.animateToAmount((r = e.userPartial()) === null || r === void 0 ? void 0 : r.getKnownSkillRating())
        }).fail(function(n) {
            ErrorHandlerInstanceFactory.getErrorHandlerInstance().handleFail(n)
        }).done(),
        c = ko.computed(function() {
            appViewModel.achievementProgressesPartial && appViewModel.achievementProgressesPartial() && e.laurelPartial(new LaurelPartial(appViewModel.achievementProgressesPartial().completedAchievements().length,LaurelDisplayType.Amount))
        }),
        e
    }
    return __extends(t, n),
    t.prototype.initVipLeagueTickets = function() {
        if (appViewModel.userRewardsPartial()) {
            var n = appViewModel.userRewardsPartial().getByVariationType(RewardVariation.RewardType.VipLeague);
            n && n.length !== 0 && this.vipLeagueTicketRewards(n)
        }
    }
    ,
    t.prototype.handleUnclaimedRewards = function() {
        var r = this
          , u = this.historyDataPartial().historyItemsPartial() ? this.historyDataPartial().historyItemsPartial().unclaimedRewards() : []
          , f = this.ticketsPartial().getForRewards()
          , n = []
          , t = []
          , i = [];
        appViewModel.userRewardsPartial() && (n = appViewModel.userRewardsPartial().getUnseenRewardsByActionType(ActionType.InvitedForVipLeagueEvent),
        t = appViewModel.userRewardsPartial().getUnseenRewardsByActionType(ActionType.PrizePool),
        i = appViewModel.userRewardsPartial().getUnclaimedPurchasedBossCoinRewards());
        this.openClaimUnclaimedShopRewardsModal(i).then(function() {
            return r.openEndOfSeasonRewardModal(u, f, n, t)
        }).then(function() {
            appViewModel.processQueuedAchievements(appViewModel.userPartial())
        }).fail(function() {}).done()
    }
    ,
    t.prototype.openClaimUnclaimedShopRewardsModal = function(n) {
        var t = Q.defer();
        return n.length === 0 ? Q.resolve(null) : (new ClaimUnclaimedShopRewardsModal(new BossCoinsService,n).show().fail(function() {}).done(function() {
            t.resolve()
        }),
        t.promise)
    }
    ,
    t.prototype.openEndOfSeasonRewardModal = function(n, t, i, r) {
        var u = Q.defer();
        return !Enumerable.from(n).any() && !Enumerable.from(t).any() && !Enumerable.from(i).any() && !Enumerable.from(r).any() ? Q.resolve(null) : (new EndOfSeasonRewardModal(new HistoryService,n,t,i,r,new LeagueTypesService,new BossCoinsService).show().fail(function() {}).done(function() {
            u.resolve()
        }),
        u.promise)
    }
    ,
    t.prototype.openOccupiedForWinnersLeagueHelpTextModal = function() {
        new HelpTextModal(ModalTemplate.OccupiedForWinnersLeagueHelpText,HelpTextModal.Type.OccupiedForWinnersLeague).show()
    }
    ,
    t.prototype.openOccupiedForFantasyLeagueHelpTextModal = function() {
        new HelpTextModal(ModalTemplate.OccupiedForFantasyLeagueHelpText,HelpTextModal.Type.OccupiedForFantasyLeague).show()
    }
    ,
    t.prototype.openOccupiedForPrizePoolHelpText = function() {
        new HelpTextModal(ModalTemplate.PrizePoolNotSupportedHelpText,HelpTextModal.Type.PrizePoolNotSupported).show()
    }
    ,
    t.prototype.openTickets = function(n) {
        appViewModel.switchSlot(n, SwitchSlotFlow.WinnersLeagueTicket, !1, null, !1)
    }
    ,
    t.prototype.goToWorldMap = function() {
        window.location.href = Urls.userWorldmap
    }
    ,
    t.prototype.goToAchievements = function() {
        window.location.href = Urls.sessionUserAchievements
    }
    ,
    t.prototype.goToTrophyCabinet = function() {
        window.location.href = Urls.userTrophycabinet
    }
    ,
    t.prototype.goToRanking = function() {
        window.location.href = Urls.ranking
    }
    ,
    t.prototype.goToTierOverview = function() {
        window.location.href = Urls.tierOverview
    }
    ,
    t.prototype.goToUserProfile = function() {
        window.location.href = Urls.userProfile
    }
    ,
    t
}(BaseView);
window.onload = function() {
    initLayout().done(function() {
        appViewModel.userLoadedDeferred.promise.then(function() {
            ko.bindContentViewModel(new CareerView(new AchievementsService,new WebApiV1Dot1.HistoryService,new LeaguesService,new WebApiV1Dot1.UsersService,new TicketsService))
        })
    })
}
