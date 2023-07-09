import { setPopup, clearPopup, store } from '../../modules'

export const showPopup = (option = {}) => {
  console.log('Option showPopup => ', showPopup)
  store.dispatch(
    setPopup({
      visible: true,
      ...option,
    }),
  )
}

export const hidePopup = () => {
  store.dispatch(clearPopup())
}
