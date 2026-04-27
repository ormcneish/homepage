$(function () {
    let zCounter = 1;

    function checkComplete() {
        const total = $(".dropzone").length;
        const filled = $(".dropzone").filter(function () {
            return $(this).children("img").length > 0;
        }).length;

        if (filled === total) {
            $(".complete-popup").addClass("shown");
        }
    }

    $(".complete-popup .close-btn").on("click", function () {
        $(".complete-popup").removeClass("shown");
    });

    $(".item").draggable({
        revert: "invalid",
        helper: "clone" 
    });

    $(".dropzone").droppable({
        accept: function(draggable) {
            return draggable.data("type") === $(this).data("accept")     
        },

        drop: function(event, ui) {
            const zone = $(this);
            zone.empty();
            
            const item = $(ui.draggable).clone().css({
                    width:"100%",
                    height:"100%",
                    objectFit:"contain",
                    position:"absolute",
                    top: 0,
                    left:0,
                    zIndex: zCounter++
                });
            
            zone.append(item);

            item.draggable({
                revert:"invalid",
                helper: "clone"
            });

            checkComplete();
        }
    });
});

$(".hint-btn").on("click", function () {
    const overlay = $(".solved");
    const isVisible = overlay.is(":visible");
    overlay.toggle();
    $(this).text(isVisible ? "Hint" : "Hide Hint");
});

