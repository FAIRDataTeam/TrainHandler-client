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
        const res = await $api.post('/train-garages', data)
        await router.push(`/train-garages/${res.uuid}`)
    } catch (err) {
        state.error = true
    }
}
</script>
<template>
    <div>
        <TrainsHeader active="train-garages" />
        <div class="mt-6 max-w-screen-md mx-auto">
            <h1>Add train garage</h1>
            <AlertError v-if="state.error" text="Unable to add the train garage." />
            <FormRenderer :form="form" @submit="submit" />
        </div>
    </div>
</template>
