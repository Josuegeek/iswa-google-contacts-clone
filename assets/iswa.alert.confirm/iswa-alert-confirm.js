//fonction pour le confirm
function iswaAlert(msg,title="", icon="info"){
    msg=(msg=="")? "Effectuer l'action ?" : msg;
    
    let confirmContainer = createAnElement("div",{
        className:"iswa--confirm-container",
        onclick:()=>{
            confirmContainer.remove();
        }
    });
    let confirm = createAnElement("div",{
        className:"iswa--confirm",
    });

    let classListForIcon = "";
    switch(icon){
        case "info":
            classListForIcon = "fa-solid fa-circle-info iswa--confirm-icon";
            break;
        case "success":
            classListForIcon = "fa-regular fa-thumbs-up iswa--confirm-icon iswa--confirm-secondary"
            break;
        case "error":
            classListForIcon = "fa-solid fa-triangle-exclamation iswa--confirm-icon iswa--confirm-error-c";
            break;
        default :
            classListForIcon = "fa-solid fa-circle-info iswa--confirm-icon";
    }

    const iconView = createAnElement("i",{classList : classListForIcon});

    const btnsContainer = createAnElement("div", {classList:"iswa--confirm-btn-container"});

    confirm.innerHTML = `
        ${(title!="")? '<span class="iswa--confirm-title">'+title+'</span>':""}
        ${(title!="")?'<div class="iswa--confirm-separator"></div>':''}
        <span class="iswa--confirm-msg">${(msg!=="")? msg : "Message de ISWA"}</span>
    `;

    confirm.append(iconView, btnsContainer)

    const acceptBtn= createAnElement("div", {
        textContent:"OK",
        classList:"iswa--confirm-btn iswa--confirm-primary",
        onclick:()=>{
            confirmContainer.remove();
            return true;
        }
    });

    const cancelBtn= createAnElement("div", {
        textContent:"Annuler",
        classList:"iswa--confirm-btn iswa--confirm-secondary",
        onclick:()=>{
            confirmContainer.remove();
            return false;
        }
    });

    btnsContainer.append(acceptBtn);

    confirmContainer.appendChild(confirm);
    document.body.prepend(confirmContainer);
}

//fonction pour créer un élément
function createAnElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}