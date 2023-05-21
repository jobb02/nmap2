import crypto from "crypto"
const hashPassword = (text) => { return crypto.createHash("sha256").update(text).digest("hex") }

export default hashPassword