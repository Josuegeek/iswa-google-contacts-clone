const chekMenu = document.getElementById("menu-check"),
    menuBarsIcon = document.querySelector(".menu-bars-container i"),
    leftNavigation = document.querySelector(".left-navigation"),
    mainFrame = document.querySelector(".main-frame");

//Gestion de menu bar avec le checkbox invisible
chekMenu.addEventListener('change', (event)=>{
    if(event.target.checked){
        menuBarsIcon.classList.remove("fa-bars-staggered");
        menuBarsIcon.classList.add("fa-bars");
        leftNavigation.classList.add("left-navigation-hidden");
        mainFrame.classList.add("main-frame-fill-side");
    }
    else{
        menuBarsIcon.classList.remove("fa-bars");
        menuBarsIcon.classList.add("fa-bars-staggered");
        leftNavigation.classList.remove("left-navigation-hidden");
        mainFrame.classList.remove("main-frame-fill-side");
    }
});

document.addEventListener("click", (event)=>{
    const clickedElement = event.target;
    const allDropdowns = document.querySelectorAll("#dropdown-check");

    //fermer tous les dropdowns ouverts si on click à coté
    allDropdowns.forEach(dropdown_ckeck => {
        if (clickedElement!=dropdown_ckeck) {
            dropdown_ckeck.checked=false;
        }
    });
});