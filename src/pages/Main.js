import React from "react"
import {Redirect, withRouter} from 'react-router-dom'

class Main extends React.Component {
    render(){
        const loginData = localStorage.getItem('loginData')
        if(!loginData) return(<Redirect push to='/login' />)
        else return(<Redirect push to='/home' />)
    }
}

export default Main