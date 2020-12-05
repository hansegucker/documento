#!/usr/bin/env bash
cd /var/www/
chown -R www-data:www-data /var/www/ && chmod -R 777 /var/www/media
#mkdir /tmp/preview_cache/
#chown -R www-data:www-data /tmp/preview_cache/ && chmod -R 777 /tmp/preview_cache/
service rabbitmq-server restart
#celery -A documento worker -l info -b $CELERY_BROKER &
python3 manage.py wait_for_db
python3 manage.py migrate || { echo 'migrate failed' ; exit 1; }
python3 manage.py collectstatic --noinput
mkdir -p /var/www/static/bundles/
cp -r /var/www/frontend/build/* /var/www/static/bundles/
python3 manage.py init_admin
cd /home/docker
/usr/local/bin/uwsgi --ini /etc/uwsgi/apps-enabled/uwsgi-app.ini