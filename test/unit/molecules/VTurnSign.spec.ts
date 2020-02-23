import { shallowMount } from '@vue/test-utils'
import VTurnSign from '~/components/molecules/VTurnSign.vue'

const PLAYER_1 = 'PLAYER_1'
const PLAYER_2 = 'PLAYER_2'

describe('molecules/VTurnSign', () => {
  it('should have props of PLAYER_1', () => {
    const wrapper = shallowMount(VTurnSign, {
      propsData: {
        player: PLAYER_1
      }
    })
    expect(wrapper.props().player).toBe('PLAYER_1')
  })

  it('should have props of nextPlayer', () => {
    const wrapper = shallowMount(VTurnSign, {
      propsData: {
        nextPlayer: PLAYER_1
      }
    })
    expect(wrapper.props().nextPlayer).toBe('PLAYER_1')
  })

  it('should have mdi-sword-cross icon if giving props of player and nextPlayer are equal', () => {
    const wrapper = shallowMount(VTurnSign, {
      propsData: {
        nextPlayer: PLAYER_1,
        player: PLAYER_1
      }
    })

    expect(wrapper.find('v-icon-stub').text()).toBe('mdi-sword-cross')
  })

  it('should have mdi-shield-sun icon if giving props of player and nextPlayer are deference', () => {
    const wrapper = shallowMount(VTurnSign, {
      propsData: {
        nextPlayer: PLAYER_2,
        player: PLAYER_1
      }
    })

    expect(wrapper.find('v-icon-stub').text()).toBe('mdi-shield-sun')
  })

  it('should have specific text if giving props of player and nextPlayer are equal2', () => {
    const wrapper = shallowMount(VTurnSign, {
      propsData: {
        nextPlayer: PLAYER_1,
        player: PLAYER_2
      }
    })

    expect(wrapper.find('div').text()).toBe('Enemy Turn')
  })
})
