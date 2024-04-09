<template>
  <div>
    <div class="introducePage">
      <el-carousel trigger="click" height="150px" width="750px">
        <!-- 功能介绍以及项目介绍 -->
        <el-carousel-item v-for="item in introduceList" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="buttonBar">
      <el-button type="primary" @click="toAI()">体验AI抠图</el-button>
      <el-button type="primary" @click="toGIF()">体验GIF生成</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guide",
  data() {
    return {
      introduceList: ["AI", "GIF"],
    };
  },
  methods: {
    toAI() {
      this.$router.replace("/AI");
    },
    toGIF() {
      this.$router.replace("/GIF");
    },
  },
};
</script>

<style>
.introducePage {
  box-sizing: border-box;
  padding: 2% 5% 2% 5% ;
  text-align: center;
  margin: auto;
}
.buttonBar {
  display: flex;
  box-sizing: border-box;
  justify-content: center;
}
.el-carousel__item {
  background-color: #d3dce6;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: auto;
}
</style>
