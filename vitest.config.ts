import { defineConfig } from 'vitest/config'
import path from 'path'
import { config } from 'dotenv'

// Load .env so DATABASE_URL is available to the Prisma singleton in tests
config({ path: '.env' })

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 12000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
