(function($) {
    $.fn.hideKeyboard = function() {
        var inputs = this.filter("input").attr('readonly', 'readonly'); // Force keyboard to hide on input field.
        var textareas = this.filter("textarea").attr('disabled', 'true'); // Force keyboard to hide on textarea field.
        setTimeout(function() {
            inputs.blur().removeAttr('readonly'); //actually close the keyboard and remove attributes
            textareas.blur().removeAttr('disabled');
        }, 100);
        return this;
    };
}(jQuery));