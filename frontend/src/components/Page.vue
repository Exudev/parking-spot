<script setup lang="ts">
import { ref } from 'vue'


interface Props {
  title?: string
  subtitle?: string
}


const props = defineProps<Props>()


</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1>{{ props.title || 'Página sin título' }}</h1>
      <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
    </header>

    <main class="page-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 960px;
  margin: auto;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

.page-content {
  margin-top: 2rem;
}
</style>
