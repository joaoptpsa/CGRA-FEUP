/**
 * MyClockHand
 * @constructor
 */
 function MyClockHand(scene) {
 	CGFobject.call(this,scene);
    
    this.angle = 0;

 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function() {
 	this.vertices = [
 	-0.025,0,0,
 	0.025,0,0,
 	0,1,0
 	];

 	this.indices = [
 	0, 1, 2
 	];

 	this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ]

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyClockHand.prototype.setAngle = function (newAngle){
   this.angle = newAngle;
 }
