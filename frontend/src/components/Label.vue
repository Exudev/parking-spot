<template>
  <label
    :class="[
      sizeClasses,
      { 'bold': bold, 'italic': italic, 'uppercase': uppercase },
      customClass
    ]"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "../assets/styles/components/label.css";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  bold?: boolean  | undefined;
  italic?: boolean  | undefined;
  uppercase?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  bold: false,
  italic: false,
  uppercase: false,
  customClass: "",
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "label-sm";
    case "md":
      return "label-md";
    case "lg":
      return "label-lg";
    case "xl":
      return "label-xl";
    default:
      return "label-md";
  }
});
</script>
