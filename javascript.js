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
    slides[slideIndex-1].style.display="block";
    dots[slideIndex-1].className+=" active";

}

//functions call gameplay screen and pass username
function name__Get(){
    //let user__Name=document.getElementById("user__Name").value;
    localStorage.setItem("userName",document.getElementById("user__Name").value);
    document.getElementById("user__Name").value="";
    //
    
    page_Two();
    
}
function page_Two(){
    window.location.href="./gameplay.html";
    write_UserName()
    
    
}    
    
    //;
    

    //document.getElementById("result__username").innerHTML=user__Name;
    
    //write_UserName(userName);

function write_UserName(){
    console.log(localStorage.getItem("userName"));
}




function gameplay(char__Select){
    //main gameplay function
    const comp__Select=computerSelect(3,char__Select);
    //console.log(comp__Select,char__Select);
    const comp__Char=computer__Display(comp__Select);
    displayCompChar(comp__Char);
    gameWinner(char__Select,comp__Select);
}

function computerSelect(max,char__Select){
    //determine computer selection random number
    var rand=null;

    while(rand==null||rand==char__Select){
        rand=Math.floor(Math.random()*max);
    }
    return rand;
}

function computer__Display(comp__Select){

    //determine and display comp value
    if (comp__Select==0){
        temp__charLink="images/elf2tran.png";
        //console.log("elf",comp__Select);

    }else if (comp__Select==1){
        temp__charLink='images/gianttran.png'; 
        //console.log("giant",comp__Select);
    }else{
        temp__charLink='images/wizzardtrans.png';   
        //console.log('wizzard');
    }
    //code to display computer character
    return temp__charLink   

}
function displayCompChar(comp__Char){
    document.getElementById("compChar").src=comp__Char;

}

//game winner function
function gameWinner(char__Select,comp__Select){
    //console.log(char__Select,comp__Select)
    let winner=''
    if (char__Select==0){
        if (comp__Select==1){        //elf beats giant, userwins
            winner="Elf beats giant, user wins";
        }else{                          //wizzard beats elf, computer wins
            winner="wizzard beats elf, computer wins";
    }}else if(char__Select==1){
        if (comp__Select==2){            //giant beats wizzard, user wins
            winner="giant beats wizzard, user wins";    
        }else{                          //elf  beats giant, computer wins
            winner="eff beats giant, computer wins";
    }}else{
        if (comp__Select==0){            //wizzard beats elf, user wins
            winner="wizzard beats elf, user wins";    
        }else{                          //giant  beats wizzard, computer wins
            winner="giant beats wizzard, computer wins";
    }}
    console.log(winner);