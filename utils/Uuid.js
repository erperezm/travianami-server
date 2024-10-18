function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const randomHex = Math.random() * 16 | 0; 
        const value = c === 'x' ? randomHex : (randomHex & 0x3 | 0x8); 
        return value.toString(16);
    });
}
module.exports = getUUID;