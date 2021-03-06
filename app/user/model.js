import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('string'),
  fullName: DS.attr('string'),
  company: DS.attr('string'),
  phone: DS.attr('string'),
  bio: DS.attr('string'),
  dietaryRequirements: DS.attr('string'),
  attendingDinner: DS.attr('boolean'),
  countryOfResidence: DS.attr('string'),
  yearOfBirth: DS.attr('number'),
  authLevel: DS.attr('string'),
  twitter: DS.attr('string'),
  github: DS.attr('string'),
  linkedin: DS.attr('string'),
  photo: DS.attr('string'),
  talks: DS.hasMany('talk', { async: true }),
  tickets: DS.hasMany('ticket', { async: true }),

  photoUrl: function() {
    if (this.get('photo')) {
      return '/uploads/' + this.get('photo');
    }
  }.property('photo')
});
