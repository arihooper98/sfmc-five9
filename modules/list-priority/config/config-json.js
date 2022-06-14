module.exports = function configJSON(req) {
    return {
        workflowApiVersion: '1.1',
        metaData: {
            icon: 'images/something.svg',
            category: "message"
        },
        type: 'REST',
        lang: {
            'en-US': {
                name: 'List Priority - Five9',
                description: 'Prioritize on call list based on engagement with emails'
            }
        },
        arguments: {
            execute: {
                inArguments: [
                    {
                        //comes from iframe
                    }
                ],
                outArguments: [],
                //fill in with the host this is running on
                url: `https://${req.headers.host}/modules/list-priority/execute`,
                timout: 10000,
                retryCount: 3,
                retryDelay: 1000,
                concurrentRequests: 5
            }
        },
        configurationArguments: {
            publish: {
                url: `https://${req.headers.host}/modules/list-priority/publish`
            },
            validate: {
                url: `https://${req.headers.host}/modules/list-priority/validate`
            },
            stop: {
                url: `https://${req.headers.host}/modules/list-priority/stop`
            }
        },
        userInterfaces: {
            configurationSupportsReadOnlyMode: true,
            configInspector: {
                size: 'scm-lg',
                emptyIframe: true
            }
        },
        schema: {
            arguments: {
                execute: {
                    inArguments: [],
                    outArguments: [{
                        engagement: {
                            dataType: 'Text',
                            direction: 'out',
                            access: 'visible'
                        },
                        list: {
                            dataType: 'Text',
                            direction: 'out',
                            access: 'visible'
                        }
                    }]
                }
            }
        }
    }
}