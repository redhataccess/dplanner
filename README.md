## ITOS Setup

    rhc app create dplanner https://raw.githubusercontent.com/icflorescu/openshift-cartridge-nodejs/master/metadata/manifest.yml

### Manually starting node in prod

    node --es_staging --harmony --harmony_shipping src/server/server-prod.js

    forever start -a -l /dev/null -c \"node --es_staging --harmony --harmony_shipping\" src/server/server-prod.js

## Local development

    npm run start
    accessproxy
    http://prod.foo.redhat.com:1337/labs/dplanner
    
## Local development (prod)

    npm run build
    npm run start-prod
    https://foo.redhat.com/labs/dplanner
