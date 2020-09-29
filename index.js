/*jshint esversion: 6 */
const stats = require('./lib/stats');
let quiet = true;
let passcode = null;
const ERR = 'Noditor ERROR >';
const PAUSED = 'Noditor has been paused';
var Noditor = function () {};


/**
 * For use by the host Node.js Application to 
 * start the Noditor Module at runtime. The module must be 
 * started to sending messages and collect/send stats.
 *
 * var noditor = require('../noditor');
 * noditor.start();
 *
 * @param  {object} options
 * -- list of startup options --
 * webhook_url:string                (required)
 * stats_array_size:number           (optional: defaults 20)
 * stats_frequency:number            (optional: defaults 15 seconds)
 * stats_report_frequency:number     (optionalL default to 15 minutes)
 * quiet:boolean                     (optional: defaults true)
 * limiter:boolean                   (optional: defaults true)
 *
 * @return {void}
 */
Noditor.prototype.start = function (options) {
  try{
    if(!options){
      throw new Error('The JSON options object was not passed to start()');
    }
    else if(options.webhook_url){
      throw new Error('The webhook_url option was not passed to start()');
    }
    else if(options){
      passcode = options.passcode || null;
      if(typeof options.quiet == 'boolean') {
        quiet = options.quiet;
      }
    }

    stats.start(options);
  }
  catch(err){
    if(!quiet) console.log(ERR, 'Noditor.start', err);
  }
};


/**
 * For use by the host Node.js Application to stop 
 * sending messages and collect/send stats
 * @return {void}
 */
Noditor.prototype.stop = function () {
  try{
    stats.stop();
  }
  catch(err){
    if(!quiet) console.log(ERR, 'Noditor.stop', err);
  }
};


/**
 * Sends an error message to the Slack Noditor App immediately.
 * @param {*} err 
 * @return {void}
 */
Noditor.prototype.sendError = function (err) {

}


/**
 * Sends a text message to the Slack Noditor App immediately.
 * @param {string} data
 * @return {void}
 */
Noditor.prototype.sendAlert = function (str) {

}


/**
 * Export the anonymous object
 */
module.exports = new Noditor();