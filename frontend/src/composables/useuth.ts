// frontendcore/src/composables/useAuth.ts
import { ref } from 'vue'
import { AuthService } from '../services/authService'

export function useAuth() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const message = ref<string | null>(null)

  const forgotPassword = async (email: string) => {
    loading.value = true
    error.value = null
    message.value = null

    try {
      const res = await AuthService.forgotPassword(email)
      message.value = res.message
      return res
    } catch (err: any) {
      error.value = err.message || 'Error desconocido'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, message, forgotPassword }
}
