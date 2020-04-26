export type CQHTTPMessage = string // TODO: Support other formats
export type CQHTTPSenderGroup = {
  user_id: number
  nickname: string
  card: string
  role: 'owner' | 'admin' | 'member'
}
export type CQHTTPRequestSubType = 'add' | 'invite'
export type CQHTTPPostPayload = {
  post_type: 'message' | 'notice' | 'request'
  request_type: 'group' | 'friend'
  sub_type: CQHTTPRequestSubType // TODO: other sub types.
  message_type:
    | 'private'
    | 'group'
    | 'discuss'
    | 'group_upload'
    | 'group_decrease'
    | 'group_increase'
    | 'group_admin'
  time: number
  self_id: number
  user_id: number // request qq number
  comment: string // reason for invite/add
  flag: string
  message: CQHTTPMessage
  group_id: number // Group only
  sender: CQHTTPSenderGroup // TODO: for private
}
export type CQHTTPGroupMember = {
  group_id: number
  user_id: number
  nickname: number
  card: string
  sex: 'male' | 'female' | 'unknown'
  age: number
  area: string
  join_time: number
  last_sent_time: number
  level: string
  role: 'owner' | 'admin' | 'member'
  unfriendly: boolean
  title: string
  title_expire_time: number
  card_changeable: boolean
}

export type GroupReplyRuleRegExp = RegExp
export type GroupReplyRuleAdminTriggers = string[]
export type GroupReplyRuleReplyTmpl = string

export type GroupReplyRule = [
  GroupReplyRuleRegExp,
  GroupReplyRuleAdminTriggers,
  GroupReplyRuleReplyTmpl
]
