
//filters for custom choose

function filter_by_topic(value){
	return value.topic === document.getElementById('filter_topic').value;
}


function filter(someData, topic) {
	if(topic){
		let sdata = someData.filter(filter_by_topic);
		return sdata;
	}
	else{
		return someData;
	}
}

//
let config = {
		max_results: 1,
		max_per_page: 9,
		page: 1
	},
	nOfPages = Math.ceil( config.max_results / config.max_per_page );


function changeConfigs(someData){
	config = {
		max_results: someData.length,
		max_per_page: 9,
		page: 1
	},
		nOfPages = Math.ceil( config.max_results / config.max_per_page );
}


//Function for initialisation the number of the page and pages controller
function init(someData){
	document.getElementsByClassName("next")[0].onclick = function() {
		pager("next", someData);
		return false;
	};
	document.getElementsByClassName("next")[1].onclick = function() {
		pager("next", someData);
		return false;
	};
	document.getElementsByClassName("previous")[0].onclick = function() {
		pager("previous", someData);
		return false;
	};
	document.getElementsByClassName("previous")[1].onclick = function() {
		pager("previous", someData);
		return false;
	};
	document.getElementsByClassName("page_nav")[0].onclick = function(e) {
		let page = e.target.getAttribute("data-page");
		if(page){
			pager("goto", someData, page);
		}
		return false;
	};
	document.getElementsByClassName("page_nav")[1].onclick = function(e) {
		let page = e.target.getAttribute("data-page");
		if(page){
			pager("goto", someData, page);
		}
		return false;
	};
	document.getElementsByClassName("goto")[0].onclick = function() {
		const page = document.getElementsByClassName("page_input")[0]
		if(parseInt(page.value)){
			pager("goto",someData, page.value);
		}
		page.value = '';
		return false;
	};
	document.getElementsByClassName("goto")[1].onclick = function() {
		const page = document.getElementsByClassName("page_input")[1]
		if(parseInt(page.value)){
			pager("goto",someData, page.value);
		}
		page.value = '';
		return false;
	};
	
	update_page(someData);
}

//Work with next/prev/goto
function pager(action, someData, page) {
	switch (action) {
		case "next":
			if( (config.page + 1) < nOfPages){
				++config.page;
			}
			break;
		
		case "previous":
			if( (config.page - 1) >= 1 ){
				--config.page;
			}
			break;
		
		case "goto":
			config.page = parseInt(page);
			break;
		
		default:
			break;
	}
	update_page(someData);
}

//renew the page
function update_page(someData){
	document.getElementsByClassName("page_nav")[0].innerHTML = build_nav(someData);
	document.getElementsByClassName("page_nav")[1].innerHTML = build_nav(someData);
	build_results(someData);
	
	
	// document.getElementsByClassName('pagination_page')[config.page-1]
	// document.getElementsByClassName('pagination_page')[config.page-1 + nOfPages].style.backgroundColor = "#81aaa7"
}

//Building navigation bar
function build_nav() {
	let page_nav = '';
	for(let i = 1; i <= nOfPages; i++ ){
		if(i === 1 || i === nOfPages || i-1 === config.page || i+1 === config.page || i === config.page){
			if(i === config.page){
			page_nav += "<div class='pagination_page' style=\"background-color: #81aaa7\" data-page=" + i + ">" + i + "</div>";
			}
			else {
				page_nav += "<div class='pagination_page' style=\"background-color: #d5e0df\" data-page=" + i + ">" + i + "</div>";
			}
		}
		else if(!page_nav.match(/n>$/)){
			page_nav += "<span>...</span>"
		}
	}
	return page_nav;
}



function build_results(someData) {
	document.getElementsByClassName('card_container')[0].innerHTML = '';
	let start = ( config.page !== 1 )? (config.page - 1) * config.max_per_page : 0;
	let end;
	if(config.max_results - start < config.max_per_page){
		end = config.max_results;
	}
	else {
		end = config.max_per_page + start;
	}
	
	for(let i = 0; i < end - start; i++){
		//
		let parNode  = document.getElementsByClassName('card_container')[0];
		let currNode = document.createElement('div');
		currNode.className= "card";
		parNode.appendChild(currNode);
		//
		parNode = document.getElementsByClassName('card')[i]
		currNode = document.createElement('div');
		currNode.className= "card_photo";
		currNode.style.backgroundImage = `url(${someData[i + start].photos[0]})`;
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
		currNode.className= "type";
		currNode.innerHTML = 'Topic is ' + someData[i + start].topic;
		parNode.appendChild(currNode);
		//
		parNode = document.getElementsByClassName('card_description')[i]
		currNode = document.createElement('div');
		currNode.className= "card_id";
		currNode.innerHTML = `ID: ${someData[i + start].id}`;
		parNode.appendChild(currNode);
	}
	for(let i = 0; i < document.getElementsByClassName('card').length; i++){
		console.log('fuck')
		document.getElementsByClassName('card')[i].onclick = function(){
			let start = document.getElementsByClassName('card_id')[i].innerHTML.lastIndexOf(' ');
			let id = document.getElementsByClassName('card_id')[i].innerHTML.substr(start+1);
			window.location.href = `http://localhost:8080/article?articleId=${id}`
		}
	}
}


const start = (window.location.href.lastIndexOf('?') === -1) ? window.location.href.length - 1 : (window.location.href.lastIndexOf('?'));
const param =  window.location.href.substr(start+1);
let search_word = null;
if(!param){
	search_word = window.location.href.substr(start+1)
}

if(search_word){
	axios.post("/search", {
		search_word: search_word
	})
		.then(function(res){
			if(res){
				changeConfigs(res.data);
				init(res.data);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
}
else{
	axios.post("/findArticle", {
		type: param
	})
		.then(function(res){
			let set = new Set();
			console.log(res.data)
			res.data.forEach((obj) => {
				set.add(obj.topic)
			})
			for(let item of set){
				let parNode  = document.getElementById('filter_topic');
				let currNode = document.createElement('option');
				currNode.innerText = item;
				currNode.className= "filter_topic_option";
				parNode.appendChild(currNode);
			}
			changeConfigs(res.data);
			init(res.data);
		})
		.catch(function (err) {
			console.log(err);
		});
}


//});

// document.getElementById('filter_type').onchange = function(){
// 	axios.post("./galery.html", {
// 		type: `${document.getElementById('filter_type').value.toLowerCase()}`
// 	})
// 		.then(function(res){
//
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// };

document.getElementById('filter_topic').onchange = function(){
	axios.post("/findArticle", {})
		.then(function(res){
			let set = new Set();
			res.data = res.data.filter(filter_by_topic)
			res.data.forEach((obj) => {
				set.add(obj.district)
			})
			
			for(let item of set){
				let parNode  = document.getElementById('filter_topic');
				let currNode = document.createElement('option');
				currNode.innerText = item;
				currNode.className= "filter_topic_option";
				parNode.appendChild(currNode);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
};

document.getElementsByClassName("filter_button")[0].onclick = function(){
	axios.post("/findArticle", {})
		.then(function(res){
			let filteredData = filter(res.data, document.getElementById('filter_topic').value);
			changeConfigs(filteredData);
			init(filteredData);
		})
		.catch(function (err) {
			console.log(err);
		});
}

