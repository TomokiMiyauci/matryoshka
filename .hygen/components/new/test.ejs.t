---
to: test/unit/<%= category %>/<%= componentName || 'unnamed'%>.spec.js
---
import { shallowMount } from '@vue/test-utils'
import <%= componentName %> from '~/components/<%= category %>/<%= componentName || 'unnamed'%>'

describe('<%= componentName || 'unnamed'%>', () => {
  it('should be ', () => {
    const wrapper = shallowMount(<%= componentName %>)
    expect(wrapper)
  })
})
