import { ref } from '@vue/composition-api'

export const useDialog = () => {
  const dialogRef = ref(false)

  const show = () => {
    dialogRef.value = true
  }

  const hide = () => {
    dialogRef.value = false
  }

  return {
    dialogRef,
    show,
    hide
  }
}
