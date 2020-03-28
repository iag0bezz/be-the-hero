import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiLoader } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import LogoImg from '../../assets/logo.svg'

export default function Profile() {

    const [incidents, setIncidents] = useState([])

    const history = useHistory()

    const ong = JSON.parse(localStorage.getItem('ong'))

    useEffect(() => {
        async function load() {
            await api.get('/v1/client/ong/me').then((response) => {
                setIncidents(response.data.incidents)
            })
        }
        load()
    }, [ong])

    async function handleDeleteIncident(id) {
        await api.delete(`/v1/client/incident/${id}`).then((response) => {
          setIncidents(incidents.filter(i => i.id !== id))
        }).catch((error) => {
          alert(error.response.data.error)
        })
    }

    async function handleLogout() {
        await api.post('/v1/auth/logout').then((response) => {
            localStorage.clear()

            history.push('/');
        }).catch((error) => {
            localStorage.clear()

            history.push('/');
        })
    }

    return (
        <div className="profile-container">
          <header>
            <img src={LogoImg} alt="Be The Hero" />
            <span>Bem vinda, {ong.name}</span>
    
            <Link className="button" to='/profile/new'>Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button">
              <FiPower size={18} color='#e02041' />
            </button>
          </header>
    
          <h1>Casos cadastrados</h1>
    
          <ul>
            {incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
    
                <strong>DESCRIÇÂO:</strong>
                <p>{incident.description}</p>
    
                <strong>VALOR:</strong>
                <p>
                  {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}
                </p>
    
                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                  <FiTrash2 size={20} color='#a8a8b3' />
                </button>
              </li>
            ))} 
          </ul>
        </div>
      );

}