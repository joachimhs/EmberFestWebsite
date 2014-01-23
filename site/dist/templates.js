Ember.TEMPLATES["admin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'tagName': ("li")
  },hashTypes:{'tagName': "STRING"},hashContexts:{'tagName': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "adminData", "data", options) : helperMissing.call(depth0, "link-to", "adminData", "data", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "data.id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n                ");
  return buffer;
  }

  data.buffer.push("<h2>Ember Fest Administration</h2>\n\n<div class=\"row\">\n    <div class=\"small-12 large-3 columns\">\n        <h2>Types</h2>\n        <ul class=\"side-nav adminList\">\n            ");
  stack1 = helpers.each.call(depth0, "data", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </ul>\n    </div>\n\n    <div class=\"small-12 large-9 columns\">\n        ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["adminData"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"row\">\n    <div class=\"small-12 large-5 columns\">\n        <h2>");
  stack1 = helpers._triageMustache.call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n    </div>\n    <div class=\"small-12 large-7 columns\">\n        ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("<img src=\"/images/logo.png\" class=\"logo\">");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n              <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "profile", options) : helperMissing.call(depth0, "link-to", "profile", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n              <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogOut", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Sign out</a></li>\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push("Profile");
  }

function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n              <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Sign in</a></li>\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("Talks");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("Tickets");
  }

function program12(depth0,data) {
  
  
  data.buffer.push("Venue");
  }

function program14(depth0,data) {
  
  
  data.buffer.push("Sponsors");
  }

function program16(depth0,data) {
  
  
  data.buffer.push("About");
  }

function program18(depth0,data) {
  
  
  data.buffer.push("2013");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n          <div class=\"banner text-center\">\n              <h1>The biggest ember.js event in Europe</h1>\n              <h2>26 &ndash; 29 August 2014</h2>\n\n              <a href=\"#\" class=\"button\">Subscribe</a>\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("button")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "tickets", options) : helperMissing.call(depth0, "link-to", "tickets", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </div>\n          <!-- END BANNER -->\n      ");
  return buffer;
  }
function program21(depth0,data) {
  
  
  data.buffer.push("Buy tickets");
  }

function program23(depth0,data) {
  
  
  data.buffer.push("Home");
  }

  data.buffer.push("<script>\n  $(document).foundation();\n</script>\n\n<header>\n  <div class=\"row\">\n    <div class=\"small-12 large-12 columns\">\n\n      <!-- BEGIN TOP NAV -->\n      <nav class=\"top-bar\" data-topbar>\n        <ul class=\"title-area\">\n          <li class=\"name\">\n            <h1>\n              ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </h1>\n          </li>\n          <li class=\"toggle-topbar menu-icon\"><a href=\"#\"><span>Menu</span></a></li>\n        </ul>\n\n        <section class=\"top-bar-section\">\n          <ul class=\"right\">\n            ");
  stack1 = helpers['if'].call(depth0, "controllers.user.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </ul>\n\n          <ul class=\"left main-nav\">\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "talks", options) : helperMissing.call(depth0, "link-to", "talks", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "tickets", options) : helperMissing.call(depth0, "link-to", "tickets", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "venue", options) : helperMissing.call(depth0, "link-to", "venue", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "partners", options) : helperMissing.call(depth0, "link-to", "partners", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "organizers", options) : helperMissing.call(depth0, "link-to", "organizers", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n            <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "munich", options) : helperMissing.call(depth0, "link-to", "munich", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n          </ul>\n        </section>\n      </nav>\n      <!-- END TOP NAV -->\n\n      <!-- BEGIN BANNER -->\n      ");
  stack1 = helpers['if'].call(depth0, "isOnHome", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n    </div>\n  </div>\n\n\n</header>\n\n<div class=\"row main-content\">\n  <div class=\"small-12 large-12 columns\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</div>\n\n<footer>\n  <div class=\"row\">\n    <div class=\"small-12 large-6 columns\">\n      <ul class=\"inline-list\">\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "talks", options) : helperMissing.call(depth0, "link-to", "talks", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "venue", options) : helperMissing.call(depth0, "link-to", "venue", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "partners", options) : helperMissing.call(depth0, "link-to", "partners", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "organizers", options) : helperMissing.call(depth0, "link-to", "organizers", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "munich", options) : helperMissing.call(depth0, "link-to", "munich", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n        <li><a href=\"mailto:mail@emberfest.eu\">Contact us</a></li>\n      </ul>\n    </div>\n    <div class=\"small-12 large-2 columns\">\n      <a href=\"https://twitter.com/EmberFest\" class=\"twitter-follow-button\" data-show-count=\"false\" data-lang=\"en\">\n        Follow @EmberFest\n      </a>\n      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\"//platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>\n    </div>\n    <div class=\"small-12 large-4 columns text-right\">\n      <small>Developed by <a href=\"http://haagen-software.no\">Haagen Software AS</a> and <a href=\"http://351am.com\">A&amp;M</a></small>\n    </div>\n  </div>\n</footer>\n");
  return buffer;
  
});

