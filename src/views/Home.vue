<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 50px">
      <el-col :span="6">
        <el-card style="color:#409EFF;">
          <div>用户总数</div>
          <div style="padding: 10px;text-align: center; font-weight: bold">1000</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color:#F56C6C;">
          <div>销售总量</div>
          <div style="padding: 10px;text-align: center; font-weight: bold">10000</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color:#67C23A;">
          <div>营业总额</div>
          <div style="padding: 10px;text-align: center; font-weight: bold">￥100000</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color:#E6A23C;">
          <div>分站数量</div>
          <div style="padding: 10px;text-align: center; font-weight: bold">30</div>
        </el-card>
      </el-col>
      <el-col :span="12" style="padding: 20px">
        <div id="main" style="width: 500px;height: 400px ;"></div>
      </el-col>
      <el-col :span="12" style="padding: 20px">
        <div id="pie" style="width: 500px;height: 400px ;margin: 0px ;padding-bottom:5px"></div>

      </el-col>
    </el-row>


  </div>

</template>
<script>
import * as echarts from 'echarts';
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return{


    }
  },
  mounted(){

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '各个季度会员注册数量',
        subtext: '趋势图',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度","第二季度","第三季度","第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line',
          smooth: true
        },
        {
          data: [],
          type: 'bar',
          smooth: true
        }
      ]
    };


  // 饼图

    pieOption = {

      title: {
        text: '各个季度会员注册数量',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name:"各个季度会员注册数量",
          type: 'pie',
          radius: '70%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比

              textStyle : {
                align : 'center',
                baseline : 'middle',
                fontFamily : '微软雅黑',
                fontSize : 15,
                fontWeight : 'bolder'
              }
            },
          },
        },


      ]
    };
    var PieChartDom = document.getElementById('pie');
    var PieMyChart = echarts.init(PieChartDom);
    var pieOption;

    //请求数据
    this.request.get("echarts/members").then(res=>{
      option.series[0].data=res.data;
      option.series[1].data=res.data;
      pieOption.series[0].data=[
        {name:"第一季度",value:res.data[0]},
        {name:"第二季度",value:res.data[1]},
        {name:"第三季度",value:res.data[2]},
        {name:"第四季度",value:res.data[3]}
      ]
      myChart.setOption(option);
      PieMyChart.setOption(pieOption);
    })


  }

}
</script>
