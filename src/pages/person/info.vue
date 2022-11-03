<template>
  <div>
    <el-card class="bodyContent">
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra">
<!--          <el-button type="primary" v-if="$route.params.id==$store.state.id" size="small">操作</el-button>-->
        </template>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-picture-outline"></i>
            头像
          </template>

          <img class="img" :src="avatar" alt="" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            账户名
          </template>
          {{ account }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-s-custom"></i>
            昵称
          </template>
          {{ nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-odometer"></i>
            年龄
          </template>
          {{ age === null?age:'无' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ sex?sex:'无' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          {{ email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-mobile-phone"></i>
            手机号码
          </template>
          {{ mobilePhoneNumber ?mobilePhoneNumber:'无'}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            地区
          </template>
          {{ area?area:'无' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            职业
          </template>
          {{ work?work:'无' }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <i class="el-icon-basketball"></i>
            兴趣爱好
          </template>
          {{ hobby?hobby:'无' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
          {{ design?design:'无' }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-date"></i>
            注册日期
          </template>
          {{ createDate }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { userInfo } from "@/api/user.ts";
export default {
  name: "Info",
  data() {
    return {
      avatar: '',
      account: '',
      age: 0,
      email: '',
      mobilePhoneNumber: '',
      area: '',
      createDate: 0,
      nickname: '',
      sex: '',
      work: '',
      hobby: '',
      design: '',
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {

      var userInfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log('userInfo', userInfo)
      if (userInfo) {
        this.avatar = userInfo.avatar
        this.nickname = userInfo.nickName
        this.email = userInfo.email;
        this.sex = userInfo.sex;
        this.account = userInfo.userName
      }
    },
  },
};
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
.bodyContent{

}
</style>