Ember.TEMPLATES["components/user-details"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <div data-alert class=\"alert-box warning radius\">\n    <ul>\n      ");
  stack1 = helpers.each.call(depth0, "error", "in", "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n    <a href=\"#\" class=\"close\">&times;</a>\n  </div>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <li>");
  stack1 = helpers._triageMustache.call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n      ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<form>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Full Name</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("user.fullName"),
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Enter your full name")
  },hashTypes:{'value': "ID",'type': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Company</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("user.company"),
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Where do you work?")
  },hashTypes:{'value': "ID",'type': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Phone</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("user.phone"),
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Your phone number")
  },hashTypes:{'value': "ID",'type': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Dietary requirements</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("user.dietaryRequirements"),
    'class': ("form-control"),
    'placeholder': ("Do you have any allergies? Are you vegetarian? Other dietary requirements?")
  },hashTypes:{'value': "ID",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Country of residence</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("user.countryOfResidence"),
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("Where do you live?")
  },hashTypes:{'value': "ID",'type': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Year of birth</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("user.yearOfBirth"),
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("When where you born?")
  },hashTypes:{'value': "ID",'type': "STRING",'class': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'class': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Conference dinner</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("user.attendingDinner")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n      <label>I want to attend the conference dinner!</label>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "verifyAccountInput", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">");
  stack1 = helpers._triageMustache.call(depth0, "buttonLabel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\n    </div>\n  </div>\n\n</form>\n");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("2013 will be published");
  }

  data.buffer.push("<h2>We're back</h2>\n\n<p>\n  Ember Fest 2013 was an absolute success. In 2014 Ember Fest will take the\n  conference to a new level over three amazing days in late August. As last\n  year, Ember Fest will by far be the European Ember.js event this year!\n</p>\n\n<p>\n  We are working hard on planning the event, which will contain hands-on\n  training sessions, a hackathon and awesome presentations that will showcase\n  what Ember.js brings to the table!\n</p>\n\n<p>\n  The videos from ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "munich", options) : helperMissing.call(depth0, "link-to", "munich", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(",\n  one video per week, throughout the rest of the year.\n</p>\n");
  return buffer;
  
});

