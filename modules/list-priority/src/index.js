import Postmonger from 'postmonger';


const connection = new Postmonger.Session();

let activity = null;

document.addEventListener('DOMContentLoaded', function main() {
    //don't need but let's try it out
    setupExampleTestHarness();

    //set up ui event handlers
    setupEventHandlers();

    //bind the inity activity event
    connection.on('initActivity', onInitActivity);

    connection.trigger('ready');
})