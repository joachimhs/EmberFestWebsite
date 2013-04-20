ECE.Model = Ember.Object.extend();

ECE.Model.reopenClass({
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

        var collection = this;
        $.getJSON(url, function(data) {
            $.each(data[key], function(i, row) {
                var item = collection.contentArrayContains(row.id, type);
                if (!item) {
                    item =  type.create();
                    Ember.get(type, 'collection').pushObject(item);
                }
                item.setProperties(row);
                item.set('isLoaded', true);
                item.set('isError', false);
            });
        });

        return Ember.get(type, 'collection');
    },

    delete: function(url, type, id) {
        console.log('delete: ' + type + " " + id);
        var collection = this;
        $.ajax({
            type: 'DELETE',
            url: url + "/" + id,
            success: function(res, status, xhr) {
                if(res.deleted) {
                    var item = collection.contentArrayContains(id, type);
                    if (item) {
                        Ember.get(type, 'collection').removeObject(item);
                    }
                }
            },
            error: function(xhr, status, err) { alert('Unable to delete: ' + status + " :: " + err); }
        });
    },

    createRecord: function(url, type, model) {
        console.log('save: ' + type + " " + model.get('id'));
        var collection = this;
        model.set('isSaving', true);
        $.ajax({
            type: "PUT",
            url: url,
            data: JSON.stringify(model),
            success: function(res, status, xhr) {
                if (res.submitted) {
                    Ember.get(type, 'collection').pushObject(model);
                    model.set('isSaving', false);
                } else {
                    model.set('isError', true);
                }
            },
            error: function(xhr, status, err) { model.set('isError', false);  }
        });
    },

    updateRecord: function(url, type, model) {
        console.log('update: ' + type + " " + model.get('id'));
        var collection = this;
        model.set('isSaving', true);
        console.log(JSON.stringify(model));
        $.ajax({
            type: "PUT",
            url: url,
            data: JSON.stringify(model),
            success: function(res, status, xhr) {
                if (res.id) {
                    model.set('isSaving', false);
                    model.setProperties(res);
                } else {
                    model.set('isError', true);
                }
            },
            error: function(xhr, status, err) { model.set('isError', false);  }
        })
    }
});

ECE.Page = ECE.Model.extend({
    isLinkToTalks: function() {
        return this.get('pageRoute') === 'talks'
    }.property('pageRoute'),

    isLinkToCfp: function() {
        return this.get('pageRoute') === 'callForSpeakers'
    }.property('pageRoute'),

    isLinkToHome: function() {
        return this.get('pageRoute') === 'index'
    }.property('pageRoute')
});

ECE.Page.reopenClass({
    collection: Ember.A(),
    find: function(id) {
        return ECE.Model.find(id, ECE.Page);
    },

    findAll: function() {
        return ECE.Model.findAll('/pages', ECE.Page, 'pages');
    }
});

ECE.Talk = ECE.Model.extend({

});

ECE.Talk.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return ECE.Model.find(id, ECE.Talk);
    },

    findAll: function() {
        return ECE.Model.findAll('/abstracts', ECE.Talk, 'abstracts');
    },

    createRecord: function(model) {
        ECE.Model.createRecord('/abstracts', ECE.Talk, model);
    },

    updateRecord: function(model) {
        ECE.Model.updateRecord("/abstracts", ECE.Talk, model);
    },

    delete: function(id) {
        ECE.Model.delete('/abstracts', ECE.Talk, id);
    }
});

ECE.User = ECE.Model.extend({
    ownsTalk: function(talkId) {
        var hasTalk = false;
        var userTalks = this.get('talks');
        userTalks.forEach(function(talk) {
            if (talk === talkdId) {
                hasTalk = true;
            }
        });

        return hasTalk;
    }
});

ECE.User.reopenClass({
   collection: Ember.A(),

    find: function(id) {
        return ECE.Model.find(id, ECE.User);
    },

    findAll: function() {
        return ECE.Model.findAll('/user', ECE.User, "users");
    },

    createRecord: function(model) {
        ECE.Model.createRecord('/user', ECE.User, model);
    },

    updateRecord: function(model) {
        ECE.Model.updateRecord("/user", ECE.User, model);
    },

    delete: function(id) {
        ECE.Model.delete('/user', ECE.User, id);
    }
});