/**
 * Created by Administrator on 2017/1/3 0003.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var time = pageState.nowGraTime;
    var colors = ['blue','red','green'];
    var i=0;
    var divContainer = document.getElementsByClassName('aqi-chart-wrap')[0];
    divContainer.innerHTML = '';
    var flag=0;
    var width=0;
    if (time === 'day') {
       width=8;
    }else if(time==='week'){
        width=16;
    }else{
        width=24;
    }

    for (x in chartData) {
        flag+=width;
        var div = document.createElement('div');
        div.style.height = chartData[x];
        div.setAttribute('title',x + '--' + chartData[x]);
        div.style.backgroundColor = colors[i];
        if(i===2)
            i=0;
        else
            i++;

        div.style.position = 'absolute';
        div.style.bottom = '0px';
        div.style.left = flag + 'px';
        div.style.width = width + 'px';
        div.style.float = 'left';

        divContainer.appendChild(div);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var gra = pageState.nowGraTime;
    var radios = document.getElementsByTagName('input');
    var t;
    for(var i=0;i<radios.length;i++){
        if(radios[i].checked){
            t = radios[i].value;
        }
    }
    if(t===gra)
        return;
    // 设置对应数据
    pageState.nowGraTime = t;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var sc = pageState.nowSelectCity;
    var se = document.getElementById('city-select');
    var index = se.selectedIndex;
    if(sc==index)
        return;
    // 设置对应数据
    pageState.nowSelectCity = index;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementsByTagName('input');
    for(var i=0;i<radios.length;i++){
        radios[i].onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var se = document.getElementById('city-select');
    for(x in aqiSourceData){
        var e = document.createElement('option');
        e.innerHTML = x;
        se.appendChild(e);
    }

    // for(x in aqiSourceData){
    //     for(i in aqiSourceData[x]){
    //         console.log(i + '\n');
    //     }
    // }


    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    se.onchange = citySelectChange;
    pageState.nowSelectCity = 0;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    chartData = {};//置空
    // 将原始的源数据处理成图表需要的数据格式
    var cityIndex = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    var i=0;
    var cityNums;
    for(x in aqiSourceData){
       if(i==cityIndex) {
           cityNums = aqiSourceData[x];
           i=0;
       }
       else
           i++;
    }

    // 处理好的数据存到 chartData 中
    if(time==='day'){
        for(x in cityNums){
            chartData[x] = cityNums[x];
        }

    }else if(time==='week'){
        var i=1;
        var total=0;
        for(x in cityNums){
            total += cityNums[x];
            i++;
            if(i%7 === 0){
                var weekNum = i/7;
                var week = '第'+weekNum+'周';
                chartData[week] = total/7;
                total=0;
            }
        }
    }else{
        var total=0;
        var mouth=0;
        var day=0;
        for(x in cityNums){
            mouth = x.slice(5,7);//2016-01-01
            day = x.slice(8);
            total+=cityNums[x];
            if((mouth==02 && day==29)||day==31){
                chartData[mouth+'月'] = total/day;
                total=0;
            }
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();