import React, { Component } from 'react'

class Group extends Component {
	handleDoubleClick = () => { this.props.onDoubleClick(this.props.group.id) }

	handleDelete = () => { this.props.onDelete(this.props.group.id) }

	handleClick = () => { this.props.onClick(this.props.group.id) }

	render () {
		return(
		  <div class="row" className="tile">
		  	<span className="deleteButton" onClick={this.handleDelete}>x</span>
		    <h4 onClick={this.handleDoubleClick}>{this.props.group.name}</h4>
		    <p onClick={this.handleDoubleClick}>{this.props.group.description}</p>
		    <p>{this.props.group.is_active ? <a href={"groups/"+this.props.group.id+"/contacts"}>show</a> : "" }</p>
		    <p><button  onClick={this.handleClick}>{this.props.group.is_active ? "DeActive" : "Active"}</button></p>
		  </div>
		)
	}
}

export default Group
