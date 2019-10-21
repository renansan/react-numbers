/**
 * [customCanDrop description]
 * @param  {[type]} itemId   [description]
 * @param  {[type]} accepted [description]
 * @return {[type]}          [description]
 */
export const customCanDrop = (itemId, ItemTypes, accepted) => {
  const getNumberTypes = (n) => {
    const types = [];
    const isPrime = (value) => {
      for(var i = 2; i < value; i++) {
        if(value % i === 0) {
          return false;
        }
      }
      return value > 1;
    }

    if (n % 2 === 0) {
      types.push(ItemTypes.EVEN);
    } else {
      types.push(ItemTypes.ODD);
    }

    if (isPrime(n)) {
      types.push(ItemTypes.PRIME);
    }

    return types;
  }
  const types = getNumberTypes(itemId);
  return accepted === 'any' || types.includes(accepted);
}
