import config from './config.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//Define elements
const contentPosts = $('.content')
const postBox = $('.box.post')
const sidebarUser = $('.image_avt.user')
const loginBtn = $('.login_feature')

let app = {
    currentID : -1, 
    currentUser : null,
    

    createElementPost : function({user,post}){
        let btnLike = `<div class="button like">Like</div>`
        return `<div class="box">
        <div class="column">
          <div class="image-text-wrapper">
            <img src="${user.image}">
            <div class="text-wrapper">
              <h3>${user.name}</h3>
            </div>
          </div>
          <div class="column">
            <h4>${post.content}</h4>
            <img class="post" src="${post.image}">
          </div>
          <div class="column">
            <div class="button-wrapper">
              <div class="button">Comment</div>
              ${btnLike}
              <div class="button">Share</div>
            </div>
          </div>
        </div>
      </div>`
    },
    createPost : function(){
        let content = $('.thinking-status-body textarea').value
        let image = $(".thinking-status-body input[name='image']").value
        let author_id = this.currentID
        if(image == "" || content == ""){
            return 
        }
        let obj = {
            image,
            content,
            author_id
        }
        var urlPost = this.getUrlFetch() + "/posts"
        fetch(urlPost,this.getOptionFetch({
            method : "POST",
            body : JSON.stringify(obj)
        }))
        .then(res => {
            postBox.querySelector('textarea').value = ""
            postBox.querySelector("input[name='image']").value = ""
            res.json()
        })
    },

    getUrlFetch : function(){
        return "http://" + window.location.host.split(":")[0] + ":" + config.portApi
    },
    getOptionFetch : function({method , body}){
        if (method == "GET"){
            return {
                method,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }
        return {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body
        }
    },
    loadCurrentUser : async function(){
        var user_id = localStorage.getItem("user_id")
        if(user_id != undefined && user_id != ""){
            var url = this.getUrlFetch() +  "/profile/" +user_id
            await fetch(url,this.getOptionFetch({
                method : "GET"
            }))
            .then((res)=>{
                return res.json()
            })
            .then((user)=>{
                this.currentID = user.id
                this.currentUser = Object.assign({},user)
                this.setUserToDOM(user)
            })
            .then(()=>{
                this.mapEvent()
            })
            
            loginBtn.querySelector('a').innerText = "Logout"
            loginBtn.querySelector('a').onclick = (e) =>{
                e.preventDefault()
                localStorage.setItem("user_id","")
                window.location.href = "http://" +  window.location.host + "/forum.html"
            }
        }
        else{
            let usr = {
                image : "/images/user.jpg",
                name : "Guest",
                disabled  : true
            }
            this.setUserToDOM(usr)
        }
    },
    loadPosts : function(){
        var url = this.getUrlFetch() + "/posts?_sort=id&_order=desc"
        fetch(url,this.getOptionFetch({
            method : "GET"
        }))
        .then(json => json.json())
        .then(posts =>{
            posts.forEach(async post => {
                let user
                var urlUser = this.getUrlFetch() + "/profile/" + post.author_id
                await fetch(urlUser,this.getOptionFetch({
                    method : "GET"
                }))
                .then(res => res.json())
                .then(usr => user = Object.assign({}, usr))

                contentPosts.innerHTML += this.createElementPost({
                    user,
                    post
                })
            })
        })
    },

    setUserToDOM : function(user){
        sidebarUser.querySelector('img').src = user.image
        sidebarUser.querySelector('h4').innerText = user.name

        postBox.querySelector('img').src = user.image

        if(user?.disabled){
            let txtArea = postBox.querySelector('textarea')
            txtArea.disabled  = true
            txtArea.classList.toggle("disabled",true)

            let btnPost = postBox.querySelector('.postBtn')
            btnPost.disabled  = true
            btnPost.classList.toggle("disabled",true)
        }
        
    },

    mapEvent : function(){
        var self = this
        setTimeout(()=>{
            $('.thinking-status-footer .postBtn').onclick = (e)=>{
                self.createPost(e)
            }
        },1500)
        
    },
    run : function(){
        this.loadCurrentUser()
        this.loadPosts()
    }
}

app.run()