const listPriority = require('./modules/list-priority/webpack.config');

module.exports = function(env, argv) {
    return [
        listPriority(env, argv)
    ];
};