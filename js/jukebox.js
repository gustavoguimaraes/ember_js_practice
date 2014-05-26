var Jukebox = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Jukebox.ApplicationAdapter = DS.FixtureAdapter.extend();

Jukebox.Router.map(function(){
  this.route('jukebox');
});
// Jukebox.Router.map(function() {
//  this.route('about', {path: 'aboutgus'});
// });

// Jukebox.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });

Jukebox.JukeboxRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('song');
  }
});

//model
Jukebox.Song =  DS.Model.extend({
  name: DS.attr('string'),
  artist: DS.attr('string'),
  duration: DS.attr('number')
});

// DS is the namespace for Ember Data

Jukebox.Artist = DS.Model.extend({
  name:DS.attr('string'),
  genre: DS.attr('string'),
  songs: DS.hasMany('song') //creates a has many relationship with songs
});

//Fixtures is the same as setting an array for the object.

Jukebox.Song.FIXTURES = [
  { id: 1, name: 'We Exist', duration: 383, artist: 1},
  {id: 2, name :'After Life', duration: 359, artist: 1}
];

Jukebox.Artist.FIXTURES = [
  {id:1, name: 'Arcade Fire', genre: 'Rock', songs:[ 1, 2]}
];

//handlebar helper to transform the duration of the song from only seconds to minutes and seconds
Ember.Handlebars.registerBoundHelper('duration-to-time', function(seconds) {
  var minutes = seconds > 60? parseInt(seconds/60, 10) : 0,
      leftOverSeconds = seconds > 60? seconds % (minutes * 60) : seconds;

  leftOverSeconds = (leftOverSeconds < 10)? '0'+leftOverSeconds : leftOverSeconds;
  return minutes + ':' + leftOverSeconds;
});


//Controller
Jukebox.JukeboxController = Ember.ArrayController.extend({
  nowPlaying: null,
  actions: {
    playSong: function(song) {
      this.set('nowPlaying', song);
    }
  }
});
