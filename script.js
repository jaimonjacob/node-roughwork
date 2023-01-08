import cloneDeep from './node_modules/lodash-es/cloneDeep.js'

const firstObject = {
    users: [`Eric`, `Dawn` , `Sean`],
    properties: {
        userType: `Human`,
        world: `Earth`
    }
}
const secondObject = Object.assign({},firstObject);
console.log(secondObject)

const thirdObject = cloneDeep(firstObject);
firstObject.properties.userType = `Aliens`
console.log(thirdObject)