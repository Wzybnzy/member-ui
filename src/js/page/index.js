require(['./js/config.js'],function(){
	require(['mui'],function(mui){
		console.log(mui);
		var page = 1,
			pageSize = 10,
			total = 0;
		init();
		addEvent();
		function init(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
		}
		function render(data){
			console.log(data);
			var html = '';
			data.forEach(function(v,i){
				html += `<li class="mui-table-view-cell" data-id="${v._id}">${v.name}
					<div class="btns">
						<button type="button" class="mui-btn mui-btn-primary mui-detail">查看详情</button>
						<button type="button" class="mui-btn mui-btn-danger mui-del">删除</button>
					</div>
				</li>`;
			});
			document.querySelector('#mui-table-view').innerHTML += html;
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
		}
		
		function addEvent(){
			//点击添加
			document.querySelector('#add').addEventListener('tap',function(){
				window.location.href = './page/add.html';
			})
			//点击查看详情
			mui('.mui-table-view').on('tap','.mui-detail',function(){
				var id = this.parentElement.parentElement.dataset.id;
				console.log(id);
				window.location.href = './page/detail.html?id='+id;
			});
			//点击删除
			mui('.mui-table-view').on('tap','.mui-del',function(){
				var lis = this.parentElement.parentElement
				var id = lis.dataset.id;
				var btnArray = ['取消', '确定'];
				mui.confirm('确定要删除吗？', '删除', btnArray, function(e) {
					if (e.index == 1) {
						console.log(111);
						//删除
						mui.ajax('/api/del',{
							dataType:'json',
							type:'get',
							data:{
								id:id
							},
							success:function(data){
								if(data.code == 0){
									document.querySelector('.mui-table-view').removeChild(lis);
								}
							}
						})
					} else {
						console.log(222);
					}
				})
			});
		}
		
		var count = 0;
		function pullupRefresh() {
			// console.log(1111);
			ajax();
			page++;
		}
		function ajax(){
			mui.ajax('/api/list',{
				dataType:'json',
				type:'get',
				data:{
					page:page,
					pageSize:pageSize
				},
				success:function(data){
					console.log(data);
					if(data.code == 0){
						render(data.data);
					}
				}
			});
		}
	})
})