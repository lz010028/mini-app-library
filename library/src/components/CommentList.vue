<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">评论</div>
    <div class="comment" v-for="(item, index) in comments" :key="index">
      <div class="user">
        <div class="inline">
          <image
            class="avatar"
            :src="item.avatar"
            mode="scaleToFill"
            lazy-load="false" />
            {{item.title}}
        </div>
        <div class="right">
          {{item.location || '未知地点'}}
          <span class="text-primary">--</span>
          {{item.phone || '未知型号'}}
        </div>
        <div class="content">{{item.comment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommentList',
    props: [
      'comments'
    ],
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .comment-list {
    background: #eee;
    font-size: 14px;
    overflow: hidden;

    .comment {
      background: #fff;
      margin-bottom: 10px;
      padding: 5px 20px;

      .content {
        margin: 10px 0 0;
      }

      .inline {
        display: inline-block;
      }
      .right {
        line-height: 30px;
      }

      .user {
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
</style>