Ember.TEMPLATES["mailchimp"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!-- Begin MailChimp Signup Form -->\n<link href=\"//cdn-images.mailchimp.com/embedcode/classic-081711.css\" rel=\"stylesheet\" type=\"text/css\">\n<style type=\"text/css\">\n    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }\n        /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.\n           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n</style>\n<div id=\"mc_embed_signup\">\n    <form action=\"http://emberfest.us3.list-manage.com/subscribe/post?u=f1cbf4663b7b23940ac7e5009&amp;id=532b2f138c\" method=\"post\" id=\"mc-embedded-subscribe-form\" name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate>\n        <h2>Subscribe to our mailing list</h2>\n        <div class=\"indicates-required\"><span class=\"asterisk\">*</span> indicates required</div>\n        <div class=\"mc-field-group\">\n            <label for=\"mce-EMAIL\">Email Address  <span class=\"asterisk\">*</span>\n            </label>\n            <input type=\"email\" value=\"\" name=\"EMAIL\" class=\"required email\" id=\"mce-EMAIL\">\n        </div>\n        <div class=\"mc-field-group\">\n            <label for=\"mce-LNAME\">Full Name  <span class=\"asterisk\">*</span>\n            </label>\n            <input type=\"text\" value=\"\" name=\"LNAME\" class=\"required\" id=\"mce-LNAME\">\n        </div>\n        <div class=\"mc-field-group\">\n            <label for=\"mce-CNAME\">Country  <span class=\"asterisk\">*</span>\n            </label>\n            <input type=\"text\" value=\"\" name=\"CNAME\" class=\"required\" id=\"mce-CNAME\">\n        </div>\n        <div class=\"mc-field-group input-group\">\n            <strong>Email Format </strong>\n            <ul><li><input type=\"radio\" value=\"html\" name=\"EMAILTYPE\" id=\"mce-EMAILTYPE-0\"><label for=\"mce-EMAILTYPE-0\">html</label></li>\n                <li><input type=\"radio\" value=\"text\" name=\"EMAILTYPE\" id=\"mce-EMAILTYPE-1\"><label for=\"mce-EMAILTYPE-1\">text</label></li>\n            </ul>\n        </div>\n        <div id=\"mce-responses\" class=\"clear\">\n            <div class=\"response\" id=\"mce-error-response\" style=\"display:none\"></div>\n            <div class=\"response\" id=\"mce-success-response\" style=\"display:none\"></div>\n        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n        <div style=\"position: absolute; left: -5000px;\"><input type=\"text\" name=\"b_f1cbf4663b7b23940ac7e5009_532b2f138c\" value=\"\"></div>\n        <div class=\"clear\"><input type=\"submit\" value=\"Subscribe\" name=\"subscribe\" id=\"mc-embedded-subscribe\" class=\"button\"></div>\n    </form>\n</div>\n<script type=\"text/javascript\">\n    var fnames = new Array();var ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='CNAME';ftypes[3]='text';\n    try {\n        var jqueryLoaded=jQuery;\n        jqueryLoaded=true;\n    } catch(err) {\n        var jqueryLoaded=false;\n    }\n    var head= document.getElementsByTagName('head')[0];\n    if (!jqueryLoaded) {\n        var script = document.createElement('script');\n        script.type = 'text/javascript';\n        script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';\n        head.appendChild(script);\n        if (script.readyState && script.onload!==null){\n            script.onreadystatechange= function () {\n                if (this.readyState == 'complete') mce_preload_check();\n            }\n        }\n    }\n\n    var err_style = '';\n    try{\n        err_style = mc_custom_error_style;\n    } catch(e){\n        err_style = '#mc_embed_signup input.mce_inline_error{border-color:#6B0505;} #mc_embed_signup div.mce_inline_error{margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff;}';\n    }\n    var head= document.getElementsByTagName('head')[0];\n    var style= document.createElement('style');\n    style.type= 'text/css';\n    if (style.styleSheet) {\n        style.styleSheet.cssText = err_style;\n    } else {\n        style.appendChild(document.createTextNode(err_style));\n    }\n    head.appendChild(style);\n    setTimeout('mce_preload_check();', 250);\n\n    var mce_preload_checks = 0;\n    function mce_preload_check(){\n        if (mce_preload_checks>40) return;\n        mce_preload_checks++;\n        try {\n            var jqueryLoaded=jQuery;\n        } catch(err) {\n            setTimeout('mce_preload_check();', 250);\n            return;\n        }\n        var script = document.createElement('script');\n        script.type = 'text/javascript';\n        script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';\n        head.appendChild(script);\n        try {\n            var validatorLoaded=jQuery(\"#fake-form\").validate({});\n        } catch(err) {\n            setTimeout('mce_preload_check();', 250);\n            return;\n        }\n        mce_init_form();\n    }\n    function mce_init_form(){\n        jQuery(document).ready( function($) {\n            var options = { errorClass: 'mce_inline_error', errorElement: 'div', onkeyup: function(){}, onfocusout:function(){}, onblur:function(){}  };\n            var mce_validator = $(\"#mc-embedded-subscribe-form\").validate(options);\n            $(\"#mc-embedded-subscribe-form\").unbind('submit');//remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator\n            options = { url: 'http://emberfest.us3.list-manage.com/subscribe/post-json?u=f1cbf4663b7b23940ac7e5009&id=532b2f138c&c=?', type: 'GET', dataType: 'json', contentType: \"application/json; charset=utf-8\",\n                beforeSubmit: function(){\n                    $('#mce_tmp_error_msg').remove();\n                    $('.datefield','#mc_embed_signup').each(\n                            function(){\n                                var txt = 'filled';\n                                var fields = new Array();\n                                var i = 0;\n                                $(':text', this).each(\n                                        function(){\n                                            fields[i] = this;\n                                            i++;\n                                        });\n                                $(':hidden', this).each(\n                                        function(){\n                                            var bday = false;\n                                            if (fields.length == 2){\n                                                bday = true;\n                                                fields[2] = {'value':1970};//trick birthdays into having years\n                                            }\n                                            if ( fields[0].value=='MM' && fields[1].value=='DD' && (fields[2].value=='YYYY' || (bday && fields[2].value==1970) ) ){\n                                                this.value = '';\n                                            } else if ( fields[0].value=='' && fields[1].value=='' && (fields[2].value=='' || (bday && fields[2].value==1970) ) ){\n                                                this.value = '';\n                                            } else {\n                                                if (/\\[day\\]/.test(fields[0].name)){\n                                                    this.value = fields[1].value+'/'+fields[0].value+'/'+fields[2].value;\n                                                } else {\n                                                    this.value = fields[0].value+'/'+fields[1].value+'/'+fields[2].value;\n                                                }\n                                            }\n                                        });\n                            });\n                    $('.phonefield-us','#mc_embed_signup').each(\n                            function(){\n                                var fields = new Array();\n                                var i = 0;\n                                $(':text', this).each(\n                                        function(){\n                                            fields[i] = this;\n                                            i++;\n                                        });\n                                $(':hidden', this).each(\n                                        function(){\n                                            if ( fields[0].value.length != 3 || fields[1].value.length!=3 || fields[2].value.length!=4 ){\n                                                this.value = '';\n                                            } else {\n                                                this.value = 'filled';\n                                            }\n                                        });\n                            });\n                    return mce_validator.form();\n                },\n                success: mce_success_cb\n            };\n            $('#mc-embedded-subscribe-form').ajaxForm(options);\n\n\n        });\n    }\n    function mce_success_cb(resp){\n        $('#mce-success-response').hide();\n        $('#mce-error-response').hide();\n        if (resp.result==\"success\"){\n            $('#mce-'+resp.result+'-response').show();\n            $('#mce-'+resp.result+'-response').html(resp.msg);\n            $('#mc-embedded-subscribe-form').each(function(){\n                this.reset();\n            });\n        } else {\n            var index = -1;\n            var msg;\n            try {\n                var parts = resp.msg.split(' - ',2);\n                if (parts[1]==undefined){\n                    msg = resp.msg;\n                } else {\n                    i = parseInt(parts[0]);\n                    if (i.toString() == parts[0]){\n                        index = parts[0];\n                        msg = parts[1];\n                    } else {\n                        index = -1;\n                        msg = resp.msg;\n                    }\n                }\n            } catch(e){\n                index = -1;\n                msg = resp.msg;\n            }\n            try{\n                if (index== -1){\n                    $('#mce-'+resp.result+'-response').show();\n                    $('#mce-'+resp.result+'-response').html(msg);\n                } else {\n                    err_id = 'mce_tmp_error_msg';\n                    html = '<div id=\"'+err_id+'\" style=\"'+err_style+'\"> '+msg+'</div>';\n\n                    var input_id = '#mc_embed_signup';\n                    var f = $(input_id);\n                    if (ftypes[index]=='address'){\n                        input_id = '#mce-'+fnames[index]+'-addr1';\n                        f = $(input_id).parent().parent().get(0);\n                    } else if (ftypes[index]=='date'){\n                        input_id = '#mce-'+fnames[index]+'-month';\n                        f = $(input_id).parent().parent().get(0);\n                    } else {\n                        input_id = '#mce-'+fnames[index];\n                        f = $().parent(input_id).get(0);\n                    }\n                    if (f){\n                        $(f).append(html);\n                        $(input_id).focus();\n                    } else {\n                        $('#mce-'+resp.result+'-response').show();\n                        $('#mce-'+resp.result+'-response').html(msg);\n                    }\n                }\n            } catch(e){\n                $('#mce-'+resp.result+'-response').show();\n                $('#mce-'+resp.result+'-response').html(msg);\n            }\n        }\n    }\n\n</script>\n<!--End mc_embed_signup-->");
  
});

