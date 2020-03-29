const handleFileInputs = () => {
    const inputs = document.querySelectorAll('.input-file');
    Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling;

        let labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            let fileName = '';
            fileName = e.target.value.split('\\').pop();

            if (fileName) {
                label.innerHTML = fileName;
            } else {
                label.innerHTML = labelVal;
            }

            readURL(input, '.js-file-output');
        });

        

    });
}

function readURL(input, pic) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(pic);
        

        reader.onload = function (e) {
            document.querySelector(pic).setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

export default handleFileInputs;