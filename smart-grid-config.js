var smartgrid = require('smart-grid');
var settings = {
    outputStyle: 'scss',
    columns: 12,
    offset: '40px',
    mobileFirst: false,
    container: {
        maxWidth: '1280px',
        fields: '0'
    },
    breakPoints: {
        md: {
            width: '1024px',
            fields: '20px',
            offset: '16px'
        },
        sm: {
            width: '320px',
            fields: '16px',
        },
    }
};

smartgrid('./src/scss', settings);