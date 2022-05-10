<script setup>
import { required, url } from '@vuelidate/validators'

const router = useRouter()
const { $api } = useNuxtApp()

const state = reactive({
    error: false
})

const form = {
    fields: [{
        name: 'displayName',
        label: 'Name',
        rules: { required },
    }, {
        name: 'uri',
        label: 'URI',
        rules: { required, url },
    }, {
        name: 'note',
        label: 'Note',
        type: 'textarea',
        rules: {},
    }],
    submit: {
        label: 'Submit'
    }
}

const submit = async (data) => {
    try {
        const res = await $api.post('/station-directories', data)
        await router.push(`/station-directories/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <div>
        <StationsHeader active="station-directories" />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>Add station directory</h1>
            <AlertError v-if="state.error" text="Unable to add the station directory." />
            <FormRenderer :form="form" @submit="submit" />
        </div>
    </div>
</template>
