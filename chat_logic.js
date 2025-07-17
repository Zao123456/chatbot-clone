let number_msgs = 0;
let isloading = false;
async function send_massage(e) {
  e.preventDefault();
  const mainText = document.querySelector("#mainText");
  const Box = document.querySelector("#chatBox");
  const form = document.querySelector('#chatForm')
  const input = document.querySelector("#input")
  const formData = new FormData(form)
  if(number_msgs === 0){
    mainText.remove();
  }
   Box.style.position = "fixed";
    Box.style.bottom = "0";
    Box.style.left = "0";
    Box.style.right = "0";
    Box.style.zIndex = "1000";
  addusermassage(formData.get("input"));
  restext =await sendmsg(formData.get("input"));
  input.value =""
  addresponmsg(restext);
  number_msgs++;
}
function addusermassage(msg) {
  const ul = document.querySelector("#msgs");
  const li = document.createElement("li");
  li.className = "d-flex justify-content-end";
  li.innerHTML = `
          <div class="bg-light msg px-3 py-2 chat-bubble">${msg}</div>
        `;
  ul.appendChild(li);
}

function addresponmsg(msg) {
  const ul = document.querySelector("#msgs");
  const li = document.createElement("li");
  li.className = "d-flex justify-content-start";
  li.innerHTML = `
          <div class="bg-light text-dark rounded px-3 py-2 chat-bubble my-75">${msg}</div>
        `;
  ul.appendChild(li);
}
function sendmsg(msg){
    
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBXwHqanl756IoJnPXS9uIxflqd-2ENgX0';
const body = {
    contents: [
      {
        parts: [{ text: msg }]
      }
    ]
  };
  isloading = true
  ifloading();
restext = axios.post(url,body).then((res)=>{isloading = false;ifloading(); return res.data.candidates[0].content.parts[0].text}).catch((e)=>console.log(e))

return restext

}
function ifloading(){
    const btn = document.querySelector("#button-addon2")
    if(isloading === true){
        btn.innerHTML = `<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
    }
    else{
        btn.innerHTML =`<svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-arrow-up-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
                />
              </svg>`
    }
}
