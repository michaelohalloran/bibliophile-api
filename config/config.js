exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://dickensc123:taleof2cities@ds137720.mlab.com:37720/bibliophile';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://mochatester:chai45367@ds263380.mlab.com:63380/bibliophile-server-test';
exports.PORT = process.env.PORT || 8080;
exports.CLIENT = process.env.CLIENT || 'http://localhost:3000';
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';