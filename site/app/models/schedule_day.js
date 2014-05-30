Emberfest.ScheduleDay = DS.Model.extend({
    title: DS.attr('string'),
    sortIndex: DS.attr('number'),
    tracks: DS.hasMany('scheduleTrack', {async: true}),

    tableStyle: function() {
        if (this.get('tracks.length') == 3) {
            return "tripleTable";
        } else if (this.get('tracks.length') == 3) {
            return "doubleTable";
        }

        return "singleTable";
    }.property('tracks.length')
});