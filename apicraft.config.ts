import { apicraft } from '@siberiacancode/apicraft'

export default apicraft([
  {
    input: 'api.yaml',
    output: 'generated/api',
    instance: 'axios',
    nameBy: 'path',
    groupBy: 'tag',
    plugins: ['tanstack'],
  },
])
