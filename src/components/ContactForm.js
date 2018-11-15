import React, { Component } from 'react'
import Auth from './modules/Auth'
import axios from 'axios'

class ContactForm extends Component {
  handleClick = () => { this.props.onClick(this.props.contact.id) }
	constructor(props) {
		super(props)
		this.state = {
      name: this.props.contact.name,
      description: this.props.contact.description
		}
	}

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const contact = {name: this.state.name, description: this.state.description }
    var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.put(
      `http://localhost:3001/groups/${this.props.contact.group_id}/contacts/${this.props.contact.id}`,
      {contact: contact}, {headers: headers}
      )
    .then(response => {
      this.props.updateContact(response.data)
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
					<textarea className='input' name="description" placeholder='Describe your contact'
            value={this.state.description} onChange={this.handleInput}></textarea>
      	</form>

      </div>
    );
  }
}

export default ContactForm
