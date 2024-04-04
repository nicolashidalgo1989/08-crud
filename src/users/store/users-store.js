const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    throw new Error('not implemented');
}

const loadPreviousPage = async() => {
    throw new Error('not implemented');
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

    getUser: () => [...state.users],
    getCurrentPage: () => state.currentPage,

}