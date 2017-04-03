// Show/Hide containers

// These triggers rely on Semantic UI callbacks for checkboxes. For more info:
// http://semantic-ui.com/modules/checkbox.html#/usage

// Hide targets that are designated as collapsed
$('[data-state="collapsed"]')
    .each(function() {
        var $target = $(this).data('target');

        $('#' + $target).addClass('hidden');
    })
;

// Check inputs that are designated as expanded
$('[data-state="expanded"]')
    .each(function() {
        $(this)
            .prop('checked',true)
            .parent().addClass('checked')
        ;
    })
;

// Show targets as soon as their checkbox / radio button is checked
$('.ui.checkbox.collapsible')
    .checkbox()
    .checkbox({

        // Use the functions, Luke
        onChecked: function() {
            var
                $listGroup      = $(this).closest('.radio.fields'),
                $radioButtons   = $listGroup.find('.checkbox:not(.collapsible)'),
                //$radioCollapse  = $listGroup.find('.checkbox.collapsible:not(.checked)'),
                $target         = $(this).data('target')
                //$state          = $(this).data('state')
            ;

            // Get data attribute from input field and show target
            $('#' + $target).removeClass('hidden');

            // If it's a list of radio buttons, callbacks won't work when you change the selection.
            // Instead, add a trigger to all the sibling radio buttons to hide the Other field again.
            if ($radioButtons) {
                $radioButtons.checkbox({
                    onChecked: function() {
                        $('#' + $target).addClass('hidden');
                    }
                });
            }

            // If it's a group of collapsible radio buttons, only 1 target can be visible at any time.
            //if ($radioCollapse) {
            //    //$('#' + $target).removeClass('hidden');
            //
            //    console.log($radioCollapse);
            //
            //    $radioCollapse.checkbox({
            //        onChecked: function() {
            //            //$radioCollapse.addClass('hidden');
            //            $('#' + $target).removeClass('hidden');
            //        }
            //        //onUnchecked: function() {
            //        //    console.log('doeg');
            //        //    $('#' + $target).addClass('hidden');
            //        //}
            //    });
            //}
        },

        // Checkboxes respond to the onUnchecked callback, so use that to hide the Other field again.
        onUnchecked: function() {
            var $target = $(this).data('target');

            $('#' + $target).addClass('hidden');
        }
    })
;