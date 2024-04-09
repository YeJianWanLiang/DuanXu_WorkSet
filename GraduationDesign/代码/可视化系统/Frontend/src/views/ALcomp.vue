<template>
  <div>
    <div class="Tab-Wrapper">
      <div class="copmTab">
        <el-tabs width="100%">
          <el-tab-pane label="非图像数据集">
            <div>
              <div class="Title-Wrapper">
                <h1>Emotions结果：</h1>
              </div>
              <div class="Result-Wrapper-E">
                <img src="../assets/img/emotions结果.png" alt="" />
              </div>
              <div class="Result-P-E">
                <p>
                  LSMLkNN在五项评价指标上都优于其他算法，对于此数据集，MLkNN类算法与类属特征算法的差距并不大，而本文算法在单错误率（One-Error）和覆盖率（Coverage）这两项指标上提升最为明显。
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图像数据集">
            <div>
              <div class="Title-Wrapper">
                <h1>Scene结果：</h1>
              </div>
              <div class="Result-Wrapper">
                <img src="../assets/img/scene结果.png" alt="" />
                <div class="Result-P">
                  <p>
                    本文算法的汉明损失（HammingLoss）和单错误率（One-Error）是最低的，为本组实验的最优值，比起类属特征算法有了一定幅度的提升。而对于排序损失（RankingLoss）、覆盖率（Coverage）和平均准确率（Average
                    Precision）这三项评价指标，本文的LSMLkNN算法虽不及最优值算法LIFT，但也是本组实验中最接近最优值的算法。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>Image结果：</h1>
              </div>
              <div class="Result-Wrapper">
                <img src="../assets/img/image结果.png" alt="" />
                <div class="Result-P">
                  <p>
                    在Image数据集上本文算法在选取五项的评价指标上明显优于其他对比算法，提升较大。缩减样本特征个数，验证了构建标记类属特征对多标记学习性能有很大的影响，不管是提升平均准确率（Average
                    Precision）还是降低汉明损失都是有显著的效果。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>Corel5k结果：</h1>
              </div>
              <div class="Result-Wrapper">
                <img src="../assets/img/5k结果.png" alt="" />
                <div class="Result-P">
                  <p>
                    本文算法在五项评价指标中均优于其他算法。LSMLkNN算法在提升平均准确率（Average
                    Precision）的效果比较明显
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>Corel16k结果：</h1>
              </div>
              <div class="Result-Wrapper">
                <img src="../assets/img/16k结果.png" alt="" />
                <div class="Result-P">
                  <p>
                    本文算法对于降低汉明损失（HammingLoss）、单错误率（One-Error）、排序损失（RankingLoss）、覆盖率（Coverage）这几项评价指标这一方向的性能提升中，在对于较小的数据集（Corel5k）的实验中可以发现实验效果明显。
                  </p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="基于不同k值的实验">
            <div>
              <div class="Title-Wrapper">
                <h1>HammingLoss结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-HL.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取得6之后，继续增大k值，实验结果中汉明损失（HammingLoss）在0.08附近波动，没有出现明显的下降。
                  </p>
                </div>
              </div>
            </div>
            <!-- <div>
              <div class="Title-Wrapper">
                <h1>Average Precision结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-AP.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取12之后，继续增大k值进行实验，实验结果表明平均准确率（Average
                    Precision）在0.88附近波动，增大k值对于提升平均准确率（Average
                    Precision）的影响并不明显，当k较低时模型有一定的欠拟合的情况，此时提升k值对提升平均准确率（Average
                    Precision）的影响较大。
                  </p>
                </div>
              </div>
            </div> -->


            <div>
              <div class="Title-Wrapper">
                <h1>One-Error结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-OE.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取8之后，继续增大k值进行实验，结果表明单错误率（One-Error）在0.2附近波动，k值在取得10到14时较为稳定，而且k值取14时单错误率（One-Error）仍在较低的范围内波动。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>RankingLoss结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-RL.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取得8之后，继续增大k值进行实验，实验结果中排序损失（RankingLoss）在0.07附近波动，没有出现明显下降，k取14时，基于其附近k值的实验所得到的排序损失（RankingLoss）波动不明显。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>Coverage结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-CR.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取8之后，继续增大k值进行实验，实验结果表明覆盖率（Coverage）在0.07附近波动，继续增大k值，没有出现明显性能下降。
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="Title-Wrapper">
                <h1>Average Precision结果：</h1>
              </div>
              <div class="K-Wrapper">
                <img src="../assets/img/k-AP.png" alt="" />
                <div class="KResult-P">
                  <p>
                    在k取12之后，继续增大k值进行实验，实验结果表明平均准确率（Average
                    Precision）在0.88附近波动，增大k值对于提升平均准确率（Average
                    Precision）的影响并不明显，当k较低时模型有一定的欠拟合的情况，此时提升k值对提升平均准确率（Average
                    Precision）的影响较大。
                  </p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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

.copmTab {
  width: 100%;
}

</style>
