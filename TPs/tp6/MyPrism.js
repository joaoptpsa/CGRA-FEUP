/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
	
	var theta=(2*Math.PI)/this.slices;
	var stacksStep = 1.0/this.stacks;
	
	for (i=0; i<this.stacks; i++)
	{
		for(j=0; j<this.slices; j++)
		{
			this.vertices.push(Math.cos(theta*j), Math.sin (theta*j), i*stacksStep);
			this.vertices.push(Math.cos(theta*(j+1)), Math.sin (theta*(j+1)), i*stacksStep);

			//Push "new" vertices over the old ones for the simplicity of the loop
			this.vertices.push(Math.cos(theta*j), Math.sin (theta*j), (i+1)*stacksStep);
			this.vertices.push(Math.cos(theta*(j+1)), Math.sin (theta*(j+1)), (i+1)*stacksStep);

			//Normal vectors are all the same since they belong on the same plane
			this.normals.push(0.5*(Math.cos(theta*(j+1))+1), 0.5*(Math.sin(theta*(j+1))), 0);
			this.normals.push(0.5*(Math.cos(theta*(j+1))+1), 0.5*(Math.sin(theta*(j+1))), 0);
			this.normals.push(0.5*(Math.cos(theta*(j+1))+1), 0.5*(Math.sin(theta*(j+1))), 0);
			this.normals.push(0.5*(Math.cos(theta*(j+1))+1), 0.5*(Math.sin(theta*(j+1))), 0);

			//Right hand rule; we create (this.slices*4) vertices for each stack
			this.indices.push((this.slices*4*i)+j*4, (this.slices*4*i)+j*4+1, (this.slices*4*i)+j*4+2);
			this.indices.push((this.slices*4*i)+j*4+2, (this.slices*4*i)+j*4+1, (this.slices*4*i)+j*4+3);
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
