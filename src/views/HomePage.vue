<script setup>
import TheBottomNavbar from '@/components/TheBottomNavbar.vue'
import DashboardTab from '@/views/tabs/DashboardTab.vue'
import TestHistoryTab from '@/views/tabs/TestHistoryTab.vue'
import { studentTabStore } from '@/store'

const tabs = [DashboardTab, TestHistoryTab]
</script>

<template>
  <TheBottomNavbar>
    <KeepAlive>
      <component :is="tabs[studentTabStore.index]" />
    </KeepAlive>
  </TheBottomNavbar>
</template>

<style scoped></style>
