<template>
  <div id="app">
    <!-- 在这里添加其他内容或组件 -->

    <!-- 显示School组件 -->
    <router-view></router-view>

    <!-- 在这里添加其他内容或组件 -->
  </div>
</template>

<script>
import { defineComponent } from "vue"
import  Login  from "@/views/static/login.vue"

export default defineComponent({
  name: "App",
  components: {
    Login
  }
});
</script>

<style lang="scss" scoped>
/* 在这里添加样式规则 */
</style>
