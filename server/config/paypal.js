const { Client, Environment } = require('@paypal/paypal-server-sdk');

const paypalClient = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    },
    environment: process.env.NODE_ENV === 'production' 
        ? Environment.Production 
        : Environment.Sandbox,
    logging: {
        logLevel: 'INFO',
        logRequest: { logBody: true },
        logResponse: { logHeaders: true }
    }
});

module.exports = paypalClient;