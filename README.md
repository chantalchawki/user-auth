# User Authentication and Authorization

## Run:

To run the docker-compose.yaml file:
```bash
docker-compose up -d
```

To view logs:
```bash
docker-compose logs -f server
```

## Endpoints:

![alt text](./documentation/auth.png)

* /login : to authenticate the user using username and passwords. It generates a JWT token containing the user id, username and role.
* /logout : to log the user out of the system and stores the token in Redis as a blacklisted token.
* /validate : given a JWT token and a role, the API checks if the token is valid (not expired) and the given role matches the user's role, or if the token is blacklisted (user has already logged out)

## Postman Collection:
[postman-collection](./documentation/user-auth.postman_collection.json)