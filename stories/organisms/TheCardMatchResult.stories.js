import TheCardMatchResult from '~/components/organisms/TheCardMatchResult'

export default {
  title: `organisms|TheCardMatchResult`
}

const mockFn = () => {
  console.log('playAgain is called')
}

export const def = () => ({
  components: { TheCardMatchResult },
  template: `<the-card-match-result text="Your are winner!" :play-again="${mockFn}"></the-card-match-result>`
})
