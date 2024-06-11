import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import { getCommonHeader } from './utils'
import type { CommonResponse, CommonResponseWithoutData } from '@/api/model/common'
import type { ruleBrief } from '@/api/model/ruleSubscribe'

export async function getRuleList(): Promise<CommonResponse<ruleBrief[]>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/sub/rules'), location.href)

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function ToggleRuleEnable(
  ruleId: string,
  enable: boolean
): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `api/sub/rule/${ruleId}`), location.href)
  const formData = new FormData()
  formData.append('enabled', enable.toString())
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'PATCH',
    body: formData
  })
    .then((res) => {
      endpointStore.assertResponseLogin(res)
      return res.json()
    })
    .catch((e: Error) => {
      console.log(e)
    })
}

export async function UpdateRuleItem({
  ruleId,
  ruleName,
  subUrl
}: {
  ruleId: string
  ruleName: string
  subUrl: string
}): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `/api/sub/rule/${ruleId}`), location.href)
  const formData = new FormData()
  formData.append('ruleName', ruleName)
  formData.append('subUrl', subUrl)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'POST',
    body: formData
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function AddRuleItem({
  ruleId,
  ruleName,
  subUrl
}: {
  ruleId: string
  ruleName: string
  subUrl: string
}): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `api/sub/rule`), location.href)
  const formData = new FormData()
  formData.append('ruleId', ruleId)
  formData.append('ruleName', ruleName)
  formData.append('subUrl', subUrl)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'PUT',
    body: formData
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function RefreshRule(ruleId: string): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(
    urlJoin(endpointStore.endpoint, `api/sub/rule/${ruleId}/update`),
    location.href
  )
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'POST'
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function DeleteRule(ruleId: string): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `/api/sub/rule/${ruleId}`), location.href)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'DELETE'
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function UpdateAll() {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, `/api/sub/rules/update`), location.href)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'POST'
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
