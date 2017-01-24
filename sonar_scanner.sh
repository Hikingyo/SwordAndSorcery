#!/usr/bin/env bash
docker run --rm -i --workdir=/sword_and_sorcery -v $(pwd):/sword_and_sorcery -v $(pwd)/settings/sonar/:/config/ registry-private.docker.iscbordeaux.lan.bdx.sqli.com/sonar-scanner:2.8

#docker run --rm -ti --workdir=/application -v $(pwd)/application/:/application -v $(pwd)/settings/sonar/:/config/ registry-private.docker.iscbordeaux.lan.bdx.sqli.com/sonar-scanner:2.8
