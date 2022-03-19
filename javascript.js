localStorage.setItem('comp__score',0);
localStorage.setItem('user__score',0);
localStorage.setItem('game__count',1);

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
        dots[i].className=dots[i].className.replace(" active","");
    }
    //slides[slideIndex-1].style.display=" block";
    //dots[slideIndex-1].className+=" active";

}

//function saves username, displays name and clears textbox
function name__Get(){
    //var user__Name=document.getElementById("user__Name").value;
    localStorage.setItem("userName",document.getElementById("user__Name").value);
    //console.log(localStorage.getItem("userName"));
    document.getElementById("entered__username").innerHTML=localStorage.getItem("userName");
    document.getElementById("entered__usernameScore").innerHTML=localStorage.getItem("userName");
    document.getElementById("user__Name").value="";
    localStorage.setItem('comp__score',0);
    localStorage.setItem('user__score',0);

}

function gameplay(char__Select){
    //main gameplay function
    //document.getElementById('user_NameDisplay').scrollIntoView();
    localStorage.setItem('userSelect',char__Select);
    displayHide();
    
    const comp__Select=computerSelect(3,localStorage.getItem('userSelect'));
    
    //console.log(comp__Select,localStorage.getItem('userSelect'));
    const comp__Char=char__Link(comp__Select);
    const user__Char=char__Link(localStorage.getItem('userSelect'));
    //window.location.href="./gameplay.html";
    const [winner,loser,code]=gameWinner(char__Select,comp__Select); 
    score__Update(code);
    score__Display();
    gameCount();
    displayCharResults([winner,loser,code]);
    
    
    //const result_sentence=displayCharResults([winner,loser,code]);
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
    //console.log(localStorage.getItem('user__score'),localStorage.getItem('comp__score'));
}
function score__Display(){
    
    document.getElementById('user_score').innerHTML=localStorage.getItem('user__score');
    document.getElementById('comp__score').innerHTML=localStorage.getItem('comp__score');

}
function gameCount(){
    var game__count=localStorage.getItem('game__count');
    if (game__count<=5){
        document.getElementById('game__count').innerHTML=game__count;
        localStorage.setItem('game__count',++game__count);
    }else{
        gameEnd();
    }       
    }


function displayHide(){
    //hide main gameplay display
    var x= document.getElementById('main__play');
    x.style.display='none';
    //create element add to main__select 
    document.getElementById('results').style.display='flex';
    
    

    
}

//display winner loser for each game
function displayCharResults([winner,loser,code]){
    let char__links=["images/elf2tran.png","images/gianttran.png","images/wizzardtrans.png" ];
    let char__names=['Elf','Giant','Wizzard'];
    let winner__name=['You',"The Computer"];
    if (code==0){
        win=' win';
    }else{
        win=' wins';
    }   
    let result_sentence=winner__name[code]+win+', '+char__names[winner]+' beats '+char__names[loser]+'.'
    document.getElementById('rs__sentence').innerHTML=result_sentence;
    document.getElementById("user__picResults").src=char__links[winner];
    document.getElementById("comp__picResults").src=char__links[loser];

    //var y = document.getElementById("results");

    //if(y.style.display==="none"){
      //  y.style.display='flex';
    //}else{
      //  y.style.display='none';
    //}
    
    //return winner__name[code];

}

function gameEnd(){
    const username=localStorage.getItem("userName");
    const user__score=localStorage.getItem('user__score');
    const comp__score=localStorage.getItem('comp__score');
    const url=`./gameplay.html#un=${username}us=${user__score}cs=${comp__score}`;

    //window.location.href=url;
    //console.log(username,user__score,comp__score);
    //document.getElementById("result__Display").innerHTML=localStorage.getItem("userName");
    resultDisplay(username,user__score,comp__score,url);
}

function resultDisplay(username,user__score,comp__score,url){
    window.location.href=url;

    console.log(window.location.host);
}