(async () => {
    try{
        console.time('merging');
        const {default: PDFMerger} = await import('pdf-merger-js');
        const merger =  new PDFMerger();
        await merger.add('PDFA.pdf');
        await merger.add('PDFB.pdf');
        await merger.save('merged.pdf');
    }catch(e){
        console.error(e);
    }finally {
        console.timeEnd('merging');
    }

})()