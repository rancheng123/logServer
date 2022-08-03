let render = require('./index');


let fs = require('fs');
var path = require('path')
var changeLogMdPath = path.resolve(__dirname,'../static/CHANGELOG.md')

var oldContent = fs.readFileSync(changeLogMdPath).toString()
console.log(oldContent)


const content = render(oldContent);
console.log(content)

