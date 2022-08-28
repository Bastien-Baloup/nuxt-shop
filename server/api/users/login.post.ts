import bcrypt from 'bcrypt'
import { createToken } from '~~/server/lib/auth'
import { DbConnection } from '~~/server/lib/db'
const db = DbConnection.getInstance().getConnection()

interface Body {
  mail: string,
  password: string
}

/**
 *  route : /api/users/login
 *  method : POST
 *  Login a user
 */
export default defineEventHandler(async (event) => {
  // check if user exist in database
  const body = await useBody<Body>(event)
  let user = db.data?.users.find((user) => user.mail === body.mail ) || null
  if (!user) { return { error: true, message: "Adresse e-mail ou mot de passe invalide." } }
  // check if form is completed
  if(!body.mail) { return { error: true, message: "Tous les champs doivent être remplis." }}
  if (!body.password) { return { error: true, message: "Tous les champs doivent être remplis." } }
  // check if the password match the password hash
  const match = await bcrypt.compare(body.password, user.hash);
  if (!match) { return { error: true, message: "Adresse e-mail ou mot de passe invalide." } }
  // create an authentification token
  const token = createToken(user)

  return { success: true, mail: user.mail, token: token }
})