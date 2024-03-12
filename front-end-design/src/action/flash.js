export function addFlashMessage(message) {
    return {
        type: "addFlash",
        message
    }
}

export function delFlashMessage(message) {
    return {
        type: "delFlash"

    }
}