(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.constant('USER_ROLES', {
		  all: '*',
		  admin: 'admin',
		  editor: 'editor',
		  guest: 'guest'
		});
})();	