<script setup lang="ts">
import Label from "./Label.vue";
import "@/assets/styles/page.css";

interface Props {
  title?: string;
  subtitle?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="page-container">
    <header class="page-header">

      <Label size="xl" bold>
        {{ props.title || "Page without title" }}
      </Label>

      <Label v-if="props.subtitle" size="md" italic>
        {{ props.subtitle }}
      </Label>
    </header>

    <main class="page-content">
      <slot />
    </main>
  </div>
</template>
