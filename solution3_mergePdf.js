(async () => {
    console.time('merging');
    try{
        const {default: PDFMerger} = await import('pdf-merger-js');
        const merger =  new PDFMerger();
        await merger.add('GHR Licence to Reside (24.25).pdf');
        await merger.add('OL-3158086.pdf');
        await merger.save('merged.pdf');
    }catch(e){
        console.error(e);
    }
    console.timeEnd('merging');
})()