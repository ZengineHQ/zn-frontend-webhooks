# zn-frontend-webhook

> Helper module for working with webhooks.   

## Installation

```shell
# Run this from your frontend plugin's src diretory.
npm i @zenginehq/frontend-webhook --save
```

It's important that this gets inside under the `src` directory, alongside your plugin's other code if not Maya won't build it properly.

## Usage

```js
plugin.controller('MyAwesomeController', ['$scope', 'wgnWebhook', function ($scope, webhook) {
	
  $scope.onSomething(function () {
  	// @TODO figure this out.
    webhook.create().then(function () {
    	
    });	
	});
  
}]);
```
