<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">学生近况与关怀</span>
    </div>
    <div class="tabBar">
      <el-tabs v-model="activeName">
        <el-tab-pane label="学生近况" name="studentRecent">
          <div class="functionBarInTab">
            <el-button type="success">批量发送学生近况</el-button>
            <el-button type="primary">批量生成学生近况</el-button>
            <el-select
              v-model="enrolYear"
              placeholder="入学年份"
              class="RecentCare-SelectYear"
              clearable            >
              <el-option
                v-for="item in optionsOfYear"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="studentClass"
              placeholder="班级"
              class="RecentCare-SelectClass"
              clearable
            >
              <el-option
                v-for="item in optionsOfClass"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="inputID"
              placeholder="学号"
              class="RecentCare-InputID"
              clearable
            ></el-input>
            <el-input
              v-model="inputName"
              placeholder="姓名"
              class="RecentCare-InputName"
              clearable
            ></el-input>
            <el-button type="primary" @click="recentSearch()">搜索</el-button>
          </div>
          <div class="dataTable">
            <el-table
              :data="calRecentTableData"
              border
              style="width: 100%"
              ref="multipleTable"
            >
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column prop="stuName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column
                prop="schoolDate"
                label="入学年份"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="stuClass" label="班级" align="center">
              </el-table-column>
              <el-table-column
                prop="recentSituationOfStudent"
                label="学生近况"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="recentSituationUpdateTime"
                label="更新时间"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="handleRecent(scope.row)"
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
              :total="tableRecentData.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学生关怀" name="studentCare">
          <div class="functionBarInTab">
            <el-button type="success">批量发送学生关怀</el-button>
            <el-button type="primary">批量生成学生关怀</el-button>
            <el-select
              v-model="enrolYear"
              placeholder="入学年份"
              class="RecentCare-SelectYear"
              clearable
            >
              <el-option
                v-for="item in optionsOfYear"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="studentClass"
              placeholder="班级"
              class="RecentCare-SelectClass"
              clearable
            >
              <el-option
                v-for="item in optionsOfClass"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="inputID"
              placeholder="学号"
              class="RecentCare-InputID"
              clearable
            ></el-input>
            <el-input
              v-model="inputName"
              placeholder="姓名"
              class="RecentCare-InputName"
              clearable
            ></el-input>
            <el-button type="primary" @click="careSearch()">搜索</el-button>
          </div>
          <div class="dataTable">
            <el-table
              :data="calCareTableData"
              border
              style="width: 100%"
              ref="multipleTable"
            >
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column prop="stuName" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column
                prop="schoolDate"
                label="入学年份"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="stuClass" label="班级" align="center">
              </el-table-column>
              <el-table-column
                prop="studentCare"
                label="学生关怀"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="careUpdateTime"
                label="更新时间"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="handleCare(scope.row)"
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
              :total="tableCareData.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- :before-close="handleClose"  回调函数 -->
    <el-dialog
      title="编辑学生近况"
      :visible.sync="recentDialogVisible"
      width="40%"
    >
      <el-form :model="recentForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ recentForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ recentForm.stuId }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级：">
              {{ recentForm.stuClass }}
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="学生关怀">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="recentForm.recentSituationOfStudent"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="recentStore()">提 交</el-button>
        <el-button @click="recentDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑学生关怀"
      :visible.sync="careDialogVisible"
      width="40%"
    >
      <el-form :model="careForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ careForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ careForm.stuId }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级：">
              {{ careForm.stuClass }}
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="学生关怀">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="careForm.studentCare"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="careStore()">提 交</el-button>
        <el-button @click="careDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RecentCare",
  data() {
    return {
      activeName: "studentRecent",
      inputID: "",
      inputName: "",
      enrolYear: "",
      studentClass: "",
      optionsOfYear: [
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2019",
          label: "2019",
        },
      ],
      optionsOfClass: [
        {
          value: "2019级软件工程1班",
          label: "2019级软件工程1班",
        },
        {
          value: "2019级软件工程2班",
          label: "2019级软件工程2班",
        },
        {
          value: "2019级软件工程3班",
          label: "2019级软件工程3班",
        },
      ],
      currentPage: 1,
      pagesize: 20,
      tableRecentData: [],
      tableCareData: [],
      recentDialogVisible: false,
      careDialogVisible: false,
      recentForm: {},
      careForm: {},
    };
  },
  created() {
    this.tablePrint();
  },
  mounted() {},
  computed: {
    calRecentTableData: function() {
      return this.tableRecentData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    calCareTableData: function() {
      return this.tableCareData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleRecent(row) {
      this.recentDialogVisible = true;
      this.recentForm = row;
    },
    handleCare(row) {
      this.careDialogVisible = true;
      this.careForm = row;
    },
    recentStore() {
      let that = this;
      that.recentDialogVisible = false;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      console.log(that.recentForm);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/care/edit",
        data: {
          stuId: that.recentForm.stuId,
          recentSituationOfStudent: that.recentForm.recentSituationOfStudent,
          recentSituationUpdateTime: updatetime,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    careStore() {
      let that = this;
      that.careDialogVisible = false;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/care/edit",
        data: {
          stuId: that.careForm.stuId,
          studentCare: that.careForm.studentCare,
          careUpdateTime: updatetime,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    recentSearch() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/care/search",
        params: {
          stuName: that.inputName,
          stuId: that.inputID,
          schoolDate: that.enrolYear,
          stuClass: that.studentClass,
        },
      })
        .then((response) => {
          console.log(response);
          that.tableRecentData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    careSeaarch() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/care/search",
        params: {stuName: that.inputName,
          stuId: that.inputID,
          schoolDate: that.enrolYear,
          stuClass: that.studentClass,},
      })
        .then((response) => {
          that.tableCareData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 表格渲染
    tablePrint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/care/list",
      })
        .then((response) => {
          console.log(response);
          that.tableRecentData = response.data;
          that.tableCareData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.RecentCare-selectCotainer {
  display: flex;
}

.RecentCare-SelectYear {
  width: 150px;
}

.RecentCare-SelectClass {
  width: 150px;
}

.RecentCare-SelectCommittee {
  width: 170px;
}

.RecentCare-SelectAbled {
  width: 130px;
}

.RecentCare-InputID {
  width: 110px;
}

.RecentCare-InputName {
  width: 110px;
}
</style>
