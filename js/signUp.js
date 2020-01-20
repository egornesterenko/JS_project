
const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const error = document.getElementById('error');
const pass = document.getElementById('pass');
const checkpass = document.getElementById('checkpass');
const telephone = document.getElementById('telephone');
const fname = document.getElementById('firstname');
const lname = document.getElementById('lastname');
const login = document.getElementById('login');
const submit = document.getElementById('submit')


submit.addEventListener("click", function (event) {
	//validation of the input information from user
	if (!email.validity.valid) {
		error.innerHTML = "Ivalid email!";
		error.className = "error active";
		event.preventDefault();
	}
	else if (!pass.value.match(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/)){
		error.innerHTML = "Invalid password!";
		error.className = "error active";
		event.preventDefault();
	}
	else if (pass.value !== checkpass.value){
		error.innerHTML = "Confirming password is not the same password!";
		error.className = "error active";
		event.preventDefault();
	}
	//in case the standart check is not working
	else if(!pass.value || !checkpass.value || !login.value || !email.value || !telephone.value || !fname.value || !sname.value){
		error.innerHTML = "All * fields are required!";
		error.className = "error active";
		event.preventDefault();
	}
	else{
		
		let bodyFormData = {};
		bodyFormData.firstname  = fname.value;
		bodyFormData.lastname = sname.value;
		bodyFormData.email      = email.value;
		bodyFormData.password   = pass.value;
		bodyFormData.login      = login.value;
		bodyFormData.telephone = telephone.value;
		axios({
			method: 'post',
			url: '/signUp.html',
			data: bodyFormData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
		})
		
		.then(function (response) {
			if(response.data.startsWith('Sorry')){
				document.getElementById('error').innerHTML = response.data;
			}
			else{
				window.location.href = "http://localhost:8080";
			}
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}, false);