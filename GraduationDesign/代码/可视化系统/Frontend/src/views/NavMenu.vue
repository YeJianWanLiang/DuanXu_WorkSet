<template>
  <div>
    <div class="menuWrapper">
      <el-menu
        class="navMenu"
        mode="horizontal"
        @select="handleSelect"
        :default-active="$route.path"
        :unique-opened="true"
        background-color="#2D3A4A"
        text-color="#FFFFFF"
        active-text-color="#F5BC49"
        router
      >
        <div style="display: flex;">
          <h3 style="color: #FFFFFF; padding-left: 20px">
            基于类属特征的MLkNN算法（LSMLkNN）可视化系统
          </h3>
          <el-menu-item index="/ALintro">算法介绍</el-menu-item>
          <el-menu-item index="/DSintro">数据集介绍</el-menu-item>
          <el-menu-item index="/AEintro">评价指标介绍</el-menu-item>
          <el-menu-item index="/ALComp">算法结果对比</el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}
.menuWrapper {
  box-sizing: border-box;
  /* overflow-x: auto; */
}
.navMenu {
  display: flex;
}
</style>
