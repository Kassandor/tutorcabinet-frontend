<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')

const emailRules = [
  value => {
    if (/.+@.+\..+/.test(value)) return true
    return 'Невалидный E-mail'
  },
]

const passwordRules = [
  value => {
    if (value?.length >= 4) return true
    return 'Пароль не может быть меньше 4 символов'
  },
]

async function submit(submitEventPromise) {
  const {valid, errors} = await submitEventPromise
  if (valid) {
    console.log("мы в if")
  } else {
    console.log("мы в else")
    return // abort submit
  }
}
</script>

<template>
  <v-container class="mt-10" fluid>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h1>Вход в аккаунт</h1>
      </v-col>

      <v-col cols="12" md="4">
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            variant="underlined"
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            variant="underlined"
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>

          <div class="text-center mt-6">
            <v-btn color="primary" type="submit">Sign In</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
