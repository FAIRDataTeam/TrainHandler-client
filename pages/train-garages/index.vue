<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/outline"

const config = useRuntimeConfig()

const { pending, data } = useLazyFetch(`${config.API_URL}/train-garages`)

</script>
<template>
    <div class="max-w-screen-lg mx-auto">
        <div class="w-full flex justify-between items-center mb-5">
            <h1>Train Garages</h1>
            <div>
                <a
                    class="button button-primary"
                    href="/train-garages/add"
                >
                    <PlusIcon class="w-5 mr-2 inline-block" />Add train garage
                </a>
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
                            :to="`/train-garages/${item.uuid}`"
                            class="font-bold inline-block hover:underline"
                        >{{ item.displayName }}</NuxtLink>
                        <div class="text-gray-500">{{ item.uri }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>