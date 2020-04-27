import { cqRequest, sleep } from '../_utils'
import config from '../_config/general'
import { CQHTTPGroupMember } from '../_types'

export const getGroupPurgeList = async (groupId: number, maintain: number) => {
  const res = await cqRequest('get_group_member_list', {
    group_id: groupId,
  })
  const members = (await res.json()).data as [CQHTTPGroupMember]
  const groupWhitelist: [number] = config.groupPurgeWhitelist[groupId] || []
  const numberToRemove = members.length - maintain
  if (numberToRemove <= 0) return []
  return members
    .filter(
      ({ user_id, role }) =>
        role !== 'owner' && // not owner
        role !== 'admin' && // not admin
        !groupWhitelist.includes(user_id) // not in whitelist
    )
    .sort((a, b) => a.last_sent_time - b.last_sent_time)
    .slice(0, numberToRemove)
}

export const purgeGroupFromList = async (
  groupId: number,
  list: (CQHTTPGroupMember | number)[]
) => {
  for (let m of list) {
    await sleep(config.waitTimeBetweenGroupKicksMs)
    await cqRequest('set_group_kick', {
      group_id: groupId,
      user_id: typeof m === 'number' ? m : m.user_id,
      reject_add_request: false,
    })
  }
}
