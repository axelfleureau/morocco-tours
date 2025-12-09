# Firebase Setup Guide - Morocco Dreams

Guida per configurare il nuovo progetto Firebase.

## 1. Firestore Database

### Abilitare Firestore
1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Seleziona il tuo progetto `morocco-tours-9bae4`
3. Nel menu laterale, clicca su **Firestore Database**
4. Clicca **Create database**
5. Scegli **Start in production mode**
6. Seleziona la location più vicina (es: `eur3` per Europa)

### Applicare le Security Rules
1. Nella sezione Firestore, vai alla tab **Rules**
2. Copia il contenuto di `firestore.rules` in questo file
3. Clicca **Publish**

### Creare gli Indici (se necessario)
Firebase creerà automaticamente gli indici necessari quando esegui le query.

---

## 2. Storage

### Abilitare Storage
1. Nel menu laterale, clicca su **Storage**
2. Clicca **Get started**
3. Scegli **Start in production mode**
4. Conferma la location

### Applicare le Security Rules
1. Nella sezione Storage, vai alla tab **Rules**
2. Copia il contenuto di `storage.rules` in questo file
3. Clicca **Publish**

### Creare le Cartelle
Le cartelle verranno create automaticamente quando carichi i file. Le cartelle previste sono:
- `experiences/`
- `travels/`
- `services/`
- `vehicles/`
- `blog/`
- `cities/`
- `testimonials/`
- `instagram/`
- `uploads/`
- `users/`

---

## 3. Authentication

### Abilitare i Provider
1. Nel menu laterale, clicca su **Authentication**
2. Clicca **Get started**
3. Vai alla tab **Sign-in method**
4. Abilita **Email/Password**
5. Abilita **Google** (opzionale ma consigliato)

### Configurare il Dominio Autorizzato
1. Nella tab **Settings** > **Authorized domains**
2. Aggiungi il dominio Replit: `*.replit.dev`
3. Aggiungi il dominio di produzione quando disponibile

---

## 4. Credenziali (Già Configurate)

Le seguenti credenziali sono già configurate nei secrets di Replit:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

### Credenziali Opzionali
Puoi aggiungere anche (non obbligatorie, hanno fallback automatico):
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Default: `{projectId}.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Default: `{projectId}.firebasestorage.app`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

---

## 5. Creare l'Admin User

Dopo aver creato il tuo account utente (registrandoti sul sito), devi aggiungerti come admin nel database PostgreSQL.

1. Registrati sul sito con la tua email
2. Prendi nota del tuo Firebase UID (lo trovi nella Console Firebase > Authentication > Users)
3. Esegui questa query nel database PostgreSQL:

```sql
INSERT INTO "AdminUser" (id, email, "displayName", role, permissions, active, "createdAt", "updatedAt")
VALUES (
  'TUO_FIREBASE_UID',
  'tua@email.com',
  'Tuo Nome',
  'super_admin',
  '["all"]',
  true,
  NOW(),
  NOW()
);
```

---

## 6. Struttura Firestore Collections

Il progetto utilizza le seguenti collections in Firestore:

| Collection | Descrizione |
|------------|-------------|
| `cities` | Città e destinazioni |
| `experiences` | Esperienze e attività |
| `travels` | Pacchetti viaggio |
| `services` | Servizi aggiuntivi |
| `blog` | Articoli del blog |
| `vehicles` | Veicoli per noleggio |
| `instagramVideos` | Video Instagram |
| `siteSettings` | Impostazioni sito |
| `menuItems` | Voci di menu |
| `testimonials` | Testimonianze |
| `faq` | Domande frequenti |
| `users` | Profili utente |
| `bookings` | Prenotazioni |
| `wishlist` | Liste desideri |
| `friendCodes` | Codici amico |
| `friendships` | Amicizie |
| `friendNotifications` | Notifiche amici |
| `customTripRequests` | Richieste viaggio personalizzate |

---

## Note Importanti

- **Tutte le operazioni di scrittura admin** vengono gestite tramite Firebase Admin SDK (server-side)
- **Gli utenti normali** possono solo leggere i contenuti pubblici e gestire i propri dati
- **I dati principali** (esperienze, viaggi, servizi, blog) sono anche salvati in PostgreSQL tramite Prisma
