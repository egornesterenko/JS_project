// window.addEventListener('load', async function(){
axios.post('/get_feedback', {})
	.then( function(res){
		if(res.data){
			for(let i = 0; i < res.data.length; i++){
				//
				let parNode  = document.getElementsByClassName('feedback_wrapper')[0];
				let currNode = document.createElement('div');
				currNode.className= "feedback_block";
				parNode.appendChild(currNode);
				//
				parNode  = document.getElementsByClassName('feedback_block')[i];
				currNode = document.createElement('div');
				currNode.className= "feedback";
				parNode.appendChild(currNode);
				
				//
				parNode = document.getElementsByClassName('feedback')[i]
				currNode = document.createElement('div');
				currNode.className= "feedback_username text";
				currNode.innerHTML = `${res.data[i].name}`;
				parNode.appendChild(currNode);
				//
				currNode = document.createElement('div');
				currNode.className= "feedback_text text";
				currNode.innerHTML = `${res.data[i].text}`;
				parNode.appendChild(currNode);
				//
				currNode = document.createElement('div');
				currNode.className= "feedback_time";
				currNode.innerHTML = `${res.data[i].time}`;
				parNode.appendChild(currNode);
				//
			}
			
		}
		
	})
	.catch(function(err){
		console.log(err);
	});


window.addEventListener('load', function(){
	axios.post("/loadUser", {})
		.then(function(res){
			if(res.data.id === 'admin'){
				console.log(document.getElementsByClassName('feedback_block')[0].innerHTML)
				for(let i = 0; i < document.getElementsByClassName('feedback_block').length; i++){
					let parNode = document.getElementsByClassName('feedback_block')[i];
					let currNode = document.createElement('div');
					currNode.setAttribute('onclick', 'removeFeedbackClick()');
					currNode.className= "button_remove_feedback";
					currNode.innerText = 'Remove';
					parNode.appendChild(currNode);
					
					document.getElementsByClassName("button_remove_feedback")[i].onclick = function(){
						axios.post('/remove_feedback', {
							num: i
						})
						.then(function(res){
							const parentElem = document.getElementsByClassName('feedback_wrapper')[0];
							const elem = document.getElementsByClassName('feedback_block')[i]
							parentElem.removeChild(elem)
							window.location.reload()
						})
						.catch(function(err){
							console.log(err);
						});
						}
					}
					
					
				}
			else if(res.data.id){
				// let parNode = document.getElementsByTagName('body')[0];
				// let currNode = document.createElement('div');
				// currNode.className= "leave_feedback_block";
				// parNode.appendChild(currNode);
				
				let parNode = document.getElementsByClassName('leave_feedback_block')[0]
				let currNode = document.createElement('label');
				currNode.className= "leave_feedback_text text";
				currNode.setAttribute('for', 'leave_feedback');
				currNode.innerText = `Write a commnet:`;
				currNode.style.fontFamily = 'Montserrat';
				parNode.appendChild(currNode);
				
				currNode = document.createElement('textarea');
				currNode.setAttribute('id', 'leave_feedback');
				parNode.appendChild(currNode);
				
				currNode = document.createElement('div');
				currNode.className= "feedback_send button";
				currNode.innerHTML = `Send`;
				parNode.appendChild(currNode);
				
				document.getElementsByClassName('feedback_send')[0].onclick = function (){
					axios.post('/post_feedback', {
						text: `${document.getElementById('leave_feedback').value}`
					})
						.then(function(res, req){
							console.log(req)
							console.log(res)
							//window.location.reload()
						})
						.catch(function (err) {
							console.log(err);
						});
				}
			}
			else{
				let parNode = document.getElementsByClassName('feedback_wrapper')[0]
				let currNode = document.createElement('div');
				currNode.className= "not_user_text text";
				currNode.innerText = `Please, log in or sign up to leave comments`;
				parNode.appendChild(currNode);
			}
			
		})
		.catch(function (err) {
			console.log(err);
		});
});
