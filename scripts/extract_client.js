var Zip = require('node-7z'); // Name the class as you want!
var path = require('path');
var myTask = new Zip();
var fs = require('fs');
if (!fs.existsSync('client')) {
  fs.mkdirSync('client');
}
var option ={}
if (process.platform === 'win32') {
  option.$bin = path.join(process.env.programfiles, '7-Zip','7z.exe');
  // console.log('7z path: ' + option.$bin);
}
myTask.extractFull('client.7z', '.', undefined, option)
// Equivalent to `on('data', function (files) { // ... });`
.progress(function (files) {
  console.log('Some files are extracted: %s', files);
})
.then(function () {
  console.log('Extracting done!');
})
.catch(function (err) {
  console.error(err);
});