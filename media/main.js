
/* navbar-ban levo dark mode gomb   */
/*---------------------------------------------------------------------------------------------------------------------------*/

const toggle = document.querySelector(".toggle");
const text = document.querySelector(".text");
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");

function Animatedtoggle(){
    toggle.classList.toggle("active");
    body.classList.toggle("active");
    navbar.classList.toggle("active");

    if(toggle.classList.contains("active")){
        text.innerHTML ="Light";

    }
    else{
        text.innerHTML ="Dark";
    }

}
/*---------------------------------------------------------------------------------------------------------------------------*/

