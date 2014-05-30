Emberfest.ScheduleTrack = DS.Model.extend({
    title: DS.attr('string'),
    trackNumber: DS.attr('number'),
    events: DS.hasMany('scheduleEvent', {async: true})
});