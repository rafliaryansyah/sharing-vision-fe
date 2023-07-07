import actionTypes from '../actionTypes'

const initialState = {
  list: {
    data: [],
    loading: false,
    meta: {
      total: 0,
      page: 1,
      totalPage: 1,
      perPage: 10,
    },
  },
}

export default function article(state = initialState, action) {
  switch (action.type) {
    case actionTypes.article.SET_ARTICLE_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.value,
        },
      }
    case actionTypes.article.CLEAR_ARTICLE_LIST:
      return {
        ...state,
        list: initialState,
      }
    default:
      return state
  }
}
