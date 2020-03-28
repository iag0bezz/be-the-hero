'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncidentsSchema extends Schema {
  up () {
    this.create('incidents', (table) => {
      table.increments()

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.decimal('value').notNullable().defaultTo(0.0)

      table.integer('ong_id').unsigned()

      table.foreign('ong_id')
        .references('id')
        .on('ongs')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('incidents')
  }
}

module.exports = IncidentsSchema
