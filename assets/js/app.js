let allContacts = [],
    selectedContacts = [],
    allLabels = [];

let selectedPhoto = null;
let selectedLabels = [];
let contactToEdit = null;

loadAllThings();

//Charger toutes les choses
function loadAllThings() {
    showContacts();
    showContactsNumber();
    getLabelsContactNumber();
    showLabels();
    initIswaDropdowns();
    loadLabelsInFrom();
}

//Charger les lables dans le selecteur des labels dans le formulaire
function loadLabelsInFrom() {
    labelSelector.innerHTML = "";
    selectedLabelsContainer.innerHTML = "";
    const labelsList = createLabelsForLabelsSelector();
    const hLabelsList = createContactsLabels(selectedLabels);
    if (!(selectedLabels.length > 0)) {
        selectLabelBtn.innerHTML = `
        <i class="fa-solid fa-plus add-icon"></i>
        <span>Libellé</span>`;
    }
    else {
        selectLabelBtn.innerHTML = `
            <i class="fa-solid fa-pen add-icon"></i>`
    }
    labelSelector.appendChild(labelsList);
    selectedLabelsContainer.appendChild(hLabelsList);
}

//actualiser le nombre des contacts affiché
function showContactsNumber() {
    contactsNumbersLbl.forEach(contactsNumber => {
        contactsNumber.textContent = `(${allContacts.length})`;
    });
    if (allContacts.length <= 0) {
        contacts_table.classList.add("invisible");
        welcomeContainer.classList.remove("invisible");
    }
    else {
        contacts_table.classList.remove("invisible");
        welcomeContainer.classList.add("invisible");
    }
}

//actualiser les contacts affiché quand on click sur le bouton de tous les contacts
allContactsBtn.addEventListener("click", () => {
    document.querySelectorAll(".selected-btn-secondary").forEach(element => {
        element.classList.remove("selected-btn-secondary");
    });
    allContactsBtn.classList.add("selected-btn-secondary");
    hideForm();
    showContacts();
});

//Recherche dans les contacts avec un mot quand on click sur le bouton de rehcerche
searchContactsBtn.addEventListener("click", () => {
    if (searchContactsInput.value != "") {
        let contactsFilteredByWord = findContacts(null, null, searchContactsInput.value.toLowerCase());
        showFilterContacts(contactsFilteredByWord);
        document.querySelectorAll(".selected-btn-secondary").forEach(element => {
            element.classList.remove("selected-btn-secondary");
        });
        allContactsBtn.classList.add("selected-btn-secondary");
    }

});

//Listenner pour la soummision du formulaire de label
labelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const label = { name: labelInput.value }
    addLabel(label);
    labelForm.reset();
    initLabelsStyle();
    hideAllModal();
    loadAllThings();
});

//Fermer le formulaire de label quand on click sur "ne rien faire"
cancelLabelFormBtn.addEventListener("click", () => {
    hideAllModal();
});

//Listenner pour recuperer la photo selectioné
photoInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const blob = event.target.result;
            selectedPhoto = blob;

            showContactProfile(blob);
        };
        reader.readAsDataURL(file);
    }
});

//afficher la photo blob dans le profil du contact
function showContactProfile(blob) {
    contactImg.style.backgroundImage = `url(${blob})`;
    contactImg.style.backgroundSize = 'cover';
    contactImg.style.backgroundPosition = 'center';
}

//listenner à la soumission du formulaire des contacts
contactFormContainer.addEventListener("submit", (event) => {
    event.preventDefault();

    if ((nomInput.value.trim().length !== 0 || prenomInput.value.trim().length !== 0)
        && phoneInput.value.trim().length !== 0) {

        //création d'un array des emails
        const allEmailInputs = emailsContainer.querySelectorAll("input");
        let emailsArray = [];
        allEmailInputs.forEach(emailInput => {
            if (!(emailInput.value != "" && isValidEmail(emailInput.value))) {
                emailInput.style.border="solid 3px red";
            }
            if (emailInput.value.trim().length > 0) {
                emailsArray.push(emailInput.value)
            }
        });

        if ((allEmailsAreValid(allEmailInputs)) && (isValidPhone(phoneInput.value))) {
            const contact = {
                contactId: crypto.randomUUID(),
                nom: nomInput.value, prenom: prenomInput.value, deuxiemePrenom: deuxiemePrenomInput.value,
                nomPhonetique: nomPhonetiqueInput.value, prenomPhonetique: prenomPhonetiqueInput.value,
                DeuxiemePrenomPhonetique: deuxiemePrenomPhonetiqueInput.value,
                prefixe: prefixeInput.value, suffixe: suffixeInput.value, pseudo: pseudoInput.value,
                enTantQue: enTantQueInput.value,
                emails: emailsArray,
                entreprise: entrepriseInput.value, fonction: fonctionInput.value, service: serviceInput.value,
                phone: phoneInput.value,
                fonction: fonctionInput.value,
                labels: selectedLabels,
                photo: selectedPhoto
            };

            if (submitBtn.textContent.toLocaleLowerCase().includes("enregistrer")) {
                addNewContact(contact);
            }
            else {
                editContact(contactToEdit, contact);
            }
        }
        else {
            if (!(isValidPhone(phoneInput.value))) {
                phoneInput.style.border="solid 3px red";
            }
            iswaAlert("Merci de saisir les bonnes valeurs (champs rouges)", "", "error");
        }
    }
    else {
        allEmailInputs.forEach(emailInput => {
            if (!(emailInput.value != "" && isValidEmail(emailInput.value))) {
                emailInput.style.border="solid 3px red";
            }
        });
        
        if(nomInput.value.trim().length <= 0 && nomInput.value!="") nomInput.style.border="solid 3px red";
        if(prenomInput.value.trim().length <= 0 && prenomInput.value!="") prenomInput.style.border="solid 3px red";
        if(phoneInput.value.trim().length <= 0 && phoneInput.value!="") phoneInput.style.border="solid 3px red";
        iswaAlert("Merci de saisir les bonnes valeurs (Les champs rouges)", "", "error");
    }
});

