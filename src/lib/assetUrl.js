const BASE_62_CHAR_SET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const SHARED_STREAM_TOKEN = import.meta.env.VITE_SHARED_STREAM_TOKEN;

// converts a base62 string into an integer
function base62ToInt(base62String) {
    let result = 0
    for(let i = 0; i < base62String.length; i++){
        result = result * 62 + BASE_62_CHAR_SET.indexOf(base62String[i])
    }
    return result
}

// determines server partition from shared stream token
function extractServerPartition(){
    if(SHARED_STREAM_TOKEN[0] == "A") 
        return base62ToInt(SHARED_STREAM_TOKEN[1])

    return base62ToInt(SHARED_STREAM_TOKEN.slice(1, 3))
}

// constructs the base url of the API from the server partition
function getBaseUrl() {
    const server_partition = extractServerPartition()

    return `p${server_partition.toString().padStart(2, "0")}-sharedstreams.icloud.com`
}

export const ASSET_URL = `${import.meta.env.VITE_CORS_URL}/?url=https://${getBaseUrl()}/${SHARED_STREAM_TOKEN}/sharedstreams/webasseturls`