'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {
	var main = require('../library');

	res.render('admin/plugins/blacklist-country', {
		blacklist: main._settings.blacklist.join(','),
	});
};

module.exports = Controllers;