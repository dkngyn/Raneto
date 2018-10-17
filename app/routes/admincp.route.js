'use strict';

function route_admincp(config) {
	return function(req, res, next) {

		return res.render('admincp', {
			layout		: 	null,
			config		: 	config,
			lang		: 	config.lang,
			body_class  : 	'admincp',
			loggedIn    : 	((config.authentication || config.authentication_for_edit) ? req.session.loggedIn : false),
			username	: 	((config.authentication || config.authentication_for_edit) ? req.session.username : null)
		});

	};
}

module.exports = route_admincp;