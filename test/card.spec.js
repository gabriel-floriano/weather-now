import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Card from '~/components/Card.vue'
describe('Card.vue', () => {
  let wrapper
  const city = 'Joinville, BR'
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      propsData: {
        city,
      },
      methods: {},
    })
  })

  it('has city prop', () => {
    expect(wrapper.props().city).toBe('Joinville, BR')
  })

  it('is sucesfully setting the city data', async () => {
    expect(await wrapper.vm.setCityData(city)).toBe(true)
  })

  it('try again button is working has intended', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.cityData).not.toBe({})
  })
})
