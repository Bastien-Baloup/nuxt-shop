import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateEmail } from '../../lib/formValidation'
import { DbConnection } from '../../lib/db'
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
  if(!match) {return { error: true, message: "Adresse e-mail ou mot de passe invalide." }}
  // create a authentification token
  const jwtPayload = { uuid: user.uuid, mail: user.mail }
  const secret = useRuntimeConfig().jwtSecret
  const jwtOptions:jwt.SignOptions = {
    algorithm: 'HS512',
    expiresIn: '61d'
  }
  const token = jwt.sign(jwtPayload, secret, jwtOptions)

  return { mail: user.mail, token: token }
})