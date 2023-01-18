import reactRefresh from "@vitejs/plugin-react-refresh";
import { UserConfig, ConfigEnv } from "vite";
import { join } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const srcRoot = "./src";

export default ({ command }: ConfigEnv): UserConfig => {
  // DEV
  if (command === "serve") {
    return {
      base: "/",
      plugins: [reactRefresh(), tsconfigPaths()],
      alias: {
        "/@": srcRoot,
      },
      build: {
        outDir: join(srcRoot, "/out"),
        emptyOutDir: true,
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        exclude: ["path"],
      },
    };
  }
  // PROD
  else {
    return {
      base: `./`,
      plugins: [reactRefresh(), tsconfigPaths()],
      resolve: {
        alias: {
          "/@": srcRoot,
        },
      },
      build: {
        outDir: join(srcRoot, "/out"),
        emptyOutDir: true,
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        exclude: ["path"],
      },
    };
  }
};
