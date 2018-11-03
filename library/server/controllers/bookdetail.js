const https = require('https')
const { mysql } = require('../qcloud')

/**
 * 图书详情
 * 1.获取图书详细信息
 * 
 * */
module.exports = async(ctx) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
            .select('books.*', 'cSessioninfo.user_info')
            .join('cSessioninfo', 'books.openid', 'cSessioninfo.open_id')
            .where('id', id)
            .first()
    const info = JSON.parse(detail.user_info)

    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(','),
        summary: detail.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            image: info.avatarUrl
        }
    })
    
    await mysql('books')
            .where('id', id)
            .increment('count', 1)
}
