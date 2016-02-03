var days = 7;

function Player(name, bank, stash, location) {
  this.name = name;
  this.bank = bank;
  this.stash = stash;
  this.location = location;
}

var CatPrices = {
  'orange': 20,
  'black': 5,
  'silver': 15,
  'white': 10
};

Player.prototype.buy = function(type) {
  if(this.bank <= 0){
    console.log("You don't have enough money to buy this catte :(");
    return;
  }
  if(this.stash.length >= 10) {
    console.log("You can't hold any more cattes :(");
    return;
  }
  this.bank -= CatPrices[type];
  this.stash.push(type);
  console.log(this.name + ' buys a ' + type + ' catte.');
};

Player.prototype.sell = function(type) {
  if(this.stash.length <=0) {
    console.log('No more cattes to sell');
    return;
  }
  var index = $.inArray(type, this.stash);
  if(index < 0) {
    console.log(type + ' cat not found in your stash');
    return;
  }
  this.stash.splice(index, 1);
  this.bank += CatPrices[type];
  console.log('You have sold 1 ' + type + ' catte.')
};

Player.prototype.checkStash = function() {
  console.log('You have ' + this.stash + ' in your stash');
};

Player.prototype.checkBank = function() {
  if(this.bank === 0) {
    console.log("You have run out of money :(");
    return;
  }
  console.log('Your bank is $' + this.bank);
};

Player.prototype.checkPrices = function() {
  console.log('Local Prices are:' + '\n' + 'orange - ' + CatPrices.orange + ' / black - ' + CatPrices.black + ' / silver - ' + CatPrices.silver + ' / white - ' + CatPrices.white);
};

var updatePrice = function() {
  var localPrice = [0.80, 1, 1.20];
  var index = Math.floor(Math.random()*3);
  CatPrices.orange = Math.floor(CatPrices.orange*localPrice[index]);
  CatPrices.black = Math.floor(CatPrices.black*localPrice[index]);
  CatPrices.silver = Math.floor(CatPrices.silver*localPrice[index]);
  CatPrices.white = Math.floor(CatPrices.white*localPrice[index]);
};

Player.prototype.jet= function(location) {
  this.location = location;
  days -= 1;
  console.log('You jet to ' + this.location);
  console.log('There are ' + days + ' days left' + '\r\n' + ' ');
  updatePrice();
};

var p1 = new Player('Paul', 100, [], 'Norfolk');

p1.checkBank();
p1.checkStash();
p1.checkPrices();
p1.buy('white');
p1.jet('L.A.');

p1.checkBank();
p1.checkStash();
p1.checkPrices();
p1.buy('orange');
p1.jet('D.C.');

p1.checkBank();
p1.checkStash();
p1.checkPrices();
p1.buy('black');
p1.jet('ATL');
