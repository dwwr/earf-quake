import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  // Production static files are copied to public/storybook and served at /storybook/.
  // Dev server ignores Vite base and listens at / — Next proxies /storybook → :6006/.
  async viteFinal(config, { configType }) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    if (configType === "PRODUCTION") {
      config.base = "/storybook/";
    }
    return config;
  },
};

export default config;
