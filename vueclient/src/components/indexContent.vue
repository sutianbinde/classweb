<template>
  <div class="indexContent main">
    <h4>最新数据</h4>
    <ul class="number">
			<li>
				<div class="title">今日访问</div>
				<p>12000</p>
				<a href="javascript:;">查看详情<i class="fa fa-angle-right" aria-hidden="true"></i></a>
			</li>
			<li>
				<div class="title">学员总数</div>
				<p>3000000</p>
				<a href="javascript:;">查看详情<i class="fa fa-angle-right" aria-hidden="true"></i></a>
			</li>
			<li>
				<div class="title">在学人数</div>
				<p>2000</p>
				<a href="javascript:;">查看详情<i class="fa fa-angle-right" aria-hidden="true"></i></a>
			</li>
		</ul>
    <canvas id="barChart" height="400" width="600" style="margin:10px 0"> 你的浏览器不支持HTML5 canvas </canvas>
		
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.main{
		border-radius: 4px;
		background: #fff;
		margin-top: 10px;
		overflow: hidden;
	}
	.main > h4{
		color: #51555a;
    padding:10px;
    border-bottom: 1px solid #DFE3EA;
	}
	.number{
		width: 30%;
		float: right;
		margin-right: 10%;
		margin-top: 10px;
		color: #566A80;
	}
	.number li{
		padding: 20px;
		border-top:1px solid #F0F2F5;
	}
	.number li:first-child{
		border: none 0;
	}
	.number p{
		font-size: 20px;
		font-family: arial;
		margin: 10px 0;
	}
	.number a{
		text-decoration: none;
		color: #4187db;
		font-size: 12px;
	}
	.number li:hover{
		color: #173859;
	}
	.number a:hover{
		
	}
	.number i{
		transition: all 0.3s ease-out;
		padding-left: 10px;
	}
	.number a:hover i{
		padding-left: 20px;
	}
	.number:hover li{
		border-color:#DFE3EA
	}
	canvas{
		max-width: 55%;
		min-width: 45%;
	}
</style>

