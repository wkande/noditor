# ***Noditor Module Overview***

The ***Noditor Module***, added to your Node.js Application, pushes messages and stats to a Slack Channel. The ***Slack Noditor App***, added to a Slack Channel, formats and display information received from the ***Noditor Module***.

## Installation

A standard npm install is all it takes.

```bash
npm install noditor --save
```

## Usage

Usage is very basic. Call the ***start(options) and stop()***  methods  from within your Node.js Application to start and stop stats and mesasge posting to your Slack Channel.

```javascript
const noditor = require('noditor');

// Start with minimal options
noditor.start({"webhook_url":"<slack-channel-specific-webhook-url>"});

// Start with additonal options
var options = {
  "webhook_url":"<slack-channel-specific-webhook-url>",
  "stats":true,
  "stats_size":10,
  "stats_frequency":15,
  "passcode":"my_secret",
  "quiet":false
};
noditor.start(options);

// Stop the Noditor Module
noditor.stop();
```

## Options

You can change the options at runtime. No need to ***stop()*** the Noditor Module, simply call ***start(option)*** again.

* **webhook_url:** (string) ***Required, no default value.*** This is the Webhook URL is from the Slack Noditor App that you added to your Slack Channel and is unique for the channel.

* **stats:** (boolean) ***Optional, defaults to true.*** The Noditor Module will not send Memory and CPU stats to a Slack Channel if stats==false, even after the start(options) method has been called. Only error and alert messages will be sent after calling start(options).

* **stats_array_size:** (number) ***Optional, defaults to 10.*** The Noditor Module maintains an array of stats inside a Node.js Application. The default size of the array is 20 rows. This array of stats is then delivered to the Slack Noditor App via the Image API. The array size can be increased or decreased to display a graph in the Slack Noditor App of a desired duration.

* **stats_collected_frequency:** (number) ***Optional, defaults to 15.*** The frequency in seconds that stats are collected. This value cannot be less than 5 seconds.

* **stats_report_frequency:** (number) ***Optional, defaults to 15.*** The frequency in minutes that stats are sent to the Slack Noditor App via the Image API. Send stats manually by calling sendStats().

* **quiet:** (boolean) ***Optional, defaults to true.*** The Noditor Module swallows any errors it encounters. Setting the quiet parameter to false would output errors to your console along with a few operational messages such as start and stop.

* **limiter:** (boolean) ***Optional, defaults to true.*** Built into the Noditor Module is the Limiter mechanism which attempts to prevent excessive error messages being sent to the Slack Noditor App. Should your Node.js Application enter a loop condition and repeatedly send the same error over and over then the Limiter attempts to ignore such a race conditon. To do so the Noditor Module looks at the stacktrace each time you call sendError(). The Limiter will compare the stacktrace to a short history list of stacetraces from past errors. If there is a strong match within the last 10 minutes the error is ignored. Setting the limiter to false is not recommended unless your Node.js Application has its own capabilty to manage such a situation.

If the Stats Array (stats_array_size) is 10 rows and the Stats Collected Frequency (stats_collected_frequency) is 15 seconds then there will be 150 records of stats to draw Memory and CPU charts from. Adjust the options to get the chart size desired.

## Methods

**start(object):** Starts the Noditor Module with options. At minimum the webhook_url option is required. Options can be reset by calling start(object) without calling stop().

```javascript
const noditor requires('noditor');
noditor.start({"webhook_url":"<slack-channel-specific-webhook-url>"});
```

**stop():** Tells the module to go idle. It will not send Memory or CPU stats and will ignore requests to send Errors and Alerts.

```javascript
const noditor requires('noditor');
noditor.stop();
```

**sendStats(object):** Sends Memory and CPU stats to the Slack Noditor App. The stats are sent immediately. Normally stats are sent on a routine basis by the javascript setInterval() function using the value of the ***stats_report_frequency*** option as the delay.

```javascript
const noditor requires('noditor');
noditor.sendStats();
```

**sendError(object):** Send an error message to the Slack Noditor App. The message is sent immediately. The Noditor Module has a built in Limiter mechanism to help mitigate potential race conditions. The Limiter is on by default when start(object) is called. It is best to leave the Limiter active.

```javascript
const noditor requires('noditor');
try{
  throw {"message":"OUCH"};
}
catch(err){
  noditor.sendError(err);
}
```

The sample code [node-server-express](https://github.com/WyomingSoftware/noditor-server-express/blob/master/server.js) shows how to add sendError(object) to a global error handler. The advantage is to have the sendError(object) call in one place.

**sendAlert(object/string):** Send an alert message to the Slack Noditor App. The message is sent immediately. Pass a JSON object using any desired key/value pairs or a string. Generally alerts are for things such as "app started/restarted" and other important events. Unlike sendError(object), sendAlert(string) does not utilize the Limiter mechanism so be careful why and how you send alerts.

```javascript
const noditor requires('noditor');
// Send a JSON Object or text string
noditor.sendAlert({"location":"myClass.myFunction"; "msg":"The //node instance has started"});
// OR
noditor.sendAlert("The node instance has started");
```

## Image API

***Noditor***, as an enivronment, maintains a single API to convert numeric data into a chart image that Slack will render. The API runs on a Node.js/Express instance hosted on Heroku.

While the ***Noditor Module*** does call this API it can be called by a Node.js Application independently of the ***Noditor Module***. The API will attempt to create a chart image of the data using its keys as legends. Each key in the ***data*** object will be drawn on the chart. Each supplies an array of numbers.

The Image API is rate limited to 12 calls per minute for each  unique webhook_url.

##### POST /chart

>Header: content-type:application-json  
>Body: {webhook_url:string, data:json}
```json
// Example payload
{
  "webhook_url":"xyz123",
  "data":{
    "heapTotal":[145, 144, 140, 210, 223],
    "heapUsed":[55, 66, 45, 178, 187]
  }
}
```

> Return Codes:
> - 201 Created and forwarded to Slack
> - 403 Forbidden: invalid webhook_url
> - 429 Too many requests
> - 500 Server error with message



## Sample Code

Please head over to GitHub to see the repo [node-server-express](https://github.com/WyomingSoftware/noditor-server-express), a working Node.js Express application that uses the Noditor Module.
