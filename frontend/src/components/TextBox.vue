``<template>
  <div class="textbox-container">
    <Label v-if="label" size="md" italic bold :htmlFor="id" forId="id">
      {{ label }}
    </Label>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="modelValue"
      class="textbox-input"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
import Label from "./Label.vue";
import "@/assets/styles/textbox.css";

interface Props {
  id: string;
  label?: string;
  labelSize?: "sm" | "md" | "lg" | "xl";
  labelBold?: boolean;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  labelSize: "md",
  labelBold: false,
  placeholder: "",
  disabled: false,
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
