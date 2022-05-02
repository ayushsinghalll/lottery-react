//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          manager : '',
          player : [],
          balance : '',
          value : ''
      };
    }
    async componentDidMount() {
        const manager = await lottery.methods.manager().call()
        const player =  await lottery.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, player, balance })
     }

     onSubmit   = async  (event)  =>{
            event.preventDefault()

         const accounts=    await web3.eth.getAccounts()
         this.setState({message : 'Waiting on transaction success.....'})
         await lottery.methods.enter().send({
             from: accounts[0],
             value: web3.utils.fromWei(this.state.value, 'ether')
        })
         this.setState({message : 'You have been entered!'})
     }
    render() {
      return (
          <div>
            <h2>Lottery Contract</h2>
            <p>
                This contract is managed by {this.state.manager}.
                There are currently {this.state.player.length} people entered,
                completing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
            </p>
              <hr/>
              <form onSubmit={this.onSubmit}>
                  <h4>Want to try your luck</h4>
                  <div>
                      <label>Amount of ether to enter</label>
                      <input
                          value={this.state.value}
                        onChange={event => this.state({value: event.target.value })}
                      />
                  </div>
                  <button>Enter</button>
              </form>
          </div>
      );
    }
}
export default App;
