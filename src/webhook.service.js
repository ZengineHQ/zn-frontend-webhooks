plugin.service('wgnWebhook', ['znData', function (znData) {
	var srv = this;

	/**
	 * Creates a scheduled webhook and returns it's info.
	 * You can pass a service endpoint name for the url.
	 *
	 * @param {number} workspaceId
	 * @param {Object} options
	 *
	 * @return {Promise<Object>} A promise for an object with 'id' and 'key' properties containing the webhook's info.
	 */
	srv.createScheduledWebhook = function (workspaceId, options) {
		if (!options || typeof options !== 'object') {
			throw new Error('Options required.');
		}

		var defaults = {
			frequency: 'daily',
			description: 'Scheduled webhook for wgn',
			start: new Date(),
			isActive: true,
			url: ''
		};

		angular.merge(options, defaults);

		// Check for an endpoint suffix.
		if (options.url.indexOf('http') !== 0) {
			options.url = 'https://plugins.zenginehq.com/workspaces/' + workspaceId + '/wgn/' + options.url;
		}

		var params = {
			'workspace.id': workspaceId,
			'scope': 'plugin.wgn',
			'frequency': options.frequency,
			'timezone': 'America/New_York',
			'start': moment(options.start).format('YYYY-MM-DD[T]HH:mm:ss'),
			'description': options.description,
			'url': options.url,
			'isActive': options.isActive
		};

		return znData('ScheduledWebhooks').save(params).then(function (webhook) {
			return {
				id: webhook.id,
				key: webhook.secretKey
			};
		});
	};

	// @TODO other methods

	return srv;
}]);
