<script setup>
const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Implementation', 'Evaluation']
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <div class="grow overflow-y-auto px-4 pb-4">
      <div class="sticky top-0 z-10 bg-blue-50 pb-4 pt-6">
        <h1>Evaluation</h1>
      </div>

      <div class="flex flex-col items-center gap-2">
        <h3 class="pb-2 font-medium">Total Score</h3>
        <div class="flex w-full justify-center">
          <VRadialProgress size="100px" color="success" thickness="12px" :progress="95" :max-value="100" class="text-xl font-semibold" />
        </div>
        <VButton class="w-fit">
          <span class="material-icons"> print </span>
          Nursing Care Plan
        </VButton>
      </div>

      <hr class="mx-2 my-2 border-neutral-300" />

      <div class="flex flex-col gap-2">
        <template v-for="step in stepLabel" :key="step">
          <div class="flex flex-row items-center gap-2">
            <VRadialProgress size="72px" color="warning" thickness="8px" :progress="7" :max-value="20" class="text-base font-medium" />
            <div class="flex flex-col">
              <span class="font-medium">{{ step }}</span>
              <span class="text-sm">Unmet</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="shrink-0 p-4">
      <VButton @click="$router.push({ name: 'home' })" class="w-full justify-center"> Back to Home </VButton>
    </div>
  </div>
</template>

<style scoped></style>
