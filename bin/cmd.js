#!/usr/bin/env node

var fs = require('fs');
var yarnify = require('../');

var argv = require('optimist').argv;
var cmd = argv._[0];

if (cmd === 'knit') {
    var dir = argv._[1] || process.cwd();
    yarnify.knit(dir, function (err, src) {
        var outfile = argv.o || argv.outfile || '-';
        if (outfile === '-') {
            console.log(src);
        }
        else fs.writeFile(outfile, src);
    });
}
else {
    console.error('Usage: yarnify knit [directory] [-o outfile.js]');
}
