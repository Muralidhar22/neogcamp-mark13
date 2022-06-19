const showBtn = document.querySelector("#show-btn")
const bdayDate = document.querySelector("#bday-input")
const result = document.querySelector("#result")
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const crunchingNumbersGif = document.querySelector(".crunching-numbers-gif")

showBtn.addEventListener('click', isBirthdayPalindrome)

// changing the values of date into String
function dateValuesToString(date){
    var stringDate = {day : '', month : '', year : ''};
    if (date.day < 10)
        stringDate.day = '0' + date.day;
    else 
        stringDate.day = date.day.toString();

    if (date.month < 10)
        stringDate.month = '0' + date.month;
    else 
        stringDate.month = date.month.toString();
    
    stringDate.year = date.year.toString();
    return stringDate;
}

// reversing the string using in built javascript methods
function reverseStr(str){
  return str.split('').reverse().join('')
}

//Checking palindrome or not
function isPalindrome(str){
    const reverse = reverseStr(str)
    return str === reverse;
}
// checking palindrome for all date formats
function isPalindromeForAllDateFormats(dateObj){
    const allDateFormatsList = allDateFormats(dateObj)
    for(let i = 0; i < allDateFormatsList.length; i++){
        if(isPalindrome(allDateFormatsList[i])){
            return true;
        }
    }
    return false;
}
// checking the current year is a leapyear (or) not
function isLeapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
// function to check next palindrome date
function nextPalindromeDate({ day, month, year }){
    let count = 0
    let palindromeDate;
    function incrementDate(day,month,year){
       count++;
       day = day + 1;
         if(month === 2){
            if(isLeapYear(year) && day > 29){
                day = 1;
                month = 3;
            }
            else if(day > 28){
                day = 1;
                month = 3;
            }
         }
         if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
         }
         if(month > 12){
            day = 1;
            month = 1;
            year++;
         }
        const stringDate = dateValuesToString({ day, month, year })
        if(isPalindromeForAllDateFormats(stringDate)){
            palindromeDate = {
                count,
                date: {
                    day: day,
                    month: month,
                    year: year
                }
            }
            return
        }
        else{
            return incrementDate(day,month,year)
        }
    }
    incrementDate(day,month,year)
    return palindromeDate
}
// function to check previous palindrome date
function previousPalindromeDate({ day, month, year }){
    let count = 0;
    let palindromeDate;
    function decrementDate(day, month, year){
        day = day - 1
        count++;
        if(month === 3){
            if(isLeapYear(year) && day === 0){
                day = 29;
                month = 2;
            }
            else{
                day = 28;
                month = 2;
            }
        }
    if(day === 0){
        month--;
        day = daysInMonth[month - 1];
    }
    if(month === 0){
        day = 31;
        month = 12;
        year--;
    }
    const stringDate = dateValuesToString({ day, month, year })
    if(isPalindromeForAllDateFormats(stringDate)){
       palindromeDate = {
            count,
            date: {
                day: day,
                month: month,
                year: year
            }
        }
       return
    }
    else{
        return decrementDate(day,month,year)
    }
}
    decrementDate(day,month,year)
    return palindromeDate
}
// creating and returning all date formats
function allDateFormats(date){
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function isBirthdayPalindrome(){
    result.className = "";
    result.innerHTML = "";
    if(bdayDate.value){
        const date = bdayDate.value.split('-');
        const day = date[2];
        const month = date[1];
        const year = date[0];

        const dateObj = {
            day: Number(day),
            month: Number(month),
            year: Number(year)
        };
        const stringDate = dateValuesToString(dateObj)
        const isDobPalindrome = isPalindromeForAllDateFormats(stringDate)
        crunchingNumbersGif.style.display= "block";
    setTimeout(() => {
        if(isDobPalindrome){
          
            result.innerHTML = `Yay!! your birthday is a PALINDROME`
        }
        else{
            const nextPalindrome =  nextPalindromeDate(dateObj)
            const previousPalindrome = previousPalindromeDate(dateObj)
            crunchingNumbersGif.style.display= "block";
           
                console.log("set timeout running")
                if(nextPalindrome.count > previousPalindrome.count){
                    result.innerHTML  = `Sorry 😬 your birthday is not a palindrome, nearest palindrome <span class="palindrome-date"> ${previousPalindrome.date.day}-${previousPalindrome.date.month}-${previousPalindrome.date.year}</span>, you missed by ${previousPalindrome.count} day(s)`
                }
                else result.innerHTML = `Sorry 😬 your birthday is not a palindrome, nearest palindrome date is <span class="palindrome-date"> ${nextPalindrome.date.day}-${nextPalindrome.date.month}-${nextPalindrome.date.year}</span>, you missed by ${nextPalindrome.count} day(s)`
                crunchingNumbersGif.style.display= "none";
              
        }
    }, "10000")
    }

    else{
        result.className = "error";
        result.innerHTML = `<em>Please enter valid Date Of Birth</em>`
    }

}

