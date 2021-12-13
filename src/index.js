import { defined, CesiumTerrainProvider, Cesium3DTileset, IonResource, Ion, Viewer, Cesium3DTileStyle } from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css"

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk";

var viewer = new Viewer("cesiumContainer", {
  terrainProvider: new CesiumTerrainProvider({
    url: IonResource.fromAssetId(1),
  }),
});
viewer.scene.globe.depthTestAgainstTerrain = true;

var tileset = viewer.scene.primitives.add(
  new Cesium3DTileset({
    url: IonResource.fromAssetId(354307),
  })
);

tileset.readyPromise
  .then(function () {
    viewer.zoomTo(tileset);

    // Apply the default style if it exists
    var extras = tileset.asset.extras;
    if (
      defined(extras) &&
      defined(extras.ion) &&
      defined(extras.ion.defaultStyle)
    ) {
      tileset.style = new Cesium3DTileStyle(extras.ion.defaultStyle);
    }
  })
  .otherwise(function (error) {
    console.log(error);
  });
