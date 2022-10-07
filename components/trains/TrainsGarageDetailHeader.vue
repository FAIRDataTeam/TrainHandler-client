<script setup>
const route = useRoute()
const trainGarageUuid = route.params.id
const props = defineProps(['title', 'hideActions'])
const emit = defineEmits(['delete', 'refresh'])

const actions = props.hideActions ? [] : [{
    label: 'Refresh',
    emit: 'refresh'
}, {
    label: 'Edit',
    to: `/train-garages/${trainGarageUuid}/edit`,
}, {
    label: 'Delete',
    dangerous: true,
    emit: 'delete'
}]

const onAction = (action) => {
    if (action === 'delete') {
        emit('delete')
    }

    if (action === 'refresh') {
        emit('refresh')
    }
}
</script>
<template>
    <PageHeader :title="title" :actions="actions" @action="onAction" />
</template>