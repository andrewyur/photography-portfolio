const sizes = [12, 5, 3, 2]

const store = new Map()

export function findLayoutDivision(amount) {
    if (amount == 1) return [1]
    return _findLayoutDivision(amount)
}

function _findLayoutDivision(amount) {
    if (amount <= 0) return []
    if (amount < sizes.at(-1)) return null
    if (store.has(amount)) return store.get(amount)
        
    for (const size of sizes) {
        if(amount - size < 0) continue

        const remainingLayout = _findLayoutDivision(amount - size)
        if(remainingLayout){
            const layout = [...remainingLayout, size]
            store.set(amount, layout)
            return layout
        }

    }
    
    store.set(amount, null)
    return null
}

