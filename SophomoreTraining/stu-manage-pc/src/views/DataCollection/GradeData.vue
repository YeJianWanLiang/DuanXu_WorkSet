<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">成绩统计数据</span>
    </div>

    <div class="tabBar">
      <el-tabs v-model="activeName">
        <el-tab-pane label="日常表现成绩" name="dailyBehaviorGrade">
          <div class="functionBarInTab">
            <div class="GradeData-buttonCotainer">
              <el-button type="primary" @click="addDialogVisible = true"
                >导入</el-button
              >
              <el-button type="primary">导出</el-button>
            </div>

            <div class="GradeData-selectCotainer">
              <el-select
                class="GradeData-SelectTerm"
                v-model="valueOfTerm"
                placeholder="学期"
                clearable
              >
                <el-option
                  v-for="item in optionsOfTerm"
                  :key="item.valueOfTerm"
                  :label="item.label"
                  :value="item.valueOfTerm"
                >
                </el-option>
              </el-select>
              <el-select
                class="GradeData-SelectYear"
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
                class="GradeData-SelectClass"
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
                class="GradeData-InputID"
                v-model="inputID"
                placeholder="学号"
                clearable
              ></el-input>
              <el-input
                class="GradeData-InputName"
                v-model="inputName"
                placeholder="姓名"
                clearable
              ></el-input>
              <el-button
                class="GradeData-SearchButton"
                type="primary"
                @click="searchDaily()"
                >搜索</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="calTableDataDaily" border style="width: 100%">
              <el-table-column prop="stuId" label="学号"> </el-table-column>
              <el-table-column prop="stuName" label="姓名"></el-table-column>
              <el-table-column prop="schoolDate" label="入学年份">
              </el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
              <el-table-column prop="attendance" label="考勤"></el-table-column>
              <el-table-column prop="homework" label="作业"></el-table-column>
              <el-table-column
                prop="classPerformance"
                label="课堂表现"
              ></el-table-column>
              <el-table-column
                prop="dailyPerformanceUpdateTime"
                label="更新时间"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editDailyDialogVisible = true;
                      editDaily(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeDaily"
              @current-change="handleCurrentChangeDaily"
              :current-page="currentPageDaily"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeDaily"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfDaily.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="期中成绩" name="midGrade">
          <div class="functionBarInTab">
            <div class="GradeData-buttonCotainer">
              <el-button type="primary" @click="addDialogVisible = true"
                >导入</el-button
              >
              <el-button type="primary">导出</el-button>
            </div>
            <div class="GradeData-selectCotainer">
              <el-select
                v-model="valueOfTerm"
                placeholder="学期"
                class="GradeData-SelectTerm"
                clearable
              >
                <el-option
                  v-for="item in optionsOfTerm"
                  :key="item.valueOfTerm"
                  :label="item.label"
                  :value="item.valueOfTerm"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="valueOfYear"
                placeholder="入学年份"
                class="GradeData-SelectYear"
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
                class="GradeData-SelectClass"
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
                v-model="inputID"
                placeholder="学号"
                class="GradeData-InputID"
                clearable
              ></el-input>
              <el-input
                v-model="inputName"
                placeholder="姓名"
                class="GradeData-InputName"
                clearable
              ></el-input>
              <el-button
                type="primary"
                class="GradeData-SearchButton"
                @click="searchDaily()"
                >搜索</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="calTableDataMid" border style="width: 100%">
              <el-table-column prop="stuId" label="学号"> </el-table-column>
              <el-table-column prop="stuName" label="姓名"></el-table-column>
              <el-table-column prop="schoolDate" label="入学年份">
              </el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
              <el-table-column
                prop="InterimGrade"
                label="绩点"
              ></el-table-column>
              <el-table-column
                prop="InterimGradeUpdateTime"
                label="更新时间"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editInterimDialogVisible = true;
                      editMid(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeMid"
              @current-change="handleCurrentChangeMid"
              :current-page="currentPageMid"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeMid"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfMid.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="期末成绩" name="finalGrade">
          <div class="functionBarInTab">
            <div class="GradeData-buttonCotainer">
              <el-button type="primary" @click="addDialogVisible = true"
                >导入</el-button
              >
              <el-button type="primary">导出</el-button>
            </div>
            <div class="GradeData-selectCotainer">
              <el-select
                v-model="valueOfTerm"
                placeholder="学期"
                class="GradeData-SelectTerm"
              >
                <el-option
                  v-for="item in optionsOfTerm"
                  :key="item.valueOfTerm"
                  :label="item.label"
                  :value="item.valueOfTerm"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="valueOfYear"
                placeholder="入学年份"
                class="GradeData-SelectYear"
                clearable
              >
                <el-option
                  v-for="item in optionsOfYear"
                  :key="item.valueOfYear"
                  :label="item.label"
                  :value="item.valueOfYear"
                  clearable
                >
                </el-option>
              </el-select>
              <el-select
                v-model="valueOfClass"
                placeholder="班级"
                class="GradeData-SelectClass"
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
                v-model="inputID"
                placeholder="学号"
                class="GradeData-InputID"
                clearable
              ></el-input>
              <el-input
                v-model="inputName"
                placeholder="姓名"
                class="GradeData-InputName"
                clearable
              ></el-input>
              <el-button
                type="primary"
                class="GradeData-SearchButton"
                @click="searchFinal()"
                >搜索</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="tableDataOfFinal" border style="width: 100%">
              <el-table-column prop="stuId" label="学号"> </el-table-column>
              <el-table-column prop="stuName" label="姓名"></el-table-column>
              <el-table-column prop="schoolDate" label="入学年份">
              </el-table-column>
              <el-table-column prop="stuClass" label="班级"></el-table-column>
              <el-table-column prop="finalGrade" label="绩点"></el-table-column>
              <el-table-column
                prop="finalGradeUpdateTime"
                label="更新时间"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editFinalDialogVisible = true;
                      editFinal(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeFinal"
              @current-change="handleCurrentChangeFinal"
              :current-page="currentPageFinal"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeFinal"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfFinal.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 导入 -->
    <el-dialog title="导入成绩" :visible.sync="addDialogVisible" width="50%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="选择学年学期" prop="term">
          <el-select v-model="valueOfTerm" placeholder="选择学年学期">
            <el-option
              v-for="item in optionsOfTerm"
              :key="item.valueOfTerm"
              :label="item.label"
              :value="item.valueOfTerm"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导入成绩" prop="importGrades">
          <el-button>选择文件</el-button>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDialogVisible = false"
          >确认导入</el-button
        >
        <el-button @click="addDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 编辑日常成绩 -->
    <el-dialog
      title="编辑日常成绩"
      :visible.sync="editDailyDialogVisible"
      width="50%"
    >
      <el-form
        :model="editDailyForm"
        :rules="editDailyFormRules"
        ref="editDailyFormRef"
        label-width="100px"
      >
        <el-form-item prop="dailyGrade">
          <el-table
            @cell-click="tableCellClick"
            :cell-class-name="
              ({ row, column, rowIndex, columnIndex }) => (
                (row.index = rowIndex), (column.index = columnIndex)
              )
            "
            :data="dailyGradeData"
          >
            <el-table-column
              label="周次"
              align="center"
              show-overflow-tooltip
              prop="week"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.week"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.week }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="出勤"
              align="center"
              show-overflow-tooltip
              prop="attendance"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.attendance"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.attendance }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="作业"
              align="center"
              show-overflow-tooltip
              prop="assignment"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.assignment"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.assignment }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="课堂表现"
              align="center"
              show-overflow-tooltip
              prop="classPerformance"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.classPerformance"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.classPerformance }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDailyDialogVisible = false; storeDaily()"
          >保存</el-button
        >
        <el-button
          @click="
            editDailyDialogVisible = false;
            tableCellClickRowIndex = null;
            tableCellClickColumnIndex = null;
          "
          >取消</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑期中成绩 -->
    <el-dialog
      title="编辑期中成绩"
      :visible.sync="editInterimDialogVisible"
      width="50%"
    >
      <el-form
        :model="editInterimForm"
        :rules="editInterimFormRules"
        ref="editInterimFormRef"
        label-width="100px"
      >
        <el-form-item prop="interimGrade">
          <el-table
            @cell-click="tableCellClick"
            :cell-class-name="
              ({ row, column, rowIndex, columnIndex }) => (
                (row.index = rowIndex), (column.index = columnIndex)
              )
            "
            :data="interimGradeData"
          >
            <el-table-column
              label="课程"
              align="center"
              show-overflow-tooltip
              prop="curriculum"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.curriculum"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.curriculum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分数"
              align="center"
              show-overflow-tooltip
              prop="grade"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.grade"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.grade }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editInterimDialogVisible = false; storeMid();"
          >保存</el-button
        >
        <el-button
          @click="
            editInterimDialogVisible = false;
            tableCellClickRowIndex = null;
            tableCellClickColumnIndex = null;
            
          "
          >取消</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑期末成绩 -->
    <el-dialog
      title="编辑期末成绩"
      :visible.sync="editFinalDialogVisible"
      width="50%"
    >
      <el-form
        :model="editFinalForm"
        :rules="editFinalFormRules"
        ref="editFinalFormRef"
        label-width="100px"
      >
        <el-form-item prop="finalGrade">
          <el-table
            @cell-click="tableCellClick"
            :cell-class-name="
              ({ row, column, rowIndex, columnIndex }) => (
                (row.index = rowIndex), (column.index = columnIndex)
              )
            "
            :data="finalGradeData"
          >
            <el-table-column
              label="课程"
              align="center"
              show-overflow-tooltip
              prop="curriculum"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.curriculum"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.curriculum }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="分数"
              align="center"
              show-overflow-tooltip
              prop="grade"
            >
              <template slot-scope="scope">
                <span
                  v-if="
                    scope.row.index === tableCellClickRowIndex &&
                      scope.column.index === tableCellClickColumnIndex
                  "
                >
                  <el-input
                    placeholder="请输入内容…"
                    v-model="scope.row.grade"
                    @blur="tableCellInputBlur"
                    size="mini"
                    autofocus
                  />
                </span>
                <span v-else>{{ scope.row.grade }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFinalDialogVisible = false; storeFinal()"
          >保存</el-button
        >
        <el-button
          @click="
            editFinalDialogVisible = false;
            tableCellClickRowIndex = null;
            tableCellClickColumnIndex = null;
            ;
          "
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GradeData",
  data() {
    return {
      tableCellClickRowIndex: null, // 点击的单元格行索引
      tableCellClickColumnIndex: null, // 点击的单元格列索引
      editFinalDialogVisible: false,
      finalGradeData: [
        {
          curriculum: "高数",
          grade: "90",
        },
        {
          curriculum: "英语",
          grade: "80",
        },
        {
          curriculum: "物理",
          grade: "76",
        },
        {
          curriculum: "计算机原理",
          grade: "66",
        },
        {
          curriculum: "网页设计",
          grade: "68",
        },
        {
          curriculum: "数据结构",
          grade: "77",
        },
        {
          curriculum: "C语言",
          grade: "92",
        },
      ],

      editInterimDialogVisible: false,
      interimGradeData: [
        {
          curriculum: "高数",
          grade: "90",
        },
        {
          curriculum: "英语",
          grade: "80",
        },
        {
          curriculum: "物理",
          grade: "76",
        },
        {
          curriculum: "计算机原理",
          grade: "66",
        },
        {
          curriculum: "网页设计",
          grade: "68",
        },
        {
          curriculum: "数据结构",
          grade: "77",
        },
        {
          curriculum: "C语言",
          grade: "92",
        },
      ],
      editDailyDialogVisible: false,
      dailyGradeData: [],

      addDialogVisible: false,
      addForm: {},
      addFormRules: {},
      editDailyForm: {},
      editDailyFormRules: {},
      editInterimForm: {},
      editInterimFormRules: {},
      editFinalForm: {},
      editFinalFormRules: {},

      activeName: "dailyBehaviorGrade",
      optionsOfTerm: [
        {
          valueOfTerm: "2020-2021第一学期",
          label: "2020-2021第一学期",
        },
        {
          valueOfTerm: "2020-2021第二学期",
          label: "2020-2021第二学期",
        },
      ],
      valueOfTerm: "",

      optionsOfYear: [
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
          valueOfClass: "20计算机1班",
          label: "20计算机1班",
        },
        {
          valueOfClass: "20计算机2班",
          label: "20计算机2班",
        },
      ],
      valueOfClass: "",

      currentPageDaily: 1,
      pagesizeDaily: 20,
      tableDataOfDaily: [],

      currentPageMid: 1,
      pagesizeMid: 20,
      tableDataOfMid: [],

      currentPageFinal: 1,
      pagesizeFinal: 20,
      tableDataOfFinal: [],
      inputID: "",
      inputName: "",
    };
  },
  created() {
    this.tablePrintDaily();
    this.tablePrintMid();
    this.tablePrintFinal();
  },
  mounted() {},
  methods: {
    // handleClose() {
    //   this.$confirm('确认关闭？')
    //       .then(() => {
    //         this.editDailyDialogVisible = false;
    //         // this. = false;
    //       })
    //       .catch((e)=> {
    //         console.log(e);
    //       });
    // },
    handleSizeChangeDaily: function(size) {
      this.pagesizeDaily = size;
    },
    handleCurrentChangeDaily: function(currentPage) {
      this.currentPageDaily = currentPage;
    },
    handleSizeChangeMid: function(size) {
      this.pagesizeMid = size;
    },
    handleCurrentChangeMid: function(currentPage) {
      this.currentPageMid = currentPage;
    },
    handleSizeChangeFinal: function(size) {
      this.pagesizeFinal = size;
    },
    handleCurrentChangeFinal: function(currentPage) {
      this.currentPageFinal = currentPage;
    },
    tableCellClick(row, column) {
      this.tableCellClickRowIndex = row.index;
      this.tableCellClickColumnIndex = column.index;
    },
    // 单元格失去焦点
    tableCellInputBlur() {
      this.tableCellClickRowIndex = null;
      this.tableCellClickColumnIndex = null;
    },
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    tablePrintDaily() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/listdaily",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfDaily = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tablePrintMid() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/listmidterm",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfMid = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tablePrintFinal() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/finalterm",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfFinal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchDaily() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/listdaily",
        data: {
          // Term: that.valueOfTerm,
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
        },
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfDaily = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchMid() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/listmidterm",
        data: {
          // Term: that.valueOfTerm,
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
        },
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfMid = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchFinal() {
      let that = this;
      this.$axios({
        method: "POST",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/finalterm",
        data: {
          // Term: that.valueOfTerm,
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
        },
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfFinal = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editDaily(row) {
      let that = this;
      that.editDailyForm = row;
      console.log(that.editDailyForm);
      this.$axios({
        method: "GET",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/listStuAttendanceForm",
        params: {
          ScoreNo: row.ScoreNo,
          stuId: row.stuId,
        },
      })
        .then((response) => {
          console.log(response);
          that.dailyGradeData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editMid(row) {
      console.log(row);
      let that = this;
      that.editInterimForm = row;
      // console.log(that.editInterimForm);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/Score_statistics_table/list/midexam",
        params: {
          ScoreNo: row.ScoreNo,
        },
      })
        .then((response) => {
          console.log(response);
          that.interimGradeData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editFinal(row) {
      console.log(row);
      let that = this;
      that.editFinalForm = row;
      this.$axios({
        method: "GET",
        url:
          "http://zh.zhihao.kooboo.site/Score_statistics_table/list/finalexam",
        params: {
          ScoreNo: row.ScoreNo,
        },
      })
        .then((response) => {
          console.log(response);
          that.finalGradeData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // todo 把字符串传进去
    storeDaily() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Score_statistics_table/update",
        data: {
          ScoreNo: that.editDailyForm.ScoreNo,
          stuAttendance: that.dailyGradeData,
          dailyPerformanceUpdateTime: updatetime,
        },
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeMid() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Score_statistics_table/update",
        data: {
          ScoreNo: that.editInterimForm.ScoreNo,
          MidSubjectsGrade: that.interimGradeData,
          InterimGradeUpdateTime: updatetime,
        },
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeFinal() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Score_statistics_table/update",
        data: {
          ScoreNo: that.editFinalForm.ScoreNo,
          FinSubjectsGrade: that.finalGradeData,
          finalGradeUpdateTime: updatetime,
        },
      })
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    calTableDataDaily: function() {
      return this.tableDataOfDaily.slice(
        (this.currentPageDaily - 1) * this.pagesizeDaily,
        this.currentPageDaily * this.pagesizeDaily
      );
    },
    calTableDataMid: function() {
      return this.tableDataOfMid.slice(
        (this.currentPageMid - 1) * this.pagesizeMid,
        this.currentPageMid * this.pagesizeMid
      );
    },
    calTableDataFinal: function() {
      return this.tableDataOfFinal.slice(
        (this.currentPageFinal - 1) * this.pagesizeFinal,
        this.currentPageFinal * this.pagesizeFinal
      );
    },
  },
};
</script>

<style>
.GradeData-tabBar {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}

.GradeData-functionBar {
  box-sizing: border-box;
  display: flex;
}

.GradeData-buttonCotainer {
  flex: 3;
  display: inline-block;
}

.GradeData-selectCotainer {
  flex: 7;
  display: flex;
  justify-content: space-between;
}

.GradeData-SelectTerm {
  width: 170px;
}

.GradeData-SelectYear {
  width: 130px;
}

.GradeData-SelectClass {
  width: 130px;
}

.GradeData-InputID {
  width: 110px;
}

.GradeData-InputName {
  width: 110px;
}

/* .SearchButton {
  margin-left: auto;
} */

.GradeData-dataTab {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}
</style>
