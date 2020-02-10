export type Document<T> = {
  id: string
  path: string
  data: T | undefined
}
