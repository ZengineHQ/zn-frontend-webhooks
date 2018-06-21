plugin.service('wgnTriggeredWebhook', ['wgnWebhookCommon', function (webhookCommon) {
	var srv = this;

	/**
	 * Creates a scheduled webhook and returns it's info.
	 * You can pass a service endpoint name for the url.
	 *
	 * @param {Object} options
	 *
	 * @return {Promise<Object>} A promise for an object with 'id' and 'key' properties containing the webhook's info.
	 */
	srv.create = function (options) {
		var defaults = {
			frequency: 'daily',
			description: 'Scheduled webhook for wgn',
			start: new Date(),
			timezone: 'America/New_York',
			isActive: false,
			url: ''
		};

		if ('start' in options && option.start) {
			defaults.start = moment(options.start).format('YYYY-MM-DD[T]HH:mm:ss');
		}

		return webhookCommon.create(defaults, options, true);
	};

	/**
	 * Updates a scheduled webhook.
	 *
	 * @param {Object} data
	 *
	 * @return {Promise<Object>}
	 */
	srv.update = function (data) {
		return webhookCommon.update(data, true);
	};

	/**
	 * Disables a scheduled webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.disable = function (webhook) {
		return webhookCommon.disable(webhook, true);
	};

	/**
	 * Enables a scheduled webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.enable = function (webhook) {
		return webhookCommon.enable(webhook, true);
	};

	/**
	 * Deletes a webhook.
	 *
	 * @param {number|Object} webhook Either the webhook id or an object containing a key called 'webhookId'.
	 *
	 * @return {Promise<Object>}
	 */
	srv.delete = function (webhook) {
		return webhookCommon.delete(webhook, true);
	};

	return srv;
}]);
