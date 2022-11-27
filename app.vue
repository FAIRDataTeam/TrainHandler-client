<script setup>
import Keycloak from 'keycloak-js'
import { useKeycloak } from '@/stores/keycloak'

useHead({
    title: 'Train Handler'
})

const config = useRuntimeConfig()
const store = useKeycloak()

const state = reactive({
    loggedIn: false
})

if (config.public.keycloakDisabled) {
    state.loggedIn = true
} else {
    const initOptions = {
        url: config.public.keycloakUrl,
        realm: config.public.keycloakRealm,
        clientId: config.public.keycloakClientId,
        onLoad: 'login-required'
    }

    const keycloak = new Keycloak(initOptions)
    keycloak
        .init({ onLoad: initOptions.onLoad })
        .then((auth) => {
            if (!auth) {
                window.location.reload()
            } else {
                store.setup(keycloak)
                state.loggedIn = true
            }
        })
}
</script>
<template>
    <div>
        <div v-if="state.loggedIn">
            <Header />
            <NuxtPage />
        </div>
    </div>
</template>
