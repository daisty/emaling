<style scoped lang="scss">
#app {
  .app-container {
    background-color: rgb(226, 233, 239) !important;
  }
}
.content-box {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 15px;
  padding: 10px 10px 5px 20px;
  background-color: rgb(226, 233, 239);
  &::-webkit-scrollbar {
    display: none;
  }
  .el-col-6 {
    height: 100%;
  }
}
.grid-content {
  height: 100%;
  min-height: 100px;
}
.bg-purple {
  background-color: #fff;
}
.grid-same {
  height: auto;
  margin-bottom: 20px;
  overflow: hidden;
}
.grid-content-top {
  background-color: #fff;
  border-radius: 4px;
  h3 {
    margin: 0;
    padding: 15px;
    color: #333;
  }
  .top-conter {
    padding: 0 1em 1.5em;
    .conter-guide {
      display: flex;
      justify-content: center;
      align-items: center;
      .col-8 {
        flex: 0 0 33%;
        text-align: center;
        .guide-img {
          width: 53px;
          height: 53px;
          margin-top: 30px;
        }
      }
      .col-16 {
        flex: 2;
        .guide-circular {
          font-size: 18px;
          text-align: center;
          color: #333;
          @media (max-width: 1200px) {
            font-size: 16px;
          }
        }
      }
    }
  }
}
.grid-content-center {
  height: 100%;
  overflow: hidden;
  .grid-sales {
    border-radius: 3px;
    height: 150px;
    text-align: left;
    margin-left: 0;
    margin-right: 0;
    &:nth-child(1) {
      background-color: #f7964d;
    }
    &.sale-two {
      background-color: #47c255;
    }
    &.sale-three {
      background-color: #5b90d3;
    }
    .sale-left {
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-tabs--left .el-tabs__item.is-left {
        text-align: center;
      }

      .sale-money {
        padding: 1.1em 0;
        opacity: 0.5;
        text-align: center;
        &:active {
          color: #333;
          opacity: 1;
          cursor: pointer;
        }
        &:visited {
          color: #fcf;
          opacity: 1;
          cursor: pointer;
        }
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
        @media screen and (max-width: 1419px) {
          font-size: 14px;
        }
        @media (max-width: 1280px) {
          padding: 1em 0;
        }
        @media (max-width: 1287px) {
          padding: 1.5em 0;
          font-size: 12px;
        }
      }
      .active {
        padding: 1.1em 0;
        opacity: 1;
        cursor: pointer;
      }
    }
    .sale-right {
      height: 100%;
      display: flex;
      align-items: center;
      .money-many {
        color: #fff;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
.grid-matter {
  width: 100%;
  height: 800px;
  background-color: #fff;
  .tac {
    padding: 1em;
    height: 100%;
    .wait-matter {
      font-size: 18px;
      line-height: 35px;
      padding: 10px;
    }
    .wait-text {
      padding: 10px 15px 10px 0;
      margin-left: 10px;
      color: #333;
      border-bottom: 1px solid #ececec;
      margin-bottom: 15px;
      cursor: pointer;
      font-size: 14px;
      .left {
        flex: 1;
        padding-left: 5px;
      }
      .right {
        flex: 2;
        text-align: right;
        color: #3497da;
        text-decoration: underline;
      }
    }
  }
}

.grid-content-bottom {
  width: 100%;
  height: 450px;
  background-color: #fff;
  text-align: center;
  font-size: 18px;
  margin-bottom: 0;
  h5 {
    color: #333;
  }
}
.el-tabs__active-bar {
  height: 0;
  background-color: transparent;
}
</style>

<template>
  <!-- <div class="app-container"> -->
    <el-row :gutter="20" class="content-box" v-loading="loading">
      <el-col :span="18">
        <div class="grid-content">
          <div class="grid-same grid-content-top">
            <h3>快速上手</h3>
            <div class="top-conter">
                <el-row type="flex" justify="space-between">
                  <el-col :span="8">
                    <el-row class="conter-guide">
                      <el-col class="col-8"> 
                        <img src="../../assets/home_newGuide01.png" class="guide-img"> 
                      </el-col>
                      <el-col class="col-16 guide-text"> 
                        <div class="guide-circular"> 
                          <span> 
                            <span>第一步：</span> 
                            <span>采购</span> 
                          </span> 
                        </div> 
                        <div style="border:1px solid #9F9F9F;margin-top:18px;"></div> 
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="conter-guide">
                      <el-col class="col-8"> 
                        <img src="../../assets/home_newGuide02.png" class="guide-img"> 
                      </el-col>
                      <el-col class="col-16 guide-text"> 
                        <div class="guide-circular"> 
                          <span> 
                            <span>第二步：</span> 
                            <span>销售</span> 
                          </span> 
                        </div> 
                        <div style="border:1px solid #9F9F9F;margin-top:18px;"></div> 
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="8">
                    <el-row class="conter-guide">
                      <el-col class="col-8"> 
                        <img src="../../assets/home_newGuide03.png" class="guide-img"> 
                      </el-col>
                      <el-col class="col-16 guide-text"> 
                        <div class="guide-circular"> 
                          <span> 
                            <span>第三步：</span> 
                            <span>查应收</span> 
                          </span> 
                        </div> 
                        <div style="border:1px solid #9F9F9F;margin-top:18px;"></div> 
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
            </div>
          </div>
          <div class="grid-same grid-content-center">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-row :gutter="24" class="grid-sales">
                  <el-col :span="24" class="sale-left">
                    <div>
                      <el-tabs :tab-position="tabPosition" style="height: 150px;">
                        <el-tab-pane label="本月销售收入">￥{{muchData.saleIncomeMoney}}</el-tab-pane>
                        <el-tab-pane label="本月销售回款">￥{{muchData.saleReceiptMoney}}</el-tab-pane>
                        <el-tab-pane label="本月销售数量">{{muchData.totalSaleSheetCount}}</el-tab-pane>
                      </el-tabs>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="7">
                <el-row :gutter="24" class="grid-sales sale-two">
                  <el-col :span="24" class="sale-left">
                    <div>
                      <el-tabs :tab-position="tabPosition" style="height: 150px;">
                        <el-tab-pane label="资金金额">￥{{muchData.balanceMoney}}</el-tab-pane>
                        <el-tab-pane label="客户欠款">￥{{muchData.receivablesMoney}}</el-tab-pane>
                        <el-tab-pane label="欠供应商款">￥{{muchData.debitBalanceMoney}}</el-tab-pane>
                      </el-tabs>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="7">
                <el-row :gutter="24" class="grid-sales sale-three">
                  <el-col :span="24" class="sale-left">
                    <div>
                      <el-tabs :tab-position="tabPosition" style="height: 150px;">
                        <el-tab-pane label="当前库存数量">{{muchData.totalStockItemCount}}</el-tab-pane>
                      </el-tabs>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div class="grid-same grid-content-bottom">
            <!-- <h5>销售周报</h5> -->
            <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-matter">
          <el-row class="tac">
            <el-col :span="24">
              <div class="wait-matter">
                <span>待处理事项</span>
              </div>
              <div class="wait-text">
                <el-row type="flex" justify="start">
                  <el-col :span="18">
                    <div class="left">待入库任务</div>
                    </el-col>
                  <el-col :span="18">
                    <div class="right">0</div>
                  </el-col>
                </el-row>
              </div>
              <div class="wait-text">
                <el-row type="flex" justify="start">
                  <el-col :span="18">
                    <div class="left">待入库任务</div>
                    </el-col>
                  <el-col :span="18">
                    <div class="right">0</div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
// import adminDashboard from "./admin";
// import editorDashboard from './editor'
import echarts from "echarts";
import { fetchHomeData, fetchHomeSalesData } from "@/api/index";
export default {
  name: "dashboard",
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  components: {},
  data() {
    return {
      tabPosition: "left",
      isCollapse: false,
      // currentRole: "adminDashboard",
      chart: null,
      muchData: {},
      chartData: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  mounted() {
    this.initChart();
    this.getSalesMoney();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  methods: {
    getSalesMoney() {
      // this.loading = true;
      return new Promise((resolve, reject) => {
        fetchHomeData()
          .then(response => {
            this.loading = false
            this.muchData = response.data
          })
          .catch(err => {
            console.log(err)
            reject(false)
          });
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      fetchHomeSalesData().then(response => {
        if(response.data) {
          this.chartData = response.data
          this.loading = false
          let chartY = []
          let chartX = []
          for (var i = 0; i < this.chartData.length; i++) {
            chartY[i] = this.chartData[i].saleIncomeMoney
            chartX[i] = this.chartData[i].statDate.slice(5)
          }
          // 把配置和数据放这里
          this.chart.setOption({
            color: ["#4c85fb"],
            title: {
              x: "center",
              text: "销售日报"
            },
            tooltip: {
              trigger: "axis"
              // axisPointer: {
              //   // 坐标轴指示器，坐标轴触发有效
              //   type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              // }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "2%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: chartX,
                axisTick: {
                  alignWithLabel: true
                },
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "销售收入",
                type: "line",
                smooth: true,
                barWidth: "30%",
                data: chartY
              }
            ]
          });
        }else {
          // 把配置和数据放这里
          this.chart.setOption({
            color: ["#4c85fb"],
            title: {
              x: "center",
              text: "销售日报"
            },
            tooltip: {
              trigger: "axis"
              // axisPointer: {
              //   // 坐标轴指示器，坐标轴触发有效
              //   type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              // }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "2%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: ['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07'],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "销售收入",
                type: "line",
                smooth: true,
                barWidth: "30%",
                data: [0,100,200,300,400,500,600]
              }
            ]
          });
        }

      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
.el-tabs--left .el-tabs--left .el-tabs__item {
  color: #fff;
  height: 50px;
  line-height: 50px;
}
</style>

