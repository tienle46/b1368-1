/**
 * Created by Thanh on 9/1/2016.
 */

var app = require('app');

app.config = {};
app.config.host = "123.31.12.100";
// app.config.host = "123.30.238.174";
app.config.port = 8481;
app.config.zone = "XGame";
app.config.debug = false;
app.config.useSSL = false;
app.config.test = true;
app.config.testIngame = false;
app.config.defaultLocale = 'vi';
app.config.poorNetworkThreshold = 2000;
app.config.pingPongPollQueueSize = 3;
app.config.pingPongInterval = 60000;
app.config.buildForMobile = true; // if ( sys.platform !== 'browser')