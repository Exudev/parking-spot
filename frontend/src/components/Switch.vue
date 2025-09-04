<template>
  <div class="switch-container">
    <Label v-if="label" :forId="id"  :htmlFor="id" :size="labelSize" :bold="labelBold">
      {{ label }}
    </Label>

    <label class="switch">
      <input
        type="checkbox"
        :id="id"
        :disabled="disabled"
        v-model="modelValue"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import Label from "./Label.vue";
import "@/assets/styles/switch.css";

interface Props {
  id: string;
  label?: string;
  labelSize?: "sm" | "md" | "lg" | "xl";
  labelBold?: boolean;
  disabled?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  labelSize: "md",
  labelBold: false,
  disabled: false,
  modelValue: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>
