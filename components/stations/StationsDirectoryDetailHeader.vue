<script setup>
const route = useRoute()
const stationDirectoryUuid = route.params.id
const props = defineProps(['title', 'hideActions', 'deletable'])
const emit = defineEmits(['delete', 'refresh'])

const actions = props.hideActions ? [] : [{
    label: 'Refresh',
    emit: 'refresh'
}, {
    label: 'Edit',
    to: `/station-directories/${stationDirectoryUuid}/edit`,
}]

if (props.deletable) {
    actions.push({
        label: 'Delete',
        dangerous: true,
        emit: 'delete'
    })
}

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
