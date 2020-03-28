'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if(error.name == 'ValidationException'){
      return response.status(error.status).send({
        errors: error.messages
      })
    }
    if(error.name == 'UserNotFoundException'){
      return response.status(error.status).send({
        error: 'Não foi possível encontrar este usuário.'
      })
    }
    if(error.name == 'InvalidJwtToken'){
      return response.status(error.status).send({
        error: 'Não foi possível encontrar seu token de acesso.'
      })
    }
    if(error.name == 'HttpException'){
      return response.status(error.status).send({
        error: 'Você não pode acessar esta página.'
      })
    }
    response.status(error.status).send(error.message)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
