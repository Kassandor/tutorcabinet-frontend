export const tokenService = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',

  getAccessToken: () => localStorage.getItem(tokenService.ACCESS_TOKEN),
  getRefreshToken: () => localStorage.getItem(tokenService.REFRESH_TOKEN),
  setAccessToken: token => localStorage.setItem(tokenService.ACCESS_TOKEN, token),
  setRefreshToken: token => localStorage.setItem(tokenService.REFRESH_TOKEN, token),
  clearTokens: () => {
    localStorage.removeItem(tokenService.ACCESS_TOKEN)
    localStorage.removeItem(tokenService.REFRESH_TOKEN)
  }
}
