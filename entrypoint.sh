#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt
set -xe
  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"

set -xe
  : "${SENTRY_URL?Precisa de uma variavel de ambiente SENTRY_URL}"

set -xe
  : "${SERVER_NAME?Precisa de uma variavel de ambiente SERVER_NAME}"

set -xe
  : "${USERNAME?Precisa de uma variavel de ambiente USERNAME}"

set -xe
  : "${PASSWORD?Precisa de uma variavel de ambiente PASSWORD}"


sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js
#sed -i "s,API_URL_REPLACE_ME,$API_URL,g" build/static/js/main*.js

sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" /usr/share/nginx/html/static/js/main*.js
#sed -i "s,SENTRY_URL_REPLACE_ME,$SENTRY_URL,g" build/static/js/main*.js

sed -i "s,USERNAME_REPLACE_ME,$USERNAME,g" /usr/share/nginx/html/static/js/main*.js
sed -i "s,PASSWORD_REPLACE_ME,$PASSWORD,g" /usr/share/nginx/html/static/js/main*.js

exec "$@"