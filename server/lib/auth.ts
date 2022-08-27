import { returnStatement } from "@babel/types"
import { CompatibilityEvent } from "h3"
import jwt from 'jsonwebtoken'
import { DbConnection } from './db'
const db = DbConnection.getInstance().getConnection()

export const checkUserAuth = (event: CompatibilityEvent): boolean => {
  // check if a token is provided in the authorization header or in the request cookies
  const token = event.req.headers.authorization?.replace('Bearer ', '') || parseCookies(event).token || null
  if (!token) { return false }
  // check if the token is valid
  let payload:any
  try {
    payload = jwt.verify(token, useRuntimeConfig().jwtSecret)
  } catch (error) {
    console.log(error)
    return false
  }
  // check if the payload contains an email and an uuid
  if (!payload?.mail || !payload?.uuid) { return false }
  // check if the email from the token's payload is the same as the email in the route 
  if (event.context.params.mail !== payload.mail) { return false }
  // check if the user exist in database 
  const user = db.data?.users.find((user) => user.mail === event.context.params.mail) || null
  if (!user) { return false }
  // check if the payload's user uuid is the same that in the database
  if(payload.uuid !== user.uuid) { return false }

  return true
}