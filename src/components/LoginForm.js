import React, { Component } from 'react';

class LoginForm extends Component{

	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		const name = e.target.name;
		const val = e.target.value;
		this.setState({
			[name]: val,
		})
	}

	render(){
		return (

           <div className="bd-example">
           <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
           <div className="form-row">
           <div className="col">
           		<input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} className="form-control col5"/>
          	</div>
          	<div className="col">
          	 <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} className="form-control"/>
           	</div>
           	<div className="form-group">
           <input type="submit" value ="Login!" class="btn btn-primary"/>
           </div>
           </div>
           </form>
           </div>
			)
	}
}

export default LoginForm;