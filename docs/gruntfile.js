const sass = require('node-sass');
var Twitter = require('twitter');
const crnd = require('../bindings/js/crnd.js');
var execute = require('child_process').exec;


module.exports = grunt => {

	require('load-grunt-tasks')(grunt);

	let port = grunt.option('port') || 8000;
	let root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	let json = grunt.file.readJSON("secret.json");
	var client = new Twitter({
		consumer_key: json.consumer_key,
		consumer_secret: json.consumer_secret,
		access_token_key: json.access_token_key,
		access_token_secret: json.access_token_secret
	});


	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://revealjs.com\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2019 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n',
				ie8: true
			},
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			core: {
				src: 'css/reveal.scss',
				dest: 'css/reveal.css'
			},
			themes: {
				expand: true,
				cwd: 'css/theme/source',
				src: ['*.sass', '*.scss'],
				dest: 'css/theme',
				ext: '.css'
			}
		},

		autoprefixer: {
			core: {
				src: 'css/reveal.css'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie9'
			},
			compress: {
				src: 'css/reveal.css',
				dest: 'css/reveal.min.css'
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				esnext: true,
				latedef: 'nofunc',
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				loopfunc: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false,
					require: false
				}
			},
			files: [ 'gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: root,
					livereload: true,
					open: true,
					useAvailablePort: true,
					middleware: function(connect, options, middlewares) {
						// inject a custom middleware into the array of default middlewares
						middlewares.unshift(function(req, res, next) {
							var parsed = require('url').parse(req.url, true);

							if (parsed.pathname === '/twitter/retweeters') {
								let params = {'id': parsed.query.id, 'stringify_ids': true};
								client.get('statuses/retweeters/ids', params, function(error, data, response) {
									if(error) throw error;
									res.write(JSON.stringify(data, null, 4));
									res.end();
								});
							}
							else if (parsed.pathname === '/twitter/user') {
								let params = {'user_id': parsed.query.id};
								client.get('users/show', params, function(error, data, response) {
									console.log(params);
									if(error) throw error;
									res.write(JSON.stringify(data, null, 4));
									res.end();
								});
							}
							else if (parsed.pathname === '/crnd/lognormal') {
								const path_to_lib = '/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib/libcrnd.dylib';
								console.log(path_to_lib);
								console.log(parsed.query.seed);
								console.log(parsed.query.n_samples);
								console.log(parsed.query.mu);
								console.log(parsed.query.sigma);
								let samples = crnd.lognormal(path_to_lib, parsed.query.seed, parsed.query.n_samples, parsed.query.mu, parsed.query.sigma);
								res.write(JSON.stringify(samples.getSamplesList(), null, 4));
								res.end();
							}
							else if (parsed.pathname === '/stream') {
								let language = parsed.query.language;
								let command = null;
								const path_to_lib = "/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib/libcrnd.dylib";
								if (language === "python") {
									command = "python /Users/jgsogo/dev/projects/cpp-inside/examples/python/main.py --crnd=" + path_to_lib;
								}
								else if (language === "java") {
									command = 'java -Djna.library.path="/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib" -cp /Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/examples/java/target/CRND-EXAMPLE-1.0-SNAPSHOT-jar-with-dependencies.jar crnd.App';
								}
								else if (language === "cpp") {
									command = '/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/bin/example_cpp --crnd=' + path_to_lib;
								}
								else if (language === "go") {
									command = 'pushd /Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/lib; /Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/examples/go/main --crnd=' + path_to_lib + '; popd';
								}
								else if (language === "rust") {
									command = '/Users/jgsogo/dev/projects/cpp-inside/cmake-build-debug/examples/rust/target/debug/example_rust ' + path_to_lib;
								}
								else if (language === "nodejs") {
									command = 'node /Users/jgsogo/dev/projects/cpp-inside/examples/nodejs/main.js --crnd ' + path_to_lib;
								}
								else {
									command = "'Click on any language logo'";
								}
								execute(command, function(error, stdout, stderr){
									res.write("<html><head><style>body {font-size: 25px; white-space: normal; }</style></head><body>");
									res.write("<pre><code>");
									res.write(command);
									res.write("</code></pre><br/><pre><code>");
									res.write(stdout);
									res.write("</code></pre></body></html>");
									res.end();
								});
							}
							else {
								next();
							}
						});
						return middlewares;
					  }
				}
			}
		},

		zip: {
			bundle: {
				src: [
					'index.html',
					'css/**',
					'js/**',
					'lib/**',
					'images/**',
					'plugin/**',
					'**.md'
				],
				dest: 'reveal-js-presentation.zip'
			}
		},

		watch: {
			js: {
				files: [ 'gruntfile.js', 'js/reveal.js' ],
				tasks: 'js'
			},
			theme: {
				files: [
					'css/theme/source/*.sass',
					'css/theme/source/*.scss',
					'css/theme/template/*.sass',
					'css/theme/template/*.scss'
				],
				tasks: 'css-themes'
			},
			css: {
				files: [ 'css/reveal.scss' ],
				tasks: 'css-core'
			},
			test: {
				files: [ 'test/*.html' ],
				tasks: 'test'
			},
			html: {
				files: root.map(path => path + '/*.html')
			},
			markdown: {
				files: root.map(path => path + '/*.md')
			},
			options: {
				livereload: true
			}
		}

	});

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify', 'qunit' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
