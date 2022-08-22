import { Db } from '../../lib/db'
const db = new Db().getInstance()

export default defineEventHandler((event) => {
  return { user: db.data?.users.find((user) => user.mail === event.context.params.mail ) || null }
})