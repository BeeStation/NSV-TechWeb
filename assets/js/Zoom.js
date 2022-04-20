jQuery(document).ready(function($)
{
    var zoom_level=100;
    
    //Click events
    $('#zoom_in').click(function() { zoom_page(10, $(this)) });
    $('#zoom_out').click(function() { zoom_page(-10, $(this)) });
    $('#zoom_reset').click(function() { zoom_page(0, $(this)) });

    function zoom_page(step, trigger)
    {
        if (zoom_level>=100 && step>0 || zoom_level<=75 && step<0)
        {
            return;
        } 

        if(step==0) {
            zoom_level=100;
        } else {
            zoom_level=zoom_level+step;
        }

        var scale = zoom_level / 100;

        $('#tree-simple').css({
            transform: 'scale('+(scale)+')',
            transformOrigin: '50% 0'
        });

        if(zoom_level>100){
            $('#tree-simple').css({ 
                width: (zoom_level*1.2)+'%' 
            });
        } else {
            $('#tree-simple').css({ 
                width: '100%' 
            });
        }
        if(zoom_level>=100 || zoom_level<=80){
            trigger.addClass('disabled');
        } else {
            trigger.parents('ul').find('.disabled').removeClass('disabled');
        }
        if(zoom_level!=100){
            $('#zoom_reset').removeClass('disabled');
        } else {
            $('#zoom_reset').addClass('disabled');
        }
    }
});