import React from 'react'

const Article = React.lazy(() => import('./views/article/Article'))
const CreateArticle = React.lazy(() => import('./views/article/create'))

const routes = [
  { path: '/article', name: 'Article', element: Article }, // ARTICLE
  { path: '/article/create', name: 'Create Article', element: CreateArticle }, // ARTICLE
  { path: '/article/edit/:articleId', name: 'Update Article', element: CreateArticle }, // ARTICLE
]

export default routes
