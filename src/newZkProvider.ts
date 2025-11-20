/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-11-20 18:23:48
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-11-20 18:51:27
 * @FilePath: /midnight-crosschain/src/newZkProvider.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {type CrossChainCircuitKeys, ZKConfig} from './common-types'
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';


export const newZkProvider = () => (new FetchZkConfigProvider<CrossChainCircuitKeys>(ZKConfig.zkConfigPath)) as unknown;