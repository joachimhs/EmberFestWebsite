ECE.Model = Ember.Object.extend({

});

ECE.Model.reopenClass({
    collection: Ember.A(),

    find: function(id, type) {
        console.log('find: ' + type + " id: " + id);
        var foundItem = this.contentArrayContains(id, type);

        if (!foundItem) {
            foundItem = type.create({ id: id, isLoaded: false});
            Ember.get(type, 'collection').pushObject(foundItem);
        }

        return foundItem;
    },

    contentArrayContains: function(id, type) {
        var contains = null;

        Ember.get(type, 'collection').forEach(function(item) {
            if (item.get('id') === id) {
                contains = item;
            }
        });

        return contains;
    },

    findAll: function(url, type, key) {
        console.log('findAll: ' + type + " " + url + " " + key);
        var result = [];

        var collection = this;
        $.getJSON(url, function(data) {
            $.each(data[key], function(i, row) {
                var page = collection.contentArrayContains(row.id, type);
                if (!page) {
                    page =  type.create();
                    Ember.get(type, 'collection').pushObject(page);
                }
                page.setProperties(row);
                page.set('isLoaded', true);
                result.pushObject(page);
            });
        });

        return Ember.get(type, 'collection');
    }
});

ECE.Page = ECE.Model.extend({
    childrenPages: function() {
        var children = [];
        if (this.get('childrenPageIds')) {
            console.log('childrenPages: ' + this.get('childrenPageIds'));

            this.get('childrenPageIds').forEach(function(childPage) {
                children.pushObject(ECE.Page.find(childPage));
            });
        }
        return children;
    }.property('childrenPageIds')
});

ECE.Page.reopenClass({
    find: function(id) {
        return ECE.Model.find(id, ECE.Page);
    },

    findAll: function() {
        return ECE.Model.findAll('/pages', ECE.Page, 'pages');
    }
});