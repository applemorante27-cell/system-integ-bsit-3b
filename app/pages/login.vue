<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6" elevation="2">
      <v-card-title class="text-center text-h5 font-weight-bold"
        >LOGIN</v-card-title
      >
      <v-card-subtitle class="text-center mb-4"
        >Welcome back, please login</v-card-subtitle
      >

      <v-card-text>
        <v-text-field
          label="Email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-btn color="blue" block size="large" class="mb-3"> Sign In </v-btn>

        <div class="text-center my-2 text-caption text-grey">OR</div>

        <v-btn
          color="red-darken-1"
          block
          size="large"
          prepend-icon="mdi-google"
          @click="loginWithGoogle"
        >
          Sign in with Google
        </v-btn>
        
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
//@ts-nocheck

const config = useRuntimeConfig()
const googleButton = ref<HTMLDivElement | null>(null)

declare global {
  interface Window {
    google: any
  }
}
const loginWithGoogle = () => {
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: config.public.googleClientId,
    scope: 'openid email profile',
    callback: async (response: any) => {
      const userInfo = await $fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers:{
          Authorization: `Bearer ${response.access_token}`
        }
      })
      localStorage.setItem('google_user', JSON.stringify(userInfo))
      localStorage.setItem('google_token', response.access_token)

      navigateTo('/')
    }
  })
  client.requestAccessToken()
}
</script>