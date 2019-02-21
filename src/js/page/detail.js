require(['../js/config.js'],function(){
	require(['mui','utils'],function(mui,url){
		console.log(mui);
		var id;
		init();
		function init(){
			console.log(url.id);
			id = url.id; //{id:''}
			mui.ajax('/api/detail',{
				dataType:'json',
				data:url,
				type:'get',
				success:function(data){
					console.log(data);
					if(data.code == 0){
						document.querySelector('.name').innerHTML = data.data[0].name;
						document.querySelector('.age').innerHTML = data.data[0].age;
						document.querySelector('.address').innerHTML = data.data[0].address;
						document.querySelector('.phone').innerHTML = data.data[0].phone;
						document.querySelector('.card').innerHTML = data.data[0].card;
					}
				}
			})
		}addEvent();
		function addEvent(){
			document.querySelector('#updates').addEventListener('tap',function(){
				console.log('2222');
				window.location.href = './add.html?id='+ id;
			})
		}
	})
})