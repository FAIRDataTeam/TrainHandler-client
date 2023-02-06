<script setup>
const route = useRoute()
const trainUuid = route.params.id
const props = defineProps(['title', 'hideActions', 'softDeleted'])
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
        to: `/trains/${trainUuid}/edit`
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

const trainTitle = props.softDeleted ? `${props.title} (deleted)` : props.title
</script>
<template>
    <PageHeader :title="trainTitle" :actions="actions" @action="onAction" />
</template>
