import { startup } from './src/utils'

export const onClientEntry = () => {
  window.onload = startup.bind(null, null)
}
