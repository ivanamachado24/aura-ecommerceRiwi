# aura-by-vm-complete

Proyecto Next.js (App Router) para la boutique *Aura – By V.M*.
Incluye frontend, panel admin, NextAuth (credentials), MongoDB y seed.

## Setup rápido

1. Copia `.env.example` a `.env.local` y completa tus variables:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

2. Instala dependencias:
```bash
npm install
```

3. Ejecuta seed para crear admin de prueba:
```bash
npm run seed
```
Admin: `vanessa@aura.com` / `admin1234`

4. Inicia en modo desarrollo:
```bash
npm run dev
```

Abre http://localhost:3000
