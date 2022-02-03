#!/bin/bash

echo "Start nginx"

nginx

echo "Generating auth token"
mkdir -p "/data/.eth2validators"

# remove old token if it's there
rm -f /data/.eth2validators/auth-token

# generate new token
validator web generate-auth-token --wallet-dir=/data/.eth2validators --accept-terms-of-use

# remove old token if it's there
rm -f /usr/share/nginx/wizard/auth-token.txt

# copy new token to wizard for authentication link
cat /data/.eth2validators/auth-token | tail -1 > /usr/share/nginx/wizard/auth-token.txt
chmod 644 /usr/share/nginx/wizard/auth-token.txt

exec -c validator \
    --datadir=/data \
    --rpc-host 0.0.0.0 \
    --monitoring-host 0.0.0.0 \
    --beacon-rpc-provider="prysm-gnosis-beacon-chain.avado.dnp.dappnode.eth:4000" \
    --beacon-rpc-gateway-provider="prysm-gnosis-beacon-chain.avado.dnp.dappnode.eth:3500" \
    --wallet-dir=/data/.eth2validators \
    --config-file /root/sbc/config/config.yml \
    --chain-config-file /root/sbc/config/config.yml \
    --wallet-password-file /data/.eth2wallets/wallet-password.txt \
    --write-wallet-password-on-web-onboarding \
    --graffiti="AVADO!" \
    --web \
    --grpc-gateway-host=0.0.0.0 \
    --grpc-gateway-port=80 \
    --accept-terms-of-use \
    ${EXTRA_OPTS}

