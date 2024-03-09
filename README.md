# wr505d

Ce projet a été développé avec Vue3 dans l'objectif de créer une application reliée à une API basique pour un site de streaming. Vous pouvez récupérer la partie back [juste ici](https://github.com/plassasseigne/wr506d).

## Configuration requise

- Node.js 18.0 minimum
- Npm

## Installation du projet

- Récupérer le projet
- Installer les dépendances
```sh
npm install
```
- Dupliquer le fichier .env et le nommer .env.local
```sh
cp .env .env.local
```
- Remplacer l'URL de l'API par la vôtre
```sh
VITE_API_URL=""
```
- Initialiser le serveur
```sh
npm run dev
```

## Construire le projet

```sh
npm run build
```

## Identifiants

(Si vous utilisez la partie back)

Admin :
```sh
email: user1@mail.com
password: test123
```

Utilisateur :
```sh
email: user2@mail.com
password: test123
```