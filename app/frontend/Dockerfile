FROM node:16.14-alpine
# Usar a imagem node:16.14-alpine como base

WORKDIR /app-frontend
# Mudar para o diretório de trabalho /app-frontend

COPY package* ./
# Copiar os package.json e package-lock.json para o container

RUN npm install
# Instalar as dependências Node

COPY . .
# Copiar o restante dos arquivos da aplicação para o container

EXPOSE 3000
# Sinalize que aplicação expõe a porta 3000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
# Dica: Leia a seção Docker e Docker-compose no README para mais informações