Emberfest.ScheduleEvent = DS.Model.extend({
    title: DS.attr('string'),
    timeslot: DS.attr('string'),
    talk:  DS.belongsTo('talk', {async: true})
});