import reactInspector from 'vite-plugin-react-find'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	build: {
		outDir: './web',
	},
	plugins: [react(), tsconfigPaths(),
// reactInspector(),
		svgr({svgrOptions: {exportType: 'default'}, include: '**/*.svg'}),
		mkcert(),

	],
})
