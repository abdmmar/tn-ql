import { getGraphQLRateLimiter } from 'graphql-rate-limit'
import { GraphQLResolveInfo } from 'graphql/type'

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id })

export async function rateLimit(
  {
    parent,
    args,
    context,
    info,
  }: {
    parent: any
    args: Record<string, any>
    context: any
    info: GraphQLResolveInfo
  },
  options: {
    arrayLengthField?: string
    identityArgs?: readonly string[]
    max: number
    window: string
    message?: string
  },
): Promise<void> {
  const errorMessage = await rateLimiter({ parent, args, context, info }, options)

  if (errorMessage) throw new Error(errorMessage)
}
