import { api } from './api'

export const AuthService = {
  async forgotPassword(email: string) {
    return api<{ message: string }>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    })
  },

 async login(email: string, password: string) {
    return api<{ token: string; message?: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        userType: 'organization-user',
      }),
    })
  },
}
