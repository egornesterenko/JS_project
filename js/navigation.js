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


	const shareUrl = 'hashtag.com';
	function popup(url) {
	window.open(url,'','toolbar=0,status=0,width=626,height=436');
}



