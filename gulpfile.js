var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server',function(){
	return gulp.src('./src')
	.pipe(server({
		port:'7878',
		open:true,
		livereload:true,
		proxies:[
			{
				source:'/api/list',
				target:'http://192.168.0.225:3000/api/list'
			},
			{
				source:'/api/add',
				target:'http://192.168.0.225:3000/api/add'
			},
			{
				source:'/api/del',
				target:'http://192.168.0.225:3000/api/del'
			},
			{
				source:'/api/detail',
				target:'http://192.168.0.225:3000/api/detail'
			}
		]
	}));
});