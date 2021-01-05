export default {
    // MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://admin:161718@cluster0.qcpkx.mongodb.net/<dbname>?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}