$(function() {

    var photoUploader = $('#photo-uploader');

    $('#album-field .upload').click(function() {
        photoUploader.trigger('click');
    });

    photoUploader.change(function() {
        var file = this.files[0];
        upload(file);
    });

});


function upload(file) {

    if (window.FormData) { 

        var formData = new FormData();
        formData.append("image", file);

        $.ajax({  
            url: "/upload/image",  
            type: "POST",  
            data: formData,  
            processData: false,  
            contentType: false,  
            success: function (res) {  
                addPhoto(res.url);
            }  
        }); 

    }
}

function addPhoto(url) {

    //add input
    $('<input type="hidden">').attr({
        name: 'album[]',
        value: url
    }).appendTo('#album-field');

    //add img preview
    var newPhoto = '<li><img src="'+ url + '"><div class="delete"><a href="#">删除</a></div></li>'
    $('#album-list .album-upload').before(newPhoto);

}