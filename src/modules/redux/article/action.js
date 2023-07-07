import actionTypes from '../actionTypes'

/**
 * @name setArticleList
 * @description action for set article reducer value
 * @param {*} value
 * @returns redux dispatcher with article value object
 */
export const setArticleList = function (value) {
  return {
    type: actionTypes.article.SET_ARTICLE_LIST,
    value,
  }
}

/**
 * @name clearArticle
 * @description action for clear article reducer to initialState
 * @returns redux dispatcher
 */
export const clearArticleList = function () {
  return {
    type: actionTypes.article.CLEAR_ARTICLE_LIST,
  }
}
