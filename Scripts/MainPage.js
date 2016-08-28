'use strict';

var L = require('leaflet');
var Vars = require('./CommonVars.js');
var map = L.map('Map').setView([51.505, -0.09], 13);

//console.log(Vars());

L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
L.tileLayer(Vars().TileLink, {
  attribution: Vars().Attribution
}).addTo(map);
