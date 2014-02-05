Emberfest.FileReaderView = Ember.View.extend({
    tagName: 'input',
    attributeBindings: ['type', 'id', 'name'],
    type: 'file',

    /*change: function(event) {
        console.log('FileReaderView change!');

        var view = this;
        var reader = new FileReader();
        var fileAsText = null;

        console.log('reader: ' + reader);

        var f = event.target.files[0];

        reader.onload = function(readerEvent) {
            console.log('ONLOAD');

            view.set('file', readerEvent.target.result);
        };

        reader.readAsText(f);
    },

    fileObserver: function() {
        var fileContent = this.get('file');

        if (fileContent) {
            console.log('fileObserver:');

            var data = new FormData();
            data.append("photo", fileContent);

            $.ajax({
                url: '/json/uploadPhoto',
                data: data,
                dataType: 'json',
                type: 'POST',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function (retval) {
                    console.log('retval:');
                    console.log(retval);
                }
            });
        }
    }.observes('file'),*/


    didInsertElement: function() {
        console.log('FileReaderView didInsertElement');

        var view = this;
        Ember.run.schedule("afterRender", function() {

            $('#' + view.get('elementId')).fileupload({
                url: '/json/uploadPhoto/',
                dataType: 'json',
                done: function (e, data) {
                    console.log('done');
                    console.log(data);
                    console.log(data.result.filename);

                    view.set('controller.user.photo', data.result.filename);
                },
                progressall: function (e, data) {
                    console.log('progressall');
                    console.log(data);
                    /*var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );*/
                }
            }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');
        });
    }
});