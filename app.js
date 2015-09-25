// Google AdSense Script
(function(G,o,O,g,L,e){G[g]=G[g]||function(){(G[g]['q']=G[g]['q']||[]).push(
  arguments)},G[g]['t']=1*new Date;L=o.createElement(O),e=o.getElementsByTagName(
  O)[0];L.async=1;L.src='//www.google.com/adsense/search/async-ads.js';
  e.parentNode.insertBefore(L,e)})(window,document,'script','_googCsa');

$(function(){

  // AdSense Configuration
  var pageOptions = { 
    'pubId' : 'pub-9616389000213823', // Enter your own pubId here!
    'query' : 'flowers'
  };
  var adblock = {
    'container': 'adcontainer',
    'width': 900
  };

  _googCsa('ads', pageOptions, adblock);

});