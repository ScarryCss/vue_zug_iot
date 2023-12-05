<template>
    <div class="flex-1 bg-white shadow-lg border rounded-2xl p-3 min-h-[100vh]">
        <!-- Error -->
        <div v-if="error" class="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error: </strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <div class="flex flex-wrap">
            <div :id="entity.id" v-for="entity in filteredEntities" :key="entity.id" class="p-2 rounded-lg shadow-lg border" :class="{ 'position1': entity.id === 'sensor.distance_vorne', 'position2': entity.id === 'sensor.geschwindigkeit', 'position3': entity.id === 'input_text.geschwindigkeit_in_km_h', 'position4': entity.id === 'input_text.lap_timer1', 'position5': entity.id === 'sensor.distance_hinten', 'positionvib1': entity.id ==='sensor.vibration_1_2', 'positionvib2': entity.id ==='sensor.vibration_1_1', 'positionvib3': entity.id ==='sensor.vibration_1_3', 'positiongew': entity.id ==='sensor.gewichtsmessung', 'positionprell': entity.id ==='sensor.distanz_prellbock', 'positionweiche': entity.id ==='input_text.weichestatus'}">
              <div>
                <p class="text-center text-lg">{{ entity.name }}</p>
                <hr class="my-2"/>
                <p><span class="font-bold">State: </span>{{ entity.state }}</p>
              </div>
            </div>
      <div v-for="entity in filteredEntities" :key="entity.name" class="highlighted rounded-full w-fit h-fit" :class="{'highlight1': entity.id === 'sensor.vibration_1_2' || entity.id ==='sensor.vibration_1_1' || entity.id ==='sensor.vibration_1_3', 'highlight2': entity.id==='sensor.distanz_prellbock' || entity.id==='sensor.gewichtsmessung'}" >
        <div v-if="entity.id === 'sensor.vibration_1_2' && entity.state > 1500">
          <div class="w-[150px] h-[150px] flex items-center">
          </div>
        </div>
        <div v-if="entity.id === 'sensor.vibration_1_1' && entity.state > 1500">
          <div class="w-[150px] h-[150px]">
          </div>
        </div>
        <div v-if="entity.id === 'sensor.vibration_1_3' && entity.state > 1500">
          <div class="w-[150px] h-[150px]">
          </div>
        </div>
        <div v-if="entity.id === 'sensor.distanz_prellbock' && entity.state < 20">
          <div class="w-[150px] h-[150px]">
          </div>
        </div>
        <div v-if="entity.id === 'sensor.gewichtsmessung' && entity.state > 20">
          <div class="w-[150px] h-[150px]">
          </div>
        </div>
        </div>
          <div v-for="entity in filteredEntities" :key="entity.name" class="w-full" :class="{'connection': entity.id ==='sensor.vibration_1_2' || entity.id === 'sensor.vibration_1_1' || entity.id === 'sensor.vibration_1_3'}">
            <div v-if="entity.id ==='sensor.vibration_1_2' && entity.state > 1000">
              <div id="light">
                <div id="lineh1">
                </div>
                <div id="lineh2"></div>
              </div>
            </div>
            <div v-if="entity.id ==='sensor.vibration_1_1' && entity.state > 1000">
              <div id="light">
                <div id="lineh1">
                </div>
                <div id="lineh2"></div>
              </div>
            </div>
            <div v-if="entity.id ==='sensor.vibration_1_3' && entity.state > 1000">
              <div id="light">
                <div id="lineh1">
                </div>
                <div id="lineh2"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    
    export default {
        name: 'DashboardView',
        computed: {
            ...mapGetters(['getEntities', 'getError', 'getCurrentCarPosition']),
          filteredEntities() {
            console.log(this.getEntities);
            return this.getEntities.filter(entity => [
              //'sensor.rfid  _uuid',
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
          },
            error() {
                return this.getError
            },
        }
    }
</script>


