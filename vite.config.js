import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },

      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: '테스트용 리액트앱',
        short_name: 'MyApp',
        description: '설명',
        theme_color: '#000000',
        // 상단 주소창을 없앰
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    })
  ],
  base:'/reactshop/',
})
