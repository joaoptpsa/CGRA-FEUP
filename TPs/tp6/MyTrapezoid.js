/**
 * MyTrapezoid
 * @constructor
 */
 function MyTrapezoid(scene, a, b, minS, maxS, minT, maxT) {
 	CGFobject.call(this,scene);

    this.a = a || 0.5;
    this.b = b || 1;
    
 	this.minS = minS || 0;
 	this.maxS = maxS || 1;
 	this.minT = minT || 0;
 	this.maxT = maxT || 1;
 	
 	this.initBuffers();
 	
 };

 MyTrapezoid.prototype = Object.create(CGFobject.prototype);
 MyTrapezoid.prototype.constructor = MyTrapezoid;

 MyTrapezoid.prototype.initBuffers = function() {
   
 	this.vertices = [
 	-(this.b/2), -0.5, 0,
 	(this.b/2), -0.5, 0,
 	-(this.a/2), 0.5, 0,
 	(this.a/2), 0.5, 0
 	];

 	this.texCoords = [
    this.minS, this.maxT,
    this.maxS, this.maxT,
    this.minS+(this.maxS/4), this.minT,
    this.maxS-(this.maxS/4), this.minT,
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

 	this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]

 	this.initGLBuffers();
 };
