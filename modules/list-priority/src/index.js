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
});

function onInitActivity(payload) {

    activity = payload;

    const hasInArguments = Boolean(
        activity.arguments &&
        activity.arguments.execute &&
        activity.arguments.execute.hasInArguments &&
        activity.arguments.execute.inArgument.length > 0
    );

    const inArguments = hasInArguments ? activity.arguments.execute.inArguments : [];

    console.log('------- triggered:onInitActivity({obj}) ---------');
    console.log('activity:\n ', JSON.stringify(activity, null, 4));
    console.log('Has In Arguments: ', hasInArguments);
    console.log('inArguments: ', inArguments);
    console.log('-------------------------------------------------');

    //execute in ./list-priority/app.js
    const listPriorityArgument = inArguments.find((arg) => arg.engagement);

    console.log('Engagement Argument: ', listPriorityArgument);

    if (listPriorityArgument) {
        //run custom function put in here
    }

}

function onDoneButtonClick() {
    //tells Journey Builder that this activity is ready for activation
    activity.metaData.isConfigured = true;

    //get option user selected and save it to
    const select = document.getElementById('listPriority'); //?? is this right
    const option = select.options[select.selectedIndex];

    activity.arguments.execute.inArguments = [{
        engagement: option.value,
    }];

    activity.name = 'Issue Call List Priority'

    console.log('------------ triggering:updateActivity({obj}) ----------------');
    console.log('Sending message back to updateActivity');
    console.log('saving\n', JSON.stringify(activity, null, 4));
    console.log('--------------------------------------------------------------');

    connection.trigger('updateActivity', activity);

}

function onCancelButtonClick() {
    // tell Journey Builder that this activity has no changes.
    // we wont be prompted to save changes when the inspector closes
    connection.trigger('setActivityDirtyState', false);

    // now request that Journey Builder closes the inspector/drawer
    connection.trigger('requestInspectorClose');
}

function setupEventHandlers() {
    // Listen to events on the form
    document.getElementById('done').addEventListener('click', onDoneButtonClick);
    document.getElementById('cancel').addEventListener('click', onCancelButtonClick);
    document.getElementById('discount-code').addEventListener('change', onDiscountCodeSelectChange);
}