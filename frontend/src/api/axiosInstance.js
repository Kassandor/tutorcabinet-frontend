import axios from "axios";
import {tokenService} from "@/api/services/tokenService.js";

let isRefreshing = false
let subscribers = []

// Очередь запросов, которые необходимо будет переотправить, если будет получен валидный токен
function subscribe(cb) {
  subscribers.push(cb)
}

// Событие обновления токена (успешное)
function onRefreshed(newToken) {
  subscribers.forEach(cb => cb(newToken))
  subscribers = []
}

// Модифицированный клиент axios с добавленными в него интерсепторами
const api = axios.create({
  baseURL: '/api',
})

// Кладем токены в каждый запрос
api.interceptors.request.use(
  config => {
    const token = tokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  error => Promise.reject(error)
)

// Если ответ пришел без 401 ошибки - скипаем обновление токенов
// Если пришла 401 ошибка и это не повторный запрос c той же ошибкой - добавляем запрос в подписчики
// и запускаем обновление токенов
api.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config
    if (error.response?.status == 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribe(token => {
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }
      isRefreshing = true

      try {
        const refreshResponse = await axios.post('/api/refresh', {
          refreshToken: tokenService.getRefreshToken(),
        })

        const newAccessToken = refreshResponse.data.access_token;
        const newRefreshToken = refreshResponse.data.refresh_token;
        tokenService.setAccessToken(newAccessToken)
        tokenService.setRefreshToken(newRefreshToken)

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

        onRefreshed(newAccessToken)

        return api(original)
      } catch (err) {
        tokenService.clearTokens()
        window.location.href = '/signin'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default api
