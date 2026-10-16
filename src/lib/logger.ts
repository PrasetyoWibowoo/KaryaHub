type LogLevel = 'info' | 'warn' | 'error'

interface LogContext {
    [key: string]: unknown
}

function log(level: LogLevel, event: string, message: unknown, context?: LogContext) {
    const entry = {
        timestamp: new Date().toISOString(),
        level,
        event,
        message: message instanceof Error ? message.message : message,
        ...(context || {}),
    }

    if (level === 'error') {
        console.error(JSON.stringify(entry))
    } else {
        console.log(JSON.stringify(entry))
    }
}

export const logger = {
    info: (event: string, message: unknown, context?: LogContext) =>
        log('info', event, message, context),

    warn: (event: string, message: unknown, context?: LogContext) =>
        log('warn', event, message, context),

    error: (event: string, error: unknown, context?: LogContext) =>
        log('error', event, error, context),
}
