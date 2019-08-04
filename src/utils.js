import jwt from 'jsonwebtoken'

const APP_SECRET = 'pipi'

function getUserId (context) {
  const Authorization = context.request.get('Authorization')
  if (!Authorization) { throw new Error('Not Authenticated') }
  const token = Authorization.replace('Bearer ', '')
  const { userId } = jwt.verify(token, APP_SECRET)
  return userId
}

export default { APP_SECRET, getUserId }
