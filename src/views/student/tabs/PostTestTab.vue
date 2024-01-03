<script setup></script>

<template>
  <div class="flex grow flex-col overflow-y-auto pb-4">
    <div class="sticky top-0 z-10 bg-blue-50 px-4 pb-4 pt-6">
      <h1>Welcome to App Name</h1>
    </div>

    <div class="flex grow items-center justify-center px-4">
      <button
        @click="$router.push({ name: 'post-test' })"
        disabled
        class="group col-span-8 h-64 w-full overflow-hidden rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] shadow-lg"
      >
        <div
          class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent pb-6 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
        >
          <h1 class="font-medium leading-none text-blue-50 drop-shadow-md">Take the Post Test</h1>
          <span class="text-sm text-blue-50 drop-shadow-md">Click Here</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
