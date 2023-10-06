<template>
    <div class="flex-1 bg-white shadow-lg border rounded-2xl p-3">
        <!-- Error -->
        <div v-if="error" class="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error: </strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>
        <div class="flex flex-col items-center py-5 mb-5">
            <div class="relative w-fit h-fit">
                <img class="w-full h-auto" src="../assets//track.png" alt="Track Image">
                <div :class="`absolute top-[${currentCarPosition.top}] left-[${currentCarPosition.left}] w-6 h-6 border border-green-500 transition-all duration-1000`"></div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div :id="entity.id" v-for="entity in entities" :key="entity.id" class="p-5 rounded-lg shadow-lg border">
                <p class="text-center text-lg">{{ entity.name }}</p>
                <hr class="my-2"/>
                <p><span class="font-bold">State: </span>{{ entity.state }}</p>
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
            entities() {
                return this.getEntities
            },
            error() {
                return this.getError
            },
            currentCarPosition() {
                return this.getCurrentCarPosition
            }
        }
    }
</script>


