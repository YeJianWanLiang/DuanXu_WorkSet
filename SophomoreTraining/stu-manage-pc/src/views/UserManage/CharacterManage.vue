<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">角色管理</span>
    </div>

    <div class="functionBar">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <div class="CharacterManage-selectCotainer">
        <el-row v-model="filters" style="flex">
          <el-input
            class="CharacterManage-inputcharacterName"
            v-model="filters.name"
            placeholder="角色名称"
            clearable
            @clear="searchRole()"
          ></el-input>
          <el-select
            class="CharacterManage-selectEnabled"
            v-model="filters.isUse"
            placeholder="是否启用"
            clearable
            @clear="searchRole()"
          >
            <el-option
              v-for="item in optionsOfEnabled"
              :key="item.valueOfEnabled"
              :label="item.label"
              :value="item.valueOfEnabled"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="searchRole()">搜索</el-button>
        </el-row>
      </div>
    </div>

    <div class="dataTable">
      <el-table :data="calTableData" border style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="isBuitIn" label="是否内置" align="center">
        </el-table-column>
        <el-table-column prop="describe" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
             <template slot-scope="scope">
               <div>{{handleDate(scope.row.updateTime)}}</div>
				<div>{{handleTime(scope.row.updateTime)}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="isUse" label="是否启用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUse"
              active-color="#13ce66"
              inactive-color="#CCCCCC"
              :active-value="1"
              :inactive-value="0"
              @change="changeIsUse($event,scope.$index,scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.isBuitIn == '0'"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              v-if="scope.row.isBuitIn == '0'"
              @click="handleDelete(scope.$index, scope.row)"
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
        :page-sizes="[7, 14, 21, 28]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableList.length"
      >
      </el-pagination>
    </div>

    <!-- dialog -->
    <!-- todo内容主体区域 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name" label="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="describe">
          <el-input type="textarea" v-model="addForm.describe"
            >请输入角色描述</el-input
          >
        </el-form-item>
        <el-form-item label="管辖范围" prop="jurisdiction">
          <div class="block">
            <span class="jurisdiction">
            <el-cascader
              :options="options"
              @change="handleChange"
            ></el-cascader>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="菜单权限" prop="power">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1]"
            :default-checked-keys="[1, 2, 3, 4, 5, 6, 7]"
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="add">提 交</el-button>
        <el-button v-else type="primary" @click="update">提交</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  addRoleInfo,
  updateRoleInfo,
  getAllRoleInfo,
  searchRoleInfo,
  deleteRoleInfo,
  changeIsUse,
} from '@/network/Role_management.js'

// import Moment from 'moment'

