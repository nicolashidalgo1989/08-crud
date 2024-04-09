import usersStore from './store/users-store';
import { renderTable } from './presentation/render-table/render-table';

/**
 *
 * @param {HTMLDivElement} element
 */
export const usersApp = async( element ) => {

    await usersStore.loadNextPage();
    element.innerHTML = '';

    renderTable(element);

}