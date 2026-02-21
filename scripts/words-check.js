let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('src/assets/json/words.json', 'utf8'));

console.log('\x1b[32m%s\x1b[0m','Checking image file names......')
let arr1=[]
obj.forEach(word => {
    arr1.push(word.img);
});

let arr2 = fs.readdirSync('src/assets/words/');

let difference = arr1.filter(x => !arr2.includes(x));
if (difference.length > 0){
    console.log('\x1b[31m%s\x1b[0m','The following image file names are not correct:');
    console.log(difference);
} else {
    console.log('\x1b[32m%s\x1b[0m','All image file names are correct :)')
}
