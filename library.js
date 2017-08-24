"use strict";

var controllers = require('./lib/controllers');
var geoip = require('geoip-lite');
var meta = module.parent.require('./meta');
var analytics = module.parent.require('./analytics');

var plugin = {
	_settings: {
		blacklist: [],
	}
};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	router.get('/admin/plugins/blacklist-country', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/blacklist-country', controllers.renderAdminPage);

	meta.settings.get('blacklist-country', parseSettings);

	callback();
};

plugin.updateSettings = function (data) {
	if (data.plugin === 'blacklist-country') {
		parseSettings(null, data.settings);
	}
};

function parseSettings (err, settings) {
	// Make all country codes uppercase
	if (settings.blacklist && settings.blacklist.length) {
		settings.blacklist = settings.blacklist.split(',').map(function (code) {
			return code.toUpperCase();
		});
	}

	plugin._settings = Object.assign({}, plugin._settings, settings);
};

plugin.test = function (data, callback) {
	if (!plugin._settings.blacklist.length) {
		return setImmediate(callback, null, data);
	}

	// Test IP from Korea:
	// data.ip = '218.50.221.178';
	var geo = geoip.lookup(data.ip);
	var err = undefined;

	if (geo && plugin._settings.blacklist.indexOf(geo.country) !== -1) {
		analytics.increment('blacklist');
		err = new Error('[[error:blacklisted-ip]]');
		err.code = 'blacklisted-ip';
	}

	callback(err, data);
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/blacklist-country',
		icon: 'fa-tint',
		name: 'Blacklist (Country)'
	});

	callback(null, header);
};

module.exports = plugin;