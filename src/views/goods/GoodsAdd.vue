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
      <!--      left -->
      <el-col :span="16">

        <el-form ref="form" :model="form" label-width="200px" :rules="rules">

          <el-row :gutter="24">
            <el-col :span="20">
              <div class="grid-content bg-purple">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="所属门店:" prop="shopId">
                        <el-select size="small" v-model="form.shopId" placeholder="请选择" class="selectw">
                          <el-option v-for="parm in shopMenu" :key="parm.id" :label="parm.name"
                                     :value="parm.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="grid-content bg-purple">

                      <el-form-item label="商品分类:" prop="categoryId">
                        <el-select size="small" v-model="form.categoryId" placeholder="请选择..." class="selectw">
                          <el-option v-for="parm in goodsCategoryMenu" :key="parm.id" :label="parm.name"
                                     :value="parm.id"></el-option>
                        </el-select>
                      </el-form-item>

                    </div>
                  </el-col>

                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="商品条码:" prop="moduleName">
                        <el-input size="small" v-model="form.moduleName"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>

                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="商品名称:" prop="name">
                        <el-input size="small" v-model="form.name"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>

                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="别名:" prop="subName">
                        <el-input size="small" v-model="form.subName"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="排序:" prop="paixu">
                        <el-input size="small" v-model="form.paixu"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="推荐:" prop="recommendStatus">
                        <el-radio v-model="form.recommendStatus" label="0">推荐</el-radio>
                        <el-radio v-model="form.recommendStatus" label="1">不推荐</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="是否展示:" prop="hidden">
                        <el-radio v-model="form.hidden" label="0">正常展示</el-radio>
                        <el-radio v-model="form.hidden" label="1">默认隐藏，不在前端展示</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>

                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">

                      <el-form-item label="是否售后:" prop="afterSale">
                        <el-radio v-model="form.afterSale" label="0">否</el-radio>
                        <el-radio v-model="form.afterSale" label="1">支持</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="状态:" prop="status">
                        <el-radio v-model="form.status" label="0">上架</el-radio>
                        <el-radio v-model="form.status" label="1">下架</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="展示图片:" prop="pic">
                        <el-input size="small" style="visibility: hidden;" v-model="form.pic"></el-input>
                        <input size="small" type="file" @change="uploadGoodsFile"/>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="详细介绍:" prop="content">
                        <el-input size="small" v-model="form.content"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">

                      <el-form-item label="单位:" prop="unit">
                        <el-input size="small" v-model="form.unit"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="市场价:" prop="originalPrice">
                        <el-input size="small" v-model="form.originalPrice"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">

                      <el-form-item label="价格:" prop="minPrice">
                        <el-input size="small" v-model="form.minPrice"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">

                      <el-form-item label="税率(单位：%):" prop="tax">
                        <el-input size="small" v-model="form.tax"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="需要积分:" prop="minScore">
                        <el-input size="small" v-model="form.minScore"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple">
                      <el-form-item label="赠送积分:" prop="gotScore">
                        <el-input size="small" v-model="form.gotScore"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">

                      <el-form-item label="最少购买:" prop="minBuyNumber">
                        <el-input size="small" v-model="form.minBuyNumber"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="库存:" prop="stores">
                        <el-input size="small" v-model="form.stores"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="预警库存水位线:" prop="storeAlertNum">
                        <el-input size="small" v-model="form.storeAlertNum"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>


                <el-form-item>
                  <el-button size="small" type="primary" @click="saveModule('form')">保存</el-button>
                  <el-button size="small" type="danger" v-show="showdelete" @click="deleteModule">删除</el-button>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">

              </div>
            </el-col>
          </el-row>


        </el-form>
      </el-col>
      <el-col :span="6" style="border-left: 1px ">
        <el-button size="small" type="primary" @click="addProperty">增加规格</el-button>
        <br>
        <el-card class="box-card" shadow="always">

          <el-table :model="propertyTable" size="small" :data="mapToArray(propertyTableMap)"
                    highlight-current-row
                    v-loading="loading"
                    border
                    element-loading-text="拼命加载中" style="width: 100%;">
            <el-table-column type="index" align="center" label="序号"></el-table-column>
            <el-table-column align="center" prop="label" label="规格"></el-table-column>
