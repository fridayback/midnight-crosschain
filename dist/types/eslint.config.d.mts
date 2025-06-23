declare const _default: ({
    readonly rules: Readonly<import("eslint").Linter.RulesRecord>;
} | {
    files: string[];
    languageOptions: {
        parser: any;
        parserOptions: {
            ecmaVersion: string;
            sourceType: string;
            project: string[];
        };
        globals: {
            process: string;
            Buffer: string;
            URL: string;
            setTimeout: string;
        };
    };
    plugins: {
        '@typescript-eslint': {
            configs: Record<string, parser>;
            meta: parser;
            rules: typeof import("@typescript-eslint/eslint-plugin/rules");
        };
        prettier: import("eslint").ESLint.Plugin;
    };
    rules: {
        'prettier/prettier': string;
        '@typescript-eslint/no-misused-promises': string;
        '@typescript-eslint/no-floating-promises': string;
        '@typescript-eslint/promise-function-async': string;
        '@typescript-eslint/no-redeclare': string;
        '@typescript-eslint/explicit-function-return-type': string;
        '@typescript-eslint/consistent-type-definitions': string;
        '@typescript-eslint/no-unsafe-call': string;
        '@typescript-eslint/no-unsafe-return': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-unsafe-argument': string;
    };
    ignores?: undefined;
} | {
    ignores: string[];
    files?: undefined;
    languageOptions?: undefined;
    plugins?: undefined;
    rules?: undefined;
})[];
export default _default;
