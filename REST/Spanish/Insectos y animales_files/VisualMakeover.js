
$(document).ready(function () {
    checkABSwitch();
    setCaptionEventHandling();
    styleObjectives();
    $(".contentDiv").addClass("active");
});

function setCaptionEventHandling() {
    $(".classic .gutter-icon .caption-text").click(function (e) {
        return false;
    });
};

function styleObjectives() {
    // convert objective items into a list
    $('.objectivebox').each(function () {
        if ($(this).find('ul').length == 0) {
            $(this).html('<ul>' + $(this).html() + '</ul>');
        }
        // put li tags on objectives that don't have them already
        $(this).find('span.objective:not("li span")').each(function () {
            $(this).replaceWith('<li>' + $(this).text() + '</li>');
        });
    });

    // separate items into multiple divs so that the borders can be styled like we want (new-look only)
    $('.macaw .objectivebox li').each(function () {
        var h = $(this).html();
        $(this).html('<div class="bullet-box"/><div class="objective-container"><div class="objective">' + h + '</div><div class="objective-bottom-border"/></div>');
    }).addClass(function (index) {
        return "objective-color" + index % 4;
    });

    // position the audio controls (new-look only)
    $('.macaw .objectivebox').each(function () {
        var audioPlayers = $(this).find('.audio-player').detach();
        $(this).append('<div class="footer"><div class="audio-container"></div></div>');
        $(this).find('.footer .audio-container').append(audioPlayers);
    });
}

function checkABSwitch() {
    if (typeof(getCookie) ==='undefined') {
        // if the page is displaying in the HEAT preview pane, then don't get cookie
        return;
    }
    if (getCookie('NewCourseWindow') == 'true') {
        $(".contentDiv").removeClass("classic");
        $(".contentDiv").addClass("macaw");
    }
    else {
        $(".contentDiv").removeClass("macaw");
        $("#contentDiv").addClass("classic");
    }
}