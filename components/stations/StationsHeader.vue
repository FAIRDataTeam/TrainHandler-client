<script setup>
const props = defineProps(['active'])

const links = [{
    label: 'Stations',
    to: '/stations',
    active: props.active === 'stations',
}, {
    label: 'Station Directories',
    to: '/station-directories',
    active: props.active === 'station-directories',
}]

const actions = [{
    label: 'Add station directory',
    to: '/station-directories/add'
}]
</script>
<template>
    <PageHeader title="Stations" :links="links" :actions="actions" />
</template>