import { isRef } from '@vue/composition-api'
import { useDialog } from '~/compositions/dialog'

describe('dialog.ts', () => {
  it('should have state what is boolean and Ref', () => {
    const { dialogRef } = useDialog()

    expect(isRef(dialogRef)).toBeTruthy()
  })

  it('should be false what initialize', () => {
    const { dialogRef } = useDialog()

    expect(dialogRef.value).toBeFalsy()
  })

  it('should be state is true if show is called', () => {
    const { dialogRef, show } = useDialog()
    show()

    expect(dialogRef.value).toBeTruthy()
  })

  it('should be state is false if state is true and  hide is called', () => {
    const { dialogRef, show, hide } = useDialog()
    show()
    hide()

    expect(dialogRef.value).toBeFalsy()
  })
})
