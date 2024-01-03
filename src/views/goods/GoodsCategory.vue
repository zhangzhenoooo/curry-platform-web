/**
* 基础菜单 商品管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.categoryName" placeholder="输入商品分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="success" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="small" type="danger" icon="el-icon-plus" @click="deleteBatch()">批量删除</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border
              element-loading-text="拼命加载中" style="width: 100%;"  @select="handelSelectTable">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable align="center" prop="id" label="编号" min-width="30">
      </el-table-column>
      <el-table-column sortable align="center" prop="name" label="名称" width="200">
      </el-table-column>
      <el-table-column align="center" label="图片" width="200">
        -
      </el-table-column>
      <el-table-column align="center" label="图片" width="200">
        -
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="60">
        <el-button size="small" type="success" >正常</el-button>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteById(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="分类编码" prop="id">
          <el-input readonly size="small" v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {categoryList, categoryDeleteById, categoryDeleteBatch, categorySaveOrUpdate} from '../../api/userMG'
import Pagination from '../../components/Pagination'

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        id: '',
        name: '',
        deptNo: '',
        shopid: 0,
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ],
        deptNo: [{required: true, message: '请输入分类代码', trigger: 'blur'}]
      },
      formInline: {
        page: 1,
        pageSize: 10,
        shopid: 0,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除分类
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      tableSelectIds: []
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      categoryList(parameter)
        .then(res => {
          this.loading = false
          if (res.code != 0) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData = res.data.list
            // 分页赋值
            this.pageparm.currentPage = res.data.pageNum
            this.pageparm.pageSize = res.data.pageSize
            this.pageparm.total = res.data.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('菜单加载失败，请稍后再试！')
        })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.deptNo = row.deptNo
      } else {
        this.title = '添加'
        this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.deptNo = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          categorySaveOrUpdate(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code == 0) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '商品分类保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('商品分类失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公司

    deleteById(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          categoryDeleteById(row.id)
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '商品分类已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('商品分类删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
    handelSelectTable(selection, row) {
      this.tableSelectIds = [];
      selection.forEach(key => {

        this.tableSelectIds.push(key.id)
      })
    },deleteBatch() {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {

          const params = { "ids": this.tableSelectIds };
          console.info(params)
          categoryDeleteBatch(params).then(res => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: '已删除!'
              })
              this.getdata(this.formInline)
            }else {
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
          }).catch(error => {
            this.loading = false
            this.$message.error('删除失败，请稍后再试！')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

    },
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}

.userRole {
  width: 100%;
}
</style>


