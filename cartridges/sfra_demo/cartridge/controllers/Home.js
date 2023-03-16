'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.param1 = "value for param1 in prepend method";
    res.setViewData(viewData);
    next();
});

server.append('Show', cache.applyCustomCache, function (req, res, next) {
    var viewData = res.getViewData();
    viewData.param2 = "value for param2 in append method";
    viewData.queryparam = "This is queryParam :" + req.querystring.param ? req.querystring.param : "No params passed";
    viewData.cacheData = "This is Cache data: " + res.cachePeriod + ' ' + res.cachePeriodUnit;
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();