Emberfest.User = DS.Model.extend({
    userId: DS.attr('string'),
    fullName: DS.attr('string'),
    company: DS.attr('string'),
    phone: DS.attr('string'),
    dietaryRequirements: DS.attr('string'),
    attendingDinner: DS.attr('boolean'),
    countryOfResidence: DS.attr('string'),
    yearOfBirth: DS.attr('number'),
    authLevel: DS.attr('string'),
    talks: DS.hasMany('talk', { async: true })
});


/*Emberfest.User = Emberfest.Model.extend({
 ownsTalk: function (talkId) {
 var hasTalk = false;
 var userTalks = this.get('talks');
 userTalks.forEach(function (talk) {
 if (talk === talkdId) {
 hasTalk = true;
 }
 });

 return hasTalk;
 }
 });

 Emberfest.User.reopenClass({
 collection: Ember.A(),

 find: function (id) {
 return Emberfest.Model.find(id, Emberfest.User);
 },

 findAll: function () {
 return Emberfest.Model.findAll('/user', Emberfest.User, "users");
 },

 createRecord: function (model) {
 Emberfest.Model.createRecord('/user', Emberfest.User, model);
 },

 updateRecord: function (model) {
 Emberfest.Model.updateRecord("/user", Emberfest.User, model);
 },

 delete: function (id) {
 Emberfest.Model.delete('/user', Emberfest.User, id);
 }
 });*/