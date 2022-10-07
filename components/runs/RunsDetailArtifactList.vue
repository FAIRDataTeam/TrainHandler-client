<script setup>
import { ArrowDownTrayIcon, DocumentIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { $api } = useNuxtApp()

const props = defineProps(['items'])

const downloadArtifact = async (artifact) => {
    await $api.download(`/runs/${artifact.runUuid}/jobs/${artifact.jobUuid}/artifacts/${artifact.uuid}/download`, artifact.filename)
}
</script>
<template>
    <RunsDetailList title="Artifacts" emptyText="There are no artifacts." :items="items" v-slot="{ item }">
        <span class="flex justify-start items-center">
            <DocumentIcon class="flex-none text-gray-500 w-5 h-5 mr-1" />
            {{ item.displayName }}
            <span class="bg-gray-200 text-gray-800 text-xs font-semibold ml-2 px-1.5 py-0.5 rounded">
                {{ item.contentType }}
            </span>
        </span>
        <span class="flex justify-end">
            <ByteSize class="mr-3 text-gray-500 text-sm" :size="item.bytesize" />
            <a class="link" @click="downloadArtifact(item)">
                <ArrowDownTrayIcon class="w-5 h-5" />
            </a>
        </span>
    </RunsDetailList>
</template>
