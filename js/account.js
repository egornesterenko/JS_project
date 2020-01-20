


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
					parNode = document.getElementsByClassName('card_photo_cover')[i]
					currNode = document.createElement('span');
					currNode.className= "cost";
					currNode.innerHTML = res.data[i].cost + '$';
					parNode.appendChild(currNode);
					//
					parNode = document.getElementsByClassName('card_description')[i]
					currNode = document.createElement('div');
					currNode.className= "short_description text";
					currNode.innerHTML = res.data[i].city + ', ' + res.data[i].district + ' district, ' + res.data[i].address + ', ' + res.data[i].rooms + ' rooms, ' + res.data[i].square + ' m2';
					parNode.appendChild(currNode);
				}
			}
			
		})
		.catch(function(err){
			console.log(err);
		});
	
axios.post('/get_user_acc',{})
	.then(function(res){
		let parNode  = document.getElementsByClassName('account_info')[0];
		let currNode = document.createElement('div');
		currNode.className= "account_firstname text account_info_part";
		currNode.innerHTML = res.data.firstname;
		parNode.appendChild(currNode);
		//
		currNode = document.createElement('div');
		currNode.className= "account_lastname text account_info_part";
		currNode.innerHTML = res.data.lastname;
		parNode.appendChild(currNode);
		//
		currNode = document.createElement('div');
		currNode.className= "account_telephone account_info_part";
		currNode.innerHTML = res.data.telephone;
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
