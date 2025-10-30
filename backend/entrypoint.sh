#!/bin/sh
set -e

if [ -n "$DB_HOST" ]; then
  echo "Waiting for database at $DB_HOST:$DB_PORT..."
  until nc -z "$DB_HOST" "$DB_PORT"; do
    echo "DB not ready, sleeping 1s..."
    sleep 1
  done
fi

python manage.py migrate --noinput || true

# Only collect static files in non-debug mode (e.g., production)
if [ "$DEBUG" != "True" ]; then
  python manage.py collectstatic --noinput || true
fi

exec "$@"
