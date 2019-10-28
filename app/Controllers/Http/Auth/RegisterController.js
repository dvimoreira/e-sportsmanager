'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')
const Validator = use('Validator')

// MODELS
const User = use("App/Models/User")

class RegisterController extends BaseController {
    async index ({ request }) {
        try {
            let data = request.all()

            const rules = {
                email: 'required|email|unique:users,email',
                password: 'required'
            }

            const messages = {
                'email.required': 'O campo E-mail é um campo obrigatório.',
                'email.email': 'O E-mail informado não é válido.',
                'email.unique': 'O E-mail informado já existe.',
                'password.required': 'O campo Senha é obrigatório.'
            }

            const validation = await Validator.validate(dataSanitize, rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: 'Não foi possível validar os campos enviados.',
                    errors: validation.messages()
                })
            }

            let createUser = await User.create({
                email: data.email,
                password: data.password
            })

            if (!createUser) {
                throw new Error()
            }

            return response.status(200).send({
                status: true,
                message: 'Usuário cadastrado com sucesso.',
                data: user
            })
        } catch (e) {
            // return this.errorResponse(response, e, 'Não foi possível cadastrar.')
            return response.status(500).send({
                status: false,
                message: e.message
            }) 
        }
    }
}

module.exports = RegisterController
