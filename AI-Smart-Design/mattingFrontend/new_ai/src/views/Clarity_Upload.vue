<template>
  <div>
    <div class="UploadPic">
      <div class="header-container">
        <div class="header-side">
          <div class="upload-image-text-wrapper">
            <h2>快速生成清晰图像</h2>
            <h3>自动且高效</h3>
          </div>
          <div class="header-image-wrapper">
            <img src="../assets/UploadBg.png" alt="" />
          </div>
        </div>
        <div class="upload-image-box">
          <div
            class="upload-image-box-wrapper"
            @dragover="fileDragover"
            @drop="fileDrop"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                color="#888"
                viewBox="0 0 512 512"
              >
                <title>ionicons-v5-e</title>
                <path
                  d="M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <rect
                  x="96"
                  y="128"
                  width="400"
                  height="336"
                  rx="45.99"
                  ry="45.99"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <ellipse
                  cx="372.92"
                  cy="219.64"
                  rx="30.77"
                  ry="30.55"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-miterlimit: 10;
                    stroke-width: 32px;
                  "
                />
                <path
                  d="M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
                <path
                  d="M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91"
                  style="
                    fill: none;
                    stroke: currentColor;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 32px;
                  "
                />
              </svg>

              <div class="upload-image-box-control">
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  @change="handleSelect"
                  ref="avatarInput"
                  hidden
                />
                <el-button
                  :disabled="loading"
                  type="primary"
                  @click="handleClick"
                  style="margin-top: 10px"
                >
                  {{ loading ? "上传中" : "上传图片" }}
                </el-button>
                <div class="upload-image-box-description">或拖放一张图片</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="Introduction-Wrapper">
      <div class="Introduction">
        <h1>上传图片自动美化</h1>
        <p>人工智能自动识别，美化模糊照片。</p>
        <img src="../assets/intro_ai/1.png" alt="" />
      </div>
      <div class="Introduction">
        <h1>自动识别图片元素</h1>
        <p>恢复图像细节，还原更清晰真实的图像。</p>
        <img src="../assets/intro_ai/2.png" alt="" />
      </div>
      <div class="Introduction">
        <h1>破损照片修复</h1>
        <p>开展怀旧等主题活动，提升老照片的质量。</p>
        <img src="../assets/intro_ai/3.png" alt="" />
      </div>
      <div class="Introduction">
        <h1>多场景应用</h1>
        <p>提升图片质量，无需专业软件与技术。</p>
        <img src="../assets/intro_ai/4.png" alt="" />
      </div>
    </div>
    <!-- <div class="Usage-Step">
      <div class="Steps-Container">
        <div class="steps">
          <img src="../assets/testdog.png" alt="" />
          <div class="steps-text">
            <h1>简单步骤，轻松完成在线抠图：</h1>
            <p>
              通用抠图，更是无所不能开阔全屏视野，效果对比一目了然，细节处理绝不含糊。
            </p>
          </div>
        </div>
        <div class="steps">
          <div class="steps-text">
            <h1>AI自动抠图, 如你所愿</h1>
            <p>
              AI不断学习的识别能力，帮你自动识别需要保留的主体并去除背景。一键上传图片即可快速实现抠图。
            </p>
          </div>
          <img src="../assets/testdog.png" alt="" />
        </div>
      </div>
    </div> -->
    <div class="footer"></div>
  </div>
</template>

<script>
import axios from "axios";
import { UniqID } from "../util/uuid";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleClick() {
      this.$refs.avatarInput.click();
    },
    handleSelect(e) {
      const file = e.target.files[0];
      // 限制上传图片类型
      if (!file) return;
      if (!/(jpg|jpeg|png|JPG|PNG)$/.test(file.type)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }

      this.imageKey = UniqID();
      this.formData = new FormData();
      this.formData.append("file", file);
      this.getPic();
    },

    // 拖拽上传
    fileDragover(e) {
      e.preventDefault();
    },
    fileDrop(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0]; // 获取到第一个上传的文件对象
      console.log(file);
      console.log("拖拽释放鼠标时");

      // 限制上传图片类型
      if (!file) return;
      if (!/(jpg|jpeg|png|JPG|PNG)$/.test(file.type)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }

      this.imageKey = UniqID();
      this.formData = new FormData();
      this.formData.append("file", file);
      this.getPic();
    },

    getPic() {
      if (!this.imageKey) return;
      let that = this;
      let messageInstance = this.$message({
        message: "上传中",
        duration: 0,
        showClose: false,
      });

      const reader = new FileReader();
      reader.onload = (data) => {
        if (!this.imageKey) return;
        this.$store.commit("appendImage", {
          imageKey: this.imageKey,
          originalImage: data.target.result,
          processedImage: undefined,
          processedImageUrl: undefined,
        });
      };
      reader.readAsDataURL(this.formData.get("file"));

      axios({
        method: "post",
        data: this.formData,
        url: "http://127.0.0.1:5000/classify",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.data)
        .then(function(data) {
          that.$store.commit("updateImage", {
            imageKey: that.imageKey,
            processedImageUrl: data.url,
          });
        })
        .finally(() => {
          if (messageInstance) {
            messageInstance.close();
          }
          that.imageKey = undefined;
        });

      that.$router.push({ path: "/Clarity_Display" });
    },
    // ArrayBuffer转为base64字符串
    arrayBufferToBase64(buffer) {
      //第一步，将ArrayBuffer转为二进制字符串
      var binary = "";
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      //将二进制字符串转为base64字符串
      return window.btoa(binary);
    },
  },
};
</script>

<style>
@import '../assets/styles/base.css';



.header-image-wrapper img {
  width: 850px;
}

/* .header-image-wrapper {
  display: flex;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
} */

.header-container {
  display: flex;
  width: 85vw;
  margin: 0 auto;
  position: relative;
  justify-content: space-between;
  z-index: 1;
}

.upload-image-text-wrapper {
}

.upload-image-text-wrapper h2 {
  font-size: 55px;
  color: #FFFFFF;
  margin: 3rem 0 0;
}

.upload-image-text-wrapper h3 {
  margin: 1rem 0 2rem;
  font-size: 32px;
  color: #ffffff;
  /* color: #000000; */
}

.upload-image-box-wrapper {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0 24px rgba(75, 75, 75, 0.24);

  width: 300px;
  padding: 2rem;
  display: inline-flex;
  flex-direction: column;
}

.upload-image-box {
  flex-shrink: 0;
  width: 360px;
  padding: 8rem 0 0 0;
  display: flex;
  flex-direction: column;
}

.upload-image-box-control {
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
}

.upload-image-box-description {
  color: #888;
  margin-top: 1rem;
  text-align: center;
}

.Upload input {
  border: 1px solid rgba(34, 36, 38, 0.15);
}


</style>
