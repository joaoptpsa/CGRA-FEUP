/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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

	for (i=0; i<=this.stacks; i++)
	{
		for (j=0;j<this.slices;j++)
		{
			this.vertices.push(Math.cos(theta*j), Math.sin (theta*j), i*stacksStep);
			this.normals.push((Math.cos(theta*(j))), (Math.sin(theta*(j))), 0);
		}
	}

	for (j=0; j<this.stacks; j++)
	{
			for (i=0; i<this.slices; i++)
		{
			if (!(i==this.slices-1))
			{
				this.indices.push(i+(j*this.slices),i+1+(j*this.slices),i+1+this.slices+(j*this.slices));
				this.indices.push(i+1+this.slices+(j*this.slices), i+this.slices+(j*this.slices), i+(j*this.slices));
			}
			else
			{
				/*
				this.indices.push(this.slices*(j+1)-1, this.slices*(j), this.slices*(j+2)-1);
				this.indices.push(this.slices*(j), this.slices*(j+1), this.slices*(j+2)-1);
				*/
				// ou
				this.indices.push(this.slices*(j), this.slices*(j+1), this.slices*(j+1)-1);
				this.indices.push(this.slices*(j+1)-1, this.slices*(j+1), this.slices*(j+2)-1);
				
			}
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
