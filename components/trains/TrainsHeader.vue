<script setup>
const props = defineProps(['active'])

const links = [{
    label: 'Trains',
    to: `/`,
    active: props.active === 'trains',
}, {
    label: 'Train Garages',
    to: `/train-garages`,
    active: props.active === 'train-garages',
}]

const actions = [{
    label: 'Add train garage',
    to: '/train-garages/add'
}]
</script>
<template>
    <PageHeader title="Trains" :links="links" :actions="actions" />
</template>