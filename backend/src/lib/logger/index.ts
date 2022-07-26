
import chalk from 'chalk';
import moment from 'moment';

type LoggerOptions = {
  printTime?: boolean,
  printDate?: boolean,
  printLocal?: boolean
};

const defaultOptions: Required<LoggerOptions> = {
  printTime: true,
  printDate: true,
  printLocal: true
};

export class Logger {

  #options = defaultOptions;

  constructor(options?: LoggerOptions) {
    this.#options = {
      ...defaultOptions,
      ...options
    };
  }

  log(message: string) {
    const prefix = chalk.blue('INFO');
    const displayMoment = this.#options.printLocal ? moment() : moment.utc();
    const displayTime = chalk.grey(displayMoment.format('HH:mm:ss'));
    const displayDate = chalk.grey(displayMoment.format('YYYY-MM-DD'));
    return console.log(`${prefix}${this.#options.printDate ? ` ${displayDate}` : ''}${this.#options.printTime ? ` ${displayTime}` : ''} ${message}`);
  }

  warn(message: string) {
    const prefix = chalk.yellow('WARN');
    const displayMoment = this.#options.printLocal ? moment() : moment.utc();
    const displayTime = chalk.grey(displayMoment.format('HH:mm:ss'));
    const displayDate = chalk.grey(displayMoment.format('YYYY-MM-DD'));
    return console.warn(`${prefix}${this.#options.printDate ? ` ${displayDate}` : ''}${this.#options.printTime ? ` ${displayTime}` : ''} ${message}`);
  }

  error(err: unknown) {
    const prefix = chalk.red('ERROR');
    const displayMoment = this.#options.printLocal ? moment() : moment.utc();
    const displayTime = chalk.grey(displayMoment.format('HH:mm:ss'));
    const displayDate = chalk.grey(displayMoment.format('YYYY-MM-DD'));
    if (typeof err === 'string') return console.error(`${prefix}${this.#options.printDate ? ` ${displayDate}` : ''}${this.#options.printTime ? ` ${displayTime}` : ''} ${err}`);
    if (err instanceof Error) return console.error(
      `${prefix}${this.#options.printDate ? ` ${displayDate}` : ''}${this.#options.printTime ? ` ${displayTime}` : ''}
        Error: ${err.name}
        Message: ${err.message}
        ${err.stack && `Stack trace: ${err.stack}`}`
    );
    return console.error(`${prefix} Logger has failed to parse this error`);
  }
}