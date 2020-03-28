import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ong = JSON.parse(localStorage.getItem('ong'))

    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/v1/client/incident', data).then((response) => {
                history.push('/profile')
            }).catch((err) => {
                alert(err.response.data.error)
            })
        } catch (error) {
            alert('Ocorreu um erro ao criar um novo incidente!')
        }
    }

    return (
        <div className="new-incident-container">
          <div className="content">
            <section>
              <img src={logoImg} alt="Be The Hero" />
              <h1>Cadastrar novo caso</h1>
              <p>
                Descreva o caso detalhadamente para encontrar um herói para resolver
                isso.
              </p>
    
              <Link to="/" className="back-link">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar para home
              </Link>
            </section>
    
            <form onSubmit={handleNewIncident}>
              <input
                placeholder="Título do caso"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <input
                placeholder="Valor em reais"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
    
              <button className="button" type="submit">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      );

}