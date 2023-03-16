'use strict';

    var server = require('server');
    var URLUtils = require('dw/web/URLUtils');

    server.get('Show', function (req, res, next) {
        var actionUrl = URLUtils.url('customPageResult-Show');
        var customForm = server.forms.getForm('customForm');
        var flag = customForm.valid;
        customForm.clear();

        res.render('home/customPage', {
            actionUrl: actionUrl,
            customForm: customForm
        });
        next();
    });

    module.exports = server.exports();