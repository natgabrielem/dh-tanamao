function login(){
    const user = document.getElementById('user');
    const password = document.getElementById('password');
    var userText = user.value.toLowerCase();

    if(userText !== ''){ 
        localStorage.setItem('user', userText);
    } if (password !== ''){     
        localStorage.setItem('password', password.value);
    }

    console.log(localStorage.getItem('user'));
    console.log(localStorage.getItem('password'));

    window.location.href = "../2.Menu/menu.html";

}