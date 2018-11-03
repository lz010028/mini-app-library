<template>
  <div>
    <book-info :info="info"></book-info>
    <comment-list :comments="comments"></comment-list>
    <div class="comment" v-if="couldComment">
      <textarea
        class="textarea"
        v-model="comment"
        placeholder="请输入图书评论"
        :maxlength="100"
      />
      <div class="location">
        地理位置:
        <switch
          :checked="hasLocation"
          type="switch"
          color="#ea5a49"
          @change="getLocaltion"
        />
        <span class="text-primary">{{locationName}}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch
          :checked="phone"
          type="switch"
          color="#ea5a49"
          @change="getPhone"
        />
        <span class="text-primary">{{ phone }}</span>
      </div>
      <div class="btn btn-submit btn-long" @click="commitComment">提交</div>
    </div>
    <div v-else class="text-footer">未登录或者已经评论啦</div>
  </div>
</template>

<script>
  import { get, post, showModal } from "@/util";
  import BookInfo from "@/components/BookInfo";
  import CommentList from "@/components/CommentList";

  export default {
    data() {
      return {
        userInfo: {},
        bookid: '',
        info: {},
        comment: '',
        hasLocation: false,
        location: {},
        phone: '',
        comments: [],
        commentStatus: 0
      };
    },
    components: {
      BookInfo,
      CommentList
    },
    computed: {
      locationName () {
        if (this.hasLocation) {
          return this.location.province + '-' + this.location.city + '-' + this.location.district;
        }
        return '';
      },
      couldComment () {
        if (!this.userInfo.openId) {
          return false;
        }

        if (this.comments.map(v => {
          v.openid === this.userInfo.openId;
        }).length) {
          return false;
        }

        return true;
      }
    },
    methods: {
      async getDetail() {
        const info = await get("/weapp/bookdetail", { id: this.bookid });
        this.info = info;
        wx.setNavigationBarTitle({
          title: info.title
        });
      },
      async getComments() {
        const comments = await get("/weapp/getcomments", { bookid: this.bookid });
        this.comments = comments.list;
      },
      getLocaltion(e) {
        if (e.target.value) {
          const AK = "GGqzuv5mG83rFWP7mvyqOLFYe4iVq4xl";
          let url = "http://api.map.baidu.com/geocoder/v2/";
          let _this = this;
          wx.getLocation({
            success: geo => {
              wx.request({
                url, //开发者服务器接口地址",
                data: {
                  ak: AK,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: "json"
                }, //请求的参数",
                method: "GET",
                dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                  if (res.data.status === 0) {
                    let address = res.data.result.addressComponent;
                    _this.hasLocation = true;
                    _this.location = {
                      country: address.country,
                      province: address.province,
                      city: address.city,
                      district: address.district,
                      street: address.street,
                      street_number: address.street_number
                    };
                  } else {
                    console.log("####");
                  }
                },
                fail: () => {
                },
                complete: () => {
                }
              });
            }
          });
        } else {
          this.localtion = "";
        }
      },
      getPhone(e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync()
          console.log(phoneInfo)
          this.phone = phoneInfo.model;
        } else {
          this.phone = ''
        }

      },
      async commitComment() {
        const data = {
          bookid: this.bookid,
          comment: this.comment,
          phone: this.phone,
          location: this.locationName,
          openid: this.userInfo.openId
        };

        try {
          await post('/weapp/addcomment', data)
          this.comment = ''
          this.getComments()
        } catch (e) {
          showModal("评论失败")
          console.log(e.data.msg)
        }
      }
    },
    mounted() {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments()
      const userInfo = wx.getStorageSync("userInfo")
      if (userInfo) {
        this.userInfo = userInfo
      }
    }
  };
</script>

<style lang="scss" scoped>
  .comment {
    margin-top: 10px;
    padding: 15 rpx;
    font-size: 14px;

    .textarea {
      width: 690 rpx;
      height: 200 rpx;
      background: #eee;
      padding: 15 rpx;
      border-radius: 10 rpx;
      box-shadow: inset 0 0 10 rpx #ddd;
    }
  }

  .location {
    margin-top: 10px;
  }

  .text-footer {
    line-height: 3em;
    font-size: 12px;
    text-align: center;
  }

  .phone {
    margin-top: 10px;
  }

  .btn-submit {
    margin: 20px auto;
  }
</style>
