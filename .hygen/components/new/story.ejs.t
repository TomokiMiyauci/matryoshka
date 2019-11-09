---
to: stories/<%= category %>/<%= componentName || 'unnamed'%>.stories.js
---
import <%= componentName %> from '~/components/<%= category %>/<%= componentName || 'unnamed'%>'

export default {
  title: `<%= category %>|<%= componentName || 'unnamed'%>`
}

export const def = () => ({
  components: { <%= componentName || 'unnamed'%> },
  template: ''
})
