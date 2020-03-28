'use strict'

class Store {

  get rules () {
    return {
      title: 'required|min:4',
      description: 'required',
      value: 'required'
    }
  }

  get messages() {
    return {
      'title.required': 'O título é obrigatório!',
      'title.min': 'É necessário no mínimo 4 caracteres no título.',

      'description.required': 'A descrição é obrigatória!',
    
      'value.required': 'O valor é obrigatório!'
    }
  }

}

module.exports = Store
