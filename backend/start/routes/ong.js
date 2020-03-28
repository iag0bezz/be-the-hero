/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    Route.get('/', 'OngController.indexHandle')
        .as('ong.index')

    Route.get('/me', 'OngController.meHandle')
        .as('ong.me')
        .middleware(['auth'])

})
.prefix('v1/client/ong')
.namespace('Client')