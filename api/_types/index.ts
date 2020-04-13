type CQHTTPMessage = string // TODO: Support other formats
type CQHTTPSenderGroup = {
  user_id: number
  nickname: string
  card: string
  role: 'owner' | 'admin' | 'member'
}
type CQHTTPRequestSubType = 'add' | 'invite'
type CQHTTPPostPayload = {
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
  message: CQHTTPMessage
  group_id: number // Group only
  sender: CQHTTPSenderGroup // TODO: for private
}

type GroupReplyRuleRegExp = RegExp
type GroupReplyRuleAdminTriggers = string[]
type GroupReplyRuleReplyTmpl = string

type GroupReplyRule = [
  GroupReplyRuleRegExp,
  GroupReplyRuleAdminTriggers,
  GroupReplyRuleReplyTmpl
]
