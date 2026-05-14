import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        // Define que este é um projeto Node.js com ES Modules
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            // Aqui podes adicionar as tuas próprias regras do ESLint
            'no-unused-vars': 'warn', // Avisa se criares uma variável e não a usares
            'no-console': 'off', // Permite usar console.log() (em produção, muitos desligam)
        },
    },
    // Esta linha mágica integra o Prettier com o ESLint
    eslintPluginPrettierRecommended,
];
