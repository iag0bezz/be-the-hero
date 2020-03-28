'use strict'

class Register {

  get rules () {
    return {
      email: 'email|required|unique:ongs,email',
      name: 'required|min:4',
      whatsapp: 'required',
      city: 'required',
      uf: 'required|max:2',
      password: 'required|min:4|max:16'
    }
  }

  get messages() {
    return {
      'email.required': 'O endereço de email é obrigatório!',
      'email.email': 'O endereço de email está inválido!',

      'name.required': 'O nome é obrigatório!',
      'name.min': 'O nome é necessário ter no mínimo 4 caracteres.',
      
      'whatsapp.required': 'O número de WhatsApp é obrigatório!',

      'city.required': 'O nome da cidade é obrigatório!',

      'uf.required': 'O nome do estado é obrigatório!',
      'uf.max': 'O estado deve conter no máximo 2 caracteres.',

      'password.required': 'A senha é obrigatória!',
      'password.min': 'A senha deve conter mais que 4 caracteres.',
      'password.max': 'A senha deve conter menos que 16 caracteres.'
    }
  }

}

module.exports = Register
