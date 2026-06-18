import { Injectable, NotFoundException } from '@nestjs/common';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { PrismaService } from '../../prisma/prisma.service';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

@Injectable()
export class ReceiptPdfService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(receiptId: string): Promise<Buffer> {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id: receiptId },
      include: {
        schoolYear: true,
        feeType: true,
      },
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text: string, x: number, y: number, size = 12) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // HEADER
    drawText('REÇU DE PAIEMENT', 200, 780, 18);

    // INFOS ÉCOLE (placeholder)
    drawText('École: COMPLEXE SCOLAIRE NOTRE DAME DE FATIMA', 50, 740);

    // RECEIPT INFO
    drawText(`N°: ${receipt.receiptNumber}`, 50, 700);
    drawText(`Année scolaire: ${receipt.schoolYear.label}`, 50, 680);

    // STUDENT INFO
    drawText(`Élève: ${receipt.studentName}`, 50, 640);

    // PAYMENT INFO
    drawText(`Type frais: ${receipt.feeType.name}`, 50, 600);
    drawText(`Montant: ${receipt.amount} ${receipt.currency}`, 50, 580);

    drawText(`Caissier: ${receipt.cashierName}`, 50, 540);

    const formattedDate = dayjs(receipt.paymentDate)
      .locale('fr')
      .format('DD MMMM YYYY');

    drawText(`Date : ${formattedDate}`, 50, 520);
    // FOOTER
    drawText('Merci pour votre paiement', 180, 100, 12);

    const pdfBytes = await pdfDoc.save();

    return Buffer.from(pdfBytes);
  }
}
