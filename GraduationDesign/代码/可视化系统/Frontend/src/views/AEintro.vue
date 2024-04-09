<template>
  <div>
    <div class="AE-Wrapper">
      <div>
        <div class="Title-Wrapper">
          <h1>HammingLoss</h1>
        </div>
        <div class="Result-Wrapper-E">
          <img src="../assets/img/PicHL.png" alt="" />
          <div class="Result-P">
            <p>
              HammingLoss用于考察样本在单个标记上的错误分类情况，表示了被错误预测的标记数目占总标记数目的比例，此指标取值越小，性能越优。
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="Title-Wrapper">
          <h1>One-Error</h1>
        </div>
        <div class="Result-Wrapper-E">
          <img src="../assets/img/PicOE.png" alt="" />
          <div class="Result-P">
            <p>
              One-Error是排序第一的标记没有被正确标记的次数，计算时统计所有符合的样本，然后计算其数量与样本总数的比值，此指标取值越小，性能越优。
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="Title-Wrapper">
          <h1>Coverage</h1>
        </div>
        <div class="Result-Wrapper-E">
          <img src="../assets/img/PicCR.png" alt="" />
          <div class="Result-P">
            <p>
              Coverage计算平均需要多少步才能移动到属于样本的标记，记录此位置序号。把所有测试样本的情况统计之后，再计算其比例，此指标取值越小，性能越优。
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="Title-Wrapper">
          <h1>RankingLoss</h1>
        </div>
        <div class="Result-Wrapper-E">
          <img src="../assets/img/PicRL.png" alt="" />
          <div class="Result-P">
            <p>
              RankingLoss评估逆序标签对的比例，即对于相关标记与无关标记对排序错误的比例。此指标表示了不相关标记的排名高于相关标记的情况，反映了分类器排序和实际排序之间的差距。对于一个理想的分类器而言，对样本的相关标记的置信度较高，而对无关标记的置信度较低
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="Title-Wrapper">
          <h1>Average Precision</h1>
        </div>
        <div class="Result-Wrapper-E">
          <img src="../assets/img/PicAP.png" alt="" />
          <div class="Result-P">
            <p>Average Precision计算了排序先于相关标记的相关标记的比例的平均值。在样本的类别排序序列中，排在相关标记之前的标记并不一定都是相关标记，理想的多标记分类器应尽可能保证排在相关标记之前的标记都是相关标记。平均准确率能够更全面地反映出多标记分类的准确率，尤其适用于标记种类较多的情况，此指标取值越大，性能越优。</p>
          </div>
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
  methods: {},
};
</script>

<style>
@import "../assets/styles/base.css";
</style>
