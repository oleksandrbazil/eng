export const getRandom = (itemsArray, numberOfItems) => {
    let result = [];
    if (Array.isArray(itemsArray) && numberOfItems <= itemsArray.length) {
        do {
            const randomIndex = Math.floor(Math.random() * itemsArray.length);
            const item = itemsArray[randomIndex];
            if (!result.includes(item)) {
                result.push(item);
            }
        } while (result.length < numberOfItems)

    }
    return result
};