<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    #the-canvas {
        border: 1px solid black;
        direction: ltr;
    }
</style>
<body>

<canvas id="the-canvas"></canvas>
{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.13/pdf.min.js"></script>--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js"></script>
<script type="text/javascript">


    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    var url = 'http://127.0.0.1:8000/assets/pdftest.pdf';

    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];

    // The workerSrc property shall be specified.
    // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

    // Asynchronous download of PDF
    console.log(pdfjsLib.getDocument(url));
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');

        for (let i = 1; i <= pdf.numPages; i++) {
            // Get the PDF page
            pdf.getPage(i).then(function (page) {
                // Parse the page content
                page.getTextContent().then(function (textContent) {
                    // Iterate through the page text content to remove the watermark
                    for (let j = 0; j < textContent.items.length; j++) {
                        // console.log(textContent.items[j].str)
                        if (textContent.items[j].str === 'SAMPLE WATERMARK Mon May 08 2023 10:23:15 GMT+0530 (India Standard Time)') {
                            console.log("in.....")
                            textContent.items.splice(j, 1); // remove the watermark text
                        }
                        // console.log("out.....")
                    }
                    console.log(textContent)
                    // Render the modified page onto a canvas
                    const viewport = page.getViewport({scale: 1});
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                        textContent: textContent
                    };
                    page.render(renderContext).promise.then(function () {
                        // Replace the original PDF page with the modified page
                        const pdfPage = pdf.getPage(i);
                        pdfPage.then(function (newPage) {
                            newPage._pageInfo.view = {
                                transform: [1, 0, 0, 1, 0, 0],
                                viewBox: [0, 0, viewport.width, viewport.height],
                                presentationRect: [0, 0, viewport.width, viewport.height],
                                presentationTransform: [1, 0, 0, 1, 0, 0]
                            };
                            newPage._pageInfo.rotate = 0;
                            newPage._pageInfo.userUnit = 1.0;
                            newPage._pageInfo.width = viewport.width;
                            newPage._pageInfo.height = viewport.height;
                            newPage._pageInfo.mediaBox = [0, 0, viewport.width, viewport.height];
                            newPage._pageInfo.cropBox = [0, 0, viewport.width, viewport.height];
                            const replacementPage = new pdfjsLib.PDFPageProxy(
                                pdf,
                                newPage._pageIndex,
                                newPage._ref,
                                newPage._pageInfo
                            );
                            pdf._pages[i - 1] = replacementPage;
                        });
                    });
                });
            });
        }
    });

    // // Fetch the first page
    // var pageNumber = 1;
    // pdf.getPage(pageNumber).then(function (page) {
    //     console.log('Page loaded');
    //
    //     var scale = 1.5;
    //     var viewport = page.getViewport({scale: scale});
    //
    //     // Prepare canvas using PDF page dimensions
    //     var canvas = document.getElementById('the-canvas');
    //     var context = canvas.getContext('2d');
    //     canvas.height = viewport.height;
    //     canvas.width = viewport.width;
    //
    //     // Render PDF page into canvas context
    //     var renderContext = {
    //         canvasContext: context,
    //         viewport: viewport
    //     };
    //     var renderTask = page.render(renderContext);
    //     renderTask.promise.then(function () {
    //         console.log('Page rendered');
    //     });
    //
    //
    // });


    // }, function (reason) {
    //     // PDF loading error
    //     console.error(reason);
    // });
</script>
</body>
</html>
