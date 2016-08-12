## ITOS Setup

    rhc app create -g int_hosted_medium -a dplanner -n subeng https://raw.githubusercontent.com/icflorescu/openshift-cartridge-nodejs/master/metadata/manifest.yml

### Manually starting node in prod

    node --es_staging --harmony --harmony_shipping src/server/server-prod.js

    forever start -a -l /dev/null -c \"node --es_staging --harmony --harmony_shipping\" src/server/server-prod.js

## Local development

    npm run start
    accessproxy
    http://prod.foo.redhat.com:1337/labs/dplanner
    
Make sure in .git/config to add a remote for itos for pushing.
    
    [remote "itos"]
      url = ssh://<key>@dplanner-subeng.itos.redhat.com/~/git/dplanner.git/
      fetch = +refs/heads/*:refs/remotes/origin/*
      
This will allow you push to ITOS:
      
      npm run build
      gg c Prod build
      git push itos master
      
Note that the resource limitations of ITOS makes it a headache to build on the gear itself.  This either must be done in 
a CI env or be done locally and pushed up.

    
## Local development (prod)

    npm run build
    npm run start-prod
    https://foo.redhat.com/labs/dplanner
