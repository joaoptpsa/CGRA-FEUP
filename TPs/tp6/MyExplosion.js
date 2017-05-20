var degToRad = Math.PI / 180.0;
var X = 0;
var Y = 1;
var Z = 2;

/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x, y ,z) {
	CGFobject.call(this,scene);

	var d = new Date();
	this.oldCurrTime = d.getTime();

	//Where the explosion at 
	this.pos = [];
	this.pos.push (x||0, y||0, z||0)

	this.scaleStart = [];
	this.scaleStart.push (0.1, 0.1, 0.1);

	this.scaleCurrent = [];
	this.scaleCurrent.push (this.scaleStart[X], this.scaleStart[Y], this.scaleStart[Z])

	this.scaleEnd = [];
	this.scaleEnd.push (0.5, 0.5, 0.5); //how big will it get?

	this.scaleDiff = [];
	this.scaleDiff.push (this.scaleEnd[X]-this.scaleStart[X], this.scaleEnd[Y]-this.scaleStart[Y], this.scaleEnd[Z]-this.scaleStart[Z]);

	this.duration = 1; //how long does the explosion take?

	this.explosion = new MyHalfSphere (this.scene, 20, 10);

	this.materialExplosion = new CGFappearance(this.scene);
	this.materialExplosion.setAmbient(0.6, 0.32, 0.004,1);
	this.materialExplosion.setSpecular(0.1,0.1,0.1,1);
	this.materialExplosion.setDiffuse(0.8,0.8,0.8,1);
	this.materialExplosion.setShininess(100);
	this.materialExplosion.loadTexture("resources/images/explosion.jpg");
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.display = function() {
 	
	this.scene.pushMatrix();
		this.scene.translate (this.pos[X], this.pos[Y], this.pos[Z]);
		this.scene.scale (this.scaleCurrent[X], this.scaleCurrent[Y] , this.scaleCurrent[Z]);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.materialExplosion.apply();
		this.explosion.display();
	this.scene.popMatrix();


};

MyExplosion.prototype.update = function(currTime){
	var deltaTime = currTime - this.oldCurrTime;
	this.oldCurrTime = currTime;
	
	// deltaTime / 1000 == change in seconds
	var increase;

	for (var i=0; i<3; i++){
		increase = ((deltaTime/1000)/this.duration)*this.scaleDiff[i];
		if (this.scaleCurrent[i]+increase<=this.scaleEnd[i]){
			this.scaleCurrent[i]+=((deltaTime/1000)/this.duration)*this.scaleDiff[i];
		}
	}
};