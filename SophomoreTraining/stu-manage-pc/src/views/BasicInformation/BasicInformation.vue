<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">基础信息配置</span>
    </div>

    <div class="tabBar">
      <el-tabs v-model="activeName" @tab-click="changeClick">
        <el-tab-pane label="班级配置" name="classConfiguration">
          <div class="functionBarInTab">
            <div class="BasicInformation-buttonCotainer">
              <el-button
                type="primary"
                @click="
                  addClassDialogVisible = true;
                  Class_tableNewInfo();
                "
                >新增</el-button
              >
            </div>
            <div class="BasicInformation-selectCotainer">
              <el-select
                style=""
                class="BasicInformation-SelectClassDate"
                v-model="valueOfClassDate"
                clearable
                @clear="Class_tableprint()"
                placeholder="入学年份"
              >
                <el-option
                  v-for="item in optionsOfClassDate"
                  :key="item.valueOfClassDate"
                  :label="item.label"
                  :value="item.valueOfClassDate"
                >
                </el-option>
              </el-select>
              <el-button
                class="BasicInformation-SearchButton"
                type="primary"
                @click="searchInfo()"
                >搜索</el-button
              >
            </div>
          </div>

          <div class="dataTable">
            <el-table :data="calTableDataClass" border style="width: 100%">
              <!-- 连数据库 -->
              <!-- <el-table-column prop="stuClass" label="班级" align="center"></el-table-column>
                        <el-table-column prop="schoolDate" label="入学年份" align="center">
                        </el-table-column>
                        <el-table-column prop="classTeacher" label="班主任" align="center">
                        </el-table-column> -->
              <el-table-column
                prop="className"
                label="班级"
                align="center"
              ></el-table-column>
              <el-table-column prop="classDate" label="入学年份" align="center">
              </el-table-column>
              <el-table-column
                prop="classTeacher"
                label="班主任"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      type="primary"
                      @click="
                        editClassDialogVisible = true;
                        Class_tableEditInfo(scope.row);
                      "
                      >编辑</el-button
                    >

                    <el-button type="primary" @click="addDialogVisible = true"
                      >课程表</el-button
                    >

                    <el-button
                      type="danger"
                      @click="Class_tableDeleteInfo(scope.row)"
                      >删除</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeClass"
              @current-change="handleCurrentChangeClass"
              :current-page="currentPageClass"
              :page-sizes="[7, 14, 21, 28]"
              :page-size="pagesizeClass"
              layout="total, sizes, prev, pager, next, jumper"
              :total="classConfiguration.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="入学年份配置" name="entryYearConfiguration">
          <div class="functionBarInTab">
            <div class="BasicInformation-buttonCotainer">
              <el-button
                type="primary"
                @click="
                  addClassDateDialogVisible = true;
                  enrollment_year_tableNewInfo();
                "
                >新增</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="calTableDataEntryYear" border style="width: 40%">
              <!-- 数据库 -->
              <!-- <el-table-column prop="schoolDate" label="入学年份" align="center">
                        </el-table-column> -->

              <el-table-column prop="year" label="入学年份" align="center">
              </el-table-column>
              <el-table-column prop="isUse" label="是否启用" align="center">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.isUse"
                    active-color="#13ce66"
                    inactive-color="#CCCCCC"
                    :active-value="1"
                    :inactive-value="0"
                    @change="changeIsUse(scope.row)"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作"
                align="center"
                width="200px"
                ><template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editClassDateDialogVisible = true;
                      enrollment_year_tableEditInfo(scope.row);
                    "
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    @click="enrollment_year_tableDeleteInfo(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeYear"
              @current-change="handleCurrentChangeYear"
              :current-page="currentPageEntryYear"
              :page-sizes="[7, 14, 21, 28]"
              :page-size="pagesizeEntryYear"
              layout="total, sizes, prev, pager, next, jumper"
              :total="entryYearConfigurationTable.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="日常表现配置" name="dailyPerformanceConfiguration">
          <div class="functionBarInTab">
            <div class="BasicInformation-buttonCotainer">
              <el-button
                type="primary"
                @click="
                  addDailyPerformanceDialogVisible = true;
                  basic_behavior_tableNewInfo();
                "
                >新增</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table
              :data="dailyPerformanceConfiguration"
              border
              style="width: 30%"
            >
              <el-table-column prop="behavior" label="日常表现" align="center">
              </el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editDailyPerformanceDialogVisible = true;
                      basic_behavior_tableEditInfo(scope.row);
                    "
                    >编辑</el-button
                  >

                  <el-button
                    type="danger"
                    @click="basic_behavior_tableDeleteInfo(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangePerformance"
              @current-change="handleCurrentChangePerformance"
              :current-page="currentPageDailyPerformance"
              :page-sizes="[7, 14, 21, 28]"
              :page-size="pagesizeDailyPerformance"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dailyPerformanceConfiguration.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="活动类型配置" name="activeTypeConfiguration">
          <div class="functionBarInTab">
            <div class="BasicInformation-buttonCotainer">
              <el-button
                type="primary"
                @click="
                  addActivityTypeDialogVisible = true;
                  basic_activity_tableNewInfo();
                "
                >新增</el-button
              >
            </div>
          </div>
          <div class="dataTable">
            <el-table :data="activeTypeConfiguration" border style="width: 30%">
              <el-table-column
                prop="activityType"
                label="活动类型"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editActivityTypeDialogVisible = true;
                      basic_activity_tableEditInfo(scope.row);
                    "
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    @click="basic_activity_tableDeleteInfo(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeType"
              @current-change="handleCurrentChangeType"
              :current-page="currentPageActiveType"
              :page-sizes="[7, 14, 21, 28]"
              :page-size="pagesizeActiveType"
              layout="total, sizes, prev, pager, next, jumper"
              :total="activeTypeConfiguration.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- dialog -->
    <!-- todo内容主体区域 -->
    <el-dialog title="课程表" :visible.sync="addDialogVisible" width="50%">
      <!-- 课程表主体 -->
      <template>
        <div>
          <div style="width: 100%; height: 100%; overflow: auto">
            <div class="tabel-container" style="margin: 7 px">
              <div>
                <table style="table-layout: fixed; width: 100%">
                  <thead style="background-color: #67a1ff">
                    <tr>
                      <th
                        style="
                          background-color: #fff;
                          line-height: 17px;
                          font-weight: normal;
                        "
                      >
                        时间
                      </th>
                      <th
                        v-for="(weekNum, weekIndex) in classTableData.courses
                          .length"
                        :key="weekIndex"
                        style="
                          background-color: #fff;
                          line-height: 17px;
                          font-weight: normal;
                        "
                      >
                        {{ "周" + digital2Chinese(weekIndex, "week") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody style="background-color: #eaf2ff">
                    <tr
                      v-for="(lesson, lessonIndex) in classTableData.lessons"
                      :key="lessonIndex"
                      style="font-size: 8px"
                    >
                      <td
                        style="
                          width: 60px;
                          padding: 12px 2px;
                          font-size: 12px;
                          text-align: center;
                          color: #677998;
                          line-height: 12px;
                          color: #333;
                        "
                      >
                        <p>
                          {{ "第" + digital2Chinese(lessonIndex + 1) + "节" }}-
                        </p>
                        <p style="font-size: 8px">{{ lesson }}</p>
                      </td>

                      <td
                        v-for="(course, courseIndex) in classTableData.courses"
                        :key="courseIndex"
                        style="
                          width: 60px;
                          padding: 12px 2px;
                          font-size: 12px;
                          text-align: center;
                          color: #677998;
                          line-height: 12px;
                        "
                      >
                        {{
                          classTableData.courses[courseIndex][lessonIndex] ||
                          "-"
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
    <!-- 班级配置 新增 dialog -->
    <el-dialog
      title="新增班级"
      :visible.sync="addClassDialogVisible"
      width="50%"
    >
      <el-form
        :model="addClassForm"
        :rules="addClassFormRules"
        ref="addClassFormRef"
        label-width="120px"
      >
        <el-form-item label="班级" prop="className">
          <el-input
            v-model="addClassForm.className"
            placeholder="请输入班级"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="classDate">
          <el-select
            v-model="addClassForm.classDate"
            placeholder="选择入学年份"
          >
            <el-option
              v-for="item in optionsOfClassDate"
              :key="item.valueOfClassDate"
              :label="item.label"
              :value="item.valueOfClassDate"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="classTeacher">
          <el-select
            v-model="addClassForm.classTeacher"
            placeholder="选择班主任"
          >
            <el-option
              v-for="item in optionsOfClassTeacher"
              :key="item.valueOfClassTeacher"
              :label="item.label"
              :value="item.valueOfClassTeacher"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addClassDialogVisible = false;
            Class_tablePutInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addClassDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 班级配置 编辑 dialog -->
    <el-dialog
      title="编辑班级"
      :visible.sync="editClassDialogVisible"
      width="50%"
    >
      <el-form
        :model="editClassForm"
        :rules="editClassFormRules"
        ref="editClassFormRef"
        label-width="120px"
      >
        <el-form-item label="班级" prop="className">
          <el-input
            v-model="editClassForm.className"
            placeholder="请输入班级"
            style="width: 40%"
          ></el-input>
        </el-form-item>
        <el-form-item label="入学年份" prop="classDate">
          <el-select
            v-model="editClassForm.classDate"
            placeholder="选择入学年份"
          >
            <el-option
              v-for="item in optionsOfClassDate"
              :key="item.valueOfClassDate"
              :label="item.label"
              :value="item.valueOfClassDate"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="classTeacher">
          <el-select
            v-model="editClassForm.classTeacher"
            placeholder="选择班主任"
          >
            <el-option
              v-for="item in optionsOfClassTeacher"
              :key="item.valueOfClassTeacher"
              :label="item.label"
              :value="item.valueOfClassTeacher"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editClassDialogVisible = false;
            Class_tableStoreInfo();
          "
          >保 存</el-button
        >
        <el-button @click="editClassDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 入学年份配置 新增 dialog -->
    <el-dialog
      title="新增入学年份"
      :visible.sync="addClassDateDialogVisible"
      width="50%"
    >
      <el-form
        :model="addClassDateForm"
        :rules="addClassDateFormRules"
        ref="addClassDateFormRef"
        label-width="120px"
      >
        <el-form-item label="入学年份" prop="year">
          <el-input
            v-model="addClassDateForm.year"
            placeholder="请输入入学年份"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addClassDateDialogVisible = false;
            enrollment_year_tablePutInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addClassDateDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 入学年份配置 编辑 dialog -->
    <el-dialog
      title="编辑入学年份"
      :visible.sync="editClassDateDialogVisible"
      width="50%"
    >
      <el-form
        :model="editClassDateForm"
        :rules="editClassDateFormRules"
        ref="editClassDateFormRef"
        label-width="120px"
      >
        <el-form-item label="入学年份" prop="year">
          <el-input
            v-model="editClassDateForm.year"
            placeholder="请输入入学年份"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editClassDateDialogVisible = false;
            enrollment_year_tableStoreInfo();
          "
          >保 存</el-button
        >
        <el-button @click="editClassDateDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 活动类型配置 新增 dialog -->
    <el-dialog
      title="新增活动类型"
      :visible.sync="addActivityTypeDialogVisible"
      width="50%"
    >
      <el-form
        :model="addActivityTypeForm"
        :rules="addActivityTypeFormRules"
        ref="addActivityTypeFormRef"
        label-width="120px"
      >
        <el-form-item label="活动类型" prop="activityType">
          <el-input
            v-model="addActivityTypeForm.activityType"
            placeholder="请输入活动类型"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addActivityTypeDialogVisible = false;
            basic_activity_tablePutInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addActivityTypeDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 活动类型配置 编辑 dialog -->
    <el-dialog
      title="编辑活动类型"
      :visible.sync="editActivityTypeDialogVisible"
      width="50%"
    >
      <el-form
        :model="editActivityTypeForm"
        :rules="editActivityTypeFormRules"
        ref="editActivityTypeFormRef"
        label-width="120px"
      >
        <el-form-item label="活动类型" prop="activityType">
          <el-input
            v-model="editActivityTypeForm.activityType"
            placeholder="请输入活动类型"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editActivityTypeDialogVisible = false;
            basic_activity_tableStoreInfo();
          "
          >保 存</el-button
        >
        <el-button @click="editActivityTypeDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 日常表现配置 新增 dialog -->
    <el-dialog
      title="新增日常表现"
      :visible.sync="addDailyPerformanceDialogVisible"
      width="50%"
    >
      <el-form
        :model="addDailyPerformanceForm"
        :rules="addDailyPerformanceFormRules"
        ref="addDailyPerformanceFormRef"
        label-width="120px"
      >
        <el-form-item label="日常表现" prop="behavior">
          <el-input
            v-model="addDailyPerformanceForm.behavior"
            placeholder="请输入日常表现"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addDailyPerformanceDialogVisible = false;
            basic_behavior_tablePutInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addDailyPerformanceDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 日常表现配置 编辑 dialog -->
    <el-dialog
      title="编辑日常表现"
      :visible.sync="editDailyPerformanceDialogVisible"
      width="50%"
    >
      <el-form
        :model="editDailyPerformanceForm"
        :rules="editDailyPerformanceFormRules"
        ref="editDailyPerformanceFormRef"
        label-width="120px"
      >
        <el-form-item label="日常表现" prop="behavior">
          <el-input
            v-model="editDailyPerformanceForm.behavior"
            placeholder="请输入日常表现"
            style="width: 40%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editDailyPerformanceDialogVisible = false;
            basic_behavior_tableStoreInfo();
          "
          >保 存</el-button
        >
        <el-button @click="editDailyPerformanceDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BasicInformation",
  data() {
    return {
      addDailyPerformanceDialogVisible: false,
      addDailyPerformanceForm: {},
      addDailyPerformanceFormRules: {
        behavior: [
          {
            required: true,
            message: "请输入日常表现",
            trigger: "blur",
          },
        ],
      },
      editDailyPerformanceDialogVisible: false,
      editDailyPerformanceForm: {},
      editDailyPerformanceFormRules: {
        dailyPerformance: [
          {
            behavior: true,
            message: "请输入日常表现",
            trigger: "blur",
          },
        ],
      },
      editActivityTypeDialogVisible: false,
      editActivityTypeForm: {},
      editActivityTypeFormRules: {
        activityType: [
          {
            required: true,
            message: "请输入活动类型",
            trigger: "blur",
          },
        ],
      },
      addActivityTypeDialogVisible: false,
      addActivityTypeForm: {},
      addActivityTypeFormRules: {
        activityType: [
          {
            required: true,
            message: "请输入活动类型",
            trigger: "blur",
          },
        ],
      },
      editClassDateDialogVisible: false,
      editClassDateForm: {},
      editClassDateFormRules: {
        year: [
          {
            required: true,
            message: "请输入入学年份",
            trigger: "blur",
          },
        ],
      },
      addClassDateDialogVisible: false,
      addClassDateForm: {},
      addClassDateFormRules: {
        year: [
          {
            required: true,
            message: "请输入入学年份",
            trigger: "blur",
          },
        ],
      },
      editClassDialogVisible: false,
      editClassFormRules: {
        className: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        classDate: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "change",
          },
        ],
        classTeacher: [
          {
            required: true,
            message: "请选择班主任",
            trigger: "change",
          },
        ],
      },
      editClassForm: {},
      addClassDialogVisible: false,
      addClassFormRules: {
        className: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        classDate: [
          {
            required: true,
            message: "请选择入学年份",
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
      },
      addClassForm: {},
      classTableData: {
        lessons: [
          "08:00-09:00",
          "09:00-10:00",
          "10:00-11:00",
          "11:00-12:00",
          "13:00-14:00",
          "14:00-15:00",
          "15:00-16:00",
          "16:00-17:00",
        ],
        courses: [
          ["", "", "", "", "", "", "", ""],
          ["生物", "物理", "化学", "政治", "历史", "英语", "", "语文"],
          ["语文", "数学", "英语", "历史", "", "化学", "物理", "生物"],
          ["生物", "", "化学", "政治", "历史", "英语", "数学", "语文"],
          ["语文", "数学", "英语", "历史", "政治", "", "物理", "生物"],
          ["生物", "物理", "化学", "", "历史", "英语", "数学", "语文"],
          ["语文", "数学", "英语", "", "", "", "", ""],
        ],
      },
      addDialogVisible: false,
      activeName: "classConfiguration",
      optionsOfClassDate: [
        {
          valueOfClassDate: "2020",
          label: "2020",
        },
        {
          valueOfClassDate: "2019",
          label: "2019",
        },
      ],
      valueOfClassDate: "",
      optionsOfTeacherName: [
        {
          valueOfTeacherName: "张老师（TC001）",
          label: "张老师（TC001）",
        },
        {
          valueOfTeacherName: "林老师（TC002）",
          label: "林老师（TC002）",
        },
      ],
      valueOfTeacherName: "",
      optionsOfClassTeacher: [
        {
          valueOfClassTeacher: "张老师（TC001）",
          label: "张老师（TC001）",
        },
        {
          valueOfClassTeacher: "陈老师（TC002）",
          label: "陈老师（TC002）",
        },
      ],
      valueOfClassTeacher: "",
      optionsOfCourseName: [
        {
          valueOfCourseName: "线性代数",
          label: "线性代数",
        },
        {
          valueOfCourseName: "大学英语",
          label: "大学英语",
        },
        {
          valueOfCourseName: "大学物理",
          label: "大学物理",
        },
      ],
      valueOfCourseName: "",
      currentPageClass: 1,
      pagesizeClass: 7,
      classConfiguration: [
        {
          className: "19软1",
          classDate: "2019",
          classTeacher: "hx",
        },
        {
          className: "19软2",
          classDate: "2019",
          classTeacher: "lyx",
        },
      ],

      currentPageEntryYear: 1,
      pagesizeEntryYear: 7,
      entryYearConfigurationTable: [
        {
          classDate: "2019",
        },
        {
          classDate: "2019",
        },
      ],

      currentPageDailyPerformance: 1,
      pagesizeDailyPerformance: 7,
      dailyPerformanceConfiguration: [
        {
          dailyPerformance: "德育",
        },
        {
          dailyPerformance: "文体",
        },
      ],

      currentPageActiveType: 1,
      pagesizeActiveType: 7,
      activeTypeConfiguration: [
        {
          activityType: "艺术",
        },
        {
          activityType: "学习",
        },
      ],
    };
  },
  created() {
    this.basic_behavior_tableprint();
    this.basic_activity_tableprint();
    this.enrollment_year_tableprint();
    this.Class_tableprint();
  },
  mounted() {},
  methods: {

    changeClick(tab) {
      if (tab.name == "classConfiguration") {
        this.Class_tableprint();
      }
      if (tab.name == "dailyPerformanceConfiguration") {
        this.basic_behavior_tableprint();
      }
      if (tab.name == "entryYearConfiguration") {
        this.enrollment_year_tableprint();
      }
      if (tab.name == "activeTypeConfiguration") {
        this.basic_activity_tableprint();
      }
    },
    changeIsUse(row) {
      console.log(row);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/enrollment_year/YearIsUse",
        params: {
          _id: row._id,
          isUse: row.isUse,
        },
      })
        .then(() => {
          this.enrollment_year_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSizeChangeClass: function (size) {
      this.pagesizeClass = size;
    },
    handleCurrentChangeClass: function (currentPage) {
      this.currentPageClass = currentPage;
    },
    handleSizeChangeYear: function (size) {
      this.pagesizeEntryYear = size;
    },
    handleCurrentChangeYear: function (currentPage) {
      this.currentPageEntryYear = currentPage;
    },
    handleSizeChangePerformance: function (size) {
      this.pagesizeDailyPerformance = size;
    },
    handleCurrentChangePerformance: function (currentPage) {
      this.currentPageDailyPerformance = currentPage;
    },
    handleSizeChangeType: function (size) {
      this.pagesizeActiveType = size;
    },
    handleCurrentChangeType: function (currentPage) {
      this.currentPageActiveType = currentPage;
    },
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    },
    // 表格渲染
    // that 是vue中的this这里需要保存一下 我也不知道为啥
    basic_behavior_tableprint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "	http://zh.zhihao.kooboo.site/basic_behavior/getAllBehavior",
      })
        .then((response) => {
          console.log(response);
          // that.classConfiguration = response.data;
          //  that.entryYearConfigurationTable = response.data;
          that.dailyPerformanceConfiguration = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_activity_tableprint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "	http://zh.zhihao.kooboo.site/basic_activity/getAllActivity",
      })
        .then((response) => {
          console.log(response);
          // that.classConfiguration = response.data;
          //  that.entryYearConfigurationTable = response.data;
          that.activeTypeConfiguration = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Class_tableprint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "	http://zh.zhihao.kooboo.site/Class_table/getAllClass",
      })
        .then((response) => {
          console.log(response);
          that.classConfiguration = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    enrollment_year_tableprint() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/enrollment_year/getAllYear",
      })
        .then((response) => {
          console.log(response);
          that.entryYearConfigurationTable = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_behavior_tableDeleteInfo(row) {
      console.log(row);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/basic_behavior/deleteBehavior",
        params: {
          behavior: row.behavior,
        },
      })
        .then(() => {
          this.basic_behavior_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_activity_tableDeleteInfo(row) {
      console.log(row);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/basic_activity/deleteActivity",
        params: {
          activityType: row.activityType,
        },
      })
        .then(() => {
          this.basic_activity_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Class_tableDeleteInfo(row) {
      console.log(row);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/Class_table/deleteClass",
        params: {
          className: row.className,
        },
      })
        .then(() => {
          this.Class_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    enrollment_year_tableDeleteInfo(row) {
      console.log(row);
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/enrollment_year/deleteYear",
        params: {
          year: row.year,
        },
      })
        .then(() => {
          this.enrollment_year_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_behavior_tableEditInfo(row) {
      // 这里row是dataTable数组
      let that = this;
      console.log(row);
      that.editDailyPerformanceForm = {};
      that.editDailyPerformanceForm = row;
    },
    basic_activity_tableEditInfo(row) {
      // 这里row是dataTable数组
      let that = this;
      console.log(row);
      that.editActivityTypeForm = {};
      that.editActivityTypeForm = row;
    },
    Class_tableEditInfo(row) {
      let that = this;
      console.log(row);
      that.editClassForm = {};
      that.editClassForm = row;
    },
    enrollment_year_tableEditInfo(row) {
      // 这里row是dataTable数组
      let that = this;
      console.log(row);
      that.editClassDateForm = {};
      that.editClassDateForm = row;
    },
    basic_behavior_tableStoreInfo() {
      
      let that = this;
      console.log(that.editDailyPerformanceForm);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/basic_behavior/updateBehavior",
        data: {
          behavior: that.editDailyPerformanceForm.behavior,
          _id: that.editDailyPerformanceForm._id,
        },
      })
        .then(() => {
          this.basic_behavior_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_activity_tableStoreInfo() {
      let that = this;
      console.log(that.editActivityTypeForm);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/basic_activity/updateActivity",
        data: {
          activityType: that.editActivityTypeForm.activityType,
          _id: that.editActivityTypeForm._id,
        },
      })
        .then(() => {
          this.basic_activity_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Class_tableStoreInfo() {
      let that = this;
      console.log(that.editDailyPerformanceForm);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_table/updateClass",
        data: {
          className: that.editClassForm.className,
          classTeacher: that.editClassForm.classTeacher,
          classDate: that.editClassForm.classDate,
          _id: that.editClassForm._id,
        },
      })
        .then(() => {
          this.Class_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    enrollment_year_tableStoreInfo() {
      let that = this;
      console.log(that.editClassDateForm);
      // console.log(that.editForm.activityType);
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/enrollment_year/updateYear",
        data: {
          year: that.editClassDateForm.year,
          _id: that.editClassDateForm._id,
        },
      })
        .then(() => {
          this.enrollment_year_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    basic_behavior_tableNewInfo() {
      this.addDailyPerformanceForm = {};
    },
    basic_activity_tableNewInfo() {
      this.addActivityTypeForm = {};
    },
    Class_tableNewInfo() {
      this.addClassForm = {};
    },
    enrollment_year_tableNewInfo() {
      this.addClassDateForm = {};
    },
    basic_behavior_tablePutInfo() {
      let that = this;
      // todo push新增的信息进tableData
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/basic_behavior/addBehavior",
        data: {
          behavior: that.addDailyPerformanceForm.behavior,
        },
      })
        .then(() => {
          that.basic_behavior_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addDailyPerformanceForm = {};
    },
    basic_activity_tablePutInfo() {
      let that = this;
      // todo push新增的信息进tableData
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/basic_activity/addActivity",
        data: {
          activityType: that.addActivityTypeForm.activityType,
        },
      })
        .then(() => {
          that.basic_activity_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addActivityTypeForm = {};
    },
    Class_tablePutInfo() {
      let that = this;
      // todo push新增的信息进tableData
      this.$axios({
        method: "POST",
        url: "http://zh.zhihao.kooboo.site/Class_table/addClass",
        data: {
          classTeacher: that.addClassForm.classTeacher,
          classDate: that.addClassForm.classDate,
          className: that.addClassForm.className,
        },
      })
        .then(() => {
          that.Class_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addClassForm = {};
    },
    enrollment_year_tablePutInfo() {
      let that = this;
      // todo push新增的信息进tableData
      this.$axios({
        method: "POST",
        url: "	http://zh.zhihao.kooboo.site/enrollment_year/addYear",
        data: {
          year: that.addClassDateForm.year,
        },
      })
        .then(() => {
          that.enrollment_year_tableprint();
        })
        .catch((error) => {
          console.log(error);
        });
      that.addClassDateForm = {};
    },
    searchInfo() {
      let that = this;
      this.$axios({
        method: "POST",
        url: "	http://zh.zhihao.kooboo.site/Class_table/searchClass",
        params: {
          classDate: that.valueOfClassDate,
        },
      })
        .then((response) => {
          that.classConfiguration = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    calTableDataClass: function () {
      return this.classConfiguration.slice(
        (this.currentPageClass - 1) * this.pagesizeClass,
        this.currentPageClass * this.pagesizeClass
      );
    },
    calTableDataEntryYear: function () {
      return this.entryYearConfigurationTable.slice(
        (this.currentPageEntryYear - 1) * this.pagesizeEntryYear,
        this.currentPageEntryYear * this.pagesizeEntryYear
      );
    },
    calTableDataDailyPerformance: function () {
      return this.dailyPerformanceConfiguration.slice(
        (this.currentPageDailyPerformance - 1) * this.pagesizeDailyPerformance,
        this.currentPageDailyPerformance * this.pagesizeDailyPerformance
      );
    },
    calActiveTypeConfiguration: function () {
      return this.activeTypeConfiguration.slice(
        (this.currentPageActiveType - 1) * this.pagesizeActiveType,
        this.currentPageActiveType * this.pagesizeActiveType
      );
    },
  },
};
</script>

<style>
.BasicInformation-buttonCotainer-schedule {
  flex: 3;
}

.BasicInformation-paginationCotainer-schedule {
  flex: 7;
}

.BasicInformation-buttonCotainer {
  flex: 3;
  display: inline-block;
}

.BasicInformation-selectCotainer {
  justify-content: space-between;
}

.BasicInformation-SelectClassDate {
  padding: 0 15px 0 0;
  width: 130px;
}

.BasicInformation-selectCotainer-schedule {
  flex: 7;
  display: flex;
  justify-content: flex-end;
}
</style>
