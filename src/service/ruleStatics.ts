import type { GetRuleMetricsResponse } from '@/api/model/ruleStatics'
import { useEndpointStore } from '@/stores/endpoint'
import path from 'path'
import { getCommonHeader } from './utils'

export async function getRuleStatic(): Promise<GetRuleMetricsResponse> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(path.join(endpointStore.endpoint, 'api/statistic/rules'), location.href)

  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}
