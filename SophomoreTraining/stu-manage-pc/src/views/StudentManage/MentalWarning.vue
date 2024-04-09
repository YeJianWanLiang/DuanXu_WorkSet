<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">学生心理预警</span>
    </div>
    <div class="functionBar">
      <div class="Mental-button">
        <el-button type="primary" @click="reportDialogVisible = true"
          >上报</el-button
        >
      </div>

      <el-select
        class="Mental-selectYear"
        v-model="valueOfYear"
        placeholder="入学年份"
        clearable
        @clear="tablePrint()"
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
        class="Mental-selectClass"
        v-model="valueOfClass"
        placeholder="班级"
        clearable
        @clear="tablePrint()"
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
        class="Mental-inputID"
        v-model="inputID"
        placeholder="学号"
        clearable
        @clear="tablePrint()"
      ></el-input>
      <el-input
        class="Mental-inputName"
        v-model="inputName"
        placeholder="姓名"
        clearable
        @clear="tablePrint()"
      ></el-input>
      <el-select
        class="Mental-selectAffair"
        v-model="handleSituation"
        placeholder="处理情况"
        clearable
        @clear="tablePrint()"
      >
        <el-option
          v-for="item in optionsOfAffair"
          :key="item.handleSituation"
          :label="item.label"
          :value="item.handleSituation"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="searchInfo()">搜索</el-button>
    </div>
    <div class="dataTable">
      <el-table
        :data="calTableData"
        border
        style="width: 100%"
        ref="multipleTable"
      >
        <el-table-column prop="stuName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="stuId" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="schoolDate" label="入学年份" align="center">
        </el-table-column>
        <el-table-column prop="stuClass" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="behavior" label="表现行为" align="center">
        </el-table-column>
        <el-table-column prop="reportPerson" label="上报人" align="center">
        </el-table-column>
        <el-table-column prop="handler" label="处理人" align="center">
        </el-table-column>
        <el-table-column
          prop="handleSituation"
          label="处理情况"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          align="center"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="
                handletDialogVisible = true;

                editInFo(scope.row);
              "
              >处理</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="
                communicationRecordDialogVisible = true;
                communicationRecords(scope.row);
              "
              >交流记录</el-button
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

    <!-- 上报dialog -->
    <el-dialog
      title="上报学生心理异常预警"
      :visible.sync="reportDialogVisible"
      width="50%"
    >
      <span style="font-weight: 510; font-size: 125%; margin-bottom: 2%"
        >疑似心理异常学生信息</span
      >
      <el-form
        :model="reportForm"
        :rules="reportFormRules"
        ref="reportFormRef"
        label-width="100px"
        style="margin-top: 3%"
      >
        <el-form-item label="姓名" prop="stuName">
          <el-input
            v-model="reportForm.stuName"
            placeholder="请输入姓名"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="stuClass">
          <el-input
            v-model="reportForm.stuClass"
            placeholder="请输入班级"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="stuId">
          <el-input
            v-model="reportForm.stuId"
            placeholder="请输入学号"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="表现行为" prop="behavior">
          <el-input
            v-model="reportForm.behavior"
            placeholder="请输入表现行为"
            style="width: 40%"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="checkedAnonymous">是否匿名</el-checkbox>
      <el-form
        :model="reportPersonForm"
        :rules="reportPersonFormRules"
        ref="reportPersonFormRef"
        label-width="100px"
        v-show="checkedAnonymous == false"
        style="margin-top: 2%"
      >
        <el-form-item label="上报人姓名" prop="reportPerson">
          <el-input
            v-model="reportPersonForm.reportPerson"
            placeholder="请输入上报人姓名"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="handlerPhone">
          <el-input
            v-model="reportPersonForm.handlerPhone"
            placeholder="请输入上报人手机号"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            reportDialogVisible = false;
            putInfo();
          "
          >提 交</el-button
        >
        <el-button @click="reportDialogVisible = false;cancel();">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 处理dialog -->
    <el-dialog
      title="处理学生心理异常预警"
      :visible.sync="handletDialogVisible"
      width="50%"
    >
      <el-form :model="handleForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:" style="margin-left: 5%">
              <el-input
                v-model="handleForm.stuName"
                style="width: 60%"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学号：" style="margin-left: 5%">
              <!-- {{ handleForm.stuId }} -->
              <el-input
                v-model="handleForm.stuId"
                style="width: 60%"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级：" style="margin-left: 5%">
              <!-- {{ handleForm.stuClass }} -->
              <el-input
                v-model="handleForm.stuClass"
                style="width: 60%"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <span style="font-weight: 510; font-size: 125%; margin-bottom: 2%"
          >疑似心理异常行为：最近有异常行为</span
        >
        <el-row>
          <el-col :span="5">
            <el-form-item label="上报人:" style="margin-top: 10%">
              <!-- {{ handleForm.reportPerson }} -->
              <el-input
                v-model="handleForm.reportPerson"
                style="width: 60%"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="处理人:" style="margin-top: 10%">
              <!-- {{ handleForm.reportPerson }} -->
              <el-input
                v-model="handleForm.handler"
                style="width: 60%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="处理情况">
          <el-radio v-model="handleForm.handleSituation" label="待处理">待处理</el-radio>
          <el-radio v-model="handleForm.handleSituation" label="正在处理">正在处理</el-radio>
          <el-radio v-model="handleForm.handleSituation" label="处理完成">处理完成</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handletDialogVisible = false;storeInfo();"
          >保 存</el-button
        >
        <el-button @click="handletDialogVisible = false;tablePrint();">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 交流记录dialog -->
    <el-dialog
      title="交流记录"
      :visible.sync="communicationRecordDialogVisible"
      width="50%"
    >
      <el-form :model="communicationRecordForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学生姓名:">
              {{ communicationRecordForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学号：">
              {{ communicationRecordForm.stuId }}
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="班级：">
              {{ communicationRecordForm.stuClass }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="家长姓名:">
              {{ communicationRecordForm.nameOfParents }}
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="家长联系电话：">
              {{ communicationRecordForm.phoneOfParent }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="交流记录1：">
          <el-input
            type="textarea"
            v-model="communicationRecordForm.communicationRecord"
            style="width: 80%"
          >
          </el-input>
          <el-button
            type="text"
            icon="el-icon-delete"
            style="margin-left: 2%"
          ></el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">添加交流记录</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="communicationRecordDialogVisible = false"
          >保 存</el-button
        >
        <el-button @click="communicationRecordDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Mental",
  data() {
    return {
      communicationRecordDialogVisible: false,
      communicationRecordForm: {
        nameOfParents: "",
        phoneOfParent: "",
        communicationRecord: "",
      },
      handleSituation: "",
      handletDialogVisible: false,
      handleForm: {},
      checkedAnonymous: false,
      reportDialogVisible: false,
      reportForm: {
        stuName: "",
        stuId: "",
        stuClass: "",
      },
      reportFormRules: {
        stuName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        stuClass: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        stuId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        behavior: [
          {
            required: true,
            message: "请输入表现行为",
            trigger: "blur",
          },
        ],
      },
      reportPersonForm: {
        reportPerson: "",
        handlerPhone: "",
        handler: "",
      },
      reportPersonFormRules: {
        reportPerson: [
          {
            required: true,
            message: "请输入上报人姓名",
            trigger: "blur",
          },
        ],
        handlerPhone: [
          {
            required: true,
            message: "请输入上报人手机号",
            trigger: "blur",
          },
        ],
      },
      optionsOfYear: [
        {
          valueOfYear: "2021",
          label: "2021",
        },
        {
          valueOfYear: "2020",
          label: "2020",
        },
        {
          valueOfYear: "2019",
          label: "2019",
        },
      ],
      valueOfYear: "",
      optionsOfClass: [
        {
          valueOfClass: "19级软件工程1班",
          label: "19级软件工程1班",
        },
        {
          valueOfClass: "19级软件工程2班",
          label: "19级软件工程2班",
        },
        {
          valueOfClass: "19级软件工程3班",
          label: "19级软件工程3班",
        },
      ],
      valueOfClass: "",

      inputID: "",
      inputName: "",

      optionsOfAffair: [
        {
          handleSituation: "待处理",
          label: "待处理",
        },
        {
          handleSituation: "正在处理",
          label: "正在处理",
        },
        {
          handleSituation: "处理完成",
          label: "处理完成",
        },
      ],
      currentPage: 1,
      pagesize: 20,
      tableData: [],
      multipleSelection: [],
    };
  },
  computed: {
    calTableData: function () {
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
    // 处理dialog的保存按钮
    storeInfo() {
      let that = this;
      console.log(that.handleForm);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/psychological/handle",
        params: {
          handler: that.handleForm.handler,
          handleSituation: that.handleForm.handleSituation,
          stuId: that.handleForm.stuId,
        },
      })
        .then(() => {
          this.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 处理按钮 打开表单 信息传入表单
    editInFo(row) {
      // 这里row是dataTable对象
      let that = this;
      // console.log(row);
      that.handleForm = "";
      that.handleForm = row;
      //that.valueOfActType = that.editForm.activityType;
    },
    // 新增的保存按钮
    putInfo() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/psychological/up",
        data: {
          stuId: that.reportForm.stuId,
          behavior: that.reportForm.behavior,
          reportPerson: that.reportPersonForm.reportPerson,
          handlerPhone: that.reportPersonForm.handlerPhone,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.reportForm = {};
      that.reportPersonForm = {};
    },
    cancel(){
     this.reportForm={};
     this.reportPersonForm = {};
    },
    // 表格翻页
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 处理button row为该行的信息
    dealWarning(row) {
      console.log(row);
    },
    // 交流记录 同上
    communicationRecord(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //打印表格
    tablePrint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/psychological/list",
      })
        .then((response) => {
          //console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //搜索按钮
    searchInfo() {
      
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/psychological/search",
        params: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
          handleSituation: that.handleSituation
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
  },
};
</script>

<style>
.Mental-button {
  flex: 3;
}

.Mental-selectYear {
  flex: 1;
  margin-right: 2%;
  width: 200px;
}

.Mental-selectClass {
  flex: 1;
  width: 200px;
  margin-right: 2%;
}

.Mental-inputID {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}

.Mental-inputName {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}

.Mental-selectAffair {
  flex: 1;
  width: 200px;
  margin-right: 2%;
}
</style>
