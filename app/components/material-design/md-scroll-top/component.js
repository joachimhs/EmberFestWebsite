import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    classNames: ['scroll-top'],
    
    didInsertElement() {
        this._super(...arguments);       
    },
    click: function() {
        Ember.$('html, body').animate({scrollTop:0},2000);        
    }    
});
