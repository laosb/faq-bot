import rules from '../_config/reply'
import { CQHTTPPostPayload, GroupReplyRule } from '../_types'
import handleCommand from './command'

export default async (payload: CQHTTPPostPayload) => {
  if (payload.message.startsWith('/') || payload.message.startsWith('做')) {
    return await handleCommand(payload)
  }
  if (payload.message_type === 'group') {
    const groupRule = rules.group[payload.group_id] as GroupReplyRule[]
    if (!groupRule) return null
    if (payload.sender.role === 'owner' || payload.sender.role === 'admin') {
      const matchedRule = groupRule.find((e) => e[1].includes(payload.message))
      return matchedRule ? matchedRule[2] : null
    } else {
      const matchedRule = groupRule.find((e) => payload.message.match(e[0]))
      return matchedRule ? matchedRule[2] : null
    }
  } else return null
}
