#!/bin/sh

set -eu

echo "Executing 'node $@'..."
exec node "$@"
