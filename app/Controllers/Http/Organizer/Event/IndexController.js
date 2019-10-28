'use strict'

// IMPORTS
const BaseController = use('App/Controllers/Http/BaseController')
const Validator = use('Validator')

class IndexController extends BaseController {
    index ({ request, response, auth }) {
        //TO-DO
        // let user = await auth.getUser()
    }

    detail ({ request, response, auth }) {
        //TO-DO
    }

    create ({ request, response, auth }) {
        //TO-DO
    }

    edit ({ request, response, auth }) {
        //TO-DO
    }

    delete ({ request, response, auth }) {
        //TO-DO
    }
}

module.exports = IndexController
