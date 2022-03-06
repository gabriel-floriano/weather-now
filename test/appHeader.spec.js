import { shallowMount } from '@vue/test-utils'
import AppHeader from '~/components/AppHeader.vue'
describe('AppHeader.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AppHeader)
  })

  it('does logo exist', () => {
    expect(wrapper.find('logo')).toBeTruthy()
  })
})
