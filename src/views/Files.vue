<script >
export default {
name:'Files',
data(){
  return{
    tableData: [],
    Total:0,
    pageNum:1,
    pageSize:10,
    multipleSelection: [],
    name:'',
    headerBg: ''

  }
},created() {
  this.load()
  },
  methods:{
    handleFilesUploadSuccess(){
      this.$message.success("导入成功")
      this.load()
    },

    Delete(id){
      this.request.delete("/files/delId="+id).then(res =>
      {
        if (res.data){
          this.$message.success("删除成功")
          this.load()
        }else {
          this.$message.error("删除失败")
        }
      })
    },

    load(){
      this.request.get("/files/page", {
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
        }
      }) .then(res => {
        console.log(res)
        this.tableData=res.data.records
        this.Total=res.data.total
      })
    },
    downLoadFile(url){
    window.open(url)
    },
    changeEnable(row){
      this.request.post("/files/update",row).then(res=>{
        if (res.code==='200'){
          this.$message.success("操作成功")

        }
      })
    },
    reset(){
      this.name=""

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
    handleSelectionChangeFiles(selection) {
      // 在这里处理选择改变事件
      this.multipleSelection=selection
      console.log(selection);
    },
    deleteBatch(){
      let ids=this.multipleSelection.map(v =>v.id)//[{},{},{}]
      this.request.post("files/delete/delBatch",ids).then(res =>
      {
        if (res.code==='200'){
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

<template>
  <div>
  <div style=" padding: 25px 0px 0px 0px; ">
    <el-input style="width: 200px ;margin-left: 5px"  suffix-icon="el-icon-search" placeholder="请输入文件名" v-model="name"></el-input>
  <el-button style="margin-left: 5px" type="primary" @click="load"  >搜索</el-button>
    <el-button type="warning" @click="reset"  >重置</el-button>
  </div>
  <div style=" padding: 10px 0;">
    <el-upload action="http://localhost:8081/files/upload" :show-file-list="false" :on-success="handleFilesUploadSuccess" style="display: inline-block">
      <el-button type="warning" size="small" style="margin-left: 6px"><i class="el-icon-upload2" style="margin-right: 6px;" ></i>上传文件</el-button>
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
<!--    <el-button type="primary" size="small" @click="handlAdd" style="margin-left: 5px"><i class="el-icon-circle-plus-outline" style="margin-right: 6px" ></i>新增</el-button>-->
  </div>
  <el-table :data="tableData"
            border stripe :header-cell-class-name="headerBg"
            @selection-change="handleSelectionChangeFiles"
            ref="multipleTable"
  >

    <el-table-column
        type="selection"
        width="55">
    </el-table-column> <!-- 多选列 -->
    <el-table-column prop="id" label="id" width="280" >
      <template slot-scope="scope">{{ scope.row.id }}</template>
    </el-table-column>
    <el-table-column prop="name" label="文件名称" width="200 " >
    </el-table-column>
    <el-table-column prop="type" label="文件类型" width="100 " >
    </el-table-column>

    <el-table-column prop="size" label="文件大小(kb)" width="120 " >
    </el-table-column>
    <el-table-column  label="下载" width="130 " >
      <template slot-scope="scope">
        <el-button type="primary" @click="downLoadFile(scope.row.url)">下载</el-button>
      </template>
    </el-table-column>
    <el-table-column  label="启用" width="120 " >
      <template slot-scope="scope">
        <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
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
  </div>
</template>

<style>

</style>
