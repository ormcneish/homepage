$(function () {

    const $kitchen = $('.kitchen');
    let $contextTarget = null;

    // ── Build a context menu for deleting placed items ──────────
    const $menu = $('<div class="context-menu">')
        .append($('<button>🗑 Remove item</button>').on('click', function () {
            if ($contextTarget) {
                $contextTarget.remove();
                $contextTarget = null;
            }
            $menu.removeClass('visible');
        }))
        .appendTo('body');

    $(document).on('click', function () {
        $menu.removeClass('visible');
    });

    // ── Make toolbar items cloneable onto the canvas ─────────────
    $('.toolbar .item').each(function () {
        $(this).draggable({
            helper: 'clone',
            appendTo: 'body',
            zIndex: 9999,
            cursor: 'grabbing',
            opacity: 0.85,
            start: function (e, ui) {
                ui.helper.css({
                    width: $(this).width(),
                    height: $(this).height(),
                    'object-fit': 'contain'
                });
            }
        });
    });

    // ── Make the kitchen a droppable target ──────────────────────
    $kitchen.droppable({
        accept: '.toolbar .item',
        drop: function (event, ui) {
            const $original = ui.draggable;

            // Work out position relative to the kitchen div
            const kitchenOffset = $kitchen.offset();
            const helperOffset  = ui.offset;

            const left = helperOffset.left - kitchenOffset.left;
            const top  = helperOffset.top  - kitchenOffset.top;

            // Clone the original toolbar image and place it on the canvas
            const $clone = $('<img>')
                .attr('src',  $original.attr('src'))
                .attr('data-type', $original.data('type'))
                .addClass('placed-item')
                .css({
                    left: left,
                    top:  top,
                    width:  $original.width(),
                    height: $original.height()
                })
                .appendTo($kitchen);

            // Make the placed item draggable within the kitchen
            $clone.draggable({
                containment: $kitchen,
                cursor: 'grabbing',
                stack: '.placed-item'
            });

            // Right-click to delete
            $clone.on('contextmenu', function (e) {
                e.preventDefault();
                $contextTarget = $(this);
                $menu.css({ top: e.pageY, left: e.pageX }).addClass('visible');
            });
        }
    });

    // Close context menu on Escape
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') $menu.removeClass('visible');
    });
});
