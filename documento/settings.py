"""Django settings for documento project."""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv(
    "DOCUMENTO_SECRET_KEY", "r$ebsd+3b&*4i)lf1uw(r*%k13yn7%41oi7ulw)+bgoke498_^"
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(int(os.getenv("DOCUMENTO_DEBUG", 1)))

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "webpack_loader",
    "documents.apps.DocumentsConfig",
    "rest_framework",
    "knox",
    "django_cleanup.apps.CleanupConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "documento.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates"),],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "documento.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": os.getenv("DOCUMENTO_DB_ENGINE", "django.db.backends.sqlite3"),
        "NAME": os.getenv("DOCUMENTO_DB_NAME", os.path.join(BASE_DIR, "db.sqlite3")),
    }
}
e = os.getenv("DOCUMENTO_DB_USER")
if e:
    DATABASES["default"]["USER"] = e
e = os.getenv("DOCUMENTO_DB_PASSWORD")
if e:
    DATABASES["default"]["PASSWORD"] = e
e = os.getenv("DOCUMENTO_DB_HOST")
if e:
    DATABASES["default"]["HOST"] = e
e = os.getenv("DOCUMENTO_DB_PORT")
if e:
    DATABASES["default"]["PORT"] = e

# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
if DEBUG:
    WEBPACK_STATS_FILE = "webpack-stats.dev.json"
else:
    WEBPACK_STATS_FILE = "webpack-stats.prod.json"
WEBPACK_LOADER = {
    "DEFAULT": {
        "BUNDLE_DIR_NAME": "bundles/",
        "STATS_FILE": os.path.join(BASE_DIR, "frontend", WEBPACK_STATS_FILE),
    }
}

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "knox.auth.TokenAuthentication",
    ),
}

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
X_FRAME_OPTIONS = "SAMEORIGIN"
