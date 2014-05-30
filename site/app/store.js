Emberfest.Store = DS.Store.extend({
    adapter:  "Emberfest.Adapter"
});

DS.RESTAdapter.reopen({
    namespace: 'json'
});

Emberfest.Adapter = DS.RESTAdapter.extend({
    defaultSerializer: "Emberfest/application"
});

Emberfest.ApplicationSerializer = DS.RESTSerializer.extend({});

Emberfest.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});

Emberfest.PageAdapter = Emberfest.Adapter.extend({
    namespace: 'json/data'
});

Emberfest.AcceptedTalkAdapter = Emberfest.Adapter.extend({
    namespace: 'json/data'
});

Emberfest.ScheduleDayAdapter = Emberfest.Adapter.extend({
    namespace: 'json/data'
});

Emberfest.ScheduleTrackAdapter = Emberfest.Adapter.extend({
    namespace: 'json/data'
});

Emberfest.ScheduleEventAdapter = Emberfest.Adapter.extend({
    namespace: 'json/data'
});