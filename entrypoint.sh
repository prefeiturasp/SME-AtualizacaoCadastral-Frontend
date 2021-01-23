#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
set -xe
  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"

set -xe
  : "${SENTRY_URL?Precisa de uma variavel de ambiente SENTRY_URL}"


sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
#sed -i "s,API_URL_REPLACE_ME,$API_URL,g" build/static/js/main*.js

sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" /usr/share/nginx/html/static/js/main*.js
#sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" build/static/js/main*.js

exec "$@"