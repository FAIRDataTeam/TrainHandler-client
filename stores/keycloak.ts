import { defineStore } from 'pinia'

export const useKeycloak = defineStore('keycloak', () => {
    const keycloak = ref(null)

    function setup(kc) {
        keycloak.value = kc
    }

    function isSet() {
        return keycloak.value != null
    }

    return { keycloak, setup, isSet }
})
