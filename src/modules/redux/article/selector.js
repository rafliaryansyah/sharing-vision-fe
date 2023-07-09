/**
 * @name articleListSelector
 * @description selector for get list from article reducer
 * @param {*} state store
 * @returns article list object
 */
export const articleListSelector = function (state) {
  return state.article.data
}
