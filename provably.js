const CryptoJS = require('crypto-js');

const serverSeed = ''; // 服务器种子
const clientSeed = ''; // 客户端种子（用户种子）
const nonce = ''; // 回合数
const salt = ''; // 盐


function hexdec(hexString) {
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
}


function getRollHash(clientSeed, serverSeed, nonce) {
    let seed = clientSeed + '-' + nonce;
    let encryptStr = CryptoJS.HmacSHA256(serverSeed, seed)
    return encryptStr.toString(CryptoJS.enc.Hex)
}


function getPublicHash(salt, serverSeed) {
    let encryptStr = CryptoJS.HmacSHA256(serverSeed, salt)
    return encryptStr.toString(CryptoJS.enc.Hex)
}


function getRoll(clientSeed, serverSeed, nonce) {
    let hash = getRollHash(clientSeed, serverSeed, nonce)
    let subHash = hash.substr(0, 5)
    let number = hexdec(subHash)
    return number % 100000 + 1
}

// 计算公共哈希
console.log(getPublicHash(salt, serverSeed))

// 计算结果
console.log(getRoll(clientSeed, serverSeed, nonce))
