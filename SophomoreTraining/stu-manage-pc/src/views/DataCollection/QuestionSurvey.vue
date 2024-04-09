<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">小问卷调查</span>
    </div>
    <div class="functionBar">
      <el-button type="primary" @click="addDialogVisible = true"
        >新增</el-button
      >

      <div class="QuestionSurvey-selectCotainer">
        <el-input
          v-model="inputTitle"
          placeholder="问卷标题"
          class="QuestionSurvey-inputTitle"
          clearable
          @clear="tablePrint()"
        ></el-input>
        <el-select
          class="QuestionSurvey-selectType"
          v-model="valueOfType"
          placeholder="类型"
          clearable
          @clear="tablePrint()"
        >
          <el-option
            v-for="item in optionsOfType"
            :key="item.valueOfType"
            :label="item.label"
            :value="item.valueOfType"
          >
          </el-option> </el-select
        ><el-select
          class="QuestionSurvey-selectPlaceholder"
          v-model="valueOfObject"
          placeholder="发送对象"
          clearable
          @clear="tablePrint()"
        >
          <el-option
            v-for="item in optionsOfObject"
            :key="item.valueOfObject"
            :label="item.label"
            :value="item.valueOfObject"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="searchInfo()">搜索</el-button>
      </div>
    </div>
    <div class="dataTable">
      <el-table :data="calTableData" border style="width: 100%">
        <el-table-column prop="questionTitle" label="问卷标题" align="center">
        </el-table-column>
        <el-table-column prop="questionType" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="sendObject" label="发送对象" align="center">
        </el-table-column>
        <el-table-column prop="submQuantity" label="提交数量" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
        <el-table-column
          prop="isPublish"
          label="是否发布"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isPublish"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
              :active-value="1"
              :inactive-value="0"
              @change="isUse(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
          width="320px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="
                basicDialogVisible = true;
                editInFo(scope.row);
              "
              >编辑</el-button
            >
            <el-button type="primary" @click="statisticsDialogVisible = true"
              >问卷统计</el-button
            >
            <el-select
              v-model="scope.row.valueOfMore"
              placeholder="更多"
              class="QuestionSurvey-selectMore"
            >
              <el-option
                v-for="item in optionsOfMore"
                :key="item.valueOfMore"
                :label="item.label"
                :value="item.valueOfMore"
              >
              </el-option>
            </el-select>
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

    <!-- 编辑 -->
    <!-- :before-close="handleClose"  回调函数 -->
    <el-dialog title="编辑问卷" :visible.sync="basicDialogVisible" width="50%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            :model="basicInformationForm"
            :rules="basicInformationFormRules"
            ref="basicInformationFormRef"
            label-width="100px"
          >
            <el-form-item label="问卷名称" prop="questionTitle">
              <el-input
                v-model="basicInformationForm.questionTitle"
                placeholder="请输入问卷名称"
                style="width: 60%"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="questionType">
              <el-select
                v-model="basicInformationForm.questionType"
                placeholder="选择"
              >
                <el-option label="家长问卷" value="家长问卷"></el-option>
                <el-option label="学生问卷" value="学生问卷"></el-option>
                <el-option label="企业问卷" value="企业问卷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发送对象" prop="sendObject">
              <el-select
                v-model="basicInformationForm.sendObject"
                placeholder="选择"
              >
                <el-option label="家长" value="家长"></el-option>
                <el-option label="学生" value="学生"></el-option>
                <el-option label="企业" value="企业"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="说明" prop="questionExplainz">
              <el-input
                type="textarea"
                v-model="basicInformationForm.questionExplainz"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  basicDialogVisible = false;
                  storeInfo();
                "
                >保存并下一步</el-button
              >
              <el-button
                type="primary"
                @click="
                  basicDialogVisible = false;
                  storeInfo();
                "
                >保存并退出</el-button
              >
              <el-button @click="basicDialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="题目" name="second">
          <el-card class="singleChoice-card">
            <div slot="header" class="clearfix">
              <span>1 单选题</span>
              <el-checkbox
                v-model="checked"
                style="float: right; padding: 3px 0"
                >必填</el-checkbox
              >
            </div>
            <div class="text item">
              <el-button type="text" icon="el-icon-plus">添加选项</el-button>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog title="新增问卷" :visible.sync="addDialogVisible" width="50%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            :model="addInformationForm"
            :rules="addInformationFormRules"
            ref="addInformationFormRef"
            label-width="100px"
          >
            <el-form-item label="问卷名称" prop="questionTitle">
              <el-input
                v-model="addInformationForm.questionTitle"
                placeholder="请输入问卷名称"
                style="width: 60%"
              ></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="questionType">
              <el-select
                v-model="addInformationForm.questionType"
                placeholder="选择"
              >
                <el-option label="家长问卷" value="家长问卷"></el-option>
                <el-option label="学生问卷" value="学生问卷"></el-option>
                <el-option label="企业问卷" value="企业问卷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发送对象" prop="sendObject">
              <el-select
                v-model="addInformationForm.sendObject"
                placeholder="选择"
              >
                <el-option label="家长" value="家长"></el-option>
                <el-option label="学生" value="学生"></el-option>
                <el-option label="企业" value="企业"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="说明" prop="questionExplainz">
              <el-input
                type="textarea"
                v-model="addInformationForm.questionExplainz"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  addDialogVisible = false;
                  putInfo();
                "
                >保存并下一步</el-button
              >
              <el-button
                type="primary"
                @click="
                  addDialogVisible = false;
                  putInfo();
                "
                >保存并退出</el-button
              >
              <el-button @click="addDialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="题目" name="second">
          <el-card class="singleChoice-card">
            <div slot="header" class="clearfix">
              <span>1 单选题</span>
              <el-checkbox
                v-model="checked"
                style="float: right; padding: 3px 0"
                >必填</el-checkbox
              >
            </div>
            <div class="text item">
              <el-button type="text" icon="el-icon-plus">添加选项</el-button>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 问卷统计 -->
    <el-dialog
      title="问卷统计"
      :visible.sync="statisticsDialogVisible"
      width="50%"
    >
      <span>数据概况</span>
      <el-table
        :data="generalData"
        style="width: 100%"
        class="generalDataTable"
      >
        <el-table-column
          prop="newlyIncreased"
          label="今日新增"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalSubmittals"
          label="总提交人数"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="averageAnswerTime"
          label="平均答题时长"
          align="center"
        >
        </el-table-column>
      </el-table>
      <span>数据统计</span>
      <div style="margin: 2% 2%">
        <span>1 单选题题目</span>
        <el-table
          :data="statisticalData"
          :span-method="choiceQuestionArraySpanMethod"
          border
          style="width: 100%"
        >
          <el-table-column prop="option" label="选项" width="180">
          </el-table-column>
          <el-table-column prop="answerSituation" label="回答情况">
          </el-table-column>
        </el-table>
        <span>2 多选题题目</span>
        <el-table
          :data="statisticalData"
          :span-method="choiceQuestionArraySpanMethod"
          border
          style="width: 100%"
        >
          <el-table-column prop="option" label="选项" width="180">
          </el-table-column>
          <el-table-column prop="answerSituation" label="回答情况">
          </el-table-column>
        </el-table>
        <span>3 填空题题目</span>
        <el-table
          :data="FillBlanksData"
          :span-method="completionArraySpanMethod"
          border
          style="width: 100%"
        >
          <el-table-column prop="answerNo" label="答题序号" width="180">
          </el-table-column>
          <el-table-column prop="answerDetails" label="回答详情">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionSurvey",
  data() {
    return {
      FillBlanksData: [
        {
          answerNo: "1",
          answerDetails: "回答1",
        },
        {
          answerNo: "2",
          answerDetails: "回答2",
        },
        {
          answerNo: "回答人数",
          answerDetails: "回答人数",
        },
      ],
      statisticalData: [
        {
          option: "选项1",
          answerSituation: "50%",
        },
        {
          option: "选项2",
          answerSituation: "50%",
        },
        {
          option: "选项3",
          answerSituation: "0%",
        },
        {
          option: "合计：",
          answerSituation: "合计：",
        },
      ],
      generalData: [
        {
          newlyIncreased: "1",
          totalSubmittals: "2",
          averageAnswerTime: "1分2秒",
        },
      ],

      statisticsDialogVisible: false,
      checked: true,
      activeName: "first",
      addDialogVisible: false,
      addInformationForm: {
        questionTitle: "",
        questionType: "",
        sendObject: "",
        questionExplainz: "",
        submQuantity: "",
      },

      addInformationFormRules: {
        questionTitle: [
          {
            required: true,
            message: "请输入问卷名称",
            trigger: "blur",
          },
        ],
        questionType: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
        sendObject: [
          {
            required: true,
            message: "请选择发送对象",
            trigger: "change",
          },
        ],
      },
      basicDialogVisible: false,
      basicInformationForm: {
        questionTitle: "",
        questionType: "",
        sendObject: "",
        questionExplainz: "",
      },
      basicInformationFormRules: {
        questionTitle: [
          {
            required: true,
            message: "请输入问卷名称",
            trigger: "blur",
          },
        ],
        questionType: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
        sendObject: [
          {
            required: true,
            message: "请选择发送对象",
            trigger: "change",
          },
        ],
      },

      optionsOfMore: [
        {
          valueOfMore: "选项1",
          label: "浏览",
        },
        {
          valueOfMore: "选项2",
          label: "复制链接",
        },
        {
          valueOfMore: "选项3",
          label: "发送问卷",
        },
        {
          valueOfMore: "选项4",
          label: "导出问卷",
        },
        {
          valueOfMore: "选项5",
          label: "删除",
        },
      ],
      valueOfMore: "",
      inputTitle: "",
      optionsOfType: [
        {
          valueOfType: "家长问卷",
          label: "家长问卷",
        },
        {
          valueOfType: "学生问卷",
          label: "学生问卷",
        },
        {
          valueOfType: "企业问卷",
          label: "企业问卷",
        },
      ],
      valueOfType: "",
      optionsOfObject: [
        {
          valueOfObject: "家长",
          label: "家长",
        },
        {
          valueOfObject: "学生",
          label: "学生",
        },
        {
          valueOfObject: "企业",
          label: "企业",
        },
      ],
      valueOfObject: "",
      currentPage: 1,
      pagesize: 20,
      tableData: [],
    };
  },
  computed: {
    calTableData: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  created() {
    this.tablePrint();
  },
  mounted() {},
  methods: {
    //新增 保存
    putInfo() {
      let that = this;
      var Time = new Date();
      var updateTime = Time.toLocaleString();
      console.log(updateTime);
      let index = that.tableData.length + 1; // 确定新增的一行信息的索引
      // todo push新增的信息进tableData
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/question/add",
        data: {
          questionNo: index,
          questionTitle: that.addInformationForm.questionTitle,
          questionType: that.addInformationForm.questionType,
          sendObject: that.addInformationForm.sendObject,
          questionExplainz: that.addInformationForm.questionExplainz,
          updateTime: updateTime,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addInformationForm = {};
    },
    // 储存修改信息
    storeInfo() {
      let that = this;
      var Time = new Date();
      var updateTime = Time.toLocaleString();
      console.log(updateTime);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/question/edit",
        params: {
          questionNo: that.basicInformationForm.questionNo,
          questionTitle: that.basicInformationForm.questionTitle,
          questionType: that.basicInformationForm.questionType,
          sendObject: that.basicInformationForm.sendObject,
          questionExplainz: that.basicInformationForm.questionExplainz,
          updateTime: updateTime,
        },
      })
        .then(() => {
          this.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 表格翻页
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    choiceQuestionArraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === this.statisticalData.length - 1) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },

    completionArraySpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === this.FillBlanksData.length - 1) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 表格中的是否启用 switch按钮
    // isUse(row)

    isUse(row) {
      console.log(row);
      // console.log(that.editForm.activityType);
      var Time = new Date();
      var updateTime = Time.toLocaleString();
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/question/publish",
        params: {
          questionNo: row.questionNo,
          isPublish: row.isPublish,
          updateTime: updateTime,
        },
      })
        .then(() => {
          this.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    tablePrint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/question/list",
      })
        .then((response) => {
          //console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchInfo() {
      let that = this;
      // console.log(that.inputTitle);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/question/search",
        params: {
          questionTitle: that.inputTitle,
          questionType: that.valueOfType,
          sendObject: that.valueOfObject,
        },
      })
        .then((response) => {
          // console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 编辑按钮 打开表单 信息传入表单
    editInFo(row) {
      // 这里row是dataTable对象
      let that = this;
      // console.log(row);
      that.basicInformationForm = "";
      that.basicInformationForm = row;
      //that.valueOfActType = that.editForm.activityType;
    },
  },
};
</script>

<style>
.QuestionSurvey-selectCotainer {
  flex: 7;
  display: flex;
  justify-content: flex-end;
}
.QuestionSurvey-inputTitle {
  margin-right: 2%;
  width: 150px;
}
.QuestionSurvey-selectPlaceholder {
  margin-right: 2%;
  width: 150px;
}
.QuestionSurvey-selectType {
  margin-right: 2%;
  width: 150px;
}
.QuestionSurvey-selectMore {
  margin-right: 2%;
  width: 110px;
}
</style>
