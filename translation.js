const fs = require('fs');
const pdfParse = require('pdf-parse');
const translate = require('@vitalets/google-translate-api');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

(async () => {
    console.time('translating');
    try{
        const file = fs.readFileSync('./demo_123.pdf');
        const { text: parsedText } = await pdfParse(file);
        const { text: translatedText} = await translate.translate(parsedText, { from: 'ko', to: 'en' });

        // create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        page.drawText('Hello, this is a PDF generated using fs.writeFileSync!');

        // Serialize the PDFDocument to bytes
        const pdfBytes =  await pdfDoc.save();
        fs.writeFileSync('./translated.pdf', pdfBytes);
    }catch(error){
        console.error(error);
    }
    console.timeEnd('translating');
})()
