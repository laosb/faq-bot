import { CQHTTPPostPayload, CQHTTPGroupMember } from '../_types'
import { cqRequest } from '../_utils'
import config from '../_config/general'

export default async (payload: CQHTTPPostPayload) => {
  const groupIdGroup = payload.message.match(/(?:群|group)(\d+)/i)
  const groupIdStr = groupIdGroup ? groupIdGroup[1] : '0'
  const groupId = parseInt(groupIdStr, 10)
  if (groupId) {
    const res = await cqRequest('get_group_member_list', {
      group_id: groupId,
    })
    const members = (await res.json()).data as [CQHTTPGroupMember]
    const commander = members.find(({ user_id }) => user_id === payload.user_id)
    if (
      !commander ||
      (commander.role !== 'owner' && commander.role !== 'admin')
    ) {
      return 'insufficient privilege or not in group'
    }
    const maintainNumberGroup = payload.message.match(
      /(?:保持?|maintain)(\d+)/i
    )
    const maintainNumber = maintainNumberGroup ? maintainNumberGroup[1] : null
    if (maintainNumber) {
      let outputMessage = ''
      const maintainNumberInNumber = parseInt(maintainNumber, 10)
      const numberToRemove = members.length - maintainNumberInNumber
      if (numberToRemove <= 0) {
        outputMessage += 'no need to remove, exiting.'
        return outputMessage
      }
      outputMessage += `currently ${members.length} members, expect to maintain ${maintainNumberInNumber}, now to remove ${numberToRemove}.\n`
      const groupWhitelist: [number] = config.groupPurgeWhitelist[groupId] || []
      const membersToRemove = members
        .filter(
          ({ user_id, role }) =>
            role !== 'owner' && // not owner
            role !== 'admin' && // not admin
            !groupWhitelist.includes(user_id) // not in whitelist
        )
        .sort((a, b) => a.last_sent_time - b.last_sent_time)
        .slice(0, numberToRemove)
      if (payload.message.match(/(?:confirm|確認|确认)/)) {
        outputMessage += 'confirmed, executing.\n'
        const beforeDate = new Date()
        await Promise.all(
          membersToRemove.map((m) =>
            cqRequest('set_group_kick', {
              group_id: groupId,
              user_id: m.user_id,
              reject_add_request: false,
            })
          )
        )
        const afterDate = new Date()
        const timeUsed = afterDate.getTime() - beforeDate.getTime()
        outputMessage += `executed in ${timeUsed} ms.`
      } else {
        outputMessage += 'members to remove:\n'
        membersToRemove.forEach((m) => {
          outputMessage += `${m.user_id} ${m.nickname} ${
            m.card || '< no card >'
          } ${new Date(m.last_sent_time * 1000).toLocaleString()}\n`
        })
        outputMessage +=
          'to execute, add confirm|確認|确认 in the same command.'
      }
      return outputMessage
    } else {
      return 'no maintain number specified. specify like "保2900" or "maintain2900" in the same command.'
    }
  } else {
    return 'need a group id. specify like "群123456" or "group123456" in the same command.'
  }
}
