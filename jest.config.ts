import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Usa ts-jest para TypeScript y JSX
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|some-other-lib)/)', // Transforma dependencias específicas si es necesario
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock de estilos
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Configuración adicional
};

export default config;

