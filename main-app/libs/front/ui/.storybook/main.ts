import type { StorybookConfig } from '@storybook/react-vite';
import svgr from '@svgr/rollup';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        svgr(),
        tsconfigPaths({
          projects: ['../../../tsconfig.base.json'],
        }),
      ],
    });
  },
};

export default config;
