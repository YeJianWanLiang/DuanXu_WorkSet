<template>
  <div>
    <div class="Name-Wrapper">
      <h1>非图像数据集：</h1>
    </div>
    <div class="Introduction-Wrapper">
      <div class="Introduction-ds">
        <h1>yeast</h1>
        <p>yeast数据集是一个用于分类任务的基因表达数据集，一共有14个分类标记。包含了1484个样本。本数据集常用于多标记分类和基因表达数据分析，例如使用机器学习和统计方法来预测酵母菌物种中蛋白质的定位和功能。</p>
        <div>
          <el-button @click="toYeast">
            查看并下载
          </el-button>
        </div>
      </div>
      <div class="Introduction-ds">
        <h1>Emotions</h1>
        <p>Emotions数据集基于Tellegen-Watson-Clark的情绪模型，将音乐分为其可以唤起的情绪：amazed-suprised、happy-pleased、relaxing-cal、quiet-still、sad-lonely、angry-aggresive。本数据集由593首歌曲组成，共有6个分类标记。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
      <div class="Introduction-ds">
        <h1>CAL500</h1>
        <p>CAL500是一个音乐数据集，由502首歌曲组成。每一个都由至少三名人工注释者手动注释，他们使用了174个与语义概念有关的标签。这些标签涵盖了6个语义类别：乐器、人声特征、流派、情感、歌曲的音质和使用术语。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
    </div>
    <di class="Name-Wrapper">
      <h1>图像数据集：</h1>
    </di>
    <div class="Introduction-Wrapper">
      <div class="Introduction-4">
        <h1>Corel5k</h1>
        <p>数据集由来自Corel公司的5000张图像组成，涵盖了大量的场景和主题。本数据集中的图像大多数都是自然场景的图像，包括人物、动物、植物、建筑和物品等。每个图像都带有5个标记，这些标记描述了图像的内容和主题，标记集包括374个不同的类别。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
      <div class="Introduction-4">
        <h1>Corel16k</h1>
        <p>Corel16k是一个公开的图像数据集，由加拿大Corel公司创建。该数据集收集了16000张大小为192x128的真实世界图像，图像类别覆盖了自然风光、人物肖像、动物、工业、体育等20个类别。该数据集可以用于图像分类、目标检测、图像检索等任务。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
      <div class="Introduction-4">
        <h1>Image</h1>
        <p>Image数据集由2000张图像组成。具体地，每个彩色图像首先被转换到CIE-Luv空间，该空间是一个在感知上更均匀的颜色空间，使得感知到的色差与该颜色空间中的欧几里得距离紧密对应。最后，每个图像被转换为49*3*2=294维的特征向量。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
      <div class="Introduction-4">
        <h1>Scene</h1>
        <p>Scene数据集是计算机视觉领域中常用的一个图像分类数据集。该数据集包含2407个图像，每个图像用一个场景类别标记，共有六个类别，分别为“厨房”、“教堂”、“展厅”、“办公室”、“广场”和“自然景观”。数据集的原始图像都是RGB彩色图像，分辨率为256*256像素。</p>
        <div>
          <el-button>
            查看并下载
          </el-button>
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    toYeast() {
      window.open(
        "http://www.uco.es/kdis/mllresources/",
        "_blank"
      );
    },
  },
};
</script>

<style>
@import "../assets/styles/base.css";


</style>
