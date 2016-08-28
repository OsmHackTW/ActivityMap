'use strict';

var CommonVars = {
  NCHCLink : 'https://overpass.nchc.org.tw/overpass-turbo/',
  TileLink : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  Attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
};

module.exports = function() {
  return CommonVars;
};
