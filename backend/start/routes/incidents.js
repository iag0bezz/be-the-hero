/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    Route.get('/', 'IncidentController.indexHandle')
        .as('incident.index')

    Route.post('/', 'IncidentController.storeHandle')
        .as('incident.store')
        .middleware(['auth'])
        .validator('Client/Incident/Store')

    Route.delete('/:id', 'IncidentController.deleteHandle')
        .as('incident.delete')
        .middleware(['auth'])

})
.prefix('v1/client/incident')
.namespace('Client')