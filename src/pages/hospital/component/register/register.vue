<template>
  <div class="register">
    <hos-info :content-config="contentConfig"></hos-info>
<!--  放置医院的数据  -->
    <div class="department">
      <div class="leftNav">
        <ul>
          <li v-for="(department, index) in hospitalDepartment" :key="department.depcode" :class="{active:index === currentIndex}" @click="handleDepartment(index)">{{department.depname}}</li>
        </ul>
      </div>
      <div class="hosDepartment">
<!--    用一个div代表：大科室与小科室    -->
        <div class="showDepartment" v-for="department in hospitalDepartment" :key="department.depcode">
          <h1 class="cur">{{department.depname}}</h1>
          <ul>
            <li v-for="item in department.children" :key="item.depcode" @click="handleShowLogin(item)" >{{item.depname}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {contentConfig} from "@/pages/hospital/component/register/config/register.config";
import HosInfo from "@/pages/hospital/component/hosInfo/hosInfo.vue";
import useHospitalStore from "@/store/hospital/hospital";
import {storeToRefs} from "pinia";
import useUserStore from "@/store/user/user";

const hospitalStore = useHospitalStore()
const { hospitalDepartment } = storeToRefs(hospitalStore)

// 路由器
const $router = useRouter()
const $route = useRoute()

//  控制科室响应式
let currentIndex = ref<number>(0)
const handleDepartment = (index) => {
  currentIndex.value = index

//  设置点击某个科室，滚动到最前面
  let allH1 = document.querySelectorAll('.cur')
  allH1[currentIndex.value].scrollIntoView({
    behavior: 'smooth', // 滚动效果
    block: 'start' // 滚动到的位置
  })
}

// 判断是否登录，如果登录进入挂号页面，没有登陆进入登陆页面
const userStore = useUserStore()
const handleShowLogin = (item) => {
  // 弹出登录页面
  // TODO:路由鉴权
  // userStore.loginIsShow = !userStore.loginIsShow

//  点击某一个医院科室按钮，进入相应的预约挂号页面
  $router.push({ path: "/hospital/register_step1" ,
      query: {hoscode: $route.query.hoscode, depcode: item.depcode}})
}

</script>

<style lang="less" scoped>
.register {
  .department {
    display: flex;
    margin-top: 20px;
    margin-left: 30px;
    height: 500px;

    .leftNav {
      flex: 1;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 30px;
          &.active {
            border-left: 1px solid red;
            background-color: #ffffff;
          }
        }
      }
    }

    .hosDepartment {
      flex: 9;
      height: 100%;
      overflow: auto;
      // 隐藏滚动条
      &::-webkit-scrollbar {
        display: none;
      }

      h1 {
        background-color: rgb(248, 248, 248);
      }

      .showDepartment {
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            color: #7f7f7f;
            width: 33%;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>
