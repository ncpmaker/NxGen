<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import TestHistoryTab from './tabs/TestHistoryTab.vue'
import CaseScenarioHistoryTab from './tabs/CaseScenarioHistoryTab.vue'
import { RouterView } from 'vue-router'
import { adminTabStore } from '@/store'

const tabs = [RouterView, CaseScenarioHistoryTab, TestHistoryTab]
</script>

<template>
  <TheNavbar>
    <KeepAlive>
      <component :is="tabs[adminTabStore.index]" />
    </KeepAlive>
  </TheNavbar>
</template>

<style scoped></style>
