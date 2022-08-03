const MarkdownItChain = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor'); // 为各级标题添加锚点
const slugify = require('transliteration').slugify; // 中文转拼音
const _markdownItChain = new MarkdownItChain();
_markdownItChain.options
    .html(true)
    .end()


    .plugin('anchor')
    .use(anchorPlugin, [
        {
            level: 2,
            slugify: slugify,
            permalink: true,
            permalinkBefore: true,
        },
    ])
    .end()

const md = _markdownItChain.toMd();
const render = (mdContent)=>{
    const content = md.render(mdContent);
    return content
}

module.exports = render




