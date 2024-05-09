const allDropdowns = document.querySelectorAll(".dropdown");
allDropdowns.forEach(dropdown => {
    const checkInput = document.createElement('input');
    checkInput.id = 'dropdown-check'; checkInput.type='checkbox';
    dropdown.prepend(checkInput);
});