<script setup>
import _ from 'lodash'

const props = defineProps(['metadata'])

const state = reactive({
    metadataExpanded: false
})

const isTooLong = () => {
    return props.metadata.split('\n').length > 5
}

const expandMetadata = () => {
    state.metadataExpanded = true
}

const collapseMetadata = () => {
    state.metadataExpanded = false
}
</script>
<template>
    <div class="overflow-auto" v-if="!isTooLong() || state.metadataExpanded">
        <pre class="overflow-auto">{{ metadata }}</pre>
        <a @click="collapseMetadata()" v-if="isTooLong()" class="inline-block mt-4 cursor-pointer link">Show less</a>
    </div>
    <div v-else>
        <pre class="overflow-auto">{{ _.take(metadata.split('\n'), 5).join('\n') }}</pre>
        <a @click="expandMetadata()" class="inline-block mt-4 cursor-pointer link">Show more</a>
    </div>
</template>
