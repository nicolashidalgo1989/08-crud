import './render-add-button.css';

export const renderAddButton = (element, callback) => {

    const addButton = document.createElement('button');
    addButton.innerText = '+ Crear Usuario';
    addButton.className = 'add-button';

    element.append(addButton);

    addButton.addEventListener('click', () =>  {
        if(!callback) return;
        callback();
    })

}