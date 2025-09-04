<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  size: "md",
  variant: "primary",
  disabled: false,
  customClass: "",
});

const classes = computed(() => {
  return [
    "btn",
    `btn-${props.size}`,
    `btn-${props.variant}`,
    props.disabled ? "btn-disabled" : "",
    props.customClass,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <button :type="props.type" :class="classes" :disabled="props.disabled">
    <slot />
  </button>
</template>
