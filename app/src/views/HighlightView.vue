<template>
    <div class="flex-1 bg-white shadow-lg border rounded-2xl p-3">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div v-for="entity in entities" :key="entity.id" class="flex items-center justify-between p-5 rounded-lg shadow-lg border">
                <p class="text-center text-lg">{{ entity.name }}</p>
                <button @click="focus(entity.id)" class="flex items-center gap-x-1 border px-3 py-1 bg-[#a855f7] rounded-lg text-white">
                    <Icon icon="lucide:eye" color="#fff"/>
                    Find
                </button>
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
            entities() {
                return this.getEntities
            }
        },
        methods: {
            focus(id) {
                this.getSocketIo.emit('events', id)
            },
            
        }
    }
</script>


