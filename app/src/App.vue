<template>
  <NavBar />
  <router-view />
</template>
<script>
  import NavBar from './components/NavBar.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    components: {
      NavBar
    },
    computed: {
      ...mapGetters(['getWebSocket', 'getSocketIo'])
    },
    methods: {
      ...mapActions(['initializeWebSocket', 'initializeSocketIo', 'initializeEntities']),

      sendAuth() {
        const websocket = this.getWebSocket;

        if (websocket && websocket.readyState === WebSocket.OPEN) {
          const authMessage = {
            'type': 'auth',
            'access_token': process.env.VUE_APP_HOME_ASSISTANT_TOKEN,
          };
          const eventSubMessage = {
            'id': 1,
            'type': 'subscribe_events',
            'event_type': 'state_changed',   
          };


          websocket.send(JSON.stringify(authMessage));
          websocket.send(JSON.stringify(eventSubMessage));
          
        }
      },
    },
    created() {
      this.initializeWebSocket();
      this.initializeSocketIo();
      this.initializeEntities();

      // Send a JSON message to the server when WebSocket is open
      const websocket = this.getWebSocket;
      if (websocket) {
        websocket.onopen = () => {
          this.sendAuth(); // Send the message when the connection is open
        };
      }
    },
  }
</script>