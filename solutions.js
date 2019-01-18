
const calculateSum = (rangeBoundryOne, rangeBoundryTwo) => {
    if(isNaN(rangeBoundryOne)){
        throw 'rangeBoundryOne must be a number '
    }
    if(isNaN(rangeBoundryTwo)){
        throw 'rangeBoundryTwo must be a number '
    }
    const lowerBounds = Math.min(rangeBoundryOne, rangeBoundryTwo);
    const upperBounds = Math.max(rangeBoundryOne, rangeBoundryTwo);
    const rangeArray = Array.from(new Array((upperBounds+1)-lowerBounds),(val,index)=>index+lowerBounds);

    var rangeSum = rangeArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);    
    return rangeSum;
}

class BankAccount {
    constructor(openingBalance){
        if(isNaN(openingBalance)){
            throw 'BankAccount must be initialized with a number.';
        }
        this.total = openingBalance;
    }
    transfer(account, amount) {
        if(!account instanceof BankAccount){
            throw 'account must be an instance of a BankAccount'
        }
        if(isNaN(amount)){
            throw 'amount must be a number.';
        }
        this.withdraw(amount);
        account.deposit(amount);
    }
    deposit(amount) {
        if(isNaN(amount)){
            throw 'amount must be a number.';
        }
        this.total += amount;
    }
    withdraw(amount){
        if(isNaN(amount)){
            throw 'amount must be a number.';
        }
        if(amount > this.total){
            throw `Cannot withdraw amount ${amount} which is greater than account balance ${this.total}.`;
        }
        this.total -= amount;
    }
}
const getSecondsPastMidnight = (time) => {
    if(!/\d{2}:\d{2}:\d{2}/.test(time)){
        throw 'time must be formated as HH:MM:SS';
    }
    const timeParts = time.split(':');
    return (parseInt(timeParts[0]) * 60 * 60)
         + (parseInt(timeParts[1]) * 60)
         + parseInt(timeParts[2]);
}

const getTimeFromSecondsPastMidnight = (secondsPastMidnight) => {
    if(isNaN(secondsPastMidnight)){
        throw 'secondsPastMidnight must be a number.'
    }
    const secondsInHour = 3600;
    const hours = Math.floor(secondsPastMidnight / secondsInHour).toString();
    const hoursRemainder = secondsPastMidnight % secondsInHour;
    const minutes = Math.floor(hoursRemainder / 60).toString();
    const seconds = (hoursRemainder % 60).toString();
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

const formatPhone = (phoneNumber) => {
    if(typeof phoneNumber != 'string'){
        throw 'phoneNumber must be a string.'    
    }
    let currentChar = '';
    let preFormated = '';
    for(currentChar of phoneNumber) {
        let isDigit = !isNaN(parseInt(currentChar, 10));
        if(isDigit) {
            preFormated += currentChar;
        }
    }
    if(preFormated.length < 10){
        // Unit test expects falsy in this case but it might be worth
        // considering throwing an exception that explains what went wrong.
        return '';
    }
    return `(${preFormated.substring(0, 3)}) ${preFormated.substring(3, 6)}-${preFormated.substring(6)}`;
}

const getWordLengths = (sentence) => {
    if(typeof sentence != 'string'){
        throw 'sentence must be a string.'    
    }
    const endingPunctuation = '.!?';
    const wordLengths = sentence.split(' ').map(word => {        
        const endsWith = word.charAt(word.length-1);
        if(endingPunctuation.includes(endsWith)){
            return word.length -1;
        }
        return word.length;
    });

    const wordLengthOccurrences = wordLengths.reduce( (allLengths, wordLength) => { 
        if (wordLength in allLengths) {
            allLengths[wordLength]++;
        }
        else {
            allLengths[wordLength] = 1;
        }
        return allLengths;
    }, {});

    return wordLengthOccurrences;
}

export {
    calculateSum,
    BankAccount,
    getSecondsPastMidnight,
    getTimeFromSecondsPastMidnight,
    formatPhone,
    getWordLengths
}

