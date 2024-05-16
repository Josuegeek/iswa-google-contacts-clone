initIswaDropdowns();

function initIswaDropdowns(){
    const allDropdowns = document.querySelectorAll(".dropdown");
    allDropdowns.forEach(dropdown => {
        const checkInput = document.createElement('input');
        checkInput.className = 'dropdown-check'; checkInput.type='checkbox';
        if(!dropdown.querySelector(".dropdown-check"))
            dropdown.prepend(checkInput);
    });
}