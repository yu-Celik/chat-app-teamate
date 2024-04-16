import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	envDir: '../', // Chemin relatif du dossier frontend au dossier racine du projet
	plugins: [react()],
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