Ember.TEMPLATES["munich"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Ember Fest 2013 - Munich</h2>\n\n<p>\n  Ember Fest 2013 was an absolute success! Ember Fest Munich offered two days\n  of introductory Ember.js training, a world-class Hackathon as well as a\n  full day conference. After the main event, a proper Bavarian celebration\n  was played out at the amazing Hofbräuhaus.\n</p>\n\n<p>\n  <a href=\"http://www.infoq.com\">InfoQ</a> were kind enough to send their\n  videographer to film the presentations. These will be published on their\n  website throughout the rest of 2013. Once the talks are made available,\n  a link will be provided in the table below.\n</p>\n\n\n<h3>The list of 2013 presentations</h3>\n\n\n<table>\n  <thead>\n    <tr>\n        <th>Title of the presentation</th>\n        <th width=\"150\">Presenter</th>\n        <th width=\"150\">Links</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n        <td>\n          <p class=\"title\">2-day Introductory Ember.js Training</p>\n          Joachim is the author of Ember.js in Action and the lead organizer of Ember Fest.\n          Joachim have worked with Ember.js since it forked out of SproutCore and have a wide experience developing web applications.\n        </td>\n        <td>Joachim Haagen Skeie</td>\n        <td><a href=\"http://emberjstraining.com\">Ember.js Training</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Query params with the Ember router: past, present and future</p>\n          Alex Speller introduces Ember Query, a library enabling query string usage in Ember: introduction, advanced usage, tips & tricks, the future.\n        </td>\n        <td>Alex Speller</td>\n        <td><a href=\"http://www.infoq.com/presentations/ember-query-string?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row1\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Productive Out-of-the-Box</p>\n          Anthony provides a survey of the Ember.js tooling landscape, highlighting the use of Yeoman. Anthony Bull (@inkredabull) is the Sr. Web Engineer at CrowdFlower and has been working with Ember.js for over a year.\n        </td>\n        <td>Anthony Bull</td>\n        <td><a href=\"http://www.infoq.com/presentations/emberjs-tools-yeoman\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Experiences building a hypervideo-based webapp with Ember.js, Popcorn.js and HTML5</p>\n          Thomas talks about the advantages, challenges and lessons learnt in realizing a multimedia-heavy, interactive HTML5 application with Ember.js.\n        </td>\n        <td>Thomas Herrmann</td>\n        <td><a href=\"http://www.infoq.com/presentations/hypermedia-emberjs-html5\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Insights from using ember.js in the field</p>\n          This talk will share some best practice about using ember.js to master the needs of real-world web applications and present the things who worked well and the ones who didn't.\n        </td>\n        <td>Stefan Fochler</td>\n        <td><a href=\"http://www.infoq.com/presentations/emberjs-use-case\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Ember Reusable Components and Widgets</p>\n          Sergey is a Front-end developer in New Proimage (Agfa) residing in Israel. Sergeys talk will go over Ember.js' many strong sides. One of them is combination of Handlebars templates, Ember.View's and their nesting which allows to built indeed complex UI.\n        </td>\n        <td>Sergey Bolshchikov</td>\n        <td><a href=\"http://www.infoq.com/presentations/ember-view-handlebars-ui\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Complex Architectures in Ember</p>\n          In Ember, convention trumps configuration so strongly we easily forget that there are a myriad of moving parts under the hood. Once we move past CRUD applications, understanding how messages move through Ember's views, controllers, and routes becomes crucial.\n        </td>\n        <td>Matthew Beale</td>\n        <td><a href=\"http://www.infoq.com/presentations/emberjs-messages-views-controller-router\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Ember-Data, the way forward</p>\n          Igor Terzic presents several cases where Ember Data is used in production, and outlines some of the features that are intended to be included in the future.\n        </td>\n        <td>Igor Terzic</td>\n        <td><a href=\"http://www.infoq.com/presentations/ember-data?utm_source=infoq&utm_medium=videos_homepage&utm_campaign=videos_row3\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Advanced Patterns</p>\n          Pauls talk presents a few advanced/non-obvious techniques, useful in process of building large EmberJS applications with Ember Data\n        </td>\n        <td>Paul Chavard</td>\n        <td><a href=\"http://www.infoq.com/presentations/emberjs-patterns-data\">Video (InfoQ)</a></td>\n    </tr>\n    <tr>\n        <td>\n          <p class=\"title\">Forget Passwords, Use Persona</p>\n          Ember Fest uses Mozilla Persona for registration and sign-in. Come learn what Persona is, how Persona works, and how you can use Persona to get rid of passwords in your own applications. This will be a short introductory talk followed by an audience-driven deep dive into Persona's philosophy, design, and implementation.\n        </td>\n        <td>Dan Callahan</td>\n        <td>Video Coming Soon!</td>\n    </tr>\n  </tbody>\n</table>\n");
  
});

