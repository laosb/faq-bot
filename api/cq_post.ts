import { NowRequest, NowResponse } from '@now/node'
import handleMessage from './_handlers/message'
import handleRequest from './_handlers/request'
import { CQHTTPPostPayload } from './_types'

export default async (request: NowRequest, response: NowResponse) => {
  if (request.method !== 'POST') return response.status(400).send('post please')

  const reqPayload = request.body
  const { post_type } = reqPayload as CQHTTPPostPayload

  if (post_type === 'message')
    return response.status(200).json({
      reply: await handleMessage(reqPayload),
    })
  else if (post_type === 'request')
    return response.status(200).json(await handleRequest(reqPayload))
  else response.status(200).json({})
}