//Afficher tous les labels et le nombre des contacts associés
function showLabels() {
    libellesList.innerHTML = "";
    allLabels.forEach(label => {
        let libelleView = createElement("div", {
            classList: "libelle-view clickable-background",
            onclick: () => {
                let contactsFilteredBylabel = findContacts("labels", label.name);
                showFilterContacts(contactsFilteredBylabel);
                document.querySelectorAll(".selected-btn-secondary").forEach(element => {
                    element.classList.remove("selected-btn-secondary");
                });
                libelleView.classList.add("selected-btn-secondary");
                hideForm();
            }
        });

        libelleView.innerHTML = `
            <div class="row-block just-cont-space-between al-it-center">
                <div class="row-block default-gap al-it-center just-cont-center">
                    <i class="fa-solid fa-ticket"></i>
                    <span>${label.name}</span>
                </div>
                <small>(${label.number})</small>
            </div>
        `;

        libellesList.appendChild(libelleView);
    });
}

//avoir le nombre des contacts ayants des labels
function getLabelsContactNumber() {
    allLabels.forEach(label => {
        const contactsWithLabel = findContacts("labels", label.name);
        label.number = contactsWithLabel.length;
    });
}

//ajouter un contact dans la table html
function addContactToTable(contact) {
    let tr = createElement("tr", {
        classList: "row-style"
    });
    let titleElement = createElement("div", {
        classList: "row-block default-gap al-it-center"
    });
    const contactProfile = createElement("span", {
        classList: (contact.photo != null) ? "contact-profile" : "contact-profile contact-profile-default",
        textContent: (contact.photo == null) ? `${(contact.prenom + " " + contact.nom).trim()[0].toUpperCase()}` : ''
    });

    contactProfile.style.backgroundImage = `url(${contact.photo})`;
    const contactName = createElement("span", {
        textContent: `${(contact.prenom + " " + contact.nom)}`
    })

    titleElement.append(contactProfile, contactName);

    let tdTitle = createElement("td", {});

    let contactControls = createContactControls(contact.contactId);

    tdTitle.append(contactControls, titleElement);

    const tdEmail = createElement("td", {
        textContent: contact.emails
    });
    const tdPhone = createElement("td", {
        textContent: contact.phone
    });
    const tdFonction = createElement("td", {
        textContent: contact.entreprise + " " + contact.service + " " + contact.fonction
    });
    const tdLabels = createElement("td", {
        classList: "td-label"
    });
    const labels = createContactsLabels(contact.labels);
    tdLabels.appendChild(labels);

    tr.append(tdTitle, tdEmail, tdPhone, tdFonction, tdLabels);
    contactsTbody.appendChild(tr);
    initIswaDropdowns();
}

//afficher tous les contacts
function showContacts() {

    contactsTbody.innerHTML = "";

    allContacts.forEach(contact => {
        addContactToTable(contact)
    });
}

//afficher les contacts selon un resultat
function showFilterContacts(contacts) {
    contactsTbody.innerHTML = "";

    contacts.forEach(contact => {
        addContactToTable(contact)
    });
}

