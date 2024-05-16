const chekMenu = document.getElementById("menu-check"),
    contacts_table = document.getElementById("contacts-table"),
    menuBarsIcon = document.querySelector(".menu-bars-container i"),
    leftNavigation = document.querySelector(".left-navigation"),
    mainFrame = document.querySelector(".main-frame"),
    floatBtn = document.getElementById("float-btn"),
    prenomInput = document.getElementById("prenom"),
    suffixeInput = document.getElementById("suffixe"),
    prefixeInput = document.getElementById("prefixe"),
    nomInput = document.getElementById("nom"),
    deuxiemePrenomInput = document.getElementById("deuxieme-prenom"),
    prenomPhonetiqueInput = document.getElementById("prenom-phonetique"),
    deuxiemePrenomPhonetiqueInput = document.getElementById("deuxieme-prenom-ponetique"),
    nomPhonetiqueInput = document.getElementById("nom-phonetique"),
    pseudoInput = document.getElementById("pseudo"),
    enTantQueInput = document.getElementById("en-tant-que"),
    entrepriseInput = document.getElementById("entreprise"),
    fonctionInput = document.getElementById("fonction"),
    serviceInput = document.getElementById("service"),
    emailInput = document.getElementById("email"),
    phoneInput = document.getElementById("phone"),
    allInputs = document.querySelectorAll(".input-container .input"),
    entrepriseDisplaySwitchBtn = document.getElementById("entreprise-switch-details-inputs"),
    namesDisplaySwitchbtn = document.getElementById("names-switch-details-inputs"),
    allNamesDetailsInputs = document.querySelectorAll(".names-details-inputs"),
    entrepriseDetailsInput = document.querySelector(".entreprise-details-inputs"),
    addEmailInputBtn = document.getElementById("add-email-input-btn"),
    emailsContainer = document.getElementById("emails-container"),
    submitBtn = document.getElementById("submit-btn"),
    addLabelBtn = document.querySelectorAll(".add-label-btn"),
    contactsContainer = document.querySelector(".contacts-container"),
    contactFormContainer = document.querySelector(".contact-form-container"),
    backToContactsListBtn = document.getElementById("back-to-contacts-list-btn"),
    addNewContactbtn = document.querySelectorAll('#create-contact-btn'),
    libellesList = document.querySelector(".libelles-list"),
    contactsTbody = document.querySelector("tbody"),
    contactsNumbersLbl = document.querySelectorAll(".contacts-number-lbl"),
    allContactsBtn = document.getElementById("all-contacts-btn"),
    searchContactsBtn = document.getElementById("btn-search-contacts"),
    searchContactsInput = document.getElementById("search-contacts-input"),
    labelForm = document.getElementById("label-form"),
    labelInput = document.getElementById("label-input"),
    cancelLabelFormBtn = document.getElementById("cancel-label-add-btn"),
    photoInput = document.getElementById("photo-input"),
    contactImg = document.getElementById("contact-img"),
    labelSelector = document.getElementById("label-selector"),
    selectedLabelsContainer = document.querySelector(".selected-labels"),
    selectLabelBtn = document.querySelector("#select-libele-btn");


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

//bouton d'affichage du formulaire contact(Formulaire)
addNewContactbtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        showForm();
    });
})

//bouton de retour
backToContactsListBtn.addEventListener(('click'), (event) => {
    hideForm();
});

document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const allDropdowns = document.querySelectorAll(".dropdown-check");

    //fermer tous les dropdowns ouverts si on click à coté
    allDropdowns.forEach(dropdown_ckeck => {
        if (clickedElement != dropdown_ckeck && clickedElement != addNewContactbtn) {
            dropdown_ckeck.checked = false;
        }
    });
});

//initialisation de l'input pour le téléphone
window.intlTelInput(phoneInput, {});

//ajout des ecouteurs pour les boutons add label
addLabelBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        showModal(1);
    });
});

//Ajout du style dynamique des labels quand input est changé
function setInputsEventListenner() {
    allInputs.forEach(input => {
        setInputListenners(input);
    });
}

//fonction pour ajouter les listenners dans un input
function setInputListenners(input) {
    input.addEventListener("focus", (event) => {
        let label = input.parentElement.querySelector("label");
        if (label == null) {
            label = input.parentElement.parentElement.querySelector("label");
        }
        label.classList.add('label-focused');
    });
    input.addEventListener("focusout", (event) => {
        if (input.value === "") {
            let label = input.parentElement.querySelector("label");
            if (label == null) {
                label = input.parentElement.parentElement.querySelector("label");
            }
            label.classList.remove('label-focused');
        }
    });
    input.addEventListener("input", (event) => {
        switchBtnStateByInputsValues();
    });
    input.addEventListener("change", (event) => {
        if (input.value === "") {
            let label = input.parentElement.querySelector("label");
            if (label == null) {
                label = input.parentElement.parentElement.querySelector("label");
            }
            if (input.value != "")
                label.classList.add('label-focused');
            else label.classList.remove('label-focused');
        }
    });
}

setInputsEventListenner();

