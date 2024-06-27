const fs = require('fs');
const pdfParse = require('pdf-parse');
const translate = require('@vitalets/google-translate-api');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fontKit = require('@pdf-lib/fontKit');

(async () => {
    console.time('translating');
    try{
        const file = fs.readFileSync('./demo_123.pdf');
        const { text: parsedText } = await pdfParse(file);
        const { text: translatedText} = await translate.translate(parsedText, { from: 'ko', to: 'en' });

        const pdfDoc = await PDFDocument.create();


        const fontBytes = fs.readFileSync('NotoSans-Regular.ttf');
        pdfDoc.registerFontkit(fontKit)
        const customFont = await pdfDoc.embedFont(fontBytes);

        const fontSize = 12;
        const pageMargin = 20;
        let page = pdfDoc.addPage();
        const { width, height} = page.getSize();

        const lines = translatedText.split('\n');
        let yPosition = height - pageMargin;

        for(let line of lines){
            const {x, y, text, size, font, color}  = { x:pageMargin, y: yPosition, text: line, size: fontSize, font: customFont, color: rgb(0,0,0)};
            page.drawText(text, {x, y, size, font, color});
            yPosition -= fontSize + 4;
            if(yPosition < pageMargin){
                page = pdfDoc.addPage();
                yPosition = height - pageMargin;
            }
        }

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('./translated.pdf', pdfBytes);

        // // create a new PDF document
        // const pdfDoc = await PDFDocument.create();
        // const page = pdfDoc.addPage();
        // page.drawText('Hello, this is a PDF generated using fs.writeFileSync!');
        //
        // // Serialize the PDFDocument to bytes
        // const pdfBytes =  await pdfDoc.save();
        // fs.writeFileSync('./translated.pdf', pdfBytes);
    }catch(error){
        console.error(error);
    }finally {
        console.timeEnd('translating');
    }

})()
