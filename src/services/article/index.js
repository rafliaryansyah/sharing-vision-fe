import { API } from '../../configs'
import { store, setArticleList } from '../../modules'
import { helper } from '../../utils'

/**
 * @name getArticles
 * @description service call for get article list data
 * @param {*} payload
 */
export const getArticles = async function (payload) {
  store.dispatch(setArticleList({ loading: true }))
  const response = await API.getArticles(payload)

  if (!response || !response.data) {
    store.dispatch(setArticleList({ loading: false }))
    throw response
  }

  if (payload?.pagination) {
    const { data, total } = response
    //calculate totalpage
    const totalPage = helper.getPaginationTotalPage(total, payload?.pagination?.limit)

    store.dispatch(
      setArticleList({
        loading: false,
        pagination: {
          page: payload?.pagination?.page,
          total,
          totalPage,
        },
        data,
      }),
    )

    return response
  }

  const { data } = response

  store.dispatch(
    setArticleList({
      loading: false,
      data,
    }),
  )
  console.log('response GetARTICLES => ', response)
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
    path: id,
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
  const payload = {
    body: form,
  }

  console.log('PAYLOAD REQUEST BODY => ', payload.body)

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
    path: id,
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
    path: id,
  }

  console.log('PAYLOAD => ', payload)

  const response = await API.deleteArticle(payload)

  if (!response) {
    throw response
  }

  return response
}
