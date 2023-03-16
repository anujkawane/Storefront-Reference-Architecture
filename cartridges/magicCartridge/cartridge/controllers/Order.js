'user strict';

var server = require('server');
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.extend(module.superModule);

server.append('History', 
                server.middleware.https,
                userLoggedIn.validateLoggedIn,
                function(req,res,next){
                    next();
                });

module.exports = server.exports();
