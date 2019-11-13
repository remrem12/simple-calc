import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import './css/style.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: '0',
      previous: [],
      nextIsReset: false
    }
  }

  reset = () => {
    this.setState({current: '0', previous: [], nextIsReset: false})
  }

  addToCurrent = (symbol) => {
    if(['+', '-', '*', '/'].includes(symbol)){
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextIsReset: true});
    }else{
      if((this.state.current === '0' && symbol !== '.') || this.state.nextIsReset){
        this.setState({current: symbol, nextIsReset: false});
      }else{
        this.setState({current: this.state.current + symbol});
      }
    }
  }

  calc = () => {
    let {previous, current, nextIsReset} = this.state;
    if(previous.length > 0){
      this.setState({
        current: eval(String(previous[previous.length - 1] + current)),
        previous: [],
        nextIsReset
      })
    }
  }

  showButtons = buttons => {
    let result = null;
    result = buttons.map((button, index) => {
      return  <Button symbol = {button.symbol} 
                    cols = {button.cols}
                    action = {symbol => button.action}
                    key = {index}
              >
              </Button>
    })
    return result;
  }
  
  render(){
    const buttons = [
      {symbol: 'C', cols: 3, action: this.reset},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: '*', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: '0', cols: 2, action: this.addToCurrent},
      {symbol: '.', cols: 1, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.calc},
    ];
    

    return(
      <div className="App">
        {this.state.previous.length > 0 ? 
          <div className = 'floaty-last'>{this.state.previous[this.state.previous.length - 1]}</div>
          : <div className = 'floaty-last'>0</div>
        }
        <input type="text" className = 'result' value = {this.state.current}/>
        {/* {buttons => this.showButtons(buttons)} */}
        {buttons.map((button, index) => {
          return  <Button
                    symbol = {button.symbol} 
                    cols = {button.cols}
                    action = {symbol => button.action(symbol)}
                    key = {index}                  
                  >

                  </Button>
        })}

      </div>
    )
  }
}

export default App;
