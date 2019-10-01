const jwt = require('jsonwebtoken');

// SECRET, isinya bebas
const SECRET = "everythingok";

/**
 * Sign to generate token
 * @param {any} payload 
 * @param {string} expiresIn 
 * @returns {string} token
 */
function sign(payload, expiresIn = '1d') {
	return jwt.sign({ ...payload, expiresIn }, SECRET);
}

/**
 * Verify, throw error if token invalid.
 * @param {*} token 
 * @returns {any} decoded
 */
function verify(token) {
	return jwt.verify(token, SECRET);
}

module.exports = {
	sign,
	verify
}