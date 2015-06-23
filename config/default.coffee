module.exports =
    auth:
        facebook:
            clientID: ""
            clientSecret: ""
            callbackUrl: "http://localhost:9000/api/auth/facebook/callback"

    security:
        sessionStateSecret: "random_gibberish"
        password:
            saltWorkFactor: 10

    server:
        port: 9000
        clustering:
            workerLimit: 1
            isEnabled: true

    database:
        connectionString: 'mongodb://localhost/18f'
        populateSeedData: true
