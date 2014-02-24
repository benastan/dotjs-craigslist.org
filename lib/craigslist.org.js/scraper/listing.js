var Scraper;

Scraper = require('./index');

function Listing(html) {
  Scraper.call(this, html);
}

Listing.prototype = new Scraper('');

Listing.prototype.getMap = function() {
  var $el, $map;

  $el = this.$el;

  $map = $el.find('#map');

  return $map;
};

Listing.prototype.getLatitude = function() {
  var $map, latitude;

  $map = this.getMap();

  latitude = $map.data('latitude');

  return latitude;
};

Listing.prototype.getLongitude = function() {
  var $map, longitude;

  $map = this.getMap();

  latitude = $map.data('longitude');

  return latitude;
};

Listing.prototype.scrape = function() {
  var $el, data;

  if (! this.shouldScrape()) return false;

  $el = this.$el;

  data = {};

  data.type = 'listing'

  data.title = this.getText('.postingtitle');

  data.latitude = this.getLatitude();

  data.longitude = this.getLongitude();

  data.body = this.getHTML('#postingbody');

  data.parsedBody = this.parseChildren('#postingbody');

  return data;
};

Listing.prototype.shouldScrape = function() {
  var $el;

  $el = this.$el;

  return $el.find('.postingtitle').length > 0 && $el.find('#postingbody').length > 0
}

module.exports = Listing;