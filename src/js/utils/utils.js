define(function(){
	var str = window.location.search.substr(1).split('&');
	console.log(str);//['id=111','name=111']
	var obj = {};//{id:11,name:1111} obj.id
	for(var i = 0; i<str.length;i++){
		console.log(str[i]);
		obj[str[i].split('=')[0]] = str[i].split('=')[1];
	}
	return obj;
});