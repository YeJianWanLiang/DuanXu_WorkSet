<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">上课签到统计</span>
    </div>

    <div class="functionBar">
      <el-button type="primary" @click="handleAdd()">新增</el-button>
      <el-button plain @click="pushDialogVisible = true">推送设置</el-button>

      <el-select
        v-model="valueOfYear"
        placeholder="入学年份"
        class="SignIn-selectYear"
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
        v-model="valueOfClass"
        placeholder="班级"
        class="SignIn-selectClass"
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
      <el-button type="primary" @click="searchInFo()">搜索</el-button>
    </div>

    <div class="dataTable">
      <el-table :data="calTableData" border width="100%">
        <el-table-column prop="className" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="classDate" label="入学年份" align="center">
        </el-table-column>
        <el-table-column prop="className" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="teacherName" label="任课老师" align="center">
        </el-table-column>
        <el-table-column prop="courseTime" label="上课时间" align="center">
        </el-table-column>
        <el-table-column prop="studentNum" label="班级人数" align="center">
        </el-table-column>
        <el-table-column prop="attendanceNum" label="出勤" align="center">
        </el-table-column>
        <el-table-column prop="absenteeismNum" label="缺勤" align="center">
        </el-table-column>
        <el-table-column prop="thingLeaveNum" label="事假" align="center">
        </el-table-column>
        <el-table-column prop="sickLeaveNum" label="病假" align="center">
        </el-table-column>
        <el-table-column prop="lateNum" label="迟到" align="center">
        </el-table-column>
        <el-table-column prop="earlyLeaveNum" label="早退" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog
      title="新增签到"
      :visible.sync="newDialogVisible"
      :before-close="handleClose()"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="班级" prop="className">
          <el-select
            v-model="addForm.className"
            placeholder="请选择"
            @change="selectClass()"
          >
            <el-option
              v-for="item in optionsOfClass"
              :key="item.valueOfClass"
              :label="item.label"
              :value="item.valueOfClass"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" required>
          <el-col :span="11">
            <el-form-item prop="courseTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="addForm.classTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-select v-model="addForm.courseName" placeholder="选择课程名称">
            <el-option
              v-for="item in optionsOfcurriculum"
              :key="item.valueOfClassName"
              :label="item.label"
              :value="item.valueOfClassName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课老师" prop="teacherName">
          <el-input
            placeholder="任课老师"
            v-model="addForm.teacherName"
            style="width: 20%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="签到情况" prop="signInSituation">
          <div class="signInTable">
            <el-table :data="SignInTableData" border style="width: 100%">
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column prop="stuName" label="姓名" align="center">
              </el-table-column>
              <el-table-column label="签到情况" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.signIN" placeholder="请选择">
                    <el-option
                      v-for="item in optionsOfSignIn"
                      :key="item.valueOfSignIn"
                      :label="item.label"
                      :value="item.valueOfSignIn"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            newDialogVisible = false;
            handlePut();
          "
          >保 存</el-button
        >
        <el-button @click="newDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑签到"
      :visible.sync="editDialogVisible"
      :before-close="handleClose()"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="班级" prop="className">
          <el-select v-model="editForm.className" placeholder="请选择">
            <el-option
              v-for="item in optionsOfClass"
              :key="item.valueOfClass"
              :label="item.label"
              :value="item.valueOfClass"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间" required>
          <el-col :span="11">
            <el-form-item prop="courseTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="editForm.courseTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-select v-model="editForm.courseName" placeholder="选择课程名称">
            <el-option
              v-for="item in optionsOfcurriculum"
              :key="item.valueOfClassName"
              :label="item.label"
              :value="item.valueOfClassName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课老师" prop="teacherName">
          <el-input
            placeholder="任课老师"
            v-model="editForm.teacherName"
            style="width: 20%"
            :disabled="true"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="签到情况" prop="signInSituation">
          <div class="signInTable">
            <el-table :data="SignInTableData" border style="width: 100%">
              <el-table-column prop="stdSchoolID" label="学号" align="center">
              </el-table-column>
              <el-table-column prop="stdName" label="姓名" align="center">
              </el-table-column>
              <el-table-column
                prop="sighInSituation"
                label="签到情况"
                align="center"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.valueOfSignIn"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in optionsOfSignIn"
                      :key="item.valueOfSignIn"
                      :label="item.label"
                      :value="item.valueOfSignIn"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editDialogVisible = false;
            handleStore();
          "
          >保 存</el-button
        >
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 推送设置 -->
    <el-dialog
      title="推送设置"
      :visible.sync="pushDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="班级出勤率推送" name="first">
          <span style="margin-left:4.5%"
            >是否推送
            <el-switch
              v-model="isPushProbability"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
              style="margin-left:2%"
            >
            </el-switch>
          </span>
          <el-form
            :model="pushProbabilityForm"
            rules="pushProbabilityFormRules"
            ref="pushProbabilityFormRef"
            label-width="100px"
            v-show="isPushProbability == true"
            style="margin-top:2%"
          >
            <el-form-item>
              当出勤率小于等于
              <el-input
                v-model="inputProbability"
                style="width:80px;margin:1%"
              ></el-input
              >%
            </el-form-item>
            <el-form-item>
              通知
              <el-checkbox v-model="checkedClassTeacher" style="margin-left:5%"
                >班主任</el-checkbox
              >
              <el-checkbox v-model="checkedTeacherName">任课老师</el-checkbox>
            </el-form-item>
            <el-form-item prop="noticeContent">
              通知内容
              <el-input
                v-model="pushProbabilityForm.noticeContent"
                style="width: 40%；margin-left:3%"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="学生出勤次数推送" name="second">
          <span style="margin-left:4.5%"
            >是否推送
            <el-switch
              v-model="isPushNumber"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
              style="margin-left:2%"
            >
            </el-switch>
          </span>
          <el-form
            :model="pushNumberForm"
            rules="pushNumberFormRules"
            ref="pushNumberFormRef"
            label-width="100px"
            v-show="isPushNumber == true"
            style="margin-top:2%"
          >
            <el-form-item>
              一个学生连续<el-input
                v-model="inputNumber"
                style="width:80px;margin:1%"
              ></el-input
              >次未出勤
            </el-form-item>
            <el-form-item>
              通知
              <el-checkbox v-model="checkedClassTeacher" style="margin-left:5%"
                >班主任</el-checkbox
              >
              <el-checkbox v-model="checkedTeacherName">任课老师</el-checkbox>
            </el-form-item>
            <el-form-item prop="noticeContent">
              通知内容
              <el-input
                v-model="pushNumberForm.noticeContent"
                style="width: 40%；margin-left:3%"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushDialogVisible = false"
          >保 存</el-button
        >
        <el-button @click="pushDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      pushNumberForm: {
        noticeContent: "",
      },
      pushProbabilityForm: {
        noticeContent: "",
      },
      checkedClassTeacher: true,
      checkedTeacherName: false,
      activeName: "first",
      isPushProbability: false,
      isPushNumber: false,
      pushDialogVisible: false,
      optionsOfSignIn: [
        {
          valueOfSignIn: "出勤",
          label: "出勤",
        },
        {
          valueOfSignIn: "缺勤",
          label: "缺勤",
        },
        {
          valueOfSignIn: "事假",
          label: "事假",
        },
        {
          valueOfSignIn: "病假",
          label: "病假",
        },
        {
          valueOfSignIn: "迟到",
          label: "迟到",
        },
        {
          valueOfSignIn: "早退",
          label: "早退",
        },
      ],
      valueOfSignIn: "",
      SignInTableData: [],
      newDialogVisible: false,
      editDialogVisible: false,
      addForm: {},
      addFormRules: {
        class: [
          {
            required: true,
            message: "请选择班级",
            trigger: "blur",
          },
        ],
        classTime: [
          {
            type: "date",
            required: true,
            message: "请选择上课时间",
            trigger: "blur",
          },
        ],
        className: [
          {
            required: true,
            message: "请选择课程名称",
            trigger: "blur",
          },
        ],
      },
      editForm: {},
      editFormRules: {},
      optionsOfYear: [
        {
          valueOfYear: "2021",
          label: "2021",
        },
        {
          valueOfYear: "2020",
          label: "2020",
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
      currentPage: 1,
      pagesize: 5,
      tableData: [],
      inputNumber: "",
      inputProbability: "",
      inputOfTeacher: "",
      optionsOfcurriculum: [
        {
          valueOfClassName: "高数",
          label: "高数",
        },
        {
          valueOfClassName: "离散",
          label: "离散",
        },
      ],
      valueOfClassName: "",
    };
  },
  created() {
    this.tablePrint();
  },
  mounted() {},
  methods: {
    selectClass() {
      let that = this;
      that.SignInTableData = [];
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_attendance/list/liststudent",
        data: {
          className: that.addForm.className,
        },
      })
        .then((response) => {
          let i = 0;
          while (response.data[i]) {
            that.SignInTableData.push(JSON.parse(response.data[i++]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeNew() {},
    handleClose() {
      // this.$confirm('确认关闭？')
      //     .then(() => {
      //       this.newDialogVisible = false;
      //       this.editDialogVisible = false;
      //     })
      //     .catch((e)=> {
      //       console.log(e);
      //     });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleAdd() {
      this.newDialogVisible = true;
      this.addForm = {};
      this.SignInTableData = [];
    },
    handlePut() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      let index = that.tableData.length + 1;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_attendance/new/newAtForm",
        data: {
          attendanceFormNo: index,
          className: that.addForm.className,
          courseTime: that.addForm.courseTime,
          courseName: that.addForm.courseName,
          teacherName: that.addForm.teacherName,
          attendanceFrom: that.SignInTableData,
          updateTime: updatetime,
        },
      })
        .then((response) => {
          console.log(response);
          // that.tableData = response.data;
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 搜索
    searchInFo() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_attendance/list",
        params: {
          classDate: that.valueOfYear,
          className: that.valueOfClass,
        },
      })
        .then((response) => {
          that.tableData = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 编辑按钮
    handleEdit(row) {
      this.editDialogVisible = true;
      this.editForm = row;
      console.log(this.editForm);
    },
    // 保存编辑 时间有问题
    handleStore() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      // let CourseTime = that.moment(that.editForm.courseTime).format("YYYY-MM-DD HH:mm:ss");
      // console.log(CourseTime);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_attendance/update",
        data: {
          attendanceFormNo: that.editForm.attendanceFormNo,
          className: that.editForm.className,
          courseName: that.editForm.courseName,
          teacherName: that.editForm.teacherName,
          // courseTime:that.editForm.courseTime,
          // attendanceFrom: that.addForm.attendanceFrom,
          updateTime: updatetime,
        },
      })
        .then((response) => {
          console.log(response);
          // that.tableData = response.data;
          that.tablePrint();
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
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    tablePrint() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_attendance/list",
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

<style>
.SignIn-functionBar {
  box-sizing: border-box;
  padding: 15px 0 0 0;
  display: flex;
}

.SignIn-selectYear {
  width: 150px;
  margin-left: 60%;
}

.SignIn-selectClass {
  width: 150px;
  margin-left: auto;
}

.SignIn-dataTable {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}

.SignIn-tableTag {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}
</style>
