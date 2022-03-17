localStorage.setItem('comp__score',0);
localStorage.setItem('user__score',0);

function defaultSlide(){
    console.log('test');

};

var slideIndex=1;
showSlides(slideIndex);

//next pervious controls
function plusSlides(n){
    showSlides(slideIndex+=n);
}

//thumbnail control
function currentSlide(n){
    showSlides(slideIndex=n);
}

function showSlides(n){
    var i;
    var slides=document.getElementsByClassName("carousel__slide");
    var dots=document.getElementsByClassName("carousel__indicator");
    if (n>slides.length){slideIndex=1}
    if (n<1){slideIndex=slides.length}
    for (i=0;i<slides.length;i++){
        slides[i].style.display="none";
    }
    for (i=0;i<dots.length;i++){
        dots[i].className=dots[i].className.replace("active","");
    }
    //slides[slideIndex-1].style.display="block";
    //dots[slideIndex-1].className+="active";

}

//function saves username, displays name and clears textbox
function name__Get(){
    //var user__Name=document.getElementById("user__Name").value;
    
    //localStorage.setItem("userName",document.getElementById("user__Name").value);
    //console.log(localStorage.getItem("userName"));
    var userName=document.getElementById('user__Name').value;         //gets user name and clears field
    document.getElementById("user__Name").value="";
    //localStorage.setItem('comp__score',0);     sets user and computer score 
    //localStorage.setItem('user__score',0);
    let cookieName=createCookie('cookieName',userName,2);
    let cookieValue=readCookie(cookieName);
    
}

function newpage(){
    //window.location.href="./gameplay.html?userName="+page__Name;
    window.location.href="./gameplay.html";
        
    //console.log(localStorage.getItem("userName"));
    //document.getElementById("entered__username").innerHTML=page__Name;   //localStorage.getItem("userName");
    //document.getElementById("entered__usernameScore").innerHTML=localStorage.getItem("userName");
}
function createCookie(name,value,days){
    if (days){
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires="; expires="+date.toGMTString();
    }
    else var expires="";
    document.cookie=name+"="+value+expires+"; path=/";

  
}

function readCookie(cookieName){
    var nameEQ=cookieName+"=";
    var ca =document.cookie.split(';');
    for (var i=0; i< ca.length; i++){
        var c =ca[i];
        while (c.charAt(0)==' ') c=c.substring(1,c.length);
        if (c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
        console.log(c.substring(nameEQ.length,c.length));
          
    }
    return null;

}


function gameplay(char__Select){
    //main gameplay function
    //document.getElementById('user_NameDisplay').scrollIntoView();
    localStorage.setItem('userSelect',char__Select);  //sets user selection as global
    const comp__Select=computerSelect(3,localStorage.getItem('userSelect'));        //computer select, passes userSelection so selections are not the same
    //console.log(comp__Select,localStorage.getItem('userSelect'));
    const comp__Char=char__Link(comp__Select);                  //gets links for user and comp characters images
    const user__Char=char__Link(localStorage.getItem('userSelect'));
    
    const [winner,loser,code]=gameWinner(char__Select,comp__Select);      //determines winner, returns winner, loser and code re winner
    score__Update(code);                                        //updates score based on code 
    score__Display();                                           
    const uname=localStorage.getItem("userName")
    const result_sentence=displayCharResults([uname,winner,loser,code]);

    //console.log(result_sentence);
    //displayCompChar(comp__Char);   
    
}

function computerSelect(max,char__Select){
    //determine computer selection random number
    var rand=null;

    while(rand==null||rand==char__Select){
        rand=Math.floor(Math.random()*max);
    }
    return rand;
}

function char__Link(val){

    //determine and display comp value
    if (val==0){
        temp__charLink="images/elf2tran.png";
        //console.log("elf",comp__Select);

    }else if (val==1){
        temp__charLink='images/gianttran.png'; 
        //console.log("giant",comp__Select);
    }else{
        temp__charLink='images/wizzardtrans.png';   
        //console.log('wizzard');
    }
    //code to display computer character
    return temp__charLink;   

}

//game winner function
function gameWinner(char__Select,comp__Select){
    //console.log(char__Select,comp__Select)
    let winner=''
    if (char__Select==0){
        if (comp__Select==1){        //elf beats giant, userwins
            winner=0;
            loser=1;
            code=0;
        }else{                          //wizzard beats elf, computer wins
            winner=2;
            loser=0;
            code=1;
    }}else if(char__Select==1){
        if (comp__Select==2){            //giant beats wizzard, user wins
            winner=1;
            loser=2;    
            code=0;
        }else{                          //elf  beats giant, computer wins
            winner=0;
            loser=1;
            code=1;
    }}else{
        if (comp__Select==0){            //wizzard beats elf, user wins
            winner=2;
            loser=0;   
            code=0;
        }else{                          //giant  beats wizzard, computer wins
            winner=1;
            loser=2;
            code=1;
    }}
    //console.log(winner,loser);

    return [winner,loser,code];
}

function score__Update(code){
    if (code==0){
        var user__score=parseInt(localStorage.getItem('user__score'));
        localStorage.setItem('user__score',++user__score);
    }else{
        var comp__score=parseInt(localStorage.getItem('comp__score'));
        localStorage.setItem('comp__score',++comp__score);
    }
    if((user__score+comp__score)==5){
        endGame(user__score,comp__score);
    }
    //console.log(localStorage.getItem('user__score'),localStorage.getItem('comp__score'));
}
function score__Display(){
    
  
    //window.location.href="./gameplay.html"+"?n="+localStorage.getItem('userName');
    //document.getElementById('user_NameDisplay').innerHTML=localStorage.getItem('user__score');
    document.getElementById('user_score').innerHTML=localStorage.getItem('user__score');
    document.getElementById('comp__score').innerHTML=localStorage.getItem('comp__score');

}

function displayCharResults([uname,winner,loser,code]){
    
    let char__links=["images/elf2tran.png","images/gianttran.png","images/wizzardtrans.png" ];
    let char__names=['Elf','Giant','Wizzard'];
    let winner__name=[uname,"The Computer"];

    let result_sentence=winner__name[code]+' wins, '+char__names[winner]+' beats '+char__names[loser]+'.';
    //console.log(result_sentence);
    document.getElementById('results__sentence').innerHTML=result_sentence;

    document.getElementById("user__picResults").src=char__links[winner];
    document.getElementById("comp__picResults").src=char__links[loser];
    //return result_sentence;

}

function endGame(user__score,comp__score){
    console.log(user__score,comp__score);
    console.log()

}





function testp2(){
    window.location.href="./gameplay.html";
    document.getElementById("user_NameDisplay").innerHTML=localStorage.getItem('userName');
    
}