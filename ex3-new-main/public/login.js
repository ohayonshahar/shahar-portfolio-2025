 document.getElementById('submitbutton').addEventListener('click',submit);
 function submit(event){
   let uname= document.getElementById('name').value;
   let pass= document.getElementById('password').value;
   if (uname==='user123' &&pass==='12345')
   {
    fetch("http://localhost:8080/todolist.html")
    .then(
        setCookie("name", uname, 7) , 
        window.location.href = '//localhost:8080/todolist.html',response.json())
    .catch("Error");
   }else {
        document.getElementById('error').innerHTML='Incorrect user name or password  <br> Please try again </div>';
   }
 }

 function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }