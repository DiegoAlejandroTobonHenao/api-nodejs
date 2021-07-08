const tools = {};

tools.verifyTypeNumber = (...numbers) => {

    const arrayNumbers = numbers.map(number => isNaN(parseInt(number)));

    return !arrayNumbers.some(number => number === true);
}


module.exports = tools;