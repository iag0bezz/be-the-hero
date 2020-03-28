'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Ong extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the ong password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (ongInstace) => {
      if (ongInstace.dirty.password) {
        ongInstace.password = await Hash.make(ongInstace.password)
      }
    })
  }

  static get hidden() {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  
  incidents() {
     return this.hasMany('App/Models/Incident')
  }

}

module.exports = Ong
