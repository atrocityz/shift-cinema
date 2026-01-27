import type { AxiosRequestConfig } from 'axios'

import { api } from '@/utils/api/instance'

export const getFilms = (config?: AxiosRequestConfig) =>
  api.get<any>(`cinema/films`, config)
