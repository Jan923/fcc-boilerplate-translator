const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  translate(text, locale) {
    if (locale === 'american-to-british') {
      this.locale = 'american-to-british';
      let textArray = text.split(' ');
      let loopLength = textArray.length - 1;
        for (let i = 0; i <= loopLength; i++) {
        let index = i;
        let word = textArray[i];
        //console.log('Initial word: ' + word);
        //console.log('index ' + i);
        let regex = /^[0-9]+[:][0-5][0-9]/g;
        if (word.toLowerCase() in americanToBritishTitles) {
          let translatedTitle = americanToBritishTitles[word.toLowerCase()];
          let capitalizedTitle = this.capitalizeFirstLetter(translatedTitle);
          textArray.splice(index, 1, `<span class="highlight">${capitalizedTitle}</span>`);
        }
        word = word.endsWith('.') ? word.slice(0, -1) : word; // Remove period if it exists
        if (word.toLowerCase() in americanOnly) {
          textArray.splice(index, 1, `<span class="highlight">${americanOnly[word.toLowerCase()]}</span>`);
          //console.log(americanOnly[word] +' added (1 exact match in americanOnly')
        } else {
          for (const propertyName in americanOnly) {  // Iterate over property names of americanOnly for multi word matches
            if (propertyName.includes(word.toLowerCase() + ' ')) {
              //console.log('Found part match in americanOnly for (First word): ' + propertyName);
              if (index + 1 <= loopLength) {  // Check if the next word should be included
                let secondWord = textArray[index + 1].toLowerCase();
                secondWord = secondWord.endsWith('.') ? secondWord.slice(0, -1) : secondWord;
                const twoWords = word.toLowerCase() + ' ' + secondWord;
                //console.log(twoWords);  // Combine current word and next word for multi-word search
                if (propertyName.includes(twoWords + ' ')) {
                  //console.log('Found part match in americanOnly for (First two word): ' + propertyName);
                  if (index + 2 <= loopLength) { // Check for a third word
                    let thirdWord = textArray[index + 2].toLowerCase();
                    thirdWord = thirdWord.endsWith('.') ? thirdWord.slice(0, -1) : thirdWord;
                    const threeWords = twoWords + ' ' + thirdWord;
                    //console.log(threeWords);
                    if (threeWords in americanOnly) {
                      // Replace current word, next word, and third word
                      textArray.splice(index, 3, `<span class="highlight">${americanOnly[propertyName]}</span>`);
                      loopLength-=2;
                      //console.log(americanOnly[propertyName] +' added (exact 3 word match)');
                      break;
                    }
                  } else if (twoWords in americanOnly) {// Replace current word and next word
                    textArray.splice(index, 2, `<span class="highlight">${americanOnly[propertyName]}</span>`);
                    loopLength--;
                    //console.log(americanOnly[propertyName] +' added (exact 2 word match)');
                    }
                    break;
                }
                else if (twoWords in americanOnly) {// Replace current word and next word
                  textArray.splice(index, 2, `<span class="highlight">${americanOnly[propertyName]}</span>`);
                  //console.log(textArray);
                  //console.log(americanOnly[propertyName] +' added (exact 2 word match)');
                  loopLength--;
                }
                break;
              }
              // No next word
              break;
            }
          }
        }
        if (word in americanToBritishSpelling) {
          textArray.splice(index, 1, `<span class="highlight">${americanToBritishSpelling[word]}</span>`)
        }
        if (word.match(regex)) {
          textArray.splice(index, 1, `<span class="highlight">${word.replace(':', '.')}</span>`);
        }

      }
      let translation = textArray.join(' ');
      if (!translation.endsWith('.') && !translation.endsWith('!') && !translation.endsWith('?')) {translation += '.'}
      return translation
    } else if (locale === 'british-to-american') {
      this.locale = 'british-to-american';

      function swap(obj) {
        const key = Object.keys(obj);
        const value = Object.values(obj);
        let result = {};
        value.forEach((element, index) => {
            result[element] = key[index];
        });
        return result;
      }
      const britishToAmericanTitles = swap(americanToBritishTitles);
      const britishToAmericanSpelling = swap(americanToBritishSpelling);

      let textArray = text.split(' ');
      let loopLength = textArray.length - 1;

      for (let i = 0; i <= loopLength; i++) {
        let index = i;
        let word = textArray[i];
        //console.log('Initial word: ' + word);
        //console.log('index ' + i);
        let regex = /^[0-9]+[.][0-5][0-9]/g;
        if (word.toLowerCase() in britishToAmericanTitles) {
          let translatedTitle = britishToAmericanTitles[word.toLowerCase()];
          let capitalizedTitle = this.capitalizeFirstLetter(translatedTitle);
          textArray.splice(index, 1, `<span class="highlight">${capitalizedTitle}</span>`);
        }
        word = word.endsWith('.') ? word.slice(0, -1) : word; // Remove period if it exists
        if (word.toLowerCase() in britishOnly) {
          textArray.splice(index, 1, `<span class="highlight">${britishOnly[word.toLowerCase()]}</span>`);
          //console.log(britishOnly[word] +' added (1 exact match in britishOnly')
        }  else {
          for (const propertyName in britishOnly) {  // Iterate over property names of britishOnly for multi word matches
            if (propertyName.includes(word.toLowerCase() + ' ')) {
              //console.log('Found part match in britishOnly for (First word): ' + propertyName);
              if (index + 1 <= loopLength) {  // Check if the next word should be included
                let secondWord = textArray[index + 1].toLowerCase();
                secondWord = secondWord.endsWith('.') ? secondWord.slice(0, -1) : secondWord;
                const twoWords = word.toLowerCase() + ' ' + secondWord;
                //console.log(twoWords);  // Combine current word and next word for multi-word search
                if (propertyName.includes(twoWords + ' ')) {
                  //console.log('Found part match in britishOnly for (First two word): ' + propertyName);
                  if (index + 2 <= loopLength) { // Check for a third word
                    let thirdWord = textArray[index + 2].toLowerCase();
                    thirdWord = thirdWord.endsWith('.') ? thirdWord.slice(0, -1) : thirdWord;
                    const threeWords = twoWords + ' ' + thirdWord;
                    //console.log(threeWords);
                    if (threeWords in britishOnly) {
                      // Replace current word, next word, and third word
                      textArray.splice(index, 3, `<span class="highlight">${britishOnly[propertyName]}</span>`);
                      loopLength-=2;
                      //console.log(britishOnly[propertyName] +' added (exact 3 word match)');
                      break;
                    }
                  } else if (twoWords in britishOnly) {// Replace current word and next word
                    textArray.splice(index, 2, `<span class="highlight">${britishOnly[propertyName]}</span>`);
                    loopLength--;
                    //console.log(britishOnly[propertyName] +' added (exact 2 word match)');
                    }
                    break;
                }
                else if (twoWords in britishOnly) {// Replace current word and next word
                  textArray.splice(index, 2, `<span class="highlight">${britishOnly[propertyName]}</span>`);
                  //console.log(textArray);
                  //console.log(britishOnly[propertyName] +' added (exact 2 word match)');
                  loopLength--;
                }
                break;
              }
              // No next word
              break;
            }
          }
        }
        
        if (word in britishToAmericanSpelling) {
          textArray.splice(index, 1, `<span class="highlight">${britishToAmericanSpelling[word]}</span>`);
        }
        if (word.match(regex)) {
          textArray.splice(index, 1, `<span class="highlight">${word.replace('.', ':')}</span>`);
        }

      }
      let translation = textArray.join(' ');
      if (!translation.endsWith('.') && !translation.endsWith('!') && !translation.endsWith('?')) {translation += '.'}
      return translation
    }
  }
}

module.exports = Translator;