//Créer la div des controls pour un contact (avec son id)
function createContactControls(contactId) {
    let controlersDiv = createElement("div", {
        classList: "contact-controls row-block just-cont-space-between al-it-center hide"
    });
    let checkContact = createElement("input", {
        type: "checkbox",
        classList: "check-contact",
        onclick: (event) => {
            let contact = allContacts.find(c => c.contactId === contactId);
            const checkbox = event.target;
            const tr = checkbox.parentElement.parentElement.parentElement;
            const rightControls = tr.querySelector(".right-contacts-controls");
            if (checkbox.checked) {

                if (contact) {
                    selectedContacts.push(contact);
                }
                tr.classList.add("selected-row");
                tr.classList.remove("row-style");
                rightControls.classList.add("right-contacts-controls-selected");

            }
            else {
                if (contact) {
                    selectedContacts.splice(allContacts.indexOf(contact));
                }
                checkbox.parentElement.parentElement.parentElement.classList.remove("selected-row");
                tr.classList.add("row-style");
                rightControls.classList.remove("right-contacts-controls-selected");
            }

        }
    });
    let rightControlsContainer = createElement("div", {
        classList: "right-contacts-controls row-block default-gap al-it-center",
    });
    let editContact = createElement("i", {
        classList: "fa-regular fa-pen-to-square icon-btn clickable-background",
        onclick: () => {
            showEditContactForm(contactId);
        }
    });
    let dropDownControls = createElement("div", {
        classList: "dropdown"
    });
    let threeDotsIcon = createElement("i", {
        classList: "fa-solid fa-ellipsis-vertical icon-btn clickable-background"
    });
    let dropdownContent = createElement("div", {
        classList: "dropdown-content dropdown-content-b-right dropdown-menu"
    });
    const hSeparator = createElement("div", {
        classList: "horizontal-separator"
    });
    const textSpan = createElement("small", {
        textContent: "Modifier les libellés",
        classList: "control-small"
    });
    let labelsContainer = createContactLabel(contactId);

    let btnDeleteContact = createElement("div", {
        classList: "row-block default-gap default-padding al-it-center clickable-background",
        onclick: () => {
            deleteContact(contactId);
        }
    });

    btnDeleteContact.innerHTML = `
        <i class="fa-solid fa-trash"></i>
        <span>Supprimer</span>
    `;

    dropdownContent.append(btnDeleteContact, hSeparator, textSpan, labelsContainer);
    dropDownControls.append(threeDotsIcon, dropdownContent);

    rightControlsContainer.append(editContact, dropDownControls);

    controlersDiv.append(checkContact, rightControlsContainer);

    return controlersDiv;

}

//Créer la div des labels
function createContactsLabels(labels) {
    const labelContainer = createElement("div", {
        classList: "row-block default-gap al-it-center"
    });

    labels.forEach(label => {
        const labelView = createElement("div", {
            classList: "lbl-model",
            textContent: label
        });

        labelContainer.append(labelView);
    });

    return labelContainer;

}

//créer les labels et marquer les labels du contact
function createContactLabel(contactId) {
    let labelsContainer = createElement("div", {});
    const contact = allContacts.find(c => c.contactId == contactId);

    if (contact) {
        allLabels.forEach(label => {
            let labelView = createElement("div", {
                classList: "row-block default-gap default-padding al-it-center just-cont-space-between clickable-background",
                onclick: () => {
                    addLabelToContact(contactId, label.name);
                }
            });

            labelView.innerHTML = `
                <div class="row-block default-gap">
                    <i class="fa-solid fa-ticket"></i>
                    <span>${label.name}</span>
                </div>
                ${(contact.labels.find(l => l == label.name)) ? '<i class="fa-solid fa-check c-green"></i>' : ''}
            `;

            labelsContainer.appendChild(labelView);
        });
    }
    return labelsContainer;
}

//créer la liste des labels à ajouter dans le selecteur des labels
function createLabelsForLabelsSelector() {
    let labelsContainer = createElement("div", {});
    allLabels.forEach(label => {
        let labelView = createElement("div", {
            classList: "row-block default-gap default-padding al-it-center just-cont-space-between clickable-background",
            onclick: () => {
                addLabelToContact(null, label.name);
            }
        });

        labelView.innerHTML = `
            <div class="row-block default-gap">
                <i class="fa-solid fa-ticket"></i>
                <span>${label.name}</span>
            </div>
            ${(selectedLabels.find(l => l == label.name)) ? '<i class="fa-solid fa-check c-green"></i>' : ''}
        `;

        labelsContainer.appendChild(labelView);
    });
    return labelsContainer;
}

