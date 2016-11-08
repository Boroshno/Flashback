(function () {
    //Collect all photos and create forms for them
    $(".gellery").each(function (index) {
        var images = $(this).find("img");
        $('.imgcon').append(' \
                <figure class="cd-image-container"> \
                <img src="' + images[0].src + '" alt="Original Image"> \
                    <span class="cd-image-label" data-type="original">Original</span> \
                    <div class="cd-resize-img"> \
                    <img src="' + images[1].src + '" alt="Modified Image"> \
                        <span class="cd-image-label" data-type="modified">Modified</span> \
                    </div> \
                    <span class="cd-handle"></span> \
                </figure> \
                        ');
    });

    var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(function () { checkPosition(imageComparisonContainers); }, 100)
                : requestAnimationFrame(function () { checkPosition(imageComparisonContainers); });
        }
    });

    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function () {
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function () {
        if (!resizing) {
            resizing = true;
            (!window.requestAnimationFrame)
                ? setTimeout(function () { checkLabel(imageComparisonContainers); }, 100)
                : requestAnimationFrame(function () { checkLabel(imageComparisonContainers); });
        }
    });
})();