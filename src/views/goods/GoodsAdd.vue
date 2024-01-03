/**
* 系统管理 菜单管理
*/
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods/Goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-row>
      <!-- title -->
      <div class="modt-box">新增商品</div>
      <el-col :span="4"></el-col>

      <el-col :span="18">

        <el-form ref="form" :model="form" label-width="200px" :rules="rules">
          <el-form-item label="所属门店:" prop="shopId">
            <el-select size="small" v-model="form.shopId" placeholder="请选择" class="selectw">
              <el-option v-for="parm in shopMenu" :key="parm.id" :label="parm.name" :value="parm.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类:" prop="categoryId">
            <el-select size="small" v-model="form.categoryId" placeholder="请选择..." class="selectw">
              <el-option v-for="parm in goodsCategoryMenu" :key="parm.id" :label="parm.name"
                         :value="parm.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品条码:" prop="moduleName">
            <el-input size="small" v-model="form.moduleName"></el-input>
          </el-form-item>

          <el-form-item label="商品名称:" prop="name">
            <el-input size="small" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="别名:" prop="subName">
            <el-input size="small" v-model="form.subName"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="paixu">
            <el-input size="small" v-model="form.paixu"></el-input>
          </el-form-item>
          <el-form-item label="推荐:" prop="recommendStatus">
            <el-radio v-model="form.recommendStatus" label="0">推荐</el-radio>
            <el-radio v-model="form.recommendStatus" label="1">不推荐</el-radio>

          </el-form-item>
          <el-form-item label="是否展示:" prop="hidden">
            <el-radio v-model="form.hidden" label="0">正常展示</el-radio>
            <el-radio v-model="form.hidden" label="1">默认隐藏，不在前端展示</el-radio>
          </el-form-item>
          <el-form-item label="是否售后:" prop="afterSale">
            <el-radio v-model="form.afterSale" label="0">否</el-radio>
            <el-radio v-model="form.afterSale" label="1">支持</el-radio>
          </el-form-item>

          <el-form-item label="状态:" prop="status">
            <el-radio v-model="form.status" label="0">上架</el-radio>
            <el-radio v-model="form.status" label="1">下架</el-radio>
          </el-form-item>

          <el-form-item label="展示图片:" prop="pic">
            <el-input size="small" style="visibility: hidden;"  v-model="form.pic"></el-input>
            <input size="small" type="file" @change="uploadGoodsFile"/>
          </el-form-item>

          <el-form-item label="详细介绍:" prop="content">
            <el-input size="small" v-model="form.content"></el-input>
          </el-form-item>

          <el-form-item label="单位:" prop="unit">
            <el-input size="small" v-model="form.unit"></el-input>
          </el-form-item>


          <el-form-item label="市场价:" prop="originalPrice">
            <el-input size="small" v-model="form.originalPrice"></el-input>
          </el-form-item>

          <el-form-item label="价格:" prop="minPrice">
            <el-input size="small" v-model="form.minPrice"></el-input>
          </el-form-item>

          <el-form-item label="税率(单位：%):" prop="tax">
            <el-input size="small" v-model="form.tax"></el-input>
          </el-form-item>

          <el-form-item label="需要积分:" prop="minScore">
            <el-input size="small" v-model="form.minScore"></el-input>
          </el-form-item>

          <el-form-item label="赠送积分:" prop="gotScore">
            <el-input size="small" v-model="form.gotScore"></el-input>
          </el-form-item>

          <el-form-item label="最少购买:" prop="minBuyNumber">
            <el-input size="small" v-model="form.minBuyNumber"></el-input>
          </el-form-item>

          <el-form-item label="库存:" prop="stores">
            <el-input size="small" v-model="form.stores"></el-input>
          </el-form-item>


          <el-form-item label="预警库存水位线:" prop="storeAlertNum">
            <el-input size="small" v-model="form.storeAlertNum"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="saveModule('form')">保存</el-button>
            <el-button size="small" type="danger" v-show="showdelete" @click="deleteModule">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {

  uploadFile,
  categoryList,
  goodsAdd,
  ModuleGet,
  ModuleDelete
} from '../../api/userMG';
import axios from 'axios';

