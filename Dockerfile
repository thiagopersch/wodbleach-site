# --- STAGE 1: Instala dependências e realiza o build ---
FROM node:20-alpine AS builder

# Instala ferramentas essenciais (como o git, necessário para algumas libs)
RUN apk add --no-cache git

WORKDIR /app

# Copia package.json e instala dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instala dependências
RUN npm install

# Usa 'npm ci' para builds mais rápidos e consistentes com package-lock
RUN npm ci

# Copia o código-fonte
COPY . .

# Gera o cliente Prisma para a arquitetura do container (Linux)
RUN npx prisma generate

# Constrói a aplicação Next.js
RUN npm run build

# --- STAGE 2: Imagem de Produção Leve ---
FROM node:20-alpine AS runner

# Configuração de segurança e otimização
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Cria um usuário e grupo não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Cria o diretório de cache e ajusta permissões
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

# Copia os arquivos essenciais do build 'standalone'
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Muda para o usuário não-root
USER nextjs

# Define o comando de inicialização com retry para migrações
CMD ["sh", "-c", "npx prisma migrate dev --name init --schema=./prisma/schema.prisma && npm run start"]