<!--            <el-table-column align="center" prop="propIds" label="propIds"></el-table-column>-->
<!--            <el-table-column align="center" prop="key" label="key"></el-table-column>-->
            <el-table-column align="center" label="操作" min-width="30">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteSelected(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>


    <!-- 编辑界面 -->

    <el-dialog :title="title" :visible.sync="addPropertyFormVisible" width="60%" @click="closeDialog()">
      <!--      <div role="dialog" aria-modal="true" aria-label="规格尺寸" class="el-dialog" style="margin-top: 15vh;">-->
      <div class="el-dialog__header"><span class="el-dialog__title">规格尺寸</span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i
          class="el-dialog__close el-icon el-icon-close"></i></button>
      </div>
      <div class="el-dialog__body">
        <div class="newPropertyName">
          <div class="el-col el-col-8">
            <div class="el-input el-input-group el-input-group--prepend el-input--suffix">
              <div class="el-input-group__prepend">规格名称</div>
              <input type="text" autocomplete="off" class="el-input__inner">
            </div>
          </div>
          <button type="button" class="el-button filter-item el-button--success el-button--mini">
            <span>添加商品规格</span>
          </button>
        </div>

        <!--          规格 项-->
        <div class="el-card box-card is-always-shadow" style="margin: 16px 0px;"
             v-for="(item, index) in propretyTree">
          <div class="el-card__header">
            <div class="clearfix"><span>{{ item.name }}:</span>
              <button type="button" class="el-button el-button--text" style="float: right; padding: 3px 0px;"><!---->
                <!----><span>添加 {{ item.name }}</span>
              </button>
            </div>
          </div>
          <div class="el-card__body">
            <div role="radiogroup" class="el-radio-group" @change="handleChange(item.model,item)">
              <el-radio v-for="(option, optionIndex) in item.childs" :key="optionIndex" :label="option.id"
                        v-model="item.model">
                {{ option.name }}
              </el-radio>
            </div>
          </div>

        </div>

      </div>
      <div class="el-dialog__footer">
        <div class="dialog-footer">
          <button type="button" class="el-button el-button--default" @click="closeDialog"><!----><!----><span>取消</span>
          </button>
          <button type="button" class="el-button el-button--primary" @click="doAddProperty"><!---->
            <!----><span>提交</span></button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {

  goodsPropretyTree,
  categoryList,
  goodsAdd,
  ModuleGet,
  ModuleDelete
} from '../../api/userMG';
import axios from 'axios';

export default {
  data() {
    return {
      propertyTableMap: new Map(),
      selectedGoodsPropertyMap: new Map(),
      selectedValue: '',
      propretyTree: [],
      addPropertyFormVisible: false,
      showdelete: true,
      treeData: {},
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        properties: [],
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
    this.getGoodsPropertyTree()
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
    mapToArray(map) {
      return Array.from(map.entries()).map(([key, value]) => ({...value, key}));
    },
    // 保存菜单
    saveModule(editData) {
      this.form.properties = JSON.stringify(this.propertyTableMap)
      this.$refs[editData].validate(valid => {
        if (valid) {
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
        console.log(res)
      }).catch(error => {
        console.error(error)
      })

    },
    getGoodsPropertyTree() {
      goodsPropretyTree().then(res => {
        if (res.code == 0) {
          this.propretyTree = res.data
        }

      }).error(error => {
      })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.addPropertyFormVisible = false
    },
    addProperty() {
      this.addPropertyFormVisible = true

    },
    doAddProperty() {
      let array = this.mapToArray(this.selectedGoodsPropertyMap);
      debugger
      const obj = {label: '', key: 0,propIds: ''}
      let key = 0;
      let lab  = '';
      let ids = '';
      for (let arrayElement of array) {
        key = key + arrayElement.id
        lab = lab + ',' + arrayElement.label
        ids = ids + ',' + arrayElement.propId;
      }
      obj.label = lab
      obj.key = key
      obj.propIds = ids
      this.propertyTableMap.set(key, obj)

      this.addPropertyFormVisible = false
    },
    handleChange(value, item) {
      // 当用户选择一个单选按钮时，handleChange 方法会被调用，并传入选中的
      this.selectedValue = value; // 更新选中的值
      const row = {};
      row.propId = item.id;
      row.id = value;
      for (let rowElement of item.childs) {
        if (rowElement.id == value) {
          row.label = rowElement.name;
        }
      }

      this.selectedGoodsPropertyMap.set(item.id, row)
    },
    deleteSelected(index, row) {
      console.info('prodId=' + row.key)
      this.propertyTableMap.delete(row.key)
    },

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

