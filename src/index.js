
import {
    Cartesian3,
    Color,
    defined,
    Math as CesiumMath,
    Matrix4,
    ParticleBurst,
    ParticleSystem,
    SphereEmitter,
    Transforms,
    Viewer
} from 'cesium';

import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";

// Example app

var viewer = new Viewer('cesiumContainer');

var scene = viewer.scene;
scene.debugShowFramesPerSecond = true;

CesiumMath.setRandomNumberSeed(315);

var modelMatrix = Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(-75.59777, 40.03883));
var emitterInitialLocation = new Cartesian3(0.0, 0.0, 100.0);

var particleCanvas;

function getImage() {
    if (!defined(particleCanvas)) {
        particleCanvas = document.createElement('canvas');
        particleCanvas.width = 20;
        particleCanvas.height = 20;
        var context2D = particleCanvas.getContext('2d');
        context2D.beginPath();
        context2D.arc(8, 8, 8, 0, CesiumMath.TWO_PI, true);
        context2D.closePath();
        context2D.fillStyle = 'rgb(255, 255, 255)';
        context2D.fill();
    }
    return particleCanvas;
}

var minimumExplosionSize = 30.0;
var maximumExplosionSize = 100.0;
var particlePixelSize = 7.0;
var burstSize = 400.0;
var lifetime = 10.0;
var numberOfFireworks = 20.0;

var emitterModelMatrixScratch = new Matrix4();

function createFirework(offset, color, bursts) {
    var position = Cartesian3.add(emitterInitialLocation, offset, new Cartesian3());
    var emitterModelMatrix = Matrix4.fromTranslation(position, emitterModelMatrixScratch);
    var particleToWorld = Matrix4.multiply(modelMatrix, emitterModelMatrix, new Matrix4());
    var worldToParticle = Matrix4.inverseTransformation(particleToWorld, particleToWorld);

    var size = CesiumMath.randomBetween(minimumExplosionSize, maximumExplosionSize);
    var particlePositionScratch = new Cartesian3();
    var force = function (particle) {
        var position = Matrix4.multiplyByPoint(worldToParticle, particle.position, particlePositionScratch);
        if (Cartesian3.magnitudeSquared(position) >= size * size) {
            Cartesian3.clone(Cartesian3.ZERO, particle.velocity);
        }
    };

    var normalSize = (size - minimumExplosionSize) / (maximumExplosionSize - minimumExplosionSize);
    var minLife = 0.3;
    var maxLife = 1.0;
    var life = normalSize * (maxLife - minLife) + minLife;

    scene.primitives.add(new ParticleSystem({
        image: getImage(),
        startColor: color,
        endColor: color.withAlpha(0.0),
        life: life,
        speed: 100.0,
        width: particlePixelSize,
        height: particlePixelSize,
        rate: 0,
        emitter: new SphereEmitter(0.1),
        bursts: bursts,
        lifeTime: lifetime,
        forces: [force],
        modelMatrix: modelMatrix,
        emitterModelMatrix: emitterModelMatrix
    }));
}

var xMin = -100.0;
var xMax = 100.0;
var yMin = -80.0;
var yMax = 100.0;
var zMin = -50.0;
var zMax = 50.0;

var colorOptions = [{
    minimumRed: 0.75,
    green: 0.0,
    minimumBlue: 0.8,
    alpha: 1.0
}, {
    red: 0.0,
    minimumGreen: 0.75,
    minimumBlue: 0.8,
    alpha: 1.0
}, {
    red: 0.0,
    green: 0.0,
    minimumBlue: 0.8,
    alpha: 1.0
}, {
    minimumRed: 0.75,
    minimumGreen: 0.75,
    blue: 0.0,
    alpha: 1.0
}];

for (var i = 0; i < numberOfFireworks; ++i) {
    var x = CesiumMath.randomBetween(xMin, xMax);
    var y = CesiumMath.randomBetween(yMin, yMax);
    var z = CesiumMath.randomBetween(zMin, zMax);
    var offset = new Cartesian3(x, y, z);
    var color = Color.fromRandom(colorOptions[i % colorOptions.length]);

    var bursts = [];
    for (var j = 0; j < 3; ++j) {
        bursts.push(new ParticleBurst({
            time: CesiumMath.nextRandomNumber() * lifetime,
            minimum: burstSize,
            maximum: burstSize
        }));
    }

    createFirework(offset, color, bursts);
}

var camera = viewer.scene.camera;
var cameraOffset = new Cartesian3(-300.0, 0.0, 0.0);
camera.lookAtTransform(modelMatrix, cameraOffset);
camera.lookAtTransform(Matrix4.IDENTITY);

var toFireworks = Cartesian3.subtract(emitterInitialLocation, cameraOffset, new Cartesian3());
Cartesian3.normalize(toFireworks, toFireworks);
var angle = CesiumMath.PI_OVER_TWO - Math.acos(Cartesian3.dot(toFireworks, Cartesian3.UNIT_Z));
camera.lookUp(angle);