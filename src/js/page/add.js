require(['../js/config.js'],function(){
	require(['mui','utils'],function(mui,url){
		console.log(mui,url);
		var id = url.id;
		if(id){ //修改进的
			mui.ajax('/api/detail',{
				dataType:'json',
				data:url,
				type:'get',
				success:function(data){
					if(data.code == 0){
						document.querySelector('.name').value = data.data[0].name;
						document.querySelector('.age').value = data.data[0].age;
						document.querySelector('.address').value = data.data[0].address;
						document.querySelector('.phone').value = data.data[0].phone;
						document.querySelector('.card').value = data.data[0].card;
					}
				}
			})
		}
		addEvent();
		function addEvent(){
			document.querySelector('#sure').addEventListener('tap',function(){
				var params = {
					name:document.querySelector('.name').value,
					age:document.querySelector('.age').value,
					address:document.querySelector('.address').value,
					phone:document.querySelector('.phone').value,
					card:document.querySelector('.card').value
				};
				if(id){ //修改进来的
					params.id = id;
				}
				mui.ajax('/api/add',{
					dataType:'json',
					data:params,
					type:'post',
					success:function(data){
						console.log(data);
						if(data.code == 0){
							window.location.href = '../index.html';
						}
					}
				})
			})	
		}
	})
})