<script>

	export default {
	  name: 'indexContent',
	  data () {
	    return {

	    }
	  },
	  methods:{
		},
		mounted:function(){
			var chartData = [["2017/01", 50], ["2017/02", 60], ["2017/03", 100], ["2017/04",200], ["2017/05",350], ["2017/06",600]];
			goBarChart(chartData);
			
		}
	}
	
	function goBarChart(dataArr){
		
		
    // 声明所需变量
    var canvas,ctx;
    // 图表属性
    var cWidth, cHeight, cMargin, cSpace;
    var originX, originY;
    // 折线图属性
    var tobalDots, dotSpace, maxValue;
    var totalYNomber;
    // 运动相关变量
    var ctr, numctr, speed;

    // 获得canvas上下文
    canvas = document.getElementById("barChart");
    if(canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
    }
    initChart(); // 图表初始化
    drawLineLabelMarkers(); // 绘制图表轴、标签和标记
    drawBarAnimate(); // 绘制折线图的动画

    //点击刷新图表
    canvas.onclick = function(){
        initChart(); // 图表初始化
        drawLineLabelMarkers(); // 绘制图表轴、标签和标记
        drawBarAnimate(); // 绘制折线图的动画
    };

    // 图表初始化
    function initChart(){
        // 图表信息
        cMargin = 60;
        cSpace = 80;
        canvas.width = Math.floor( (window.innerWidth-100)/2 ) * 2 ;
        canvas.height = 740;
        canvas.style.height = canvas.height/2 + "px";
        canvas.style.width = canvas.width/2 + "px";
        cHeight = canvas.height - cMargin - cSpace;
        cWidth = canvas.width - cMargin - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;

        // 折线图信息
        tobalDots = dataArr.length;
        dotSpace = parseInt( cWidth/tobalDots );
        maxValue = 0;
        for(var i=0; i<dataArr.length; i++){
            var dotVal = parseInt( dataArr[i][1] );
            if( dotVal > maxValue ){
                maxValue = dotVal;
            }
        }
        maxValue += 50;
        totalYNomber = 10;
        // 运动相关
        ctr = 1;
        numctr = 100;
        speed = 6;

        ctx.translate(0.5,0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
    }

    // 绘制图表轴、标签和标记
    function drawLineLabelMarkers(){
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#566a80";
        ctx.strokeStyle = "#566a80";
        // y轴
        drawLine(originX, originY, originX, cMargin);
        // x轴
        drawLine(originX, originY, originX+cWidth, originY);

        // 绘制标记
        drawMarkers();
    }

    // 画线的方法
    function drawLine(x, y, X, Y){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
    }

    // 绘制标记
    function drawMarkers(){
        ctx.strokeStyle = "#E0E0E0";
        // 绘制 y 轴 及中间横线
        var oneVal = parseInt(maxValue/totalYNomber);
        ctx.textAlign = "right";
        for(var i=0; i<=totalYNomber; i++){
            var markerVal =  i*oneVal;
            var xMarker = originX-5;
            var yMarker = parseInt( cHeight*(1-markerVal/maxValue) ) + cMargin;
            //console.log(xMarker, yMarker+3,markerVal/maxValue,originY);
            ctx.fillText(markerVal, xMarker, yMarker+3, cSpace); // 文字
            if(i>0){
                drawLine(originX+2, yMarker, originX+cWidth, yMarker);
            }
        }
        // 绘制 x 轴 及中间竖线
        ctx.textAlign = "center";
        for(var i=0; i<tobalDots; i++){
            var markerVal = dataArr[i][0];
            var xMarker = originX+i*dotSpace;
            var yMarker = originY+30;
            ctx.fillText(markerVal, xMarker, yMarker, cSpace); // 文字
            if(i>0){
                drawLine(xMarker, originY-2, xMarker, cMargin	);
            }
        }
        // 绘制标题 y
        ctx.save();
        ctx.rotate(-Math.PI/2);
        ctx.fillText("访问量", -canvas.height/2, cSpace-10);
        ctx.restore();
        // 绘制标题 x
        ctx.fillText("月份", originX+cWidth/2, originY+cSpace/2+20);
    };

    //绘制折线图
    function drawBarAnimate(){
        ctx.strokeStyle = "#566a80";  //"#49FE79";

        //连线
        ctx.beginPath();
        for(var i=0; i<tobalDots; i++){
            var dotVal = dataArr[i][1];
            var barH = parseInt( cHeight*dotVal/maxValue* ctr/numctr );//
            var y = originY - barH;
            var x = originX + dotSpace*i;
            if(i==0){
                ctx.moveTo( x, y );
            }else{
                ctx.lineTo( x, y );
            }
        }
        ctx.stroke();

        //背景
        ctx.lineTo( originX+dotSpace*(tobalDots-1), originY);
        ctx.lineTo( originX, originY);
        //背景渐变色
        //柱状图渐变色
        var gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(133,171,212,0.6)');
        gradient.addColorStop(1, 'rgba(133,171,212,0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#566a80";

        //绘制点
        for(var i=0; i<tobalDots; i++){
            var dotVal = dataArr[i][1];
            var barH = parseInt( cHeight*dotVal/maxValue * ctr/numctr );
            var y = originY - barH;
            var x = originX + dotSpace*i;
            drawArc( x, y );  //绘制点
            ctx.fillText(parseInt(dotVal*ctr/numctr), x+15, y-8); // 文字
        }

        if(ctr<numctr){
            ctr++;
            setTimeout(function(){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                drawLineLabelMarkers();
                drawBarAnimate();
            }, speed);
        }
    }

    //绘制圆点
    function drawArc( x, y, X, Y ){
        ctx.beginPath();
        ctx.arc( x, y, 3, 0, Math.PI*2 );
        ctx.fill();
        ctx.closePath();
    }


	}

</script>


