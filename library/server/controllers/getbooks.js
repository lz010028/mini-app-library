/**
 * Created by LiangZhao on 2018/7/22.
 */
const { mysql } = require('../qcloud')

/**
 * 获取图书列表
 * 获取图书
 * */

module.exports = async (ctx) => {
    const { page } = ctx.request.query
    const size = 10
    const books = await mysql('books')
        .select('books.*', 'cSessioninfo.user_info')
        .join('cSessioninfo', 'books.openid', 'cSessioninfo.open_id')
        .limit(size)
        .offset(Number(page) * size)
        .orderBy('books.id', 'desc')
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
