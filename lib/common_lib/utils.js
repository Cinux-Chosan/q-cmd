const { isArray } = Array;
exports.mkArray = (data) => isArray(data) ? data : [ data ]
