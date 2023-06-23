let config = {
    portApi : 3000
}
let getUrlFetch = function(){
    return "http://" + window.location.host.split(":")[0] + ":" + config.portApi
}
export default config

export {getUrlFetch}