/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-20 11:29:01
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-23 14:59:52
 * @FilePath: /midnight-contract-examples/counter-cli/eslint.config.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// This file is part of midnightntwrk/example-counter.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import js from '@eslint/js';
import plugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';
export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['./tsconfig.json'],
            },
            globals: {
                process: 'readonly',
                Buffer: 'readonly',
                URL: 'readonly',
                setTimeout: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': plugin,
            prettier: pluginPrettier,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/promise-function-async': 'off',
            '@typescript-eslint/no-redeclare': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
        },
    },
    {
        ignores: ["contract/managed/**"]
    }
];
//# sourceMappingURL=eslint.config.mjs.map