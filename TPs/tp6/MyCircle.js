/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, slices, radius) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.radius = radius;

 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
 	this.texCoords = [];
	
	var theta=(2*Math.PI)/this.slices;

	//lets start by mapping a vertice in the origin (so we can make "triangles")

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1); 
	this.texCoords.push (0.5, 0.5);

	for (i=0;i<=this.slices;i++) // <= because we have to repeat the first vertice in order to get a seamless texture
	{
		this.vertices.push(Math.cos(theta*i)*this.radius, Math.sin (theta*i)*this.radius, 0);
		this.normals.push(0, 0, 1);   //The normals are always the same (this is a circle)
		//Ok, now keep in mind that we the cos varies between -1 and 1 , we want it divede by 2 to make it vary between -0,5 and 0.5 and then add 0.5 so we can get values between 0  and 1
		this.texCoords.push ((Math.cos(theta*i)/2)+0.5, (Math.sin (theta*i)/2)+0.5);
	}

	for (i=0; i<this.slices; i++){
		this.indices.push (0, i+1, i+2);
	}

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
