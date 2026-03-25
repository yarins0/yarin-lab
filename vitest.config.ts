import { defineConfig } from "vitest/config";
import path from "path";

/*
  Vitest configuration.

  resolve.alias maps the @/ import shorthand (defined in tsconfig.json)
  to the src/ directory so tests can import application code using the same
  paths used in the rest of the project.
*/
export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
