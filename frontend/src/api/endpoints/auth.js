import {requestClient} from "@/api/requestClient.js";
import {useAuthStore} from "@/stores/auth.js";


// Форма входа
export async function login(email, password) {
  const auth = useAuthStore()
  const res = await requestClient.post('/auth', {email, password})
  auth.setTokens(res.data.tokens)
  if (!res.status == 200) return false
  return res
}
