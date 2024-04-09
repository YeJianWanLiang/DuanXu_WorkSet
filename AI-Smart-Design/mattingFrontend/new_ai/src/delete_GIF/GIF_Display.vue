<template>
  <div>
    <div class="gifPage">
      <div class="uploadPic">
        <p>
这里先不管了 我拿前一个页面做的实验

        </p>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
        </el-upload>
        <!-- 预览图片 -->
        <el-dialog :visible.sync="dialogVisibleimg" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <!-- 按钮 -->
        <el-button type="primary">提交</el-button>
        <el-button type="primary">下载</el-button>
      </div>
      <div class="showPic"></div>
    </div>
    <div class="returnGuide">
      <el-button type="primary">返回主界面</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GIF",
  data() {
    return {
      imageUrl: '',
      disabled: false,
      dialogVisibleimg: false,
      dialogImageUrl: "",
      formdata: new FormData(),
      fileList: [],
      addimg: [],
      removeimg: [],
      ruleForm: {
        csAvatar: "",
      },
    };
  },
  computed: {
    uploadDisabled: function() {
      console.log(this.ruleForm.csAvatar);
      return this.ruleForm.csAvatar != "";
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    // 添加活动展示照片
    handleChange(file, fileList) {
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 、png 格式!");
        fileList.splice(-1, 1); //移除错误文件
        return false;
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
        fileList.splice(-1, 1);
        return false;
      }
      this.addimg = fileList[0].raw;
      this.ruleForm.csAvatar = this.addimg;
    },
    // 删除活动展示照片
    handleRemove(file, fileList) {
      console.log(fileList);
      this.ruleForm.csAvatar = "";
      this.formdata = new FormData();
    },
    // 活动展示照片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleimg = true;
    },
    // 渲染编辑获取id
    apply() {
      this.fileList = [{ url: "" }]; //这里是踩坑的点，必须写
      // this.fileList[0].url = res.data.csAvatar; //这里是调用接口获取到的值 res.data.csAvatar，赋值就可以回显了
      //this.fileList[0].url 做的是单张图片回显，多张图片回显可以去掉[0]
    },
    // 提交上传按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formdata = new FormData();
          if (this.ruleForm.csAvatar) {
            //新增
            this.formdata.append("picture", this.ruleForm.csAvatar); //上传图片要把参数和值放在FormData里
            //如果有其他参数，也要一并放在this.formdata里
            /* 例：
	            this.formdata.append("csLevel", this.ruleForm.serviceLevel);
          		this.formdata.append("csMaximum", this.ruleForm.size);
          		*/
          }
          //上传图片的接口（重要看传参部分怎么传参）
          // CustomerServiceController.add(this, this.formdata) //传参直接传this.formdata即可
          //   .then((res) => {
          //     if (res.success == true) {
          //       this.$message.success("新建成功");
          //     } else {
          //       this.$message.error("新建失败");
          //     }
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 178px;
    display: block;
  }
</style>
