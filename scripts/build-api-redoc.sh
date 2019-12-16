#!/usr/bin/env sh

# https://github.com/Redocly/redoc#redoc-options-object

TITLE="API iDDi Pública"
NAME=api-publica
FILE=api-iddi-public.v1.yaml

rm -f dist/api-spec/$NAME/index.html && \
mkdir -p dist/api-spec/$NAME && \
redoc-cli bundle src/reference/$FILE \
--options.pathInMiddlePanel \
--options.hideDownloadButton \
--options.scrollYOffset=57 \
--options.theme.colors.text.primary="#4f566b" \
--options.theme.colors.primary.main="#003b70" \
--options.theme.typography.fontSize="1rem" \
--options.theme.typography.lineHeight="1.5" \
--options.theme.typography.fontFamily="Poppins,HelveticaNeue-Light,Calibri Light,Roboto,sans-serif" \
--options.theme.typography.headings.fontFamily="Ubuntu,Roboto,sans-serif" \
--options.theme.typography.code.fontFamily="source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace" \
--options.theme.typography.code.color='#476582' \
--options.theme.typography.code.backgroundColor='rgba(0,72.857,127.5,.055)' \
--options.theme.typography.links.color='#016ec8' \
--options.theme.rightPanel.backgroundColor='#2D3748' \
--options.theme.rightPanel.textColor='#f5fbff' \
--options.theme.menu.backgroundColor='#003666' \
--options.theme.menu.textColor='#EDF6ff' \
--options.theme.menu.level1Items.textTransform='uppercase' \
-o dist/api-spec/$NAME/index.html \
-t src/redoc/template.hbs && \
sed -i '' -e "s/ReDoc\ documentation/$TITLE/g" dist/api-spec/$NAME/index.html
