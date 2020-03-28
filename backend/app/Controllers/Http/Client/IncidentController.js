'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Incident = use('App/Models/Incident')

const Database = use('Database')

class IncidentController {

    async indexHandle({ request, response, pagination }) {
        const count = await Database.from('incidents').count() 

        const query = Incident.query()

        const incidents = await query.select(['id', 'ong_id', 'title', 'description', 'value', 'created_at'])
            .with('ong', (ong) => {
                ong.select(['id', 'email', 'name', 'whatsapp', 'city', 'uf', 'created_at'])
            }).paginate(pagination.page, pagination.limit)

        response.header('X-Total-Count', count[0]['count(*)'])

        return response.status(201).send(incidents)
    }

    async storeHandle({ request, response, auth }) {
        const ong = await auth.getUser()
        const { title, description, value }  = request.all()

        const trx = await Database.beginTransaction()
        try {
            const incident = await Incident.create({ title, description, value, ong_id: ong.id }, trx)

            await trx.commit()

            return response.status(201).send(incident)
        } catch (error) {
            await trx.rollback()
            return response.status(400).send({
                error: 'Ocorreu um erro ao processar sua requisição.'
            })
        }
    }

    async deleteHandle({ request, response, auth }) {
        const ong = await auth.getUser()

        const { id } = request.params

        const incident = await Incident.findBy('id', id)

        if(incident == null){
            return response.status(201).send({
                error: 'Não foi possível encontrar este incidente!'
            })
        }

        if(incident.ong_id != ong.id){
            return response.status(201).send({
                error: 'Não é possível deletar o incidente de outra ONG!'
            })
        }

        await incident.delete()

        return response.status(204).send({})
    }

}

module.exports = IncidentController
