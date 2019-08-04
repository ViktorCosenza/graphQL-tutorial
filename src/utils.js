import jwt from 'jsonwebtoken'

export const APP_SECRET = 'pipi'

export function getUserId (context) {
  const Authorization = context.request.get('Authorization')
  if (!Authorization) { throw new Error('Not Authenticated') }
  const token = Authorization.replace('Bearer ', '')
  const { userId } = jwt.verify(token, APP_SECRET)
  return userId
}
