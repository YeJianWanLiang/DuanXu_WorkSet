<template>
  <div>
    <div class="menuWrapper">
      <el-menu
        class="navMenu"
        mode="horizontal"
        @select="handleSelect"
        :default-active="$route.path"
        :unique-opened="true"
        background-color="#1577FF"
        text-color="#FFFFFF"
        active-text-color="#F5BC49"
        router
      >
        <div style="display: flex;">
          <h3 style="color: #FFFFFF; padding-left: 20px">Uuunico·智图设计</h3>
          <el-menu-item index="/AI_Upload">智能抠图</el-menu-item>
          <el-menu-item index="/Clarity_Upload">清晰处理</el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}
.menuWrapper {
  box-sizing: border-box;
}
.navMenu {
  display: flex;
}
</style>
