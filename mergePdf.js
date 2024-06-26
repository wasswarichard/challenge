(async () => {
    console.time('merging');
    try{
        const {default: PDFMerger} = await import('pdf-merger-js');
        const merger =  new PDFMerger();
        await merger.add('demo_123.pdf');
        await merger.add('demo_123.pdf');
        await merger.save('merged.pdf');
    }catch(e){
        console.error(e);
    }
    console.timeEnd('merging');
})()