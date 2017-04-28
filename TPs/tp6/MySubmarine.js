/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.initBuffers = function() {

	this.vertices = [];
 	//this.normals = [];
 	this.indices = [];
 	//this.texCoords = [];

 	this.vertices.push (0.5, 0.3, 0);
 	this.vertices.push (-0.5, 0.3, 0);
 	this.vertices.push (0, 0.3, 2);

 	this.indices.push (0, 1, 2);

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };