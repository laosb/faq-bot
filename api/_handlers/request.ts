import generalConfig from '../_config/general'
import { CQHTTPPostPayload } from '../_types'
export default async (payload: CQHTTPPostPayload) => {
  if (payload.request_type === 'group') {
    if (payload.sub_type === 'invite') {
      if (generalConfig.groupInviterWhitelist.includes(payload.user_id))
        return {
          approve: true,
        }
      else
        return {
          approve: false,
          reason: '?',
        }
    } else return {}
  } else return {}
}
