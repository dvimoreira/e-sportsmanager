'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')
const Validator = use('Validator')

class LoginController extends BaseController {
    async index ({ response, auth, request }) {
        try {
            const rules = {
                email: 'required|email',
                password: 'required'
            }

            const messages = {
                'email.required': 'O e-mail é um campo obrigatório.',
                'email.email': 'O e-mail informado não é válido.',
                'password.required': 'A senha é um campo obrigatório.'
            }

            const validation = await Validator.validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: "Não foi possível validar os campos enviados.",
                    errors: validation.messages()
                })
            }

            const { email, password } = request.all()

            return await auth.withRefreshToken().attempt(email, password)

        } catch (e) {
            return this.errorResponse(response, e, 'Usuário ou senha incorretos.')
        }
    }
}

module.exports = LoginController
