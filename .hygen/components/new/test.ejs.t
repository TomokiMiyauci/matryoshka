---
to: test/unit/<%= category %>/<%= componentName || 'unnamed'%>.spec.ts
---
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueCompositionApi from '@vue/composition-api'
import <%= componentName %> from '~/components/<%= category %>/<%= componentName || 'unnamed'%>.vue'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('<%= componentName || 'unnamed'%>', () => {
  it('should be ', () => {
    const wrapper = shallowMount(<%= componentName %>, { localVue })
    expect(wrapper)
  })
})
