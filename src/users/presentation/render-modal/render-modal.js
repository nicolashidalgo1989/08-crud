import html from './render-modal.html?raw';
import './render-modal.css';

let modal, form;

export const toggleModal = () => {
    modal?.classList.toggle('hide-modal');
    form?.reset();
}

export const renderModal = element =>  {
    if(modal) return;
    modal = document.createElement('div');
    modal.innerHTML = html;
    modal.className = 'modal-container hide-modal';
    element.append(modal);

    form = modal.querySelector('form');

    modal?.addEventListener('click', e => {
        if(e.target.classList.contains('modal-container')) toggleModal();
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData( form );
        const userLike = {};

        for(const [key, value] of formData){
            if(key === 'balance') {
                userLike[key] = parseInt(value);
                continue;
            }
            if(key === 'isActive'){
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }
            userLike[key] = value;
        }

        console.log(userLike);

        toggleModal();
    })
}