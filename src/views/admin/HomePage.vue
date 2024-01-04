<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import TestHistoryTab from './tabs/TestHistoryTab.vue'
import CaseScenarioHistoryTab from './tabs/CaseScenarioHistoryTab.vue'
import RouterViewWrapper from './tabs/RouterViewWrapper.vue'
import { adminTabStore } from '@/store'

const tabs = [RouterViewWrapper, CaseScenarioHistoryTab, TestHistoryTab]
</script>

<template>
  <TheNavbar>
    <transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[adminTabStore.index]" />
      </KeepAlive>
    </transition>
  </TheNavbar>
</template>

<style scoped></style>
