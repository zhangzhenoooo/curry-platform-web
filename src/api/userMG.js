import axios from 'axios';
import {loginreq, req, doPostJSON} from './axiosFun';

// 登录接口
export const login = (params) => {
  return loginreq("post", "/api/login", params)
};
// 获取用户菜单
export const menu = (params) => {
  return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 退出接口
export const loginout = () => {
  return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};

/**
 * 用户管理
 **/
// 用户管理-获取用户列表
export const userList = (params) => {
  return req("post", "/api/User/list", params)
};
// 用户管理-保存（添加编辑）
export const userUpdate = (params) => {
  return req("post", "/api/User/update", params)
};
// 用户管理-删除用户
export const userDelete = (params) => {
  return axios.delete("/api/User/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 用户管理-重置密码
export const userPwd = (params) => {
  return req("post", "/api/User/pwd", params)
};
// 用户管理-修改状态
export const userLock = (params) => {
  return axios.get("/api/User/lock?userId=" + params.userId + "&status=" + params.status + "&token=" + localStorage.getItem('logintoken'))
};
// 用户管理-数据权限
export const UserDeptTree = (params) => {
  return axios.get("/api/UserDept/tree/" + params + "?token=" + localStorage.getItem('logintoken'))
};
// 用户管理-数据权限保存
export const UserDeptSave = (params) => {
  return req("post", "/api/UserDept/save", params)
};
// 用户管理-获取部门设置
export const UserDeptdeptTree = (params) => {
  return axios.get("/api/UserDept/deptTree/" + params + "?token=" + localStorage.getItem('logintoken'))
};
// 用户管理-保存部门设置
export const UserChangeDept = (params) => {
  return req("post", "/api/User/change/dept", params)
};
// 用户管理-用户下线
export const userExpireToken = (params) => {
  return req("get", "/api/User/expireToken/" + params, {})
};
// 用户管理-刷新缓存
export const userFlashCache = (params) => {
  return req("get", "/api/User/flashCache/" + params, {})
};

/**
 * 菜单管理
 **/
// 菜单管理-获取菜单Module/list
export const ModuleList = () => {
  return req("post", "/api/Module/list")
};
// 菜单管理-根据菜单获取数据
export const ModuleGet = (params) => {
  return axios.get("/api/Module/get/" + params + "?token=" + localStorage.getItem('logintoken'))
};
// 菜单管理-获取父级菜单Module/nodes
export const ModuleNodes = (params) => {
  return req("post", "/api/Module/nodes", params)
};
// 菜单管理-修改菜单
export const ModuleSave = (params) => {
  return req("post", "/api/Module/save", params)
};
// 菜单管理-删除菜单
export const ModuleDelete = (params) => {
  return axios.delete("/api/Module/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};

/**
 * 角色管理
 **/
// 角色管理-获取角色列表
export const roleList = (params) => {
  return req("post", "/api/Role/list", params)
};
// 角色管理-保存（添加编辑）
export const roleSave = (params) => {
  return req("post", "/api/Role/save", params)
};
// 角色管理-删除角色
export const roleDelete = (params) => {
  return axios.delete("/api/Role/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 角色管理-菜单权限（获取）
export const RoleRightTree = (params) => {
  return axios.get("/api/RoleRight/tree/" + params + "?token=" + localStorage.getItem('logintoken'))
};
// 角色管理-菜单权限（保存）
export const RoleRightSave = (params) => {
  return req("post", "/api/RoleRight/save", params)
};

/**
 * 商品管理
 **/
// 商品管理-获取商品列表
export const deptList = (params) => {
  return req("post", "/api/goods/list", params)
};
// 商品管理-新增商品
export const goodsAdd = (params) => {
  return req("post", "/api/goods/add", params)
};
// 商品管理-修改商品
export const goodsAEdit = (params) => {
  return req("post", "/api/goods/edit", params)
};
// 商品管理-新增商品
export const deptSave = (params) => {
  return req("post", "/api/Dept/save", params)
};
// 商品管理-删除商品
export const deptDelete = (params) => {
  return axios.get("/api/goods/delete?id=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 商品管理-商品详情
export const goodsDetail = (params) => {
  return axios.get("/api/goods/detail?id=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
export const goodsDeleteBatch = (params) => {
  return doPostJSON("/api/goods/deleteBatch", params)
};

/**
 * 商品分类管理
 */

// 商品分类-获取列表
export const categoryList = (params) => {
  return req("post", "/api/goods/category/list", params)
};
// 商品分类-获取列表
export const categoryDeleteById = (params) => {
  return axios.get("/api/goods/category/delete?id=" + params).then(res => res.data)
};
// 商品分类-获取列表
export const categoryDeleteAll = (params) => {
  return axios.get("/api/goods/category/deleteAll?shopid=" + params).then(res => res.data)
};
// 新增或者修改
export const categorySaveOrUpdate = (params) => {
  return req("post", "/api/goods/category/saveOrUpdate", params)
};

export const goodsPropretyListByPropId = (params) => {
  return req("get", "/api/goods/property/list?propertyId=" + params).then(res => res)
};
export const goodsPropretySave = (params) => {
  return req("post", "/api/goods/property/save", params)
};
export const goodsPropretyUpdate = (params) => {
  return req("post", "/api/goods/property/update", params)
};
export const goodsPropretyDelete = (params) => {
  return req("get", "/api/goods/property/delete?id=" + params).then(res => res)
};
export const goodsPropretyTree = () => {
  return req("get", "/api/goods/property/tree").then(res => res)
};


export const categoryDeleteBatch = (params) => {
  return doPostJSON("/api/goods/category/deleteBatch", params)
};

/**
 * 系统环境变量
 **/
// 系统环境变量-获取系统环境变量列表
export const variableList = (params) => {
  return req("post", "/api/Variable/list", params)
};
// 系统环境变量-保存（添加编辑）
export const variableSave = (params) => {
  return req("post", "/api/Variable/save", params)
};
// 系统环境变量-删除系统环境变量
export const variableDelete = (params) => {
  return axios.delete("/api/Variable/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};

/**
 * 权限管理
 **/
// 权限管理-获取权限列表
export const permissionList = (params) => {
  return req("post", "/api/Permission/list", params)
};
// 权限管理-保存权限
export const ermissionSave = (params) => {
  return req("post", "/api/Permission/save", params)
};
// 权限管理-删除权限
export const ermissionDelete = (params) => {
  return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 权限管理-获取权限
export const roleDropDown = () => {
  return axios.get("/api/Role/dropDown/all?&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 权限管理-配置权限
export const RolePermission = (params) => {
  return req("post", "/api/RolePermission/save", params)
};

// 通知管理 notice
// 通知管理-获取用户列表
export const noticeList = (params) => {
  return req("post", "/api/notice/list", params)
};
// 通知管理-编辑
export const noticeUpdate = (params) => {
  return req("post", "/api/notice/update", params)
};
// 通知管理-保存|编辑
export const noticeAdd = (params) => {
  return req("post", "/api/notice/add", params)
};
// 通知管理-删除
export const noticeDelete = (params) => {
  return axios.delete("/api/notice/delete?id=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 通知管理-删除
export const noticeChangeStatus = (params) => {
  return axios.get("/api/notice/changeStatus?id=" + params.id + "&isShow=" + params.isShow + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 通知管理-批量删除
export const noticeDeleteBatch = (params) => {
  return axios.delete("/api/notice/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
export const noticeDetail = (params) => {
  return axios.get("/api/notice/detail?&id=" + params).then(res => res.data)
};



// 通知管理 banner
// 通知管理-获取用户列表
export const bannerList = (params) => {
  return req("post", "/api/banner/list", params)
};
// 通知管理-编辑
export const bannerUpdate = (params) => {
  return req("post", "/api/banner/update", params)
};
// 通知管理-保存|编辑
export const bannerAdd = (params) => {
  return req("post", "/api/banner/add", params)
};
// 通知管理-删除
export const bannerDelete = (params) => {
  return axios.delete("/api/banner/delete?id=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 通知管理-删除
export const bannerChangeStatus = (params) => {
  return axios.get("/api/banner/changeStatus?id=" + params.id + "&status=" + params.status + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
// 通知管理-批量删除
export const bannerDeleteBatch = (params) => {
  return axios.delete("/api/banner/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data)
};
export const bannerDetail = (params) => {
  return axios.get("/api/banner/detail?&id=" + params).then(res => res.data)
};
