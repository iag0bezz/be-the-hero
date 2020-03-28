import React from 'react'

import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'

import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

import { withAuth, withoutAuth } from './middleware/auth'

export default function routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={withoutAuth(Logon)} />
                <Route path='/register' exact component={withoutAuth(Register)} />

                <Route path='/profile' exact component={withAuth(Profile)} />
                <Route path='/profile/new' exact component={withAuth(NewIncident)} />
            </Switch>
        </BrowserRouter>
    )
}