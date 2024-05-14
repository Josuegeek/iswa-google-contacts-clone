//fonction pour le confirm
function iswaConfirm(msg, showTitle, title){
    msg=(msg=="")? "Effectuer l'action ?" : msg;
    
    var confirmContainer = createAnElement("div",{
        className:"iswa--confirm-container",
    });
    var confirm = createAnElement("div",{
        className:"iswa--confirm",
    });

    confirm.innerHTML = `
        ${(showTitle)? '<span class="iswa--confirm-title">'+title+'</span>':""}
        <div class="iswa--confirm-separator"></div>
        <span class="iswa--confirm-msg">${(msg!=="")? msg : "Effectuer cette action"} ?</span>
        <div class="iswa--confirm-btn-container"></div>
    `;

    var btnsContainer = confirm.querySelector(".iswa--confirm-btn-container");

    const acceptBtn= createAnElement("div", {
        textContent:"Confirmer",
        className:"iswa--confirm-btn iswa--confirm-primary",
        onclick:()=>{
            confirmContainer.remove();
            return true;
        }
    });

    const cancelBtn= createAnElement("div", {
        textContent:"Annuler",
        className:"iswa--confirm-btn iswa--confirm-secondary",
        onclick:()=>{
            confirmContainer.remove();
            return false;
        }
    });

    btnsContainer.append(cancelBtn, acceptBtn);

    confirmContainer.appendChild(confirm);
    document.body.prepend(confirmContainer);
}

//fonction pour créer un élément
function createAnElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}