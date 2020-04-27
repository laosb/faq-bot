import { CQHTTPPostPayload, CQHTTPGroupMember } from '../_types'
import { cqRequest } from '../_utils'
import config from '../_config/general'

const TIME_SEPARATION_MS = 50

export default async (payload: CQHTTPPostPayload) => {
  const groupIdGroup = payload.message.match(/(?:群|group)(\d+)/i)
  const groupIdStr = groupIdGroup ? groupIdGroup[1] : '0'
  const groupId = parseInt(groupIdStr, 10) || payload.group_id
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
      /(?:保[持留]?|留下?|maintain)(\d+)/i
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
          membersToRemove.map(async (m, idx) => {
            await new Promise((resolve) =>
              setTimeout(() => resolve(), idx * TIME_SEPARATION_MS)
            )
            await cqRequest('set_group_kick', {
              group_id: groupId,
              user_id: m.user_id,
              reject_add_request: false,
            })
          })
        )
        const afterDate = new Date()
        const timeUsed = afterDate.getTime() - beforeDate.getTime()
        outputMessage += `executed in ${timeUsed} ms.`
      } else if (payload.message.match(/(?:notify|提醒)/)) {
        const beforeLastSentDateStr = new Date(
          membersToRemove[membersToRemove.length - 1].last_sent_time * 1000
        ).toLocaleDateString()
        outputMessage = `本群將清除上次發言早於${beforeLastSentDateStr}（含）的群員，預計此次清除後群員人數將降至${maintainNumberInNumber}人，若不想被移除，請這些群員儘快在群內進行一次發言。懇請其他群員勿跟風，以避免灌水影響本群的功能。\n`
        membersToRemove.forEach((m) => {
          outputMessage += `[CQ:at,qq=${m.user_id}] `
        })
        return outputMessage
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
