var Tree;

Tree = require('../parse/tree');

function Scraper(html) {
  this.html = html;
  this.$el = $(html);
}

Scraper.prototype.getText = function(selector) {
  var $el, $target, text;

  $el = this.$el;

  $target = $el.find(selector);

  text = $target.text().trim();

  return text;
}

Scraper.prototype.getHTML = function(selector) {
  var $el, $target, text;

  $el = this.$el;

  $target = $el.find(selector);

  text = $target.html();

  return text;
}

Scraper.prototype.parseChildren = function(selector) {
  var $children, $el, $target, tree;

  $el = this.$el;

  $target = $el.find(selector);

  tree = new Tree($target);

  return tree;
}

Scraper.register = function(scraper) {
  this.scrapers.push(scraper);
};

Scraper.scrape = function(html) {
  var data, i, ii, scraper, ScraperClass, scrapers;

  scrapers = this.scrapers;

  for (i = 0, ii = scrapers.length; i < ii; i ++) {
    ScraperClass = scrapers[i];

    scraper = new ScraperClass(html);

    data = scraper.scrape();

    if (data) break;
  }

  return data;
};

Scraper.scrapers = [];

module.exports = Scraper;