Ember.TEMPLATES["organizers"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Meet the organizers</h2>\n\n<p>A parapraph of text explaining why are we doing what we are doing. Also, links to how to reach us.</p>\n\n<article class=\"person\">\n  <div class=\"row\">\n    <div class=\"small-12 large-2 columns text-center\">\n      <img src=\"/images/organizers/tair.png\">\n    </div>\n    <div class=\"small-12 large-10 columns bio\">\n      <h4>Tair Assimov</h4>\n      <p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed ligula dictum, egestas odio hendrerit, mollis massa. Curabitur convallis cursus risus, id imperdiet leo rhoncus vitae. Nullam euismod lacus ac blandit mattis. Vivamus dictum adipiscing enim, et tempor lectus tincidunt ac. Ut dictum felis sem.\n      </p>\n      <div class=\"links\">\n        <a href=\"#\" class=\"icon\"><i class=\"foundicon-twitter\"></i></a>\n        <a href=\"#\" class=\"icon\"><i class=\"foundicon-github\"></i></a>\n        <a href=\"#\" class=\"icon\"><i class=\"foundicon-linkedin\"></i></a>\n        <!-- See social set here: http://zurb.com/playground/foundation-icons -->\n      </div>\n    </div>\n  </div>\n</article>\n");
  
});

