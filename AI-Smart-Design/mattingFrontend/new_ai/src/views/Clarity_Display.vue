<template>
  <div>
    <!-- <div class="aiPage">
      <div class="image-list">
        <div class="image" v-for="image in images" v-bind:key="image.imageKey">
          <div class="uploadPic">
            <h1 style="text-align: center">原图</h1>
            <img :src="image.originalImage" />
          </div>

          <div class="showPic">
            <h1 style="text-align: center">处理结果</h1>
            <img
              :src="`http://127.0.0.1:5000/${image.processedImageUrl}`"
              v-if="image.processedImageUrl"
            />
            <div v-if="!image.processedImageUrl" class="placeholder" />
            <el-button
              type="primary"
              @click="storePic(image.processedImageUrl)"
              style="margin-top: 2%"
              >保存图片</el-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="returnGuide">
      <el-button type="primary" @click="returnToUpload">返回上传界面</el-button>
    </div> -->
    <div class="picture-comp-wrapper">
      <div class="picture-comp">
        <ResizePic width="1000" height="600" :picL="picL" :picR="picR" />
      </div>
    </div>
    <div class="text-comp">
      <h3>
        拖动横条对比图片
      </h3>
    </div>
    <div class="returnToClarity">
      <el-button
              type="primary"
              @click="storePic(image.processedImageUrl)"
              >保存图片</el-button
            >
      <el-button type="primary" @click="returnToUpload">返回上传界面</el-button>
    </div>
  </div>
</template>

<script>
import ResizePic from "../components/ResizePic.vue";
export default {
  components: { ResizePic },
  data() {
    return {
      picL: require("../assets/dog_before.png"),
      picR: require("../assets/dog_after.png"),
    };
  },
  computed: {
    images() {
      return [...this.$store.state.images].reverse();
    },
  },
  mounted() {},
  methods: {
    returnToUpload() {
      this.$router.push({ path: "/Clarity_Upload" });
    },
    downloadIamge(imgsrc) {
      //下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },

    storePic(picURL) {
      this.downloadIamge(picURL);
      console.log(picURL);
    },
  },
};
</script>

<style>
.picture-comp-wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin: auto;
}

.text-comp {
  text-align: center;
}

.returnToClarity{
  display: flex;
  box-sizing: border-box;
  padding: 0 0 1% 0;
  justify-content: center;
}

/* .image-list .image {
  display: flex;
  padding: 2rem 0;
}

img {
  width: 360px;
  max-width: 100%;
  max-height: 100%;
}

.uploadPic {
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.upLoad {
  text-align: center;
}

.buttonWrapper {
  box-sizing: border-box;
  text-align: center;
  position: relative;
  top: 165px;
}

.showPic {
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.uploadPic,
.showPic {
  padding: 0 0 2rem;
}
.storePicture {
  margin-top: 1%;
}

.placeholder {
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background: #ccc;
} */
</style>
