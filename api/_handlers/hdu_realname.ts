import { CQHTTPPostPayload } from '../_types'
import crypto from 'crypto'
import fetch from 'node-fetch'
import departmentShort from '../_config/hduDepartmentShort'
import generalConfig from '../_config/general'
import qs from 'querystring'

const HDUHELP_INTERNAL_API_SIGN_SALT =
  process.env.HDUHELP_INTERNAL_API_SIGN_SALT
const CQ_HTTP_ACCESS_TOKEN = process.env.CQ_HTTP_ACCESS_TOKEN

const getTimestamp = () => Math.round(new Date().getTime() / 1000)
const generateInternalSign = (timestamp: number) =>
  crypto
    .createHash('sha1')
    .update(HDUHELP_INTERNAL_API_SIGN_SALT + timestamp.toString())
    .digest('hex')
const makeInternalReq = async (
  to: string,
  path: string,
  query: { [key: string]: string },
  staffId: string,
  method: 'GET' | 'POST'
) => {
  const timestamp = getTimestamp()
  const sign = 'sign ' + generateInternalSign(timestamp)
  const payload = {
    from: 'school',
    to,
    timestamp,
    path,
    query,
    staffId,
    method,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64')
  const url = `https://[REDACTED]/transfer?from=school&to=${to}&body=${body}&timeStamp=${timestamp}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      sign,
      'user-agent': 'laosb QQ bot',
    },
  })
  const json = await res.json()
  console.log('internal call result:', JSON.stringify(json, null, 2))
  if (json && json.error === 0) return json
}

type HduVerifyStatus = {
  verified: boolean
  card?: string
}
const verifyHduStaff: (
  staffId: string,
  name: string
) => Promise<HduVerifyStatus> = async (staffId, name) => {
  const res = await makeInternalReq(
    'base',
    '/person/info',
    { foo: 'bar' },
    staffId,
    'GET'
  )
  if (!res) return { verified: false }
  console.log(
    `staffId='${staffId}', expected name='${res.data.STAFFNAME}', submitted '${name}'`
  )
  if (res.data && res.data.STAFFNAME === name) {
    let prefix = ''
    const dep = departmentShort[res.data.UNITCODE] || ''
    if (dep) prefix += dep + '-'
    if (res.data.STAFFTYPE === '1') prefix += staffId.slice(0, 2) + '-'
    console.log('new member card:', prefix + name)
    return { verified: true, card: prefix + name }
  } else return { verified: false }
}

const approveGroupAdd = async (flag: string) => {
  const query = qs.encode({
    access_token: CQ_HTTP_ACCESS_TOKEN,
    flag,
    sub_type: 'add',
    approve: true,
  })
  console.log(
    'group add req url:',
    generalConfig.cqHttpEndpoint + `/set_group_add_request?${query}`
  )
  const res = await fetch(
    generalConfig.cqHttpEndpoint + `/set_group_add_request?${query}`
  )
  if (!res.ok) throw new Error('failed to approve:' + res.body)
}
const setMemberCard = async (
  user_id: number,
  group_id: number,
  card: string = ''
) => {
  const query = qs.encode({
    access_token: CQ_HTTP_ACCESS_TOKEN,
    user_id,
    group_id,
    card,
  })
  console.log(
    'memeber card set req url:',
    generalConfig.cqHttpEndpoint + `/set_group_add_request?${query}`
  )
  const res = await fetch(
    generalConfig.cqHttpEndpoint + `/set_group_card？${query}`
  )
  if (!res.ok) throw new Error('failed to set member card:' + res.body)
}

export default async (payload: CQHTTPPostPayload) => {
  const { flag, comment, user_id, group_id } = payload
  const parts = comment.trim().split(' ')
  if (parts.length !== 2) return
  const [rawStaffId, name] = parts
  const extracted = rawStaffId.match(/[0-9]+/)
  if (!extracted) return
  const staffId = extracted[0]
  console.log(`new member: staffId='${staffId}', submittedName='${name}'`)
  const res = await verifyHduStaff(staffId, name)
  if (!res.verified) {
    console.log('identity mismatch, not accepting. user_id:', user_id)
    return
  }
  await approveGroupAdd(flag)
  await setMemberCard(user_id, group_id, res.card)
}
