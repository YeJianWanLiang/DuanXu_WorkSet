<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">日常活动</span>
    </div>

    <div class="functionBar">
      <div class="DailyActivity-buttonContainer">
        <el-button type="primary" @click="addDialogVisible = true; newInfo()"
          >新增</el-button
        >
      </div>

      <div class="DailyActivity-selectContainer">
        <el-input
          v-model="inputActivity"
          placeholder="活动名称"
          class="DailyActivity-inputActivity"
          clearable
          @clear="tablePrint()"
        ></el-input>
        <el-button
          type="primary"
          class="DailyActivity-searchButton"
          @click="searchInfo()"
          >搜索</el-button
        >
      </div>
    </div>

    <div class="dataTable" style="width: 100%">
      <el-table :data="calTableData" border>
        <el-table-column prop="activityName" label="活动名称" align="center">
        </el-table-column>
        <el-table-column prop="activityType" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="activitySites" label="地点" align="center">
        </el-table-column>
        <el-table-column prop="activityPhoto" label="照片" align="center">
          <img src="../../assets/Pics/activity.png" alt="" />
        </el-table-column>
        <el-table-column
          prop="activityAbsentenceNum"
          label="缺席人数/报名人数"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
          class="DailyActivity-tableButton"
          width="280px"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="
                editDialogVisible = true;
                editInFo(scope.row);
              "
              >编辑</el-button
            >
            <el-button type="primary">报名人员</el-button>
            <el-button type="danger" @click="deleteInfo(scope.row)"
              >删除</el-button
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
    <!-- 新增活动 -->
    <el-dialog title="新增活动" :visible.sync="addDialogVisible" width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="活动名称" prop="activityName">
          <el-input
            v-model="addForm.activityName"
            placeholder="请输入活动名称"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="activityType">
          <el-select v-model="addForm.activityType" placeholder="选择活动类型">
            <el-option
              v-for="item in optionsOfActType"
              :key="item.valueOfActType"
              :label="item.label"
              :value="item.valueOfActType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="activitySites">
          <el-input
            v-model="addForm.activitySites"
            placeholder="请输入活动地点"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="承办方" prop="undertaker">
          <el-input
            v-model="addForm.undertaker"
            placeholder="请输入活动承办方"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="PersonInCharge">
          <el-input
            v-model="addForm.PersonInCharge"
            placeholder="请输入活动负责人"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="valueOfActTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="活动介绍" prop="activityIntroduction">
          <el-input
            type="textarea"
            v-model="addForm.activityIntroduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addDialogVisible = false;
            putInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 编辑活动 -->
    <el-dialog title="编辑活动" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="活动名称" prop="activityName">
          <el-input
            v-model="editForm.activityName"
            placeholder="请输入活动名称"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="activityType">
          <el-select v-model="editForm.activityType" placeholder="选择活动类型">
            <el-option
              v-for="item in optionsOfActType"
              :key="item.valueOfActType"
              :label="item.label"
              :value="item.valueOfActType"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="activitySites">
          <el-input
            v-model="editForm.activitySites"
            placeholder="请输入活动地点"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="承办方" prop="undertaker">
          <el-input
            v-model="editForm.undertaker"
            placeholder="请输入活动承办方"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="PersonInCharge">
          <el-input
            v-model="editForm.PersonInCharge"
            placeholder="请输入活动负责人"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="valueOfActTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="活动介绍" prop="activityIntroduction">
          <el-input
            type="textarea"
            v-model="editForm.activityIntroduction"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动照片" prop="activityPhoto">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editDialogVisible = false;
            storeInfo();
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
  name: "DailyActivity",
  data() {
    return {
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        actName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        actType: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change",
          },
        ],
        actAddress: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur",
          },
        ],
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      valueOfActTime: "",

      optionsOfActType: [
        {
          valueOfActType: "艺术",
          label: "艺术",
        },
        {
          valueOfActType: "学习",
          label: "学习",
        },
      ],
      valueOfActType: "",
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        actName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        actType: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change",
          },
        ],
        actAddress: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur",
          },
        ],
      },

      inputActivity: "",
      tableData: [],
      currentPage: 1,
      pagesize: 20,
    };
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
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    tablePrint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/daily/list",
      })
        .then((response) => {
          // console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 新增按钮：添加按钮->dialog->保存按钮保存新数据
    newInfo() {
      this.addForm = {};
    },
    // 新增的保存按钮
    putInfo() {
      let that = this;
      let index = that.tableData.length + 1;
      var Time = new Date();
      var updateTime = Time.toLocaleString();
      console.log(updateTime);
      // console.log(that.addForm);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/daily/add",
        data: {
          activtyNo: index,
          activityName: that.addForm.activityName,
          activityType: that.addForm.activityType,
          activitySites: that.addForm.activitySites,
          undertaker: that.addForm.undertaker,
          PersonInCharge: that.addForm.PersonInCharge,
          activityStartTime: that.valueOfActTime[0].toLocaleString(),
          activityEndTime: that.valueOfActTime[1].toLocaleString(),
          activityIntroduction: that.addForm.activityIntroduction,
          updateTime: updateTime,
        },
      })
        .then(() => {
          that.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addForm = {};
    },
    // 编辑按钮 打开表单 信息传入表单
    editInFo(row) {
      // 这里row是dataTable对象
      let that = this;
      // console.log(row);
      that.editForm = "";
      that.editForm = row;
      that.valueOfActType = that.editForm.activityType;
    },
    // 储存修改信息
    storeInfo() {
      let that = this;
      console.log(that.editForm);
      console.log(that.editForm.activityType);
      var Time = new Date();
      var updateTime = Time.toLocaleString();
      console.log(updateTime);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/daily/edit",
        params: {
          activtyNo: that.editForm.activtyNo,
          activityName: that.editForm.activityName,
          activityType: that.editForm.activityType,
          activitySites: that.editForm.activitySites,
          undertaker: that.editForm.undertaker,
          PersonInCharge: that.editForm.PersonInCharge,
          activityStartTime: that.editForm.activityStartTime,
          activityEndTime: that.editForm.activityEndTime,
          activityIntroduction: that.editForm.activityIntroduction,
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
    // 删除按钮
    deleteInfo(row) {
      // console.log(row);
      console.log(row);
      // var deleteID = row._id;
      
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/daily/delete",
        params: {
          activtyNo: row.activtyNo,
        },
      })
        .then(() => {
          // console.log(response);
          this.tablePrint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 搜索按钮
    searchInfo() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/daily/search",
        params: {
          activityName: that.inputActivity,
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
.DailyActivity-buttonContainer {
  flex: 3;
}
.DailyActivity-selectContainer {
  flex: 7;
  display: flex;
  justify-content: flex-end;
}
.DailyActivity-inputActivity {
  width: 150px;
  margin-right: 2%;
}
/* .DailyActivity-buttonContainer {
  min-width: 360px;
} */
</style>
