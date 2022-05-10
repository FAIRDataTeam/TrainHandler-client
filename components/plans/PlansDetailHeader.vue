<script setup>
const route = useRoute()
const props = defineProps(['title', 'active'])

const links = [{
    label: 'Detail',
    to: `/plans/${route.params.id}`,
    active: props.active === 'detail',
}, {
    label: 'Runs',
    to: `/plans/${route.params.id}/runs`,
    active: props.active === 'runs',
}]

const actions = [{
    label: 'New run',
    to: `/plans/${route.params.id}/runs/create`
}]
</script>
<template>
    <PageHeader :title="title" :links="links" :actions="actions" />
</template>