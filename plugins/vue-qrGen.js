import EthereumQRPlugin from 'ethereum-qr-code'

Vue.use(EthereumQRPlugin)

new Vue({
  // your vue config
  qr: new EthereumQRPlugin(),
})