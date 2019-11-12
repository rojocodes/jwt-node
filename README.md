# jwt-node
This is a node boilerplate project to create authenticated apis using jwt.

## What is JWT
**JSON Web Tokens** are an open, industry standard RFC 7519 method for representing claims securely between two parties.
**JSON Web Token (JWT)** is an Internet standard for creating **JSON-based** access tokens that assert some number of claims. For example, a server could generate a token that has the claim "logged in as admin" and provide that to a client. The client could then use that token to prove that it is logged in as admin. The tokens are signed by one party's private key (usually the server's), so that both parties (the other already being, by some suitable and trustworthy means, in possession of the corresponding public key) are able to verify that the token is legitimate. The tokens are designed to be compact, URL-safe, and usable especially in a web-browser **single-sign-on (SSO)** context. JWT claims can be typically used to pass identity of authenticated users between an identity provider and a service provider, or any other type of claims as required by business processes.

## What is in this project
In this Project i have used express to create get and post apis, and created a route - /api where you can create all your apis.
I have used body parser for getting json from the body.

for more info on jwt go to: [jwt.io](https://jwt.io/)

follow me on instagram: [rojocodes](https://www.instagram.com/rojocodes/)