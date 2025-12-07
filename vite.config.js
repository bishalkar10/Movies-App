import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = dotenv.config({
    path: `.env.${mode}`,
  }).parsed;

  // Pass the environment variables to Vite's define plugin
  return {
    base: "/",
    plugins: [react()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
