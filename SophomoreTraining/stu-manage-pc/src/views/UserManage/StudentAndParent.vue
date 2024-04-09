<template>
<!-- todo 缺了一条button -->
<div>
    <div class="headerText">
        <span style="font-weight: bold; color: #777777">学生和家长管理</span>
    </div>
    <div class="tabBar">
        <el-tabs v-model="activeName" @tab-click="changeClick">
            <el-tab-pane label="学生" name="student">
                <div class="functionBarInTab">
                    <el-row v-model="filters" type="flex">
                        <el-input class="StudentAndParent-InputID" v-model="filters.stuId" placeholder="用户名" clearable @clear="searchStu()"></el-input>
                        <el-input class="StudentAndParent-InputName" v-model="filters.stuName" placeholder="姓名" clearable @clear="searchStu()"></el-input>
                        <div class="StudentAndParent-selectCotainer">
                            <el-select class="StudentAndParent-SelectCommittee" v-model="filters.isCommittee" placeholder="是否担任班委" clearable @clear="searchStu()">
                                <el-option v-for="item in optionsOfCommittee" :key="item.valueOfCommittee" :label="item.label" :value="item.valueOfCommittee">
                                </el-option>
                            </el-select>
                            <el-select class="StudentAndParent-SelectAbled" v-model="filters.stuIsUse" placeholder="是否启用" clearable @clear="searchStu()">
                                <el-option v-for="item in optionsOfAbled" :key="item.valueOfAbled" :label="item.label" :value="item.valueOfAbled">
                                </el-option>
                            </el-select>
                            <el-button class="StudentAndParent-SearchButton" type="primary" @click="searchStu">搜索</el-button>
                        </div>
                    </el-row>
                </div>
                <div class="dataTable">
                    <el-table :data="calTableDataStudent" border style="width: 100%">
                        <el-table-column prop="stuId" label="用户名" align="center">
                        </el-table-column>
                        <el-table-column prop="stuName" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="isCommittee" label="是否担任班委" align="center">
                            <template slot-scope="scope">
                                <el-switch
                                v-model="scope.row.isCommittee"
                                active-color="#13ce66"
                                inactive-color="#CCCCCC"
                                :active-value="1"
                                :inactive-value="0"
                                @change="changeIsCommittee(scope.$index,scope.row)"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" align="center">
                            <template slot-scope="scope">
                                <div>{{handleDate(scope.row.updateTime)}}</div>
                                <div>{{handleTime(scope.row.updateTime)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stuIsUse" label="是否启用" align="center">
                            <template slot-scope="scope">
                                <el-switch
                                v-model="scope.row.stuIsUse"
                                active-color="#13ce66"
                                inactive-color="#CCCCCC"
                                :active-value="1"
                                :inactive-value="0"
                                @change="changeIsUse(scope.$index,scope.row)"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" align="center" width="150px">
                            <el-button type="primary">重置密码</el-button>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="tableTag">
                    <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPageStudent" :page-sizes="[6, 12, 18, 24]" :page-size="pagesizeStudent" layout="total, sizes, prev, pager, next, jumper" :total="stuList.length">
                    </el-pagination>
                </div>
            </el-tab-pane>

            
            <el-tab-pane label="家长" name="parent">
                <div class="functionBarInTab">
                    <el-row v-model="filters" type="flex">
                        <el-input class="StudentAndParent-InputID" v-model="filters.pUsrName" placeholder="用户名" clearable @clear="searchPrt()"></el-input>
                        <el-input class="StudentAndParent-InputName" v-model="filters.stuName" placeholder="孩子姓名" clearable @clear="searchPrt()"></el-input>
                        <div class="StudentAndParent-selectCotainer">
                            <el-select class="StudentAndParent-SelectAbled" v-model="filters.pIsUse" placeholder="是否启用" clearable @clear="searchPrt()">
                                <el-option v-for="item in optionsOfAbled" :key="item.valueOfAbled" :label="item.label" :value="item.valueOfAbled">
                                </el-option>
                            </el-select>
                            <el-button class="StudentAndParent-SearchButton" type="primary" @click="searchPrt">搜索</el-button>
                        </div>
                    </el-row>
                </div>
                
                <div class="dataTable">
                    <el-table :data="calTableDataParent" border style="width: 100%">
                        <el-table-column prop="pUsrName" label="用户名" align="center">
                        </el-table-column>
                        <el-table-column prop="stuName" label="孩子姓名" align="center"></el-table-column>
                        <el-table-column prop="pCreateTime" label="创建时间" align="center">
                            <template slot-scope="scope">                   
                                <div>{{handleDate(scope.row.pCreateTime)}}</div>
                                <div>{{handleTime(scope.row.pCreateTime)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="pIsUse" label="是否启用" align="center">
                           <template slot-scope="scope">
                                <el-switch
                                v-model="scope.row.pIsUse"
                                active-color="#13ce66"
                                inactive-color="#CCCCCC"
                                :active-value="1"
                                :inactive-value="0"
                                @change="changepIsUse(scope.$idnex,scope.row)"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" align="center" width="200px">
                            <el-button type="primary">重置密码</el-button>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="tableTag">
                    <el-pagination @size-change="handleSizeChange2" 
                    @current-change="handleCurrentChange2" 
                    :current-page="currentPageParent" 
                    :page-sizes="[6, 12, 18, 24]" 
                    :page-size="pagesizeParent" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="stuList.length">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import {getAllStuInfo,
        searchStuInfo,
        getAllPrtInfo,
        searchPrtInfo,
        changeIsUse,
        changeIsCommittee,
        changepIsUse}from '@/network/StudentAndParent.js'


export default {
    name: "StudentAndParent",
    data() {
        return {
            filters:{
                stuId:'',
                stuName: '',
                isCommittee: '',
                stuIsUse: '',
                pUsrName: '',
                pIsUse: '',
            },
            activeName: "student",
            optionsOfCommittee: [{
                    valueOfCommittee: "1",
                    label: "是",
                },
                {
                    valueOfCommittee: "0",
                    label: "否",
                },
            ],
            valueOfCommittee: "",

            optionsOfAbled: [{
                    valueOfAbled: "1",
                    label: "是",
                },
                {
                    valueOfAbled: "0",
                    label: "否",
                },
            ],
            valueOfAbled: "",

            currentPageStudent: 1,
            pagesizeStudent: 6,
            stuList: [],
            currentPageParent: 1,
            pagesizeParent: 6,
            prtList: [],
            inputID: "",
            inputName: "",
        };
    },
    methods: {
        // 表格翻页
        handleSizeChange1: function(sizeStudent) {
        this.pagesizeStudent = sizeStudent;
        },
        handleCurrentChange1: function(currentPageStudent) {
        this.currentPageStudent = currentPageStudent;
        },
        handleSizeChange2: function(sizeParent) {
        this.pagesizeParent = sizeParent;
        },
        handleCurrentChange2: function(currentPageParent) {
        this.currentPageParent= currentPageParent;
        },
        changeClick(tab){
            if(tab.name=="student"){
                this.getALLStu();
            }if(tab.name=="parent"){
                this.getALLPrt();
            }
        },
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
        getALLStu() {
            getAllStuInfo().then(res => {
                 this.stuList = [];
                 this.stuList = res;
            })
            .catch()
         },
        getALLPrt() {
            getAllPrtInfo().then(res =>{
                 this.prtList = [];
                 this.prtList = res;
             })
        },
        searchStu(){
            let para = {
                stuId: this.filters.stuId,
                stuName: this.filters.stuName,
                isCommittee: this.filters.isCommittee,
                stuIsUse: this.filters.stuIsUse
            }
            searchStuInfo(para).then(res => {
                console.log(res);
                this.stuList = [];
                this.stuList = res;
            })
        },
        searchPrt(){
            let para = {
                pUsrName : this.filters.pUsrName ,
                stuName: this.filters.stuName,
                pIsUse: this.filters.pIsUse,
            }
            searchPrtInfo(para).then(res => {
                // console.log(res);
                this.prtList = [];
                this.prtList = res;
            })
        },
        changeIsUse(index,row) {
            changeIsUse(row)
            .then()
            .catch((err) => {console.log(err);})
         },
        changeIsCommittee(index,row){
            // console.log(row);
            changeIsCommittee(row)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {console.log(err);})
        },
        changepIsUse(index,row) {
            changepIsUse(row)
            .then()
            .catch((err) => {console.log(err);})
        },
    },
    computed: {
        calTableDataStudent: function () {
            return this.stuList.slice(
                (this.currentPageStudent - 1) * this.pagesizeStudent,
                this.currentPageStudent * this.pagesizeStudent
            );
        },
        calTableDataParent: function () {
            return this.prtList.slice(
                (this.currentPageParent - 1) * this.pagesizeParent,
                this.currentPageParent * this.pagesizeParent
            );
        },
    },
    created() {
        this.getALLStu();
    }
};
</script>

<style>
.StudentAndParent-selectCotainer {
    display: flex;
}

.StudentAndParent-SelectCommittee {
    width: 170px;
}

.StudentAndParent-SelectAbled {
    width: 130px;
}

.StudentAndParent-InputID {
    width: 110px;
}

.StudentAndParent-InputName {
    width: 110px;
}
</style>
