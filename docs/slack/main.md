# Overview

[Slack](https:www.slack.com) is a peer-to-peer communication platform that can also be used for machine-to-human communications. 
The ***Noditor Module*** will post statistics, errors and alerts to a Slack Channel hosting the ***Slack Noditor App***.

<!--iframe width="300" height="215" src="https://www.youtube.com/embed/7YUTc4Cigc8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe-->

---

## Setup

While the ***Noditor Module*** can report to any Slack Channel within any Slack Workspace it is best to create a separate channel
and add the ***Slack Noditor App*** to it. This will help to reduce the noise from other conversations
and deliver the best overall experience.

##### Create a Slack Channel

Get started by creating a new Slack Channel. Optionally you can use an existing channel, if do just skip ahead to the
[Add the Slack Noditor App](/slack/main.md?id=Add-the-Slack-Noditor-App)

- Log into your desired ***Slack Workspace***.

- In the left hand sidebar click on the ***Add Channels*** button.

  ![slack-add](/_images/slack-add-channel.png)

- Add a ***Channel Name*** and select the ***Create*** button.

*You have successfully created your Slack Channel.*

##### Add the Slack Noditor App

Add the ***Slack Noditor App*** to the Slack Channel you just created.

- Select the ***Add an app*** link in your new channel's message area.

  ![slack-add](/_images/slack-add-app.png)

- Use the search box to find ***Noditor***.

- Click on the ***Noditor*** icon or ***Add*** button.

*You have successfully added the Slack Noditor App to your Slack Channel. You are ready to move on to the
[Noditor Module](/noditor/main.md?id=Noditor-Module-Overview).*

---

## Webhook URL

Every time you create a Slack Channel and add the ***Slack Noditor App*** to it a unique webhook URL is created. The URL is
unique to the channel. You will need the URL for the confiuration of the ***Noditor Module***. Do not allow the URL to go public,
keep it private. You can have more than one Slack Channel with the ***Slack Noditor App*** installed. Each will have its own URL. 
***Use Case:*** you have a Node.js backend server and an Electron app and you wish to keep the information from each on separate channels.
  
