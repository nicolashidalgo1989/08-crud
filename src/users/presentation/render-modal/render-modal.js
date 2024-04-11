import html from './render-modal.html?raw';
import './render-modal.css';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {};

export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if ( !id ) return;
    const user = await getUserById( id );
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

const setFormValues = user => {
    form.querySelector('[name="balance"').value     = user.balance;
    form.querySelector('[name="firstName"').value   = user.firstName;
    form.querySelector('[name="isActive"').checked  = user.isActive;
    form.querySelector('[name="lastName"').value    = user.lastName;
    loadedUser = user;
}

export const renderModal = (element, callback ) =>  {
    if(modal) return;
    modal = document.createElement('div');
    modal.innerHTML = html;
    modal.className = 'modal-container hide-modal';
    element.append(modal);

    form = modal.querySelector('form');

    modal.addEventListener('click', e => {
        if(e.target.classList.contains('modal-container')) hideModal();
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData( form );
        const userLike = { ...loadedUser };

        if(!formData.get('isActive')) { formData.set('isActive', false); }

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

        hideModal();

    })
}