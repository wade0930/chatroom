var uid
var email
window.onload = function() {
  firebase.auth().onAuthStateChanged(function(user) {
      var e=document.getElementById("T")
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
          email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      uid= user.uid;
      var providerData = user.providerData;
      // ...
      var s1=document.getElementById("s1")
      var s2=document.getElementById("s2")
        e.innerHTML=email+"<br>你已成功登入</br>"
        s1.disabled="disabled"
        s2.disabled="disabled"
        console.log(s1)
    } else {
        e.innerHTML="<br>你已登出</br>"
      // User is signed out.
      // ...
    }
  });
  firebase.database().ref().on('child_added', function(snapshot) {
    var ch=document.getElementById("chatwindow")
    console.log(snapshot.val())
    var name=snapshot.val().email
    var con=snapshot.val().text
    var time=snapshot.val().time
    ch.append(name+"say:"+con+time+"\r")
  });
}


document.onkeydown = keyevent;
function keyevent(){
    if(event.keyCode==13)
    send();
    }


function a()
{
  var email=document.getElementById("e")
  var ps=document.getElementById("p")
  var op=document.getElementById("o")
  firebase.auth().createUserWithEmailAndPassword(email.value, ps.value).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    op.innerHTML=error.message;
  });
    op.innerHTML="已成功註冊";
}


function s() {
  var email=document.getElementById("e")
  var ps=document.getElementById("p")
  var op=document.getElementById("o")
  firebase.auth().signInWithEmailAndPassword(email.value, ps.value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
    op.innerHTML=error.message;
});
    op.innerHTML="已成功登入";
}
function o()
{
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
  var e=document.getElementById("T")
  e.innerHTML="<br>你已登出</br>"
  var s1=document.getElementById("s1")
  var s2=document.getElementById("s2")
  var op=document.getElementById("o")
    s1.disabled=""
    s2.disabled=""
    op.innerHTML="請輸入帳號密碼";
}, function(error) {
  console.error('Sign Out Error', error);
    op.innerHTML=error.message;
});
}

function send()
{
  var text=document.getElementById("se").value
  if(text=="")return 0;
  var ti=new Date()
  var time=(ti.getMonth()+1)+"/"+ti.getDate()+" "+ti.getHours()+":"+ti.getMinutes()+":"+ti.getSeconds()

    firebase.database().ref().push({
    email,text,time
  });
  document.getElementById("se").value=""
}
