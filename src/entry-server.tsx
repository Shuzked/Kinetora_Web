import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Transform } from 'stream';
import App from './App';

export async function render(url: string, lang: 'en' | 'es'): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        html += chunk.toString();
        callback();
      }
    });

    transformStream.on('finish', () => resolve(html));
    transformStream.on('error', reject);

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App serverLang={lang} />
        </StaticRouter>
      </React.StrictMode>,
      {
        onAllReady() {
          pipe(transformStream);
        },
        onError(error) {
          console.error('[SSR Error]', error);
          reject(error);
        }
      }
    );
  });
}
