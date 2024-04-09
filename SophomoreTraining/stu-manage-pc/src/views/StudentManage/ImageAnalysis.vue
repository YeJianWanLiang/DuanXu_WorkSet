<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">学生画像分析</span>
    </div>
    <div class="tabBar">
      <el-tabs v-model="activeName">
        <el-tab-pane label="表格" name="table">
          <div class="functionBarInTab">
            <div class="ImageAnalysis-buttonCotainer">
              <el-button type="primary">生成画像</el-button>
            </div>

            <div class="ImageAnalysis-selectCotainer">
              <el-select
                class="ImageAnalysis-SelectYear"
                v-model="valueOfYear"
                placeholder="入学年份"
                clearable
              >
                <el-option
                  v-for="item in optionsOfYear"
                  :key="item.valueOfYear"
                  :label="item.label"
                  :value="item.valueOfYear"
                >
                </el-option>
              </el-select>
              <el-select
                class="ImageAnalysis-SelectClass"
                v-model="valueOfClass"
                placeholder="班级"
                clearable
              >
                <el-option
                  v-for="item in optionsOfClass"
                  :key="item.valueOfClass"
                  :label="item.label"
                  :value="item.valueOfClass"
                >
                </el-option>
              </el-select>
              <el-input
                class="ImageAnalysis-InputID"
                v-model="inputID"
                placeholder="学号"
                clearable
              ></el-input>
              <el-input
                class="ImageAnalysis-InputName"
                v-model="inputName"
                placeholder="姓名"
                clearable
              ></el-input>
              <el-select
                class="ImageAnalysis-SelectMental"
                v-model="statusOfMental"
                placeholder="心理健康状况"
                clearable
              >
                <el-option
                  v-for="item in optionsOfMentalHtlh"
                  :key="item.statusOfMental"
                  :label="item.label"
                  :value="item.statusOfMental"
                >
                </el-option>
              </el-select>
              <el-button class="ImageAnalysis-SearchButton" type="primary" @click="search()"
                >搜索</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="calTableData" border style="width: 100%">
              <!--  -->
              <el-table-column prop="stuId" label="学号"> </el-table-column>
              <el-table-column prop="stuName" label="姓名"></el-table-column>
              <el-table-column prop="schoolDate" label="入学年份">
              </el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
              <el-table-column
                prop="character"
                label="性格类型"
              ></el-table-column>
              <el-table-column
                prop="stuHobby"
                label="兴趣爱好"
              ></el-table-column>
              <el-table-column prop="stuSpecial" label="特长"></el-table-column>
              <el-table-column
                prop="futureTrend"
                label="未来走向"
              ></el-table-column>
              <el-table-column prop="course" label="推荐选课"></el-table-column>
              <el-table-column
                prop="stuPsychology"
                label="心理健康状况"
              ></el-table-column>
              <!--  -->

              <el-table-column
                prop="updateTime"
                label="更新时间"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editDialogVisible = true;
                      edit(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="雷达" name="radar">
          <div class="functionBar">
            <div class="ImageAnalysis-selectCotainer">
              <div class="ImageAnalysis-radarselect">
                <el-select
                  v-model="valueOfFeatures"
                  placeholder="按特征查看"
                  class="ImageAnalysis-SelectFeatures"
                  clearable
                >
                  <el-option
                    v-for="item in optionsOfFeatures"
                    :key="item.valueOfFeatures"
                    :label="item.label"
                    :value="item.valueOfFeatures"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="valueOfGrade"
                  placeholder="按年级查看"
                  class="ImageAnalysis-SelectGrade"
                  clearable
                >
                  <el-option
                    v-for="item in optionsOfGrade"
                    :key="item.valueOfGrade"
                    :label="item.label"
                    :value="item.valueOfGrade"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px">
            <!-- 雷达图 -->
            <div
              id="myChart"
              :style="{ width: '600px', height: '400px' }"
            ></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑学生画像 dialog -->
    <el-dialog
      title="编辑学生画像"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form :model="imageForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学号：">
              {{ imageForm.stuId }}
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ imageForm.stuName }}
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="班级：">
              {{ imageForm.stuClass }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="性格类型" prop="character">
          <el-input v-model="imageForm.character" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="stuHobby">
          <el-input
            v-model="imageForm.stuHobby"
            style="width: 40%"
          ></el-input> </el-form-item
        ><el-form-item label="特长" prop="stuSpecial" style="margin-left:4%">
          <el-input
            v-model="imageForm.stuSpecial"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editDialogVisible = false;
            store();
          "
          >保 存</el-button
        >
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ImageAnalysis",
  data() {
    return {
      editDialogVisible: false,
      imageForm: {
        character: "",
        stuHobby: "",
        stuSpecial: "",
      },
      activeName: "table",
      optionsOfTerm: [
        {
          valueOfTerm: "选项1",
          label: "2020-2021第一学期",
        },
        {
          valueOfTerm: "选项2",
          label: "2020-2021第二学期",
        },
        {
          valueOfTerm: "选项3",
          label: "2019-2020第一学期",
        },
        {
          valueOfTerm: "选项4",
          label: "2019-2020第二学期",
        },
      ],
      valueOfTerm: "",
      optionsOfYear: [
        {
          valueOfYear: "2020",
          label: "2020",
        },
        {
          valueOfYear: "2021",
          label: "2021",
        },
      ],
      valueOfYear: "",
      optionsOfClass: [
        {
          valueOfClass: "19级软件工程1班",
          label: "19级软件工程1班",
        },
        {
          valueOfClass: "20计算机2班",
          label: "20计算机2班",
        },
      ],
      valueOfClass: "",
      optionsOfMentalHtlh: [
        {
          statusOfMental: "正常",
          label: "正常",
        },
        {
          statusOfMental: "异常",
          label: "异常",
        },
      ],
      statusOfMental: "",

      tableData: [],

      currentPage: 1,
      pagesize: 20,

      inputID: "",
      inputName: "",

      optionsOfGrade: [
        {
          valueOfGrade: "选项1",
          label: "按年级查看",
        },
        {
          valueOfGrade: "选项2",
          label: "按班级查看",
        },
      ],
      valueOfGrade: "",

      optionsOfFeatures: [
        {
          valueOfFeatures: "选项1",
          label: "兴趣爱好",
        },
        {
          valueOfFeatures: "选项2",
          label: "特长",
        },
        {
          valueOfFeatures: "选项3",
          label: "推荐选课",
        },
        {
          valueOfFeatures: "选项4",
          label: "未来走向",
        },
      ],
      valueOfFeatures: "",
    };
  },
  created() {
    this.tablePrint();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // 表格翻页
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    alignTable() {
      this.$refs.table.doLayout();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let dataMax = [
        { name: "普通性", max: "100", color: "rgba(89, 81, 81, 1)" },
        { name: "以自我为中心型", max: "100", color: "rgba(89, 81, 81, 1)" },
        { name: "榜样性", max: "100", color: "rgba(89, 81, 81, 1)" },
        { name: "保守型", max: "100", color: "rgba(89, 81, 81, 1)" },
      ];
      let option = {
        color: [
          "rgba(49, 218, 7, 1)",
          "rgba(61, 92, 203, 1)",
          "rgba(225, 145, 33, 1)",
        ],
        //配置维度的最大值
        tooltip: {},
        legend: {
          data: ["2020级", "2019级", "2018级"],
        },
        radar: {
          name: {
            show: true,
            color: "red",
          },
          //   雷达图的指示器，用来指定雷达图中的多个变量（维度）
          indicator: dataMax,
          shape: "circle", //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
        },
        series: [
          {
            type: "radar",
            label: {
              show: true, //显示数值
            },
            areaStyle: {}, //每个雷达图形成一个阴影的面积
            data: [
              {
                name: "2020级",
                value: [80, 90, 80, 82],
                lineStyle: {
                  color: "rgba(80, 81, 80, 1)",
                },
                areaStyle: {
                  color: "rgba(49, 218, 7, 1)",
                },
              },
              {
                name: "2019级",
                value: [70, 80, 88, 62],
                areaStyle: {
                  color: "rgba(61, 92, 203, 1)",
                },
                lineStyle: {
                  color: "rgba(80, 81, 80, 1)",
                },
              },
              {
                name: "2018级",
                value: [30, 60, 28, 32],
                areaStyle: {
                  color: "rgba(225, 145, 33, 1)",
                },
                lineStyle: {
                  color: "rgba(80, 81, 80, 1)",
                },
              },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option);
    },
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    tablePrint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/analysis/list",
      })
        .then((response) => {
          console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(row) {
      this.imageForm = row;
    },
    store() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/analysis/edit",
        params: {
          stuId: that.imageForm.stuId,
          character: that.imageForm.character,
          stuHobby: that.imageForm.stuHobby,
          stuSpecial: that.imageForm.stuSpecial,
          updateTime: updatetime,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/analysis/search",
        params: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
          stuPsychology: that.statusOfMental,
        },
      })
        .then((response) => {
          console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    calTableData: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
};
</script>

<style scoped>
.ImageAnalysis-buttonCotainer {
  flex: 3;
  display: inline-block;
}
.ImageAnalysis-selectCotainer {
  flex: 7;
  display: flex;
  justify-content: space-between;
}
.ImageAnalysis-SelectYear {
  width: 150px;
}
.ImageAnalysis-SelectClass {
  width: 150px;
}
.ImageAnalysis-InputID {
  width: 150px;
}
.ImageAnalysis-InputName {
  width: 150px;
}
.ImageAnalysis-SelectMental {
  width: 150px;
}
.ImageAnalysis-dataTab {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}
.ImageAnalysis-SelectFeatures {
  padding: 0 30px 0 0;
}
.ImageAnalysis-radarImage {
  margin: 15px 0 0 0;
  width: 500px;
  height: 500px;
  border: 2px solid; /*显示边界*/
}

.el-table__header,
.el-table__body,
.el-table__footer {
  table-layout: auto;
}
</style>
