import { checkUserAuth } from '../../lib/auth'
import { DbConnection } from '../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/users/[mail]
 * method : GET
 * Return the user with the mail = to the route parameter
 */
export default defineEventHandler((event) => {
  // if the connected user is the one with the email passed in parametter, allow the fetch from the database
  if (!checkUserAuth(event)) { return { error: true, message: "Le token d'authentification est invalide." } }
  // copy the user data
  const _user = { ...db.data?.users.find((user) => user.mail === event.context.params.mail) }
  // remove the password hash from the copy before sending it in the response
  if (_user) { _user.hash = "hidden" }
  return { user: _user || null }
})