import {requestClient} from "@/api/requestClient.js";
import {useAuthStore} from "@/stores/auth.js";


// Форма профиля пользователя
export async function getIndexPage() {
  const auth = useAuthStore()
  const res = await requestClient.get('/index')
  if (!res.status == 200) return false
  return res
}
