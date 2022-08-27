import { DbConnection } from '../../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 * route : /api/users/[mail]
 * method : GET
 * Return the user with the mail = to the route parameter
 */
export default defineEventHandler((event) => {
  // TODO: add admin auth check
  return { user: db.data?.users.find((user) => user.mail === event.context.params.mail ) || null }
})