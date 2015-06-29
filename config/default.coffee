module.exports =
    monitoring:
        newRelicKey: null
        newRelicAppName: "DrugFax-18F"

    container:
        composed: 0

    auth:
        facebook:
            clientID: "1414028015593160"
            clientSecret: "bogus_secret"
            callbackUrl: "http://localhost:9000/api/auth/facebook/callback"
        twitter:
            consumerKey: "Ila1ubIfdLB0hAbsDQfnXXknp"
            consumerSecret: "bogus_secret"
            callbackURL: "http://localhost:9000/api/auth/twitter/callback"

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
        composeConnection:
            dbName: "18f"

