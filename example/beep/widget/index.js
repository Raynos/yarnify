var yarn = require('./yarn');

module.exports = function (title) {
    var elem = yarn('./beep.html');
    elem.find('.title').text(title);
    
    return {
        body : function (x) { elem.find('.body').text(x) },
        appendTo : function (e) { elem.appendTo(e) }
    };
};
