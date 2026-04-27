import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/byd-cost-travel/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BYD Cost to Travel',
        short_name: 'BYD Travel',
        description: 'Calculate BYD travel costs based on cumulative AEC',
        theme_color: '#0d1b2a',
        background_color: '#0d1b2a',
        display: 'standalone',
        start_url: '/byd-cost-travel/',
        icons: [
          { src: '/byd-cost-travel/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/byd-cost-travel/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
