# Frontend Webhooks

> Helper module for working with webhooks in Zengine frontend plugins.   

## Installation

```shell
# Run this from your frontend plugin's src diretory.
npm i @zenginehq/frontend-webhooks --save
```

It's important that this gets inside under the `src` directory, alongside your plugin's other code if not Maya won't build it properly.

## Usage

```js
plugin.controller('MyAwesomeController', ['$scope', 'wgnWebhook', 'wgnScheduledWebhook', function ($scope, webhook, scheduledWebhook) {
	
  $scope.onSomething(function () {
    webhook.create().then(function (webhook) {
    	console.log(webhook.id);
    	console.log(webhook.secretKey);
    });
    
    // Enable or disable webhooks.
    webhook.enable(webhookId);
    webhook.disable(webhookId);
    
    // Use the exact same API to deal with Scheduled Webhooks.
    scheduledWebhook.create();
    scheduledWebhook.enable();
    scheduledWebhook.disable();
	});
  
}]);
```
### Regular vs Scheduled Webhooks

Notice in the example above there are 2 different services being used `wgnWebhook` and `wgnScheduledWebhook`, they each deal with different kinds of Zengine resources but both expose the exact same API with the following methods available: 

- **create**: creates a new webhook
- **enable**: enables a webhook
- **disable**: disables a webhook
- **delete**: deletes a webhook
- **update**: updates a webhook
