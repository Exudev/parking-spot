<script setup lang="ts">
import { ref } from 'vue'
import Page from '../components/Page.vue'
import { AuthService } from '../services/authService'



import Label from "../components/Label.vue";
import TextBox from "../components/TextBox.vue";
import Button from "../components/Button.vue";

import "../assets/styles/pages/login.css";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

const handleLogin = async () => {
  error.value = null;
  loading.value = true;

  try {
    const data = await AuthService.login(email.value, password.value);
    console.log("Login exitoso:", data);
    localStorage.setItem("token", data.token);
  } catch (err: any) {
    console.log(err);
    error.value = err.message || "Error desconocido";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Page title="Iniciar sesión" subtitle="Ingresa tus credenciales para continuar">
    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <Label forId="email" bold>Correo electrónico</Label>
        <TextBox
          id="email"
          type="email"
          v-model="email"
          placeholder="ejemplo@correo.com"
          required
        />
      </div>

      <div class="form-group">
        <Label forId="password" bold>Contraseña</Label>
        <TextBox
          id="password"
          type="password"
          v-model="password"
          placeholder="********"
          required
        />
      </div>

      <Button type="submit" :disabled="loading">
        {{ loading ? "Cargando..." : "Iniciar sesión" }}
      </Button>

      <Label v-if="error" size="sm" bold customClass="error">
        {{ error }}
      </Label>
    </form>
  </Page>
</template>
