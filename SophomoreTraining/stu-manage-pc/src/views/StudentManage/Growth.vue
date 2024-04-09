<template>
  <div>
    <!-- TODO -->
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">学生成长</span>
    </div>
    <div class="tabBar">
      <!-- 标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="培养建议" name="dailyBehaviorGrade">
          <!-- 第一行 -->
          <div class="functionBarInTab">
            <div class="Growth-buttonCotainer">
              <el-button type="success">批量发送培养建议</el-button>
              <el-button
                type="primary"
                @click="massEditSuggetDialogVisible = true"
                >批量编辑培养建议</el-button
              >
            </div>

            <div class="Growth-selectCotainer">
              <el-select
                class="Growth-SelectYear"
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
                class="Growth-SelectClass"
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
                class="Growth-InputID"
                v-model="inputID"
                placeholder="学号"
                clearable
              >
              </el-input>
              <el-input
                class="Growth-InputName"
                v-model="inputName"
                placeholder="姓名"
                clearable
              >
              </el-input>
              <el-button
                class="Growth-SearchButton"
                type="primary"
                @click="searchDevelop()"
                >搜索</el-button
              >
            </div>
          </div>

          <!-- 第二行 表格 -->
          <div class="dataTable">
            <el-table :data="calTableDataOfDevelop" border style="width: 100%">
              <!--  -->
              <el-table-column
                prop="stuName"
                label="姓名"
                align="center"
              ></el-table-column>
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column
                prop="schoolDate"
                label="入学年份"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuClass"
                label="班级"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="sugget"
                label="培养建议"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="suggestUpdateTime"
                label="更新时间"
                align="center"
              ></el-table-column>
              <!--  -->

              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editSuggetDialogVisible = true;
                      editDevelop(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 第三行 分页 -->
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeOfDevelop"
              @current-change="handleCurrentChangeOfDevelop"
              :current-page="currentPageDevelop"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeDevelop"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfDevelop.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成长数据" name="midGrade">
          <!-- 第二行 -->
          <div class="functionBarInTab">
            <div class="Growth-buttonCotainer">
              <el-button type="success">批量发送成长通知</el-button>
              <el-button type="primary" @click="moreFocus()">批量设置重点关注</el-button>
              <el-button
                type="primary"
                @click="massEditGrowthNoticeDialogVisible = true;messEdit()"
                >批量编辑成长通知</el-button
              >
            </div>

            <div class="Growth-selectCotainer">
              <el-input
                v-model="inputID"
                placeholder="学号"
                class="Growth-InputID"
                clearable
              ></el-input>

              <el-input
                v-model="inputName"
                placeholder="姓名"
                class="Growth-InputName"
                clearable
              ></el-input>

              <el-input
                v-model="inputClass"
                placeholder="班级"
                class="Growth-InputClass"
                clearable
              ></el-input>

              <el-select
                v-model="valueOfAttention"
                placeholder="是否重点关注"
                class="Growth-SelectAttention"
                clearable
              >
                <el-option
                  v-for="item in optionsOfAttention"
                  :key="item.valueOfAttention"
                  :label="item.label"
                  :value="item.valueOfAttention"
                >
                </el-option>
              </el-select>

              <el-button
                type="primary"
                class="Growth-SearchButton"
                @click="searchGrowth()"
                >搜索</el-button
              >
            </div>
          </div>

          <!-- 第三行 -->
          <div class="Growth-secondButton">
            <el-button type="success">发送重点关注通知</el-button>
            <el-button type="primary" @click="moreNoFocus()">批量取消重点关注</el-button>
          </div>

          <!-- 第四行 表格 -->
          <div class="dataTable">
            <el-table
              :data="calTableDataOfGrowth"
              border
              style="width: 100%"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stuName"
                label="姓名"
                align="center"
              ></el-table-column>
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column
                prop="schoolDate"
                label="入学年份"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuClass"
                label="班级"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="growthNotice"
                label="成长通知"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="focusUpdateTime"
                label="更新时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="isFocus"
                label="是否重点关注"
                align="center"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editGrowthNoticeDialogVisible = true;
                      editGrowth(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 第五行 分页 -->
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeOfGrowth"
              @current-change="handleCurrentChangeOfGrowth"
              :current-page="currentPageGrowth"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeGrowth"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfGrowth.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="获奖情况" name="finalGrade">
          <!-- 第一行 按钮 -->
          <div class="functionBarInTab">
            <div class="Growth-buttonCotainer-award"></div>
            <div class="Growth-selectCotainer-award">
              <el-select
                v-model="valueOfYear"
                placeholder="入学年份"
                class="Growth-SelectYear"
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
                class="Growth-SelectClass"
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
                class="Growth-InputID"
                clearable
              ></el-input>
              <el-input
                v-model="inputName"
                placeholder="姓名"
                class="Growth-InputName"
                clearable
              ></el-input>
              <el-select
                v-model="valueOfAward"
                placeholder="获奖情况"
                class="Growth-SelectAward"
                clearable
              >
                <el-option
                  v-for="item in optionsOfAward"
                  :key="item.valueOfAward"
                  :label="item.label"
                  :value="item.valueOfAward"
                >
                </el-option>
              </el-select>

              <el-button
                type="primary"
                class="Growth-SearchButton"
                @click="searchAward()"
                >搜索</el-button
              >
            </div>
          </div>
          <!-- 第二行 表格 -->
          <div class="dataTable">
            <el-table :data="calTableDataOfAward" border style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stuName"
                label="姓名"
                align="center"
              ></el-table-column>
              <el-table-column prop="stuId" label="学号" align="center">
              </el-table-column>
              <el-table-column
                prop="schoolDate"
                label="入学年份"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="stuClass"
                label="班级"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stuAward"
                label="获奖情况"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="awardUpdateTime"
                label="更新时间"
              ></el-table-column>
              <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="
                      editStuAwardDialogVisible = true;
                      editAward(scope.row);
                    "
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="tableTag">
            <el-pagination
              @size-change="handleSizeChangeOfAward"
              @current-change="handleCurrentChangeOfAward"
              :current-page="currentPageAward"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesizeAward"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDataOfAward.length"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 批量编辑学生培养建议 dialog -->
    <el-dialog
      title="批量编辑学生培养建议"
      :visible.sync="massEditSuggetDialogVisible"
      width="50%"
    >
      <el-form v-model="massEditSuggetForm">
        <el-form-item label="培养建议" prop="sugget">
          <el-input
            type="textarea"
            v-model="massEditSuggetForm.sugget"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            massEditSuggetDialogVisible = false;
            putInfo();
          "
          >保 存</el-button
        >
        <el-button @click="massEditSuggetDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑学生培养建议 dialog -->
    <el-dialog
      title="编辑学生培养建议"
      :visible.sync="editSuggetDialogVisible"
      width="50%"
    >
      <el-form v-model="editSuggetForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ editSuggetForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ editSuggetForm.stuId }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="班级：">
              {{ editSuggetForm.stuClass }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="培养建议" prop="sugget">
          <el-input type="textarea" v-model="editSuggetForm.sugget"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editSuggetDialogVisible = false;
            storeDevelop();
          "
          >保 存</el-button
        >
        <el-button @click="editSuggetDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 批量编辑学生成长通知 -->
    <el-dialog
      title="批量编辑学生成长通知"
      :visible.sync="massEditGrowthNoticeDialogVisible"
      width="50%"
    >
      <el-form v-model="massEditGrowthNoticeForm">
        <el-form-item label="成长通知" prop="growthNotice">
          <el-input
            type="textarea"
            v-model="massEditGrowthNoticeForm.growthNotice"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            massEditGrowthNoticeDialogVisible = false;
            moreGrowth();
          "
          >保 存</el-button
        >
        <el-button @click="massEditGrowthNoticeDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑学生成长通知 -->
    <el-dialog
      title="编辑学生成长通知"
      :visible.sync="editGrowthNoticeDialogVisible"
      width="50%"
    >
      <el-form v-model="editGrowthNoticeForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ editGrowthNoticeForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ editGrowthNoticeForm.stuId }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="班级：">
              {{ editGrowthNoticeForm.stuClass }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="成长通知" prop="growthNotice">
          <el-input
            type="textarea"
            v-model="editGrowthNoticeForm.growthNotice"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editGrowthNoticeDialogVisible = false;
            storeGrowth();
          "
          >保 存</el-button
        >
        <el-button @click="editGrowthNoticeDialogVisible = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑学生获奖情况 -->
    <el-dialog
      title="编辑学生获奖情况"
      :visible.sync="editStuAwardDialogVisible"
      width="50%"
    >
      <el-form :model="editStuAwardForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名:">
              {{ editStuAwardForm.stuName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学号：">
              {{ editStuAwardForm.stuId }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="班级：">
              {{ editStuAwardForm.stuClass }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="addAwardDialogVisible = true"
        >添加奖项</el-button
      >
      <el-table :data="awardsData" border style="width: 100%; margin-top: 5%">
        <el-table-column prop="prize" label="奖项" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="awardLevel"
          label="奖项级别"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="awardTime" label="获奖时间" align="center">
        </el-table-column>
        <el-table-column
          prop="certificateAttachment"
          label="证书附件"
          align="center"
        >
          <el-button
            type="text"
            style="font-weight: bold"
            @click="viewCertificateDialogVisible = true"
            >查看证书</el-button
          >
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="editAwardDialogVisible = true"
          ></el-button>
          <el-button type="text" icon="el-icon-delete"></el-button>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editStuAwardDialogVisible = false;
            putInfo();
          "
          >保 存</el-button
        >
        <el-button @click="editStuAwardDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 添加奖项dialog -->
    <el-dialog
      title="添加奖项"
      :visible.sync="addAwardDialogVisible"
      width="30%"
    >
      <el-form :model="addAwardForm">
        <el-form-item label="奖项" prop="prize">
          <el-input v-model="addAwardForm.prize" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="奖项级别" prop="awardLevel">
          <el-select
            v-model="valueOfAwardLevel"
            placeholder="选择级别"
            style="width:35%"
          >
            <el-option
              v-for="item in optionsOfAwardLevel"
              :key="item.valueOfAwardLevel"
              :label="item.label"
              :value="item.valueOfAwardLevel"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获奖时间" prop="awardTime">
          <el-input
            v-model="addAwardForm.awardTime"
            label="请输入获奖时间"
            style="width: 35%"
          ></el-input>
        </el-form-item>
        <el-form-item label="证书附件" prop="certificateAttachment">
          <el-button type="primary">上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            addAwardDialogVisible = false;
            putInfo();
          "
          >保 存</el-button
        >
        <el-button @click="addAwardDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 编辑奖项dialog -->
    <el-dialog
      title="编辑奖项"
      :visible.sync="editAwardDialogVisible"
      width="30%"
    >
      <el-form :model="editAwardForm">
        <el-form-item label="奖项" prop="prize">
          <el-input v-model="editAwardForm.prize" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="奖项级别" prop="awardLevel">
          <el-select
            v-model="valueOfAwardLevel"
            placeholder="选择级别"
            style="width:35%"
          >
            <el-option
              v-for="item in optionsOfAwardLevel"
              :key="item.valueOfAwardLevel"
              :label="item.label"
              :value="item.valueOfAwardLevel"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获奖时间" prop="awardTime">
          <el-input
            v-model="editAwardForm.awardTime"
            label="请输入获奖时间"
            style="width: 35%"
          ></el-input>
        </el-form-item>
        <el-form-item label="证书附件" prop="certificateAttachment">
          <el-button type="primary">上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            editAwardDialogVisible = false;
            putInfo();
          "
          >保 存</el-button
        >
        <el-button>取 消</el-button>
      </span>
    </el-dialog>
    <!-- 查看证书dialog -->
    <el-dialog
      title="查看证书"
      :visible.sync="viewCertificateDialogVisible"
      width="30%"
    >
      <div>
        <img src="../../assets/Pics/certificate.png" width="400px" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      editAwardDialogVisible: false,
      editAwardForm: {},
      viewCertificateDialogVisible: false,
      addAwardForm: {},
      optionsOfAwardLevel: [
        {
          valueOfAwardLevel: "选项1",
          label: "国际级",
        },
        {
          valueOfAwardLevel: "选项2",
          label: "国家级",
        },
        {
          valueOfAwardLevel: "选项3",
          label: "省级",
        },
        {
          valueOfAwardLevel: "选项4",
          label: "市级",
        },
        {
          valueOfAwardLevel: "选项5",
          label: "校级",
        },
      ],
      valueOfAwardLevel: "",
      addAwardDialogVisible: false,

      editStuAwardForm: {},
      editStuAwardDialogVisible: false,
      awardsData: [
        {
          prize: "校三好学生",
          awardLevel: "校级",
          awardTime: "2020-10-10",
        },
        {
          prize: "大学生英语竞赛一等奖",
          awardLevel: "省级",
          awardTime: "2020-10-10",
        },
      ],
      editGrowthNoticeDialogVisible: false,
      editGrowthNoticeForm: {
        sugget: "",
      },
      massEditGrowthNoticeDialogVisible: false,
      massEditGrowthNoticeForm: {},
      editSuggetDialogVisible: false,
      editSuggetForm: {},
      massEditSuggetDialogVisible: false,
      massEditSuggetForm: {},
      activeName: "dailyBehaviorGrade",
      optionsOfAward: [
        {
          valueOfAward: "有获奖",
          label: "有获奖",
        },
        {
          valueOfAward: "无获奖",
          label: "无获奖",
        },
      ],
      valueOfAward: "",
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
      optionsOfAttention: [
        {
          valueOfAttention: "是",
          label: "是",
        },
        {
          valueOfAttention: "否",
          label: "否",
        },
      ],
      valueOfAttention: "",
      optionsOfClass: [
        {
          valueOfClass: "选项1",
          label: "20计算机1班",
        },
        {
          valueOfClass: "选项2",
          label: "20计算机2班",
        },
      ],
      valueOfClass: "",

      currentPageDevelop: 1,
      pagesizeDevelop: 20,
      tableDataOfDevelop: [
        {
          stdID: "19251210xx",
          name: "xd",
          year: "2020",
          class: "19软1",
          trainAdvice: "创新和意识能力：xxx",
          updateTime: "2021-07-21 13:14",
        },
        {
          stdID: "19251210xx",
          name: "xjc",
          year: "2020",
          class: "19软1",
          trainAdvice: "创新和意识能力：xxx",
          updateTime: "2021-07-21 13:14",
        },
      ],

      currentPageGrowth: 1,
      pagesizeGrowth: 20,
      tableDataOfGrowth: [],

      currentPageAward: 1,
      pagesizeAward: 20,
      tableDataOfAward: [],
      inputID: "",
      inputName: "",
      inputClass: "",
    };
  },
  created() {
    this.tablePrintDevelop();
    this.tablePrintGrowth();
    this.tablePrintAward();
  },
  mounted() {},
  methods: {
    // 选中框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // handleClick() {},
    // 表格渲染
    tablePrintDevelop() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/list",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfDevelop = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tablePrintGrowth() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/list",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfGrowth = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tablePrintAward() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/list",
      })
        .then((response) => {
          console.log(response);
          that.tableDataOfAward = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 搜索按钮
    searchDevelop() {
      let that = this;
      this.$axios({
        method: "GET",
        //
        url: "http://zh.zhihao.kooboo.site/growth/search",
        params: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
        },
      })
        .then((response) => {
          that.tableDataOfDevelop = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchGrowth() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/search2",
        params: {
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
          isFocus: that.valueOfAttention,
        },
      })
        .then((response) => {
          that.tableDataOfGrowth = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchAward() {
      let that = this;
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/search3",
        params: {
          schoolDate: that.valueOfYear,
          stuClass: that.valueOfClass,
          stuId: that.inputID,
          stuName: that.inputName,
          stuAward: that.valueOfAward,
        },
      })
        .then((response) => {
          that.tableDataOfAward = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editDevelop(row) {
      this.editSuggetForm = row;
    },
    editGrowth(row) {
      this.editGrowthNoticeForm = row;
    },
    editAward(row) {
      this.editStuAwardForm = row;
    },
    storeDevelop() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/edit",
        params: {
          stuId: that.editSuggetForm.stuId,
          suggest: that.editSuggetForm.sugget,
          suggestUpdateTime: updatetime,
        },
      })
        .then(() => {
          that.tablePrintDevelop();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    storeGrowth() {
      let that = this;
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      this.$axios({
        method: "GET",
        url: "http://zh.zhihao.kooboo.site/growth/edit",
        params: {
          stuId: that.editGrowthNoticeForm.stuId,
          growthNotice: that.editGrowthNoticeForm.growthNotice,
          focusUpdateTime: updatetime,
        },
      })
        .then(() => {
          that.tablePrintGrowth();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    moreFocus() {
      var ids = this.multipleSelection.map((m) => m.stuId);
      console.log(ids);
      for (let i = 0; i < ids.length; i++) {
            console.log(ids[i]);
            this.$axios({
              method: "POST",
              url: "http://zh.zhihao.kooboo.site/growth/open",
              data: {
                stuId: ids[i],
                isFocus: "是",
              },
            })
              .then(() => {
                this.tablePrintGrowth();
              })
              .catch((error) => {
                console.log(error);
              });
          }
    },
    moreNoFocus() {
      var ids = this.multipleSelection.map((m) => m.stuId);
      console.log(ids);
      for (let i = 0; i < ids.length; i++) {
            console.log(ids[i]);
            this.$axios({
              method: "POST",
              url: "http://zh.zhihao.kooboo.site/growth/open",
              data: {
                stuId: ids[i],
                isFocus: "否",
              },
            })
              .then(() => {
                this.tablePrintGrowth();
              })
              .catch((error) => {
                console.log(error);
              });
          }
    },
    moreGrowth() {
      var Time = new Date();
      var updatetime = Time.toLocaleString();
      var ids = this.multipleSelection.map((m) => m.stuId);
      console.log(ids);
      for (let i = 0; i < ids.length; i++) {
            console.log(ids[i]);
            this.$axios({
              method: "POST",
              url: "http://zh.zhihao.kooboo.site/growth/edit",
              data: {
                stuId: ids[i],
                growthNotice: this.massEditGrowthNoticeForm.growthNotice,
                focusUpdateTime: updatetime,
              },
            })
              .then(() => {
                this.tablePrintGrowth();
              })
              .catch((error) => {
                console.log(error);
              });
          }
    },
    messEdit() {
      this.massEditGrowthNoticeForm = {};
    },
    handleSizeChangeOfDevelop: function(size) {
      this.pagesizeDevelop = size;
    },
    handleCurrentChangeOfDevelop: function(currentPage) {
      this.currentPageDevelop = currentPage;
    },
    handleSizeChangeOfGrowth: function(size) {
      this.pagesizeGrowth = size;
    },
    handleCurrentChangeOfGrowth: function(currentPage) {
      this.currentPageGrowth = currentPage;
    },
    handleSizeChangeOfAward: function(size) {
      this.pagesizeAward = size;
    },
    handleCurrentChangeOfAward: function(currentPage) {
      this.currentPageAward = currentPage;
    },
  },
  computed: {
    calTableDataOfDevelop: function() {
      return this.tableDataOfDevelop.slice(
        (this.currentPageDevelop - 1) * this.pagesizeDevelop,
        this.currentPageDevelop * this.pagesizeDevelop
      );
    },
    calTableDataOfGrowth: function() {
      return this.tableDataOfGrowth.slice(
        (this.currentPageGrowth - 1) * this.pagesizeGrowth,
        this.currentPageGrowth * this.pagesizeGrowth
      );
    },
    calTableDataOfAward: function() {
      return this.tableDataOfAward.slice(
        (this.currentPageAward - 1) * this.pagesizeAward,
        this.currentPageAward * this.pagesizeAward
      );
    },
  },
};
</script>

<style>
.Growth-buttonCotainer {
  flex: 5;
}

.Growth-selectCotainer {
  flex: 5;
  display: flex;
  justify-content: space-between;
}

.Growth-buttonCotainer-award {
  flex: 4;
}

.Growth-selectCotainer-award {
  flex: 6;
  display: flex;
  justify-content: space-between;
}

.Growth-SelectTerm {
  width: 170px;
}

.Growth-SelectYear {
  width: 130px;
}

.Growth-SelectClass {
  width: 130px;
}

.Growth-SelectAttention {
  width: 130px;
}

.Growth-SelectAward {
  width: 110px;
}

.Growth-InputID {
  width: 110px;
}

.Growth-InputName {
  width: 110px;
}

.Growth-InputClass {
  width: 110px;
}

.Growth-secondButton {
  box-sizing: border-box;
  padding: 15px 0 0 0;
}
</style>
