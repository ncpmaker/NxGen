<script setup>
import TheToast from '@/components/TheToast.vue'
</script>

<template>
  <router-view v-if="!/\/admin\/home*/.test($route.path)" v-slot="{ Component, route }">
    <transition name="fade-scale" mode="out-in">
      <div class="w-full" :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>

  <router-view v-else />

  <TheToast />
</template>
