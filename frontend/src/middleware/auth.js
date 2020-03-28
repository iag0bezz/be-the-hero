import React, { Component, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../services/api'

function withAuth(ComponentProtect) {

    return class extends Component {

        constructor(props){
            super()

            this.state = {
                loading: true,
                redirect: false
            }
        }

        async componentDidMount(){
            await api.get('/v1/auth/check').then((response) => {
                this.setState({ loading: false })
            }).catch((err) => {
                localStorage.clear()
                console.log(err.response)
                this.setState({ loading: false, redirect: true })
            })
        }

        render() {
            const { loading, redirect } = this.state
            if(loading){
                return null
            }
            return redirect ? <Redirect to='/' /> : <ComponentProtect {...this.props} />
        }

    }

}

function withoutAuth(ComponentProtect) {

    return class extends Component {

        constructor(props){
            super()

            this.state = {
                loading: true,
                redirect: false
            }
        }

        async componentDidMount(){
            await api.get('/v1/auth/check').then((response) => {
                this.setState({ loading: false })
            }).catch((err) => {
                localStorage.clear()
                this.setState({ loading: false, redirect: true })
            })
        }

        render() {
            const { loading, redirect } = this.state
            if(loading){
                return null
            }
            return redirect ? <ComponentProtect {...this.props} /> : <Redirect to='/profile' />
        }

    }

}

export {
    withAuth,
    withoutAuth
}