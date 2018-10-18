import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class FormContainer extends Component {

  constructor() {
    super();

    this.state = {
        inputValue: '',
        item: {
            value: "",
            isDone: false 
        },
        items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleCheckItem(index) {
        let status = this.state.items[index].isDone === true ? false : true;
        this.state.items[index].isDone = status;
        let items = this.state.items.slice();
        this.setState({ items: items })
  }

  handleRemoveItem(index) {
    var array = [...this.state.items];
    console.log('index', index);
    array.splice(index, 1);

    this.setState({ items: array });
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({
        items: [...this.state.items, { value: this.state.inputValue, isDone: false }]
    })
  }

  render() {

    return (
        <div>
            <form onSubmit={this.handleSubmit} id="article-form">
                <Input
                    text="Add todo"
                    label="todo"
                    type="text"
                    id="todo"
                    value={this.state.inputValue}
                    handleChange={this.handleChange}
                />
                <button type="submit">
                    Add to list
                </button>
            </form>
            <ul className="pl-0 mt-4">
                { this.state.items.map((item, index) => {
                    return <li className={(item.isDone ? 'is-done ' : '') + "d-flex p-2 text-white bg-dark mb-1"} key={index}>
                        <div onClick={() => { this.handleCheckItem(index) }} className="flex-grow-1">{item.value}</div>
                        <div onClick={() => { this.handleRemoveItem(index) }}>Remove</div>
                    </li>
                }) }
            </ul>
      </div>
    );

  }

}

export default FormContainer;

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;