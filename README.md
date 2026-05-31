# Portfolio Bento interactif

Portfolio personnel en Next.js, TypeScript, TailwindCSS et Framer Motion.

## Fonctionnalités

- Accueil en Bento Grid avec cartes de tailles variées.
- Réorganisation aléatoire à chaque rechargement.
- Mode `Composer` pour déplacer les cartes par drag and drop.
- Pages dédiées : à propos, projets, projet dynamique, compétences, expériences, formation, CV, contact.
- Lecteur audio discret prêt pour des musiques locales.
- Zone prévue pour intégrer une build Unity WebGL.
- Données centralisées dans `lib/content.ts`.

## Installation

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Personnalisation

- Modifier le profil, les projets, compétences et expériences dans `lib/content.ts`.
- Ajouter le CV dans `public/cv.pdf`.
- Ajouter les musiques dans `public/music/` avec les noms configurés dans `lib/content.ts`.
- Pour Unity, exporter le jeu en WebGL puis placer la build dans `public/unity/jeu-unity`.

## Déploiement

Le projet est prêt pour Vercel :

1. pousser le code sur GitHub ;
2. importer le dépôt dans Vercel ;
3. lancer le déploiement avec les commandes Next.js par défaut.
