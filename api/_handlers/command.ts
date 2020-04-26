import { CQHTTPPostPayload } from '../_types'
import handlePurge from './purgeGroup'

export default async (payload: CQHTTPPostPayload) => {
  switch (payload.message.slice(1)) {
    case 'ping':
      return 'pong @ ' + new Date().toLocaleString()
    case '乒':
      return '乓 @ ' + new Date().toLocaleString()

    case 'purge':
      return await handlePurge(payload)
    case '清群':
      return await handlePurge(payload)

    default:
      return null
  }
}
