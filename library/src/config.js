/**
 * Created by LiangZhao on 2018/7/19.
 * desc: 配置文件
 *
 * */

const host = 'http://localhost:5757'

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
