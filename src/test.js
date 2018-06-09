var arr1=[];//一维数组
var arr2=[];//二维数组
var arr3=[];//三维数组

//必须，逐层赋值
arr1.push(0);
arr1.push(1);
arr2[0]=arr1;
arr3[0]=arr2;
//可以直接访问元素
console.log(arr3[0][0][0],arr3[0][0][1]);


var tableParam =['billNum','jar','type','totalCount','totalColor','totalStockIn','unit','inventory']
console.log("the table Param is: "+tableParam[0])

var tableData = [];

for(var i = 0; i < 10; i++){
  var arr2 = [];
  for(var j = 0;j < 8; j++) {
    var arr1 = [];
    arr1.push(tableParam[j]);
    arr1.push("");
    arr1.push(false)

    arr2.push(arr1);
  }
  tableData.push(arr2)
  // console.log(tableData[0][0])
  // this.tableData.push({ billNum: { value: 'nihao'+i, show: false }, jar: { value: '', show: false }, type: { value: '', show: false }, totalCount: { value: '', show: false }, totalColor: { value: '', show: false }, totalStockIn: { value: '', show: false }, unit: '米', inventory: { value: '', show: false }},)
}
