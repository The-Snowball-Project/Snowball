
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let request = new XMLHttpRequest();
    request.open('POST','/api/login');
    request.setRequestHeader('Content-type','application/json');
    request.onload = () => {
        console.log(request.responseText)
        let res = JSON.parse(request.responseText);
        if (res.status==='success') {
            document.cookie = 'auth='+res.token+'; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict';
            window.location.href = '/api/admin';
        } else {
            document.getElementById('error').textContent = 'Invalid credentials!'
        }
    };

    request.send('{"username":"'+username+'","password":"'+password+'"}');
    return false;
}
