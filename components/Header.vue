<script setup>
import { useKeycloak } from '@/stores/keycloak'

const store = useKeycloak()
</script>
<template>
    <nav class="fixed top-0 left-0 right-0 bg-cyan-600 flex items-center justify-between py-2 px-6">
        <div class="flex items-center">
            <div class="text-xl text-white">
                <NuxtLink to="/">🚂 Train Handler</NuxtLink>
            </div>
            <ul class="flex ml-8">
                <li>
                    <NuxtLink class="block py-2 px-3 text-teal-100 hover:text-white" to="/">Trains</NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        class="block py-2 px-3 text-teal-100 hover:text-white"
                        to="/stations"
                    >Stations</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="block py-2 px-3 text-teal-100 hover:text-white" to="/plans">Plans</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="text-teal-100 text-right" v-if="store.isSet()">
            <div class="text-white">{{ store.keycloak.idTokenParsed.name }}</div>
            <a class="text-sm hover:text-white cursor-pointer" @click="store.keycloak.logout()">Logout</a>
        </div>
    </nav>
</template>
