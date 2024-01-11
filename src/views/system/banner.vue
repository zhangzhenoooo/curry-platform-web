/**
* 系统管理 用户管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>banner管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-add" @click="handleEdit">新增</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="selectChange" :data="noticeData" highlight-current-row v-loading="loading"
              border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="id" label="编号|类型" width="200">
      </el-table-column>
      <el-table-column align="center" sortable prop="businessId" label="业务编码/连接地址" width="500">
      </el-table-column>
      <el-table-column align="center" sortable prop="title" label="名称" min-width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="picUrl" label="图标" min-width="120">
        <template slot-scope="scope">
          <img width="80px" :src="scope.row.picUrl" alt="图片">
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="status" label="状态" min-width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status=='0'?nshow:fshow" active-color="#13ce66" inactive-color="#ff4949"
                     @change="editNoticeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="60%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">

        <el-row :gutter="24">
          <div class="grid-content bg-purple">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="自定义类型:" prop="type">
                    <el-input size="small" v-model="editForm.type"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="业务编码:" prop="businessId">
                    <el-input size="small" v-model="editForm.businessId"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="名称:" prop="title">
                    <el-input size="small" v-model="editForm.title"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="展示图片:" prop="pic">
                  <img class="showimg" :src="imgUrl" width="100px" border="1px" @click="zoomImage"
                       v-if="editForm.picUrl">
                  <el-input size="small" style="visibility: hidden;" v-model="editForm.picUrl"></el-input>
                  <input size="small" type="file" @change="uploadGoodsFile"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="链接类型:" prop="linkType">
                    <el-radio v-model="editForm.linkType" label="0">普通链接</el-radio>
                    <el-radio v-model="editForm.linkType" label="1">小程序链接</el-radio>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="链接地址:" prop="linkUrl">
                    <el-input size="small" v-model="editForm.linkUrl"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="状态:" align="left">
                    <el-radio v-model="editForm.status" label="0">显示</el-radio>
                    <el-radio v-model="editForm.status" label="1">隐藏</el-radio>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="排序:" align="paixu">
                    <el-input size="small" v-model="editForm.paixu"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 导入请求方法
import {
  bannerList,
  bannerAdd,
  bannerDelete,
  bannerChangeStatus,
} from '../../api/userMG'
import Pagination from '../../components/Pagination';
import axios from 'axios';

export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '新增banner',
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      imgUrl: '',
      // 编辑与添加
      editForm: {
        title: '',
        businessId:'',
        linkUrl: '',
        content: '',
        isShow: '1',
        remindUid: '0',
        isRemind: '0'
      },
      // 部门参数
      unitparm: {
        userIds: '',
        deptId: '',
        deptName: ''
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      },
      // 删除用户
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      // 重置密码
      resetpsd: {
        userId: '',
        token: localStorage.getItem('logintoken')
      },
      // 用户下线
      offline: {
        token: localStorage.getItem('logintoken')
      },
      // 请求数据参数
      formInline: {
        page: 1,
        pageSize: 10,
        title: '',
        linkType: 0,
        status: 0
      },
      //用户数据
      noticeData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  // 注册组件
  components: {
    Pagination
  },

  /**
   * 数据发生改变
   */
  watch: {},

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
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      // 获取用户列表
      bannerList(parameter).then(res => {
        this.loading = false
        if (res.code != 0) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.noticeData = res.data.list
          // 分页赋值
          this.pageparm.currentPage = res.data.total
          this.pageparm.pageSize = 10
          this.pageparm.total = res.data.total
        }
      })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    //搜索事件
    search() {
      this.getdata(this.formInline)
    },
    // 修改type
    editType: function (isShow) {
      if (isShow == 0) {
        this.editForm.isShow = '1'
      } else {
        this.editForm.isShow = '0'
      }
    },
    uploadGoodsFile() {
      const goodsfile = event.target.files[0];
      const formData = new FormData();
      formData.append('file', goodsfile);
      formData.append("type", 1);
      // 上传操作
      axios.post("/api/file/upload", formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        this.editForm.picUrl = res.data.data.stageUrl;
        this.imgUrl = res.data.data.preViewUrl;
        console.log(res)
      }).catch(error => {
        console.error(error)
      })
    },
    zoomImage() {
      let imgElement = this.$el.querySelector('.showimg');  // 获取图片元素
      if (imgElement.classList.contains('zoomed')) {  // 如果图片已经放大，则缩小它
        imgElement.classList.remove('zoomed');
      } else {  // 如果图片未放大，则放大它
        imgElement.classList.add('zoomed');
      }
    },
    editNoticeStatus: function (row) {
      this.loading = true
      let parm = {
        status: row.status,
        id: row.id,
        token: localStorage.getItem('logintoken')
      }
      let status = row.status
      if (status == '0') {
        parm.status = '1'
      } else {
        parm.status ='0'
      }
      // 修改状态
      bannerChangeStatus(parm).then(res => {
        this.loading = false
        if (res.code != 0) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '状态修改成功'
          })
          this.getdata(this.formInline)
        }
      })
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改banner'
        this.editForm.id = row.id
        this.editForm.businessId = row.businessId
        this.editForm.dateAdd = row.dateAdd
        this.editForm.linkType = row.linkType
        this.editForm.paixu = row.paixu
        this.editForm.picUrl = row.picUrl
        this.editForm.shopId = row.shopId
        this.editForm.status = row.status
        this.editForm.statusStr = row.statusStr
        this.editForm.title = row.title
        this.editForm.type = row.type
        this.editForm.userId = row.userId

      } else {
        this.title = '新增banner'
         this.editForm.id = null
        this.editForm.businessId = 0
        this.editForm.dateAdd =null
        this.editForm.linkType = '0'
        this.editForm.paixu = 0
        this.editForm.picUrl = null
        this.editForm.shopId = 0
        this.editForm.status = '0'
        this.editForm.statusStr = null
        this.editForm.title = null
        this.editForm.type = '0'
        this.editForm.userId = 0

      }
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          bannerAdd(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code == 0) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 显示部门设置
    handleunit: function (index, row) {
      this.unitAccessshow = true
      let parms = 0
      UserDeptdeptTree(parms)
        .then(res => {
          if (res.data.success) {
            this.UserDept = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('配置权限失败,请稍后再试！')
        })
    },
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.unitparm.deptId = data.id
        this.unitparm.deptName = data.name
        //交叉点击节点
      } else {
      }
    },
    // 保存部门
    unitPermSave() {
      let len = this.selectdata
      let ids = []
      if (len != 0) {
        for (let i = 0; i < len.length; i++) {
          ids.push(len[i].userId)
        }
      }
      this.unitparm.userIds = ids.join(',')
      UserChangeDept(this.unitparm)
        .then(res => {
          this.unitAccessshow = false
          if (res.success) {
            this.$message({
              type: 'success',
              message: '部门设置成功！'
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
          this.$message.error('部门设置失败,请稍后再试！')
        })
    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          bannerList(row.id)
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
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
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    // 重置密码
    resetpwd(index, row) {
      this.resetpsd.userId = row.userId
      this.$confirm('确定要重置密码吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userPwd(this.resetpsd)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '重置密码成功！'
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
              this.$message.error('重置密码失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消重置密码！'
          })
        })
    },
    // 数据权限
    dataAccess: function (index, row) {
      this.dataAccessshow = true
      this.saveroleId = row.userId
      UserDeptTree(row.userId)
        .then(res => {
          if (res.data.success) {
            this.checkmenu = this.changemenu(res.data.data)
            this.UserDept = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
    },
    //数据格式化
    changeArr(data) {
      var pos = {}
      var tree = []
      var i = 0
      while (data.length != 0) {
        if (data[i].pId == 0) {
          tree.push({
            id: data[i].id,
            name: data[i].name,
            pId: data[i].pId,
            open: data[i].open,
            checked: data[i].checked,
            children: []
          })
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i].pId]
          if (posArr != undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }

            obj.children.push({
              id: data[i].id,
              name: data[i].name,
              pId: data[i].pId,
              open: data[i].open,
              checked: data[i].checked,
              children: []
            })
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      }
      return tree
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      return change
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        userId: this.saveroleId,
        deptIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.deptIds = JSON.stringify(moduleIds)
      }
      UserDeptSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.dataAccessshow = false
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
          this.$message.error('权限保存失败，请稍后再试！')
        })
    },
    // 下线用户
    offlineUser(index, row) {
      this.$confirm('确定要让' + row.userName + '用户下线吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userExpireToken(row.userName)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '用户' + row.userName + '强制下线成功！'
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
              this.$message.error('用户下线失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 刷新缓存
    refreshCache(index, row) {
      userFlashCache(row.userName)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '刷新成功！'
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
          this.$message.error('刷新失败，请稍后再试！')
        })
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

.grid-content bg-purple {
  padding-right: 15px;
}
</style>

