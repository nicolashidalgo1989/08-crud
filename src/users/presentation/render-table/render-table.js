import usersStore from '../../store/users-store';
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

export const renderTable = element => {

    const users = usersStore.getUsers();

    if(!table) {
        table = createTable();
        element.append(table);
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
                    <a href="/#" data-id="${id}">Select</a>
                    |
                    <a href="/#" data-id="${id}">Delete</a>
                </td>
            </tr>
        `
    })
    table.querySelector('tbody').innerHTML = tableHtml;


}