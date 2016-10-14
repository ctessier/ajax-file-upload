jQuery(function($) {

    // Variable to store your files
    var files;

    var form = $('form');
    var messageBox = $('#message');

    // Grab the files and set them to our variable
    function prepareUpload(event) {
        files = event.target.files;
    }

    // Add events
    $('input[type=file]').on('change', prepareUpload);

    form.on('submit', uploadFiles);

    // Catch the form submit and upload the files
    function uploadFiles(event) {
        event.stopPropagation();
        event.preventDefault();

        messageBox.html('Uploading...');

        // Create a formdata object and add the files
        var data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR) {
                if(typeof data.error === 'undefined') {
                    messageBox.html(data.message);
                } else {
                    messageBox.html('Some errors occured : ' + data.message);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                messageBox.html('Some errors occured : ' + textStatus);
            }
        });
    }
});
