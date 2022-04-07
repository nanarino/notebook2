<script setup>
import DefaultTheme from "vitepress/theme"
import Kirby from "./components/Kirby.vue"

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <Kirby />
    </template>
  </Layout>
</template>
