const chekMenu = document.getElementById("menu-check"),
    contacts_table = document.getElementById("contacts-table"),
    menuBarsIcon = document.querySelector(".menu-bars-container i"),
    leftNavigation = document.querySelector(".left-navigation"),
    mainFrame = document.querySelector(".main-frame"),
    floatBtn = document.getElementById("float-btn");

//Gestion de menu bar avec le checkbox invisible
chekMenu.addEventListener('change', (event) => {
    if (event.target.checked) {
        menuBarsIcon.classList.remove("fa-bars-staggered");
        menuBarsIcon.classList.add("fa-bars");
        leftNavigation.classList.add("left-navigation-hidden");
        mainFrame.classList.add("main-frame-fill-side");
        floatBtn.classList.remove("hide");
    }
    else {
        menuBarsIcon.classList.remove("fa-bars");
        menuBarsIcon.classList.add("fa-bars-staggered");
        leftNavigation.classList.remove("left-navigation-hidden");
        mainFrame.classList.remove("main-frame-fill-side");
        floatBtn.classList.add("hide");
    }
});


document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const allDropdowns = document.querySelectorAll("#dropdown-check");

    //fermer tous les dropdowns ouverts si on click à coté
    allDropdowns.forEach(dropdown_ckeck => {
        if (clickedElement != dropdown_ckeck) {
            dropdown_ckeck.checked = false;
        }
    });
});

//fonction pour ajouter du style dynamique aux rows dans la liste des contacts
function initContactsCheckboxesStyle(){
    if (contacts_table) {
        const contactsCheckboxes = contacts_table.querySelectorAll("tbody tr td input");
    
        //gestion du style des contacts selectionés
        contactsCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", (event) => {
                const trParent = event.target.parentElement.parentElement.parentElement,
                    tdParent = event.target.parentElement.parentElement,
                    checkbox = event.target;
                if (checkbox.checked) {
                    tdParent.querySelector(".contact-profile").classList.add("hide");
                    tdParent.querySelector(".contact-controls").classList.add("show");
                    trParent.classList.add("selected-row");
                }
                else {
                    trParent.classList.remove("selected-row");
                    tdParent.querySelector(".contact-controls").classList.remove("show");
                    tdParent.querySelector(".contact-profile").classList.remove("hide");
                }
            })
        });
    }
}

initContactsCheckboxesStyle();