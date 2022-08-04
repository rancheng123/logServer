let render = require('./index');
let {CHANGELOG_PATH} = require('./config')


let fs = require('fs');
var oldContent = fs.readFileSync(CHANGELOG_PATH).toString()
const content = render(oldContent);
console.log(content)

