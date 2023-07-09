import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
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

// const article = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.article.SET_ARTICLE_LIST:
//       return {
//         ...state,
//         list: {
//           ...state.list,
//           ...action.value,
//         },
//       }
//     case actionTypes.article.CLEAR_ARTICLE_LIST:
//       return {
//         ...state,
//         list: initialState,
//       }
//     default:
//       return state
//   }
// }

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
