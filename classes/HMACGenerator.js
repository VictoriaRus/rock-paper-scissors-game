import crypto, {randomBytes} from "crypto";

class HMACGenerator {
    #algorithm = null;
    #size = null;
    #encodingType = null;
    #securityKey = null;

    constructor(algorithm, size, encodingType) {
        this.#algorithm = algorithm;
        this.#size = size;
        this.#encodingType = encodingType;
        this.#securityKey = this.#generateSecureHexKey(this.#size, this.#encodingType);
    }

    createHMACFromText(text) {
        const hmac = this.#generateHMAC(
            this.#securityKey, this.#algorithm, text, this.#encodingType
        )
        return hmac;
    }

    #generateSecureHexKey(size, encodingType) {
        const secureRandom = randomBytes(size);
        return secureRandom.toString(encodingType);
    }

    #generateHMAC(securityKey, algorithm, text, encodingType) {
        let hmac = crypto.createHmac(algorithm, securityKey);
        let data = hmac.update(text);
        return data.digest(encodingType);
    }

    getSecurityKey() {
        return this.#securityKey;
    }
}

export default HMACGenerator;