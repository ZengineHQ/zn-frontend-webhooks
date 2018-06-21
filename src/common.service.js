plugin.service('wgnWebhookCommon', ['$routeParams', 'znData', function ($routeParams, znData) {
  var srv = this;
  var workspaceId = $routeParams.workspace_id;

  /**
   * Creates a new webhook.
   *
   * @param {Object} params Default params for scheduled/non-scheduled.
   * @param {Object} options User params
   * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
   *
   * @return {Promise<Object>}
   */
  srv.create = function (params, options, scheduled) {
    /*jshint maxcomplexity:9 */
    scheduled = scheduled || false;
    params = params || {};

    var resource = scheduled ? 'ScheduledWebhooks' : 'Webhooks';

    if (!options || typeof options !== 'object') {
      throw new Error('Options required.');
    }

    angular.extend(params, options, { 'workspace.id': workspaceId });

    if (!('scope' in params) || !params.scope) {
      params.scope = 'plugin.wgn';
    }

    // Check for a backend service endpoint suffix.
    if (params.url.indexOf('http') !== 0) {
      params.url = 'https://plugins.zenginehq.com/workspaces/' + workspaceId + '/wgn/' + params.url;
    }

    return znData(resource).save(params);
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
    return znData(resource).save({ id: data.id }, data);
  };

  /**
   * Disables a webhook.
   *
   * @param {number} webhookId
   * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
   *
   * @return {Promise<Object>}
   */
  srv.disable = function (webhookId, scheduled) {
    return toggle(webhookId, false, scheduled);
  };

  /**
   * Enables a webhook.
   *
   * @param {number} webhookId
   * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
   *
   * @return {Promise<Object>}
   */
  srv.enable = function (webhookId, scheduled) {
    return toggle(webhookId, true, scheduled);
  };

  /**
   * Deletes a webhook.
   *
   * @param {number} webhookId
   * @param {boolean} scheduled Whether we're dealing with Scheduled Webhooks, defaults to regular ones.
   *
   * @return {Promise<Object>}
   */
  srv.delete = function (webhookId, scheduled) {
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
