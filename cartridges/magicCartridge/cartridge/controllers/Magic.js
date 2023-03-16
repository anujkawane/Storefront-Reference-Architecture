/**
* Description of the Controller and the logic it provides
*
* @module  controllers/Magic
*/

'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
//var service = require('magicCartridge/cartridge/services/dadjokeservice');
var service = require('magicCartridge/cartridge/services/dadjokeservice');
var dataservice = require('magicCartridge/cartridge/services/usapopulationdataservice');
var Logger = require('dw/system/Logger');

server.get('Show',
server.middleware.https,
csrfProtection.generateToken, function (req, res, next) {
	var properties = {};
   // var actionUrl = URLUtils.url('Magic-Display');
    //var magicForm = server.forms.getForm('magic');
    //magicForm.clear();
    var template='magic';
    var Logger = require('dw/system/Logger');
    var svcResult = service.dadJokeAPIService.call();
    if (svcResult.status === 'OK') {
        properties.joke = svcResult.object.joke;
    }
    Logger.getLogger('magicCartridge', 'showroute').error('This is logger from MagicCartridge');
    res.render(template, properties);
    next();
});

server.get('Search', function (req, res, next) {
    var properties = {};
    var template = 'magicSearch';
    var searchTerm = req.querystring.term || 'magic';

    var url = service.dadJokeAPIService.getURL() + 'search';
    var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        properties.jokes = svcResult.object.results;
    }

    res.render(template, properties);
    next();
});


server.get('Start',
server.middleware.https,
csrfProtection.generateToken, function (req, res, next) {
	var properties = {};
    var actionUrl = URLUtils.url('Magic-Display');
    var magicForm = server.forms.getForm('magic');
    magicForm.clear();
    var template='magicSearchJoke';
    
   res.render(template, {
    actionUrl:actionUrl,
    magicForm:magicForm
   });
    next();
});

/*
***  This method reads the search parameter passed from the Search Joke form and construct the 
***  Dad Joke URL with specific search term.
***  Collect the result in Properties variable and pass it to 'magicSearch' template where isloop will be used to display result.
*/

server.post('Display',
    csrfProtection.validateAjaxRequest,
    server.middleware.https,
     function (req, res, next) {
    var magicForm = server.forms.getForm('magic');
    var properties = {};
    var template = 'magicSearch';
    var searchTerm = req.querystring.term || magicForm.jokesearch.value;

    var url = service.dadJokeAPIService.getURL() + 'search';
    var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        properties.jokes = svcResult.object.results;
    }

    res.render(template,
        properties);
    next();
});

server.get('SearchPopulationData', function (req, res, next) {
    var properties = {};
    var template = 'usaPopulationData';
    var searchTerm = req.querystring.term || 'Nation&measures=Population';

    var url = dataservice.usaPopulationDataAPIService.getURL() + 'data';
    var svcResult = dataservice.usaPopulationDataAPIService.setURL(url).addParam('drilldowns', 'Nation').addParam('measures', 'Population').call();
    if (svcResult.status === 'OK') {
    	properties.term = searchTerm;
        var usaData = svcResult.object.data;
        properties.usaPopulationData = usaData;
    }
    Logger.getLogger("magic","searchUSpopulationData").warn('US population data {0} for the year {1} ', usaData[1]["ID Nation"],usaData[1]["ID Year"])
    res.render(template, properties);
    next();
});


module.exports = server.exports();

