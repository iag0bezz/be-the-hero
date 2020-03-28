import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault();

        if(email.length <= 0 || password.length < 0){
          alert('Email ou senha tem possuir mais de 4 caracteres')
          return
        }

        try {
            await api.post('/v1/auth/login', { email, password }).then((response) => {
                localStorage.setItem('ong', JSON.stringify(response.data.ong))
                alert(response.data.message)
                history.push('/profile')
            }).catch((err) => {
                alert(err.response)
            })
        } catch (error) {
            console.log(error.response)
            alert('Ocoreu um problema na autenticação, tente novamente!')
        }
    }

    return (
        <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
    
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>
    
              <input 
                placeholder="Seu email"
                value={email}
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
              <br />
              <br />
              <input 
                placeholder="Sua senha"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
    
              <button className="button" type="submit">Entrar</button>
    
              <Link className="back-link" to="/register">
                <FiLogIn size={16} color="#e02041"/>
                Não tenho cadastro
              </Link>
            </form>
          </section>
    
          <img src={heroesImg} alt="Heroes"/>
        </div>
    )

}