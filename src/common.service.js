plugin.service('wgnWebhookCommon', ['znData', function (znData) {
	var srv = this;

	/**
	 * Creates a new webhook.
	 *
	 * @param {number} workspaceId
	 * @param {Object} params Default params for scheduled/non-scheduled.
	 * @param {Object} options User params
	 * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
	 *
	 * @return {Promise<Object>}
	 */
	srv.create = function (workspaceId, params, options, scheduled) {
		scheduled = scheduled || false;
		params = params || {};

		var resource = scheduled ? 'ScheduledWebhooks' : 'Webhooks';

		if (!options || typeof options !== 'object') {
			throw new Error('Options required.');
		}

		angular.extend(params, options, {
			'workspace.id': workspaceId,
		});

		if (!('scope') in params) {
			params.scope = 'plugin.wgn';
		}

		// Check for a backend service endpoint suffix.
		if (params.url.indexOf('http') !== 0) {
			params.url = 'https://plugins.zenginehq.com/workspaces/' + workspaceId + '/wgn/' + params.url;
		}

		return znData(resource).save(finalParams).then(function (webhook) {
			return {
				webhookId: webhook.id,
				webhookKey: webhook.secretKey
			};
		});
	};

	/**
	 * Updates a webhook.
	 *
	 * @param {Object} data
	 * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
	 *
	 * @return {Promise<Object>}
	 */
	srv.update = function (data, scheduled) {
		var resource = scheduled ? 'ScheduledWebhooks' : 'Webhooks';
		return znData(resource).save({ id: webhookId }, data);
	};

	/**
	 * Disables a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
	 *
	 * @return {Promise<Object>}
	 */
	srv.disable = function (webhook, scheduled) {
		var webhookId = angular.isObject(webhook) && 'webhookId' in webhook ? webhook.webhookId : webhook;
		return toggle(webhookId, false, scheduled);
	};

	/**
	 * Enables a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
	 *
	 * @return {Promise<Object>}
	 */
	srv.enable = function (webhook, scheduled) {
		var webhookId = angular.isObject(webhook) && 'webhookId' in webhook ? webhook.webhookId : webhook;
		return toggle(webhookId, true, scheduled);
	};

	/**
	 * Deletes a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
	 *
	 * @return {Promise<Object>}
	 */
	srv.delete = function (webhook, scheduled) {
		var webhookId = angular.isObject(webhook) && 'webhookId' in webhook ? webhook.webhookId : webhook;
		var resource = scheduled ? 'ScheduledWebhooks' : 'Webhooks';
		return znData(resource).delete({ id: webhookId });
	};

	/**
	 * Saves the 'isActive' flag for webhooks.
	 *
	 * @param {number} webhookId
	 * @param {boolean} enable
	 * @param {boolean} scheduled
	 */
	function toggle (webhookId, enable, scheduled) {
		enable = enable || false;
		scheduled = scheduled || false;

		var resource = scheduled ? 'ScheduledWebhooks' : 'Webhooks';
		return znData(resource).save({ id: webhookId }, { isActive: !!enable });
	}

	return srv;

}]);
