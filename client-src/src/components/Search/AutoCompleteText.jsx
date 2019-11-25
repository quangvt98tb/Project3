import React from 'react';
// import { __asyncValues } from 'tslib';
import './AutoCompleteText.scss';
export default class AutoCompleteText extends React.Component{
  constructor (props){
      super(props);
          this.state = {
              suggestions: [],
              text : '',
              name: ''
          }; 
      }

      componentDidMount() {
        const name = this.props.name;
        this.setState({
            ...this.state,
            name: name
        })
        this.props.getChildState({ 
            ...this.state,
            name
        });
      }

      

      onTextChanged = (e) => {
          const {items} = this.props;
          const value = e.target.value;
          let suggestions = [];
          if (value.length > 0){
              const regex = new RegExp(`${value}`,'i');
              suggestions = items.sort().filter(v => regex.test(v));
          }
          this.setState(() => ({suggestions, text: value}));
          this.props.getChildState({
            ...this.state,
            text: value,
        });
      }
      renderSuggestions () {
          const {suggestions} = this.state;
          if (suggestions.length === 0){
              return null;
          }
          const suggestions_ = suggestions.slice(0,5);
          return (
              <ul>
                  {suggestions_.map((item) => <li onClick ={() => this.suggestionSelected(item)}>{item}</li>)}
              </ul>
          )
      }
      suggestionSelected (value) {
          this.setState(() => ({
              text : value,
              suggestions : [],
          }))
          this.props.getChildState({
            ...this.state,
            text: value,
        });
      }

      render(){
          const {text} = this.state;
          return(
              <div className="AutoCompleteText">
                  <input value = {text} onChange = {this.onTextChanged} type="text"/>
                  {this.renderSuggestions()}
              </div>
          )
      }

}