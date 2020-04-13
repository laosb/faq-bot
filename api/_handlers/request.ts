import generalConfig from '../_config/general'
import handleHduRealnameVerify from './hdu_realname'
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
    } else if (
      payload.sub_type === 'add' &&
      generalConfig.hduRealnameVerifyGroups.includes(payload.group_id)
    ) {
      await handleHduRealnameVerify(payload)
      return {}
    } else return {}
  } else return {}
}
