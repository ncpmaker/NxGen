<script setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-up" mode="out-in">
      <div class="relative flex w-full flex-col" :key="route.name">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style scoped></style>
