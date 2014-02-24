var Scraper, ListingScraper, $frame, $modal, frameDocument;

Scraper = require('./scraper');

ListingScraper = require('./scraper/listing');

Scraper.register(ListingScraper);

$frame = $('<iframe>');

$frame
  .css({
    position: 'fixed',
    width: '100%',
    top: '0px',
    left: '0px',
    background: 'rgba(255, 255, 255, 0.7)',
    height: '400px',
    overflow: 'auto',
    height: '100%',
    margin: 'auto',
    display: 'none'
  })
  .appendTo(document.body);

frameDocument = $frame.contents();

$modal = $('<div>')
  .css({
    width: '600px',
    margin: '0 auto',
    background: 'white'
  });

$('body', frameDocument).append($modal);

$(document).on('mouseleave', 'a', function() {
  if (/craigslist\.org/.test(this.hostname)) {
    $(this).toggleClass('hover', false)
  }
});

$(document).on('mouseover', 'a', function() {
  var $target, data, html;

  $target = $(this);

  if (/craigslist\.org/.test(this.hostname)) {
    $target.toggleClass('hover', true);

    $.get(this.href).success(function(response) {
      html = response;

      data = Scraper.scrape(html);

      debugger
    });

    function wait() {
      var hovering;

      hovering = $target.hasClass('hover');

      if (! hovering) return;

      if (! html) setTimeout(wait, 100);

      else {
        // $frame.css('display', 'block')
        
        $content = $(html);

        $content.find('.bchead').remove();

        $modal.empty().append($content);
      }
    }

    setTimeout(wait, 1000);
  }
});
