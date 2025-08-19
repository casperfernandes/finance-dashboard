import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'zustand', 'recharts', 'lucide-react'],
    },

    // Development server configuration
    server: {
        port: 5173,
        host: true, // Allow external connections
        open: true, // Auto-open browser
    },

    // Build optimization
    build: {
        // Generate source maps for debugging
        sourcemap: true,

        // Optimize chunk splitting
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks for better caching
                    vendor: ['react', 'react-dom'],
                    charts: ['recharts'],
                    icons: ['lucide-react'],
                    state: ['zustand', '@tanstack/react-query'],
                },
            },
        },

        // Increase chunk size warning limit
        chunkSizeWarningLimit: 600,
    },

    // Preview server configuration
    preview: {
        port: 4173,
        host: true,
    },
})
