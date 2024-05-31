#!/bin/sh -eu
selfdir="$(dirname -- "$(realpath -- "$0")")"
cd -- "$selfdir"

CONFIG_JSON_URL="${1-}"

echoexec() {
  printf '%s\n' "$*" >&2
  "$@"
}

url="http://localhost:8084/"

cat <<EOF
$url

EOF

# xdg-open "$url"

if ! test "$CONFIG_JSON_URL" && ! test -e .env; then
  printf "URL of instance (will be used to get config.json): "
  read -r CONFIG_JSON_URL
fi

if test "$CONFIG_JSON_URL"; then
  echoexec npm ci
  CONFIG_JSON_URL="${CONFIG_JSON_URL#http*://}"
  CONFIG_JSON_URL="${CONFIG_JSON_URL%%/*}"
  CONFIG_JSON_URL="${CONFIG_JSON_URL#*@}"
  CONFIG_JSON_URL="https://$CONFIG_JSON_URL/config.json"
  # jq -r 'to_entries[]|@text "\(.key)=\(.value)"' | sed -e 's/^REST_API_URL/API_BASE_URL/' -e 's/^/VUE_APP_/'
  echoexec curl -L -- "$CONFIG_JSON_URL" | python3 -c 'import sys, json; print("\n".join(f"VUE_APP_{"API_BASE_URL" if k == "REST_API_URL" else k}={json.dumps(v) if isinstance(v, bool) else v}" for k, v in json.load(sys.stdin).items()))' >.env
fi

echoexec npm run serve
