<script setup>
const route = useRoute()
const stationUuid = route.params.id
const props = defineProps(['title', 'softDeleted'])
const emit = defineEmits(['delete', 'restore'])

const actions = []

if (props.softDeleted) {
    actions.push({
        label: 'Restore',
        emit: 'restore'
    })
} else {
    actions.push({
        label: 'Edit',
        to: `/stations/${stationUuid}/edit`
    })
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

    if (action === 'restore') {
        emit('restore')
    }
}

const stationTitle = props.softDeleted ? `${props.title} (deleted)` : props.title
</script>
<template>
    <PageHeader :title="stationTitle" :actions="actions" @action="onAction" />
</template>
    