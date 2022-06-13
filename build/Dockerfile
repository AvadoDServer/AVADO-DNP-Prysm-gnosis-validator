
# build image for monitor & wizard
FROM node:14-alpine as builder-nodejs

# build wizard
WORKDIR /usr/src/wizard
COPY wizard .
RUN rm -Rf   node_modules
RUN rm -f yarn.lock
RUN yarn add react-scripts 
RUN yarn 
RUN yarn build

FROM debian:buster-slim 

RUN apt update && \
    apt install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

WORKDIR  /usr/share/nginx
COPY --from=builder-nodejs /usr/src/wizard/build /usr/share/nginx/wizard
COPY config/nginx.conf /etc/nginx

# Get the binary from the image and configuration files
COPY --from=ghcr.io/gnosischain/gbc-prysm-validator:v2.1.2-gbc /app/cmd/validator/validator.runfiles/prysm/cmd/validator/validator_/validator /usr/local/bin/validator

# Copy entrypoint script
COPY config/entrypoint.sh /usr/local/bin

#RUN apt-get update && apt-get install -y ca-certificates file curl &&  \
RUN chmod +x /usr/local/bin/validator && \
    chmod +x /usr/local/bin/entrypoint.sh && \
    rm -rf /var/lib/apt/lists/*

COPY /config/bootnodes.yaml /root/sbc/config/
COPY /config/config.yml /root/sbc/config/

COPY --from=builder-nodejs /usr/src/wizard/build /usr/share/nginx/wizard

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]