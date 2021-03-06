import * as axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
});

export const getDataFromAPI = {
    // main-reducer
    getSearch() {
        return instance.get(`search`)
            .then(response => {
                return response
            })
    },
    getLogo() {
        return instance.get(`logo`)
            .then(response => {
                return response.data
            })
    },
    getContacts() {
        return instance.get(`contacts`)
            .then(response => {
                return response.data
            })
    },
    getBestseller(limit) {
        return instance.get(`bestseller?_limit=${limit}`)
            .then(response => {
                return response
            })
    },
    getNovelty(limit) {
        return instance.get(`novelty`, {
            params: {
                _limit: limit
            }
        })
            .then(response => {
                return response
            })
    },
    getCollections(limit = 4, page = 1) {
        return instance.get(`collections?_limit=${limit}&_page=${page}`)
            .then(response => {
                // console.log(response);
                return response
            })
    },
    getAllCollections() {
        return instance.get(`collections`)
            .then(response => {
                return response.data
            })
    },
    getCollection(name, limit, page) {
        return instance.get(`${name}?_limit=${limit}&_page=${page}`)
            .then(response => {
                // console.log(response);
                return response
            })
    },
    getAdvantages() {
        return instance.get(`advantages`)
            .then(response => {
                return response.data
            })
    },

    setOrder(data) {
        return instance.post(`orders`, data)
    },

    // news-reducer

    getNews(limit, currentPage) {
        return instance.get(`news?_limit=${limit}&_page=${currentPage}`)
            .then(response => {
                // console.log(response);
                return response
            })
    },

    // about-reducer

    getAbout() {
        return instance.get(`about`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },


    // details-reducer

    getDetails(name, id) {
        return instance.get(`${name}?id=${id}`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },
    getSimilar(name, id) {
        return instance.get(`${name}?id_ne=${id}&_limit=5`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },

    getUser(id) {
        return instance.get(`users/${id}`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },

    // USER SIGNUP

    setUser(user) {
        return instance.post(`users`, user)
    },
    // favorites

    getUserFavorites(userId) {
        return instance.get(`users/${userId}/favourites`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },

    setFav(data) {
        return instance.post(`favourites`, data)
    },

    // removeFav(id) {
    //     return instance.delete(`favourites/${id}`)
    // },
    
    removeFav( data) {
        return instance.delete(`favourites/${data?.id}`, data)
    },

    // cart

    getUserCart(userId) {
        return instance.get(`users/${userId}/cart`)
            .then(response => {
                // console.log(response.data);
                return response.data
            })
    },

    setToCart(data) {
        return instance.post(`cart`, data)
    },
    removeFromCart(id){
        return instance.delete(`cart/${id}`)
    }


}