'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class SetHeaderToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    // call next to advance the request
    const token = request.cookie('BeTheHero-Token')
    const refreshToken = request.cookie('BeTheHero-RefreshToken')

    if(token) {
      request.request.headers['authorization'] = `bearer ${token}`
    }

    if(refreshToken){
      request.request.headers['refreshToken'] = refreshToken
    }

    await next()
  }
}

module.exports = SetHeaderToken
