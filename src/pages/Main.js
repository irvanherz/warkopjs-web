import React from "react"
import {Redirect} from 'react-router-dom'

class Main extends React.Component {
    render(){
        const loginData = localStorage.getItem('loginData')
        if(!loginData) return(<Redirect to='/login' />)
        else return(<Redirect to='/home' />)
    }
}

export default Main