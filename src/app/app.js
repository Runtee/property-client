const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
    clientSecret: process.env.CLIENTSECRET,
    authorizationParams: {
      response_type: "code",
      audience: "http://localhost:8000",
      scope: "openid profile email",
    },
  };
  