'use strict';

function route_admincp(config) {
	return function(req, res, next) {
		var loggedIn = ((config.authentication || config.authentication_for_edit) ? req.session.loggedIn : false);

		var canEdit = false;
		if (config.authentication || config.authentication_for_edit) {
			canEdit = loggedIn && config.allow_editing;
		} else {
			canEdit = config.allow_editing;
		}

		return res.render('admincp', {
			layout		: 	null,
			lang		: 	config.lang,
			rtl_layout	: 	config.rtl_layout,
			loggedIn	: 	loggedIn,
			canEdit		: 	canEdit,
			username	: 	(config.authentication ? req.session.username : null)
		});

	};
}

module.exports = route_admincp;