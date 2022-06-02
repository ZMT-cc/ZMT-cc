
function checkType(valueName: any): string {
    return Object.prototype.toString.call(valueName)
}

export {
    checkType
}