let {CHANGELOG_PATH} = require('./config')
let fs = require('fs');

let updateLog = ({
                     version,
                     partConent
                 })=>{
    var oldContent = fs.readFileSync(CHANGELOG_PATH).toString()
    fs.writeFileSync(
        CHANGELOG_PATH,
        `## 更新日志

### ${version}

*${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}*

${partConent}
 
 
${oldContent.replace('## 更新日志','')}
`
    )
}

module.exports = {
    updateLog
}



