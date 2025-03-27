FROM oven/bun:1 as builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1-slim as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/bun.lockb .
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
RUN bun install --frozen-lockfile --production

EXPOSE 3000

CMD ["bun", "run", "start"]
