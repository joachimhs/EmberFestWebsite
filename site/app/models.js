Emberfest.Model = Ember.Object.extend();

Emberfest.Model.reopenClass({
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

Emberfest.TopPage = Emberfest.Model.extend({
    subPages: function() {
        var subPages = Ember.A();
        var pages = this.get('pages');
        if (pages) {
            pages.forEach(function(page) {
                subPages.pushObject(Emberfest.Page.find(page));
            });
        }

        return subPages;
    }.property('pages', 'pages.length')
});

Emberfest.TopPage.reopenClass({
    collection: Ember.A(),
    find: function(id) {
        return Emberfest.Model.find(id, Emberfest.TopPage);
    },

    findAll: function() {
        return Emberfest.Model.findAll('/topPages', Emberfest.TopPage, 'topPages');
    }
});

Emberfest.Page = Emberfest.Model.extend({
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

Emberfest.Page.reopenClass({
    collection: Ember.A(),
    find: function(id) {
        return Emberfest.Model.find(id, Emberfest.Page);
    },

    findAll: function() {
        return Emberfest.Model.findAll('/pages', Emberfest.Page, 'pages');
    }
});

Emberfest.Talk = Emberfest.Model.extend({

});

Emberfest.Talk.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return Emberfest.Model.find(id, Emberfest.Talk);
    },

    findAll: function() {
        return Emberfest.Model.findAll('/abstracts', Emberfest.Talk, 'abstracts');
    },

    createRecord: function(model) {
        Emberfest.Model.createRecord('/abstracts', Emberfest.Talk, model);
    },

    updateRecord: function(model) {
        Emberfest.Model.updateRecord("/abstracts", Emberfest.Talk, model);
    },

    delete: function(id) {
        Emberfest.Model.delete('/abstracts', Emberfest.Talk, id);
    }
});

Emberfest.User = Emberfest.Model.extend({
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

Emberfest.User.reopenClass({
   collection: Ember.A(),

    find: function(id) {
        return Emberfest.Model.find(id, Emberfest.User);
    },

    findAll: function() {
        return Emberfest.Model.findAll('/user', Emberfest.User, "users");
    },

    createRecord: function(model) {
        Emberfest.Model.createRecord('/user', Emberfest.User, model);
    },

    updateRecord: function(model) {
        Emberfest.Model.updateRecord("/user", Emberfest.User, model);
    },

    delete: function(id) {
        Emberfest.Model.delete('/user', Emberfest.User, id);
    }
});