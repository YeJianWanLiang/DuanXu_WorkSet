<template>
  <div>
    <div class="headerText">
      <span style="font-weight: bold; color: #777777">用户管理</span>
    </div>
    <div class="functionBar" >
      <el-button type="primary" @click="handleadd">新增</el-button>
      <el-col v-model="filters">
         <el-input
        class="UserManage-inputUserName"
        placeholder="用户名"
        v-model="filters.usrName"
        clearable 
        @clear="searchUser()"
      ></el-input>
      <el-input
        class="UserManage-inputName"
        v-model="filters.name"
        placeholder="姓名"
        clearable 
        @clear="searchUser()"
      ></el-input>
      <el-input
        class="UserManage-inputNum"
        v-model="filters.number"
        placeholder="编号"
        clearable
        @clear="searchUser()"
      ></el-input>
     
      <el-select v-model="filters.role" class="UserManage-selectCharacter" placeholder="角色" clearable @clear="searchUser()">
        <el-option
          v-for="item in optionsOfCharacter"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>  
      </el-select>
        
      <el-select v-model="filters.isUse" class="UserManage-selectOpen" placeholder="是否启用" clearable @clear="searchUser()">
        <el-option
          v-for="item in optionsOfOpen"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>

      <el-button type="primary" @click="searchUser">搜索</el-button>

      </el-col> 
    </div>

    <div class="dataTable">
      <!-- 未完成 -->
      <el-table
        :data="calTableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="usrName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="number" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
            <template slot-scope="scope">
                <div>{{handleDate(scope.row.updateTime)}}</div>
                <div>{{handleTime(scope.row.updateTime)}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="isUse" label="状态" align="center">
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

        <el-table-column label="操作" width="450" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleUpdate(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteuser(scope.$index,scope.row)">删除</el-button>
            <el-button type="primary">重置密码</el-button>
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
        :total="userlist.length"
      > 
      </el-pagination>
    </div>

    <!-- 新增编辑页面 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false" ref="editForm">
      <el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名：" prop="usrName">
          <el-input id="userName"  v-model="editForm.usrName"></el-input>
        </el-form-item>

        <el-form-item label="姓名:" prop="name">
          <el-input id="userRealName" v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="编号:" prop="number">
          <el-input id="userNumber" v-model="editForm.number"></el-input>
        </el-form-item>
         
        <el-form-item label="角色:" prop="role">
          <el-radio-group v-model="editForm.role">
          <el-radio label="超级管理员">超级管理员</el-radio>
          <el-radio label="老师" >老师</el-radio>
          <el-radio label="教导主任">教导主任</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div  style="text-align: right">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="addUser">保存</el-button>
        <el-button v-else type="primary" @click="updateUser">保存</el-button>
        <el-button @click="dialogFormVisible=false" type="danger">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addUserInfo,
        getAllUser,
        deleteUser,
        updateUser,
        searchUser,
        changeUserIsUse} from "@/network/user_management.js";


// const defaultListQuery = {
//     name: null,
//     pageNum: 1,
//     pageSize: 5,
// }
export default {
  name: "UserManage",
  data() {
    return {
      filters: {
        usrName: '',
        name: '',
        number: '',
        role: '',
        isUse: ''
      },
    //   listQuery: Object.assign({}, defaultListQuery),
    //   listLoading: true,
      currentPage: 1,
      pagesize: 7,
      dialogStatus: '',
      textMap: {
        create:"新增",
        update:"修改"
      },
      dialogFormVisible: false,
      //新增修改页面
      editForm: {
        usrName: "",
        name: "",
        number: "",
        role:"teacher",
      },
      editFormRules: {
        usrName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名" , trigger: "blur" }],
        number: [{ required: true, message: "请输入编号", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      userlist: [],
      optionsOfCharacter: [{
          value: '教导主任',
          label: '教导主任'
        }, {
          value: '老师',
          label: '老师'
        }, {
          value: '超级管理员',
          label: '超级管理员'
        },],
        valueOfCharacter: '',
        optionsOfOpen: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }, ],
        valueOfOpen: '',
      
    };
  },
  computed: {
    calTableData: function() {
      return this.userlist.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    //查询所有的列表信息(在create里调用)
    getUser(){
    //   let para = {pageNum: this.listQuery.pageNum,pageSize:this.listQuery.pageSize}
         getAllUser().then(res =>{
            console.log(res.updateTime);
            this.userlist= [];
            this.userlist = res;
            // console.log(this.userlist);
            
          })
    },
   handleSizeChange: function(size) {
        this.pagesize = size;
        },
    handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
    },
    handleDate(time){
		var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
		return Y+M+D;
	},
	handleTime(time){
		var date = new Date(time);
		var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
		return h+m+s;
	},
    //搜索模糊查询
    searchUser() {
        let para = {usrName: this.filters.usrName,
                        name: this.filters.name,
                        number: this.filters.number,
                        role: this.filters.role,
                        isUse: this.filters.isUse
                        }
            console.log(para);
            searchUser(para).then(res =>{
              console.log(res);
              this.userlist = []
              this.userlist = res;
            //   console.log(this.userlist);
        })
    },

    //弹出新增页面
    handleadd() {
      this.dialogStatus = "create",
      this.dialogFormVisible = true,
      this.editForm = {
        usrName: "",
        name: "",
        number: "",
      }
    },

    //提交新增
     addUser() {
     this.$refs.editForm.validate(valid =>{
            if(valid){
              this.$confirm("确认提交吗？","提示",{})
              .then(() =>{
                let para = this.editForm;
                console.log(para);
                addUserInfo(para).then(() =>{
                  this.$message({
                    message:"提交成功",
                    type:"success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.dialogFormVisible = false;
                  this.getUser();
                });
              })
              .catch(e =>{
                console.log(e);
              });
            }
          });
    },

    //弹出编辑页面
    handleUpdate(index,row) {
      console.log(index);
      this.dialogStatus = "update",
      this.dialogFormVisible = true,
    //   this.editForm = Object.assign({},row);
    this.editForm = row;
    },

    //提交修改
    updateUser() {
       this.$refs.editForm.validate(valid =>{
            if(valid){
              this.$confirm("确认提交吗？","提示",{})
              .then(() =>{
                // let para = Object.assign({},this.editForm);
                let para = this.editForm;
                console.log(para);
                updateUser(para).then(() =>{
                  this.$message({
                    message:"提交成功",
                    type:"success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.dialogFormVisible = false;
                  this.getUser();
                });
              })
              .catch(e =>{
                console.log(e);

              });
            }
          });
    },

    //删除操作
    deleteuser(index,row) {
      this.$confirm("确认删除记录吗？","提示",{
            type:"warning"
      })
      .then(() =>{
        let para = {id:row._id};
        deleteUser(para)
        .then(res => {
          console.log(res);
           this.$message({
                message:"删除成功",
                type:"success"
              });
              this.getUser();
        });
      })
      .catch(() =>{
      })
    },
    changeIsUse(row){
        console.log(row);
        changeUserIsUse(row)
        .then()
        .catch((err) =>{
            console.log(err);
        })
    },
  },

  mounted() {
    this.getUser();
  }
};
</script>

<style>
.UserManage-inputUserName {
    width: 150px;
}

.UserManage-inputName {
    width: 150px;
}

.UserManage-inputNum {
    width: 150px;
}

.UserManage-selectCharacter {
    width: 150px;

}

.UserManage-selectOpen {
    width: 150px;

}
</style>
