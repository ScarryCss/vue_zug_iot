<template>
  <div class="flex-1 bg-white shadow-lg border rounded-2xl p-3">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <div v-for="entity in filteredEntities" :key="entity.id" class="flex items-center justify-between p-5 rounded-lg shadow-lg border">
        <div>
          <p class="text-center text-lg">{{ entity.name }}</p>
          <button @click="focus(entity.id)" class="flex items-center gap-x-1 border px-3 py-1 bg-[#a855f7] rounded-lg text-white">
            <Icon icon="lucide:eye" color="#fff"/>
            Find
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from '@iconify/vue'

export default {
  name: "HighlightView",
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['getSocketIo', 'getEntities']),
    filteredEntities() {
      // Filtere die Entitäten nach ihren IDs
      return this.getEntities.filter(entity => [
        //'sensor.rfid_uuid',
        'sensor.geschwindigkeit',
        'input_text.geschwindigkeit_in_km_h',
        'input_text.lap_timer1',
        'sensor.vibration_1_1',
        'sensor.vibration_1_2',
        'sensor.vibration_1_3',
        'sensor.distanz_prellbock',
        'sensor.distance_hinten',
        'sensor.distance_vorne',
        'sensor.gewichtsmessung',
        'input_text.weichestatus'
      ].includes(entity.id))
    }
  },
  methods: {
    focus(id) {
      this.getSocketIo.emit('events', id)
    }
  }
}
</script>