import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-use-by-id';
import { toggleModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {

    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>id</th>
            <th>balance</th>
            <th>first name</th>
            <th>last name</th>
            <th>active</th>
            <th>actions</th>
        </tr>
    `
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;

}

const tableDeleteListener = async(e) => {
    const el = e.target.closest('.delete-user');
    if(!el) return;
    const id = el.getAttribute('data-id');
    try{
        await usersStore.reloadPage();
        await deleteUserById(id);
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    }catch(error){
        console.log(error);
    }
}

const tableSelectListener = e => {
    const el = e.target.closest('.select-user');
    if(!el) return;
    const id = el.getAttribute('data-id');
    toggleModal(id)
}

export const renderTable = element => {

    const users = usersStore.getUsers();

    if(!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', (e) => {
            tableSelectListener(e);
            tableDeleteListener(e);
        })

    }

    // TODO: Listeners en la tabla

    let tableHtml = '';
    users.forEach( user => {
        const { id, balance, firstName, lastName, isActive, gender } = user;
        tableHtml += `
            <tr>
                <td>${id}</td>
                <td>${balance}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${isActive}</td>
                <td>
                    <a href="/#" class="select-user" data-id="${id}">Select</a>
                    |
                    <a href="/#" class="delete-user" data-id="${id}">Delete</a>
                </td>
            </tr>
        `
    })
    table.querySelector('tbody').innerHTML = tableHtml;


}