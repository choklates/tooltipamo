var tooltipamo = (function ($) {
  var $tooltipContainers, $tooltip;

  function init() {
    _createTooltip();
    _setupElements();
    _setupEventHandlers();
  }

  function _setupElements() {
    $tooltipContainers = $('.js-tooltipamo');
    $tooltip = $('.tooltipamo');
  }

  function _setupEventHandlers() {
    var text, offset;

    offset = {
      x: 15,
      y: 5
    };

    $tooltipContainers.on('mouseenter', function () {
      text = $(this).data('tip');
      console.log('entering');
      $tooltip.text(text).addClass('is-opaque');
    }).on('mousemove', function (e) {
      console.log('x: ' + e.pageX + ' y: ' + e.pageY)
      $tooltip.css({
        top: e.pageY + offset.y,
        left: e.pageX + offset.x
      });
      console.log('moving');
    }).on('mouseleave', function () {
      console.log('leaving');
      $tooltip.removeClass('is-opaque');
    });
  }

  function _createTooltip() {
    $('body').append('<div class="tooltipamo"></div>');
  }

  return {
    init: init
  };
})(jQuery);
