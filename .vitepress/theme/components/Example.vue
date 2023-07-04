<script lang="ts" setup>
import { useData } from 'vitepress'

defineProps<{
  title?: string
}>()
</script>

<template>
  <b>{{ title }}</b>
  <slot />
</template>
