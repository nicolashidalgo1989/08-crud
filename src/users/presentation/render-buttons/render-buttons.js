import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

export const renderButtons = element => {

    const buttons = document.createElement('div');
    buttons.className = 'buttons-container';

    const nextButton = document.createElement('button');
    nextButton.innerText = 'next  >';
    nextButton.disabled = (usersStore.getUsers().length === 0);

    const prevButton = document.createElement('button');
    prevButton.innerText = '< prev';
    prevButton.disabled = (usersStore.getCurrentPage() === 1);

    const currentPageLabel =  document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStore.getCurrentPage();

    buttons.append( prevButton, currentPageLabel, nextButton );
    element.append( buttons );

    const changeStateButton = (btn, state) => btn.disabled = state;

    prevButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage();
        renderTable(element);
        changeStateButton(prevButton, (usersStore.getCurrentPage() === 1));
        changeStateButton(nextButton, (usersStore.getUsers().length === 0));
        currentPageLabel.innerText = usersStore.getCurrentPage();
    })

    nextButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        renderTable(element);
        changeStateButton(prevButton, (usersStore.getCurrentPage() === 1));
        changeStateButton(nextButton, (usersStore.getUsers().length === 0));
        currentPageLabel.innerText = usersStore.getCurrentPage();
    })

}