Ember.TEMPLATES["partners"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Conference partners</h2>\n\n<p>\n  Conference partners are often what separates a good conference from a great\n  conference! Having partners come on board early means that we will be able to\n  plan and execute the event on a much larger scale!\n</p>\n\n<p>\n  Ember Fest 2013 was a complete success, and for 2014 we have set our\n  ambitions even higher! Hosted in Barcelona, Spain, Ember Fest 2014 will\n  consist of a training course, workshops and an awesome 2-day conference!\n  This is your chance to pitch in, in order to grow the Europena Ember.js\n  community, and to make your brand know to the Ember.js Developers!\n</p>\n\n<p>\n  There are multiple partnership options for 2014, which means you can choose\n  a level that fits you! We want all partners to have the opportunity\n  to join us at the conference!\n</p>\n\n<p>\n  If you would like to become an Ember Fest Partner, please email us at\n  <a href=\"mailto:mail@emberfest.eu?subject=Regarding Ember Fest Partnership!\">mail@emberfest.eu</a>!\n</p>\n\n<h2>Fixed partnerships</h2>\n\n<div class=\"row\" id=\"sponsor-packages\">\n  <div class=\"small-12 large-4 columns\">\n    <ul class=\"pricing-table bronze\">\n      <li class=\"title\">Bronze</li>\n      <li class=\"price\">€1000</li>\n      <li class=\"description\">Describe the bronze package</li>\n      <li class=\"bullet-item\">Tweet from @EmberFest welcoming you as a partner</li>\n      <li class=\"bullet-item\">Logo on emberfest.eu - Along with a 50 character description</li>\n      <li class=\"bullet-item\">Logo on projector in-between talks</li>\n      <li class=\"bullet-item\">Listed as Bronze partner</li>\n      <li class=\"bullet-item\">One free ticket to the event</li>\n    </ul>\n  </div>\n\n  <div class=\"small-12 large-4 columns\">\n    <ul class=\"pricing-table silver\">\n      <li class=\"title\">Silver</li>\n      <li class=\"price\">€1800</li>\n      <li class=\"description\">Describe the silver package</li>\n      <li class=\"bullet-item\">Tweet from @EmberFest welcoming you as a partner</li>\n      <li class=\"bullet-item\">Logo on emberfest.eu - Along with a 150 character description</li>\n      <li class=\"bullet-item\">Logo on projector in-between talks</li>\n      <li class=\"bullet-item\">Logo displayed under \"partners\" during the first 10 seconds of the recorded videos</li>\n      <li class=\"bullet-item\">Listed as Silver partner</li>\n      <li class=\"bullet-item\">Two free ticket to the event</li>\n    </ul>\n  </div>\n\n  <div class=\"small-12 large-4 columns\">\n    <ul class=\"pricing-table gold\">\n      <li class=\"title\">Gold</li>\n      <li class=\"price\">€2600</li>\n      <li class=\"description\">Describe the gold package</li>\n      <li class=\"bullet-item\">Tweet from @EmberFest welcoming you as a partner</li>\n      <li class=\"bullet-item\">Logo on emberfest.eu - Along with a 250 character description</li>\n      <li class=\"bullet-item\">Logo on projector in-between talks</li>\n      <li class=\"bullet-item\">Logo displayed under \"partners\" in the recorded videos</li>\n      <li class=\"bullet-item\">Listed as Gold partner</li>\n      <li class=\"bullet-item\">Logo printed on the back of the T-shirts handed out to the attendees</li>\n      <li class=\"bullet-item\">Four free ticket to the event</li>\n    </ul>\n  </div>\n</div>\n\n\n<h2>Variable Partnerships</h2>\n\n<h3>Conference Dinner</h3>\n<p>\n  Sponsor the cost of the conference dinner, in order to get direct exposure\n  to the attendees! Your partnership will be notably included in the conference programme!\n</p>\n<p>In addition, you will get all the benefits of a gold partner.</p>\n\n<h3>After Party</h3>\n<p>\n  Sponsor the cost of the after party, in order to get direct exposure\n  to the attendees! Your partnership will be notably included in the conference programme!\n</p>\n<p>In addition, you will get all the benefits of a gold partner.</p>\n\n<h3>Main Video Sponsor</h3>\n<p>\n  Become the main sponsor of the recorded videos from Ember Fest. Your partnership will\n  cover the cost of the videographer and video editing. Your partnership will\n  be notably shown at the very start of each recorded video!\n</p>\n<p>In addition, you will get all the benefits of a gold partner</p>\n\n<h3>Hackathon Dinner</h3>\n<p>\n  Sponsor the cost of the Ember Fest Hackathon! Your partnership will be notably\n  included in the conference programme!\n</p>\n<p>In addition, you will get all the benefits of a gold partner</p>\n\n<h3>Other ideas?</h3>\n<p>\n  If you'd like to become an Ember Fest partner, but you cannot find a suitable\n  partner option, please contact us, and we will find a partnership option that\n  works best for you!\n</p>\n");
  
});

Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<div class=\"row\">\n  <div class=\"small-12 large-5 columns\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers['user-details'] || (depth0 && depth0['user-details']),options={hash:{
    'user': ("controllers.user.model"),
    'buttonLabel': ("Update profile")
  },hashTypes:{'user': "ID",'buttonLabel': "STRING"},hashContexts:{'user': depth0,'buttonLabel': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "user-details", options))));
  data.buffer.push("\n  </div>\n\n  <div class=\"small-12 large-6 large-offset-1 columns\">\n    <p><em>You have suggested the following talks:</em></p>\n    <ul class=\"inline-list\">\n      ");
  stack1 = helpers.each.call(depth0, "talk", "in", "talks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n    <h3>Participant Information</h3>\n    <p>If your talk is approved, you will be notified by one of the organizers personally. We will accept talks at regular intervals until two weeks before the conference starts. If none of your talks get approved, you will get the opportunity to buy a ticket at the price valid when you registered your talk.</p>\n  </div>\n</div>\n\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <li>\n          <h4>");
  stack1 = helpers._triageMustache.call(depth0, "talk.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h4>\n          <ul class=\"inline-list\">\n            <li><a href=\"#\">Edit</a></li>\n            <li><a href=\"#\">View</a></li>\n          </ul>\n        </li>\n      ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n<p class=\"talkRow\">You need to sign in to view and edit your profile!</p>\n<a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">Sign in</a>\n");
  return buffer;
  }

  data.buffer.push("<h2>Your Profile</h2>\n\n");
  stack1 = helpers['if'].call(depth0, "controllers.user.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["register"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n      ");
  data.buffer.push(escapeExpression((helper = helpers['user-details'] || (depth0 && depth0['user-details']),options={hash:{
    'user': ("controllers.user.model"),
    'buttonLabel': ("Register")
  },hashTypes:{'user': "ID",'buttonLabel': "STRING"},hashContexts:{'user': depth0,'buttonLabel': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "user-details", options))));
  data.buffer.push("\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <p>You need to sign in with you email (Mozilla Persona) to register your Ember Fest account</p>\n      <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">Sign in</a>\n    ");
  return buffer;
  }

  data.buffer.push("<h2>Register new account</h2>\n\n<div class=\"row\">\n  <div class=\"small-12 large-5 columns\">\n    ");
  stack1 = helpers['if'].call(depth0, "controllers.user.model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n  <div class=\"small-12 large-6 large-offset-1 columns\">\n    <h4>Why do I need to register?</h4>\n    <p>\n      In order for us to be able to accept your talk proposal, or ticket purchases we need to know who you are :)\n      Once the conference starts, you will also be able to use your account to give feedback to the speakers, as well as leave feedback for the conference.\n    </p>\n    <p>We take you privacy extremely serious, and will never share your personal details with anyone!</p>\n    <h4>Mozilla Persona</h4>\n    <p>Sign in is provided securely via Mozilla Persona. This enables us to authenticate and validate your email address without you ever having to provide Ember Fest with a password, as your password is safely stored with Mozilla Persona!</p>\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["registerTalk"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<h2>Register your talk for Ember Fest 2014!</h2>\n");
  stack1 = helpers['if'].call(depth0, "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<form>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Title</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("title"),
    'type': ("text"),
    'placeholder': ("Your talk title")
  },hashTypes:{'value': "ID",'type': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Abstract</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("talkAbstract"),
    'rows': (7),
    'placeholder': ("What is your talk about?")
  },hashTypes:{'value': "ID",'rows': "INTEGER",'placeholder': "STRING"},hashContexts:{'value': depth0,'rows': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Outline</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("outline"),
    'rows': (7),
    'placeholder': ("Briefly outline the contents of your talk (required for workshops)")
  },hashTypes:{'value': "ID",'rows': "INTEGER",'placeholder': "STRING"},hashContexts:{'value': depth0,'rows': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Talk type</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("talkType"),
    'type': ("text"),
    'placeholder': ("What type of talk? 15 or 35 min presentation ? Half or full day workshop?")
  },hashTypes:{'value': "ID",'type': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Participant requirements</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("participantRequirements"),
    'rows': (7),
    'placeholder': ("What (if anything) do your participants need to bring? (most valid for workshops)")
  },hashTypes:{'value': "ID",'rows': "INTEGER",'placeholder': "STRING"},hashContexts:{'value': depth0,'rows': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <label>Topics</label>\n      ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'value': ("topics"),
    'type': ("text"),
    'placeholder': ("Which topics will your talk cover?")
  },hashTypes:{'value': "ID",'type': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'type': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"large-12 columns\">\n      <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "verifyTalkInput", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">Register talk</a>\n    </div>\n  </div>\n\n</form>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <div data-alert class=\"alert-box warning radius\">\n    <ul>\n      ");
  stack1 = helpers.each.call(depth0, "error", "in", "validationErrors", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n    <a href=\"#\" class=\"close\">&times;</a>\n  </div>\n");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <li>");
  stack1 = helpers._triageMustache.call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n      ");
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, "controllers.user.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["talks"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["talks/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n  <p><em>There are currently no registered talks for Ember Fest 2014!</em></p>\n  ");
  stack1 = helpers['if'].call(depth0, "controllers.user.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("button small")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "registerTalk", options) : helperMissing.call(depth0, "link-to", "registerTalk", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program3(depth0,data) {
  
  
  data.buffer.push("Submit proposal");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n    <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">Sign in to submit proposal</a>\n  ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<table>\n  <thead>\n    <tr>\n        <th width=\"150\">Type</th>\n        <th width=\"150\">Title</th>\n        <th width=\"150\">Presenter</th>\n        <th>Abstract</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n        <td><span class=\"label secondary\">");
  stack1 = helpers._triageMustache.call(depth0, "talk.talkType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span></td>\n        <td>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "talks.talk", "talk", options) : helperMissing.call(depth0, "link-to", "talks.talk", "talk", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        <td>");
  stack1 = helpers._triageMustache.call(depth0, "talk.talkSuggestedBy", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        <td>");
  stack1 = helpers._triageMustache.call(depth0, "talk.talkAbstract", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n    </tr>\n  </tbody>\n</table>\n");
  return buffer;
  }
function program8(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "talk.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program10(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n  ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("button small")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "registerTalk", options) : helperMissing.call(depth0, "link-to", "registerTalk", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n  <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doLogIn", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"button small\">Sign in to submit proposal</a>\n");
  return buffer;
  }

  data.buffer.push("<h2>Call for papers</h2>\n<p>\n  Suggested talks are listed here in order to give you an idea of the types of\n  talks that might be present at Ember Fest. See a talk you like? Vote it up!\n</p>\n\n");
  stack1 = helpers.unless.call(depth0, "controller.length", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers.each.call(depth0, "talk", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<h3>Submit a Talk!</h3>\n<p>\n  Do you have something you want to share with the Ember.js community?\n  Do you have a cool idea, have you worked on a cool projet, or have you\n  learnt something awesome lately? Share your experiences with the rest of\n  the European Ember.js community at Ember Fest 2014! All speakers get free\n  admission to the Conference, and the Conference Dinner.\n</p>\n\n<p>\n  This year, we are looking for both workshops and presentations! Workshops\n  will be held during the 2-day pre-conference workshop. This is where you\n  will get to meet developers that are eager to learn all about the awesomeness\n  that is Ember.js.\n</p>\n\n<p>\n  By registering your talk, your abstract for a presentation talk or a tutorial\n  will be added to the list of suggestions for this year's conference. You may\n  change the content of your abstract at any time during the period that the\n  CfP is open. Other participants will be able to see your suggestion as soon\n  as it is registered.\n</p>\n\n<p>\n  The talk proposals will be reviewed by a group of smart and friendly people,\n  who will help you create the best proposal you can. You will receive feedback\n  from reviewers by email.\n</p>\n\n<h3>Topics</h3>\n<ul>\n  <li>Ember.js Basics</li>\n  <li>Thrid party frameworks</li>\n  <li>Ember.js Persistence frameworks</li>\n  <li>Hands-on experiences and experience reports</li>\n  <li>Security</li>\n  <li>Build Tools</li>\n</ul>\n\n<h3>Talk Types</h3>\n\n<p>\n  There are four talk types that you can choose between. Standard presentations\n  are either 20 or 35 minutes in length and will be held during the two main\n  days of the conference. Workshops are held during the two pre-conference days\n  and are either half day (3,5 hours including breaks), or full\n  day (7 hours including breaks)\n</p>\n\n");
  stack1 = helpers['if'].call(depth0, "controllers.user.isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["talks/talk"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    <h3>Outline</h3>\n    <p>");
  data.buffer.push(escapeExpression((helper = helpers.markdown || (depth0 && depth0.markdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "outline", options) : helperMissing.call(depth0, "markdown", "outline", options))));
  data.buffer.push("</p>\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <h3>Topics</h3>\n    <p>");
  stack1 = helpers._triageMustache.call(depth0, "topics", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n    &#8592; Back to talks\n  ");
  }

  data.buffer.push("<article class=\"topic\">\n  <h2>");
  stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n\n  <p>\n    <span class=\"label secondary\">");
  stack1 = helpers._triageMustache.call(depth0, "talkType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n    <span class=\"author\">by ");
  stack1 = helpers._triageMustache.call(depth0, "talkSuggestedBy", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  </p>\n\n  <h3>Abstract</h3>\n  <p>");
  data.buffer.push(escapeExpression((helper = helpers.markdown || (depth0 && depth0.markdown),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "talkAbstract", options) : helperMissing.call(depth0, "markdown", "talkAbstract", options))));
  data.buffer.push("</p>\n\n  ");
  stack1 = helpers['if'].call(depth0, "outline", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  stack1 = helpers['if'].call(depth0, "topics", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("small button")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "talks", options) : helperMissing.call(depth0, "link-to", "talks", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</article>\n");
  return buffer;
  
});

Ember.TEMPLATES["tickets"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n        <tr>\n            <td>\n                <p class=\"title\">");
  stack1 = helpers._triageMustache.call(depth0, "ticket.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</p>\n                ");
  stack1 = helpers._triageMustache.call(depth0, "ticket.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n            </td>\n            <td>$");
  stack1 = helpers._triageMustache.call(depth0, "ticket.price", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n            ");
  stack1 = helpers['if'].call(depth0, "ticket.ticketsAvailable", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n        </tr>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n                <td><a href=\"\" class=\"button small\">Add to Cart</button></td>\n            ");
  }

function program4(depth0,data) {
  
  
  data.buffer.push("\n                <td><a href=\"\" class=\"button small disabled\">Sold Out</button></td>\n            ");
  }

  data.buffer.push("<h2>Tickets</h2>\n\n<table>\n    <thead>\n    <tr>\n        <th>Ticket Type</th>\n        <th width=\"150\">Price</th>\n        <th width=\"200\">&nbsp;</th>\n    </tr>\n    </thead>\n    <tbody>\n    ");
  stack1 = helpers.each.call(depth0, "ticket", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</table>\n");
  return buffer;
  
});

Ember.TEMPLATES["venue"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Venue</h2>\n");
  
});