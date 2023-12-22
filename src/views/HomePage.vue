<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import DashboardTab from '@/views/tabs/DashboardTab.vue'
import TestHistoryTab from '@/views/tabs/TestHistoryTab.vue'
import { pageStore } from '@/store'

const tabs = [DashboardTab, TestHistoryTab]
</script>

<template>
  <TheNavbar>
    <KeepAlive>
      <component :is="tabs[pageStore.index]" />
    </KeepAlive>
  </TheNavbar>
</template>

<style scoped></style>
