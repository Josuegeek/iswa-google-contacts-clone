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
        ],
        photo: null
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
        ],
        photo: null
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

let selectedPhoto = null;
let contactToCreate = {
    contactId: "",
    nomComplet: "",
    email: [],
    phone: "",
    fonction: "",
    labels: [],
    photo: null
};

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
function loadLabelsInFrom(){
    labelSelector.innerHTML="";
    let labelsList = createLabelsForLabelsSelector();
    labelSelector.appendChild(labelsList);
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

//Recherche dans les contacts avec un mot quand on click sur le bouton de rehcerche
searchContactsBtn.addEventListener("click", () => {
    if (searchContactsInput.value != "") {
        let contactsFilteredByWord = findContacts(null, null, searchContactsInput.value.toLowerCase());
        showFilterContacts(contactsFilteredByWord);
    }

});

//Listenner pour la soummision du formulaire de label
labelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const label = { name: labelInput.value }
    addLabel(label);
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
            contactImg.style.backgroundImage = `url(${blob})`;
            contactImg.style.backgroundSize = 'cover';
            contactImg.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
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

//afficher tous les contacts
function showContacts() {

    contactsTbody.innerHTML = "";

    allContacts.forEach(contact => {
        let tr = createElement("tr", {
            classList: "row-style"
        });
        let titleElement = createElement("div", {
            classList: "row-block default-gap al-it-center"
        });
        const contactProfile = createElement("span", {
            classList: "contact-profile",
            style: {
                backgroundImage: (contact.photo != null) ? `url(${contact.photo})` : ""
            },
            textContent: (contact.photo == null) ? `${contact.nomComplet[0].toUpperCase()}` : ''
        });
        const contactName = createElement("span", {
            textContent: `${contact.nomComplet}`
        })

        titleElement.append(contactProfile, contactName);

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
        const labels = createContactsLabels(contact.labels);
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
        const contactProfile = createElement("span", {
            classList: "contact-profile",
            style: {
                backgroundImage: (contact.photo != null) ? `url(${contact.photo})` : ""
            },
            textContent: (contact.photo == null) ? `${contact.nomComplet[0].toUpperCase()}` : ''
        });
        const contactName = createElement("span", {
            textContent: `${contact.nomComplet}`
        })

        titleElement.append(contactProfile, contactName);

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
        const labels = createContactsLabels(contact.labels);
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
        classList: "check-contact",
        onclick: (event) => {
            const checkbox = event.target;
            const tr = checkbox.parentElement.parentElement.parentElement;
            const rightControls = tr.querySelector(".right-contacts-controls");
            if (checkbox.checked) {
                tr.classList.add("selected-row");
                tr.classList.remove("row-style");
                rightControls.classList.add("right-contacts-controls-selected");
            }
            else {
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
    let labelsContainer=createElement("div", {});
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
            ${(contactToCreate.labels.find(l => l == label.name)) ? '<i class="fa-solid fa-check c-green"></i>' : ''}
        `;

        labelsContainer.appendChild(labelView);
    });
    return labelsContainer;
}

//afficher le formulaire pour éditer un contact
function showEditContactForm(contactId) {

}

//ajouter un contact
function addNewContact() {
    const contact = {

    }
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
function editContact(oldContactId, newContact) {

}

//Ajouter un libellé
function addLabel(label) {
    allLabels.push(label);
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
                    contact.labels.splice(label, 1);
                    loadAllThings();
                }
            }
        }
    }
    else {
        if(!contactToCreate.labels.find(c => c == label)){
            contactToCreate.labels.push(label);
        }
        else{
            contactToCreate.labels.splice(label,1);
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
            || contact.phone.includes(word) || contact.nomComplet.toLowerCase().includes(word)
            || contact.email.findIndex(email => email.toLowerCase().includes(word)) >= 0
        )
    }
    else {
        filteredContacts = allContacts.filter(contact => contact[attribut].includes(value));
    }
    return filteredContacts;
}