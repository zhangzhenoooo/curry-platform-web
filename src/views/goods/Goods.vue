/**
* 基础菜单 商品管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.goodsName" placeholder="输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.categoryName" placeholder="输入类别名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="toGoodsAdd">添加</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete"  @click="deleteBatch('goodsTable')">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table :model="goodsTable" size="small" :data="listData" highlight-current-row v-loading="loading" border
              element-loading-text="拼命加载中" style="width: 100%;"  row-selection="rowSelection">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column align="center" label="图片" min-width="80">
        <template slot-scope="scope">
          <img width="80px" :src="scope.row.pic" alt="图片">
        </template>
      </el-table-column>
      <el-table-column sortable prop="id" label="编号|条码" width="80">
      </el-table-column>
      <el-table-column sortable prop="categoryName" label="门店|分类" width="80">
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="100">
      </el-table-column>
      <el-table-column align="center" label="库存状态" min-width="100">
        <template slot-scope="scope">
          <div>
            999863 <br>
            已审核 <br>
            上架 <br>
            默认展示 <br>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" min-width="100">
        <template slot-scope="scope">
          <div>
            商品原价： {{ scope.row.originalPrice }} <br>
            最低价格： {{ scope.row.minPrice }} <br>
            砍价底价： {{ scope.row.kanjiaPrice }}<br>
            团购价格： {{ scope.row.pingtuanPrice }}
          </div>
        </template>

      </el-table-column>
      <el-table-column align="center" label="统计数据" min-width="100">
        <template slot-scope="scope">
          <div>
            浏览量 : {{ scope.row.views }}<br>
            收藏量 : {{ scope.row.usefulNumber }}<br>
            订单数 : {{ scope.row.numberOrders }}<br>
            销售数 : {{ scope.row.numberSells }}<br>
            满意度 : {{ scope.row.numberGoodReputation }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="满意度" min-width="100">
        <template slot-scope="scope">
          <div>
            <el-p style="color: green"> 赞 : {{ scope.row.usefulNumber }}</el-p>
            <br>
            <el-p style="color: red"> 踩 : {{ scope.row.unusefulNumber }}</el-p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="部门名称" prop="deptName">
          <el-input size="small" v-model="editForm.deptName" auto-complete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门代码" prop="deptNo">
          <el-input size="small" v-model="editForm.deptNo" auto-complete="off" placeholder="请输入部门代码"></el-input>
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
import {deptList, deptSave, deptDelete} from '../../api/userMG'
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
        deptId: '',
        deptName: '',
        deptNo: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          {required: true, message: '请输入部门名称', trigger: 'blur'}
        ],
        deptNo: [{required: true, message: '请输入部门代码', trigger: 'blur'}]
      },
      formInline: {
        page: 1,
        pageSize: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
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
      rowSelection: {
        type: 'radio', // 你可以根据需要选择单选或多选
        // 其他行选择属性...
      }
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
      deptList(parameter)
        .then(res => {
          this.loading = false
          if (res.success == false) {
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
        this.editForm.deptId = row.deptId
        this.editForm.deptName = row.deptName
        this.editForm.deptNo = row.deptNo
      } else {
        this.title = '添加'
        this.editForm.deptId = ''
        this.editForm.deptName = ''
        this.editForm.deptNo = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          deptSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '商品保存成功！'
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
              this.$message.error('公司保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deptDelete(row.id)
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '商品已删除!'
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
              this.$message.error('商品删除失败，请稍后再试！')
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
    // 新增商品 ，跳转到新增页面
    toGoodsAdd() {
      this.$router.push({ path: '/goods/GoodsAdd' })

    },
    deleteBatch() {
      debugger
      const selectedRows = this.$refs.table.getSelections(); // 获取选中的行数据

      if (selectedRows.length > 0) {
        // 调用后端接口进行删除操作
        // 你可以根据实际情况调整请求参数和请求方法等细节...
        // 这里只是一个示例，你需要根据你的后端接口进行相应的调整...
        axios.delete('/api/data', { data: selectedRows })
          .then(response => {
            // 处理删除成功的逻辑...
          })
          .catch(error => {
            // 处理删除失败的逻辑...
          });
      } else {
        // 没有选中任何行时的处理逻辑...
      }
    }
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


