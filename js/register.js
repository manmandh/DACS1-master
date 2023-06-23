const $ = document.querySelector.bind(document)
const form = $('form')
const noti = $('center.noti')

import {getUrlFetch} from './config.js'


form.onsubmit = async (e) =>{
    e.preventDefault()
    let email = form.querySelector("input[name='email']").value
    let password = form.querySelector("input[name='password']").value
    let repassword = form.querySelector("input[name='repassword']").value
    let name = form.querySelector("input[name='name']").value
    let image = form.querySelector("input[name='image']").value
    if(password != repassword){
        noti.style.color = 'red';
        noti.innerText = 'Password repeat is wrong !'
        return false;
    }
    var urlTest = getUrlFetch() + "/profile?email=" + email
    await fetch(urlTest,{
        headers :{
            "Content-Type" : "application/json"
        },
        method : "GET"
    })
    .then(res => res.json())
    .then(usr =>{
        if(usr.length != 0){
            noti.style.color = 'red';
            noti.innerText = 'User is exist !'
            return false;
        }
    })
    var obj = {
        name,
        email,
        password,
        image
    }
    var urlPost = getUrlFetch() + "/profile"
    await fetch(urlPost,{
        headers :{
            "Content-Type" : "application/json"
        },
        method : "POST",
        body : JSON.stringify(obj)
    })
    .then(res =>{
        if(res.status == 201){
            noti.style.color = 'green';
            noti.innerText = 'Register success !'
            return false;
        }
    })
}
