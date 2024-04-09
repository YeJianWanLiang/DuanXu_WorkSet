<template>
  <div>
    <div class="UploadPic">
      <img src="" alt="" />
    </div>
    <div class="Introduction-Wrapper">
      <div class="Introduction">
        <h1>
          设计师
        </h1>
        <p>
          可以提高工作效率，操作简单，编辑功能齐全，还能添加GIF效果。
        </p>
      </div>
      <div class="Introduction">
        <h1>
          自媒体人
        </h1>
        <p>
          自媒体人，需要用到图片处理，对于并非专业的他们，简单的界面让他们一用即会。
        </p>
      </div>
      <div class="Introduction">
        <h1>
          吃瓜群众
        </h1>
        <p>
          网友自己想制作GIF表情包，想从综艺节目或者电影中截取做成GIF表情包。
        </p>
      </div>
      <div class="Introduction">
        <h1>
          追星粉丝
        </h1>
        <p>
          可以自己做出自己爱豆的GIF动图，从影片中截取片段做成GIF动图。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.UploadPic {
  display: flex;
}

.Introduction-Wrapper {
  display: flex;
  box-sizing: border-box;
  padding: 0 1% 0 1%;
  justify-content: space-between;
}
.Introduction {
  width: 23%;
  height: 250px;
  box-sizing: border-box;
  padding: 1% 1% 1% 1%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.Introduction p {
  color: #636c78;
  font-size: 14px;
}
</style>
