# 学生成长跟踪系统——网页端

### 项目说明

根据原型图搭了个静态页面的框架

[原型图](https://app.mockplus.cn/run/rp/k3b4VTq7Sd/bMjAyxpiCz?ps=0&ha=0&la=0&fc=0&out=1)

### 概要设计

略

### 详细设计

#### 文件目录

* public——文件夹
  * index.html——没什么说的
  * favicon.ico——没什么用的

* src——文件夹

  * assets——初始化的一些文件

    * LoginPage——登录/欢迎页的静态资源
    * Pics——静态图片
    * styles
    
      * reset.css——对所有的标签进行初始化
      * base.css——公共样式，包含了一些公共div的样式
    * logo.png——没什么用
    
  * components——组件
    * HeaderBar——头部信息栏

  * views——页面

    * DataCollection——数据采集文件夹
      * BasicData.vue——入学基础数据
      * SignIn.vue——上课签到统计
      * GradeData.vue——成绩统计数据
      * DailyActivity.vue——日常活动
      * QuestionSurvey.vue——小问卷调查

    * LoginWecome——登录/欢迎页面
      * Login.vue——登录页面
      * Welcome.vue——欢迎页面
      
    * StudentManage——学生跟踪管理文件夹
      * ImageAnalysis.vue——学生画像分析
      * MentalWarning.vue——学生心理异常预警
      * Growth.vue——学生成长
      * RecentCare.vue——学生近况与关怀
      * Evaluation.vue——学生评价
    * UserManage——用户管理文件夹
      * CharacterManage.vue——角色管理
      * UserManage.vue——用户管理
      * StudentAndParent.vue——学生和家长管理
    * BasicInformation——基础信息配置文件夹
      * BasicInformation.vue——基础信息配置
  
    * Main.vue——主页面包含菜单栏和右边
    * NavMenu.vue——左边导航栏
  
  * router——路由
  
    * index.js——路由跳转的配置
    
  * App.vue——主页面（拆分为左边和右边）
  
  * main.js——入口文件

### 界面内部结构及开发规范

#### 组件内部结构

``` 
<template>
	<div class="headerText"></div>				// 页面标题
	<div class="functionBar"></div>				// 按钮那一横排
	<div class="dataTable"></div>				// 表格区域
	<div class="tableTag"></div>				// 表格页数统计及翻页
</template>
```

#### 命名规则/布局规则

根据后续内容增多 还可以修改 目前做了的部分基本采用这种方式

##### 类名

class命名规则：组件名-类名（动宾结构 小驼峰）

1. functionBar——功能区，一般为表格上方的button/select/input
2. buttonCotainer、selectCotainer——功能区里对不同标签的分区，方便flex布局
3. dataTable——页面的表格
4. tableTag——表格下面的翻页栏
5. tabBar——标签页，存放表格

export default：小驼峰 基本参照class命名

1. 接收的value：组件名+功能(e.g.inputActivity:活动输入框)

e.g.

标签类名：BasicData-dataTable（入学基础数据里的数据表格）

data里的数组：optionsOfYear（入学年份选择的value和label）

##### 页面布局

1. display全部采用flex，全部style写在页面的下方，不要写在标签里
2. 分div，给标签写类名，通过div控制布局，细节边距修改再对特定组件用类名写style
3. button/select/input宽度根据内部文字长度设定，偷懒照搬原型图上面的宽度的px值
4. 标签的css已经初始化
5. 左侧导航栏页面已经固定，右侧界面一般不会溢出，如果一行内元素太多，直接设置宽度变小使其不会占据左边空间

