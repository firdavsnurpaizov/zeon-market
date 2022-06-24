import { getDataFromAPI } from "../api/api";


// const SET_NEWS = 'SET_NEWS';

let initialState = {
    news: [],
    totalCount: 0
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NEWS": {
            const news = [...state.news, ...action.news.data]
            // console.log(news);
            return {
                    ...state, news: news, totalCount: action.news.headers["x-total-count"]
            }
        }
        default:
            return state;
    }
}

export const setNews = (news) => ({ type: "SET_NEWS", news })


export const getNewsThunk = (limit, currentPage) => {
    return async (dispatch) => {
        const data = await getDataFromAPI.getNews(limit, currentPage)
        dispatch(setNews(data))
        return data
    }
}


export default newsReducer