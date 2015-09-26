// Google AdSense Script
(function(G,o,O,g,L,e){G[g]=G[g]||function(){(G[g]['q']=G[g]['q']||[]).push(
  arguments)},G[g]['t']=1*new Date;L=o.createElement(O),e=o.getElementsByTagName(
  O)[0];L.async=1;L.src='//www.google.com/adsense/search/async-ads.js';
  e.parentNode.insertBefore(L,e)})(window,document,'script','_googCsa');

$(function(){
 
  // Dom binding
  var $searchInput = $('#search-input');
  var $resultContainer = $('#search-results-container');
  var $searchStatsContainer = $('#search-stats-container');
  var $adContainer = $('#adcontainer');

  var prevQuery = $searchInput.val() || '';

  // AdSense Configuration
  var pageOptions = { 
    'pubId' : 'pub-9616389000213823', // Enter your own pubId here!
    'query' : ''
  };

  // Define the container for Adsense
  var adblock = {
    'container': 'adcontainer',
    'width': 900
  };

  // Appbase Configuration
  var appbase = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: 'methi-yourstory',
    username: 'uw3qB83pZ',
    password: 'ac1a0fc1-e4eb-4344-9c0d-2c24c69fc91d'
  });

  // Search in Action
  $searchInput.on('keyup change', function(event) {
    event.preventDefault();
    var $input = $(this);
    console.log($input.val())

    if ($input.val() && $input.val() !== prevQuery) {
      prevQuery = $input.val();

      // Refresh AdSense results
      pageOptions.query = prevQuery;
      prevQuery && _googCsa('ads', pageOptions, adblock);

      // Refresh Methi results
      searchArticles(prevQuery);
    }
    if(!$input.val()){
      $searchStatsContainer.html('');
      $resultContainer.html('<p class="bg-warning">Hint: Search for terms like  <strong>Ola Cabs</strong>, <strong>Hiring</strong>, <strong>Handicrafts</strong></p>');
      $adContainer.html('');
    }
  });

  function searchArticles(query) {
    appbase.streamSearch({
      type: 'article',
      body: {
        "from": 0,
        "size": 5,
        "fields": ["link"],
        "query": {
          "multi_match": {
            "query": query,
            "fields": [
              "title_simple^2", "title_ngrams"
            ],
            "operator": "and"
          }
        },
        "highlight": {
          "fields": {
            "title": {
              "fragment_size": 100,
              "no_match_size": 100
            }
          }
        }
      }
    }).on('data', function(response) {
      displayResults(response);
      displaySearchStats(response);
    }).on('error', function(error) {
      console.log(error)
    })
  }
  function displayResults(content) {
    var html = ''
    
    if (content.hits.total > 0) {
      jQuery.map(content.hits.hits, function(hit) {
        console.log(hit)
        html += '<p><a href="http://' + hit.fields.link.toString().slice(0, -10) +'" target="_blank">' + hit.highlight.title + '</p>'
      });
    }
    else {
      html = 'No results found';
    }

    $resultContainer.html(html);
  }
  function displaySearchStats(content) {
    var html = content.hits.total + ' articles <small>founds in <strong>' + content.took / 1000 + ' seconds</strong>';
    $searchStatsContainer.html(html);
  }
});