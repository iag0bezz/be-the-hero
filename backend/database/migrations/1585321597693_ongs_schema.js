'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OngsSchema extends Schema {
  up () {
    this.create('ongs', (table) => {
      table.increments()

      table.string('name').notNullable()
      table.string('password').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('ongs')
  }
}

module.exports = OngsSchema
