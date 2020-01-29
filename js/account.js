
window.addEventListener('load', function(){
	axios.post('/get_user_articles', {})
		.then(function(res){
			if(res.data){
				for(let i = 0; i < res.data.length; i++){
					//
					let parNode  = document.getElementsByClassName('account_adverts_wrapper')[0];
					let currNode = document.createElement('div');
					currNode.className= "card";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo";
					currNode.style.backgroundImage = `url(${res.data[i].photos[0]})`;
					parNode.appendChild(currNode);
					//
					currNode = document.createElement('div');
					currNode.className= "card_description";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo')[i]
					currNode = document.createElement('div');
					currNode.className= "card_photo_cover";
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo_cover')[i]
					currNode = document.createElement('span');
					currNode.className= "topic";
					currNode.innerHTML = res.data[i].topic;
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_photo_cover')[i]
					currNode = document.createElement('button');
					currNode.className= "button_remove_article";
					currNode.innerText = 'remove';
					parNode.appendChild(currNode);
					//
					document.getElementsByClassName('card_description')[i].style.width = '100%';
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "short_description text";
					currNode.innerHTML = res.data[i].full_description
					parNode.appendChild(currNode);
				}
			}

			
		for(let i = 0; i < document.getElementsByClassName('card').length; i++){
			document.getElementsByClassName('card')[i].getElementsByClassName('card_description')[0].onclick = function(){
			window.location.href = `http://localhost:8080/article?articleId=${res.data[i].articleId}`
		}

		document.getElementsByClassName('button_remove_article')[i].onclick = function(){
			axios.post('/remove_article', {
				num: i
			})
				.then(function(res){
					let parentElem = document.getElementsByClassName('account_adverts_wrapper')[0]
					let elem = document.getElementsByClassName('card')[i]
					parentElem.removeChild(elem)
				})
				.catch(function(err){
					console.log(err);
				});
		};}						
		})
		.catch(function(err){
			console.log(err);
		});

		
});

axios.post('/get_user_acc',{})
	.then(function(res){
		let parNode  = document.getElementsByClassName('account_info')[0];
		let currNode = document.createElement('div');
		currNode.className= "account_firstname text account_info_part";
		currNode.innerHTML = res.data.firtname;
		parNode.appendChild(currNode);
		//
		currNode = document.createElement('div');
		currNode.className= "account_lastname text account_info_part";
		currNode.innerHTML = res.data.lastname;
		parNode.appendChild(currNode);
		//
		currNode = document.createElement('div');
		currNode.className= "account_telephone account_info_part";
		currNode.innerHTML = "Mobile: " + res.data.telephone;

		parNode.appendChild(currNode);
		//
		currNode = document.createElement('div');
		currNode.className= "account_email text account_info_part";
		currNode.innerHTML = res.data.email;
		parNode.appendChild(currNode);
	})
	.catch(function(err){
		console.log(err);
	});


