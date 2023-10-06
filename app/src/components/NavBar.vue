<template>
  <div class="bg-white p-5 flex flex-row justify-center rounded-lg shadow-lg border mb-10">
    <router-link to="/" class="flex flex-row items-center gap-x-2 text-purple-500 px-3 py-1 mr-2 rounded border border-purple-500">
      <Icon icon="lucide:home" color="#a855f7" />
        Dashboard
    </router-link>
    <router-link to="/highlight" class="flex flex-row items-center gap-x-2 text-purple-500 px-3 py-1 mr-2 rounded border border-purple-500">
      <Icon icon="lucide:eye" color="#a855f7" />
      Highlight
    </router-link>
  </div>
</template>
<script>
    import { Icon } from '@iconify/vue'

    export default {
        name: 'NavBar',
        components: {
            Icon
        }
    }
</script>