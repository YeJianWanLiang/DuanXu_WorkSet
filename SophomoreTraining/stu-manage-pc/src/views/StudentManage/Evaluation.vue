<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">学生评价</span>
    </div>
    <div class="functionBar">
      <el-button type="primary"
        >批量生成学生评价
        <i class="el-icon-edit"></i>
      </el-button>

      <el-select
        class="Evaluation-selectYear"
        v-model="valueOfYear"
        placeholder="入学年份"
        style="width: 10%"
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
        class="Evaluation-selectClass"
        v-model="valueOfClass"
        placeholder="班级"
        style="width: 10%"
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
        class="Evaluation-inputID"
        v-model="inputID"
        placeholder="学号"
        style="width: 10%"
        clearable
      ></el-input>

      <el-input
        class="Evaluation-inputName"
        v-model="inputName"
        placeholder="姓名"
        style="width: 10%"
        clearable
      ></el-input>

      <el-button type="primary" @click="searchInFo()">搜索</el-button>
    </div>

    <!-- 编辑页面 -->
    <!-- :before-close="handleClose"  回调函数 -->
    <el-dialog title="编辑学生评价" :visible.sync="dialogVisible" width="40%">
      <el-form :model="editForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ editForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ editForm.stuId }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="班级：">
              {{ editForm.stuClass }}
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="学生评价：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                v-model="editForm.evaluate"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update()">保存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <div class="dataTable">
      <el-table
        :data="calEvaluateList"
        border
        style="width: 100%"
        ref="multipleTable"
      >
        <!--  -->
        <el-table-column prop="stuName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="stuId" label="学号" align="center">
        </el-table-column>
        <el-table-column prop="schoolDate" label="入学年份" align="center">
        </el-table-column>
        <el-table-column prop="stuClass" label="班级" align="center">
        </el-table-column>
        <el-table-column prop="evaluate" label="评价" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
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
        :total="evaluateList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  data() {
    return {
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
          valueOfClass: "班级1",
          label: "班级1",
        },
        {
          valueOfClass: "班级2",
          label: "班级2",
        },
        {
          valueOfClass: "班级3",
          label: "班级3",
        },
      ],
      valueOfClass: "",

      inputID: "",
      inputName: "",

      evaluateList: [],
      multipleSelection: [],
      dialogVisible: false,
      editForm: {
        // stdname: "xxx",
        // stdSchoolID: "xxx",
        // stdClass: "xxx",
      },
      currentPage: 1,
      pagesize: 20,
    };
  },
  computed: {
    calEvaluateList: function() {
      return this.evaluateList.slice(
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
    // 表格翻页
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    edit(row) {
      this.dialogVisible = true;
      this.editForm = row;
      console.log(this.editForm);

    },
    //提交编辑内容
    update() {
      let that = this;
      that.dialogVisible = false;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/evaluation/edit",
        data: {
          stuId: that.editForm.stuId,
          evaluate: that.editForm.evaluate,
          updateTime: updatetime,
        },
      })
        .then((response) => {
          console.log(response);
          that.evaluateList = response.data;
          // console.log(that.evaluateList);
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
        url: "http://zh.zhihao.kooboo.site/evaluation/list",
      })
        .then((response) => {
          console.log(response);
          that.evaluateList = response.data;
          // console.log(that.evaluateList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 搜索按钮
    searchInFo() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/evaluation/search",
        data: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuName: that.inputName,
          stuId: that.inputID,
        },
      })
        .then((response) => {
          that.evaluateList = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.Evaluation-selectYear {
  flex: 1;
  width: 160px;
  margin-left: 30%;
  margin-right: 2%;
}

.Evaluation-selectClass {
  flex: 1;
  width: 160px;
  margin-right: 2%;
}

.Evaluation-inputID {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}

.Evaluation-inputName {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}
</style>
