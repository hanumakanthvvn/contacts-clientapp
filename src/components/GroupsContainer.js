import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Auth from './modules/Auth'
import Group from './Group'
import GroupForm from './GroupForm'
import Notification from './Notification'

class GroupsContainer extends Component {
  constructor(props) {

    super(props)
    this.state = {
      groups: [],
      editingGroupId: null,
      notification: '',
      transitionIn: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/groups.json', { headers: { Authorization: `Token ${Auth.getToken()}` }} )
    .then(response => {
      this.setState({groups: response.data})
    })
    .catch(error => console.log(error))
  }

  // addNewGroup = () => {
  // 	var headers = { Authorization: `Token ${Auth.getToken()}` }
  //   axios.post('http://localhost:3001/groups.json', {group: {name: 'test', description: "test description"}}, { headers: headers} )
  //   .then(response => {
  //     const groups = update(this.state.groups, { $splice: [[0, 0, response.data]]})
  //     this.setState({groups: groups})
  //   })
  //   .catch(error => console.log(error))
  // }

  addNewGroup = () => {
  	var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.post('http://localhost:3001/groups', {group: {name: '', description: ''}}, { headers: headers} )
    .then(response => {
      const groups = update(this.state.groups, { $splice: [[0, 0, response.data]]})
      this.setState({groups: groups, editingGroupId: response.data.id})
    })
    .catch(error => {
    	console.log(error.response.data.text); 
    	this.setState({notification: error.response.data.text, transitionIn: true})
    })
  }

  handleGroupActive = (id) => {
  	console.log("called")
  	var headers = { Authorization: `Token ${Auth.getToken()}` }
  	var group = this.state.groups.find(x => x.id === id)
    axios.put("http://localhost:3001/groups/"+id+"/toggle",{}, {headers} )
    .then(response => {
    	const groupIndex = this.state.groups.findIndex(x => x.id === group.id)
        const groups = update(this.state.groups, {[groupIndex]: { $set: response.data }})
        this.setState({groups: groups})
    })
    .catch(error => console.log(error))
  	
  }

  updateGroup = (group) => {
    const groupIndex = this.state.groups.findIndex(x => x.id === group.id)
    const groups = update(this.state.groups, {[groupIndex]: { $set: group }})
    this.setState({groups: groups, notification: 'All changes saved', transitionIn: true})
  }

  deleteGroup = (id) => {
  	var headers = { Authorization: `Token ${Auth.getToken()}` }
    axios.delete(`http://localhost:3001/groups/${id}`,{headers: headers})
    .then(response => {
      const groupIndex = this.state.groups.findIndex(x => x.id === id)
      const groups = update(this.state.groups, { $splice: [[groupIndex, 1]]})
      this.setState({groups: groups})
    })
    .catch(error => console.log(error))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingGroupId: id}, () => { this.title.focus() })
  }
 
  render() {
    return (
    	<div className="container">
        <div className="row">
        <button className="newGroupButton btn btn-primary" onClick={this.addNewGroup} >
            New Group
          </button>
          <Notification in={this.state.transitionIn} notification= {this.state.notification} />
          </div>
        {this.state.groups.map((group) => {
          if(this.state.editingGroupId === group.id) {
            return(<GroupForm group={group} key={group.id} updateGroup={this.updateGroup}
                    titleRef= {input => this.title = input}
                    resetNotification={this.resetNotification} onClick={this.handleGroupActive} />)
          } else {
            return (<Group group={group} key={group.id} onDoubleClick={this.enableEditing} onClick={this.handleGroupActive}
                    onDelete={this.deleteGroup} />)
          }
        })}
        </div>
    	);
  }
}

// <h4>{group.is_active ? <a href={group.id+"/contacts"}>show</a> : "" }</h4>
// <h4><a href="#" id={group.id} onClick={this.handleGroupActive}>{group.is_active ? "Active" : "Deactive"}</a></h4>
export default GroupsContainer;
