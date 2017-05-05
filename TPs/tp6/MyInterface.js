/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'toggleClock');	

	// add a group of controls (and open/expand by default)
	
	var lightGroup=this.gui.addFolder("Luzes");
	lightGroup.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	lightGroup.add(this.scene, 'luz1');
	lightGroup.add(this.scene, 'luz2');
	lightGroup.add(this.scene, 'luz3');
	lightGroup.add(this.scene, 'luz4');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5).listen();

	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	var speedDelta = 0.1;
	var rotationFactor = Math.PI/150;
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97): //lower case 'a'
		case (65): //upper case 'A'
			this.scene.submarine.rotateSub (rotationFactor);
			this.scene.submarine.updateRudderAngle (this.scene.submarine.rudderMaxAngle, -this.scene.submarine.rudderAngleDelta, 0);
			break;
		case (100): //lower case 'd'
		case (68): //upper case 'D'
			this.scene.submarine.rotateSub (-rotationFactor);
			this.scene.submarine.updateRudderAngle (this.scene.submarine.rudderMaxAngle, this.scene.submarine.rudderAngleDelta, 0);
			break;
		case (119): //lower case 'w'
		case (87): //upper case 'W'
			this.scene.submarine.changeSpeed (speedDelta);
			break;
		case (115): //lower case 's'
		case (83): //upper case 'S'
			this.scene.submarine.changeSpeed (-speedDelta);
			break;
		default:
			break; 
	};
};

