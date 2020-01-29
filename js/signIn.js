const form  = document.getElementsByTagName('form')[0];
const pass = document.getElementById('pass');
const login = document.getElementById('login');

form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let data = {};
        data.password = pass.value;
        data.login = login.value;
        axios({
            method: 'post',
            url: '/signIn.html',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            
            .then(function (response) {
                console.log(response)
                if(response.data.startsWith('Sorry')){
                    document.getElementById('error').innerHTML = response.data;
                }
                else{
                    window.location.href = "http://localhost:8080/account"
                }
                console.log(response);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    
}, false);