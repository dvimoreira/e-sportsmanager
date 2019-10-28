'use strict'

const Env = use('Env')
class BaseController {
    async errorResponse (response, error, message = 'Ocorreu um problema interno.') {

        let NODE_ENV = Env.get('NODE_ENV')

        let json = {
            status: false,
            message: message
        }

        if (NODE_ENV === 'development') {
            Object.assign(json, { exception: error.message })
        }

        if (NODE_ENV === 'production') {
            // await new Slack(message, error)
        }

        return response.status(500).send(json)

    }
}

module.exports = BaseController
