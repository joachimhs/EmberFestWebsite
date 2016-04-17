import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'section',
    classNames: ['scroll-fire'],
    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },
    _setup() {
		var options = [
            {
                selector: '#speakers', 
                offset: 150,
                callback: 'Materialize.showStaggeredList("#speakers")'
            }	    
	  	];
	  	Materialize.scrollFire(options);      
    }
});
