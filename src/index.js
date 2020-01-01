
import { Cesium3DTileset, createWorldTerrain, IonResource, Viewer, Rectangle } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";
import CesiumNavigation from "cesium-navigation-es6";

// This is simplified version of Cesium's Getting Started tutorial.
// See https://cesium.com/docs/tutorials/getting-started/ for more details.

var viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrain()
});

var tileset = new Cesium3DTileset({
    url: IonResource.fromAssetId(40866)
});

viewer.scene.primitives.add(tileset);
viewer.zoomTo(tileset);


var options = {};
options.defaultResetView = Rectangle.fromDegrees(80, 22, 130, 50);
options.enableCompass = true;
options.enableZoomControls = true;
options.enableDistanceLegend = true;
options.enableCompassOuterRing = true;

CesiumNavigation(viewer, options);
