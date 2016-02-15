Emberfest.Talk = DS.Model.extend({
    title: DS.attr('string'),
    talkAbstract: DS.attr('string'),
    talkType: DS.attr('string'),
    topics: DS.attr('string'),
    outline: DS.attr('string'),
    participantRequirements: DS.attr('string'),
    comments: DS.attr('string'),
    talkSuggestedBy: DS.attr('string'),
    talkByBio: DS.attr('string'),
    talkByTwitter: DS.attr('string'),
    talkByLinkedin: DS.attr('string'),
    talkByGithub: DS.attr('string'),
    talkByPhoto: DS.attr('string'),
    talkBy: DS.attr('string'),
    talkIntendedAudience: DS.attr('string'),
    talkByLoggedInUser: DS.attr('boolean'),
    video: DS.attr('string'),

    talkShortAbstract: function() {
        return this.get('talkAbstract').substring(0,250) + " ... ";
    }.property('talkAbstract'),

    talkShortBio: function() {
        if (this.get('talkByBio')) {
            return this.get('talkByBio').substring(0,250) + " ... ";
        } else {
            return "";
        }

    }.property('talkAbstract'),

    photoUrl: function() {
        if (this.get('talkByPhoto')) {
            return '/uploads/' + this.get('talkByPhoto');
        }
    }.property('talkByPhoto'),

    twitterUrl: function() {
        var twitterUrl = null;

        if (this.get('talkByTwitter')) {
            if (this.get('talkByTwitter').startsWith('http')) {
                twitterUrl = this.get('talkByTwitter');
            } else {
                twitterUrl = "http://twitter.com/" + this.get('talkByTwitter');
            }
        }

        return twitterUrl;
    }.property('talkByTwitter'),

    linkedInUrl: function() {
        var linkedinUrl = null;

        if (this.get('talkByLinkedin')) {
            if (this.get('talkByLinkedin').startsWith('http')) {
                linkedinUrl = this.get('talkByLinkedin');
            } else {
                linkedinUrl = "http://www.linkedin.com/in/" + this.get('talkByLinkedin');
            }
        }

        return linkedinUrl;
    }.property('talkByLinkedin'),

    githubUrl: function() {
        var githubUrl = null;

        if (this.get('talkByGithub')) {
            if (this.get('talkByGithub').startsWith('http')) {
                githubUrl = this.get('talkByGithub');
            } else {
                githubUrl = "http://www.github.com/" + this.get('talkByGithub');
            }
        }

        return githubUrl;
    }.property('talkByGithub')
});
