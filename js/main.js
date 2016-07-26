import App from 'App';

const DEFAULT_SUBREDDIT = 'cats';

const app = new App({
  page: 0,
  subReddit: DEFAULT_SUBREDDIT,
});

app.render();
