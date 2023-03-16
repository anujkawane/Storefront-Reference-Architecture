
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var usaPopulationDataAPIService = LocalServiceRegistry.createService('Usa.PopulationData.Service', {

    createRequest : function (svc,params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Accept','application/json');
        return params;
    },
    parseResponse: function (svc, httpClient){
        var result;
        try{
            result = JSON.parse(httpClient.text);
        }
        catch(e) {
            result = httpClient.text;
        }
        return result;
    }
});

module.exports = {
    usaPopulationDataAPIService: usaPopulationDataAPIService
}