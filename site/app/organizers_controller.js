Emberfest.OrganizersController = Ember.ArrayController.extend({
    init: function() {
        this._super();
        var organizers = [{
            id: '1',
            name: 'Joachim Haagen Skeie',
            bio: 'Joachim is the author of Ember.js in Action, and have been working with Ember.js for a long time. In fact, long enough to remember when the framework was still touted and developed to become SproutCore 2.0. Through his company, Haagen Software, he is working on revamping and bootstrapping the Open Source Application Monitoring tool EurekaJ, based on Ember.js. Due to the fact that there were few Ember.js related happenings in Europe, he started the incentive to get Ember Fest started and off the ground.' +
                'Through his company Haagen Software, Joachim works as an independent consultant and course instructor.',
            twitter: '@joachimhs',
            twitterUrl: 'http://www.twitter.com/joachimhs',
            location: 'Norway',
            imageUrl: '/images/placeholder.png'
        },{
            id: '2',
            name: 'Adam Hawkins',
            bio: "Adam is an active member in the Ruby and Ember communities. Just over a year ago, he made the decision to switch over his company's product to Ember.js. Since then he's been very active in Javascript community. He's primarily known for his work on Iridium (a Javascript application build tool) and around testing Javascript application. He's been travelling around Europe for the past year trying to get people interested in Ember, leveling up their Javascript, and contributing back to the local community where ever he is. He blogs at http://broadcastingadam.com.",
            twitter: '@twinturbo',
            twitterUrl: 'http://www.twitter.com/twinturbo',
            location: 'Germany',
            imageUrl: '/images/placeholder.png'
        },{
            id: '3',
            name: 'Paul Chavard',
            bio: 'Information about Paul will be coming up shortly!',
            twitter: '@tchak13',
            twitterUrl: 'http://www.twitter.com/tchak13',
            location: 'France',
            imageUrl: '/images/placeholder.png'
        },{
            id: '4',
            name: 'Jakub Arnold',
            bio: "Jakub is an active member in the Ember.js community. He started out just by helping people on IRC in the early days when Ember wasn't yet so popular. He's known among the community mostly for his blog http://darthdeus.github.io/ where he explains different parts of the framework. He works as a consultant at http://sensible.io.",
            twitter: '@darthdeus',
            twitterUrl: 'http://www.twitter.com/darthdeus',
            location: 'Czech Republic',
            imageUrl: '/images/placeholder.png'
        }]

        this.set('content', organizers);
    }
});