// const defaultListQuery = {
//   name: null,
//   pageNum: 1,
//   pageSize: 5,
// }
export default {
  name: 'CharacterManage',
  data() {
    return {
      filters: {
        name: '',
        isUse: '',
      },
      data: [
        {
          id: 1,
          label: '数据采集',
          children: [
            {
              id: 3,
              label: '入学基础数据',
            },
            {
              id: 4,
              label: '上课签到统计',
            },
            {
              id: 5,
              label: '成绩统计数据',
            },
            {
              id: 6,
              label: '社团活动追踪',
            },
            {
              id: 7,
              label: '小问卷调查',
            },
          ],
        },
        {
          id: 2,
          label: '学生画像分析',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      value: [],
      options: [
        {
          value: '全校学生',
          label: '全校学生',
        },
        {
          value: '',
          label: '指定年级',
          children: [
            {
              value: '2018级',
              label: '2018级',
            },
            {
              value: '2019级',
              label: '2019级',
            },
            {
              value: '2020级',
              label: '2020级',
            },
            {
              value: '2021级',
              label: '2021级',
            },
          ],
        },
        {
          value: '',
          label: '指定班级',
          children: [
            {
              value: '18计算机1班',
              label: '18计算机1班',
            },
            {
              value: '18计算机2班',
              label: '18计算机2班',
            },
            {
              value: '19计算机1班',
              label: '19计算机1班',
            },
            {
              value: '19计算机2班',
              label: '19计算机2班',
            },
          ],
        },
      ],
      inputcharacterName: '',
      optionsOfEnabled: [
        {
          valueOfEnabled: '1',
          label: '是',
        },
        {
          valueOfEnabled: '0',
          label: '否',
        },
      ],
      valueOfEnabled: '',
    //   listQuery: Object.assign({}, defaultListQuery),
      currentPage: 1,
      pagesize: 7,
    //   total: 1,
      tableList: [],
      textMap: {
        create: '新增角色',
        update: '修改角色',
      },
      dialogStatus: '',
      addDialogVisible: false,
      addForm: {
        name: '',
        describe: '',
        jurisdiction: '',
        power: '',
      },
      addFormRules: {
          name: [{ required: true, message: "角色名称" , trigger: "blur" }],
          describe: [{ required: true, message: "角色描述", trigger: "blur" }],
        //   jurisdiction: [{ required: true, message: "管辖范围", trigger: "blur" }],
        //   power: [{ required: true, message: "菜单权限", trigger: "blur" }],
      },
    }
  },
  computed: {
    calTableData: function () {
        return this.tableList.slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
        );
    },
  },
  methods: {
    handleSizeChange: function(size) {
        this.pagesize = size;
        },
    handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
    },
    
    // handleDate(time) {
    //     return time.format("YYYY-MM-DD HH:mm:ss")
    // },
    handleDate(time){
		var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
		return Y+M+D;
	},
	handleTime(time){
		var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
		return h+m+s;
	},
    getAllRole() {
    //   let para = {
    //     pageNum: this.listQuery.pageNum,
    //     pageSize: this.listQuery.pageSize,
    //   }
    getAllRoleInfo().then((res) => {
        this.tableList = []
        this.tableList = res
      })
    },
    searchRole() {
       let para = {
          name: this.filters.name,
          isUse: this.filters.isUse,
        }
        searchRoleInfo(para).then((res) => {
          console.log(res)
          this.tableList = []
          this.tableList = res
        })
    },
    handleAdd() {
      this.addDialogVisible = true
      this.dialogStatus = 'create'
      this.addForm = {
        name: '',
        describe: '',
        jurisdiction: '',
        power: '',
      }
    },
    add() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
            //   let para = Object.assign({}, this.addForm)
            let para = this.addForm;
              console.log(para)
              addRoleInfo(para).then(() => {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                })
                this.$refs['addForm'].resetFields()
                this.addDialogVisible = false
                this.getAllRole()
              })
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })
    },
    handleUpdate(index, row) {
      this.addDialogVisible = true
      this.dialogStatus = 'update'
    //   this.addForm = Object.assign({}, row)
    this.addForm = row;
      // this.addForm = {
      //   name: row.name,
      //   describe: row.describe,
      //   // jurisdiction:"",
      //   // menuPermissions: ""
      // }
    },
    update() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            // let para = Object.assign({}, this.addForm)
            let para = this.addForm;
            console.log(para)
            updateRoleInfo(para).then(() => {
              this.$message({
                message: '修改成功',
                type: 'success',
              })
              this.$refs['addForm'].resetFields()
              this.addDialogVisible = false
              this.getAllRole()
            })
          })
        }
      })
    },
    handleDelete(index, row) {
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning',
      }).then(() => {
        let para = { id: row._id }
        deleteRoleInfo(para)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.getAllRole()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    changeIsUse(data,index,row) {
    // console.log(row);
      changeIsUse(row)
      .then()
      .catch((err) => {console.log(err);})
    }
  },
  mounted() {
    this.getAllRole()
  },
}
</script>

<style>
.CharacterManage-selectCotainer {
  flex: 8;
  display: flex;
  justify-content: flex-end;
}

.CharacterManage-selectEnabled {
  margin-right: 2%;
  width: 150px;
}

.CharacterManage-inputcharacterName {
  flex: 3;
  max-width: 30%;
  margin-right: 2%;
}
</style>
