const iswaModals = document.querySelectorAll(".iswa--modal"),
    btnsShowModals = document.querySelectorAll(".iswa--modal-btn");
var iswaModalContainers = [];

createModalContainer();
addBtnShowModalsListenners();

//create modal container forEach iswaModal
function createModalContainer() {
    if (iswaModals.length > 0){
        iswaModals.forEach(iswaModal => {
            const iswaModalContainer = document.createElement("div");
            const id = crypto.randomUUID();
            const properties = {
                id:id,
                className: "iswa--modal-container-hide",
                onclick: (event)=>{
                    if(event.target==iswaModalContainer)
                    hideModal(id)
                }
            }
            Object.assign(iswaModalContainer, properties);

            iswaModalContainer.appendChild(iswaModal);
            document.body.prepend(iswaModalContainer);
            iswaModalContainers.push(document.getElementById(`${id}`));
        });
    }

}

//add listenner to btns
function addBtnShowModalsListenners() {
    
    if (btnsShowModals.length > 0){
        var i = 0;
        btnsShowModals.forEach(btnShowModal => {
            btnShowModal.addEventListener("click", (event) => {
                showModal(i);
            });
            i++;
        });
    } 
}

//show modal
function showModal(index) {
    if (Number(index)) {
        iswaModalContainers[index-1].classList.remove("iswa--modal-container-hide");
        iswaModalContainers[index-1].classList.add("iswa--modal-container-show");
        iswaModals[index-1].classList.add("iswa--modal-show");
    }
}

//hide modal
function hideModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("iswa--modal-container-hide");
    modal.classList.remove("iswa--modal-container-show");
}

//hide all modals
function hideAllModal(){
    iswaModalContainers.forEach(iswaModalContainer=>{
        iswaModalContainer.classList.add("iswa--modal-container-hide");
        iswaModalContainer.classList.remove("iswa--modal-container-show");
    });
}