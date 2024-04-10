import html from './render-modal.html?raw';
import './render-modal.css';
import {getUserById} from '../../use-cases/get-user-by-id';

let modal, form, loadedUser;

export const toggleModal = async(id) => {
    modal?.classList.toggle('hide-modal');
    if(!id) {
        form?.reset();
        return;
    }
    const user = await getUserById(id);
    setFormValues(user);
}

const setFormValues = user => {
    form.querySelector('[name="firstName"').value = user.firstName;
    form.querySelector('[name="lastName"').value = user.lastName;
    form.querySelector('[name="balance"').value = user.balance;
    form.querySelector('[name="isActive"').checked = user.isActive;
    loadedUser = user;
}

export const renderModal = (element, callback ) =>  {
    if(modal) return;
    modal = document.createElement('div');
    modal.innerHTML = html;
    modal.className = 'modal-container hide-modal';
    element.append(modal);

    form = modal.querySelector('form');

    modal?.addEventListener('click', e => {
        if(e.target.classList.contains('modal-container')) toggleModal();
    })

    form.addEventListener('submit', async (e) => {
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

        await callback(userLike);

        toggleModal();
    })
}