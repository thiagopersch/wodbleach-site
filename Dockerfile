# Usa a imagem base do Node.js (versão 20, alpine para leveza)
FROM node:20-alpine

# Instala ferramentas essenciais (como o git, necessário para algumas libs)
RUN apk add --no-cache git netcat-openbsd

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração de dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instala dependências (usando npm install para incluir devDependencies)
RUN npm install

# Copia o código-fonte
COPY . .

# Gera o cliente Prisma para a arquitetura do container (Linux)
RUN npx prisma generate

# Configurações de ambiente para desenvolvimento
ENV NODE_ENV=development
ENV PORT=3000

# Cria um usuário e grupo não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Cria o diretório .next com permissões corretas
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app

# Muda para o usuário não-root
USER nextjs

# Comando para esperar o banco de dados e iniciar o app em modo de desenvolvimento
CMD ["sh", "-c", "DB_HOST=172.21.0.2 DB_PORT=3306; \
  echo 'Waiting for database at $DB_HOST:$DB_PORT...'; \
  while ! nc -z $DB_HOST $DB_PORT; do \
    sleep 1; \
  done; \
  echo 'Database is ready. Running migrations and starting app...'; \
  npx prisma migrate dev --name init --schema=./prisma/schema.prisma --skip-generate && npm run dev -- --turbopack"]
