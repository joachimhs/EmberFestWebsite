Emberfest.User = DS.Model.extend({
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
    talks: DS.hasMany('talk', { async: true })
});