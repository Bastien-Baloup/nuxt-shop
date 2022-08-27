import { DbConnection } from '../../../lib/db'
const db = DbConnection.getInstance().getConnection()

/**
 *  route : /api/admin/users
 *  method : GET
 *  Return the list of all users in the database
 */
// TODO: add admin auth check
export default defineEventHandler((event) => {
  return { users: db.data?.users || null }
})