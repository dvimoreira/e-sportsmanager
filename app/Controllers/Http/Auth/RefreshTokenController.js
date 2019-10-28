'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')
const Validator = use('Validator')

class RefreshTokenController extends BaseController {
    async index ({ auth, request, response }) {
        try {
            const rules = {
                refresh_token: 'required'
            }

            const messages = {
                'refresh_token.required': 'O Refresh Token é um campo obrigatório.'
            }

            const validation = await Validator.validate(request.all(), rules, messages)

            if (validation.fails()) {
                return response.status(422).send({
                    status: false,
                    message: 'Não foi possível validar os campos enviados.',
                    errors: validation.messages()
                })
            }
            
            const { refresh_token } = request.all()
            let result = await auth.generateForRefreshToken(refresh_token, true)

            return response.status(200).send({
                status: true,
                message: 'O novo token foi gerado com sucesso.',
                data: result
            })

        } catch (e) {
            return response.status(500).send({
                status: false,
                message: 'Não foi possível gerar o novo token.',
            })            
        }

    }

}

module.exports = RefreshTokenController
