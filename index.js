const Koa = require('koa');
const serve = require('koa-static');
let fs = require('fs');
var path = require('path')
var changeLogMdPath = path.resolve(__dirname,'./src/static/CHANGELOG.md')
var app = new Koa();
app.use(serve(process.cwd() + '/src/static'));


const Router = require('@koa/router');
var router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001,()=>{
    console.log('the app is listening on 3001')
});

let render = require('./src/mdToHtml/index')


//工作流列表
router.get('/123', (ctx, next) => {

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


