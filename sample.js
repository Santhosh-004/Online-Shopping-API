function sortArrays(stringsArray, numbersArray) {
   if (Array.isArray(stringsArray) && Array.isArray(numbersArray) && stringsArray.length === numbersArray.length) {
     const combinedArray = stringsArray.map((str, index) => ({ str, num: numbersArray[index] }));
     combinedArray.sort((a, b) => a.num - b.num);
     stringsArray.length = 0; // Clear the original string array
     numbersArray.length = 0; // Clear the original numbers array
     combinedArray.forEach(item => {
       stringsArray.push(item.str);
       numbersArray.push(item.num);
     });
   } else {
     return "Both inputs should be arrays of the same length.";
   }
 }
 
 // Example usage:
 const strings = ["apple", "banana", "cherry", "date"];
 const numbers = [3, 1, 4, 2];
 
 sortArrays(strings, numbers);
 console.log(strings); // ["banana", "date", "cherry", "apple"]
 console.log(numbers);