//Evitons les erreurs (ce test suffit pour savoir si c'est le formulaire qui est chargé)
if (namesDisplaySwitchbtn) {
    //switch des états d'affichage pour les inputs des noms
    namesDisplaySwitchbtn.addEventListener('click', () => {
        if (allNamesDetailsInputs)
            allNamesDetailsInputs.forEach(namesDetailsInputs => {
                if (namesDetailsInputs.classList.contains("invisible")) {
                    namesDetailsInputs.classList.remove("invisible");
                    namesDisplaySwitchbtn.classList.remove("fa-chevron-down");
                    namesDisplaySwitchbtn.classList.add("fa-chevron-up");
                }
                else {
                    namesDetailsInputs.classList.add("invisible");
                    namesDisplaySwitchbtn.classList.remove("fa-chevron-up");
                    namesDisplaySwitchbtn.classList.add("fa-chevron-down");
                }
            });
    });

    //switch des états d'affichage pour les inputs des entreprises
    entrepriseDisplaySwitchBtn.addEventListener("click", () => {
        if (entrepriseDetailsInput.classList.contains("invisible")) {
            entrepriseDetailsInput.classList.remove("invisible");
            entrepriseDisplaySwitchBtn.classList.remove("fa-chevron-down");
            entrepriseDisplaySwitchBtn.classList.add("fa-chevron-up");
        }
        else {
            entrepriseDetailsInput.classList.add("invisible");
            entrepriseDisplaySwitchBtn.classList.remove("fa-chevron-up");
            entrepriseDisplaySwitchBtn.classList.add("fa-chevron-down");
        }
    });

    //ajout d'un input E-mail initial
    addEmailInput(createEmailInput(crypto.randomUUID()));

    //ajouter un input pour E-mail
    addEmailInputBtn.addEventListener("click", () => {
        addEmailInput(createEmailInput(crypto.randomUUID()));
    });
}

//fonction pour ajouter du style dynamique aux rows dans la liste des contacts
function initContactsCheckboxesStyle() {
    if (contacts_table) {
        const contactsCheckboxes = contacts_table.querySelectorAll("tbody tr td .checkbox");

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

//fonction pour supprimer un élément
function deleteElement(element) {
    element.remove();
}

//fonction pour créer un élément
function createElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}

//fonction pour ajouter un emailInput
function addEmailInput(iEmailContainer) {
    const input = iEmailContainer.querySelector("input");
    setInputListenners(input);
    emailsContainer.appendChild(iEmailContainer);
}

//Créer un élément email input
function createEmailInput(id) {
    const iEmailContainer = createElement("div", { className: "input-container row-block al-it-center" });
    const iLabelForEmail = createElement("label", { for: `${id}`, textContent: "E-mail", className: "label" });
    const iInputEmail = createElement("input", {
        placeholder: "a",
        type: "text",
        className: "input",
        id: id,
        onfocus: () => {
            iLabelForEmail.classList.add('label-focused');
        }
    });

    iInputEmail.addEventListener("focusout", () => {
        if (iInputEmail.value === "") {
            iLabelForEmail.classList.remove('label-focused');
        }
    })

    const iIconDeleteEmail = createElement("i", {
        className: "hide fa-solid fa-close icon-btn clickable-background",
        onclick: () => {
            deleteElement(iEmailContainer);
        }
    });

    iEmailContainer.append(iLabelForEmail, iInputEmail, iIconDeleteEmail);

    return iEmailContainer;
}

//switch des etats du bouton enregistrer du formulaire
function switchBtnStateByInputsValues() {
    if ((prenomInput.value != "" || nomInput.value != "") && phoneInput.value != "") {
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
}

//afficher le formulaire de contact
function showForm() {
    if (contactFormContainer.classList.contains("invisible")) {
        submitBtn.disabled = true
        contactFormContainer.classList.remove("invisible");
        contactFormContainer.classList.remove("hide-form-contact");
        contactFormContainer.classList.add("show-form-contact");
        contactsContainer.classList.add('invisible');
        loadAllThings();
    }
}

//cacher le formulaire
function hideForm() {
    if (submitBtn.disabled) {
        contactFormContainer.classList.add("invisible");
        contactFormContainer.classList.remove("show-form-contact");
        contactFormContainer.classList.add("hide-form-contact");
        contactsContainer.classList.remove('invisible');

        selectedLabels = [];
        selectedPhoto = null;
        contactToEdit = null;
        contactFormContainer.reset();
        submitBtn.textContent = "Enregistrer"
        submitBtn.disabled = true
    }
    else {
        if (confirm("Annuler l'opération ?")) {
            selectedLabels = [];
            selectedPhoto = null;
            contactToEdit = null;
            contactFormContainer.reset();
            submitBtn.textContent = "Enregistrer";
            submitBtn.disabled = true;
            contactFormContainer.classList.add("invisible");
            contactFormContainer.classList.remove("show-form-contact");
            contactFormContainer.classList.add("hide-form-contact");
            contactsContainer.classList.remove('invisible');
        }
    }

}