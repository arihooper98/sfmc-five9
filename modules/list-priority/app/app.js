const express = require('express');
const configJSON = require('../config.json')

module.exports = function listPriorityExample(app, options) {
    const moduleDirectory = `${options.rootDirectory}/modules/list-priority`;

    //static variable setup only images
    app.use('/modules/list-priority/images', express.static(`${moduleDirectory}/images`));

    //set up index redirect
    app.get('/modules/list-priority/', function(req,res) {
        return res.redirect('/modules/list-priority/index.html');
    });

    //set up index html reroute
    app.get('/modules/list-priority/', function(req, res) {
        return res.sendFile(`${moduleDirectory}/html/index.html`);
    });

    //set up config.json route
    app.get('/modules/list-priority/', function(req, res) {
        return res.status(200).json(configJSON(req));
    });


    //runs whenever we hit save on journey builder
    app.post('/modules/list-priority/save', function(req, res) {
        console.log('debug: /modules/list-priority/save');
        return res.status(200).json({});
    });

    //runs whenever journey has been published
    app.post('/modules/list-priority/publish', function(req, res) {
        console.log('debug: /modules/list-priority/publish');
        return res.status(200).json({});
    });

    //runs whenever journey has been validated
    app.post('/modules/list-priority/validate', function(req, res) {
        console.log('debug: /modules/list-priority/validate');
        return res.status(200).json({});
    });

    //runs when journey is stopped
    app.post('/modules/list-priority/stop', function(req, res) {
        console.log('debug: /modules/list-priority/stop');
        return res.status(200).json({});
    });

    //called when contact is flowing in the journey
    app.post('/modules/list-priority/execute', function(req,res) {
        console.log('debug: modules/list-priority/execute');

        const request = req.body;

        console.log(" req.body", JSON.stringify(req.body));

        //finding in argument
        function getInArgument(k) {
            if (request && request.inArguments) {
                for (let i = 0; i < request.inArguments.length; i++) {
                    let e = request.inArguments[i];
                    if (k in e) {
                        return e[k];
                    }
                }
            }
        }

        function prioritize(engagement) {
            if (engagement == 'click') {
                return "List1"
            } else if (engagement == 'open') {
                return "List2"
            } else {
                return "List3"
            }
        }

        const engagementInArgument = getInArgument('engagement') || 'nothing';
        const responseObject = {
            engagement: engagementInArgument,
            list: prioritize(engagementInArgument)
        };

        console.log('Response Object', JSON.stringify(responseObject));

        return res.status(200).json(responseObject);

    });

};