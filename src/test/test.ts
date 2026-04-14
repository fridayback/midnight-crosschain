import { createWalletKeys } from '../wallet-sdk';
import { ShieldedAddress, ShieldedCoinPublicKey, ShieldedEncryptionPublicKey, UnshieldedAddress, DustAddress } from "@midnight-ntwrk/wallet-sdk-address-format"
import {
    PublicKey,
} from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';

const seed = '0000000000000000000000000000000000000000000000000000000000000013';
const networkId = 'preview';
const { shieldedSecretKeys, dustSecretKey, unshieldedKeystore } = createWalletKeys(Buffer.from(seed, 'hex'), { networkId });

const coinPublicKey = shieldedSecretKeys.coinPublicKey;
const encryptionPublicKey = shieldedSecretKeys.encryptionPublicKey;
const shieldedAddress = new ShieldedAddress(ShieldedCoinPublicKey.fromHexString(coinPublicKey), ShieldedEncryptionPublicKey.fromHexString(encryptionPublicKey));

const unshieldedAddress = new UnshieldedAddress(Buffer.from(PublicKey.fromKeyStore(unshieldedKeystore).publicKey, 'hex'));

console.log('Shielded Address: ' + ShieldedAddress.codec.encode(networkId, shieldedAddress).asString());
console.log('Unshielded Address: ' + UnshieldedAddress.codec.encode(networkId, unshieldedAddress).asString());