const React = require('react');
const {Component} = React; // React.Component => Component로 쓸 수 있다.
class WordRelay extends Component{
    state = {
            text:"hello"
    };
    render() {
        return <div>{this.state.text}</div>
    }
}

module.exports = WordRelay;
//다른 곳에서 쓸 수 있게 export