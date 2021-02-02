#!/bin/bash
poetry run sh -c "cd ../documento-client; poetry install"
poetry run sh -c "cd ../documento-printserver; poetry install"
