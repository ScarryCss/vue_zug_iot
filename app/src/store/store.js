import { createStore } from 'vuex';
import { io } from 'socket.io-client';
import { SensorPositions } from '@/constants/constants';

const store = createStore({
  state: {
    websocket: null,
    socketIo: null,
    entities: [],
    error: "",
    currentCarPosition: SensorPositions.rfid4,
  },
  mutations: {
    setWebSocket(state, websocket) {
      state.websocket = websocket;
    },
    setSocketIo(state, websocket) {
      state.socketIo = websocket;
    },
    setEntities(state, entities) {
      state.entities = entities
    },
    setCurrentCarPosition(state, position) {
      const newPos = SensorPositions[position]
      state.currentCarPosition = newPos
    },
    setError(state, error) {
      state.error = error
    },
    updateEntity(state, event) {
      state.entities = state.entities.map(entity => {
          if (entity.id === event.data.entity_id) {
            return {
              ...entity,
              state: event.data.new_state.state,
              attributes: {
                ...entity.attributes,
                ...event.data.new_state.attributes
              },
              last_changed: event.data.new_state.last_changed,
              last_updated: event.data.new_state.last_updated
            }
          }
          return entity
        }
      )
    }
  },
  actions: {
    // Web Socket for Home Assistant
    initializeWebSocket({ commit }) {
      // Change the URL in ENV file.
      const websocket = new WebSocket(`${process.env.VUE_APP_HOME_ASSISTANT_SOCKET}/api/websocket`);

      websocket.onopen = () => {
        console.log('Home Assistant socket connection opened');
      };

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'event') {
          commit('updateEntity', data.event)
        }
      }

      websocket.onerror = (error) => {
        console.log("Cannot connect to Home Assistant. Please check your connection.")
        console.log(error)
      }

      commit('setWebSocket', websocket);
    },
    // Socket IO for Custom Nest Server
    initializeSocketIo({ commit }) {
      const socketIo = io(process.env.VUE_APP_NEST_SOCKET, { allowEIO3: true, withCredentials: true });

      // Event for focus
      socketIo.on('focus', (data) => {
        const element = document.getElementById(data);
        element?.scrollIntoView({
            behavior: 'smooth'
        });

        element?.classList.add('highlighted');

        setTimeout(() => {
            element?.classList.remove('highlighted');
        }, 3000);
      });

      socketIo.on('connect_error', (error) => {
        console.log(error)
        commit('setError', "Cannot connect to Nest Socket. Please check your connection.")
      })

      socketIo.on('connect', () => {
        commit('setError', "")
        commit('setSocketIo', socketIo);
      });

      socketIo.on('car-sensors', (data) => {
        commit('setCurrentCarPosition', data.tag)
        // console.log(data)
      })
    },
    // Fetching Entities for Home Assistant
    async initializeEntities({ commit }) {
      try {
        const response = await fetch(`${process.env.VUE_APP_HOME_ASSISTANT_URL}/api/states`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.VUE_APP_HOME_ASSISTANT_TOKEN}`,
                    'Content-Type': 'application/json', 
                }
            }
        )
        const data = await response.json()
        const entities = data
            .map(entry => ({
                id: entry.entity_id,
                name: entry.attributes.friendly_name,
                state: entry.state,
                icon: entry.attributes.icon
            }))
            // This line filters out some uneccessary data
            // Remove this line if you want to see all entities
            .filter(entry => !entry.id.match(/person|zone|google_en_com/gi))

        commit(
            "setEntities",
            entities
        )
        commit('setError', "")
      }
      catch(error) {
        commit('setError', "Cannot connect to Home Assistant. Please check your connection.")
      }
    },
  },
  getters: {
    getWebSocket(state) {
      return state.websocket;
    },
    getSocketIo(state) {
      return state.socketIo;
    },
    getEntities(state) {
      return state.entities
    },
    getError(state) {
      return state.error
    },
    getCurrentCarPosition(state) {
      return state.currentCarPosition
    }
  },
});

export default store;
