
import { ASSET_URL } from "./assetUrl"

const photoQueue = []

// exports a load photos function, which takes a photoguid and derivative checksums, returns a promise. function stores photo metadata and corresponding promise in a global Map, and puts photo guid in a queue

export function loadDerivativeUrls(photoGuid, checksums) {
    return new Promise((resolve, reject) => {
        photoQueue.push({resolve, reject, checksums, photoGuid})
    })
}

// internal flush function, when called examines length of queue and calls the API request function if there are enough elements, and then removes them from the queue

function flushQueue() {
    if (photoQueue.length >= 25) {
        fetchDerivativeUrls(photoQueue.slice(0, 25))
        photoQueue.splice(0, 25)
    } else if(photoQueue.length > 0){
        fetchDerivativeUrls(photoQueue.slice())
        photoQueue.length = 0
    }
}

// request function calls the API, and then uses the checksums stored in the map to match the returned urls to the photos, and then fulfils the corresponding promise with the returned urls. 

async function fetchDerivativeUrls(photos) {
    let response
    try {
        response = await fetch(ASSET_URL, {
            method: "POST",
            body: JSON.stringify({
                photoGuids: photos.map((v) => v.photoGuid)
            })
        })
        response = await response.json()
    } catch(error) {
        photos.map((v) => v.reject(error.message))
        return
    }

    for (const photo of photos) {
        const derivativeUrls = {}

        for(const checksum of photo.checksums) {
            const derivative = response.items[checksum]
            derivativeUrls[checksum] = `https://${derivative.url_location}${derivative.url_path}`
        }

        photo.resolve(derivativeUrls)
    }
}

// setinterval loop to periodically call internal flush function

setInterval(flushQueue, 100)
