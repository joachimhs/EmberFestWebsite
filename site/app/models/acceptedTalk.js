Emberfest.AcceptedTalk = DS.Model.extend({
    talk: DS.belongsTo('talk', {async: true}),
    sortIndex: DS.attr('number')
});