$(function() {
    var pieceSize = 75;

    var freeSpot = { left: 225, top: 225 };

    var positions = {
        "piece-1":  { top:   0, left:   0 },
        "piece-2":  { top:   0, left:  75 },
        "piece-3":  { top:   0, left: 150 },
        "piece-4":  { top:   0, left: 225 },
        "piece-5":  { top:  75, left:   0 },
        "piece-6":  { top:  75, left:  75 },
        "piece-7":  { top:  75, left: 150 },
        "piece-8":  { top:  75, left: 225 },
        "piece-9":  { top: 150, left:   0 },
        "piece-10": { top: 150, left:  75 },
        "piece-11": { top: 150, left: 150 },
        "piece-12": { top: 150, left: 225 },
        "piece-13": { top: 225, left:   0 },
        "piece-14": { top: 225, left:  75 },
        "piece-15": { top: 225, left: 150 }
    };

    $(document).on("deviceready", function() {
        console.log("Device Ready");
    });

    function setPositions(positions) {
        for(var key in positions) {
            var e = $("#" + key);
            e.animate({
                left: positions[key].left + "px",
                top: positions[key].top + "px"},
                150);
        }
    };

    function randomInt(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    $(".shuffle").on("click", function() {
        for(var i = 0; i < 50; i++) {
            var idx = randomInt(0, 14);
            $("#piece-" + idx).click();
        }
    });

    $(".piece").on("click", function() {
        var e = $(this);
        var id = e.attr("id");
        var clickLeft = positions[id].left;
        var clickTop = positions[id].top;

        if(clickLeft == freeSpot.left) {
            if(clickTop < freeSpot.top) {
                for(var key in positions) {
                    if(positions[key].left == clickLeft && positions[key].top >= clickTop && positions[key].top < freeSpot.top) {
                        positions[key].top += pieceSize;
                    }
                }
            } else {
                for(var key in positions) {
                    if(positions[key].left == clickLeft && positions[key].top <= clickTop && positions[key].top > freeSpot.top) {
                        positions[key].top -= pieceSize;
                    }
                }
            }
            freeSpot.top = clickTop;
        } else if(clickTop == freeSpot.top) {
            if(clickLeft < freeSpot.left) {
                for(var key in positions) {
                    if(positions[key].top == clickTop && positions[key].left >= clickLeft && positions[key].left < freeSpot.left) {
                        positions[key].left += pieceSize;
                    }
                }
            } else {
                for(var key in positions) {
                    if(positions[key].top == clickTop && positions[key].left <= clickLeft && positions[key].left > freeSpot.left) {
                        positions[key].left -= pieceSize;
                    }
                }
            }
            freeSpot.left = clickLeft;
        }

        setPositions(positions);
    });

    setPositions(positions);
});
