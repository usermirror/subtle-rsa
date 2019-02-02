type SubtleRSAInput = {
  generate?: boolean
  publicKey?: string
  privateKey?: string
}

class SubtleRSA {
  _publicKey: CryptoKey
  _privateKey: CryptoKey

  constructor(input: SubtleRSAInput) {
    if (input.publicKey) {
      this.importPublicKey(input.publicKey).then(publicKey => {
        this._publicKey = publicKey
      })
    }

    if (input.generate) {
      this.generateKeys()
    }
  }

  encrypt = async (valueToEncrypt: any) => {
    if (!this._publicKey) {
      console.warn('SubtleRSA.encrypt(): missing keys: generating')
      await this.generateKeys()
    }

    let serializedValue = toArrayBuffer(
      window.btoa(encodeURIComponent(JSON.stringify(valueToEncrypt)))
    )

    return await window.crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      this._publicKey,
      serializedValue
    )
  }

  decrypt = async (valueToDecrypt: any) => {
    if (!this._privateKey) {
      throw new Error('SubtleRSA.decrypt(): missing private key')
    }

    let decryptedValue = await window.crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      this._privateKey,
      valueToDecrypt
    )

    try {
      return JSON.parse(
        decodeURIComponent(window.atob(fromArrayBuffer(decryptedValue)))
      )
    } catch (err) {
      throw err
    }
  }

  importPublicKey = async (jwk: string) => {
    return await window.crypto.subtle.importKey(
      'jwk',
      {
        n: jwk,
        e: 'AQAB',
        ext: true,
        kty: 'RSA',
        alg: 'RSA-OAEP-256'
      },
      {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' }
      },
      false,
      ['encrypt']
    )
  }

  generateKeys = async () => {
    let keyMaterials = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        hash: { name: 'SHA-256' },
        publicExponent: new Uint8Array([0x01, 0x00, 0x01])
      },
      false,
      ['encrypt', 'decrypt']
    )

    this._privateKey = keyMaterials.privateKey
    this._publicKey = keyMaterials.publicKey
  }
}

function fromArrayBuffer(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}

function toArrayBuffer(str: string) {
  // check if it's already an array buffer
  if (typeof str !== 'string') {
    return str
  }

  const buf = new ArrayBuffer(str.length * 2)
  const bufUint16 = new Uint16Array(buf)

  for (let i = 0; i < str.length; i++) {
    bufUint16[i] = str.charCodeAt(i)
  }

  return buf
}

export default SubtleRSA
