
// describe('liverabbit homepage', function() { 
//   it('should have a title', function() {
//   	browser.get('http://localhost:1337');
//     expect(browser.getTitle()).toEqual('New Sails App');
   
//   });
//   it('should have a alert', function() {
//   	browser.get('http://localhost:1337');
// 	var b=element(by.id('bb')).click();
// 	// element(by.id('password')).sendKeys('secreta');
// 	// element(by.id('loginButton')).click();
// 	var mess = element(by.id('cc'));
// 	// console.log(mess);
// 	// name=mess.getText();
// 	var a=element(by.id('cc'))
	
// 	element(by.id('cc')).sendKeys('secreta'+ a.getText());
// 	// mess.sendKeys(name);
// 	//console.log(mess.getText().getText);
// 	// expect(element(by.id('cc')).getText() == "pepe").toBe(true);
// 	//expect(element(by.id('cc')).getText()).toEqual('pepe');
// 	//expect(element(by.id('cc')).getText()).toEqual("pepe");
// 	// expect(loginMessage.getText()).toEqual('Login Correcto');
//     expect(browser.getTitle()).toEqual('New Sails App');
   
//   });
// });

describe('homepage', function() { 
  it('should have a title', function() {
  	browser.get('http://localhost:1337/index');
    expect(browser.getTitle()).toEqual('Hi!!!');
  });
  it('should get email', function(){
  	browser.get('http://localhost:1337/index');
  	e=element(by.id('email'));
  	e.sendKeys('luciano@gmail.com')
  	
  	ee=e.getAttribute('value');
  	name=ee
  	name.then(function(text){
  		console.log(text);
  	});
  	
  	expect(ee).toEqual('luciano@gmail.com');
  });
});