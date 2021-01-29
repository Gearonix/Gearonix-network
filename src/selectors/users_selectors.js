const users_s = {
    getUsers: function (state) {
        return state.users.list
    },
    getTotalCount: function (state) {
        return state.users.TotalCount
    },
    getPage: function (state) {
        return state.users.page
    },
    getPreloader: function (state) {
        return state.users.preloader
    },
    getPageCount: function (state) {
        return state.users.pageCount
    },
    getCurrentPage: function (state) {
        return state.users.currentPage
    },
    getUsersHidden: function (state) {
        return state.users.users_hidden
    },
    paginator: function (state) {
        return state.users.paginator
    }
}
export default users_s

