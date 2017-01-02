$("div:contains('God')").each(function() {
    $(this).html(function(idx, oldContent) {
        return oldContent.replace('God', 'This product');
    });
});