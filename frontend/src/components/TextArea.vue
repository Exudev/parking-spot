<template>
  <div class="textarea-container">
    <Label v-if="label" size="md" italic bold :htmlFor="id" forId="id">
      {{ label }}
    </Label>

    <textarea
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      v-model="modelValue"
      class="textarea-input"
      :disabled="disabled"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import Label from "./Label.vue";
import "@/assets/styles/textarea.css";

interface Props {
  id: string;
  label?: string;
  labelSize?: "sm" | "md" | "lg" | "xl";
  labelBold?: boolean;
  placeholder?: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelSize: "md",
  labelBold: false,
  placeholder: "",
  rows: 4,
  cols: 40,
  disabled: false,
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
