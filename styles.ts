export function styleFunction() {
        var styles = {};
        var image = new ol.style.Circle({
          radius: 5,
          fill: null,
          stroke: new ol.style.Stroke({color: 'orange', width: 2})
        });
        styles['Point'] = new ol.style.Style({image: image});
        styles['Polygon'] = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'blue',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        });
        styles['MultiLineString'] = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
          })
        });
        styles['MultiPolygon'] = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
          })
        });
        styles['default'] = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'red',
            width: 3
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.1)'
          }),
          image: image
        });
        return function(feature) {
          return styles[feature.getGeometry().getType()] || styles['default'];
        };
      };

