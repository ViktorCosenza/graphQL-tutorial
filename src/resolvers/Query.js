
function info () {
  return 'Information.. Lots of information'
}

function feed (root, args, context, info) {
  return context.prisma.links()
}

export default {
  info,
  feed
}
