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
function name__Get(){
    let userName=document.getElementById("user__Name").value;
    page__Two(userName);
}
function page__Two(userName){
    window.location.href="gameplay.html";
    console.log(userName);
}
    



//on left click, move sides left
//on right click, move slides right
//on nav indicator click, move to that slide

