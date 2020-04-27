import fetch from 'node-fetch'
import qs from 'querystring'
import generalConfig from '../_config/general'

const CQ_HTTP_ACCESS_TOKEN = process.env.CQ_HTTP_ACCESS_TOKEN

export const cqRequest = async (
  command: string,
  params: { [key: string]: string | number | boolean }
) => {
  const query = qs.encode({
    access_token: CQ_HTTP_ACCESS_TOKEN,
    ...params,
  })
  const res = await fetch(generalConfig.cqHttpEndpoint + `/${command}?${query}`)
  return res
}

export const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time))
