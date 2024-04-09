<template>
  <div>
    <div class="Name-Wrapper">
      <h1>本文算法：LSMLkNN</h1>
    </div>
    <div class="Introduction-Wrapper">
      <div class="Introduction-Main">
        <h2>LSMLkNN</h2>
        
        <p>
          根据先前的工作研究，MLkNN算法在分类时仅考虑样本的全局特征，忽略了标记间相关性。基于此缺陷，考虑到先学习标记的类属特征，缩减数据集的维度，然后再使用MLkNN作为分类器来预测标记，可以提升分类器的性能。因此结合标记类属特征和标记相关性，本文提出了LSMLkNN算法。针对MLkNN在标记关系上的缺点，对算法加以标记类属特征的改进，通过筛选数据集的特征，可以有效降低数据集的特征维度，从而得到的具有类属特征的数据集，进而使用MLkNN算法进行分类，使得MLkNN算法作为分类器得性能得到进一步提升。
        </p>
      </div>
    </div>
    <div class="Name-Wrapper">
      <h1>MLkNN算法及其改进算法：</h1>
    </div>
    <div class="Introduction-Wrapper">
      <div class="Introduction">
        <h2>MLkNN</h2>
        <p>
          MLkNN算法基于传统的K近邻(KNN)算法，提出的一种多标记懒惰学习方法。MLKNN的基本思想是利用传统的KNN算法为每个可能的标记组合找到最近的k个训练实例，并根据它们的标记来预测新实例的标记。
        </p>
        <div>
          <el-button @click="tomlknn">
            查看论文
          </el-button>
        </div>
      </div>
      <div class="Introduction">
        <h2>CMLKNN</h2>
        <p>
          CMLKNN算法是在MLKNN算法的基础上，提出的一种基于标签相关性的K近邻多标记分类算法。CMLKNN算法的基本思想是首先计算出标记集合中每两个标记之间的条件概率；对于即将被预测的标记，将其与已经预测的标记间的条件概率进行排序，求出最大值；最后将最大值跟对应标记值相乘同时结合最大化后验概率（MAP）来构造多标记分类模型，对新标记进行预测。
        </p>
        <div>
          <el-button>
            查看论文
          </el-button>
        </div>
      </div>
      <div class="Introduction">
        <h2>IMLKNN</h2>
        <p>
          IMLKNN算法是在MLkNN算法的基础上，提出的一种融合标记独有属性特征的k近邻多标记分类算法。IMLKNN算法的基本思想是首先对多标记数据的特征向量进行预处理，分别为每类标记构造对该类标记最具有判别能力的属性特征；然后基于得到的属性特征使用改进后的MLkNN
          算法进行分类。
        </p>
        <div>
          <el-button>
            查看论文
          </el-button>
        </div>
      </div>
    </div>
    <div class="Name-Wrapper">
      <h1>类属特征算法：</h1>
    </div>
    <div class="Introduction-Wrapper">
      <div class="Introduction">
        <h2>LIFT</h2>
        <p>
          LIFT算法研究了另一种从多标记数据中学习的策略，该策略利用标记特有的特征来区分不同类别的标记。LIFT算法的基本思想是首先通过对标记的正负实例进行聚类分析，构造标记的特征，然后通过之前得到的聚类结果进行模型的训练和测试。LIFT算法通过构造每一个标记独有的特征信息，基于标记类属特征进行模型训练，存在的缺点是同样没有引入标记之间的相关信息。
        </p>
        <div>
          <el-button>
            查看论文
          </el-button>
        </div>
      </div>
      <div class="Introduction">
        <h2>LLSF</h2>
        <p>
          LLSF算法通过学习每个标记的类属特征来解决多标记问题。LLSF算法的基本思想是假设每个标记仅与原始特征集中的特征子集相关联，并且任何两个强相关的类标记可以彼此共享比两个不相关或弱相关的标记更多的特征。此方法可以应用作为多标记学习的特征选择方法和一般策略。
        </p>
        <div>
          <el-button>
            查看论文
          </el-button>
        </div>
      </div>
      <div class="Introduction">
        <h2>LLSF-DL</h2>
        <p>
          LLSF-DL算法进一步扩展了LLSF，以稀疏堆叠的方式学习标记类属特征。此算法不仅可以直接用于多标记分类，还可以作为多标记学习的特征选择方法和改进包括多个二进制分类器的多标记分类算法的通用策略。
        </p>
        <div>
          <el-button>
            查看论文
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
      mlknnURL:
        "www.sciencedirect.com/science/article/abs/pii/S0031320307000027",
    };
  },
  methods: {
    tomlknn() {
      window.open(
        "https://www.sciencedirect.com/science/article/abs/pii/S0031320307000027",
        "_blank"
      );
    },
  },
};
</script>

<style>
@import "../assets/styles/base.css";

</style>
