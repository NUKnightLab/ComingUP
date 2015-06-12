/**
 * Created by juliu_000 on 5/20/2015.
 */
var gulp =  require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function(){
            console.log('Restarting');
        })
});