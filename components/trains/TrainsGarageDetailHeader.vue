<script setup>
const route = useRoute()
const trainGarageUuid = route.params.id
const props = defineProps(['title', 'hideActions'])
const emit = defineEmits(['delete'])

const actions = props.hideActions ? [] : [{
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
}
</script>
<template>
    <PageHeader :title="title" :actions="actions" @action="onAction" />
</template>