var fs = require('fs');
var path = require('path');
// const pkg = require('../package.json');

 
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var dir_path = process.argv[2];
// var save_path = process.argv[3];
 
var file_list_config = {};
fs.readdir(dir_path, function(err, items) {
    // console.log(items);
    
 
    for (var i=0; i<items.length; i++) {
      const ext_name = path.extname(items[i]);
      if (ext_name === '.js') {
        const basename = items[i].replace(ext_name, '');
        console.log(basename);
        file_list_config[basename] = items[i];
      }
    }
    fs.writeFileSync(path.join(dir_path, 'list.js'), "window.MATRIX_EXT_API_LIST = " + JSON.stringify(file_list_config, null, 2));
});