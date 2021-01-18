				//定义游戏变量
				var score = 0;// 变量
				var record = localStorage.getItem('record') || 0; //显示最高分，“or”逻辑
				var hasmouse = true; //判断mouse是否还存在与hole
				var remianlife = 3 //定义玩家生命
				$('.record span').text(record) //渲染最高分，class捕捉器
				
				//定义生成小鼠的函数
				function moleGenerator() {
					//生成一个1到9的随机数用来拼接选择器
					var rd = (Math.floor(Math.random() * 9) + 1)
					//拼接选择器，选中对应的id为 d+随机数所对应的元素，如随机数rd的值为3，则 rn = $('#d'+3) ==> $('#d3')
					var rn = $('#d' + rd)
					//给选中的展示洞口div的元素添加一个我们自定义的属性 hasMole,表示当前这个洞口里有小鼠
					rn.prop('hasMole', true)
					//生成一个游离的图片节点对象并通过appendTo()方法将它添加到当前选中的展示洞口的div元素里  ==> <div><img></div>
					var img = $('<img src="img/moles.png">').appendTo(rn)
					hasmouse = true; //重置hasmouse属性，默认出现图片的hole就有mouse
					//为了让小鼠在生成的一段时间后能小时，我们调用js的内置函数 setTimeout
					//该函数的作用时延时执行某些功能
					//第一个参数是一个匿名函数用来定义要延迟执行的事件逻辑，第二个参数是指定要延迟多久，单位是千分秒ms
					var intervalId = setTimeout(function() {
						//为了让小鼠图片消失，我们可以粗暴地清空洞口div里的所有内容
						//这样操作可以将嵌在其中的img元素删除，小鼠也就消失了	
						rn.find("img").remove()
						//我们还要移除我们绑定在洞口上的自定以属性hasMole,以表明这个洞口不再有小鼠占据
						rn.removeProp('hasMole') // 判断是否敲击，减命
					   // 判断mouse是否被敲击，如果敲击则不进入循环
						if (hasmouse){
						   if (remianlife >= 1){ //判断是否有足够生命值用于死亡
							 remianlife -=1 //减一血
						     $(".life").css("background-position", "-"+(272-(remianlife*100))+"px 0px") //玄学调整显示区域，使小鼠显示灰色（减法）
						     hasmouse = true //重置mouse的属性
						  }
						  else {over()} //如果血不足，直接进入死亡
					}
					}, 1000)
        
				}
				
				
				//定义游戏运行的函数
				function game() {
					//设置定时函数，每隔1100毫秒（1.1秒）执行一次上面定义的小鼠生成函数
					timeId = setInterval('moleGenerator()', 1100)
					//以jQuery的方式给所有的洞口div绑定点击事件的监听
					$('.hole').on('click', function() {
						//如果鼠标在洞口上方点击并且当前的洞口有hasMole属性
							if($(this).prop("hasMole")){
								//将当前洞口div中的img清除，表示小鼠被敲走
								$(this).empty() 
								AddScore() //加分算法
								RecordMax() //存储最大值
								hasmouse = false //设置hasmouse属性，表示小鼠已经被敲击离开
								//创建一个游离的文字节点然后添加到当前的洞口div元素中，并以fadeOut的形式淡出
								$('<span class = "msg">+100<span>').appendTo($(this)).fadeOut()
							}
					})		
				}
				//加分函数
				function AddScore()
				{
				    score+=100;
				    document.getElementById("score").innerHTML=score; // 捕获之前的分数，并插入
				}

				
				function RecordMax() //伪本地储存

				{
					var storage = localStorage
					if (score > record){
						record = score
						 storage.setItem("record",record)
						 if(storage.getItem("record")){
						 	//后代选择器
						 	//record = storage.getItem("record")
							$('.record span').text(record)//捕获class 显示record
						 //document.getElementById("record").innerHTML = localStorage.getItem("record");
					}
				}
				
				}
				
				function over()
				{
		　          　window.location.href='Overpage.html'
				}
				
				function begin_change()
				{
					window.location.href='index.html'
				}
				function begin()
				{
					timeId = setInterval('begin_change()', 3400)
				}
				
				
				function timer()
				{
					$("button").click(function(){
						$("#Gbegin").empty();
									});
					$(`<div class = "time">
			<script>
				//调用执行begin()函数
				begin()
			</script>
		</div>
							`).appendTo($("div"))
				}