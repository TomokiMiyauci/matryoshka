import { Middleware } from '@nuxt/types'

const authenticator: Middleware = ({ redirect }) => {
  const tmp = true
  if (!tmp) {
    redirect('/')
  }
}

export default authenticator
