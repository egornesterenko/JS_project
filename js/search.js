window.addEventListener("load", function() {
	document.getElementsByClassName('button_search')[0].onclick = function () {
		window.location.href = `http://localhost:8080/gallery?${document.getElementsByClassName('input_search')[0].value}`
	}

});