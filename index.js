'use strict';

const apiKey = 'RdRckg8Gr5UsXSWHKfKM2iyodXDcGFHCDbTFVDhZ'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`) //`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><a href="${responseJson.data[i].url}" target="_blank"><h3>${responseJson.data[i].fullName}</h3></a>
      <p>${responseJson.data[i].description}</p>
      </li>` 
    )};
  $('#results').removeClass('hidden');
  $('#js-search-term').val('');
};

function findPark(query, maxResults=10) {
  const params = {
    stateCode: query,
    api_key: apiKey,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    findPark(searchState, maxResults);
  });
}

$(watchForm);