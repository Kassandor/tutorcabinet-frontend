import {defineStore} from "pinia";
import {jwtDecode} from "jwt-decode";
import {tokenService} from "@/api/services/tokenService.js";

// Хранилище аутентификации
export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: tokenService.getAccessToken(),
    refreshToken: tokenService.getRefreshToken()
  }),
  getters: {
    isAuthenticated: (state) => {
      const token = state.accessToken
      if (!token) return false

      try {
        const {exp} = jwtDecode(token)
        return Date.now() < exp * 1000
      } catch {
        return false
      }
    }
  },
  actions: {
    setTokens(tokens) {
      this.setAccessToken(tokens.accessToken)
      this.setRefreshToken(tokens.refreshToken)
    },
    setAccessToken(token) {
      this.accessToken = token
      tokenService.setAccessToken(token)
    },

    setRefreshToken(token) {
      this.refreshToken = token
      tokenService.setRefreshToken(token)
    },
    clearTokens() {
      this.accessToken = null
      tokenService.clearTokens()
    }
  }
})
