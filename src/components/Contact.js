import React, { Component } from 'react'

class Contact extends Component {
	handleDoubleClick = () => { this.props.onDoubleClick(this.props.contact.id) }

	handleDelete = () => { this.props.onDelete(this.props.contact.id) }


	render () {
		return(
		  <div className="tile">
		  	<span className="deleteButton" onClick={this.handleDelete}>x</span>
		    <h4 onClick={this.handleDoubleClick}>{this.props.contact.name}</h4>
		    <p onClick={this.handleDoubleClick}>{this.props.contact.description}</p>
		  </div>
		)
	}
}

export default Contact
