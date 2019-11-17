export default {
  isOpened: (state) => (payload) => {
    return state.modals.includes(payload)
  }
}
