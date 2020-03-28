import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            email,
            password,
            name,
            whatsapp,
            city,
            uf
        }

        try {
            await api.post('/v1/auth/register', data).then((response) => {
                localStorage.setItem('ong', JSON.stringify(response.data.ong))
                alert(response.data.message)
                history.push('/profile')
            }).catch((err) => {
                alert(err.response.data.error)
            })
        } catch (error) {
            console.log(error)
            alert('Ocorreu um erro ao processar seu registro, tente novamente!')
        }
    }

    return (
        <div className="register-container">
          <div className="content">
            <section>
              <img src={logoImg} alt="Be The Hero" />
              <h1>Cadastro</h1>
              <p>
                Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
                os casos da sua ONG
              </p>
    
              <Link to="/" className="back-link">
                <FiArrowLeft size={16} color="#e02041" />
                Já tenho um cadastro
              </Link>
            </section>
    
            <form onSubmit={handleRegister}>
              <input
                placeholder="Nome da ONG"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input 
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                placeholder="WhatsApp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
              />
              <div className="input-group">
                <input
                  placeholder="Cidade"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <input
                  placeholder="UF"
                  style={{ width: 80 }}
                  value={uf}
                  onChange={e => setUf(e.target.value)}
                />
              </div>
    
              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      );

}