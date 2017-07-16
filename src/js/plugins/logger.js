import $ from 'jquery';
import Logger from 'js-logger';
import appConfig from './app-config';

var enhancements = {
    timeMeasurements: {},
    time(name) {
        this.timeMeasurements[name] = Date.now();
    },
    timeEnd(name) {
        var timeElapsed = Date.now() - this.timeMeasurements[name];
        this.info('Time elapsed - ' + name + ': ' + timeElapsed + ' (ms).');
    }
};

function createLogger(name) {
    return $.extend(Logger.get(name), enhancements);
}

/*
    Changes the threshold level for all the loggers.
    Allowed levels:
        - OFF
        - DEBUG
        - INFO
        - WARN
        - ERROR

    @param level {String} -> new loggers level
*/
function setLevel(level) {
    Logger.setLevel(Logger[level.toUpperCase()]);
}

function _setCustomLogLevel() {
    var customLevel = window.location.hash.match(/logger=(.*)$/);
    if (customLevel && customLevel.length > 1) {
        setLevel(customLevel[1].toUpperCase());
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

// Set defaults so it shows messages in the console and allow configure through URL hash

if(appConfig.get('loggerUrl')) {
    const uuidSession = uuid(),
        consoleHandler = Logger.createDefaultHandler(),
        webHandler = function (messages, context) {
            $.post(appConfig.get('loggerUrl'), { message: messages[0], level: context.level, id: uuidSession });
        };

    Logger.setLevel(Logger.DEBUG);
    Logger.setHandler(function (messages, context) {
        consoleHandler(messages, context);
        webHandler(messages, context);
    });
} else {
    Logger.useDefaults();
}

if (!appConfig.get('isDevelop') && !appConfig.get('debugLogs')) {
    setLevel('off');  //TODO Disable logs
} else {
    _setCustomLogLevel();
}

export default {
    setLevel: setLevel,
    createLogger: createLogger
};
