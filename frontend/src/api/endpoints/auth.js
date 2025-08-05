import {requestClient} from "@/api/requestClient.js";
import {tokenService} from "@/api/services/tokenService.js";

// Форма входа
export async function login(email, password) {
  const res = await requestClient.post('/auth', {email, password})
  tokenService.setAccessToken(res.data.tokens[tokenService.ACCESS_TOKEN])
  tokenService.setRefreshToken(res.data.tokens[tokenService.REFRESH_TOKEN])
  return res.data
}
