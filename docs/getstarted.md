# Installation

The Noditor Module installs from NPM and configures itself with default options which of course can be altered. A quick call to noditor.enable() or noditor.disable() sets the state of the Noditor Module. 

Call noditor.config() to alter configuration options. If the Noditor Module is enabled the new configuration options will take effect immediately.

> [Noditor on NPM](https://www.npmjs.com/package/noditor)
>
> [Noditor on GitHub](https://github.com/WyomingSoftware/noditor)


### Install Noditor module

```bash
npm install noditor --save
```

### Start the Noditor Module

Usage is very basic. Call enable (with or without options) and stop functions from within your Node.js Application to start and stop stats collection and reporting. The Slack Channel/App can also start and stop the Noditor Module, see the [Slack Channel/App](slack/) page.

```javascript
const noditor = require('noditor');
 
// Start with default options
noditor.enable();
 
// Start with declared options
var options = {
    "stats_size":10,
    "stats_frequency":15,
    "passcode":"my_secret",
    "quiet":false
  };
noditor.enable(options);
 
// Start with declared options using a passcode from process.env
// PASSCODE was passed to Node.js (PASSCODE=1234 node server.js)
var options = {
    "stats_size":10,
    "stats_frequency":15,
    "passcode":process.env.PASSCODE,
    "quiet":false
  };
noditor.enable(options);
```

### Stop the Noditor Module

```javascript
noditor.disable();
```

### Change the Configuration

```javascript
var options = {
    "stats_size":50,
    "stats_frequency":125,
    "passcode":process.env.PASSCODE,
    "quiet":false
  };
noditor.config();
```

## Configuration Options

* stats_size: (number) Defaults to 10. The Noditor Module maintains an array of stats inside a Node.js App. The default size of the array is 10 rows. This array of stats is then delivered to the Noditor Mobile App. The array size can be increased to display a graph in the Noditor Mobile App of longer duration.

* stats_frequency: (number) Defaults to 15. The frequency in seconds that stats are collected. This value cannot be less than 5 seconds.

* passcode: (string) Defaults to null. Adds a passcode to protect the /noditor/:path/:passcode/:command endpoint (route). There is no private data that the Noditor Module collects. Passcode protection is optional. If a passcode is used then be sure the Node.js App uses SSL for at least the /noditor/:path/:passcode/:command endpoint. Self-signed certs will not work with the Noditor Mobile App. Use http when using a self-signed cert if the Noditor Mobile App is used. This is usually the case in development and is not recommended for production.

* quiet: (boolean) Defaults to true. The Noditor Module swallows any errors it encounters. Setting the quiet parameter to false would output errors to console along with a few operational messages such as start and stop.

If the Stats Collection (stats_size) is 10 rows and the Stats Frequency (stats_frequency) is 15 seconds then there will be 150 seconds of stats to draw memory and other charts at 15 minute increments up to 2.5 minutes. Adjust the options to get the charts needed.