//afficher le formulaire pour éditer un contact
function showEditContactForm(contactId) {
    const contact = allContacts.find(c => c.contactId == contactId);

    if (contact) {
        contactToEdit = contact;
        selectedLabels = contact.labels;
        selectedPhoto = contact.photo;
        if (selectedPhoto != null) showContactProfile(contact.photo);
        loadLabelsInFrom();

        nomInput.value = contact.nom; prenomInput.value = contact.prenom; prenomPhonetiqueInput.value = contact.prenomPhonetique;
        nomPhonetiqueInput.value = contact.nomPhonetique; deuxiemePrenomInput.value = contact.deuxiemePrenom;
        deuxiemePrenomPhonetiqueInput.value = contact.DeuxiemePrenomPhonetique; suffixeInput.value = contact.suffixe;
        prefixeInput.value = contact.prefixe; enTantQueInput.value = contact.enTantQue;

        entrepriseInput.value = contact.entreprise; serviceInput.value = contact.service; fonctionInput.value = contact.fonction;

        phoneInput.value = contact.phone;

        emailsContainer.innerHTML = "";
        contact.emails.forEach(email => {
            let emailInput = createEmailInput(crypto.randomUUID());
            emailInput.querySelector("input").value = email;
            addEmailInput(emailInput);
        });
        submitBtn.textContent = "Modifier";
        showForm();
    }
    else {
        console.log("contact non trouvé", contactId, allContacts, contact)
    }
}

//ajouter un contact
function addNewContact(contact) {
    allContacts.push(contact);
    contactFormContainer.reset();
    initLabelsStyle();
    contactImg.style.backgroundImage = `url("./imgs/user_sample.png")`;
    submitBtn.disabled = true;
    contactFormContainer.querySelector(".container").scrollTop = 0;
    iswaAlert("Contact enregistré", "", "success");
    loadAllThings();
}

//Supprimer un contact
function deleteContact(contactId) {
    if (confirm("voulez-vous supprimer ce contact?")) {
        const index = allContacts.findIndex(contact => contact.contactId == contactId);
        allContacts.splice(index, 1);
        loadAllThings();
    }
}

//Modifier un contacts
function editContact(oldContact, newContact) {
    try {
        if (oldContact && newContact) {
            let contactSource = allContacts.find(c => c.contactId = oldContact.contactId);
            for (const p in oldContact) {
                if (p !== "contactId") {
                    contactSource[`${p}`] = newContact[`${p}`];
                }
            }
            iswaAlert("modification réussie", "", "success");
            loadAllThings();
        }
    }
    catch (exception) {
        iswaAlert("Erreur pendant la modification : " + exception, "", "error");
    }
}

//Ajouter un libellé
function addLabel(label) {
    if (!(allLabels.find(l => l.name.toLocaleLowerCase() == label.name.toLocaleLowerCase()))) {
        allLabels.push(label);
    }
    else {
        iswaAlert("Ce libellé existe déjà", "", "error");
    }
}

//ajouter le label au contact
function addLabelToContact(contactId, label) {
    if (contactId && contactId != null) {
        const contact = allContacts.find(c => c.contactId == contactId);

        if (contact) {
            if (!contact.labels.find(c => c == label)) {
                contact.labels.push(label);
                loadAllThings();
            }
            else {
                if (confirm("Enlever ce label du contact?")) {
                    const index = contact.labels.indexOf(label)
                    contact.labels.splice(index, 1);
                    loadAllThings();
                }
            }
        }
    }
    else {
        if (!selectedLabels.find(c => c == label)) {
            selectedLabels.push(label);
        }
        else {
            selectedLabels.splice(label, 1);
        }
        loadLabelsInFrom();
    }

}

//rechercher/trier dans les contacts
function findContacts(attribut, value, word) {
    let filteredContacts = "";
    if (word) {
        filteredContacts = allContacts.filter(contact =>
            contact.contactId == word || contact.fonction.toLowerCase().includes(word)
            || contact.labels.indexOf(label => label.toLowerCase().includes(word)) >= 0
            || contact.phone.includes(word) || contact.nom.toLowerCase().includes(word)
            || contact.prenom.toLowerCase().includes(word) || contact.entreprise.toLowerCase().includes(word)
            || contact.service.toLowerCase().includes(word) || contact.fonction.toLowerCase().includes(word)
            || contact.emails.findIndex(emails => emails.toLowerCase().includes(word)) >= 0
        )
    }
    else {
        filteredContacts = allContacts.filter(contact => contact[attribut].includes(value));
    }
    return filteredContacts;
}

//valider un email
function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+\.[^<>()[\]\\.,;:\s@\"]{2,})|(([\w+\.-]+)@([a-zA-Z]+\.[a-zA-Z]{2,})))$/;
    return regex.test(email);
}

//Valider un téléphone
function isValidPhone(phone) {
    const regex = /^\+?[0-9 ]{10,}$/;
    return regex.test(phone);
}

//verifier si tous les email entrés sont correcte
function allEmailsAreValid(allEmailInputs){
    allEmailInputs.forEach(emailInput=>{
        if(!(isValidEmail(emailInput.value) && emailInput.value != "")){
            return false;
        }
    });
    return true;
}