var allContacts = [],
    selectedContacts = [], 
    allLabels = [{
        name:"Label custom",
        number:0
    }];

showLabels();

//Afficher tous les labels et le nombre des contacts associés
function showLabels(){
    allLabels.forEach(label=>{
        var libelleView = createElement("div", {
            classList:"libelle-view clickable-background"
        });

        libelleView.innerHTML  =`
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

//rechercher/trier dans les contacts
function findContacts(attribut, value){
    return allContacts.fin
}