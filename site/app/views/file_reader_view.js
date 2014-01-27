Emberfest.FileReaderView = Ember.View.extend({
    tagName: 'input',
    attributeBindings: ['type', 'id'],
    type: 'file',

    change: function(event) {
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
        console.log('fileObserver:');
        console.log(this.get('file'));
    }.observes('file')
});