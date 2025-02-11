<script setup lang="ts">
const { data } = useFetch('/api/data')
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  {{ data }}
</template>
