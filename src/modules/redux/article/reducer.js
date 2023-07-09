import actionTypes from '../actionTypes'

const initialState = {
  data: {
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
        data: {
          ...state.data,
          ...action.value,
        },
      }
    case actionTypes.article.CLEAR_ARTICLE_LIST:
      return {
        ...state,
        data: initialState,
      }
    default:
      return state
  }
}
