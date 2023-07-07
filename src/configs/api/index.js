import apiRequest from './config'
import { apiEndpoint } from './url'

const API = {}

API.getArticles = apiRequest.get(apiEndpoint.article)
API.getArticle = apiRequest.get(apiEndpoint.article)
API.updateArticle = apiRequest.put(apiEndpoint.article)
API.deleteArticle = apiRequest.delete(apiEndpoint.article)
API.insertArticle = apiRequest.post(apiEndpoint.article)

export default API
