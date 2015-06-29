module.exports =
    container:
        composed: "DOCKER_COMPOSED"

    auth:
        facebook:
            clientID: "FACEBOOK_CLIENT_ID"
            clientSecret: "FACEBOOK_CLIENT_SECRET"
            callbackUrl: "FACEBOOK_CALLBACK_URL"
        twitter:
            consumerKey: "TWITTER_CONSUMER_KEY"
            consumerSecret: "TWITTER_CONSUMER_SECRET"
            callbackURL: "TWITTER_CALLBACK_URL"

    openfda:
        apiKey: "OPENFDA_APIKEY"

    database:
        connectionString: "DB_CONNECTION_STRING"
        composeConnection:
            host: "MONGO_1_PORT_27017_TCP_ADDR"
            port: "MONGO_1_PORT_27017_TCP_PORT"

    security:
        sessionStateSecret: "SESSION_STATE_SECRET"

    monitoring:
        newrelicKey: "NEWRELIC_LICENCE_KEY"
