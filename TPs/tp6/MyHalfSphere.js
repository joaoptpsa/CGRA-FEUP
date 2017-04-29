/**
 * MyHalfSphere
 * @constructor
 */
 function MyHalfSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyHalfSphere.prototype = Object.create(CGFobject.prototype);
 MyHalfSphere.prototype.constructor = MyHalfSphere;

 MyHalfSphere.prototype.initBuffers = function() {
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
	var vertical_theta=(Math.PI/2)/this.stacks;
	var bottomRadius = 1;

	for (stack=0; stack<=this.stacks; stack++)
	{
		for (slice=0; slice<this.slices; slice++)
		{
			z = Math.cos(vertical_theta* stack)
			radius = Math.sqrt(bottomRadius - Math.pow(z,2)); 

			x = radius * Math.sin (theta*slice);
			y = radius * Math.cos (theta*slice);

			this.vertices.push (x, y ,z);
			this.normals.push (x, y, z);

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
				//this.indices.push(this.slices*(j+1)-1, this.slices*(j), this.slices*(j+2)-1);
				//this.indices.push(this.slices*(j), this.slices*(j+1), this.slices*(j+2)-1);
				
				// ou
				this.indices.push(this.slices*(j), this.slices*(j+1), this.slices*(j+1)-1);
				this.indices.push(this.slices*(j+1)-1, this.slices*(j+1), this.slices*(j+2)-1);
				
			}
		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
