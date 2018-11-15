import React, { Component } from 'react'
import Auth from './modules/Auth'
import axios from 'axios'

class GroupForm extends Component {
  handleClick = () => { this.props.onClick(this.props.group.id) }
	constructor(props) {
		super(props)
		this.state = {
      name: this.props.group.name,
      description: this.props.group.description
		}
	}

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const group = {name: this.state.name, description: this.state.description }
    var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.put(
      `http://localhost:3001/groups/${this.props.group.id}`,
      {group: group}, {headers: headers}
      )
    .then(response => {
      this.props.updateGroup(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
      	<form onBlur={this.handleBlur} >
					<input className='input' type="text" name="name" placeholder='Enter a name'
            value={this.state.name} onChange={this.handleInput}
            ref={this.props.titleRef} />
					<textarea className='input' name="description" placeholder='Describe your group'
            value={this.state.description} onChange={this.handleInput}></textarea>
            <button  onClick={this.handleClick}>{this.props.group.is_active ? "DeActive" : "Active"}</button>
      	</form>

      </div>
    );
  }
}

export default GroupForm
