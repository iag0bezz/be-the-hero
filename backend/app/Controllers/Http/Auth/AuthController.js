'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ong = use('App/Models/Ong')

const Database = use('Database')

class AuthController {

    async loginHandle({ request, response, auth }) {
        const { email, password } = request.all()

        const data = await auth.attempt(email, password)

        response.cookie('BeTheHero-Token', data.token, { httpOnly: true, path: '/' })
        response.cookie('BeTheHero-RefreshToken', data.refreshToken, { httpOnly: true, path: '/' })

        const ong = await Ong.findBy('email', email)

        return response.status(201).send({
            message: 'Autenticado com sucesso!',
            ong
        })
    }

    async registerHandle({ request, response, auth }) {
        const { email, password, name, whatsapp, city, uf } = request.all()

        const trx = await Database.beginTransaction()
        try {
            const ong = await Ong.create({ name, password, email, whatsapp, city, uf }, trx)

            await trx.commit()

            const data = await auth.attempt(email, password)
    
            response.cookie('BeTheHero-Token', data.token, { httpOnly: true, path: '/' })
            response.cookie('BeTheHero-RefreshToken', data.refreshToken, { httpOnly: true, path: '/' })

            return response.status(201).send({
                message: 'Registrado com sucesso!',
                ong
            })
        } catch (error) {
            await trx.rollback()
            return response.status(400).send({
                error: 'Ocorreu um erro ao processar sua requisição.'
            })
        }
    }

    async logoutHandle({ request, response, auth }) {
        let refreshToken = request.input('refreshToken')

        if(!refreshToken){
            refreshToken = request.header('refreshToken')
        }

        await auth.authenticator('jwt').revokeTokens([refreshToken], true)

        response.clearCookie('BeTheHero-Token', { httpOnly: true, path: '/' })
        response.clearCookie('BeTheHero-RefreshToken', { httpOnly: true, path: '/' })

        return response.status(204).send({})
    }

    async checkHandle({ request, response, auth }) {
        return response.status(204).send({})
    }

}

module.exports = AuthController
