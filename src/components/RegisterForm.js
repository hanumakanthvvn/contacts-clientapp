import React, { Component } from 'react'

class RegisterForm extends Component{

	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			email: '',
			first_name: ''
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

           <div className="form">
           <form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state)}>
           <div className="form-group">
           <input type="text" name="username" placeholder="username" className="form-control" value={this.state.username} onChange={this.handleChange}/>
           </div>
           <div className="form-group">
           <input type="password" name="password" placeholder="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
           </div>
           <div className="form-group">
           <input type="email" name="email" placeholder="email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
           </div>
           <div className="form-group">
           <input type="text" name="first_name" placeholder="firstname" className="form-control" value={this.state.first_name} onChange={this.handleChange}/>
           </div>
           <div className="form-group">
           <input type="submit" value ="Register!" className="btn btn-info"/>
           </div>
           </form>
           </div>
			)
	}
}

export default RegisterForm;