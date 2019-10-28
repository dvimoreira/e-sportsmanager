'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// AUTENTICATION
Route.group(() => {
  Route.post('/register','Auth/RegisterController.index')
  Route.post('/login','Auth/LoginController.index')
  Route.post('/refresh-token','Auth/RefreshTokenController.index').middleware('auth')
}).prefix('/auth')

// ORGANIZER CREATE AN EVENT
Route.group(() => {
  Route.get('/list/:id?','Organizer/Event/IndexController.index')
  Route.post('/create','Organizer/Event/IndexController.create')
  Route.post('/edit/:id','Organizer/Event/IndexController.edit')
  Route.post('/delete/:id','Organizer/Event/IndexController.delete')
}).prefix('/organizer/event').middleware('auth')

// ORGANIZER CREATE AN TICKET
Route.group(() => {
  Route.get('/list','Organizer/Event/TicketController.index')
  Route.post('/create','Organizer/Event/TicketController.create')
  Route.post('/edit/:ticketId','Organizer/Event/TicketController.edit')
  Route.post('/delete/:ticketId','Organizer/Event/TicketController.delete')
}).prefix('/organizer/ticket/:eventId').middleware('auth')

// ORGANIZER LIST OR EXPORT ORDERS
Route.group(() => {
  Route.get('/list','Organizer/Event/OrderController.index')
  Route.post('/update','Organizer/Event/OrderController.update')
  Route.post('/export','Organizer/Event/OrderController.export')
}).prefix('/organizer/orders/:eventId').middleware('auth')

// ORGANIZER LIST OR EXPORT ATTENDEES
Route.group(() => {
  Route.get('/list','Organizer/Event/AttendeeController.index')
  Route.post('/export','Organizer/Event/AttendeeController.export')
}).prefix('/organizer/attendees/:eventId').middleware('auth')

// EVENT TOOLS
