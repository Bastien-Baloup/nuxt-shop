<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (pageTitle: string) => {
    return pageTitle ? 'Nuxt Shop - ' + pageTitle : 'Nuxt Shop'
  }
})
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>