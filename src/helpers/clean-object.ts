export const cleanObject = <T>(obj: T): Partial<T> => {
    const cleanedObj: Partial<T> = {};
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            cleanedObj[key] = obj[key];
        }
    }
    return cleanedObj;
};