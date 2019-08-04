import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils'

async function signup (parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return { token, user }
}

async function login (parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email })
  if (!user) { throw new Error('User not Found') }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) { throw new Error('Wrong Password') }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return { token, user }
}

function post (root, args, context) {
  const userId = getUserId(context)

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  })
}

async function vote (root, args, context) {
  const userId = getUserId(context)
  const linkId = args.linkId

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  })

  if (linkExists) { throw new Error('User already voted for this link') }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  })
}

export default {
  signup,
  login,
  post,
  vote
}
