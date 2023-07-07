import { combineReducers, createStore } from 'redux'

/**
 * @reducers
 */
import article from './article/reducer'
import popup from './popup/reducer'
import loading from './loading/reducer'

const reducer = combineReducers({
  article,
  popup,
  loading,
})

const store = createStore(reducer)

export { store }

/**
 * @actions
 */
export * from './article/action'
export * from './popup/action'
export * from './loading/action'

/**
 * @selectors
 */
export * from './article/selector'
export * from './popup/selector'
export * from './loading/selector'
