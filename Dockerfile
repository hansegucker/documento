FROM python:3.8-buster

# Configure Python to be nice inside Docker and pip to stfu
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PIP_DEFAULT_TIMEOUT 100
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PIP_NO_CACHE_DIR 1
ENV LANG C.UTF-8

# Install necessary packages for build and runtime
WORKDIR /home/docker/
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -; \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list; \
    apt-get -y update && \
    apt-get -y install eatmydata && \
    eatmydata apt-get -y upgrade && \
    eatmydata apt-get install -y --no-install-recommends \
        build-essential \
	gettext \
	libmariadbclient-dev \
	nodejs npm yarn \
	rabbitmq-server; \
	eatmydata pip install poetry uwsgi mysqlclient;

# Install backend dependencies
WORKDIR /var/www/
COPY poetry.lock /var/www/
COPY pyproject.toml /var/www/
RUN set -e; \
    mkdir -p /var/www/media /var/www/static; \
    poetry config virtualenvs.create false; \
    eatmydata poetry install;

# Install frontend dependencies
WORKDIR /var/www/frontend/
COPY frontend/yarn.lock /var/www/frontend/
COPY frontend/package.json /var/www/frontend/
RUN yarn install

# Build frontend
COPY frontend/ /var/www/frontend
RUN yarn build

# Clean up build dependencies
WORKDIR /var/www/
RUN set -e; \
    eatmydata apt-get remove --purge -y \
        build-essential \
        yarn npm nodejs \
        gettext; \
    eatmydata apt-get autoremove --purge -y; \
    apt-get clean -y; \
    eatmydata pip uninstall -y poetry; \
    rm -f /var/lib/apt/lists/*_*; \
    rm -rf /root/.cache

# Copy app files
COPY docker-setup/uwsgi-app.ini /etc/uwsgi/apps-enabled/uwsgi-app.ini
COPY docker-setup/init_and_run.sh /home/docker/init_and_run.sh
COPY . /var/www/

# Finish
EXPOSE 3031
CMD ["/home/docker/init_and_run.sh"]