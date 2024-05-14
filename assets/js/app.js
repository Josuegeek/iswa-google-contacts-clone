let allContacts = [
    {
        contactId: 1,
        nomComplet: "Iswa Senteri Josué",
        email: [
            "iswa@gmail.com",
            "iswa@tweeter.com"
        ],
        phone: "0816332364",
        fonction: "Dev Kadea",
        labels: [
            "Work"
        ]
    },
    {
        contactId: 2,
        nomComplet: "Josue Senteri Wonder",
        email: [
            "iswa@gmail.com",
            "iswa@tweeter.com"
        ],
        phone: "0997551099",
        fonction: "Dev Kadea",
        labels: [
            "Bureau"
        ]
    }
],
    selectedContacts = [],
    allLabels = [{
        name: "Bureau"
    },
    {
        name: "Work"
    }
    ];

loadAllThings();

//Charger toutes les choses
function loadAllThings() {
    showContacts();
    showContactsNumber();
    getLabelsContactNumber();
    showLabels();
    initIswaDropdowns();
}

//actualiser le nombre des contacts affiché
function showContactsNumber() {
    contactsNumbersLbl.forEach(contactsNumber => {
        contactsNumber.textContent = `(${allContacts.length})`;
    })
}

//actualiser les contacts affiché quand on click sur le bouton de tous les contacts
allContactsBtn.addEventListener("click", () => {
    document.querySelectorAll(".selected-btn-secondary").forEach(element => {
        element.classList.remove("selected-btn-secondary");
    });
    allContactsBtn.classList.add("selected-btn-secondary");
    showContacts();
});

//Recherche dans les contacts avec un mot
searchContactsBtn.addEventListener("click", () => {
    if (searchContactsInput.value != "") {
        let contactsFilteredByWord = findContacts(null, null, searchContactsInput.value.toLowerCase());
        showFilterContacts(contactsFilteredByWord);
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
            }
        });

        libelleView.innerHTML = `
            <div class="row-block just-cont-space-between al-it-center">
                <div class="row-block default-gap al-it-center just-cont-center">
                    <i class="fa-solid fa-ticket"></i>
                    <span>${label.name}</span>
                </div>
                <small>${label.number}</small>
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

//afficher tous les contacts
function showContacts() {

    contactsTbody.innerHTML = "";

    allContacts.forEach(contact => {
        let tr = createElement("tr", {});
        let titleElement = createElement("div", {
            classList: "row-block default-gap al-it-center"
        });
        titleElement.innerHTML = `
            <span class="contact-profile">${contact.nomComplet[0].toUpperCase()}</span>
            <span>${contact.nomComplet}</span>
        `;
        let tdTitle = createElement("td", {});

        let contactControls = createContactControls(contact.contactId);

        tdTitle.append(contactControls, titleElement);

        const tdEmail = createElement("td", {
            textContent: contact.email
        });
        const tdPhone = createElement("td", {
            textContent: contact.phone
        });
        const tdFonction = createElement("td", {
            textContent: contact.fonction
        });
        const tdLabels = createElement("td", {
            classList: "td-label"
        });
        const labels = createContactLabels(contact.labels);
        tdLabels.appendChild(labels);

        tr.append(tdTitle, tdEmail, tdPhone, tdFonction, tdLabels);
        contactsTbody.appendChild(tr);

    });
}

//afficher les contacts selon un resultat
function showFilterContacts(contacts) {
    contactsTbody.innerHTML = "";

    contacts.forEach(contact => {
        let tr = createElement("tr", {});
        let titleElement = createElement("div", {
            classList: "row-block default-gap al-it-center"
        });
        titleElement.innerHTML = `
            <span class="contact-profile">${contact.nomComplet[0].toUpperCase()}</span>
            <span>${contact.nomComplet}</span>
        `;
        let tdTitle = createElement("td", {});

        let contactControls = createContactControls(contact.contactId);

        tdTitle.append(contactControls, titleElement);

        const tdEmail = createElement("td", {
            textContent: contact.email
        });
        const tdPhone = createElement("td", {
            textContent: contact.phone
        });
        const tdFonction = createElement("td", {
            textContent: contact.fonction
        });
        const tdLabels = createElement("td", {
            classList: "td-label"
        });
        const labels = createContactLabels(contact.labels);
        tdLabels.appendChild(labels);

        tr.append(tdTitle, tdEmail, tdPhone, tdFonction, tdLabels);
        contactsTbody.appendChild(tr);

    });
}

//Créer la div des controls pour un contact (avec son id)
function createContactControls(contactId) {
    let controlersDiv = createElement("div", {
        classList: "contact-controls row-block just-cont-space-between al-it-center hide"
    });
    let checkContact = createElement("input", {
        type: "checkbox",
        id: "contact-check",
    });
    let rightControlsContainer = createElement("div", {
        classList: "right-contacts-controls row-block default-gap al-it-center"
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
    let btnAddLabelToContact = createElement("div", {
        classList: "row-block default-gap default-padding al-it-center clickable-background",
        onclick: () => {
            showLabelsSelector(contactId);
        }
    });

    btnAddLabelToContact.innerHTML = `
        <i class="fa-solid fa-ticket"></i>
        <span>Ajouter un libellé</span>
    `;

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

    dropdownContent.append(btnAddLabelToContact, btnDeleteContact);
    dropDownControls.append(threeDotsIcon, dropdownContent);

    rightControlsContainer.append(editContact, dropDownControls);

    controlersDiv.append(checkContact, rightControlsContainer);

    return controlersDiv;

}

//Créer la div des labels
function createContactLabels(labels) {
    const labelContainer = createElement("div", {
        classList: "row-block default-gap al-it-center height-100 width-100"
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

//afficher le formulaire pour éditer un contact
function showEditContactForm(contactId) {

}

//afficher le selecteur des labels
function showLabelsSelector(contactId) {

}

//Supprimer un contact
function deleteContact(contactId) {
    if (confirm("voulez-vous supprimer ce contact?")) {
        const index = allContacts.findIndex(contact => contact.contactId == contactId);
        allContacts.splice(index, 1);
        loadAllThings();
    }
}

//rechercher/trier dans les contacts
function findContacts(attribut, value, word) {
    let filteredContacts = "";
    if (word) {
        filteredContacts = allContacts.filter(contact =>
            contact.contactId == word || contact.fonction.toLowerCase().includes(word)
            || contact.labels.indexOf(label => label.toLowerCase().includes(word))>= 0
            || contact.phone.includes(word) || contact.nomComplet.toLowerCase().includes(word)
            || contact.email.findIndex(email => email.toLowerCase().includes(word)) >= 0
        )
    }
    else {
        filteredContacts = allContacts.filter(contact => contact[attribut].includes(value));
    }
    return filteredContacts;
}