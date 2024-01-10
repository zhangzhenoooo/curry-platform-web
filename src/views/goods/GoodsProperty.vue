<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格尺寸</el-breadcrumb-item>
    </el-breadcrumb>


    <el-input readonly style="visibility: hidden;"></el-input>

    <!--    顶部按钮-->
    <el-button size="small" type="primary" @click="addTab()">添加规格</el-button>
    <el-button size="small" type="primary" @click="editTab()">编辑规格</el-button>
    <el-button size="mini" type="danger" @click="deleteTab()">删除当前规格</el-button>
    <!--tab 内容-->
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane v-for="(tab, index) in labList" :key="index" :label="tab.name">
        <el-table :data="tableData">
          <!-- 在这里添加表格列 -->
          <el-table-column prop="name" label="属性名称"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="act" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deletePropety(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-button size="small" type="primary" @click="addItem(tab)">添加子属性</el-button>
      </el-tab-pane>
    </el-tabs>

    <!-- 编辑界面 -->

    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="150px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="主键" prop="id">
          <el-input size="small" readyonly v-model="editForm.id" auto-complete="off" placeholder="属性id"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入属性名称"></el-input>
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
import axios from 'axios';
import {goodsPropretyListByPropId, goodsPropretySave, goodsPropretyDelete} from '../../api/userMG'
import Pagination from '../../components/Pagination'

export default {
  data() {
    return {
      loading: false,
      rules: '',
      title: '',
      activeTab: '', // 当前激活的标签页
      labList: [],
      tableData: [],
      editFormVisible: false,
      editForm: {
        id: '',
        name: '',
        parentPropertyId: 0
      },
      currentProptreyId: 0

    };
  },


  created() {
    try {
      this.listLab();

    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    getPropertyByPropertyId(param) {
      goodsPropretyListByPropId(param)
        .then(res => {
          if (res.code == 0) {
            this.tableData = res.data;
          } else {
            this.$message.error('系统异常，请稍后再试！')
          }
        }).catch(error => {
        this.$message.error('系统异常！')

      })
    },
    listLab() {
      goodsPropretyListByPropId(0)
        .then(res => {
          if (res.code == 0) {
            this.labList = res.data;
            const proptreyId = this.labList[this.currentProptreyId].id;
            this.getPropertyByPropertyId(proptreyId)
          } else {
            this.$message.error('系统异常，请稍后再试！')
          }
        }).catch(error => {
        this.$message.error('系统异常！')

      })
    },
    handleClick(tab) {

      const proptreyId = this.labList[tab.index].id;
      this.currentProptreyId = tab.index;

      // 创建一个新的Promise
      const promise = new Promise(resolve => {
        // 这是异步操作
        this.getPropertyByPropertyId(proptreyId).then(() => {
          // 当异步操作完成时，调用resolve函数
          resolve();
        });
      });
      // 使用then方法处理promise的结果
      promise.then(() => {
        this.activeTab = tab.label; // 更新激活的标签页
      });
    },
    deletePropety(row){
      goodsPropretyDelete(row.id).then(res => {
        if (res.code == 0) {
          this.currentProptreyId = 0;
          this.listLab();
          this.$message({type: 'success', message: '删除成功！'})
        }
      }).catch(err => {
        this.$message.error('删除失败，请稍后再试！')
      })
    },
    handleEdit(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.parentPropertyId = row.propertyId
      } else {
        this.title = '添加'
        this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.id = row.propertyId
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          goodsPropretySave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.code == 0) {
                const proptreyId = this.labList[this.currentProptreyId].id;
                this.getPropertyByPropertyId(proptreyId)
                this.listLab();

                this.$message({
                  type: 'success',
                  message: '保存成功！'
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
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    addTab() {

      const row = {
        parentPropertyId: 0,
        name: '',
        id: null
      }
      this.handleEdit(null, row);

    },
    editTab() {
      const row = {
        parentPropertyId: 0,
        name: this.labList[this.currentProptreyId].name,
        id: this.labList[this.currentProptreyId].id
      }
      this.handleEdit(null, row);
    },
    deleteTab() {
      goodsPropretyDelete(this.labList[this.currentProptreyId].id).then(res => {
        if (res.code == 0) {
          this.currentProptreyId = 0;
          this.listLab();
          this.$message({type: 'success', message: '删除成功！'})
        }
      }).catch(err => {
        this.$message.error('删除失败，请稍后再试！')
      })
    },
    addItem(row) {
       const param = {
        propertyId: row.id,
         id: null
      }
      this.handleEdit(null, param);
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },

  },
};
</script>
