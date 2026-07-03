# REED SIGNATURE

Landing page premium pour REED SIGNATURE — pailles en roseau naturel personnalisées, gravées au laser pour hôtels, restaurants, bars, cafés et lounges.

**L'élégance gravée dans chaque détail.**

## Stack

Site statique, sans dépendance à l'exécution : HTML, CSS et JavaScript purs.

- `index.html` — structure et contenu
- `styles.css` — design system (mobile-first, palette et typographies de la marque)
- `script.js` — interactions (menu, animations au scroll, FAQ, liens WhatsApp)
- `assets/` — images optimisées en WebP + logos + favicons

## Numéro WhatsApp

Modifiable à deux endroits :

1. `script.js` → constante `CONFIG.WHATSAPP` (format international sans `+` ni espaces).
2. Section Contact du site → champ « Numéro WhatsApp » puis « Mettre à jour ».

## Développement local

Aucune compilation nécessaire. Servez le dossier avec n'importe quel serveur statique :

```bash
npx serve .
```

## Déploiement

Hébergé sur Vercel (site statique). Un push sur la branche principale déclenche le déploiement.
