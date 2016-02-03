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
    $('#warning').html("You don't have enough money to buy this catte :(");
    console.log("You don't have enough money to buy this catte :(");
    render();
    return;
  }
  if(this.stash.length >= 10) {
    $('#warning').html("You can't hold any more cattes :(");
    console.log("You can't hold any more cattes :(");
    render();
    return;
  }
  this.bank -= CatPrices[type];
  this.stash.push(type);
  console.log(this.name + ' buys a ' + type + ' catte.');
  render();
};

Player.prototype.sell = function(type) {
  if(this.stash.length <=0) {
    $('#warning').html('No more cattes to sell');
    console.log('No more cattes to sell');
    render();
    return;
  }
  var index = $.inArray(type, this.stash);
  if(index < 0) {
    $('#warning').html(type + ' cat not found in your stash');
    console.log(type + ' cat not found in your stash');
    render();
    return;
  }
  this.stash.splice(index, 1);
  this.bank += CatPrices[type];
  console.log('You have sold 1 ' + type + ' catte.');
  render();
};

Player.prototype.checkStash = function() {
  var listStash = "";
  for(var i=0; i< this.stash.length; i++) {
    listStash += '<li>' + this.stash[i].toUpperCase() + '</li>';
  }
  $('#stash').html(listStash);
  console.log('You have ' + this.stash + ' in your stash');
};

Player.prototype.checkBank = function() {
  if(this.bank === 0) {
    $('#warning').html('You have run out of money');
    $('#bank').html(this.bank);
    console.log("You have run out of money :(");
    return;
  }
  $('#bank').html(this.bank);
  console.log('Your bank is $' + this.bank);
};

Player.prototype.checkPrices = function() {
  var listPrices = ""
  for (var i in CatPrices) {
    listPrices += '<li>' + i.toUpperCase() + ': $' + CatPrices[i] + ".00" + '</li>';
  }
  $("#prices").html(listPrices);
  console.log('Local Prices are:' + '\n' + 'orange - ' + CatPrices.orange + ' / black - ' + CatPrices.black + ' / silver - ' + CatPrices.silver + ' / white - ' + CatPrices.white);
};

Player.prototype.jet= function(location) {
  this.location = location;
  days -= 1;
  $('#location').html(this.location);
  console.log('You jet to ' + this.location);
  $('#days').html(days);
  console.log('There are ' + days + ' days left' + '\r\n' + ' ');
  updatePrice();
  render();
};

var updatePrice = function() {
  var localPrice = [0.80, 1, 1.20];
  var index = Math.floor(Math.random()*3);
  CatPrices.orange = Math.floor(CatPrices.orange*localPrice[index]);
  CatPrices.black = Math.floor(CatPrices.black*localPrice[index]);
  CatPrices.silver = Math.floor(CatPrices.silver*localPrice[index]);
  CatPrices.white = Math.floor(CatPrices.white*localPrice[index]);
};

var render = function() {
  p1.checkBank();
  p1.checkStash();
  p1.checkPrices();
};

var p1 = new Player('Paul', 100, [], 'NFK');


$('#buy').on('click', function() {
  var type = $('#type').val().toLowerCase();
  p1.buy(type);
});

render();