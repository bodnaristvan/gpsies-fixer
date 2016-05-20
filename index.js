var LineByLineReader = require('line-by-line'),
	lr = new LineByLineReader('test.tcx'),
	fs = require('fs'),
	outfile = 'test-fixed.tcx',
	output = '';

lr.on('line', function (line) {
	var o = line.match(/\<L\w+Degrees\>([\d.]+)\<\/L\w+Degrees\>/);
	output += ((o) ? line.replace(o[1], parseFloat(o[1]).toFixed(5)) : line) + "\n";
});

lr.on('end', function () {
	// All lines are read, file is closed now.
	fs.writeFile(outfile, output);
});
