/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            //face cima
            0.5,-0.5,0.5,
            0.5,0.5,0.5,
            -0.5,0.5,0.5,
            -0.5,-0.5,0.5,
            //face baixo
            0.5,-0.5,-0.5,
            0.5,0.5,-0.5,
            -0.5,0.5,-0.5,
            -0.5,-0.5,-0.5,
			];

	this.indices = [
			//face cima
            0,1,2,
            2,3,0,
            //face baixo
            4,7,6,
            6,5,4,
            //face esquerda
            3,4,0,
            3,7,4,
            //face direita
            2,1,5,
            5,6,2,
            //face frente
            5,1,0,
            0,4,5,
            //face tras
            3,2,7,
            2,6,7

        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
