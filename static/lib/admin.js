'use strict';
/* globals $, app, socket */

define('admin/plugins/blacklist-country', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('blacklist-country', $('.blacklist-country-settings'));

		$('form [data-field-type="tagsinput"]').tagsinput({
			confirmKeys: [13, 44],
			trimValue: true,
		});

		$('#save').on('click', function() {
			Settings.save('blacklist-country', $('.blacklist-country-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'blacklist-country-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});