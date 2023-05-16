import { Ion, Viewer, Cesium3DTileset, createGooglePhotorealistic3DTileset, GoogleMaps, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Ion.defaultAccessToken = '';
GoogleMaps.defaultApiKey = '';

const viewer = new Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
});

viewer.scene.globe.show = false;

/*
 const tileset = await createGooglePhotorealistic3DTileset();
 createGooglePhotorealistic3DTileset().then()
 tileset.debugShowViewerRequestVolume = true;
       viewer.scene.primitives.add(tileset);
          console.log("tileset: ", tileset._url)
          

              getCounter(true).then((c) => {
      if (c > 0) {
        setCounter(c);
      }
    });
*/
  createGooglePhotorealistic3DTileset().then((t) => {
    viewer.scene.primitives.add(t);
    t.debugShowBoundingVolume = true;
  });
 //viewer.scene.primitives.add(createGooglePhotorealistic3DTileset());

  const tileset = viewer.scene.primitives.add(new Cesium3DTileset({
      url: "https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyAZ8EhV6n0W2ju3uBvfR8AGn6kWuawwoyE",
      showCreditsOnScreen: true,
    }));

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  orientation : {
    heading : Math.toRadians(0.0),
    pitch : Math.toRadians(-15.0),
  }
});
