import Welcome from './Welcome'

export default {
  title: 'Welcome'
}
export const toStorybook = () => ({
  components: { Welcome },
  template: '<welcome />'
})
