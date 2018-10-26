'use strict';

const fs = require('fs');
const path = require('path');

function route_admincp_scan(config) {

	return function(req, res, next) {

		function scan(dir, alias) {

			function walk(dir, prefix) {
				prefix = prefix || '';

				if(!fs.existsSync(dir)){
					return [];
				}

				return fs.readdirSync(dir).filter(function(f){
					return f && f[0] != '.';
				}).map(function(f){
					var p = (dir + '/' + f).replace('./', ''),
					stat = fs.statSync(p);

					if(stat.isDirectory()){
						return {
							name: f,
							type: 'folder',
							path: p,
							mtime: stat.mtime,
							items: walk(p, prefix)
						};
					}

					return {
						name: f,
						type: 'file',
						path: p,
						mtime: stat.mtime,
						size: stat.size
					}
				});
			};

			return {
				name: alias,
				type: 'folder',
				path: dir,
				items: walk(dir, alias)
			};
		};

		var tree = scan(path.basename(config.content_dir), 'content');
		res.json(tree);
	};
};

module.exports = route_admincp_scan;