export default {
  data() {
    return {
      showdelete: true,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        shopId: 0,
        categoryId: '',
        moduleName: '',
        name: '',
        subName: '',
        paixu: 0,
        recommendStatus: 1,
        hidden: 1,
        afterSale: '',
        status: 0,
        content: '',
        unit: '份',
        originalPrice: 0,
        minPrice: 0,
        tax: 0,
        minScore: 0,
        gotScore: 0,
        minBuyNumber: 1,
        stores: 1000,
        storeAlertNum: 20,
        pic: ''
      },
      // rules表单验证
      rules: {
        categoryId: [
          {required: true, message: '请选择商品类别', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        moduleIcon: [
          {required: true, message: '请输入菜单图标', trigger: 'blur'}
        ],
        moduleUrl: [{required: true, message: '请输入URL', trigger: 'blur'}],
        moduleOrder: [
          {required: true, message: '请输入菜单顺序', trigger: 'blur'}
        ]
      },
      status: [{required: true, message: '请选择状态', trigger: 'blur'}],
      shopMenu: [{"id": 0, "name": "震震私厨"}],
      goodsCategoryMenu: []
    }
  },
  /**
   * 创建完毕
   */

  created() {

    this.getdata()
    this.getmenu()
  },

  emptyGoodsForm() {
    this.form = {
      shopId: 0,
      categoryId: '',
      moduleName: '',
      name: '',
      subName: '',
      paixu: 0,
      recommendStatus: 1,
      hidden: 1,
      afterSale: '',
      status: 0,
      content: '',
      unit: '份',
      originalPrice: 0,
      minPrice: 0,
      tax: 0,
      minScore: 0,
      gotScore: 0,
      minBuyNumber: 1,
      stores: 1000,
      storeAlertNum: 20,
      pic: ''
    }
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据
    getdata() {
      let parm = {
        page: 1,
        pageSize: 10,
        shopid: 0
      }
      categoryList(parm)
        .then(res => {
          this.treeData = [
            {
              id: 1,
              pId: 0,
              name: '平台顶级',
              open: true,
              checked: false
            },
            {
              id: 2,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 3,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 12,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 13,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 17,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 4,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 5,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 6,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 7,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            }
          ]
        })
        .catch(err => {
          this.loading = false
          this.$message.error('菜单管理列表失败，请稍后再试！')
        })
    },


    // 获取父级菜单
    getmenu() {
      let parm = {
        page: 1,
        pageSize: 10,
        shopid: 0
      }
      categoryList(parm).then(res => {
        this.goodsCategoryMenu = res.data.list
      }).catch(err => {
        this.loading = false
        this.$message.error('父级菜单列表获取失败，请稍后再试！')
      })

    },
    // 复选变单选
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.showdelete = true
      } else {
      }
    },
    // 点击节点
    nodeclick(arr, node, self) {
      ModuleGet(arr.id)
        .then(res => {
          console.log(JSON.stringify(res))
          this.form = res.data.data
          this.$refs.tree.setCheckedNodes([])
          this.$refs.tree.setCheckedNodes([arr])
        })
        .catch(err => {
          this.loading = false
          this.$message.error('用户管理获取失败，请稍后再试！')
        })
    },
    // 保存菜单
    saveModule(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          debugger
          goodsAdd(this.form)
            .then(res => {
              this.$message.error('新增成功')
            })
            .catch(err => {
              this.$message.error('菜单管理列表保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })

      this.emptyGoodsForm()
      this.getdata()
      this.getmenu()
    },
    // 删除菜单
    deleteModule() {
      ModuleDelete(this.form.moduleId)
        .then(res => {
          this.getdata()
          this.getmenu()
          this.$message.info('菜单管理列表删除成功！')
        })
        .catch(err => {
          this.$message.error('菜单管理列表删除失败，请稍后再试！')
        })
    },
    uploadGoodsFile() {
      const goodsfile = event.target.files[0];
      const formData = new FormData();
      formData.append('file', goodsfile);
      // 上传操作
      axios.post("/api/file/upload", formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        this.form.pic = res.data.data
        debugger
        console.log(res)
      }).catch(error => {
        console.error(error)
      })

    }
  }
}
</script>

<style>
.user-search {
  margin-top: 20px !important;
}

.user-search td {
  margin-top: 20px !important;
}

.userRole {
  width: 100%;
}

.el-table__expanded-cell {
  padding: 0px !important;
  margin: 0px !important;
}

.modt-box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f0f2f5;
  text-align: center;
  color: #334157;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
}

.mod-btnbox {
  margin-bottom: 20px;
}

.treeclass {
  border: 1px solid #f3f3f3;
  padding-top: 20px;
  padding-bottom: 20px;
}

.selectw {
  width: 100%;
}
</style>

