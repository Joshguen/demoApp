<template>
  <div>
    <button @click="login()">
      Click to login to metamask
    </button>

    <div v-if="$eth.walletDetected">
      <p>
        Found wallet:
      </p>
      <p id="walletAddress">
        {{ $eth.selectedAddress }}
      </p>
      <button @click="validate()">
        Click to validate
      </button>
    </div>

    <img id="pic1" alt=" ">
  </div>
</template>

<script>
export default {
  async mounted () {

  },
  methods: {
    async login () {
      await this.$eth.connect()
    },
    async validate () {
      const Web3 = require('web3')
      const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')
      const abi = [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address'
            }
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
              type: 'uint256'
            }
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function'
        }
      ]
      const contract = new web3.eth.Contract(abi)
      // This is where you enter the contract address that we are checking against. In this case it is Grillz Gang
      contract.options.address = '0xBD9071B63f25Dd199079ED80B3b384D78042956B'
      let myTokenBalance = 0

      async function f () {
        let retResult = null

        // This is where you enter the user's address manually, or use the connected account.
        await contract.methods.balanceOf(document.getElementById('walletAddress').innerText).call()
          .then(function (result) {
            // the result holds your Token Balance that you can assign to a var
            retResult = result
          })
        return retResult
      }

      const wrapper = async () => {
        return await f()
      }
      myTokenBalance = await wrapper()
      if (myTokenBalance == null || myTokenBalance < 1) {
        // On Fail:
        // local host: 'https://i.ibb.co/2qSDshf/fail-Image.png'
        document.getElementById('pic1').src = 'https://i.ibb.co/QF9bVyY/Fail.png'
      } else {
        // On Success:
        // document.getElementById('pic1').src = 'https://i.ibb.co/cN8zSzX/success-Image.png'
        document.getElementById('pic1').src = 'https://i.ibb.co/cbYMBpc/Check.png'
      }
    }
  }
}
</script>
