<script setup lang="ts">
import { ref } from 'vue'
import Page from '../components/Page.vue'
import { AuthService } from '../services/authService'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    const data = await AuthService.login(email.value, password.value);
    console.log('Login exitoso:', data);
    localStorage.setItem('token', data.token);
  } catch (err: any) {
    console.log(err);
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Page title="Iniciar sesión" subtitle="Ingresa tus credenciales para continuar">
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          placeholder="ejemplo@correo.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          placeholder="********"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </Page>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #369f74;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}
</style>
