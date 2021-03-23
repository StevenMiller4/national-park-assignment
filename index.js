const apiKey = 'RdRckg8Gr5UsXSWHKfKM2iyodXDcGFHCDbTFVDhZ'; 
const searchURL = 'developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.items.length; i++){
    $('#results-list').append(
      `<li><h3>${}</h3>
      <p>${}</p>
      <img src='${}'>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function findPark(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    stateCode: searchState,
    maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

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