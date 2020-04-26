import { CQHTTPPostPayload } from '../_types'
import handlePurge from './purgeGroup'

export default async (payload: CQHTTPPostPayload) => {
  if (payload.message.match(/ping|乒/i))
    return 'pong @ ' + new Date().toLocaleString()

  if (payload.message.match(/purge|清群/i)) return await handlePurge(payload)

  return null
}
