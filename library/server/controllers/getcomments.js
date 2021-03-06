const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {bookid} = ctx.request.query
  const comments = await mysql('comments')
        .select('comments.*', 'cSessioninfo.user_info')
        .join('cSessioninfo', 'comments.openid', 'cSessioninfo.open_id')
        .where('bookid', bookid)
  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        title: info.nickName,
        avatar: info.avatarUrl
      })
    })
  }
}