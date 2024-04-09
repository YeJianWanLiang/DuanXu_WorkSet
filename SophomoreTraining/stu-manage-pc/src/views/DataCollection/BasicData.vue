<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">入学基础数据</span>
    </div>

    <div class="functionBar">
      <el-upload
        style="margin-left: 8px;"
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :show-file-list="false"
        :on-remove="handleRemove"
        :file-list="fileListUpload"
        :limit="limitUpload"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button type="primary" style="margin-right:10px">导入</el-button>
      </el-upload>
      <el-button
        type="primary"
        @click="
          addDialogVisible = true;
          newInfo();
        "
        >新增</el-button
      >
      <el-button type="primary" @click="exportExcel()">导出</el-button>
      <el-button
        type="danger"
        class="BasicData-deleteButton"
        @click="deleteInfo()"
        >删除</el-button
      >

      <el-select
        class="BasicData-selectYear"
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
        class="BasicData-selectClass"
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
        class="BasicData-inputID"
        v-model="inputID"
        placeholder="学号"
        style="width: 10%"
        clearable
      ></el-input>
      <el-input
        class="BasicData-inputName"
        v-model="inputName"
        placeholder="姓名"
        style="width: 10%"
        clearable
      ></el-input>
      <el-button type="primary" @click="searchInFo()">搜索</el-button>
    </div>

    <div class="dataTable">
      <el-table
        id="Student_table"
        :data="calTableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center" width="130px">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="姓名"
          align="center"
          width="110px"
        >
        </el-table-column>
        <el-table-column
          prop="schoolDate"
          label="年份"
          align="center"
          width="110px"
        >
        </el-table-column>
        <el-table-column prop="stuClass" label="班级" align="center">
        </el-table-column>
        <el-table-column
          prop="classTeacher"
          label="班主任"
          align="center"
          width="110px"
        >
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号码" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          align="center"
          width="120px"
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
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="tableTag">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[7, 14, 21, 28]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>

    <!-- dialog-新增 -->
    <!-- 内容主体区域 -->
    <el-dialog
      title="入学基础数据"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="学号" prop="stuId">
          <el-input
            v-model="addForm.stuId"
            label="请输入学号"
            style="width: 25%"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input
            v-model="addForm.stuName"
            label="请输入姓名"
            style="width: 20%"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="schoolDate">
          <el-select v-model="addForm.schoolDate" placeholder="选择年份">
            <el-option
              v-for="item in optionsOfYear"
              :key="item.valueOfYear"
              :label="item.label"
              :value="item.valueOfYear"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="stuClass">
          <el-select v-model="addForm.stuClass" placeholder="选择班级">
            <el-option
              v-for="item in optionsOfClass"
              :key="item.valueOfClass"
              :label="item.label"
              :value="item.valueOfClass"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="classTeacher">
          <el-select v-model="addForm.classTeacher" placeholder="选择班主任">
            <el-option
              v-for="item in optionsOfClassTeacher"
              :key="item.valueOfTeacher"
              :label="item.label"
              :value="item.valueOfTeacher"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="addForm.idCard"
            label="请输入身份证号码"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addForm.sex" placeholder="选择性别">
            <el-option
              v-for="item in optionsOfGender"
              :key="item.valueOfGender"
              :label="item.label"
              :value="item.valueOfGender"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-input
            v-model="addForm.birthDate"
            label="请输入出生日期"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="homeLocating">
          <el-input
            v-model="addForm.homeLocating"
            label="请输入家庭住址"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneOfStudent">
          <el-input
            v-model="addForm.phoneOfStudent"
            label="请输入联系电话"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="QQNumber">
          <el-input
            v-model="addForm.QQNumber"
            label="请输入QQ号"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="nameOfParents">
          <el-input
            v-model="addForm.nameOfParents"
            label="请输入家长姓名"
            style="width: 20%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phoneOfParent">
          <el-input
            v-model="addForm.phoneOfParent"
            label="请输入家长手机号"
            style="width: 30%"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
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

    <!-- dialog-编辑 -->
    <el-dialog
      title="入学基础数据"
      :visible.sync="editDialogVisible"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="学号" prop="stuId">
          <el-input
            v-model="editForm.stuId"
            label="请输入学号"
            style="width: 25%"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input
            v-model="editForm.stuName"
            label="请输入姓名"
            style="width: 20%"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="schoolDate">
          <el-select v-model="editForm.schoolDate" placeholder="选择年份">
            <el-option
              v-for="item in optionsOfYear"
              :key="item.valueOfYear"
              :label="item.label"
              :value="item.valueOfYear"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="stuClass">
          <el-select v-model="editForm.stuClass" placeholder="选择班级">
            <el-option
              v-for="item in optionsOfClass"
              :key="item.valueOfClass"
              :label="item.label"
              :value="item.valueOfClass"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="classTeacher">
          <el-select v-model="editForm.classTeacher" placeholder="选择班主任">
            <el-option
              v-for="item in optionsOfClassTeacher"
              :key="item.valueOfTeacher"
              :label="item.label"
              :value="item.valueOfTeacher"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input
            v-model="editForm.idCard"
            label="请输入身份证号码"
            style="width: 30%"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="选择性别">
            <el-option
              v-for="item in optionsOfGender"
              :key="item.valueOfGender"
              :label="item.label"
              :valueOf="item.valueOfGender"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthDate">
          <el-input
            v-model="editForm.birthDate"
            label="请输入出生日期"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="homeLocating">
          <el-input
            v-model="editForm.homeLocating"
            label="请输入家庭住址"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneOfStudent">
          <el-input
            v-model="editForm.phoneOfStudent"
            label="请输入联系电话"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="QQNumber">
          <el-input
            v-model="editForm.QQNumber"
            label="请输入QQ号"
            style="width: 30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="nameOfParents">
          <el-input
            v-model="editForm.nameOfParents"
            label="请输入家长姓名"
            style="width: 20%"
          ></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phoneOfParent">
          <el-input
            v-model="editForm.phoneOfParent"
            label="请输入家长手机号"
            style="width: 30%"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
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
    <!-- 导入弹窗 -->
    <el-dialog
      title="导入学生数据"
      :visible.sync="importdialogVisible"
      width="60%"
      center
    >
      <el-table :data="accountList" border style="width: 100%;">
        <el-table-column
          prop="stuId"
          header-align="center"
          align="center"
          label="学号"
        >
        </el-table-column>
        <el-table-column
          prop="stuName"
          header-align="center"
          align="center"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="schoolDate"
          header-align="center"
          align="center"
          label="年份"
        >
        </el-table-column>
        <el-table-column
          prop="stuClass"
          header-align="center"
          align="center"
          label="班级"
        >
        </el-table-column>
        <el-table-column
          prop="classTeacher"
          header-align="center"
          align="center"
          label="班主任"
        >
        </el-table-column>
        <el-table-column
          prop="idCard"
          header-align="center"
          align="center"
          label="身份证号码"
        >
        </el-table-column>
        <el-table-column
          prop="updatetime"
          header-align="center"
          align="center"
          label="更新时间"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importExcel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "BasicData",
  data() {
    return {
      fileListUpload: [],
      limitUpload: 3,
      disabled: false,
      accountList: [],
      importdialogVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {},
      editForm: {},
      optionsOfYear: [],
      valueOfYear: "",

      optionsOfClassTeacher: [],
      valueOfTeacher: "",

      optionsOfGender: [
        {
          valueOfGender: "男",
          label: "男",
        },
        {
          valueOfGender: "女",
          label: "女",
        },
      ],
      valueOfGender: "",
      optionsOfClass: [],
      valueOfClass: "",

      inputID: "",
      inputName: "",

      currentPage: 1,
      pagesize: 7,
      tableData: [],
      multipleSelection: [],
      addFormRules: {
        stuId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
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
            message: "请选择班级",
            trigger: "blur",
          },
        ],
        classTeacher: [
          {
            required: true,
            message: "请选择班主任",
            trigger: "blur",
          },
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
        birthDate: [
          {
            required: true,
            message: "请输入出生日期",
            trigger: "blur",
          },
        ],
        homeLocating: [
          {
            required: true,
            message: "请输入家庭住址",
            trigger: "blur",
          },
        ],
        phoneOfStudent: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
        ],
        // nameOfParents: [
        //   {
        //     required: true,
        //     message: "请输入家长姓名",
        //     trigger: "blur",
        //   },
        // ],
        // phoneOfParent: [
        //   {
        //     required: true,
        //     message: "请输入家长手机号",
        //     trigger: "blur",
        //   },
        // ],
      },
      editFormRules: {},
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
    this.printClassOption();
    this.printYearOption();
    this.printTeacherOption();
  },
  mounted() {},
  methods: {
    // excel上传
    handleChange(file) {
      this.fileTemp = file.raw;
      let fileName = file.raw.name;
      let fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      // 判断上传文件格式
      if (this.fileTemp) {
        if (fileType == "xlsx" || fileType == "xls") {
          this.importf(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleRemove() {
      this.fileTemp = null;
    },
    //导入的方法
    importf(obj) {
      this.importdialogVisible = true;
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        // var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function() {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            // wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
            //     type: 'base64'
            // });
            wb = XLSX.read(Buffer.from(binary, "base64").toString("base64"));
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          // outdata就是你想要的东西 excel导入的数据
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // excel 数据再处理
          let arr = [];
          outdata.map((v) => {
            let jsonString = JSON.stringify(v)
              .replace(/\//g, "")
              .replace(/\s/gi, "");
            // console.log(jsonString);
            v = JSON.parse(jsonString);
            let obj = {};
            //xxx代表列名
            obj.stuId = v["学号"];
            obj.stuName = v["姓名"];
            obj.schoolDate = v["年份"];
            obj.stuClass = v["班级"];
            obj.classTeacher = v["班主任"];
            obj.idCard = v["身份证号码"];
            obj.updatetime = v["更新时间"];
            arr.push(obj);
          });
          _this.accountList = [...arr];
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    importExcel() {
      let that = this;
      this.$axios({
        url: "http://zh.zhihao.kooboo.site/Student/import",
        method: "post",
        data: {
          // importStudent :JSON.stringify(that.accountList)
          importStudent: that.accountList,
        },
      }).then((response) => {
        console.log(response);
        // console.log(that.accountList.length);
      });
      that.importdialogVisible = false;
      that.tablePrint();
    },

    // 导出
    exportExcel() {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#Student_table")
      );
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "baseData.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 选中框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格翻页
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    // 表格渲染
    tablePrint() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Student/list",
      })
        .then((response) => {
          // console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 下拉框渲染
    selectPrint() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/listcClass",
      })
        .then((response) => {
          // console.log(response);
          that.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除按钮：删除checkbox选中的数据
    deleteInfo() {
      // console.log(this.multipleSelection);
      // multipleSelection是一个数组

      this.$confirm("确认删除吗？", "提示", {})
        .then(() => {
          console.log(this.multipleSelection);
          var ids = this.multipleSelection.map((m) => m.stuId);
          console.log(ids);

          for (let i = 0; i < ids.length; i++) {
            for (let j = 0; j < this.tableData.length; j++) {
              if (this.tableData[j].stuId == ids[i]) {
                this.tableData.splice(j, 1);
              }
            }
            console.log(ids[i]);
            this.$axios({
              method: "POST",
              url: "http://zh.zhihao.kooboo.site/Student/del",
              data: {
                stuId: ids[i],
              },
            })
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          }

          this.$message({
            message: "提交成功",
            type: "success",
          });
        })
        .catch((e) => {
          console.log(e);
        });
      // this.tablePrint();
    },
    // 搜索按钮
    searchInFo() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Student/list",
        data: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
        },
      })
        .then((response) => {
          that.tableData = response.data;
          console.log(response);
          // this.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 新增按钮：添加按钮->dialog->保存按钮保存新数据
    newInfo() {
      this.addForm = {};
    },
    putInfo() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      // console.log(updatetime);
      that.tableData.push(that.addForm);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Student/new",
        data: {
          stuId: that.addForm.stuId,
          stuName: that.addForm.stuName,
          schoolDate: that.addForm.schoolDate,
          stuClass: that.addForm.stuClass,
          classTeacher: that.addForm.classTeacher,
          idCard: that.addForm.idCard,
          grade: that.addForm.grade,
          sex: that.addForm.sex,
          birthDate: that.addForm.birthDate,
          QQNumber: that.addForm.QQNumber,
          homeLocating: that.addForm.homeLocating,
          phoneOfStudent: that.addForm.phoneOfStudent,
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
    // 编辑按钮 打开表单 信息传入表单
    editInFo(row) {
      // 这里row是dataTable数组
      let that = this;
      console.log(row);
      that.editForm = {};
      that.editForm = row;
    },
    // 储存修改信息
    storeInfo() {
      let that = this;
      var nowTime = new Date();
      var updatetime = nowTime.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Student/update",
        data: {
          stuId: that.editForm.stuId,
          stuName: that.editForm.stuName,
          schoolDate: that.editForm.schoolDate,
          stuClass: that.editForm.stuClass,
          classTeacher: that.editForm.classTeacher,
          idCard: that.editForm.idCard,
          grade: that.editForm.grade,
          sex: that.editForm.sex,
          birthDate: that.editForm.birthDate,
          QQNumber: that.editForm.QQNumber,
          homeLocating: that.editForm.homeLocating,
          phoneOfStudent: that.editForm.phoneOfStudent,
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
    printClassOption() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/listcClass",
      })
        .then((response) => {
          console.log(response);
          let i = 0;
          while (response.data[i]) {
            that.optionsOfClass.push(JSON.parse(response.data[i++]));
          }
          console.log(that.optionsOfClass);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    printYearOption() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/listSchoolDate",
      })
        .then((response) => {
          let i = 0;
          while (response.data[i]) {
            that.optionsOfYear.push(JSON.parse(response.data[i++]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    printTeacherOption() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/listclassTeacher",
      })
        .then((response) => {
          let i = 0;
          while (response.data[i]) {
            that.optionsOfClassTeacher.push(JSON.parse(response.data[i++]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.BasicData-deleteButton {
  margin-right: 2%;
}

.BasicData-selectYear {
  flex: 1;
  margin-right: 2%;
  width: 130px;
}

.BasicData-selectClass {
  flex: 1;
  width: 150px;
  margin-right: 2%;
}

.BasicData-inputID {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}

.BasicData-inputName {
  flex: 2;
  max-width: 10%;
  margin-right: 2%;
}
</style>
