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
    var $win,
      text, offset, win, tooltip;

    $win = $(window);

    offset = {};
    offset.x = 15;
    offset.y = 5;

    win = {};

    tooltip = {};
    tooltip.width = $tooltip.outerWidth(true);

    $tooltipContainers.on('mouseenter', function () {
      text = $(this).data('tip');
      tooltip.height = $tooltip.outerHeight(true);
      $tooltip.addClass('is-active').find('p').text(text);
    }).on('mouseleave', function () {
      $tooltip.removeClass('is-active');
    });

    $tooltipContainers.add('.tooltipamo').on('mousemove', function (e) {
      tooltip.top = e.pageY + offset.y;
      tooltip.left = e.pageX + offset.x;

      if (tooltip.left + tooltip.width > win.width) {
        tooltip.left -= (tooltip.width + offset.x * 2);
      }
      if (tooltip.top + tooltip.height > win.height + win.top) {
        tooltip.top -= (tooltip.height + offset.y * 2);
      }

      $tooltip.css({
        top: tooltip.top,
        left: tooltip.left
      });
    });

    $win.on('load resize', function () {
      win.width = $win.width();
      win.height = $win.height();
      win.top = 0;
    }).on('scroll', function () {
      win.top = $win.scrollTop();
    });
  }

  function _createTooltip() {
    $('body').append('<div class="tooltipamo"><p></p></div>');
  }

  return {
    init: init
  };
})(jQuery);
