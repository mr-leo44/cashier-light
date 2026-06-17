# TODO - MVP Gestion de Caisse Scolaire

## Contexte

Application de gestion de caisse scolaire développée avec :

* Backend : NestJS + TypeScript
* ORM : Prisma
* Base de données : PostgreSQL
* Génération PDF : pdf-lib
* Architecture modulaire
* Sans authentification
* Sans gestion des utilisateurs (MVP)

---

# V1.0 - Initialisation du projet

## Backend

* [x] Créer le projet NestJS
* [x] Configurer TypeScript
* [x] Installer PostgreSQL
* [x] Installer Prisma
* [x] Configurer Prisma Client
* [x] Configurer les variables d'environnement
* [ ] Configurer ValidationPipe globale
* [ ] Configurer Exception Filter global
* [ ] Configurer Logger NestJS

## Structure du projet

* [x] Module Prisma
* [ ] Module SchoolYear
* [ ] Module Receipt
* [ ] Module Report

---

# V1.1 - Base de données

## Enum Currency

* [ ] USD
* [ ] CDF

## Enum FeeType

Cfr la liste à fournir

---

## Table SchoolYear

### Colonnes

* [ ] id
* [ ] label
* [ ] isCurrent
* [ ] createdAt
* [ ] updatedAt

### Contraintes

* [ ] label unique
* [ ] Une seule année scolaire active

### Exemple

```text
2024-2025
2025-2026
2026-2027
```

---

## Table Receipt

### Colonnes

* [ ] id
* [ ] receiptNumber
* [ ] studentName
* [ ] feeType
* [ ] currency
* [ ] amount
* [ ] cashierName
* [ ] schoolYearId
* [ ] createdAt
* [ ] updatedAt

### Contraintes

* [ ] receiptNumber unique
* [ ] amount > 0
* [ ] schoolYear obligatoire

---

# V1.2 - Gestion des Années Scolaires

## Création

* [ ] POST /school-years

### Payload

```json
{
  "label": "2025-2026"
}
```

---

## Consultation

* [ ] GET /school-years

---

## Année active

* [ ] GET /school-years/current

---

## Activation

* [ ] PATCH /school-years//set-current

### Règles métier

* [ ] Désactiver automatiquement l'ancienne année active
* [ ] Garantir une seule année active

---

## Suppression

* [ ] DELETE /school-years/

### Validation

* [ ] Refuser la suppression si des reçus existent

---

# V1.3 - Génération Automatique du Numéro de Reçu

## Service dédié

ReceiptNumberGeneratorService

### Format

```text
REC-2025-2026-000001
REC-2025-2026-000002
REC-2025-2026-000003
```

### Règles

* [ ] Numéro unique
* [ ] Séquence par année scolaire
* [ ] Gestion de concurrence Prisma Transaction

---

# V1.4 - Gestion des Reçus

## Création d'un encaissement

### Endpoint

* [ ] POST /receipts

### Payload

```json
{
  "studentName": "Jean Mukendi",
  "feeType": "MINERVAL",
  "currency": "USD",
  "amount": 150,
  "cashierName": "Lionel",
  "schoolYearId": "uuid"
}
```

### Traitements

* [ ] Vérifier l'existence de l'année scolaire
* [ ] Générer le numéro de reçu
* [ ] Créer le reçu
* [ ] Retourner les données

---

## Liste des reçus

* [ ] GET /receipts

### Filtres

* [ ] Année scolaire
* [ ] Nom de l'élève
* [ ] Type de frais
* [ ] Date début
* [ ] Date fin

---

## Détail d'un reçu

* [ ] GET /receipts/

---

## Modification

* [ ] PATCH /receipts/

### Restrictions

* [ ] receiptNumber non modifiable

---

## Suppression

* [ ] DELETE /receipts/

---

# V1.5 - Impression des Reçus

## Génération PDF

### Bibliothèque

* [ ] pdf-lib

### Contenu

* [ ] Nom de l'école
* [ ] Numéro du reçu
* [ ] Année scolaire
* [ ] Nom de l'élève
* [ ] Type de frais
* [ ] Devise
* [ ] Montant
* [ ] Date d'encaissement
* [ ] Nom du caissier

---

## Endpoint

* [ ] GET /receipts//print

### Résultat

```pdf
Reçu PDF téléchargeable
```

---

# V1.6 - Rapport Journalier

## Consultation

* [ ] GET /reports/daily

### Paramètre

```http
GET /reports/daily?date=2026-06-16
```

---

## Informations retournées

### Détails

* [ ] Numéro reçu
* [ ] Élève
* [ ] Type de frais
* [ ] Devise
* [ ] Montant

### Totaux

* [ ] Total USD
* [ ] Total CDF
* [ ] Nombre d'encaissements

---

## Impression PDF

* [ ] GET /reports/daily/print

---

# V1.7 - Rapport Annuel

## Consultation

* [ ] GET /reports/school-year/

### Informations

* [ ] Nombre total de reçus
* [ ] Total USD
* [ ] Total CDF
* [ ] Répartition par type de frais

---

## Impression PDF

* [ ] GET /reports/school-year//print

---

# V1.8 - Frontend

## Dashboard

### Cartes statistiques

* [ ] Année scolaire active
* [ ] Nombre de reçus du jour
* [ ] Total USD du jour
* [ ] Total CDF du jour

---

## Gestion des années scolaires

* [ ] Liste
* [ ] Création
* [ ] Activation

---

## Gestion des reçus

### Formulaire

* [ ] Création d'un reçu

### Tableau

* [ ] Liste des reçus
* [ ] Recherche
* [ ] Filtres

### Actions

* [ ] Voir
* [ ] Modifier
* [ ] Supprimer
* [ ] Imprimer

---

## Gestion des rapports

### Rapport journalier

* [ ] Consultation
* [ ] Impression PDF

### Rapport annuel

* [ ] Consultation
* [ ] Impression PDF

---

# V1.9 - Sauvegarde

## Export PostgreSQL

* [ ] Génération du dump SQL

### Exemple

```text
backup_2026_06_16.sql
```

---

## Archivage

* [ ] Téléchargement manuel du dump
* [ ] Upload manuel vers Google Drive

---

# Critères de Validation du MVP

* [ ] Une année scolaire peut être créée
* [ ] Une année scolaire peut être activée
* [ ] Un reçu peut être enregistré
* [ ] Le numéro de reçu est généré automatiquement
* [ ] Le reçu peut être imprimé
* [ ] Les reçus peuvent être recherchés
* [ ] Le rapport journalier peut être imprimé
* [ ] Le rapport annuel peut être imprimé
* [ ] Toutes les données sont stockées dans PostgreSQL

---

# Évolutions Futures (V2)

* [ ] Authentification
* [ ] Gestion des utilisateurs
* [ ] Audit Log PostgreSQL
* [ ] Historique des modifications
* [ ] Multi-caissiers
* [ ] Sauvegarde automatique Google Drive
* [ ] Export Excel
* [ ] Gestion des élèves
* [ ] Tableau de bord avancé
* [ ] Multi-écoles
* [ ] Multi-sites
* [ ] API mobile Flutter
