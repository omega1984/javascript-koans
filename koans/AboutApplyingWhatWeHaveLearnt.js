var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var productsICanEat = products.filter(pizza => pizza.containsNuts === false && _(pizza.ingredients).all(ing => ing !== "mushrooms"));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1000).filter(num => num % 3 === 0 || num % 5 === 0).reduce((a, b) => a + b);   /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.chain(products)
                       .map(pizza => pizza.ingredients)
                       .flatten()
                       .reduce(function(base, item){
                         if (base[item]){
                           base[item] += 1;
                         }else{
                           base[item] = 1;
                         }
                         return base;
                       }, {})
                       .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var largestPrimeFactor = function(num){
      var i = 2;
      while (i <= num){
        if (num % i === 0){
          num = num / i;
        }else{
          i++;
        }
      }
      return i;
    }
    expect(largestPrimeFactor(100)).toEqual(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var largestPalindrome = function(num1, num2){
      if (num1 < 100 || num2 < 100) return "N/A"
      var result = [];
      var product;

      for (var i = 100; i <= num1; i++){
        for (var j = 100; j <= num2; j++){
          product = i * j;
          if (isPalindrome(product)){
            result.push(product);
          }
        }
      }
      return Math.max.apply(null, result);
    }
    var isPalindrome = function(number){
      return number.toString() === number.toString().split("").reverse().join("");
    }
    expect(largestPalindrome(500, 600)).toEqual(272272);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var divisible = function(limit){
      var num = 40;
      for (var i = 1; i <= limit; i++){
        if (num % i !== 0){
          num++;
          i = 1;
        }
        if (num % i === 0 && i === limit){
          return num;
        }
      }
    }
    expect(divisible(20)).toEqual(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sumSquare = function(num){
      var numArr = _.range(num+1).slice(1);
      var sum = numArr.reduce((a, b) => a + b);
      var square = sum **2;
      var squareArr = numArr.map(item => item **2);

      return square - squareArr.reduce((a, b) => a + b);
    }
    expect(sumSquare(3)).toBe(22);
  });

  it("should find the 10001st prime", function () {
    var findPrime = function(){
      var arr = [];
      var i = 2;
      while (arr.length < 10001){
        if (isPrime(i)){
          arr.push(i);
          i++;
        }else{
          i++;
        }
      }
      return arr.pop();
    }

    var isPrime = function(num){
      var limit = Math.sqrt(num);
      for (var i = 2; i <= limit; i++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }
    expect(findPrime()).toBe(104743);
  });
  
});
