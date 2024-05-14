let allContacts = [
    {
        contactId:1,
        nomComplet:"Iswa Senteri Josué",
        email:[
            "iswa@gmail.com",
            "iswa@tweeter.com"
        ],
        phone:"0816332364",
        fonction:"Dev Kadea",
        labels:[
            "Work"
        ]
    },
    {
        contactId:2,
        nomComplet:"Josue Senteri Wonder",
        email:[
            "iswa@gmail.com",
            "iswa@tweeter.com"
        ],
        phone:"0997551099",
        fonction:"Dev Kadea",
        labels:[
            "Bureau"
        ]
    }
],
selectedContacts = [],
allLabels = [{
        name: "Bureau",
        number: 1
    },
    {
        name: "Work",
        number: 1
    }
];

loadAllThings();

//Charger toutes les choses
function loadAllThings(){
    showLabels();
    showContacts();
    showContactsNumber();
}

//actualiser le nombre des contacts affiché
function showContactsNumber(){
    contactsNumbersLbl.forEach(contactsNumber=>{
        contactsNumber.textContent=`(${allContacts.length})`;
    })
}

//Afficher tous les labels et le nombre des contacts associés
function showLabels() {
    allLabels.forEach(label => {
        let libelleView = createElement("div", {
            classList: "libelle-view clickable-background",
            onclick:()=>{
                
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

//afficher tous les contacts
function showContacts() {

    contactsTbody.innerHTML="";

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
        const tdLabels = createElement("td",{
            classList:"td-label"
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
        classList: "row-block default-gap al-it-center height-100 width-100 scroll-x-overflow"
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

}

//rechercher/trier dans les contacts
function findContacts(attribut, value) {
    return allContacts.filter(contact=>contact[attribut]==value);
}