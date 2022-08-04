const Koa = require('koa');
const serve = require('koa-static');
let fs = require('fs');
var path = require('path')
const koaBody = require('koa-body');
var changeLogMdPath = path.resolve(__dirname,'./src/static/CHANGELOG.md')
var app = new Koa();
app.use(koaBody());
app.use(serve(process.cwd() + '/src/static'));


const Router = require('@koa/router');
var router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001,()=>{
    console.log('the app is listening on 3001')
});

let render = require('./src/mdToHtml/index')


//获取更新日志
router.get('/release/logs/get', (ctx, next) => {

    var oldContent = fs.readFileSync(changeLogMdPath).toString()
    const content = render(oldContent);
    console.log(content)

    ctx.body = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div>
    ${content}
    </div>
</body>
</html>
    `;
});



let {updateLog} = require('./src/mdToHtml/updateMd')
router.post('/release/logs/update', (ctx, next) => {
    let {version, contents} = JSON.parse(ctx.request.body)
    updateLog({
        version: version,
        partConent: contents
    })
    console.log('update')
    ctx.body = {
        code: 10000,
        msg: '日志更新成功'
    }
});


