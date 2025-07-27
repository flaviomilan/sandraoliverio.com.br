function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var headers = request.headers;
  
  // Don't rewrite requests for static assets (CSS, JS, images, fonts, etc.)
  if (uri.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|xml|txt|json)$/i)) {
    return request;
  }
  
  // Don't rewrite requests that already point to an HTML file
  if (uri.match(/\.html$/i)) {
    return request;
  }
  
  // Don't rewrite the Astro assets directory
  if (uri.startsWith('/_astro/')) {
    return request;
  }
  
  // Handle root path with simple language detection (only once)
  if (uri === '/') {
    var acceptLanguage = headers['accept-language'] ? headers['accept-language'].value : '';
    
    // Only redirect if we can detect a supported language
    if (acceptLanguage && acceptLanguage.includes('pt-')) {
      request.uri = '/pt/index.html';
    } else if (acceptLanguage && acceptLanguage.includes('de-')) {
      request.uri = '/de/index.html';  
    } else {
      request.uri = '/index.html';
    }
    return request;
  }
  
  // Handle language root paths (pt, de)
  if (uri.match(/^\/(pt|de)\/?$/)) {
    request.uri = uri.replace(/\/?$/, '/index.html');
    return request;
  }
  
  // Handle paths ending with slash - add index.html
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }
  
  // For all other paths without file extension, add /index.html
  if (!uri.match(/\./)) {
    request.uri = uri + '/index.html';
  }
  
  return request;
}