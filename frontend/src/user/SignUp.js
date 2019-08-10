import React, { Component } from 'react'

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        } // state
    } // constructor
    
    resetState() {
        this.setState({
            name: '',
            email: '',
            password: '',
            error: ''
        }) // setState
    } // resetState

    handleChange = key => event => {
        this.setState( { [ key ]: event.target.value } )
    } // handleChange

    doSignUp = async user => {
        const domain = 'http://localhost:8080/signup'
        const data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, // headers
            body: JSON.stringify( user )
        } // data
        // console.log( user )
        try {
            const response = await fetch(domain, data);
            return await response.json({ message: 'data fetch success!' });
        } catch ( error ) {
            return console.log(error);
        } // catch
    } // doSignUp

    handleClick = event => {
        event.preventDefault() // prevent webbrowser from reloading
        const { name, email, password } = this.state
        this.doSignUp( { name, email, password } )
            .then( data => {
                if ( data.error ) {
                    this.setState( { error: data.error } )
                    return
                } // if
                this.resetState()
        }) // then
    } // handleClick

    createForm( value, inputType, stateVal,  key=inputType ) {
        return (
            <div className='formGroup'>
                    <label className='initialText'>
                        { value }
                    </label>
                    <input onChange={this.handleChange( key )} 
                        type={ inputType } 
                        className='form-control'
                        value={ stateVal } 
                    /> 
            </div>         
        ) // return
    } // createForm

    render() {
        const { name, email, password } = this.state
        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>SignUp</h2>
                <form>
                    { this.createForm( 'Name', 'text', name, 'name' ) }
                    { this.createForm( 'Email', 'email', email ) }
                    { this.createForm( 'Password', 'password', password ) }
                    <button onClick={ this.handleClick } className='btn btn-raised btn-primary'>
                        Submit
                    </button>
                </form>
            </div>
        ) // return
    } // render
} // SignUp

export default SignUp