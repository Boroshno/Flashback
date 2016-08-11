jQuery(document).ready(function ($) {

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

    function checkPosition(container) {
        container.each(function () {
            var actualContainer = $(this);
            if ($(window).scrollTop() + $(window).height() * 0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function () {
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function (e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;

            dragElement.parents().on("mousemove vmousemove", function (e) {
                if (!dragging) {
                    dragging = true;
                    (!window.requestAnimationFrame)
                        ? setTimeout(function () { animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement); }, 100)
                        : requestAnimationFrame(function () { animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement); });
                }
            }).on("mouseup vmouseup", function (e) {
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function (e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;
        //constrain the draggable element to move inside his container
        if (leftValue < minLeft) {
            leftValue = minLeft;
        } else if (leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function () {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue);

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging = false;
    }

    function updateLabel(label, resizeElement, position) {
        if (position == 'left') {
            (label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth()) ? label.removeClass('is-hidden') : label.addClass('is-hidden');
        } else {
            (label.offset().left > resizeElement.offset().left + resizeElement.outerWidth()) ? label.removeClass('is-hidden') : label.addClass('is-hidden');
        }
    }


    //leaflet
    var mymap = L.map('mapid').setView([49.98, 36.23], 10);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var myIcon = L.divIcon({
        iconSize: new L.Point(10, 10)
    });

    var marker = L.marker([49.939065, 36.3669723], { icon: myIcon }).addTo(mymap);
    marker.bindPopup('asd');
});