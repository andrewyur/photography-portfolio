const sizes = [12, 5, 3, 2]

const store = {}

// theoretically this could return null, but with the current sizes it works with every amount > 1

export function findLayoutDivision(amount) {
    if (amount <= 0) return []
    if (amount < sizes.at(-1)) return null
    if (store.hasOwnProperty(amount)) return store[amount]
        
    for (const size of sizes) {
        if(amount - size < 0) continue

        const remainingLayout = findLayoutDivision(amount - size)
        if(remainingLayout){
            const layout = [...remainingLayout, size]
            store[amount] = layout
            return layout
        }

    }
    
    store[amount] = null
    return null
}

