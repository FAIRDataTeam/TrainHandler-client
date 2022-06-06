<script setup>
import _ from 'lodash'

const props = defineProps(['size'])

const toReadableSize = (size) => {
    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']

    const toString = (value, unit) => `${_.round(value, 2)} ${unit}`

    const { result } = units.reduce(({ result, value }, unit) => {
        if (!result && value < 1000) {
            return { result: toString(value, unit), value }
        }
        return { result, value: value / 1000 }
    }, { result: null, value: size })

    return result
}
</script>
<template>
    <span class="whitespace-nowrap">{{ toReadableSize(size) }}</span>
</template>
