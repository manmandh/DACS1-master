const $ = document.querySelector.bind(document)
const form = $('.mainForm.login')
const usr_email = $('.usr_email')
const usr_password = $('.usr_password')
const noti = $('center.notify')
import config from './config.js'


let getUrlFetch = function(){
    return "http://" + window.location.host.split(":")[0] + ":" + config.portApi
}

form.onsubmit = async function(e){
    e.preventDefault()

    let email = usr_email.value
    let pwd = usr_password.value
    let loginSuccess = false
    var url = getUrlFetch() + "/profile"

    await fetch(url,{
        headers:{
            "Content-Type" : "application/json"
        },
        method : "GET"
    })
    .then(res => res.json())
    .then(users => {
        console.log(users)
        users.forEach(user=>{
            if(user.email == email.trim() && user.password == pwd.trim()){
                localStorage.setItem("user_id",user.id)
                noti.innerText = "Login success ! Redirect after 2s"
                noti.style.color = 'green'
                loginSuccess = true
                setTimeout(()=>{
                    window.location.href = "http://" +  window.location.host + "/index.html"
                }, 2000)
            }
        })
    })
    if(loginSuccess != true){
        noti.innerText = "Login failed !"
        noti.style.color = 'red'
    }
}