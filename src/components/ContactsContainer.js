import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Auth from './modules/Auth'
import Contact from './Contact'
import ContactForm from './ContactForm'
import Notification from './Notification'

class ContactsContainer extends Component {
  constructor(props) {
    super(props)
    console.log("calling contacts constructor")
    this.state = {
      contacts: [],
      group_id: this.props.match.params.group_id,
      editingContactId: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/groups/${this.state.group_id}/contacts.json`, { headers: { Authorization: `Token ${Auth.getToken()}` }} )
    .then(response => {
      this.setState({contacts: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewContact = () => {
  	var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.post(`http://localhost:3001/groups/${this.state.group_id}/contacts`, {contact: {name: '', description: ''}}, { headers: headers} )
    .then(response => {
      const contacts = update(this.state.contacts, { $splice: [[0, 0, response.data]]})
      this.setState({contacts: contacts, editingContactId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateContact = (contact) => {
    const contactIndex = this.state.contacts.findIndex(x => x.id === contact.id)
    const contacts = update(this.state.contacts, {[contactIndex]: { $set: contact }})
    this.setState({contacts: contacts, notification: 'All changes saved', transitionIn: true})
  }

  deleteContact = (id) => {
  	var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.delete(`http://localhost:3001/groups/${this.state.group_id}/contacts/${id}`,{headers: headers})
    .then(response => {
      const contactIndex = this.state.contacts.findIndex(x => x.id === id)
      const contacts = update(this.state.contacts, { $splice: [[contactIndex, 1]]})
      this.setState({contacts: contacts})
    })
    .catch(error => console.log(error))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    console.log(id)
    console.log(this.state.contacts)
    this.setState({editingContactId: id}, () => { this.title.focus() })
  }
 
  render() {
    return (
    	<div>
        <div>
        <button className="newContactButton" onClick={this.addNewContact} >
            New Contact
          </button>
          <Notification in={this.state.transitionIn} notification= {this.state.notification} />
          </div>
        {this.state.contacts.map((contact) => {
          if(this.state.editingContactId === contact.id) {
            return(<ContactForm contact={contact} key={contact.id} updateContact={this.updateContact}
                    titleRef= {input => this.title = input}
                    resetNotification={this.resetNotification} />)
          } else {
            return (<Contact contact={contact} key={contact.id} onDoubleClick={this.enableEditing}
                    onDelete={this.deleteContact} />)
          }
        })}
        </div>
    	);
  }
}

export default ContactsContainer;
