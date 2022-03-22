<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/outline"

const { $api } = useNuxtApp()

const { pending, data } = $api.lazyFetch('/station-directories')

</script>
<template>
    <div class="max-w-screen-lg mx-auto">
        <div class="w-full flex justify-between items-center mb-5">
            <h1>Station Directories</h1>
            <div>
                <NuxtLink
                    class="button button-outline-default button-sm"
                    to="/station-directories/add"
                >
                    <PlusIcon class="w-4 mr-1 inline-block" />Add station directory
                </NuxtLink>
            </div>
        </div>
        <div>
            <div v-if="pending">Loading...</div>
            <div v-else>
                <div
                    v-for="(item, index) in data.content"
                    :key="index"
                    class="py-3 px-4 w-full border-b border-gray-200 hover:bg-gray-100 flex justify-between items-center"
                    :class="index === 0 ? 'border-t' : ''"
                >
                    <div>
                        <NuxtLink
                            :to="`/station-directories/${item.uuid}`"
                            class="font-bold inline-block hover:underline"
                        >{{ item.displayName }}</NuxtLink>
                        <div class="text-gray-500">{{ item.uri }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>