---
to: stories/<%= category %>/<%= componentName || 'unnamed'%>.stories.ts
---
import <%= componentName %> from '~/components/<%= category %>/<%= componentName || 'unnamed'%>.vue'

export default {
  title: `<%= category %>|<%= componentName || 'unnamed'%>`,
  parameters: {
    info: {
      summary: `<%= category %> of <%= componentName %> is great component.`
    }
  }
}

export const Default = () => ({
  components: { <%= componentName || 'unnamed'%> },
  template: ''
})
