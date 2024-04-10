import { loadUsersByPage } from '../use-cases/load-users-by-page';

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    console.log('next page');
    const users = await loadUsersByPage( state.currentPage + 1 );
    if( users.length === 0 ) return;
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    console.log('previous page');
    const users = await loadUsersByPage( state.currentPage - 1 );
    if( state.currentPage === 1 ) return;
    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = async() => {
    throw new Error('not implemented');
}

const reloadPage = async() => {
    throw new Error('not implemented');
}

export default {

    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers        : () => [...state.users],
    getCurrentPage  : () => state.currentPage,

}