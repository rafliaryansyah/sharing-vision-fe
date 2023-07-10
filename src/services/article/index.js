import { API } from '../../configs'
import { store, setArticleList } from '../../modules'

/**
 * @name getArticles
 * @description service call for get article list data
 * @param {*} payload
 */
export const getArticles = async function (offset, status) {
  const payload = {
    path: status ? `?limit=10&offset=${offset}&status=${status}` : `?limit=10&offset=${offset}`,
  }
  console.log('Service.getArticles')
  store.dispatch(setArticleList({ loading: true }))
  const response = await API.getArticles(payload)
  if (!response || !response.data) {
    store.dispatch(setArticleList({ loading: false }))
    throw response
  }

  // if (payload?.pagination) {
  //   const { data, total } = response
  //   //calculate totalpage
  //   const totalPage = helper.getPaginationTotalPage(total, payload?.meta?.total)

  //   store.dispatch(
  //     setArticleList({
  //       loading: false,
  //       pagination: {
  //         page: payload?.meta?.page,
  //         total,
  //         totalPage,
  //       },
  //       data,
  //     }),
  //   )

  //   return response
  // }

  const { data } = response

  store.dispatch(
    setArticleList({
      loading: false,
      data,
    }),
  )
  return response
}

/**
 * @name getArticleById
 * @description service call for get article data by id
 * @param {*} id
 * @returns
 */
export const getArticleById = async function (id) {
  console.log('getArticleById')
  const payload = {
    path: `/${id}`,
  }
  const response = await API.getArticle(payload)

  if (!response || !response.data) {
    throw response
  }

  // coz the response is array object, when zero index in array is empty,
  // throw the error with message
  if (!response.data) {
    return Promise.reject({
      message: 'Article not found',
    })
  }

  console.log('getArticleByIdx', response.data)
  // return just article object
  return response.data
}

/**
 * @name createArticle
 * @description service call for article creation
 * @param {*} form is body payload
 * @returns
 */
export const createArticle = async function (form) {
  console.log('createaArticle 2', form)
  const payload = {
    body: form,
  }
  console.log('createaArticle', payload)
  const response = await API.insertArticle(payload)
  if (!response) {
    throw response
  }

  return response
}

/**
 * @name updateArticle
 * @description service call for update article
 * @param {*} id article id
 * @param {*} form body payload
 * @returns
 */
export const updateArticle = async function (id, form) {
  const payload = {
    path: `/${id}`,
    body: form,
  }

  const response = await API.updateArticle(payload)

  if (!response) {
    throw response
  }

  return response
}

/**
 * @name deleteArticle
 * @description service call for delete article
 * @param {*} id article id
 * @returns
 */
export const deleteArticle = async function (id) {
  const payload = {
    path: `/${id}`,
  }

  console.log('DELETE ARTICLE PAYLOAD => ', id)

  const response = await API.deleteArticle(payload)
  console.log('DELETE ARTICLE response => ', response)
  if (!response) {
    throw response
  }

  return response
}
