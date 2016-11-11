jQuery(document).ready(function($){
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

    imageSlider($('.cd-image-container'), false, false, false);

});