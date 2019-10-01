const jwtservice = require('./jwtservice');

// dummy Database
function getUser(username) {
	return {
		email: 'admin@example.com',
		username: 'admin',
		password: 'admin'
	}
}

// SignIn
function signin(credentials) {
	let { username, password } = credentials;
	let user = getUser(username);

	// validasi
	if (user.password === password) {
		// return token
		return jwtservice.sign({ username });
	} else {
		throw new Error('Invalid Credentials');
	}
}

// Verfiy
function verify(token) {
	try {
		let decoded = jwtservice.verify(token);
		return decoded;
	} catch (err) {
		throw new Error("Token Error");
	}
}

function main() {
	// contoh berhasil
	let validUser = { username: 'admin', password: 'admin' };
	let invalidUser = { username: 'admin', password: 'wrongpassword' };

	// check valid
	try {
		console.log('-> SignIn using Valid Credentials');

		let validToken = signin(validUser);
		console.log(`validToken : ${validToken}`, '\n');

		console.log('-> Verify valid Token')
		let decodedFromToken = verify(validToken);
		console.log(`validTokenPayload :`, decodedFromToken, '\n');
	} catch (err) {
		console.error(err);
	}

	// sign in invalid
	try {
		console.log('-> SignIn using Invalid Credentials, throws error.');
		let invalidToken = signin(invalidUser);
	} catch (err) {
		console.log('Error : ', err.message, '\n');
	}

	// verify with invalid token
	try {
		console.log('-> Verify invalid token.')
		let decodedFromInvalidToken = verify('1234567890abcdefghijklmnopqrstuvwxyz');

		console.log(decodedFromInvalidToken);
	} catch (err) {
		console.log('Error : ', err.message, '\n');
	}
}

main();