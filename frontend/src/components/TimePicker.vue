<template>
  <div class="timepicker-container">
    <Label v-if="label" :forId="id" :htmlFor="id" :size="labelSize" :bold="labelBold">
      {{ label }}
    </Label>

    <input
      type="time"
      :id="id"
      class="timepicker-input"
      v-model="modelValue"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
import Label from "./Label.vue";
import "@/assets/styles/timepicker.css";

interface Props {
  id: string;
  label?: string;
  labelSize?: "sm" | "md" | "lg" | "xl";
  labelBold?: boolean;
  disabled?: boolean;
  modelValue?: string; //"HH:mm"
}

const props = withDefaults(defineProps<Props>(), {
  labelSize: "md",
  labelBold: false,
  disabled: false,
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
