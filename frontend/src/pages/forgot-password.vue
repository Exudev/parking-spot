<script setup lang="ts">
import { ref } from 'vue'
import Page from '../components/Page.vue'
import { useAuth } from '../composables/useuth'
import "../assets/styles/login.css"

const email = ref('')
const { loading, error, message, forgotPassword } = useAuth()

async function handleSubmit() {
  await forgotPassword(email.value)
}
</script>


<template>
  <Page title="Recuperar contraseña" subtitle="Introduce tu correo para recibir instrucciones">
    <form class="forgot-form" @submit.prevent="handleSubmit">
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

      <button type="submit" :disabled="loading">
        {{ loading ? 'Enviando...' : 'Enviar instrucciones' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="message" class="success">{{ message }}</p>
    </form>
  </Page>
</template>
