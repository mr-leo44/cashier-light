import { prisma } from '../src/prisma/prisma-client';

async function main() {
  const feeTypes = [
    // Recettes courantes
    { code: '10000', name: 'FRAIS SCOLAIRES' },
    { code: '10001', name: 'INSCRIPTION' },
    { code: '10002', name: 'FOURNITURES SCOLAIRES' },
    { code: '10003', name: 'TABLIERS' },
    { code: '10004', name: 'UNIFORMES' },
    { code: '10005', name: 'MACARON' },
    { code: '10006', name: 'PARASCOLAIRES' },
    { code: '10007', name: 'AUTRES RECETTES' },
    { code: '10008', name: 'ACTIVITÉS DIVERSES' },
    { code: '10009', name: 'RECETTES EXTRAORDINAIRES' },

    // Comptes suspens (issus de ton image)
    { code: '26000', name: 'SUSPENS FRAIS SCOLAIRES' },
    { code: '26001', name: 'SUSPENS CONFIRMATION' },
    { code: '26002', name: 'SUSPENS ACT INSCRIPTION' },
    { code: '26003', name: 'SUSPENS TABLIER' },
    { code: '26004', name: 'SUSPENS MACARON' },
    { code: '26005', name: 'SUSPENS FOURNITURES SCOLAIRES' },
    { code: '26006', name: 'SUSPENS FRAIS ETAT' },
    { code: '26007', name: 'SUSPENS UNIFORME' },
    { code: '26008', name: 'SUSPENS ACTE D INSCRIPTION' },
    { code: '26009', name: 'SUSPENS CONFECTION UNIFORME' },
    { code: '26010', name: 'SUSPENS CONFECTION TABLIER' },
    { code: '26011', name: 'SUSPENS DEPENSES EXERCICE AVENIR' },
  ];

  for (const feeType of feeTypes) {
    await prisma.feeType.upsert({
      where: {
        code: feeType.code,
      },
      update: {
        name: feeType.name,
      },
      create: feeType,
    });
  }

  console.log(`✅ ${feeTypes.length} types de frais importés`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
