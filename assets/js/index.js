const chekMenu = document.getElementById("menu-check"),
    menuBarsIcon = document.querySelector('.menu-bars-container i');

//Gestion de menu bar avec le checkbox invisible
document.addEventListener('change', (event)=>{
    if(event.target.checked){
        menuBarsIcon.classList.remove("fa-bars-staggered");
        menuBarsIcon.classList.add("fa-bars");
    }
    else{
        menuBarsIcon.classList.remove("fa-bars");
        menuBarsIcon.classList.add("fa-bars-staggered");
    }
});