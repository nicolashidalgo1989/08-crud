import usersStore from './store/users-store';
import { renderTable } from './presentation/render-table/render-table';
import { renderButtons } from './presentation/render-buttons/render-buttons';
import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderModal, toggleModal } from './presentation/render-modal/render-modal';

/**
 *
 * @param {HTMLDivElement} element
 */
export const usersApp = async( element ) => {

    await usersStore.loadNextPage();
    element.innerHTML = '';

    renderTable( element );
    renderButtons( element );
    renderAddButton( element, () => toggleModal() );
    renderModal( element );

}