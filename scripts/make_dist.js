var fs = require('fs');
var path = require('path');
// const pkg = require('../package.json');

 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var dir_path = process.argv[2];
var save_path = process.argv[3];
 
fs.readdir(dir_path, function(err, items) {
    // console.log(items);
    
 
    for (var i=0; i<items.length; i++) {
      fs.createReadStream(path.join(dir_path, items[i])).pipe(fs.createWriteStream(path.join(save_path, items[i])));
    }
});