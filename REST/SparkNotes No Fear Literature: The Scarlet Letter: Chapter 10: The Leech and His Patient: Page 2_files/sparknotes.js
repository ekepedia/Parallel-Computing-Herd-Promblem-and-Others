jQuery.note_sort = [];

function addNote(name, type)
{
    if(validOrLogin()){
        return;    
    }
    var host = window.location.hostname;

    window.location = 'http://www.sparknotes.com/' + type + '/' + name + '/notes/new';
}

function addNoteInternal(name, type)
{
    var new_note_url = 'http://www.sparknotes.com/' + type + '/' + name + '/notes/new_login';
    if(!is_loggedin()){
        window.location.href = new_note_url;
        return;    
    }
    var host = window.location.hostname;

    window.location = 'http://www.sparknotes.com/' + type + '/' + name + '/notes/new';
}

function validOrLogin()
{
    if(!is_loggedin())
    {
        return popupLogin();
    }
}

function popupLogin()
{
    jQuery('.ui-dialog').css({"display" : "block"});
    jQuery('#loginForm').dialog("open");
    return true;
}

function displayNotes(sparknote_id, sort, page)
{
        jQuery.ajax({
        type: 'GET',
        url: "/sparknotes/notes/" + sparknote_id + "/" + page ,
        data: { 'sort' : sort, 'notepage' : page},
        success: 
        function(data)
        {
            
             jQuery('#note_display').html(data);
             sorts = {'helpful' : 'Most Helpful', 'newest' : 'Newest'};
             sort_list = jQuery.map(sort, function(v, i){return '<em>' + sorts[v] + '</em>';});
             if(sort.length != 0){
                status = ', showing ' + sort_list.join(' and ');
                jQuery('#note_sort_info').html(status);
             } else {
                 jQuery('#note_sort_info').html("");
             }
        }
    });
}

function searchNotes()
{
        sparknote_id = jQuery('#sparknote_id').val()
        jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: "/sparknotes/notes/" + sparknote_id + "/search",
        data: { 'term' : jQuery('#search-basic').val(), 'sparknote_id': sparknote_id},
        success: 
        function(data)
        {

             jQuery('#note_display').html(data['results']);
             jQuery('#note_sort_display').html(data['total_html']);
             jQuery('.viewComments').hide();
        }
    });    
}
function vote(note_id, thumb)
{
        upvote = (thumb.id == 'thumbsUp');
        jQuery.ajax({
        type: 'POST',
        url: "/sparknotes/notes/vote",
        data: { 'note_id' : note_id, 'upvote' : upvote},
        success: 
        function(data)
        {
            jQuery("#helpfulcount").hide();

            jQuery("#helpfulcount").html(data);
            jQuery("#helpfulcount").fadeIn();
            jQuery("#upvote_downvote").fadeOut();
            jQuery("#upvote_downvote").html('<em style="float:left">Thank you for your feedback.</em>');
            jQuery("#upvote_downvote").fadeIn();
        }
    });
}

function note_flag(note_id)
{
        if(validOrLogin())
        return;

    if(!confirm("Are you sure you want to flag this note for review?"))
        return;
        jQuery.ajax({
        type: 'POST',
        url: "/sparknotes/notes/flag",
        data: { 'note_id' : note_id },
        success: 
        function(data)
        {
            jQuery("#flag_note").css({'color': 'red'});
            jQuery("#flag_note").html("Flagged");
        }
    });
}

function cancel_new_note()
{
    window.history.back();
}

jQuery(function(){

    jQuery("#title, #content").focus(function(){
        if(validOrLogin())
        return;
    });
    if(jQuery('h2.paddingBottom').length && jQuery('h2.paddingBottom').html() == 'Add a Note') // only activate the cancel function on new note page
    {        
        jQuery('.noteContainer div.addCommentBottom input.cancel').click(function() {cancel_new_note();});   
    }
    jQuery('[type="radio"][name="sort[]"]').click(function(){
        jQuery('[name="sort[]"]:checked').each(function(k,v){jQuery.note_sort.push(v.value);});
        sn_id = jQuery("#sparknote_id").val();
        displayNotes(sn_id, jQuery.note_sort);
        jQuery.note_sort = [];
    });





});

