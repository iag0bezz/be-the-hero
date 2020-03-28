'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Ong = use('App/Models/Ong')

class OngController {

    async indexHandle({ request, response, pagination }) {
        const name = request.input('name')
        const query = Ong.query()
    
        if(name) {
            query.where('name', 'LIKE', `%${name}%`)
        }

        const ongs = await query.paginate(pagination.page, pagination.limit)

        return response.status(201).send(ongs)
    }

    async meHandle({ request, response, auth }) {
        const authOng = await auth.getUser()

        const query = Ong.query()

        query.where('id', authOng.id)

        const ong = await query.select(['id', 'email', 'name', 'whatsapp', 'city', 'uf', 'created_at'])
            .with('incidents', (incident) => {
                incident.select(['id', 'ong_id', 'title', 'description', 'value', 'created_at'])
            })
        .first()

        return response.status(201).send(ong)
    }

}

module.exports = OngController
