import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		chunkSizeWarningLimit: 1600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	},
	envDir: '../', // Chemin relatif du dossier frontend au dossier racine du projet
	plugins: [
		react(),
		visualizer({ open: true, gzipSize: true, brotliSize: true }),

	],
	server: {
		port: 3000,
		host: true,
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
});