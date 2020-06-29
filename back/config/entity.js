

module.exports.getEntity = function(entity) {
    const obj=require('../src/models/'+entity);
    return obj;
}

module.exports.getName=function(entity,creatorId,callback){
    this.getEntity(entity).find({ creatorId: creatorId }).sort({ _id: -1 }).limit(1).exec(function (err, elements) {
        if (err) {
            console.log(err)
            callback({ success: false, obj: err })
        } else {
            var now = new Date();
            let year = now.getFullYear();
            var name = 0;
            if (elements === undefined || elements.length == 0) {
                name = 0;
            } else {
                name = elements[0].num;
            }
            if (!name || name === 0) {
                name = '0' + year;
            } else {
                let x = String(name);
                let year_no = x.substr(x.length - 4, 4)
                let element_no = x.substr(0, x.length - 4);
                if (String(year) === year_no) {
                    tmp = Number(element_no) + 1;
                    name = (tmp) + '' + year_no;
                } else {
                    name = '0' + year;
                }
            }
            callback({ success: true, obj: name })
        }
    })
}