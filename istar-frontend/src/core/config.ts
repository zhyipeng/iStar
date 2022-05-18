class Config {
  // eslint-disable-next-line class-methods-use-this
  get isProdEnv() {
    return import.meta.env.PROD;
  }

  get baseURL() {
    if (this.isProdEnv) {
      // return 'http://47.107.117.172:8000';
      return '';
    }
    return 'http://localhost:8000';
  }

  getUrl(path: string): string {
    return `${this.baseURL}${path}`;
  }
}

const config = new Config();

export default config;
