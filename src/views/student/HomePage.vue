<script setup>
import TheBottomNavbar from '@/components/TheBottomNavbar.vue'
import CasesTab from './tabs/CasesTab.vue'
import CaseScenarioHistoryTab from './tabs/CaseScenarioHistoryTab.vue'
import PostTestTab from './tabs/PostTestTab.vue'
import { studentTabStore } from '@/store'

const tabs = [PostTestTab, CasesTab, CaseScenarioHistoryTab]
</script>

<template>
  <TheBottomNavbar>
    <Transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[studentTabStore.index]" />
      </KeepAlive>
    </Transition>
  </TheBottomNavbar>
</template>

<style scoped></style>
