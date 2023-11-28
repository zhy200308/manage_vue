<template>
  <div>

<!--        index页面-->
<!--        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0;">-->
<div style=" padding: 25px 0px 0px 0px; ">
<el-input style="width: 200px ;margin-left: 5px"  suffix-icon="el-icon-search" placeholder="请输入姓名" v-model="username"></el-input>

<el-input style="width: 200px;margin-left: 5px"  suffix-icon="el-icon-search" placeholder="请输入邮箱" v-model="email"></el-input>

<el-input style="width: 200px ;margin-left: 5px"  suffix-icon="el-icon-search" placeholder="请输入电话" v-model="phone"></el-input>
<el-button style="margin-left: 5px" type="primary" @click="load"  >搜索</el-button>
<el-button type="warning" @click="reset"  >重置</el-button>
</div>
<div style=" padding: 10px 0;">
<el-button type="success" size="small" @click="exp"><i class="el-icon-download" style="margin-right: 6px" ></i>导出</el-button>
  <el-upload action="http://localhost:9099/user/import" :show-file-list="false" accept="xlsx" :on-success="handleExeclImportSuccess" style="display: inline-block">
    <el-button type="warning" size="small" style="margin-left: 6px"><i class="el-icon-upload2" style="margin-right: 6px;" ></i>导入</el-button>
  </el-upload>

<!--              气泡弹窗-->
<el-popconfirm
    style="margin-left: 5px"
    confirm-button-text='确定'
    cancel-button-text='我再想想'
    icon="el-icon-info"
    icon-color="red"
    title="您确定批量删除这些数据吗？"
    @confirm="deleteBatch"
>
  <el-button type="danger" size="small" slot="reference" ><i class="el-icon-remove-outline" style="margin-right: 6px"></i>批量删除</el-button>
</el-popconfirm>
<el-button type="primary" size="small" @click="handlAdd" style="margin-left: 5px"><i class="el-icon-circle-plus-outline" style="margin-right: 6px" ></i>新增</el-button>
</div>
<!--        </div>-->
<el-table :data="tableData"
          border stripe :header-cell-class-name="headerBg"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
>
<el-table-column
    type="selection"
    width="55">
</el-table-column> <!-- 多选列 -->
<el-table-column prop="creatTime" label="日期" width="160" >
  <template slot-scope="scope">{{ scope.row.creatTime }}</template>
</el-table-column>
<el-table-column prop="username" label="姓名" width="100 " >
</el-table-column>

<el-table-column prop="nickname" label="昵称" width="100 " >
</el-table-column>
<el-table-column prop="role" label="角色" width="100 " >
</el-table-column>
<el-table-column prop="email" label="邮箱" width="120 " >
</el-table-column>
<el-table-column prop="phone" label="电话" width="120 " >
</el-table-column>
<el-table-column prop="address" label="地址">
</el-table-column>
  <el-table-column>
    <template slot-scope="scope">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <el-button type="warning" size="mini" @click="handlEdit(scope.row)"><i class="el-icon-edit-outline"></i>编辑</el-button>
        <el-popconfirm
            style="margin-top: 5px"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="Delete(scope.row.id)"
        >
          <el-button type="danger" size="mini" slot="reference"><i class="el-icon-delete"></i>删除</el-button>
        </el-popconfirm>
      </div>
    </template>
  </el-table-column>

</el-table>
<div style="padding:10px 0">
<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[5, 10, 30, 50,100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="Total">
</el-pagination>
</div>
<!--        超级管理员信息增加弹窗-->
<el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="25%" >
<el-form  label-width="80px" size="small">
  <el-form-item label="用户名" >
    <el-input v-model="form.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="昵称" label-width="80px">
    <el-input v-model="form.nickname" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="角色" >
    <el-select v-model="form.role" placeholder="请选择角色" size="small">
      <el-option label="ADMIN" value="ADMIN"></el-option>
      <el-option label="NORMAL" value="NORMAL"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="邮箱" >
    <el-input v-model="form.email" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="电话" >
    <el-input v-model="form.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-input v-model="form.address" autocomplete="off"></el-input>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="dialogFormVisible = false" >取 消</el-button>
  <el-button type="primary" @click="save">确 定</el-button>
</div>
</el-dialog>
</div>
</template>
<style>
.headerBg{
  background:#47CDE6 !important;
}
.el-table-column{
  color: #ffffff;
}
.el-aside {
  color: #333;
}

</style>
<script>


export default {
  name:'User',
  data() {
    return {
      tableData: [],
      Total:0,
      pageNum:1,
      pageSize:10,
      username:"",
      email:"",
      phone:"",
      form: {
        role: '', // 初始值为空字符串
      },
      dialogFormVisible:false,
      headerBg:'headerBg',
      multipleSelection: []
    }
  },

  created() {
    this.load()
  },

  methods:{
    EditMsg(){

    },
    exp() {
       window.open("http://localhost:9099/user/export")
    },

    handleExeclImportSuccess(){
      this.$message.success("导入成功")
      this.load()
    },
    handlEdit(row){
      this.form=row
      this.dialogFormVisible=true

    },
    Delete(id){
      this.request.delete("/user/delId="+id).then(res =>
      {
        if (res){
          this.$message.success("删除成功")
          this.load()
        }else {
          this.$message.error("删除失败")
        }
      })
    },

    load(){
      this.request.get("/user/page", {
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
          phone:this.phone,
          email:this.email
        }
      }) .then(res => {
        console.log(res)
        this.tableData=res.records
        this.Total=res.total
      })
    },
    handlAdd(){
      this.dialogFormVisible=true

      this.form={}
    },
    save(){
      this.request.post("/user",this.form).then(res =>{
      if (res){
        this.$message.success("保存成功")
        this.dialogFormVisible=false
        this.load()
        // this.handlAdd()
      }else {
        this.$message.error("保存失败")
        // this.handlAdd()
      }
    })
    },

    reset(){
      this.username=""
      this.phone=""
      this.email=""
      this.load()
    },
        handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
      console.log(pageSize)


    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
      console.log(pageNum)
    },
    handleSelectionChange(selection) {
      // 在这里处理选择改变事件
      this.multipleSelection=selection
      console.log(selection);
    },
    deleteBatch(){
      let ids=this.multipleSelection.map(v =>v.id)//[{},{},{}]
      this.request.post("user/delete/delBatch",ids).then(res =>
      {
        if (res){
          this.$message.success("批量删除成功")
          this.load()
        }else {
          this.$message.error("批量删除失败")
        }
      })
    }

  }
}
</script>
