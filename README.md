# Train Handler - client

*Train Handler client component of the FAIR Data Train*

## Usage

*To be done*

## Development

Install dependencies using:

```
$ npm install
```

Create `.env` file. For local development, you need to set the port where the client is running, API url of the Train Handler backend and some extra Keycloak settings:

```
PORT=8081
NUXT_PUBLIC_API_URL=http://localhost:8080
NUXT_PUBLIC_KEYCLOAK_URL=http://localhost:8000
NUXT_PUBLIC_KEYCLOAK_REALM=myrealm
NUXT_PUBLIC_KEYCLOAK_CLIENT_ID=myclient
```

Run in dev mode:

```
$ npm run dev
```

You can disable Keycloak for local development by setting in the `.env` file:

```
NUXT_PUBLIC_KEYCLOAK_DISABLED=true
```

## Contributing

We maintain a [CHANGELOG](CHANGELOG.md), you should also take a look at our [Contributing Guidelines](CONTRIBUTING.md)
and [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
