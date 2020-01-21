axios.post("/loadUser", {})
	.then(function(res){
		if(res){
			document.getElementsByClassName('menu')[0].innerHTML += res.data.html;
		}
	})
	.catch(function (err) {
		console.log('err');
		console.log(err);
	});
