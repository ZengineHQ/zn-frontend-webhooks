plugin.service('wgnWebhook', ['wgnWebhookCommon', function (webhookCommon) {
	var srv = this;

	/**
	 * Creates a regular webhook and returns it's info.
	 * You can pass a service endpoint name for the url.
	 *
	 * @param {Object} options
	 *
	 * @return {Promise<Object>} A promise for an object with 'id' and 'key' properties containing the webhook's info.
	 */
	srv.create = function (options) {
		var defaults = {
			isActive: false,
			url: '',
			includeRelated: false
		};

		return webhookCommon.create(defaults, options, false);
	};

	/**
	 * Updates a webhook.
	 *
	 * @param {Object} data
	 *
	 * @return {Promise<Object>}
	 */
	srv.update = function (data) {
		return webhookCommon.update(data, false);
	};

	/**
	 * Disables a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.disable = function (webhook) {
		return webhookCommon.disable(webhook, false);
	};

	/**
	 * Enables a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.enable = function (webhook) {
		return webhookCommon.enable(webhook, false);
	};

	/**
	 * Deletes a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.delete = function (webhook) {
		return webhookCommon.delete(webhook, false);
	};

	return srv;
}]);
