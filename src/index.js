import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from './components/tooltip'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Application extends React.Component {
  mapRef = React.createRef();
  tooltipContainer;

  getCurrentCoordinates() {
    return navigator.geolocation.getCurrentPosition(position => {
      return [position.coords.latitude, position.coords.longitude];
    });
  }
  
  setTooltip(features) {
    if (features.length) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features
          }
        ),
        this.tooltipContainer
      );
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer);
    }
  }


  componentDidMount() {
    const myRoute = [
      [
        13.358979099999999,
        52.552825
      ],
      [
        13.360362,
        52.553884
      ],
      [
        13.360852,
        52.553881
      ],
      [
        13.360995,
        52.553962
      ],
      [
        13.360395,
        52.554418
      ],
      [
        13.360152,
        52.554289
      ],
      [
        13.360001,
        52.554406
      ],
      [
        13.361401,
        52.555132
      ],
      [
        13.362078,
        52.552011
      ],
      [
        13.366893,
        52.552149
      ],
      [
        13.367095,
        52.552179
      ],
      [
        13.366654,
        52.553008
      ],
      [
        13.367136,
        52.553104
      ],
      [
        13.367327,
        52.553205
      ],
      [
        13.368034,
        52.553338
      ],
      [
        13.368483,
        52.553245
      ],
      [
        13.368704,
        52.553232
      ],
      [
        13.368895,
        52.553321
      ],
      [
        13.368922,
        52.553364
      ],
      [
        13.368875,
        52.553416
      ]
    ];
    // Container to put React generated content in.
    this.tooltipContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      zoom: 12.5,
      center: this.getCurrentCoordinates(),
    });

    // set the bounds of the map
    let bounds = [[12.3590281, 51.5527125], [14.3590281, 53.5527125]];
    map.setMaxBounds(bounds);
    // Add geolocate control to the map
    const geo = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle: true,
      showUserLocation: true
    });
    map.addControl(
        geo
    );

    let endCoord = [13.36996099999999, 52.553007599999994];
    
    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-120, 0]
    }).setLngLat([0,0]).addTo(map);

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      tooltip.setLngLat(e.lngLat);
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      this.setTooltip(features);
    });


    let size = 330;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    let pulsingDot1 = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        console.log('onAdd pulsing-dot');
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

// called once before every frame where the icon will be used
      render: function() {
        
        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.2 * t + radius;
        let context = this.context;


  
        
      let img = new Image();
      img.src ='http://localhost:3000/aswin2.png';
      img.onload = function(){
        context.save();

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(0, 255, 200,' + (1 - t) + ')';
        context.fill();

        context.clip();
// draw inner circle
        
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();
        
        context.clip(); 
        
        context.drawImage(img, 0, 0);
        context.restore();
      };
// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
      }
    };
    let pulsingDot2 = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        console.log('onAdd pulsing-dot');
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

// called once before every frame where the icon will be used
      render: function() {

        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.2 * t + radius;
        let context = this.context;




        let img = new Image();
        img.src ='http://localhost:3000/damijan2.png';
        img.onload = function(){
          context.save();

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();

          context.clip();
// draw inner circle

          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          context.clip();

          context.drawImage(img, 0, 0,);
          context.restore();
        };
// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
      }
    };
    let pulsingDot3 = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        console.log('onAdd pulsing-dot');
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

// called once before every frame where the icon will be used
      render: function() {

        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.2 * t + radius;
        let context = this.context;




        let img = new Image();
        img.src ='http://localhost:3000/kevin2.png';
        img.onload = function(){
          context.save();

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();

          context.clip();
// draw inner circle

          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          context.clip();

          context.drawImage(img, 0, 0);
          context.restore();
        };
// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
      }
    };
    let pulsingDot4 = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        console.log('onAdd pulsing-dot');
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

// called once before every frame where the icon will be used
      render: function() {

        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.2 * t + radius;
        let context = this.context;




        let img = new Image();
        img.src ='http://localhost:3000/maria2.png';
        img.onload = function(){
          context.save();

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();

          context.clip();
// draw inner circle

          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          context.clip();

          context.drawImage(img, 0, 0);
          context.restore();
        };
// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
      }
    };
    let beerPlace = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
      onAdd: function() {
        console.log('onAdd pulsing-dot');
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

// called once before every frame where the icon will be used
      render: function() {

        let duration = 1000;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.2 * t + radius;
        let context = this.context;




        let img = new Image();
        img.src ='http://localhost:3000/beer2.png';
        img.onload = function(){
          context.save();

         
// draw inner circle

          context.beginPath();
          context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 100, 100, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();

          context.clip();

          context.drawImage(img, 0, 0);
          context.restore();
        };
// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
      }
    };

    map.on('load', function() {

      console.log('route static geojson',myRoute);
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: myRoute
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
      
      


      
      
      map.addImage('pulsing-dot1', pulsingDot1, { pixelRatio: 2 });
      map.addImage('pulsing-dot2', pulsingDot2, { pixelRatio: 2 });
      map.addImage('pulsing-dot3', pulsingDot3, { pixelRatio: 2 });
      map.addImage('pulsing-dot4', pulsingDot4, { pixelRatio: 2 });
      map.addImage('beerPlace', beerPlace, { pixelRatio: 2 });


      map.addSource('beer-place', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': endCoord
              }
            }
          ]
        }
      });
      map.addSource('user1', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [13.359679099999999,52.552425]
              }
            }
          ]
        }
      }); 
      map.addSource('user2', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [13.36936099999999, 52.553807599999994]
              }
            }
          ]
        }
      });
      map.addSource('user3', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [13.36506099999999, 52.558807599999994]
              }
            }
          ]
        }
      }); 
      map.addSource('user4', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [13.35646099999999, 52.550807599999994]
              }
            }
          ]
        }
      });
      map.addLayer({
        'id': 'beer-place',
        'type': 'symbol',
        'source': 'beer-place',
        'layout': {
          'icon-image': 'beerPlace',
          // "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      }); 
      map.addLayer({
        'id': 'user1',
        'type': 'symbol',
        'source': 'user1',
        'layout': {
          'icon-image': 'pulsing-dot1',
          // "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      });
      map.addLayer({
        'id': 'user2',
        'type': 'symbol',
        'source': 'user2',
        'layout': {
          'icon-image': 'pulsing-dot2',
          // "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      }); 
      map.addLayer({
        'id': 'user3',
        'type': 'symbol',
        'source': 'user3',
        'layout': {
          'icon-image': 'pulsing-dot3',
          // "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      }); 
      map.addLayer({
        'id': 'user4',
        'type': 'symbol',
        'source': 'user4',
        'layout': {
          'icon-image': 'pulsing-dot4',
          // "icon-image": "restaurant-15",
          "icon-allow-overlap": true,
        }
      });
      

      setTimeout(function () {
        geo._geolocateButton.click();
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position.coords.latitude, position.coords.longitude);
          map.jumpTo({center: [position.coords.longitude, position.coords.latitude]});
          // geo._geolocateButton.click();
        });
      }, 100);
    });
  }

  render() {
    return (
      <div ref={this.mapRef} className="absolute top right left bottom" />
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));
