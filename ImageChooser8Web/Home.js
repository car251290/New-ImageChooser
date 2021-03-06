

(function () {
    // The initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            //scrollMenu();
            //cardSelection();
            // If not using Word 2016, use fallback logic.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                console.log('Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.');
            }

            // Do something that is only available via the new APIs
            //displayimage();
            //Selection of image, insert image
            $('.row').on('click', function (event) {
                var image = event.currentTarget.querySelector("image");
                var src = image.src;

                //to insert the image from the function!
                toDataURL(src, function (dataUrl) {
                    insertImages(dataUrl);
                });
            });
            //function 2 to inser the image
            $('.row').on('click', function (event) {
                var image = event.currentTarget.querySelector("img");
                var src = image.src;
                console.log("insert image");
                //if this the image of the Image

                //to insert the image from the function!
                toDataURL(src, function (dataUrl) {
                    insertImages(dataUrl);

                });
            });

        });

    };
  
    //Function for display the imagine in the addin
    function displayimage() {
        //array of Strings of objects to display the image.
        var Technology = ["NewmontGoldenGiant_Kristin Pouw.jpg", "NewmontGoldenGiant_Tom Sharp.jpg", "Veladero2017 (3).jpg", "shade.jpg", "Navachab.jpg", "Raining.jpg", "Waterfall.jpg", "Waterfall.jpg", "Waterfall.jpg",
            "freedownload.jpg", "JAG _Landscape.jpg", "Raining.jpg", "Tschudi mine.jpg", "altstadt.jpg", "Raining.jpg", "altstadt.jpg", "Raining.jpg", "Navachab.jpg", "Navachab.jpg", "Waterfall.jpg"];
        //for look for the image.
        for (var i = 0; i < Technology.length; i++) {
            var image = Technology[i];
            //add-in container for display the imagine with the url and the class html addin 
            $('.row').append(
                '<div class="row">' +
                '<a href="#"><img src="Images/Veladero2017 (3).jpg" class="filterDiv Work" alt="Custom" width="110" height="40"></a>'+
                 '<a href="#"><img src="Images/JAG _Landscape.jpg" class="filterDiv Yellow" alt="Custom"></a>' +
                '</div>'
            );
            //forlook for the image.
            $(".row").show();
        }
        console.log("images to search it");
    }

    // toDataUrl fuction to get the date of the image
    function toDataURL(url, callback) {
        //method for the request of the data
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result.split(',')[1]);
                callback(getSelection(insertImages))
            }
            reader.readAsDataURL(xhr.response);
        };
        //to open the url and get the data of the image selected
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
        console.log('toDataURL');
    }
    // the function to get the database of the image.
    function insertImages(base64) {
        Word.run(function (context) {
            // Queue a command to get the current selection.
            // Create a proxy range object for the selection.
            var range = context.document.getSelection();
            // Queue a command to replace the selected text.
            range.insertInlinePictureFromBase64(base64, Word.InsertLocation.replace);
            // Synchronize the document state by executing the queued commands,
            // and return a promise to indicate task completion.
            return context.sync().then(function () {
                console.log('Added an image.');
            });
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }

})();