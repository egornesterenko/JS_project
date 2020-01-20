axios.post("/loadUser", {})
	.then(function(res){
		if(res){
			document.getElementsByClassName('menu')[0].innerHTML += res.data.html
			document.getElementsByClassName('burger_menu')[0].innerHTML += res.data.burger
		}
	})
	.catch(function (err) {
		console.log(err);
	});
