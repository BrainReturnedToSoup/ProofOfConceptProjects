const elementsObj = {};
document.querySelectorAll('button').forEach( element => {
    elementsObj[`${element.getAttribute('data-id')}`] = element;
})
console.log(elementsObj);