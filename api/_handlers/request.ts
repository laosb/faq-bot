import config from '../_config/general'
import handleHduRealnameVerify from './hdu_realname'
import { CQHTTPPostPayload } from '../_types'
import { getGroupPurgeList, purgeGroupFromList } from '../_core/purgeGroup'
export default async (payload: CQHTTPPostPayload) => {
  if (payload.request_type === 'group') {
    if (payload.sub_type === 'invite') {
      if (config.groupInviterWhitelist.includes(payload.user_id))
        return {
          approve: true,
        }
      else
        return {
          approve: false,
          reason: '?',
        }
    } else if (payload.sub_type === 'add') {
      if (config.hduRealnameVerifyGroups.includes(payload.group_id))
        handleHduRealnameVerify(payload)
      if (
        Object.keys(
          config.autoMaintainGroups as { [group: number]: number }
        ).includes(payload.group_id.toString())
      ) {
        const maintainAt = config.autoMaintainGroups[payload.group_id]
        const membersToRemove = await getGroupPurgeList(
          payload.group_id,
          maintainAt
        )
        if (membersToRemove.length > 0) {
          console.log(
            `needs to remove ${membersToRemove.length} members to keep at ${maintainAt}.`
          )
          await purgeGroupFromList(payload.group_id, membersToRemove)
          console.log('done removing.')
        }
      }
      return {}
    } else return {}
  } else return {}
}
